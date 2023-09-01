import apiClient from "./API";



export default {
  
  getHooks() {
    return apiClient.get('hooks')
  },

  getHook(id) {
    return apiClient.get(`hooks/${id}`)
  },

  updateHook(id,data) {
    return apiClient.put(`hooks/${id}`, data)
  },


}