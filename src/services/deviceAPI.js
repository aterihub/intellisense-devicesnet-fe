import apiClient from "./API";



export default {
  
  createDevice(data) {
    return apiClient.post('devices', data)
  },

  getDevices() {
    return apiClient.get('devices')
  },

  getDevice(id) {
    return apiClient.get(`devices/${id}`)
  },

  updateDevice(id,data) {
    return apiClient.put(`devices/${id}`, data)
  },

  deleteDevice(id) {
    return apiClient.delete(`devices/${id}`)
  },

}