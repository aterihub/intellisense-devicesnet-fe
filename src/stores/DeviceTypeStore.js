import { defineStore } from 'pinia'
import deviceTypeAPI from '@/services/deviceTypeAPI'
import { ref } from 'vue'

export const useDeviceTypeStore = defineStore('deviceType', {
  state: () => ({
    deviceTypes : ref([]),
    deviceType : ref({
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
    async getDeviceTypes() {
      this.isLoading = true
      try {
        const res = await deviceTypeAPI.getDeviceTypes()
        this.deviceTypes = res.data.data.types.map((data) => {
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
    async getDeviceType(id) {
      this.isLoading = true
      try {
        const res = await deviceTypeAPI.getDeviceType(id)
        console.log(res.data.data.type)

        this.deviceType.id = res.data.data.type.id
        this.deviceType.name = res.data.data.type.name

        this.deviceType.fields = []
        this.deviceType.payload = []
        this.deviceType.fields.push({ text: "ID", value: "id", sortable: true })
        this.deviceType.fields.push({ text: "Serial Number", value: "serial_number", sortable: true })
        res.data.data.type.fields.fields.map((data) => {
          this.deviceType.fields.push({text:data, value:data, sortable:true})
        })
        this.deviceType.fields.push({ text: "Notes", value: "notes", sortable: true })
        this.deviceType.fields.push({ text: "", value: "operation", width: 100 })
        console.log(this.deviceType.fields)

        this.deviceType.devices = res.data.data.type.devices.map(obj => {
          const id = obj.id
          const serial_number = obj.serial_number
          const notes = obj.notes
          return { id,serial_number,notes,...obj.fields }
        })

        res.data.data.type.fields.fields.map((data) => {
          this.deviceType.payload.push({text:data, value:data, sortable:true})
        })

        this.isLoading = false        
        this.status.code = res.data.status
      } catch (err) {
        this.isLoading = false
        // this.status.message = err.response.data.error
        // this.status.code = err.response.data.status
        return err
      }
    },

    async createDeviceType(data) {
      this.isLoading = true
      try {
        const res = await deviceTypeAPI.createDeviceType(data)
        console.log(res)
        this.isLoading = false        
        this.status.message = 'Type Created'
        this.status.code = res.data.status
      } catch (err) {
        this.isLoading = false
        // this.status.message = err.response.data.error
        // this.status.code = err.response.data.status
        return err
      }
    },
    async deleteDeviceType(data) {
      this.isLoading = true
      try {
        const res = await deviceTypeAPI.deleteDeviceType(data)
        console.log(res)
        this.isLoading = false        
        this.status.message = 'Type Deleted'
        this.status.code = res.data.status
      } catch (err) {
        this.isLoading = false
        this.status.message = err.response.data.error
        this.status.code = err.response.data.status
        return err
      }
    },
    async updateDeviceType(id,data) {
      this.isLoading = true
      try {
        const res = await deviceTypeAPI.updateDeviceType(id,data)
        console.log(res)
        this.isLoading = false        
        this.status.message = 'Type Updated'
        this.status.code = res.data.status
        this.status.isError = false
        this.isLoading = false
        console.log(this.status)
      } catch (err) {
        console.log(err)
        this.isLoading = false
        this.status.isError = true
        // this.status.code = err.response.status
        // this.status.message = err.response.statusText
        console.log(this.status)
        return err
      }
    },
  }

})