import { computed, ref } from "vue";
import type { CellData, FieldSize } from "../types";
import { getSiblingsCells } from "../utils/main";

export function useField() {

  const field = ref<CellData[]>([])
  const fieldSize = ref<FieldSize>({ rows: 0, cols: 0 })

  const fieldRows = computed(() => {
    const result: CellData[][] = []
    for (let i = 0; i < fieldSize.value.rows; i++) {
      const start = i * fieldSize.value.cols
      const end = start + fieldSize.value.cols
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
      visited: false
    }))
  }

  function createBombsOnField(count: number, size: FieldSize) {
    const arr: number[] = []

    for (let i = 0; i < field.value.length; i++) {
      arr.push(i)
    }

    // TODO разобраться с ts ошибками
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }

    for (let i = 0; i < count; i++) {
      field.value[arr[i]].isBomb = true
      getSiblingsCells(arr[i]!, field, size).forEach((cell: CellData) => {
        cell.count += 1
      })
    }
  }

  function init(size: FieldSize, bombs: number) {
    fieldSize.value = size
    field.value = []
    field.value = createField(size.rows, size.cols)
    createBombsOnField(bombs, size)
  }

  function reset(size: FieldSize, bombs: number) {
    init(size, bombs)
  }

  return {
    field,
    fieldRows,
    fieldActions: { init, reset }
  }

}