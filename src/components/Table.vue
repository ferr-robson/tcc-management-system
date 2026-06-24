<script setup lang="ts">
import { ref, computed } from 'vue'

interface Column {
    key: string
    label: string
}

const props = defineProps<{
    columns: Column[]
    rows: Record<string, any>[]
}>()

const search = ref('')

const filteredRows = computed(() => {
    const term = search.value.toLowerCase().trim()

    if (!term) {
        return props.rows
    }

    return props.rows.filter(row =>
        props.columns.some(column =>
            String(row[column.key] ?? '')
                .toLowerCase()
                .includes(term)
        )
    )
})
</script>

<template>
    <input class="search-input" v-model="search" type="text" placeholder="Pesquisar..." />

    <table>
        <thead>
            <tr>
                <th v-for="column in columns" :key="column.key">
                    {{ column.label }}
                </th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(row, index) in filteredRows" :key="index">
                <td v-for="column in columns" :key="column.key">
                    <slot :name="`cell-${column.key}`" :row="row">
                        {{ row[column.key] }}
                    </slot>
                </td>
            </tr>
        </tbody>
    </table>
</template>