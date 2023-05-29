import { createRouter, createWebHistory } from 'vue-router'

import LoginForm from '@/views/Auth/LoginFormNew.vue'
import MainMap from '@/views/Map/MainMap.vue'
import DevicesCategory from '@/views/Devices/DevicesCategory.vue'
import DevicesList from '@/views/Devices/DevicesLists.vue'
import DeviceDetails from '@/views/Devices/DeviceDetails.vue'
import ResetPassword from '@/views/Auth/ResetPassword.vue'
import NotFound from '@/views/error/NotFound.vue'
import Setting from '@/views/Setting/Setting.vue'



const routes = [
  { path: '/', name: 'LoginForm', component: LoginForm, meta: { requiresAuth:false, title: 'Intellisense Connect - Login' } },
  { path: '/reset-password', name: 'ResetPassword', component: ResetPassword, meta: { requiresAuth:false} },
  { path: '/realtime-map', name: 'MainMap', component: MainMap, meta: { requiresAuth:true } },
  { path: '/devices', name: 'DevicesCategory', component: DevicesCategory, meta: { requiresAuth:true } },
  { path: '/devices/devices-list/:id', name: 'DevicesList', component: DevicesList, props: true, meta: { requiresAuth:true } },
  { path: '/devices/device-info/:id', name: 'DeviceDetails', component: DeviceDetails, props: true, meta: { requiresAuth:true } },
  { path: '/setting', name: 'Setting', component: Setting, meta: { requiresAuth:true } },

]

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL),
  routes
})

// router.beforeEach(async (to, from,  next) => {
//   document.title = 'Intellisense Connect | Connecting Assets'
//   if (to.meta.requiresAuth && !localStorage.getItem('auth.accessToken')){
//     next({ name: 'LoginForm'})
//   } else if (to.meta.requiresAuth && localStorage.getItem('auth.accessToken') || to.meta.freeAccess){
//     next()
//   } else if (!to.meta.requiresAuth && localStorage.getItem('auth.accessToken')){
//     next({name: 'DevicesList'})
//   } else next()
//   }) 

  //loading
// router.beforeEach(async (to, from, next) => {
//   const loadingStore = useLoadingStore()
//   loadingStore.startLoading()

//   // Wait for 500ms to simulate async operation
//   await new Promise(resolve => setTimeout(resolve, 500))

//   loadingStore.stopLoading()
//   next()
// })

export default router