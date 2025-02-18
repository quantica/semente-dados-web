import { ListInputParams } from '../types/globals'
import { ProjectData } from '../types/project.type'
import api from './api.service'

class ImpactService {
  static async list(filters: ListInputParams) {
    const response = await api.get<ProjectData[]>(`/projects/impact`, { params: filters })
    return response.data
  }

  static async find(id: string) {
    const response = await api.get<ProjectData>(`/projects/impact/${id}`)
    return response.data
  }
}

export default ImpactService
