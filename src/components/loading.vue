<template>
  <div :class="loading? 'appLoading appLoading-loading' : 'appLoading'">
    <div 
      v-if="loading"
      class="appLoading__backdrop">
      <div class="appLoading__wrapper">
        <!-- <div class="lottie">
          <lottie :options="lottieOptions" :width="400" :height="400" />
        </div> -->
      </div>
    </div>
  </div>
  
</template>

<script>
import animationData from '@/assets/animations/loading_anim.json'
export default {
  props: [
    'loading', 'message'
  ],
  data() {``
    return {
      lottieOptions: {
        animationData
      }
      // isLoading: props.loading,
      // message: ''
    }
  }
  // methods: {
  //   start(message) {
  //     this.message = message
  //     this.isLoading = true
  //   },
  //   finish() {
  //     this.isLoading = false
  //     this.message = ''
  //   }
  // }
}

  // function start(message) {
  //   message.value = message,
  //   isLoading.value = true
  // }

  // function finish() {
  //   message.value = '',
  //   isLoading.value = true
  // }


</script>

<style scoped>

.appLoading {
  @apply z-50 fixed
}
.appLoading__backdrop {
  @apply  
        bg-[#F9F9F9]/40 backdrop-blur-[6px]
        /* bg-white */
          fixed top-[80px] bottom-0 left-0 right-0
          flex justify-center items-center 
}

.appLoading__text {
  @apply  animate-pulse
          text-lg text-[#f2f2f2]
}

</style>