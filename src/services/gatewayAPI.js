import apiClient from "./API";



export default {
  
  createGateway(data) {
    return apiClient.post('gateways', data)
  },

  getGateways() {
    return apiClient.get('gateways')
  },

  getGateway(id) {
    return apiClient.get(`gateways/${id}`)
  },

  updateGateway(id,data) {
    return apiClient.put(`gateways/${id}`, data)
  },

  deleteGateway(id) {
    return apiClient.delete(`gateways/${id}`)
  },

}