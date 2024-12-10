import { User } from '../types'
import api from './api.service'

class AuthService {
  static login(body: { email: string; password: string }) {
    return api.post<{ token: string }>('/auth/login', body)
  }

  static sendValidationCode(body: { email: string }) {
    return api.post<void>('/auth/send-code', body)
  }

  static validateCode(body: { email: string; code: string }) {
    return api.post<{ token: string }>('/auth/validate-code', body)
  }

  static getMyUser() {
    return api.get<User>('/auth/me')
  }
}

export default AuthService
