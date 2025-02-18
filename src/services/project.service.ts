import { ListInputParams } from '../types/globals'
import { ProjectData } from '../types/project.type'
import api from './api.service'

class ProjectService {
  static async list(filters?: ListInputParams) {
    const response = await api.get<ProjectData[]>(`/projects`, {
      ...(filters && { params: filters })
    })
    return response.data
  }

  static async find(id: string) {
    const response = await api.get<ProjectData>(`/projects/${id}`)
    return response.data
  }
}

export default ProjectService
