import { computed, type Ref } from "vue";
import type { CellData, FieldSize, Status } from "../types";
import { getSiblingsCells } from "../utils/main";

type OpenResult = { count: number, isBomb: boolean }

export function useGameLogic(field: Ref<CellData[]>, size: FieldSize) {

  const openedCellsCount = computed(() =>
    field.value.filter(cell => cell.isOpened).length
  )

  const cellsToOpenCount = computed(() => {
    return field.value.length - field.value.filter((cell) => cell.isBomb).length
  })

  function openCell(id: number): OpenResult {
    const cell: CellData = field.value[id] as CellData

    if (cell.isOpened) {
      return { count: 0, isBomb: false }
    }

    if (cell.isBomb) {
      cell.isOpened = true
      return { count: 1, isBomb: true }
    }

    if (cell.count) {
      cell.isOpened = true
      return { count: 1, isBomb: false }
    }

    // ПУСТАЯ КЛЕТКА, ОТКРЫВАЕМ ВОЛНОЙ
    const visited: Set<CellData> = new Set([cell]);
    let currentLevel: CellData[] = [cell];
    let level = 0;
    const DELAY_BETWEEN_LEVELS = 90;
    let count = 0

    while (currentLevel.length > 0) {
      // Открываем все клетки текущего уровня с задержкой
      currentLevel.forEach(cell => {
        setTimeout(() => {
          cell.isOpened = true;
        }, level * DELAY_BETWEEN_LEVELS);
        count += 1
      });

      // Собираем клетки следующего уровня
      const nextLevel: CellData[] = [];

      for (const currentCell of currentLevel) {
        // Если клетка без цифры, добавляем ее соседей
        if (currentCell.count === 0) {
          const siblings = getSiblingsCells(currentCell.id, field, size);

          for (const neighbor of siblings) {
            if (!visited.has(neighbor)) {
              visited.add(neighbor);
              nextLevel.push(neighbor);
            }
          }
        }
      }

      currentLevel = nextLevel;
      level++;
    }

    return { count: count, isBomb: false }
  }

  function openCellHandler(id: number): Status {
    let result = openCell(id)

    if (result.isBomb) {
      return 'loose'
    }
    else if (openedCellsCount.value === cellsToOpenCount.value) {
      return 'win'
    }
    else {
      return 'idle'
    }
  }

  return { openCellHandler }

}