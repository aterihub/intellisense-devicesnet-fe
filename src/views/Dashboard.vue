<template>
    <sidebar 
      :backOn="false" 
      :noSocial="true"
      :logout="true" 
    />
    <div class="dashboard-container">
      <IdroTitle title='Benvenuti nel nuovo portale di Idrobit'/>
      <div class="menu">
        <div class="account">
          <router-link :to="{name: 'LoginForm'}"><img src="../assets/account.png"></router-link>
        </div>
        <div class="impianto">
          <router-link :to="{name: 'DevicesCategory'}"><img src="../assets/impianto.png"></router-link>
        </div>
      </div>
    </div>
</template>

<script>
import sidebar from '@/components/navigation/sideNav.vue'
import { ref } from '@vue/reactivity';
export default {
  name: 'Dashboard',
  components: {
    sidebar
  }
}
</script>

<style scoped>
.dashboard-container {
  @apply flex flex-col w-full
}

.header {
  @apply flex flex-col justify-center mt-10 h-fit w-full items-center gap-10
}
.header img {
  @apply w-20 sm:w-40
}

span h1 {
  @apply sm:text-3xl text-xl text-[#353535] font-medium
}

.menu {
  @apply  flex items-center
          mt-6 sm:mt-24
          gap-4 lg:gap-10
          flex-col md:flex-row
          justify-between mx-auto
}

.menu .account, .impianto {
  @apply w-52 h-52 md:w-60 md:h-60 lg:w-72 lg:h-72 transition-all ease-in-out delay-150 hover:-translate-y-2
}

.account, .impianto {
  @apply transition-all ease-in-out delay-150 
}
</style>