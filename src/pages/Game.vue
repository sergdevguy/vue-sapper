<script setup lang="ts">
  import Field from '../components/Field.vue'
  import { useGame } from '../composables/useGame.ts'

  const { fieldRows, actions } = useGame()
</script>

<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center bg-sky-950">
    <Field @open="actions.handleCellOpen" :fieldRows />
  </div>
</template>