class StorageService {
  private static tokenKey = 'authToken'

  static saveToken(token: string): void {
    localStorage.setItem(StorageService.tokenKey, token)
  }

  static getToken(): string | null {
    return localStorage.getItem(StorageService.tokenKey)
  }

  static removeToken(): void {
    localStorage.removeItem(StorageService.tokenKey)
  }
}

export default StorageService
