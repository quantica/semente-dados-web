import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

import 'semente-js/styles.css'
import './styles/global.css'
import './styles/index.css'
import Providers from './context'

console.log(`#TAG_VERSION`)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Providers>
    <RouterProvider router={router} />
  </Providers>
)
