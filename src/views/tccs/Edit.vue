<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Form from './Form.vue'

const route = useRoute()

const alunos = ref([])
const professores = ref([])

const form = reactive({
  titulo: '',
  palavras_chave: '',
  resumo: '',
  semestre_letivo_defesa: '',
  tipo: '',
  idioma: '',
  aluno: null,
  status: '0',
  orientador: null,
  coorientador: null,
  presidente: null,
  primeiro_membro: null,
  segundo_membro: null,
  arquivo: null
})

onMounted(async () => {

  const [
    tccResponse,
    alunosResponse,
    professoresResponse
  ] = await Promise.all([

    fetch(
      `http://127.0.0.1:8000/api/tccs/${route.params.id}/`
    ),

    fetch(
      'http://127.0.0.1:8000/api/alunos/'
    ),

    fetch(
      'http://127.0.0.1:8000/api/professores/'
    )

  ])

  Object.assign(
    form,
    await tccResponse.json()
  )

  alunos.value =
  await alunosResponse.json()

  professores.value =
  await professoresResponse.json()

})

async function save(){

  const formData =
  new FormData()

  Object.entries(form).forEach(
    ([key,value]) => {

      if(
        value !== null &&
        value !== undefined
      ){
        formData.append(
          key,
          value as any
        )
      }

    }
  )

  await fetch(

    `http://127.0.0.1:8000/api/tccs/${route.params.id}/`,

    {
      method:'PUT',
      body:formData
    }

  )

  alert('TCC atualizado com sucesso')

}
</script>

<template>

<h1 class="title">
Editar TCC
</h1>

<Form
  :form="form"
  :alunos="alunos"
  :professores="professores"
  @submit="save"
/>

</template>