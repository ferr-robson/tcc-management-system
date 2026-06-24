<script setup lang="ts">
import { ref, onMounted } from 'vue'

const stats = ref<any>(null)

onMounted(async () => {
  try {
    const response = await fetch(
      'http://127.0.0.1:8000/api/tccs/estatisticas/'
    )

    stats.value = await response.json()
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>

<section>

<h1 class="title">
Dashboard
</h1>

<div v-if="stats">

<div class="dashboard-card">

<h2>Total de TCCs</h2>

<p class="dashboard-number">
{{ stats.total_geral }}
</p>

</div>

<h2>Status dos TCCs</h2>

<table>
<thead>
<tr>
<th>Status</th>
<th>Total</th>
</tr>
</thead>

<tbody>
<tr
v-for="(valor,chave) in stats.por_status"
:key="chave"
>
<td>{{ chave }}</td>
<td>{{ valor }}</td>
</tr>
</tbody>
</table>

<h2>Tipos</h2>

<table>
<thead>
<tr>
<th>Tipo</th>
<th>Total</th>
</tr>
</thead>

<tbody>
<tr
v-for="(valor,chave) in stats.por_tipo"
:key="chave"
>
<td>{{ chave }}</td>
<td>{{ valor }}</td>
</tr>
</tbody>
</table>

<h2>Idiomas</h2>

<table>
<thead>
<tr>
<th>Idioma</th>
<th>Total</th>
</tr>
</thead>

<tbody>
<tr
v-for="(valor,chave) in stats.por_idioma"
:key="chave"
>
<td>{{ chave }}</td>
<td>{{ valor }}</td>
</tr>
</tbody>
</table>

</div>

</section>

</template>

<style scoped>

.dashboard-card{
  margin:20px 0;
  padding:20px;
  border:1px solid #ccc;
  border-radius:10px;
}

.dashboard-number{
  font-size:40px;
  font-weight:bold;
}

</style>