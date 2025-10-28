import { useField } from "./useField"
import { useGameLogic } from "./useGameLogic"
import { useState } from "./useState"

export function useGame() {

  const { state } = useState()
  const { field, fieldRows } = useField(state.value.field, state.value.bombs)
  const { openCellHandler } = useGameLogic(field, state.value.field)

  function handleCellOpen(id: number) {
    const result = openCellHandler(id)
    alert(result)
    // if (result.status === 'lose') screen.value = 'punishment'
    // if (result.status === 'win') screen.value = 'shop'
  }

  return {
    fieldRows,
    actions: { handleCellOpen }
  }

}