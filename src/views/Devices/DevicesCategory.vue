<template>
    <sideNav :isDevicesActive="true" />
    <div class="content">
      <div class="device-container">
        <h1 class="title"> Devices Category </h1>
        <div class="card-wrapper">
          <div v-for="device in deviceTypeStore.deviceTypes" :key="device.id" class="card" @click="router.push({name: 'DevicesList', params: {id: device.id}})">
            <div class="flex items-center gap-4">
              <!-- <img class="w-[40px]" :src=device.imageSrc alt="SVG Image"> -->
              <h1 class="font-bold text-2xl">{{device.name}}</h1>
            </div>
            <p class="font-light">{{device.notes}}</p>
          </div>
        </div>
      </div> 
    </div>

  </template>
  
<script setup>
  import sideNav from '@/components/navigation/sideNav.vue'
  import { onMounted, ref} from 'vue'
  import { useDeviceTypeStore } from '@/stores/DeviceTypeStore'
  import router from '@/router';
 
  const deviceTypeStore = useDeviceTypeStore()

  onMounted( async () => {
    await deviceTypeStore.getDeviceTypes()
  })

  // var devicesCategory = [
  //   {
  //     id: 0,
  //     title: 'Smart Gate',
  //     desc: 'Ticketing and Access Controller devices',
  //     name: 'smartGate',
  //     imageSrc: require('../../assets/icon/gate-icon.svg'),
  //     path: 'GateList'
  //   },
  //   {
  //     id: 1, 
  //     title: 'Smart Band', 
  //     desc: 'Visitor positioning and tagging devices', 
  //     name: 'smartBand', 
  //     imageSrc: require('../../assets/icon/beacon-icon.svg'),
  //     path: 'BLEList'
  //   }
  //   ]

</script>
  
  <style scoped>
.content {
  @apply w-full h-fit ml-[60px] mt-[80px]
} 
.title {
  @apply
    text-[28px] font-thin flex justify-start items-center text-[#353535] opacity-80
}
.device-container {
  @apply 
    pl-[32px] pb-[32px] flex flex-col gap-9 pt-[32px]
}
.tab-wrapper{
  @apply
    w-fit px-5 pt-8
}
.card-wrapper {
  @apply
    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 
}
.card {
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  @apply 
    rounded-md bg-white cursor-pointer
    flex flex-col p-6 text-left border gap-4 
    transition-all ease-in-out duration-300
}
.card:hover {
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  @apply -translate-y-1 
}
  </style>