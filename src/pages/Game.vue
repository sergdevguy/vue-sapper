<script setup lang="ts">
  import Field from '../components/Field.vue'
  import { useGame } from '../composables/useGame.ts'
  import { GAME_CONFIG } from '../gameConfig.ts';

  const { state, fieldRows, actions } = useGame()
</script>

<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center bg-sky-950">
    <div>
      <div class="mr-auto mb-6 py-2 px-3 border-2 border-sky-600 rounded-md text-sm bg-white/0 text-sky-600">
        <div>Уровень: {{ state.level }} / {{ GAME_CONFIG.totalLevels }}</div>
        <div>Жизни: {{ state.lifes }} / {{ GAME_CONFIG.initialLifes }}</div>
      </div>
      <Field @open="actions.handleCellOpen" :fieldRows />
    </div>
  </div>
</template>