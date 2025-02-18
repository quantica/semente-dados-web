import React from 'react'
import { SementeAuthProvider, ToastContextProvider } from 'semente-js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type Props = {
  children: React.ReactNode
}

const Providers: React.FC<Props> = ({ children }) => {
  const queryClient = new QueryClient()

  return (
    <SementeAuthProvider
      realm={process.env.REACT_APP_KC_REALM || 'semente'}
      clientId={process.env.REACT_APP_KC_CLIENT_ID || 'semente-dados'}
      hubUrl={process.env.REACT_APP_HUB_URL || ''}
      keycloakUrl={process.env.REACT_APP_KC_URL || ''}
    >
      <QueryClientProvider client={queryClient}>
        <ToastContextProvider>
          <React.StrictMode>{children}</React.StrictMode>
        </ToastContextProvider>
      </QueryClientProvider>
    </SementeAuthProvider>
  )
}

export default Providers
