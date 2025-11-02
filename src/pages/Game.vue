<script setup lang="ts">
  import Field from '../components/Field.vue'
  import InfoBar from '../components/InfoBar.vue'
  import Result from '../components/Result.vue'
  import { useGame } from '../composables/useGame.ts'
  import { GAME_CONFIG } from '../gameConfig.ts';

  const { state, fieldRows, gameResult, actions } = useGame()
</script>

<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center bg-sky-950">
    <div>
      <Result @select="actions.selectBonus" @reset="actions.reset" :result="gameResult" />
      <InfoBar :levels="[state.level, GAME_CONFIG.totalLevels]" :gold="[state.gold, 500]" :lifes="[state.lifes, GAME_CONFIG.initialLifes]" />
      <Field @open="actions.handleCellOpen" :fieldRows />
    </div>
  </div>
</template>