<template>
<transition name="modal-animation">
  <div class="message-modal" v-show="modalActive">
    <div class="message-wrapper">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(236, 77, 45, 1);transform: ;msFilter:;"><path d="M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.493 2 11.953 2zM13 17h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>
      <div class="message"> {{ message }} </div>
    </div>
    <div class="close-btn" @click="close">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: #3A3A3E;transform: ;msFilter: ;"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  props:[
    'message', 'modalActive'
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

.message-modal { 
  @apply bg-[#ED424F]/10 px-3 py-2 top-6 right-6 rounded-2xl gap-5 drop-shadow-[0_0_6px_5px_rgba(0,0,0,0.05)]
  flex fixed border border-[#ED424F]/40 text-[#3a3a3e] text-sm items-center
}
.message-wrapper {
  @apply flex items-center gap-2
}
.close-btn svg {
 @apply cursor-pointer
}

.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.5s ease;
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}
</style>