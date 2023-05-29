<template>
  <div v-show="modalActive" class="w-full h-screen absolute">
    <div @click="close" class="h-screen w-screen absolute z-10 flex justify-center items-center bg-[#ABADAF]/20" >
    </div>
    <transition name="modal-animation">
      <Modal>
        hai
      </Modal>
    </transition>
  </div>
</template>

<script>
import Modal from './modal/greyModal.vue'
export default {
  components: {
    Modal,
  },
  props: [
    'modalActive'
  ],
  setup(props, {emit}) {
    const close = () => {
      emit('close')
    }
    return {
      close
    }
  }
}
</script>

<style scoped>

.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.5s ease;
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

</style>