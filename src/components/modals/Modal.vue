<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{
    bg?: string
  }>()

  const bgStyle = computed(() => {
    return { 'backgroundImage' : `url(${props.bg})` }
  })
</script>

<template>
  <div class="fixed z-10 w-screen h-screen max-w-[400px] flex items-center justify-center select-none">
    <div
      class="py-4 px-6 min-w-[300px] min-h-[300px] flex flex-col justify-center text-center rounded-md bg-gray-900/90 text-white bg-cover bg-center"
      :style="bgStyle">
      <div class="mb-10 text-2xl">
        <slot name="title"></slot>
      </div>
      <div class="mb-4 font-light">
        <slot name="text"></slot>
      </div>
      <slot name="choice"></slot>
    </div>
  </div>
</template>