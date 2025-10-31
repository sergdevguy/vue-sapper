import { ref } from "vue"
import type { Status } from "../types"
import { useField } from "./useField"
import { useGameLogic } from "./useGameLogic"
import { useState } from "./useState"

export function useGame() {

  const { state, stateActions } = useState()
  const { field, fieldRows, fieldActions } = useField()
  const { openCellHandler } = useGameLogic(field, state.value.fieldSize)

  const gameStatus = ref<Status>('idle')

  function handleCellOpen(id: number) {
    if (gameStatus.value === 'win' || gameStatus.value === 'loose') {
      return
    }

    const result = openCellHandler(id)
    gameStatus.value = result

    if (result === 'loose') {
      resetGame()
    }
    if (result === 'win') {
      resetGame()
    }
  }

  function resetGame() {
    setTimeout(() => {
      stateActions.reset()
      fieldActions.reset(state.value.fieldSize, state.value.bombs)
      gameStatus.value = 'idle'
    }, 1000)
  }

  fieldActions.init(state.value.fieldSize, state.value.bombs)

  return {
    state,
    fieldRows,
    actions: { handleCellOpen }
  }

}