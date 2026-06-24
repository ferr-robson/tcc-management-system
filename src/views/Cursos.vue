<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Table from '@/components/Table.vue'

interface Curso {
    id: number
    nome: string
    sigla: string
    codigo: string
}

const columns = [
    { key: 'id', label: 'ID' },
    { key: 'nome', label: 'Nome' },
    { key: 'sigla', label: 'Sigla' },
    { key: 'codigo', label: 'Código' }
]

const cursos = ref<Curso[]>([])
const rows = computed(() => cursos.value)

onMounted(async () => {
    try {
        const response = await fetch(
            'http://127.0.0.1:8000/api/cursos/'
        )

        if (!response.ok) {
            throw new Error('Erro ao buscar dados')
        }

        cursos.value = await response.json()
    } catch (error) {
        console.error(error)
    }
})
</script>

<template>
    <section>
        <h1 class="title">Cursos</h1>
        <Table :columns="columns" :rows="rows" />
    </section>
</template>