import api from './api.service'

class BusinessService {
  static async list() {
    const response = await api.get<string>(`/business`)
    return response.data
  }
}

export default BusinessService
