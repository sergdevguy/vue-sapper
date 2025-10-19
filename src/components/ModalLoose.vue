<script setup lang="ts">
import { inject } from 'vue';
import Modal from './Modal.vue';

const { updateBonus } = inject('bonus')
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
        <div @click="updateBonus('bombsInc')" class="p-2 border-1 rounded-sm text-red-700 hover:bg-red-400/20 cursor-pointer">
          <p>+ 2 кракена</p>
        </div>
        <div @click="updateBonus('fieldDec')" class="p-2 border-1 rounded-sm text-red-700 hover:bg-red-400/20 cursor-pointer">
          <p>- 1 ряд поля</p>
        </div>
      </div>
    </template>
  </Modal>
</template>