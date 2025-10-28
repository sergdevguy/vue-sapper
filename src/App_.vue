<script setup lang="ts">
  import { computed, onMounted, provide, ref, watch } from 'vue'
  import Field from './components/Field.vue'
  import Cell from './components/Cell.vue'
  import ModalLoose from './components/ModalLoose.vue'
  import ModalWin from './components/ModalWin.vue'
  import ModalGameover from './components/ModalGameover.vue'
  import life from './assets/life.png'
  import { GAME_CONFIG } from './gameConfig'

  type State = {
    status: Status
    bonus: Bonus
    lifes: number
    gold: number
    level: number
    bombs: number
    field: { rows: number, cols: number }
  }

  type Status = 'loose' | 'win' | 'gameover' | ''

  export type Bonus = 'bombsInc' | 'fieldDec' | 'gold' | 'notChangeDifficulty' | ''

  export type Cell = {
    id: [number, number]
    isOpened: boolean
    isBomb: boolean
    count: number
    isHighlight: boolean
  }

  const state = ref<State>({
    status: '',
    bonus: '',
    lifes: GAME_CONFIG.initialLifes,
    gold: GAME_CONFIG.initialGold,
    level: GAME_CONFIG.initialLevel,
    bombs: GAME_CONFIG.initialBombs,
    field: { ...GAME_CONFIG.initialField }
  })

  const field = ref<Array<Cell[]>>([])
  const bombsId = ref<Array<[number, number]>>([])

  provide('bonus', {
    updateBonus
  })

  provide('restart', {
    restart
  })

  provide('statResult', {
    lifes: computed(() => state.value.lifes),
    gold: computed(() => state.value.gold)
  })

  const fieldSize = computed(() => {
    return state.value.field.rows * state.value.field.cols
  })

  // TODO больно.. нужен плоский массив поля
  const openedCellsCount = computed(() =>
    field.value.flat().filter(cell => cell.isOpened).length
  )

  const shakeAnimClass = computed(() => {
    return {
      'animate-shake': state.value.status === 'loose' || state.value.status === 'gameover' && !state.value.lifes,
    }
  })

  function createField() {
    const newField: Cell[][] = []
    for (let i = 0; i < state.value.field.rows; i++) {
      const row: Cell[] = []

      for (let j = 0; j < state.value.field.cols; j++) {
        row.push({
          id: [i, j],
          isOpened: false,
          isBomb: false,
          count: 0,
          isHighlight: false
        })
      }
      newField.push(row)
    }
    field.value = newField
  }

  function createBombs() {
    const arr: number[] = []

    for (let i = 0; i < fieldSize.value; i++) {
      arr.push(i)
    }

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }

    for (let i = 0; i < state.value.bombs; i++) {
      const row = Math.trunc(arr[i] / state.value.field.cols)
      const col = arr[i] % state.value.field.cols
      field.value[row][col].isBomb = true
      getSiblingsCells([row, col]).forEach((cell: Cell) => {
        cell.count += 1
      })
      bombsId.value.push([row, col])
    }
  }

  function openCell(cellId: [number, number]) {
    const cell: Cell = field.value[cellId[0]]![cellId[1]]!

    if (cell.isOpened || state.value.status) {
      return
    }

    if (cell.isBomb) {
      loose(cellId)
      return
    }

    if (cell.count) {
      cell.isOpened = true
      return
    }

    searchAndOpenSiblingsCells(field.value[cellId[0]]![cellId[1]]!)

    function searchAndOpenSiblingsCells(cell: Cell) {
      const visited: Set<Cell> = new Set([cell]);
      let currentLevel: Cell[] = [cell];
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
        const nextLevel: Cell[] = [];

        for (const currentCell of currentLevel) {
          // Если клетка без цифры, добавляем ее соседей
          if (currentCell.count === 0) {
            const siblings = getSiblingsCells(currentCell.id);

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
  }

  function getSiblingsCells(id: [number, number]): Cell[] {
    const siblingsId = [
      [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]
    ]

    const acceptedSiblings: Cell[] = []

    for (let i = 0; i < siblingsId.length; i++) {
      const sibling = [id[0] + siblingsId[i]![0]!, id[1] + siblingsId[i]![1]!]
      // cell in field
      if (sibling[0] >= 0 && sibling[0] < state.value.field.rows && sibling[1] >= 0 && sibling[1] < state.value.field.cols) {
        acceptedSiblings.push(field.value[sibling[0]][sibling[1]])
      }
    }

    return acceptedSiblings
  }

  function loose(cellId: [number, number]) {
    const cell: Cell = field.value[cellId[0]]![cellId[1]]!
    cell.isOpened = true

    showBombs(cellId)

    state.value.lifes -= 1
    if (!state.value.lifes || GAME_CONFIG.totalLevels - state.value.level === 0) {
      state.value.status = 'gameover'
    } else {
      state.value.status = 'loose'
    }
  }

  function showBombs(loosedCell: [number, number]) {
    bombsId.value.forEach((id: [number, number]) => {
      if (loosedCell[0] === id[0] && loosedCell[1] === id[1]) {
        field.value[id[0]][id[1]].isHighlight = true
      } else {
        field.value[id[0]][id[1]].isOpened = true
      }
    })
  }

  function updateBonus(bonus: Bonus) {
    state.value.bonus = bonus
  }

  function reset() {
    if (state.value.status === 'win') {
      state.value.field.rows -= 1
      state.value.bombs += 1
    }

    state.value.bonus = ''
    state.value.status = ''
    state.value.level += 1
    field.value = []
    bombsId.value = []

    createField()
    createBombs()
  }

  function restart() {
    state.value.level = 0
    state.value.gold = 0
    state.value.lifes = 3
    state.value.bombs = GAME_CONFIG.initialBombs
    state.value.field.rows = GAME_CONFIG.initialField.rows
    state.value.field.cols = GAME_CONFIG.initialField.cols
    reset()
  }

  onMounted(() => {
    createField()
    createBombs()
  })

  // реагируем на выбор бонуса после игры
  watch(() => state.value.bonus, () => {
    if (!state.value.lifes || !state.value.bonus) {
      return
    }

    switch (state.value.bonus) {
      case 'bombsInc':
        state.value.bombs += 2
        break;
      case 'fieldDec':
        state.value.field.rows -= 1
        break;
      case 'gold':
        state.value.gold += 100
        break;
      case 'notChangeDifficulty':
        state.value.bombs -= 1
        state.value.field.rows += 1
        break;
      default:
        break;
    }

    reset()
  })

  // проверяем на победу (фиксируем в state.status)
  watch(() => openedCellsCount.value, () => {
    const isWin = fieldSize.value - openedCellsCount.value === state.value.bombs
    if (GAME_CONFIG.totalLevels - state.value.level === 0 && isWin) {
      state.value.status = 'gameover'
    } else if (isWin && state.value.status !== 'loose') {
      state.value.status = 'win'
    }
  })
</script>

<template>
  <div class="w-screen h-screen bg-sky-950 flex flex-col  justify-center items-center">
    <Transition>
      <ModalLoose v-if="state.status === 'loose'" />
      <ModalWin v-else-if="state.status === 'win'" />
      <ModalGameover v-else-if="state.status === 'gameover'" />
    </Transition>
    <div class="mb-2 text-center text-white font-light">
      <div>Уровень: {{ state.level }} из {{ GAME_CONFIG.totalLevels }}</div>
      <div>Золото: <span class="text-amber-300">{{ state.gold }}</span></div>
    </div>
    <div class="relative z-2 mb-5 flex gap-3">
      <TransitionGroup name="lifes">
        <div v-for="i in state.lifes" :key="i"
          class="w-[24px] h-[24px] bg-size-[70%] bg-center bg-no-repeat bg-sky-600/60 rounded-sm"
          :style="{ backgroundImage: `url(${life})` }"></div>
      </TransitionGroup>
    </div>
    <Field :field @open="openCell" :class="shakeAnimClass" />
  </div>
</template>

<style scoped lang="scss">

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-active {
    transition-delay: 1.5s;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }

  .lifes-enter-active,
  .lifes-leave-active {
    transition: all 1.5s ease;
  }

  .lifes-enter-from,
  .lifes-leave-to {
    opacity: 0;
    transform: scale(4);
  }
</style>