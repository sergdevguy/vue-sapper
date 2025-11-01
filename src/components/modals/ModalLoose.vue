<script setup lang="ts">
  import { ref } from 'vue';
  import { BONUS } from '../../gameConfig';
  import Modal from '../modals/Modal.vue'

  const emit = defineEmits<{
    select: [id: number]
  }>()

  const isSelected = ref(false)

  function select(bonus: any) {
    if (!isSelected.value) {
      emit('select', bonus)
      isSelected.value = true
    }
  }
</script>

<template>
  <Modal>
    <template #title>
      <p>Вы попались Кракену...</p>
    </template>
    <template #text>
      <p>но убегаете, прихватив один из его <br> <span class="font-bold text-red-700">даров</span></p>
    </template>
    <template #choice>
      <div class="flex justify-between gap-2">
        <div @click="select(BONUS.incKrakens2)"
          class="p-2 border-1 rounded-sm text-red-700 hover:bg-red-400/20 cursor-pointer">
          <p>+ 2 кракена</p>
        </div>
        <div @click="select(BONUS.decRow)"
          class="p-2 border-1 rounded-sm text-red-700 hover:bg-red-400/20 cursor-pointer">
          <p>- 1 ряд поля</p>
        </div>
      </div>
    </template>
  </Modal>
</template>