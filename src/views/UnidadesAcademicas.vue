<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Table from '@/components/Table.vue'

interface UnidadeAcademica {
    id: number
    nome: string
    sigla: string
}

const columns = [
    { key: 'id', label: 'ID' },
    { key: 'nome', label: 'Nome' },
    { key: 'sigla', label: 'Sigla' }
]

const unidadesAcademicas = ref<UnidadeAcademica[]>([])
const rows = computed(() => unidadesAcademicas.value)

onMounted(async () => {
    try {
        const response = await fetch(
            'http://127.0.0.1:8000/api/unidades-academicas/'
        )

        if (!response.ok) {
            throw new Error('Erro ao buscar dados')
        }

        unidadesAcademicas.value = await response.json()
    } catch (error) {
        console.error(error)
    }
})
</script>

<template>
    <section>
        <h1 class="title">Unidades Acadêmicas</h1>
        <Table :columns="columns" :rows="rows" />
    </section>
</template>