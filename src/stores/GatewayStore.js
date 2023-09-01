import { defineStore } from 'pinia'
import gatewayAPI from '@/services/gatewayAPI'
import { ref } from 'vue'

export const useGatewayStore = defineStore('gateway', {
  state: () => ({
    gateways : ref([]),
    gateway : ref({
      fields: []
    }),
    isLoading: ref(false),
    status: ref({
      isError:null,
      message: null,
      code: null,
    })
  }),

  actions: {
    async getGateways() {
      this.isLoading = true
      try {
        const res = await gatewayAPI.getGateways()
        this.gateways = res.data.data.gateways.map((data) => {
          return {
            id: data.id,
            name: data.name,
            serial_number: data.serial_number,
            notes: data.notes
          }
        })
        console.log(this.gateways)
        this.isLoading = false        
        this.status.code = res.data.status
      } catch (err) {
        this.isLoading = false
        this.status.message = err.response.data.error
        this.status.code = err.response.data.status
        return err
      }
    },
    async getGateway(id) {
      this.isLoading = true
      try {
        const res = await gatewayAPI.getGateway(id)
        console.log(res.data.data)
        this.gateway.id = res.data.data.id
        this.gateway.name = res.data.data.name
        this.gateway.serialNumber = res.data.data.serial_number
        console.log(this.gateway)
        this.isLoading = false        
        this.status.code = res.data.status
      } catch (err) {
        this.isLoading = false
        this.status.message = err.response.data.error
        this.status.code = err.response.data.status
        return err
      }
    },

    async createGateway(data) {
      this.isLoading = true
      try {
        const res = await gatewayAPI.createGateway(data)
        console.log(res)
        this.isLoading = false        
        this.status.message = 'Gateway Created'
        this.status.code = res.data.status
      } catch (err) {
        this.isLoading = false
        this.status.message = err.response.data.error
        this.status.code = err.response.data.status
        return err
      }
    },
    async deleteGateway(data) {
      this.isLoading = true
      try {
        const res = await gatewayAPI.deleteGateway(data)
        console.log(res)
        this.isLoading = false        
        this.status.message = 'Gateway Deleted'
        this.status.code = res.data.status
      } catch (err) {
        this.isLoading = false
        this.status.message = err.response.data.error
        this.status.code = err.response.data.status
        return err
      }
    },
    async updateGateway(id,data) {
      this.isLoading = true
      try {
        const res = await gatewayAPI.updateGateway(id,data)
        console.log(res)
        this.isLoading = false        
        this.status.message = 'Gateway Updated'
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