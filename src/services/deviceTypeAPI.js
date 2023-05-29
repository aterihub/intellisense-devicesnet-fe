import apiClient from "./API";



export default {

  createDeviceType(data) {
    return apiClient.post('types', data)
  },
  getDeviceTypes() {
    return apiClient.get('types')
  },
  getDeviceType(id) {
    return apiClient.get(`types/${id}`)
  },
  updateDeviceType(id,data) {
    return apiClient.put(`types/${id}`, data)
  },
  deleteDeviceType(id) {
    return apiClient.delete(`types/${id}`)
  },

}