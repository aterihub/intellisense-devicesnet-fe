<template>

  <div class="device-info bg-[#F7F7F7] rounded-lg w-full py-8 px-10">
    <VeeForm v-slot="{ handleSubmit }" as="div" ref="form" >
      <form  @submit="handleSubmit($event, onSubmit)" class="form-wrapper" >
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-10">
          <BaseInput v-for=" (key, index) in fieldKeys" v-model="fieldValues[index]" :name="key" type="text" :placeholder="key" class="outlined" :label="key"/>
          <TextArea v-model="deviceData.notes" name="notes" placeholder="Write notes for this device" class="outlined" label="Notes"></TextArea>
        </div>
        <div class="max-w-[200px] ">
          <BaseButton type="submit" class="filled__green" :label="registerLabel" :loading="isLoading"  />
        </div>
      </form>
    </VeeForm>
  </div>
</template>
       
<script setup>

import { useDevicesStore } from '@/stores/DevicesStore'
import { storeToRefs } from 'pinia'
import { Form as VeeForm } from 'vee-validate'
import { onBeforeMount, ref } from 'vue';
import BaseInput from '@/components/input/BaseInput.vue'
import TextArea from '@/components/input/TextArea.vue'
import BaseButton from '@/components/button/BaseButton.vue' 

  const props = defineProps({
    id: String
  })
  const devicesStore = useDevicesStore()
  const { isLoading, deviceData } = storeToRefs(useDevicesStore())
  const fieldKeys = ref([])
  const fieldValues = ref([])

  onBeforeMount( async () => {
    await devicesStore.getDevice(props.id)
    console.log(deviceData.value)
    fieldKeys.value = Object.keys(deviceData.value.fields)
    fieldValues.value = Object.values(deviceData.value.fields)
    console.log(fieldKeys.value)
    console.log(fieldValues.value)
  })

  
  const registerLabel = ref('UPDATE')
  const regButtonClick = ref(0)
  const emits = defineEmits(['updated'])

  const onSubmit = async (values) => {
    const updatedData = ref({})
    updatedData.value.serial_number = deviceData.value.serial_number 
    updatedData.value.notes = values.notes
    updatedData.value.fields = values
    delete updatedData.value.fields.notes
    console.log(updatedData.value)

    regButtonClick.value = ++regButtonClick.value
    if (regButtonClick.value == 1) {
      registerLabel.value = 'the data entered is correct?'
    }
    if (regButtonClick.value == 2) {
      await devicesStore.updateDevice(props.id,updatedData.value)
      emits('updated')
      registerLabel.value = 'UPDATE'
      regButtonClick.value = 0
    }
  }


  
</script>
      
    <style scoped>
    
    .form-wrapper {
      @apply w-full flex flex-col gap-10
    }
      </style>