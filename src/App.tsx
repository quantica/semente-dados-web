import { AuthProvider } from './contexts/auth'
import { router } from './routes'
import 'semente-js/styles.css'
import './styles/global.css'
import './styles/index.css'
import { RouterProvider } from 'react-router-dom'
import { ToastContextProvider } from 'semente-js'

function App() {
  return (
    <ToastContextProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ToastContextProvider>
  )
}

export default App
