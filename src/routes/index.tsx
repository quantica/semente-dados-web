import ProtectedRoute from '../components/protected-route'
import ForgotPasswordPage from '../pages/forgotPassword'
import { createBrowserRouter } from 'react-router-dom'
import SignUpPage from '../pages/signup'
import LoginPage from '../pages/login'
import HomePage from '../pages/home'
import { ROUTES } from './path'

export const router = createBrowserRouter([
  {
    path: ROUTES.login,
    element: <LoginPage />
  },
  {
    path: ROUTES.signUp,
    element: <SignUpPage />
  },
  {
    path: ROUTES.forgotPassword,
    element: <ForgotPasswordPage />
  },
  {
    path: ROUTES.home,
    element: <ProtectedRoute />,
    children: [{ index: true, element: <HomePage /> }]
  }
])
