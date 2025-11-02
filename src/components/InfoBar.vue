<script setup lang="ts">
import { computed } from 'vue';

  const props = defineProps<{
    levels: [number, number]
    gold: [number, number]
    lifes: [number, number]
  }>()

  const maxLevel = computed(() => {
    return Math.min(props.levels[0], props.levels[1])
  })
</script>

<template>
  <div
    class="mb-6 py-2 px-3 text-center border-1 border-sky-600/50 rounded-md border-dashed text-sm bg-white/0 text-sky-600">
    <div>Уровень: <span class="text-lg">{{ maxLevel }}</span> <span class="text-sm">/ {{ levels[1] }}</span></div>
    <div>Золото: <span class="text-lg">{{ gold[0] }}</span> <span class="text-sm">/ {{ gold[1] }}</span></div>
    <div>Жизни: <span class="text-lg">{{ lifes[0] }}</span> <span class="text-sm">/ {{ lifes[1] }}</span></div>
  </div>
</template>