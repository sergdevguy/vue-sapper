import type { Ref } from "vue"
import type { CellData, FieldSize } from "../types"

export function getSiblingsCells(cellId: number, field: Ref<CellData[]>, size: FieldSize): CellData[] {
  const rows = size.rows
  const cols = size.cols
  const row = Math.floor(cellId / cols)
  const col = cellId % cols

  const siblings: CellData[] = []

  for (let r = -1; r <= 1; r++) {
    for (let c = -1; c <= 1; c++) {
      if (r === 0 && c === 0) {
        continue
      }

      const newRow = row + r
      const newCol = col + c

      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
        siblings.push(field.value[newRow * cols + newCol]!)
      }
    }
  }

  return siblings
}