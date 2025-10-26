<script setup lang="ts">
import type { Cell as CellType } from '../App.vue';
import Cell from '../components/Cell.vue';

defineProps<{
  field: CellType[][]
}>()

const emit = defineEmits<{
  open: [id: [number, number]]
}>()

function open(id: [number, number]) {
  emit('open', id)
}
</script>

<template>
  <div class="relative border-4 rounded-md border-sky-600 bg-sky-600">
    <div v-for="row in field" class="flex">
      <Cell v-for="cell in row" :cell @click="open(cell.id)" />
    </div>
  </div>
</template>