<script setup lang="ts">
  import { computed } from 'vue'
  import ModalLoose from './modals/ModalLoose.vue'
  import ModalWin from './modals/ModalWin.vue'
  import ModalGameover from './modals/ModalGameover.vue'

  const props = defineProps<{
    result: any
  }>()

  const emit = defineEmits<{
    select: [bonus: any]
  }>()

  const currentModal = computed(() => {
    if (props.result.status === 'loose') return ModalLoose
    if (props.result.status === 'win') return ModalWin
    if (props.result.status === 'gameoverLoose' || props.result.status === 'gameoverWin') return ModalGameover
  })

  function select(bonus: any) {
    emit('select', bonus)
  }
</script>

<template>
  <Transition>
    <component :is="currentModal" :result @select="select" />
  </Transition>
</template>

<style scoped>

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

</style>