<script setup lang="ts">
  defineProps<{
    levels: [number, number]
    lifes: [number, number]
  }>()
</script>

<template>
  <div
    class="mb-6 py-2 px-3 text-center border-1 border-sky-600/50 rounded-md border-dashed text-sm bg-white/0 text-sky-600">
    <div>Уровень: <span class="text-lg">{{ levels[0] }}</span> <span class="text-sm">/ {{ levels[1] }}</span></div>
    <div>Жизни: <span class="text-lg">{{ lifes[0] }}</span> <span class="text-sm">/ {{ lifes[1] }}</span></div>
  </div>
</template>