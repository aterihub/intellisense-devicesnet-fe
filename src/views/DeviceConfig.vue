<template>
  <sidebar 
    :backOn="true" 
    :noSocial="true" 
    />
  <div class="device-container">
    <deviceCard 
      :small=true
      :content="newData" />
  </div>
  <div class="dashboard-container">
    <intellisenseTitle :title="title" />
    <div class="content">
      <div class="sensor">
        <router-link :to="{name: 'SensorView'}"><img src="@/assets/sensor.png"></router-link>
      </div>
      <div class="irrigation">
        <router-link :to="{name: 'IrrigationView'}"><img src="@/assets/irrigation.png"></router-link>
      </div>
      <div class="ferrigation">
        <router-link :to="{name: 'FerrigationView'}"><img src="@/assets/ferrigation.png"></router-link>
      </div>
      <div class="webcam">
        <router-link :to="{name: 'Webcam'}"><img src="@/assets/webcam.png"></router-link>
      </div>
      <div class="map">
        <router-link :to="{name: 'MapView'}"><img src="@/assets/map.png"></router-link>
      </div>
      <div class="report">
        <router-link :to="{name: 'ReportView'}"><img src="@/assets/report.png"></router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useDevicesStore } from '@/stores/DevicesStore'
  import { storeToRefs } from 'pinia'
  import { defineAsyncComponent,  computed,  onBeforeMount,  ref } from '@vue/runtime-core'

  //props
  const props = defineProps({
    id: String
  })

  //asynchronus component
  const deviceCard = defineAsyncComponent(
    () => import('@/components/cards/deviceCard.vue'),
  )
  //state
  const devicesStore = useDevicesStore()
  const { isLoading } = storeToRefs(useDevicesStore())
  const newData = computed(() => {
      return [devicesStore.deviceData]
    })
  
  const title = ref()

  onBeforeMount( async () => {
    await devicesStore.loadDevice(props.id)
    title.value = 'Idrosat:' + devicesStore.deviceData.name
  })


</script>

<style scoped>
.dashboard-container {
  @apply flex flex-col w-full justify-center items-center
}

.device-container {
  @apply 
    flex flex-col fixed items-center gap-2
    bottom-0 left-4
    pb-4 sm:pb-8
}

.content {
  @apply 
    flex flex-wrap justify-center 
    w-[300px] gap-1
    sm:w-[500px] sm:gap-6
    md:w-[700px] md:gap-8
    lg:w-[800px] lg:gap-10
    transition-all ease-in-out delay-300

}

span h1 {
  @apply sm:text-3xl text-xl text-[#353535] font-medium
}

span h2 {
  @apply text-xs font-light
}

span p {
  @apply text-base font-normal
}

.content div {
  @apply p-2 rounded   
  w-28 h-28
  sm:w-36 sm:h-36 
  md:w-44 md:h-44 
  lg:w-48 lg:h-48
  transition-all ease-in-out duration-300
}
.content div:hover {
  box-shadow: 0px 0px 8px 6px rgba(255, 255, 255, 0.48);
  @apply transition-all ease-in-out duration-300 rounded-3xl
}
/* .content img {
  @apply 
  w-24 h-24
  sm:w-32 sm:h-32 
  md:w-40 md:h-40 
  lg:w-60 lg:h-60
  transition-all ease-in-out delay-150
} */
</style>