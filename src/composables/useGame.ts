import { computed } from "vue"
import { useField } from "./useField"
import { useGameLogic } from "./useGameLogic"
import { useState } from "./useState"

export function useGame() {

  const { state, stateActions } = useState()
  const { field, fieldRows, fieldActions } = useField(state.value.fieldSize, computed(() => state.value.bombs))
  const { openCellHandler } = useGameLogic(field, state.value.fieldSize)

  function handleCellOpen(id: number) {
    const result = openCellHandler(id)
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
      fieldActions.reset()
    }, 1000)
  }

  return {
    state,
    fieldRows,
    actions: { handleCellOpen }
  }

}