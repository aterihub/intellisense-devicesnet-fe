import { defineStore } from 'pinia'
import devicesApi from '@/services/deviceAPI'
import { ref } from 'vue'

export const useDevicesStore = defineStore('device', {
  state: () => ({

    devicesList : ref([]),
    deviceData : ref({
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
    async createDevice(deviceData) {
      this.isLoading = true
      try {
        const res = await devicesApi.createDevice(deviceData)
        this.isLoading = false        
        this.status.message = 'Device Created'
        this.status.code = res.data.status
        this.status.isError = false
        this.isLoading = false
      } catch (err) {
        console.error(err)
        this.isLoading = false
        this.status.isError = true
        this.status.code = err.response.status
        this.status.message = err.response.statusText
        return err
      } 
    },
    async deleteDevice(id) {
      this.isLoading = true
      try {
        const res = await devicesApi.deleteDevice(id)
        console.log(res)
        this.isLoading = false        
        this.status.message = 'Device Deleted'
        this.status.code = res.data.status
        this.status.isError = false
        this.isLoading = false
        console.log(this.status)
      } catch (err) {
        this.isLoading = false
        this.status.isError = true
        this.status.code = err.response.status
        this.status.message = err.response.statusText
        console.log(this.status)
        return err
      }
    },
    async getDevices() {
      this.isLoading = true
      try {
        const res = await devicesApi.getDevices()
        this.devicesList = res.data.data.types.map((data) => {
          return {
            id: data.id,
            name: data.name,
            field: data.fields.fields,
            notes: data.notes
          }
        })
        console.log(this.deviceTypes)
        this.isLoading = false        
        this.status.code = res.data.status
      } catch (err) {
        this.isLoading = false
        this.status.message = err.response.data.error
        this.status.code = err.response.data.status
        return err
      }
    },
    async getDevice(id) {
      this.isLoading = true
      try {
        const res = await devicesApi.getDevice(id)
        console.log(res)
        this.deviceData = res.data.data.device
        // this.deviceData = res.data.data.device.fields
        // this.deviceData.id = res.data.data.device.id
        // this.deviceData.serial_number = res.data.data.device.serial_number
        // this.deviceData.notes = res.data.data.device.notes
        console.log(this.deviceData)
        this.isLoading = false        
        this.status.code = res.data.status
        console.log(this.status)
      } catch (err) {
        this.isLoading = false
        // this.status.message = err.response.data.error
        // this.status.code = err.response.data.status
        return err
      }
    },
    async updateDevice(id,deviceData) {
      this.isLoading = true
      try {
        const res = await devicesApi.updateDevice(id,deviceData)
        console.log(res)
        this.isLoading = false        
        this.status.message = 'Device Updated'
        this.status.code = res.data.status
        this.status.isError = false
        this.isLoading = false
        console.log(this.status)
      } catch (err) {
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
