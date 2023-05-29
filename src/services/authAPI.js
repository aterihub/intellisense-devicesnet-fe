import apiClient from "./API";

const config = { 
  headers: {
    Accept: 'application/json'
  }
}

export default {
  login(data) {
    return apiClient.post('login',data,config)
  },
  register(data) {
    return apiClient.post('register',data,config)
  },
  logout() {
    return apiClient.get('logout',config)
  },
  forgotPassword(data) {
    return apiClient.post('forgot-password',data)
  },
  newPassword(data,email,signature) {
    return apiClient.post(`reset-password/${email}?signature=${signature}`, data)
  },

}