<script setup lang="ts">
interface TCCForm {
    titulo: string
    palavras_chave: string
    resumo: string

    semestre_letivo_defesa: string

    tipo: string

    idioma: string

    aluno: number | null

    status: number | null

    orientador: number | null
    presidente: number | null
    primeiro_membro: number | null
    segundo_membro: number | null
    coorientador: number | null

    arquivo: File
}

interface Aluno {
    id: number
    nome: string
    matricula: string
}

interface Professor {
    id: number
    nome: string
}

const props = defineProps<{
    form: TCCForm,
    professores: Professor[],
    alunos: Aluno[]
}>()

const emit = defineEmits<{
    submit: []
}>()

const semestres = Array.from(
    { length: 2026 - 2020 + 1 },
    (_, index) => 2020 + index
).flatMap(ano => [
    `${ano}/1`,
    `${ano}/2`
])

// function onFileSelected(event: Event) {
//     const target = event.target as HTMLInputElement

//     if (target.files?.length) {
//         form.arquivo = target.files[0]
//     }
// }
function handleFileChange(event) {
    props.form.arquivo = event.target.files[0];
}
</script>

<template>
    <form class="form-container" @submit.prevent="$emit('submit')">
        <div class="form-grid">

            <div class="form-group">
                <label for="titulo">Título</label>
                <input id="titulo" v-model="form.titulo" type="text" />
            </div>

            <div class="form-group form-group-full">
                <label for="palavras_chave">Palavras-chave</label>
                <input id="palavras_chave" v-model="form.palavras_chave" type="text" />
            </div>

            <div class="form-group form-group-full">
                <label for="resumo">Resumo</label>
                <textarea id="resumo" v-model="form.resumo" />
            </div>

            <div class="form-group form-group-full">
                <label for="tipo">
                    tipo
                </label>
                <select id="tipo" v-model.number="form.tipo">
                    <option :value="''">
                        Selecione o tipo
                    </option>
                    <option value="MONOGRAFIA">
                        Monografia
                    </option>
                    <option value="RELATORIO_ESTAGIO">
                        Relatório de Estágio
                    </option>
                    <option value="RELATORIO_TECNICO">
                        Relatório Técnico
                    </option>
                    <option value="ARTIGO">
                        Artigo
                    </option>
                </select>
            </div>

            <div class="form-group form-group-full">
                <label for="idioma">
                    Idioma
                </label>
                <select id="idioma" v-model.number="form.idioma">
                    <option :value="''">
                        Selecione o idioma
                    </option>
                    <option value="PT">
                        Português
                    </option>
                    <option value="EN">
                        Inglês
                    </option>
                </select>
            </div>

            <div class="form-group form-group-full">
                <label for="aluno">
                    Aluno
                </label>
                <select id="aluno" v-model.number="form.aluno">
                    <option :value="null">
                        Selecione um aluno
                    </option>
                    <option v-for="aluno in alunos" :key="aluno.id" :value="aluno.id">
                        {{ aluno.nome }}
                    </option>
                </select>
            </div>

            <div class="form-group form-group-full">
                <label for="status">
                    Status
                </label>
                <select id="status" v-model.number="form.status">
                    <option :value="null">
                        Selecione o status
                    </option>
                    <option :value="0">
                        Em Elaboração
                    </option>
                    <option :value="1">
                        Enviado
                    </option>
                    <option :value="2">
                        Aprovado
                    </option>
                    <option :value="3">
                        Reprovado
                    </option>
                </select>
            </div>

            <div class="form-group form-group-full">
                <label for="semestre">
                    Semestre
                </label>
                <select id="semestre" v-model="form.semestre_letivo_defesa">
                    <option value="">
                        Selecione um semestre
                    </option>
                    <option v-for="semestre in semestres" :key="semestre" :value="semestre">
                        {{ semestre }}
                    </option>
                </select>
            </div>

            <div class="form-group form-group-full">
                <label for="orientador">
                    Orientador
                </label>
                <select id="orientador" v-model.number="form.orientador">
                    <option :value="null">
                        Selecione um professor
                    </option>
                    <option v-for="professor in professores" :key="professor.id" :value="professor.id">
                        {{ professor.nome }}
                    </option>
                </select>
            </div>

            <div class="form-group form-group-full">
                <label for="coorientador">
                    Coorientador
                </label>
                <select id="coorientador" v-model.number="form.coorientador">
                    <option :value="null">
                        Selecione o coorientador
                    </option>
                    <option v-for="professor in professores" :key="professor.id" :value="professor.id">
                        {{ professor.nome }}
                    </option>
                </select>
            </div>

            <div class="form-group form-group-full">
                <label for="presidente">
                    Presidente
                </label>
                <select id="presidente" v-model.number="form.presidente">
                    <option :value="null">
                        Selecione o presidente
                    </option>
                    <option v-for="professor in professores" :key="professor.id" :value="professor.id">
                        {{ professor.nome }}
                    </option>
                </select>
            </div>

            <div class="form-group form-group-full">
                <label for="primeiro_membro">
                    Primeiro membro
                </label>
                <select id="primeiro_membro" v-model.number="form.primeiro_membro">
                    <option :value="null">
                        Selecione o primeiro membro
                    </option>
                    <option v-for="professor in professores" :key="professor.id" :value="professor.id">
                        {{ professor.nome }}
                    </option>
                </select>
            </div>

            <div class="form-group form-group-full">
                <label for="segundo_membro">
                    Segundo membro
                </label>
                <select id="segundo_membro" v-model.number="form.segundo_membro">
                    <option :value="null">
                        Selecione o segundo membro
                    </option>
                    <option v-for="professor in professores" :key="professor.id" :value="professor.id">
                        {{ professor.nome }}
                    </option>
                </select>
            </div>

            <div class="form-group form-group-full">
                <label for="arquivo">
                    Enviar arquivo
                </label>
                <input type="file" name="arquivo" id="arquivo" @change="handleFileChange">
            </div>
        </div>

        <div class="form-actions">
            <slot />
        </div>
    </form>
</template>