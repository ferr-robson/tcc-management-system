<script setup lang="ts">
import Form from './Form.vue'
import { reactive, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

interface Aluno {
    id: number
    nome: string
    matricula: string
}

interface Professor {
    id: number
    nome: string
}

const router = useRouter()

const form = reactive({
    titulo: '',
    palavras_chave: '',
    resumo: '',
    semestre_letivo_defesa: '',
    tipo: '',
    idioma: '',
    aluno: null,
    status: null,
    orientador: null,
    presidente: null,
    primeiro_membro: null,
    segundo_membro: null,
    coorientador: null,
})

const professores = ref<Professor[]>([]);
const alunos = ref<Aluno[]>([]);

onMounted(async () => {
    try {
        const [professoresResponse, alunosResponse] =
            await Promise.all([
                fetch('http://127.0.0.1:8000/api/professores/'),
                fetch('http://127.0.0.1:8000/api/alunos/')
            ])

        if (!professoresResponse.ok || !alunosResponse.ok) {
            throw new Error('Erro ao buscar dados')
        }

        professores.value = await professoresResponse.json()
        alunos.value = await alunosResponse.json()
    } catch (error) {
        console.error(error)
    }
})

async function save() {
    try {
        const response = await fetch(
            'http://127.0.0.1:8000/api/tccs/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            }
        )

        if (!response.ok) {
            throw new Error('Erro ao criar TCC')
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
            Novo TCC
        </span>
    </nav>

    <h1 class="title">Novo TCC</h1>

    <Form :form="form" :alunos="alunos" :professores="professores" @submit="save">
        <button class="system-button" @click="router.push('/tccs')">
            Voltar
        </button>
        
        <button class="system-button" type="submit">
            Salvar
        </button>
    </Form>
</template>