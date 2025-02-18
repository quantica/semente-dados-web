import { ProjectData } from '../types/project.type'
import api from './api.service'

class ProjectService {
  static async list() {
    const response = await api.get<ProjectData[]>(`/projects`)
    return response.data
  }
}

export default ProjectService
