import { ref, watch } from "vue"
import type { Status } from "../types"
import { useField } from "./useField"
import { useGameLogic } from "./useGameLogic"
import { useState } from "./useState"
import { GAME_CONFIG } from "../gameConfig"

export function useGame() {

  const { state, stateActions } = useState()
  const { field, fieldRows, fieldActions } = useField()
  const { isWinHack, openCellHandler, updateSize } = useGameLogic(field)

  const gameStatus = ref<Status>('idle')
  const gameResult = ref<any>({ status: 'idle', gold: state.value.gold })

  // TODO бардак
  function handleCellOpen(id: number) {
    if (gameStatus.value === 'win' || gameStatus.value === 'loose') {
      return
    }

    const result = openCellHandler(id)
    gameStatus.value = result

    if (result === 'loose') {
      stateActions.decLifes()
      stateActions.incLevel()
    }
    // TODO хак с watch пока сделал
    // else if (result === 'win') {
    //   stateActions.incLevel()
    // }

    if (!state.value.lifes) {
      gameResult.value = { status: 'gameoverLoose', gold: state.value.gold }
    }
    // TODO хак с watch пока сделал
    // else if (state.value.level > GAME_CONFIG.totalLevels) {
    //   gameResult.value = { status: 'gameoverWin', gold: state.value.gold }
    // } 
    else {
      gameResult.value = { status: gameStatus.value, gold: state.value.gold }
    }
  }

  // TODO бардак
  function selectBonus(bonus: any) {
    setTimeout(() => {
      if (bonus['incKrakens']) {
        stateActions.incBombs(2)
      } else if (bonus['decRow']) {
        stateActions.decRows(1)
      } else if (bonus['incGold']) {
        stateActions.incGold()
        stateActions.decRows(1)
        stateActions.incBombs(1)
      } else if (bonus['notHard']) { }

      fieldActions.reset(state.value.fieldSize, state.value.bombs)
      updateSize(state.value.fieldSize)
      gameStatus.value = 'idle'
      gameResult.value = { status: 'idle', gold: state.value.gold }
    }, 1000)
  }

  function reset() {
    stateActions.reset()
    fieldActions.reset(state.value.fieldSize, state.value.bombs)
    updateSize(state.value.fieldSize)
    gameStatus.value = 'idle'
    gameResult.value = { status: 'idle', gold: state.value.gold }
  }

  fieldActions.init(state.value.fieldSize, state.value.bombs)
  updateSize(state.value.fieldSize)

  // TODO поле открывается волной. При большой волне результат открытия клетки не успевает вернуть что всё поле открыто.
  watch(isWinHack, () => {
    if (isWinHack.value) {
      stateActions.incLevel()

      if (state.value.level > GAME_CONFIG.totalLevels) {
        gameResult.value = { status: 'gameoverWin', gold: state.value.gold }
      } else {
        gameStatus.value = 'win'
        gameResult.value = { status: gameStatus.value, gold: state.value.gold }
      }
    } else {
      gameStatus.value = 'idle'
      gameResult.value = { status: gameStatus.value, gold: state.value.gold }
    }
  })

  return {
    state,
    fieldRows,
    gameResult,
    actions: { handleCellOpen, selectBonus, reset }
  }

}