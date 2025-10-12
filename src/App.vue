<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import Cell from './components/Cell.vue'

  // TODO или сделать цифровое представление что чем является?
  export type Cell = {
    isOpened: boolean
    isBomb: boolean
    count: number
  }

  const fieldRows = 20
  const fieldCols = 20
  const bombsCount = 60

  const field = ref<Array<Cell[]>>([])

  function createField() {
    for (let i = 0; i < fieldRows; i++) {
      field.value.push([])

      for (let j = 0; j < fieldCols; j++) {
        field.value[i]?.push({
          isOpened: false,
          isBomb: false,
          count: 0
        })
      }
    }
  }

  // TODO сейчас создаю массив из [row, col].
  // А можно просто числа хранить, например row/col - 10x10, число 50, это ячейка [5, 0]
  function createBombs() {
    const availableBombsPlaces = []
    for (let i = 0; i < fieldRows; i++) {
      for (let j = 0; j < fieldCols; j++) {
        availableBombsPlaces.push([i, j])
      }
    }

    for (let i = 0; i < bombsCount; i++) {
      const randomInt = getRandomInt(availableBombsPlaces.length)
      const newBombPlace = availableBombsPlaces[randomInt]
      // TODO разобраться с ошибкой типа
      field.value[newBombPlace[0]][newBombPlace[1]].isBomb = true
      numberedAroundBomb(newBombPlace)
      availableBombsPlaces.splice(randomInt, 1)
    }
  }

  // TODO переписать нормально этот треш
  function numberedAroundBomb(bombPlace: number[]) {
    const [row, cell] = bombPlace
    if (row) {
      field.value[row - 1][cell].count += 1
      if (cell) {
        field.value[row - 1][cell - 1].count += 1
      }
      if (cell < fieldCols - 1) {
        field.value[row - 1][cell + 1].count += 1
      }
    }
    if (row < fieldRows - 1) {
      field.value[row + 1][cell].count += 1
      if (cell) {
        field.value[row + 1][cell - 1].count += 1
      }
      if (cell < fieldCols - 1) {
        field.value[row + 1][cell + 1].count += 1
      }
    }
    if (cell) {
      field.value[row][cell - 1].count += 1
    }
    if (cell < fieldCols - 1) {
      field.value[row][cell + 1].count += 1
    }
  }

  function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max)
  }

  onMounted(() => {
    createField()
    createBombs()
  })
</script>

<template>
  <div class="w-screen h-screen bg-slate-800 flex justify-center items-center">
    <div class="border-1">
      <div v-for="row in field" class="flex">
        <Cell v-for="cell in row" :cell />
      </div>
    </div>
  </div>
</template>