import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import AuthService from '../../services/auth.service'
import StorageService from '../../services/storage.service'
import { User } from '../../types'
import { Button, Modal, Text } from 'semente-js'

interface AuthContextType {
  user: User | null
  login: (values: { email: string; password: string }) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoadingLocalUser, setIsLoadingLocalUser] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  useEffect(() => {
    const token = StorageService.getToken()

    if (token) {
      AuthService.getMyUser()
        .then(({ data }) => {
          setUser(data)
        })
        .catch(() => {
          StorageService.removeToken()
        })
        .finally(() => {
          setIsLoadingLocalUser(false)
        })
    } else {
      setIsLoadingLocalUser(false)
    }
  }, [])

  const login = async (values: { email: string; password: string }) => {
    const loginResponse = await AuthService.login(values)
    StorageService.saveToken(loginResponse.data.token)
    const userResponse = await AuthService.getMyUser()
    setUser(userResponse.data)
    return true
  }

  const logout = () => {
    setShowLogoutModal(true)
  }

  const cancelLogout = () => {
    setShowLogoutModal(false)
  }

  const confirmLogout = () => {
    setShowLogoutModal(false)
    StorageService.removeToken()
    setUser(null)
  }

  if (isLoadingLocalUser) {
    return <>Loading...</>
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
      <Modal isOpen={showLogoutModal} ariaLabelledby='Logout'>
        <div className='flex w-full flex-col'>
          <Text className='heading-md'>Você quer sair?</Text>
          <div className='mt-auto flex w-full gap-4'>
            <Button
              label='Cancelar'
              className='flex-1 bg-gray-500 hover:bg-gray-400'
              onClick={cancelLogout}
            />
            <Button
              label='Sair'
              onClick={confirmLogout}
              className='flex-1 bg-brand-rama-500 hover:bg-brand-rama-400'
            />
          </div>
        </div>
      </Modal>
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
