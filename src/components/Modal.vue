<script setup lang="ts">
defineProps<{
    open: boolean
}>()

const emit = defineEmits<{
    close: []
}>()
</script>

<template>
    <div v-if="open" class="modal-overlay" @click="$emit('close')">
        <div class="modal" @click.stop>
            <slot />

            <button class="system-button" @click="$emit('close')">
                Fechar
            </button>
        </div>
    </div>
</template>