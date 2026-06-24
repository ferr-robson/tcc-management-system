<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Table from '@/components/Table.vue'

interface Departamento {
    id: number
    nome: string
    sigla: string
    unidade_academica: number
}

interface UnidadeAcademica {
    id: number
    nome: string
}

const columns = [
    { key: 'id', label: 'ID' },
    { key: 'nome', label: 'Nome' },
    { key: 'sigla', label: 'Sigla' },
    { key: 'unidadeAcademicaNome', label: 'Unidade Acadêmica' }
]

const departamentos = ref<Departamento[]>([])
const unidadesAcademicas = ref<UnidadeAcademica[]>([])

const unidadesAcademicasMap = computed(() =>
    Object.fromEntries(
        unidadesAcademicas.value.map(unidade => [
            unidade.id,
            unidade.nome
        ])
    )
)

const rows = computed(() =>
    departamentos.value.map(departamento => ({
        ...departamento,
        unidadeAcademicaNome:
            unidadesAcademicasMap.value[departamento.unidade_academica] ??
            'Unidade Acadêmica não encontrada'
    }))
)


onMounted(async () => {
    try {
        const [departamentoResponse, unidadeAcademicaResponse] =
            await Promise.all([
                fetch('http://127.0.0.1:8000/api/departamentos/'),
                fetch('http://127.0.0.1:8000/api/unidades-academicas/')
            ])

        if (!departamentoResponse.ok || !unidadeAcademicaResponse.ok) {
            throw new Error('Erro ao buscar dados')
        }

        departamentos.value = await departamentoResponse.json()
        unidadesAcademicas.value = await unidadeAcademicaResponse.json()
    } catch (error) {
        console.error(error)
    }
})
</script>

<template>
    <section>
        <h1 class="title">Departamentos</h1>
        <Table :columns="columns" :rows="rows" />
    </section>
</template>
