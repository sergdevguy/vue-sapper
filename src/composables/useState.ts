import { ref } from "vue";
import type { State } from "../types";
import { GAME_CONFIG } from "../gameConfig";

export function useState() {

  const state = ref<State>({
    status: '',
    bonus: '',
    lifes: GAME_CONFIG.initialLifes,
    gold: GAME_CONFIG.initialGold,
    level: GAME_CONFIG.initialLevel,
    bombs: GAME_CONFIG.initialBombs,
    field: { ...GAME_CONFIG.initialField }
  })

  return { state }

}