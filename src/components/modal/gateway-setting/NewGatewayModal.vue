<template>
  <div>
  <alert 
  :message ="status.message"
    :modalActive="modalActive"
    :isError="isError"
     @close="closeNotification" />
     <transition name="fade">
       <div class="modal" v-show="isOpen">
        <transition name="drop-in">
          <div class="modal-inner" v-show="isOpen" ref="target">
            <div class="modal-content">
            <h1 class="title">{{title}}</h1>
            <VeeForm :validation-schema="schema" v-slot="{ handleSubmit }" as="div" ref="form" >
              <form  @submit="handleSubmit($event, onSubmit)" class="form-wrapper" >
                <BaseInput name="serial_number" type="text" placeholder="Input serial number" class="outlined" label="Serial Number"/>
                <BaseInput name="name" type="text" placeholder="Define gateway name" class="outlined" label="Name"/>
                <TextArea name="notes" placeholder="Write notes for this gateway" class="outlined" label="Notes"></TextArea>
                <div class="flex justify-between gap-10">
                  <BaseButton type="button" class="filled__softblue" :label="cancelLabel" @click="cancelForm"/>
                  <BaseButton type="submit" class="filled__green" :label="registerLabel" :loading="isLoading"  />
                </div>
              </form>
            </VeeForm>
          </div>
        </div>
      </transition>
    </div>
  </transition>
  </div>
</template>

  
<script setup>
import BaseInput from '@/components/input/BaseInput.vue'
import TextArea from '@/components/input/TextArea.vue'
import BaseButton from '../../button/BaseButton.vue'
import { Form as VeeForm } from 'vee-validate'
import { newGatewaySchema } from '@/composable/validationSchemas'
import { useGatewayStore } from '@/stores/GatewayStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
 
  const props = defineProps({
      isOpen: Boolean,
      title: String
  })

  const schema = newGatewaySchema  
  const isError = ref(false)
  const modalActive = ref(false)
  const gatewayStore = useGatewayStore()
  const { status, isLoading } = storeToRefs(useGatewayStore())
  const cancelLabel = ref('CANCEL')
  const registerLabel = ref('REGISTER')
  const regButtonClick = ref(0)
  const cancelButtonClick = ref(0)
  const delay = (time) => new Promise((resolve) => setTimeout(resolve, time))

  const onSubmit = async (values, { resetForm }) => {

    console.log(values)

    regButtonClick.value = ++regButtonClick.value
    if (regButtonClick.value == 1) {
      registerLabel.value = 'the data entered is correct?'
    }

    if (regButtonClick.value == 2) {

      await gatewayStore.createGateway(values)
      modalActive.value = true

      if (status.value.code == 'fail') {
        isError.value = true
        setTimeout(closeNotification, 3000)
      } else {
        isError.value = false
        setTimeout(closeNotification, 3000)
        resetForm()
      }
      registerLabel.value = 'REGISTER'
      regButtonClick.value = 0
      delay(300)
      gatewayStore.getGateways()

    }
  }

  const closeNotification = () => {
    modalActive.value = false
  }
  // Define custom events
  const emits = defineEmits(['close'])
  
  const form = ref(null)
  const target = ref(null)

  onClickOutside(target, () => {
    if (props.isOpen) {
      emits('close')
    }
  })

  function cancelForm() {
    cancelButtonClick.value = ++cancelButtonClick.value
    switch (cancelButtonClick.value) {
      case 1:
      cancelLabel.value = 'The entered data will be lost!'
        break;
      case 2:
      form.value.resetForm()
      emits('close')
      cancelButtonClick.value = 0
      cancelLabel.value = 'CANCEL'
        break;
    }
  }


</script>
  
  <style scoped>

  .title {
    @apply text-left border-b-[1px] pb-[18px] text-[28px] font-normal text-[#8E8E93]
  }
  

  .message-wrapper {
    @apply flex items-center gap-2
  }
  
  .form-wrapper{
    @apply flex flex-col gap-6
  }

  
.modal {
  @apply
    fixed top-0 left-0 w-full h-full
    overflow-x-hidden overflow-y-auto
    bg-[#ABADAF]/20 z-10
}

.modal-inner {
  @apply 
    max-w-[500px] my-[100px] mx-auto
}

.modal-content {
  @apply 
    relative w-[600px] p-[40px] bg-white gap-[30px] rounded-xl
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.drop-in-enter-active,
.drop-in-leave-active {
  transition: all 0.3s ease-out;
}

.drop-in-enter-from,
.drop-in-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}


  
  </style>