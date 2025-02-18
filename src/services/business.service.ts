import { Business } from '../types/business.type'
import { ListInputParams } from '../types/globals'
import api from './api.service'

class BusinessService {
  static async list(filters?: ListInputParams) {
    const response = await api.get<Business[]>(`/business`, { ...(filters && { params: filters }) })
    return response.data
  }

  static async find(id: string) {
    const response = await api.get<Business>(`/business/${id}`)
    return response.data
  }
}

export default BusinessService
