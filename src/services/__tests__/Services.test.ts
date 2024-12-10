import { USER_MOCK } from '../../test/mocks'
import AuthService from '../auth.service'
import StorageService from '../storage.service'
import UserService from '../user.service'

describe('Services test', () => {
  describe('Auth service', () => {
    test('login', async () => {
      expect(
        async () => await AuthService.login({ email: 'email', password: 'password' })
      ).not.toThrow()
    })

    test('sendValidationCode', async () => {
      expect(async () => await AuthService.sendValidationCode({ email: 'email' })).not.toThrow()
    })

    test('validateCode', async () => {
      expect(
        async () => await AuthService.validateCode({ email: 'email', code: 'code' })
      ).not.toThrow()
    })

    test('getMyUser', async () => {
      expect(async () => await AuthService.getMyUser()).not.toThrow()
    })
  })

  describe('User service', () => {
    test('create', async () => {
      expect(async () => await UserService.create(USER_MOCK)).not.toThrow()
    })

    test('list', async () => {
      expect(async () => await UserService.list()).not.toThrow()
    })

    test('update', async () => {
      expect(async () => await UserService.update(USER_MOCK)).not.toThrow()
    })

    test('updatePassword', async () => {
      expect(
        async () => await UserService.updatePassword({ password: 'password' }, 'token')
      ).not.toThrow()
    })
  })

  describe('Storage service', () => {
    test('saveToken', () => {
      expect(async () => StorageService.saveToken('token')).not.toThrow()
    })

    test('getToken', () => {
      expect(async () => StorageService.getToken()).not.toThrow()
    })

    test('removeToken', () => {
      expect(async () => StorageService.removeToken()).not.toThrow()
    })
  })
})
