import api from './api.service'

class SupersetService {
  static async getGuestToken(dashboardId: string) {
    const response = await api.get<string>(`/superset/auth/${dashboardId}`)
    return response.data
  }
}

export default SupersetService
