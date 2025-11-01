<script setup lang="ts">
  import { computed, inject } from 'vue';
  import Modal from './Modal.vue';
  import looseImg from '../../assets/loose.jpg'
  import badImg from '../../assets/bad.jpg'
  import normalImg from '../../assets/normal.jpg'
  import goodImg from '../../assets/good.jpg'

  const { restart } = inject('restart') as { restart: () => void }
  const { lifes, gold } = inject('statResult') // TODO type

  const bg = computed(() => {
    if (!lifes.value) return looseImg
    if (!gold.value) return badImg
    if (gold.value <= 400) return normalImg
    return goodImg
  })

  const badEnd = computed(() => gold.value === 0)
  const normalEnd = computed(() => gold.value && gold.value <= 400)
  const goodEnd = computed(() => gold.value === 500)
</script>

<template>
  <Modal :bg>
    <template #title>
      <p v-if="!lifes" class="text-red-500 text-shadow-sm text-shadow-black">Вы проиграли</p>
      <p v-else class="text-green-500 text-shadow-sm text-shadow-black">Вы выиграли</p>
    </template>
    <template #text>

      <div v-if="!lifes" class="p-2 text-shadow-sm text-shadow-black">
        <p>Кракен разрушил ваш корабль.</p>
        <p>Но вы спаслись на плоту. В скором времени вы вновь соберете команду и отправитесь за сокровищами.</p>
      </div>
      <div v-else-if="goodEnd" class="p-2 text-shadow-sm text-shadow-black">
        <p>Вы нашли все сокровища! ({{ gold }})</p>
        <p>С набитым трюмом золота вы отправились домой праздновать победу.</p>
        <p>О вас будут складывать легенды!</p>
      </div>
      <div v-else-if="normalEnd" class="p-2 text-shadow-sm text-shadow-black">
        <p>Вы нашли много золота! ({{ gold }})</p>
        <p>Пускай вы нашли и не все сокравища, зато выжили и отправились домой праздновать успешное путешествие!</p>
      </div>
      <div v-else-if="badEnd" class="p-2 text-shadow-sm text-shadow-black">
        <p>Вы не нашли золото, зато вернулись домой живым.</p>
        <p>Вы сказали всем что плыли не ради золота.</p>
      </div>
    </template>
    <template #choice>
      <button
        class="px-5 py-2 border-1 border-green-500 text-green-500 rounded-sm cursor-pointer bg-black/60 hover:bg-black/70"
        @click="restart">начать заново</button>
    </template>
  </Modal>
</template>