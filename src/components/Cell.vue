<script setup lang="ts">
  import { computed } from 'vue';
  import octopus from '../assets/octopus.png';
  import type { CellData } from '../types';

  const props = defineProps<{
    cell: CellData
  }>()

  const COUNT_COLOR_MAP: Record<number, string> = {
    1: 'text-rose-100',
    2: 'text-rose-300',
    3: 'text-rose-500',
    4: 'text-rose-700',
  }

  const countColorClass = computed(() => {
    return COUNT_COLOR_MAP[props.cell.count] ?? 'text-rose-900'
  })

  const smoothHideClass = computed(() => {
    return {
      'scale-0': props.cell.isOpened,
    }
  })

  const bobmHighlightClass = computed(() => {
    return {
      'bg-red-700': props.cell.isHighlight,
    }
  })
</script>

<template>
  <div class="w-7.5 h-7.5 relative select-none">
    <div :class="smoothHideClass"
      class="absolute top-0 left-0 w-full h-full border-1 border-stone-700 bg-stone-500 font-bold cursor-pointer transition-all duration-160 ease-in">
    </div>
    <div v-if="cell.isOpened" class="w-full h-full flex items-center justify-center border-1 border-sky-700/40">
      <div v-if="cell.isBomb" :class="bobmHighlightClass"
        class="w-full h-full flex items-center justify-center bg-size-[80%] bg-no-repeat bg-center"
        :style="{ backgroundImage: `url(${octopus})` }"></div>
      <div v-else-if="cell.count" :class="countColorClass" class="font-bold">{{ cell.count }}</div>
    </div>
  </div>
</template>