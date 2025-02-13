import axios, { AxiosError } from 'axios'

const config = {
  baseURL: process.env.REACT_APP_API_URL
}

const api = axios.create(config)

api.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${window.accessToken}`
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

declare global {
  interface Window {
    accessToken?: string
  }
}
