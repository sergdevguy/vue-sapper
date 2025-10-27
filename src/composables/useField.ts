import { computed, ref } from "vue";
import type { CellData } from "../types";
import { GAME_CONFIG } from "../gameConfig";

export function useField() {

  const field = ref<CellData[]>([])

  const fieldRows = computed(() => {
    const result: CellData[][] = []
    for (let i = 0; i < GAME_CONFIG.initialField.rows; i++) {
      const start = i * GAME_CONFIG.initialField.cols
      const end = start + GAME_CONFIG.initialField.cols
      result.push(field.value.slice(start, end))
    }
    return result
  })

  function createField(rows: number, cols: number) {
    return new Array(rows * cols).fill(null).map((_, index): CellData => ({
      id: index,
      isOpened: false,
      isBomb: false,
      count: 0,
      isHighlight: false,
    }))
  }

  function createBombsOnField() {
    const arr: number[] = []

    for (let i = 0; i < field.value.length; i++) {
      arr.push(i)
    }

    // TODO разобраться с ts ошибками
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }

    for (let i = 0; i < GAME_CONFIG.initialBombs; i++) {
      field.value[arr[i]].isBomb = true
      getSiblingsCells(arr[i]).forEach((cell: CellData) => {
        cell.count += 1
      })
    }
  }

  function getSiblingsCells(cellId: number): CellData[] {
    const rows = GAME_CONFIG.initialField.rows
    const cols = GAME_CONFIG.initialField.cols
    const row = Math.floor(cellId / cols)
    const col = cellId % cols

    const siblings: CellData[] = []

    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        if (r === 0 && c === 0) continue

        const newRow = row + r
        const newCol = col + c

        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
          siblings.push(field.value[newRow * cols + newCol])
        }
      }
    }

    return siblings
  }

  function initField() {
    field.value = createField(GAME_CONFIG.initialField.rows, GAME_CONFIG.initialField.cols)
    createBombsOnField()
  }

  initField()

  return { fieldRows }

}