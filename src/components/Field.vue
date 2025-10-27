<script setup lang="ts">
import Cell from '../components/Cell.vue';
import type { CellData } from '../types';

defineProps<{
  fieldRows: CellData[][]
}>()

const emit = defineEmits<{
  open: [id: number]
}>()

function open(id: number) {
  emit('open', id)
}
</script>

<template>
  <div class="relative border-4 rounded-md border-sky-600 bg-sky-600">    
    <div v-for="row in fieldRows" class="flex">
      <Cell v-for="cell in row" :key="cell.id" :cell @click="open(cell.id)" />
    </div>
  </div>
</template>