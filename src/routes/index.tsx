import { createBrowserRouter } from 'react-router-dom'

import { ROUTES } from './path'
import HomePage from '../pages/home'
import ProtectedRoute from '../components/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <ProtectedRoute />,
    children: [{ index: true, element: <HomePage /> }]
  }
])
