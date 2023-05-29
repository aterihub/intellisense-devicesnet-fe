<template>
  <div class="container" v-show="modalActive">
    <popupContent :message="message" />
  </div>
</template>

<script>
import { ref } from 'vue'
import popupContent from './popupContent.vue'
export default {
  components: {
    popupContent
  },
  props: [
    'message', 'modalActive'
  ],
  setup() {
    const modalActive = ref(true)
    const close = () => {
      modalActive.value = false
    }

    return {
      modalActive, close
    }
  }
}
</script>

<style scoped>

/* .container {
  @apply w-full h-full flex absolute top-0 
} */


</style>