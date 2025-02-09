import React from 'react'
import ReactDOM from 'react-dom/client'
import { SementeAuthProvider, ToastContextProvider } from 'semente-js'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

import 'semente-js/styles.css'
import './styles/global.css'
import './styles/index.css'

console.log(`#TAG_VERSION`)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <SementeAuthProvider
    realm={process.env.REACT_APP_KC_REALM || 'semente'}
    clientId={process.env.REACT_APP_KC_CLIENT_ID || 'semente-dados'}
    hubUrl={process.env.REACT_APP_HUB_URL || ''}
    keycloakUrl={process.env.REACT_APP_KC_URL || ''}
  >
    <ToastContextProvider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </ToastContextProvider>
  </SementeAuthProvider>
)
