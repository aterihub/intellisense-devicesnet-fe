<template>
<sideNav :isSettingActive="true" /> 
<div class="content">
  <div class="navigation">
    <VerticalTab :tabs="tabs" @clicked="changeNavigation"/>
  </div>
  <div class="form">
    <component :is="selectedComponent" />
  </div>
</div>
</template> 
         
<script>
import VerticalTab from '@/components/tab/VerticalTab.vue' 
import DeviceTypeSetting from '@/views/Setting/DeviceTypeSetting.vue'
import DeviceInfo from '@/views/Devices/DeviceInfo.vue'
import EditDevice from '@/views/Devices/EditDevice.vue'
import sideNav from '@/components/navigation/sideNav.vue'
import Button from '@/components/button/BaseButton.vue'
import SearchBar from '@/components/SearchBar.vue'
import { onMounted, ref } from 'vue';

  export default {
    components: {
        VerticalTab,DeviceTypeSetting,DeviceInfo , EditDevice, sideNav, Button, SearchBar
    },
    props: ['id'],

    setup(props) {
      const selectedComponent = ref('DeviceTypeSetting')
      const tabs = [
        {
          title: 'Device Type',
          value: 'DeviceTypeSetting'
        },        
        {
          title: 'Setting A',
          value: 'RealtimeMap'
        },
        {
          title: 'Setting B',
          value: 'HeatMap'
        },
        {
          title: 'Setting C',
          value: 'DemoMap'
        }
      ]
 
      function changeNavigation(navigation) {
        var subNavs = document.getElementsByClassName("nav")
        console.log(subNavs)
        for (var i of subNavs) {
          i.classList.remove("active");
        }
        console.log(navigation)
        event.target.className += " active"
        selectedComponent.value = navigation
      }

      onMounted(async() => {
        var element = document.getElementById("Device Type");
        element.classList.add("active");
      })

      return {
        selectedComponent,
        tabs, 
        changeNavigation
      }
    }
  }
  
</script>
        
x<style scoped>
.content {
  @apply 
    w-full h-screen ml-[60px] p-[32px] pt-[112px]
    flex gap-8
}
.form {
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  @apply 
    w-full rounded-lg bg-white p-8
}
</style>