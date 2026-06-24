<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(false)

function toggleTheme() {
  isDark.value = !isDark.value

  document.documentElement.classList.toggle(
    'dark',
    isDark.value
  )

  localStorage.setItem(
    'theme',
    isDark.value ? 'dark' : 'light'
  )
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')

  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  } else {
    isDark.value = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
  }

  document.documentElement.classList.toggle(
    'dark',
    isDark.value
  )
})
</script>

<template>
    <header class="app-header">
        <div class="brand">
            <router-link to="/">
                Gestão de TCCs
            </router-link>
        </div>

        <nav aria-label="Navegação principal">
            <ul class="nav-list">
                <li>
                    <router-link to="/">Dashboard</router-link>
                </li>
                <li>
                    <router-link to="/alunos">Alunos</router-link>
                </li>
                <li>
                    <router-link to="/professores">Professores</router-link>
                </li>
                <li>
                    <router-link to="/cursos">Cursos</router-link>
                </li>
                <li>
                    <router-link to="/departamentos">Departamentos</router-link>
                </li>
                <li>
                    <router-link to="/unidades-academicas">Unidades Acadêmicas</router-link>
                </li>
                <li>
                    <router-link to="/tccs">TCCs</router-link>
                </li>
            </ul>
        </nav>

        <button
            class="theme-toggle"
            @click="toggleTheme"
        >
            {{ isDark ? '☀️' : '🌙' }}
        </button>
    </header>
</template>
