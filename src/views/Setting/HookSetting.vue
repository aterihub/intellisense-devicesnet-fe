<template>
<EditHookModal 
  :isOpen="isEditModalPops"
  @close="editModalToggle"
  title="Edit Gateway"
  :formData="deviceInfo"
  />
<alert 
  :message ="status.message"
  :modalActive="modalActive"
  :isError="status.isError"
  @close="closeNotification" 
/>
<h1 class="title"> Webhook List </h1>
<div class="table-wrap">
  <div class="table-header">
    <div class="search-wrapper">
      <SearchBar class="outlined" v-model="searchValue" />
    </div>
  </div>
  <EasyDataTable
  table-class-name="customize-table"
  :headers="header"
  :items="hookStore.hooks"
  theme-color="#1363df"        
  search-field="name"
  :search-value="searchValue"
  sort-by="module"
  >
  <template #item-operation="item">
    <div class="operation">
    <div class="toggle-wrapper">
      <span class="font-semibold"></span>
      <label class="inline-flex relative items-center cursor-pointer">
      <input 
        type="checkbox"
        @change="onToggle(item)"
        v-model="item.is_enable"
        class="sr-only peer">
        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
    </div>
    <svg class="cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="editModalToggle(item)">
      <path d="M6.03984 17.625C6.08672 17.625 6.13359 17.6203 6.18047 17.6133L10.1227 16.9219C10.1695 16.9125 10.2141 16.8914 10.2469 16.8563L20.182 6.92109C20.2038 6.89941 20.221 6.87366 20.2328 6.8453C20.2445 6.81695 20.2506 6.78656 20.2506 6.75586C20.2506 6.72516 20.2445 6.69477 20.2328 6.66642C20.221 6.63806 20.2038 6.61231 20.182 6.59063L16.2867 2.69297C16.2422 2.64844 16.1836 2.625 16.1203 2.625C16.057 2.625 15.9984 2.64844 15.9539 2.69297L6.01875 12.6281C5.98359 12.6633 5.9625 12.7055 5.95312 12.7523L5.26172 16.6945C5.23892 16.8201 5.24707 16.9493 5.28545 17.071C5.32384 17.1927 5.39132 17.3032 5.48203 17.393C5.63672 17.543 5.83125 17.625 6.03984 17.625V17.625ZM7.61953 13.5375L16.1203 5.03906L17.8383 6.75703L9.3375 15.2555L7.25391 15.6234L7.61953 13.5375V13.5375ZM20.625 19.5938H3.375C2.96016 19.5938 2.625 19.9289 2.625 20.3438V21.1875C2.625 21.2906 2.70937 21.375 2.8125 21.375H21.1875C21.2906 21.375 21.375 21.2906 21.375 21.1875V20.3438C21.375 19.9289 21.0398 19.5938 20.625 19.5938Z" fill="#353535" fill-opacity="0.6"/>
    </svg>
    </div>
  </template>
</EasyDataTable>

</div>
</template>
    
<script setup>
import EditHookModal from '@/components/modal/hook-setting/EditHookModal.vue'
import SearchBar from '@/components/SearchBar.vue'
import { onMounted, ref} from 'vue';
import { useHookStore } from '@/stores/HookStore'
import { storeToRefs } from 'pinia';

  const isEditModalPops = ref(false)
  const modalActive = ref(false)
  const deviceInfo = ref({})
  const searchValue = ref('')
  const header = [
    { text: "Module", value: "module",sortable: true },
    { text: "Url", value: "url", sortable: true },
    { text: "Status", value: "is_enable"},
    { text: "", value: "operation", width: 100 },
  ]
  const hookStore = useHookStore()
  const { status } = storeToRefs(useHookStore())

  onMounted( async () => {
    await hookStore.getHooks()
    console.log(hookStore.hooks)
  })

  async function onToggle(data) {
    console.log(data)
    let isEnable = {isEnable : data.is_enable}
    await hookStore.updateHook(data.module,isEnable)
    modalActive.value = true
    setTimeout(closeNotification, 3000)
    hookStore.getHooks()
  }

  function editModalToggle(data) {
    console.log(data)
    deviceInfo.value = data
    isEditModalPops.value = !isEditModalPops.value
  }

  const closeNotification = () => {
    modalActive.value = false
  }
  
</script>
    
  <style scoped>
.content {
  @apply w-full h-fit ml-[60px] mt-[60px]
} 
.title {
  @apply
    text-[28px] font-thin flex justify-start items-center text-[#353535] opacity-80 mb-8
}
.device-container {
  @apply 
    p-[32px] flex flex-col gap-9
}
  .table-wrap {
    @apply 
      h-[300px]
      overflow-auto sm:overflow-visible
  }
  .table-header {
    @apply
    flex flex-row w-full justify-between mb-[30px]
  }
  .search-wrapper {
    @apply
      w-[280px] h-[40px]
  }
  .operation {
    @apply flex gap-4
  }
  
  .customize-table {
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
