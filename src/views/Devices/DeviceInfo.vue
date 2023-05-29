<template>
<div class="device-info bg-[#F7F7F7] rounded-lg w-full py-8 px-10 grid grid-cols-2 sm:grid-cols-3 gap-y-10">
  <div v-for="( value, key ) in formData" class="text-wrapper flex flex-col gap-2 text-left">
    <p  class="text-[#353535]/60 text-sm">{{ key }}</p>
    <p class="text-[#353535] text-base">{{ value }}</p>
  </div>  
</div>
</template>
     
<script setup>

import { useDevicesStore } from '@/stores/DevicesStore'
import { storeToRefs } from 'pinia'
import { onBeforeMount, ref } from 'vue'

  const props = defineProps({
    id: String
  })
  
  const devicesStore = useDevicesStore()
  const { deviceData } = storeToRefs(useDevicesStore())
  const formData = ref()
  
  onBeforeMount( async () => {
    await devicesStore.getDevice(props.id)
    formData.value = deviceData.value.fields
    formData.value.id = deviceData.value.id
    formData.value.serial_number = deviceData.value.serial_number
    formData.value.notes = deviceData.value.notes

  })

  
</script>
    
  <style scoped>
.content {
  @apply w-full h-fit px-5 py-[32px] ml-[60px] pt-[46px]
}
  .title {
    @apply
      text-[28px] font-normal flex justify-start items-center text-[#353535] opacity-80
  }
  .table-wrap {
    @apply
      h-[300px] py-[15px] mt-[5px]
      overflow-auto sm:overflow-visible
  }
  .content-header {
    @apply
    flex flex-row w-full justify-between mb-[30px]
  }
  
  .customize-table {
    cursor: pointer;
    --easy-table-header-font-size: 14px;
    --easy-table-header-background-color: #F7F7F7;
    --easy-table-header-font-color:	#3A3A3E;
    /* --easy-table-row-border:	1px solid #D2DDEE; */
    --easy-table-header-height:	40px;
  
    --easy-table-body-row-font-size:	14px;
    --easy-table-body-font-color:	#3A3A3E;
    --easy-table-body-row-height:	46px;
  
    --easy-table-footer-font-size:	12px;
    --easy-table-footer-height:	40px;
    --easy-table-footer-font-color:	#3A3A3E;
  }
    </style>