import axios from 'axios'
import { useAuthStore } from '../stores/auth'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/',
  timeout: 10000,
})

request.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.token) {
      if (config.method === 'post' || config.method === 'POST') {
        config.data = {
          ...config.data,
          token: authStore.token,
        }
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default request
