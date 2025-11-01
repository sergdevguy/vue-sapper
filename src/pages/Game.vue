<script setup lang="ts">
  import Field from '../components/Field.vue'
  import InfoBar from '../components/InfoBar.vue'
  import Result from '../components/Result.vue'
  import { useGame } from '../composables/useGame.ts'
  import { GAME_CONFIG } from '../gameConfig.ts';

  const { state, fieldRows, gamerResult, actions } = useGame()
</script>

<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center bg-sky-950">
    <div>
      <Result @select="actions.selectBonus" :result="gamerResult" />
      <InfoBar :levels="[state.level, GAME_CONFIG.totalLevels]" :lifes="[state.lifes, GAME_CONFIG.initialLifes]" />
      <Field @open="actions.handleCellOpen" :fieldRows />
    </div>
  </div>
</template>