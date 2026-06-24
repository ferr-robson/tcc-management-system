<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Form from './Form.vue'

const router = useRouter()
const route = useRoute()

interface Aluno {
    id: number
    nome: string
    matricula: string
}

interface Professor {
    id: number
    nome: string
}

const form = reactive({
    titulo: '',
    palavras_chave: '',
    resumo: '',
    tipo: '',
    idioma: '',
    aluno: null,
    orientador: null,
    semestre_letivo_defesa: '',
    status: null,
    presidente: null,
    primeiro_membro: null,
    segundo_membro: null,
    coorientador: null,
    arquivo: null,
})

const professores = ref<Professor[]>([]);
const alunos = ref<Aluno[]>([]);

onMounted(async () => {
    try {
        const id = route.params.id

        const [tccResponse, professoresResponse, alunosResponse] =
            await Promise.all([
                fetch(`http://127.0.0.1:8000/api/tccs/${id}/`),
                fetch('http://127.0.0.1:8000/api/professores/'),
                fetch('http://127.0.0.1:8000/api/alunos/')
            ])

        if (!tccResponse.ok || !professoresResponse.ok || !alunosResponse.ok) {
            throw new Error('Erro ao buscar dados')
        }

        const tcc = await tccResponse.json()

        professores.value = await professoresResponse.json()
        alunos.value = await alunosResponse.json()

        Object.assign(form, tcc)

    } catch (error) {
        console.error(error)
    }
})

async function save() {
    try {
        const id = route.params.id

        const formData = new FormData()

        Object.entries(form).forEach(([key, value]) => {
            if (value === null || value === undefined) return

            formData.append(
                key,
                value instanceof File ? value : String(value)
            )
        })

        const response = await fetch(
            `http://127.0.0.1:8000/api/tccs/${id}/`,
            {
                method: 'PUT', // ou PATCH (melhor)
                body: formData
            }
        )

        if (!response.ok) {
            throw new Error('Erro ao atualizar TCC')
        }

        router.push('/tccs')

    } catch (error) {
        console.error(error)
    }
}
</script>

<template>
    <nav class="breadcrumb" aria-label="Breadcrumb">
        <router-link to="/tccs">
            TCCs
        </router-link>

        <span class="separator">›</span>

        <span class="current">
            Aditar TCC
        </span>
    </nav>

    <h1 class="title">Editar TCC</h1>

    <Form :form="form" :alunos="alunos" :professores="professores" @submit="save">
        <button class="system-button" @click="router.push('/tccs')">
            Voltar
        </button>

        <button class="system-button" type="submit">
            Salvar
        </button>
    </Form>
</template>