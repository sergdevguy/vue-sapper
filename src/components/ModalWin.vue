<script setup lang="ts">
import { inject } from 'vue';
import Modal from './Modal.vue';

const { updateBonus } = inject('bonus')
</script>

<template>
  <Modal>
    <template #title>
      <p>Вы победили кракена...</p>
    </template>
    <template #text>
      <p>но продолжаете путешествие, прихватив один из его <span class="font-bold text-green-500">даров</span></p>
      <p class="mt-1 text-sm">(Следующее поле <span class="text-red-500">+ 1 кракен, - 1 ряд</span>)</p>
    </template>
    <template #choice>
      <div class="flex justify-between gap-2">
        <div @click="updateBonus('gold')" class="inline-flex items-center p-2 border-1 rounded-sm text-green-500 hover:bg-green-100/30 cursor-pointer">
          <p>+ 100 золота</p>
        </div>
        <div @click="updateBonus('notChangeDifficulty')" class="p-2 border-1 rounded-sm text-green-500 hover:bg-green-100/30 cursor-pointer">
          <p>Не усложнять</p>
          <p>следующее поле</p>
        </div>
      </div>
    </template>
  </Modal>
</template>