import { ref } from "vue";
import type { State } from "../types";
import { GAME_CONFIG } from "../gameConfig";

export function useState() {

  const state = ref<State>(initBaseData())

  function initBaseData(): State {
    return {
      status: 'idle',
      bonus: '',
      lifes: GAME_CONFIG.initialLifes,
      gold: GAME_CONFIG.initialGold,
      level: GAME_CONFIG.initialLevel,
      bombs: GAME_CONFIG.initialBombs,
      fieldSize: { ...GAME_CONFIG.initialField }
    }
  }

  function reset() {
    initBaseData()
  }

  return { 
    state, 
    stateActions: { reset } 
  }

}