import { computed, ref, type ComputedRef } from "vue";
import type { CellData, FieldSize } from "../types";
import { getSiblingsCells } from "../utils/main";

export function useField(size: FieldSize, bombs: ComputedRef<number>) {

  const field = ref<CellData[]>([])

  const fieldRows = computed(() => {
    const result: CellData[][] = []
    for (let i = 0; i < size.rows; i++) {
      const start = i * size.cols
      const end = start + size.cols
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

    for (let i = 0; i < bombs.value; i++) {
      field.value[arr[i]].isBomb = true
      getSiblingsCells(arr[i]!, field, size).forEach((cell: CellData) => {
        cell.count += 1
      })
    }
  }

  function initField() {
    field.value = []
    field.value = createField(size.rows, size.cols)
    createBombsOnField()
  }

  function reset() {
    initField()
  }

  initField()

  return {
    field,
    fieldRows,
    fieldActions: { reset }
  }

}