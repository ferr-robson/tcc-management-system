<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Table from '@/components/Table.vue'
import Modal from '@/components/Modal.vue'

interface Aluno {
    id: number
    nome: string
}

interface Professor {
    id: number
    nome: string
}

interface TCC {
  id: number

  titulo: string
  palavras_chave: string
  resumo: string

  semestre_letivo_defesa: string

  aluno: number

  orientador: number
  coorientador: number

  presidente: number
  primeiro_membro: number
  segundo_membro: number

  idioma_display: string
  status_display: string
  tipo_display: string

  arquivo?: string | null
}

const columns = [
    {
        key: 'titulo',
        label: 'Título'
    },
    {
        key: 'palavras_chave',
        label: 'Palavras-chave'
    },
    {
        key: 'semestre_letivo_defesa',
        label: 'Semestre'
    },
    {
        key: 'acoes',
        label: 'Ações'
    },
    {
    key:'editar',
    label:'Editar'
    },
    {
    key:'enviar',
    label:'Enviar'
    }
]

const tccs = ref<TCC[]>([])
const alunos = ref<Aluno[]>([])
const professores = ref<Professor[]>([])

const rows = computed(() =>
    tccs.value.map(tcc => ({
        ...tcc,
        acoes: ''
    }))
)

const selectedTcc = ref<any | null>(null)
const modalOpen = ref(false)

onMounted(async () => {
    try {
        const [
            tccsResponse,
            alunosResponse,
            professoresResponse
        ] = await Promise.all([
            fetch('http://127.0.0.1:8000/api/tccs/'),
            fetch('http://127.0.0.1:8000/api/alunos/'),
            fetch('http://127.0.0.1:8000/api/professores/')
        ])

        if (
            !tccsResponse.ok ||
            !alunosResponse.ok ||
            !professoresResponse.ok
        ) {
            throw new Error('Erro ao buscar dados')
        }

        tccs.value = await tccsResponse.json()
        alunos.value = await alunosResponse.json()
        professores.value = await professoresResponse.json()
    } catch (error) {
        console.error(error)
    }
})

function openDetails(tcc: any) {
    selectedTcc.value = tcc
    modalOpen.value = true
}

const alunosMap = computed(() =>
    Object.fromEntries(
        alunos.value.map(aluno => [
            aluno.id,
            aluno.nome
        ])
    )
)

const professoresMap = computed(() =>
    Object.fromEntries(
        professores.value.map(professor => [
            professor.id,
            professor.nome
        ])
    )
)
async function enviarTcc(id:number){

  await fetch(

    `http://127.0.0.1:8000/api/tccs/${id}/`,

    {
      method:'PATCH',

      headers:{
        'Content-Type':
        'application/json'
      },

      body:JSON.stringify({
        status:'1'
      })
    }

  )

  window.location.reload()

}
</script>

<template>
    <section>
        <h1 class="title">TCCs</h1>
        <button to="/tcc/create" class="button-add-tcc">
            <router-link class="btn-router-link" to="/tcc/create">Novo TCC</router-link>
        </button>

        <Table :columns="columns" :rows="rows">
            <template #cell-acoes="{ row }">
                <button class="system-button" @click="openDetails(row)">
                    Ver detalhes
                </button>
            </template>
            <template #cell-editar="{ row }">
                <router-link :to="`/tcc/edit/${row.id}`">
                <button class="system-button">
                    Editar
                </button>
                </router-link>
            </template>
        </Table>

        <Modal :open="modalOpen" @close="modalOpen = false">
            <template v-if="selectedTcc">
                <h2>
                    {{ selectedTcc.titulo }}
                </h2>

                <p>
                    <strong>Tipo:</strong>
                    {{ selectedTcc.tipo_display }}
                </p>

                <p>
                    <strong>Idioma:</strong>
                    {{ selectedTcc.idioma_display }}
                </p>

                <p>
                    <strong>Status:</strong>
                    {{ selectedTcc.status_display }}
                </p>

                <p>
                    <strong>Semestre:</strong>
                    {{ selectedTcc.semestre_letivo_defesa }}
                </p>

                <p>
                    <strong>Palavras-chave:</strong>
                    {{ selectedTcc.palavras_chave }}
                </p>

                <p>
                    <strong>Aluno:</strong>
                    {{ alunosMap[selectedTcc.aluno] }}
                </p>

                <p>
                    <strong>Orientador:</strong>
                    {{ professoresMap[selectedTcc.orientador] }}
                </p>

                <p>
                    <strong>Coorientador:</strong>
                    {{ professoresMap[selectedTcc.coorientador] }}
                </p>

                <p>
                    <strong>Presidente:</strong>
                    {{ professoresMap[selectedTcc.presidente] }}
                </p>

                <p>
                    <strong>Primeiro membro:</strong>
                    {{ professoresMap[selectedTcc.primeiro_membro] }}
                </p>

                <p>
                    <strong>Segundo membro:</strong>
                    {{ professoresMap[selectedTcc.segundo_membro] }}
                </p>

                <p
                v-if="selectedTcc.arquivo"
                >

                <a
                :href="selectedTcc.arquivo"
                target="_blank"
                >

                <button class="system-button">
                Download Arquivo
                </button>

                </a>

                </p>

                <h3>Resumo</h3>
                <p>
                    {{ selectedTcc.resumo }}
                </p>
                <a v-if="selectedTcc.arquivo"
                    style="float: left; text-decoration: none;" 
                    class="system-button" 
                    :href="selectedTcc.arquivo" 
                    download
                    target="_blank">
                    Baixar arquivo
                </a>
            </template>
        </Modal>
    </section>
</template>





