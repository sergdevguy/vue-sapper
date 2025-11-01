import { ref } from "vue"
import type { Status } from "../types"
import { useField } from "./useField"
import { useGameLogic } from "./useGameLogic"
import { useState } from "./useState"
import { GAME_CONFIG } from "../gameConfig"

export function useGame() {

  const { state, stateActions } = useState()
  const { field, fieldRows, fieldActions } = useField()
  const { openCellHandler } = useGameLogic(field, state.value.fieldSize)

  const gameStatus = ref<Status>('idle')
  const gamerResult = ref<Status>('idle')

  function handleCellOpen(id: number) {
    if (gameStatus.value === 'win' || gameStatus.value === 'loose') {
      return
    }

    const result = openCellHandler(id)
    gameStatus.value = result

    if (result === 'loose') {
      stateActions.decLifes()
      // gamerResult.value = 'loose'
    } else if (result === 'win') {
      stateActions.incLevel()
    }
  }

  function selectBonus(bonus: any) {
    setTimeout(() => {
      if (bonus['incKrakens']) {
        stateActions.incBombs(2)
      } else if (bonus['decRow']) {
        stateActions.decRows(1)
      }

      if (!state.value.lifes || state.value.level > GAME_CONFIG.totalLevels) {
        stateActions.reset()
      }
      fieldActions.reset(state.value.fieldSize, state.value.bombs)
      gameStatus.value = 'idle'
      gamerResult.value = 'idle'
    }, 1000)
  }

  fieldActions.init(state.value.fieldSize, state.value.bombs)

  return {
    state,
    fieldRows,
    gamerResult,
    actions: { handleCellOpen, selectBonus }
  }

}