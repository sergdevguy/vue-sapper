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
  const gameResult = ref<any>({ status: 'idle', gold: state.value.gold })

  // TODO бардак с бонусами
  function handleCellOpen(id: number) {
    if (gameStatus.value === 'win' || gameStatus.value === 'loose') {
      return
    }

    const result = openCellHandler(id)
    gameStatus.value = result

    if (result === 'loose') {
      stateActions.decLifes()
    } else if (result === 'win') {
      stateActions.incLevel()
    }

    if (!state.value.lifes) {
      gameResult.value = { status: 'gameoverLoose', gold: state.value.gold }
    } else if (state.value.level > GAME_CONFIG.totalLevels) {
      gameResult.value = { status: 'gameoverWin', gold: state.value.gold }
    } else {
      gameResult.value = { status: gameStatus.value, gold: state.value.gold }
    }
  }

  // TODO бардак с бонусами
  function selectBonus(bonus: any) {
    setTimeout(() => {
      if (bonus['incKrakens']) {
        stateActions.incBombs(2)
      } else if (bonus['decRow']) {
        stateActions.decRows(1)
      } else if (bonus['incGold']) {
        stateActions.incGold()
      }

      if (!state.value.lifes || state.value.level > GAME_CONFIG.totalLevels) {
        stateActions.reset()
      }
      fieldActions.reset(state.value.fieldSize, state.value.bombs)
      gameStatus.value = 'idle'
      gameResult.value = { status: 'idle', gold: state.value.gold }
    }, 1000)
  }

  function reset() {
    stateActions.reset()
    fieldActions.init(state.value.fieldSize, state.value.bombs)
    gameStatus.value = 'idle'
    gameResult.value = { status: 'idle', gold: state.value.gold }
  }

  fieldActions.init(state.value.fieldSize, state.value.bombs)

  return {
    state,
    fieldRows,
    gameResult,
    actions: { handleCellOpen, selectBonus, reset }
  }

}