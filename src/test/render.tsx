import { ToastContextProvider } from 'semente-js'
import { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { AuthProvider } from '../contexts/auth'
import { BrowserRouter } from 'react-router-dom'

export const getRender = (children: ReactNode) => {
  return render(
    <ToastContextProvider>
      <AuthProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </AuthProvider>
    </ToastContextProvider>
  )
}
