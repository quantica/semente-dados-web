import api from './api.service'

class TeamService {
  static async list() {
    const response = await api.get<string>(`/team`)
    return response.data
  }
}

export default TeamService
