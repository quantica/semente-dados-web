import axios, { AxiosError } from 'axios'
import StorageService from './storage.service'

const config = {
  baseURL: process.env.REACT_APP_API_URL
}

const api = axios.create(config)

api.interceptors.request.use(
  config => {
    const token = StorageService.getToken()
    if (token) config.headers.Authorization = `Bearer ${token}`

    return config
  },
  error => error
)

api.interceptors.response.use(
  response => response,
  error => {
    throw new Error(((error as AxiosError)?.response?.data as Error)?.message || 'Unknown error')
  }
)

export default api
