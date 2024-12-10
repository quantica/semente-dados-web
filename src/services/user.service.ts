import { User } from '../types'
import api from './api.service'

class UserService {
  static create(body: User) {
    return api.post<User>('/user', body)
  }

  static list() {
    return api.get<{ data: User[] }>('/user')
  }

  static update(body: User) {
    return api.put<User>('/user', body)
  }

  static updatePassword(body: { password: string }, token?: string) {
    return api.put<User>('/user/password', body, { headers: { Authorization: `Bearer ${token}` } })
  }
}

export default UserService
