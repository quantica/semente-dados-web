import { useAuth } from '../../contexts/auth'
import React from 'react'
import { Navigate, RouteProps, Outlet } from 'react-router-dom'

const ProtectedRoute: React.FC<RouteProps> = () => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}

export default ProtectedRoute
