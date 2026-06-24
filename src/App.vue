<script setup lang="ts">
import Header from './components/Header.vue'

import { useRoute } from 'vue-router'

const route = useRoute()

</script>

<template>
    <div class="app-container">
        <Header v-if="!route.meta.hideHeader"/>

        <main class="app-content">
            <router-view />
        </main>
    </div>
</template>

<style scoped></style>
