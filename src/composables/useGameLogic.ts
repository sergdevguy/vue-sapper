import { type Ref } from "vue";
import type { CellData, FieldSize } from "../types";
import { getSiblingsCells } from "../utils/main";

export function useGameLogic(field: Ref<CellData[]>, size: FieldSize) {

  function openCell(id: number) {
    const cell: CellData = field.value[id] as CellData

    if (cell.isOpened) {
      return {}
    }

    if (cell.isBomb) {
      cell.isOpened = true
      return
    }

    if (cell.count) {
      cell.isOpened = true
      return
    }

    // ПУСТАЯ КЛЕТКА, ОТКРЫВАЕМ ВОЛНОЙ
    const visited: Set<CellData> = new Set([cell]);
    let currentLevel: CellData[] = [cell];
    let level = 0;
    const DELAY_BETWEEN_LEVELS = 90;

    while (currentLevel.length > 0) {
      // Открываем все клетки текущего уровня с задержкой
      currentLevel.forEach(cell => {
        setTimeout(() => {
          cell.isOpened = true;
        }, level * DELAY_BETWEEN_LEVELS);
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
  }

  function openCellHandler(id: number) {
    let result = openCell(id)
  }

  return { openCellHandler }

}