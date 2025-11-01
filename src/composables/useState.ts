import { ref } from "vue";
import type { State } from "../types";
import { GAME_CONFIG } from "../gameConfig";

export function useState() {

  const state = ref<State>(initBaseData())

  function initBaseData(): State {
    return {
      status: 'idle',
      lifes: GAME_CONFIG.initialLifes,
      gold: GAME_CONFIG.initialGold,
      level: GAME_CONFIG.initialLevel,
      bombs: GAME_CONFIG.initialBombs,
      fieldSize: { ...GAME_CONFIG.initialField }
    }
  }

  function decLifes() {
    state.value.lifes -= 1
  }

  function incLevel() {
    state.value.level += 1
  }

  function incBombs(val: number) {
    state.value.bombs += val
  }

  function decRows(val: number) {
    state.value.fieldSize.rows -= val
  }

  function reset() {
    state.value = initBaseData()
  }

  return { 
    state, 
    stateActions: { reset, incLevel, decLifes, incBombs, decRows } 
  }

}