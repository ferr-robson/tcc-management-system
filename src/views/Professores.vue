<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Table from '@/components/Table.vue'

interface Professor {
    id: number
    nome: string
    departamento: number
}

interface Departamento {
    id: number
    nome: string
}

const columns = [
    { key: 'id', label: 'ID' },
    { key: 'nome', label: 'Nome' },
    // { key: 'matricula', label: 'Matrícula' },
    { key: 'departamentoNome', label: 'Departamento' }
]

const professores = ref<Professor[]>([])
const departamentos = ref<Departamento[]>([])

const departamentosMap = computed(() =>
    Object.fromEntries(
        departamentos.value.map(departamento => [
            departamento.id,
            departamento.nome
        ])
    )
)

const rows = computed(() =>
    professores.value.map(professor => ({
        ...professor,
        departamentoNome:
            departamentosMap.value[professor.departamento] ??
            'Departamento não encontrado'
    }))
)

onMounted(async () => {
    try {
        const [professoresResponse, departamentosResponse] =
            await Promise.all([
                fetch('http://127.0.0.1:8000/api/professores/'),
                fetch('http://127.0.0.1:8000/api/departamentos/')
            ])

        if (!professoresResponse.ok || !departamentosResponse.ok) {
            throw new Error('Erro ao buscar dados')
        }

        professores.value = await professoresResponse.json()
        departamentos.value = await departamentosResponse.json()
    } catch (error) {
        console.error(error)
    }
})
</script>

<template>
    <section>
        <h1 class="title">Professores</h1>
        <Table :columns="columns" :rows="rows" />
    </section>
</template>