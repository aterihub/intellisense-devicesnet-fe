import { defineStore } from 'pinia'
import hookAPI from '@/services/hookAPI'
import { ref } from 'vue'

export const useHookStore = defineStore('hook', {
  state: () => ({
    hooks : ref([]),
    hook : ref([]),
    isLoading: ref(false),
    status: ref({
      isError:null,
      message: null,
      code: null,
    })
  }),

  actions: {
    async getHooks() {
      this.isLoading = true
      try {
        const res = await hookAPI.getHooks()
        console.log(res)
        this.hooks = res.data.data.hooks.map((data) => {
          return {
            module: data.module,
            url: data.url,
            is_enable: data.is_enable,
          }
        })
        this.isLoading = false        
        this.status.code = res.data.status
      } catch (err) {
        this.isLoading = false
        this.status.message = err.response.data.error
        this.status.code = err.response.data.status
        return err
      }
    },
    async getHook(id) {
      this.isLoading = true
      try {
        const res = await hookAPI.getHook(id)
        console.log(res.data.data)
        this.hook.module = res.data.data.module
        this.hook.url = res.data.data.url
        this.hook.is_enable = res.data.data.is_enable
        this.isLoading = false        
        this.status.code = res.data.status
      } catch (err) {
        this.isLoading = false
        this.status.message = err.response.data.error
        this.status.code = err.response.data.status
        return err
      }
    },
    async updateHook(id,data) {
      this.isLoading = true
      try {
        const res = await hookAPI.updateHook(id,data)
        console.log(res)
        this.isLoading = false        
        this.status.message = 'Webhook Updated'
        this.status.code = res.data.status
        this.status.isError = false
        this.isLoading = false
        console.log(this.status)
      } catch (err) {
        console.log(err)
        this.isLoading = false
        this.status.isError = true
        this.status.code = err.response.status
        this.status.message = err.response.statusText
        console.log(this.status)
        return err
      }
    },
  }

})