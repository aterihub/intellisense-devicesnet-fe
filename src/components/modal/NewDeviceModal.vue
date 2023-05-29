<template>
  <div>
  <alert 
    :message ="status.message"
    :modalActive="modalActive"
    :isError="status.isError"
     @close="closeNotification" />
     <transition name="fade">
       <div class="modal" v-show="isOpen">
        <transition name="drop-in">
          <div class="modal-inner" v-show="isOpen" ref="target">
            <div class="modal-content">
            <h1 class="title">{{title}}</h1>
            <VeeForm  v-slot="{ handleSubmit }" as="div" ref="form" >
              <form  @submit="handleSubmit($event, onSubmit)" class="form-wrapper" >
                <BaseInput name="serial_number" type="link" placeholder="Serial Number" class="outlined" label="Serial Number" required/>
                <BaseInput v-for="field in fields" :name="field.value" type="link" :placeholder="field.text" class="outlined" :label="field.text" required/>
                <TextArea name="notes" placeholder="Write notes for this device" class="outlined" label="Notes"></TextArea>
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
import BaseButton from '../button/BaseButton.vue'
import { Form as VeeForm } from 'vee-validate'
import { useDeviceTypeStore } from '@/stores/DeviceTypeStore'
import { useDevicesStore } from '@/stores/DevicesStore'
import { ref, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { storeToRefs } from 'pinia'


  const props = defineProps({
      isOpen: Boolean,
      id: String,
      title: String
  })

  const deviceTypeStore = useDeviceTypeStore()
  const deviceStore = useDevicesStore()
  const { status, isLoading} = storeToRefs(useDevicesStore())
  const fields = ref([])

  const modalActive = ref(false)

  const cancelLabel = ref('CANCEL')
  const registerLabel = ref('REGISTER')
  const regButtonClick = ref(0)
  const cancelButtonClick = ref(0)

  onMounted(async() => {
    await deviceTypeStore.getDeviceType(props.id)
    fields.value = deviceTypeStore.deviceType.payload
  })

  const onSubmit = async (values, { resetForm }) => {
    const deviceData = ref({})
    deviceData.value.type_id = props.id
    deviceData.value.serial_number = values.serial_number 
    deviceData.value.notes = values.notes
    deviceData.value.fields = values
    delete deviceData.value.fields.serial_number
    delete deviceData.value.fields.notes

    regButtonClick.value = ++regButtonClick.value
    if (regButtonClick.value == 1) {
      registerLabel.value = 'the data entered is correct?'
    }

    if (regButtonClick.value == 2) {
      await deviceStore.createDevice(deviceData.value)
      modalActive.value = true
      if (!status.value.isError) {
        resetForm()
      }
      setTimeout(closeNotification, 3000)
      registerLabel.value = 'REGISTER'
      regButtonClick.value = 0
      deviceTypeStore.getDeviceType(props.id)
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