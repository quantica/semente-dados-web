import { ListInputParams } from '../types/globals'
import { User } from '../types/team.type'
import api from './api.service'

class TeamService {
  static async list(filters?: ListInputParams) {
    const response = await api.get<User[]>(`/team`, {
      ...(filters && { params: filters })
    })
    return response.data
  }

  static async find(id: string) {
    const response = await api.get<User>(`/team/${id}`)
    return response.data
  }
}

export default TeamService
