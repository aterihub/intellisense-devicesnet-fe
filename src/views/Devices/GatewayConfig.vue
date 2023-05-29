<template>
  <sideNav :isDevicesActive="true" />
  <div class="device-container">
    <h1 class="title"> Gateway Config </h1>
    <div class="table-wrap">
      <div class="table-header">
        <div class="button-wrapper">
          <Button type="button" class="filled__green" label="Add New Gateway" :loading="postControlIsLoading"/>
        </div>
      </div>
      <EasyDataTable
      table-class-name="customize-table"
      :headers="header"
      :items="item"
      theme-color="#1363df"        
      :search-field="Name"
      :search-value="searchValue"
      @click-row="testClick"
      >
      </EasyDataTable>
    </div>
  </div>
</template>
    
<script setup>
import sideNav from '@/components/navigation/sideNav.vue'
import Button from '@/components/button/BaseButton.vue'
  
  const props = defineProps({
    id: String
})
  const header = [
    { text: "Name", value: "name" },
    { text: "Height (cm)", value: "height", sortable: true },
    { text: "Weight (kg)", value: "weight", sortable: true },
    { text: "Age", value: "age", sortable: true },
  ]
  
  const item = [
    { "name": props.id, "height": 178, "weight": 77, "age": 20 },
  ]
  

  
</script>
    
  <style scoped>
  .device-container {
    @apply 
      ml-[60px] px-5 py-[32px]
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
  .table-header {
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