<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Table from '@/components/Table.vue'

interface Aluno {
    id: number
    nome: string
    matricula: string
    curso: number
}

interface Curso {
    id: number
    nome: string
}

const columns = [
    // { key: 'id', label: 'ID' },
    { key: 'nome', label: 'Nome' },
    { key: 'matricula', label: 'Matrícula' },
    { key: 'cursoNome', label: 'Curso' }
]

const alunos = ref<Aluno[]>([])
const cursos = ref<Curso[]>([])

const cursosMap = computed(() =>
    Object.fromEntries(
        cursos.value.map(curso => [
            curso.id,
            curso.nome
        ])
    )
)

const rows = computed(() =>
    alunos.value.map(aluno => ({
        ...aluno,
        cursoNome:
            cursosMap.value[aluno.curso] ??
            'Curso não encontrado'
    }))
)

onMounted(async () => {
    try {
        const [alunosResponse, cursosResponse] =
            await Promise.all([
                fetch('http://127.0.0.1:8000/api/alunos/'),
                fetch('http://127.0.0.1:8000/api/cursos/')
            ])

        if (!alunosResponse.ok || !cursosResponse.ok) {
            throw new Error('Erro ao buscar dados')
        }

        alunos.value = await alunosResponse.json()
        cursos.value = await cursosResponse.json()
    } catch (error) {
        console.error(error)
    }
})
</script>

<template>
    <section>
        <h1 class="title">Alunos</h1>
        <Table :columns="columns" :rows="rows" />
    </section>
</template>