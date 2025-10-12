<script setup lang="ts">
  import type { Cell } from '../App.vue';

  defineProps<{
    cell: Cell
  }>()
</script>

<template>
  <div class="w-6 h-6 flex justify-center items-center border-1 border-slate-800 bg-slate-500 text-slate-300">
    <div v-if="cell.isOpened">
      <div v-if="cell.isBomb">&#9760;</div>
      <div v-if="!cell.isBomb && cell.count">{{ cell.count }}</div>
    </div>
  </div>
</template>