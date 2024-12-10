import { Link, useNavigate } from 'react-router-dom'
import { Text } from 'semente-js'
import { ROUTES } from '../../routes/path'
import { useAuth } from '../../contexts/auth'
import { useEffect } from 'react'
import LoginForm from './login-form'

const LoginPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate(ROUTES.home)
  }, [user, navigate])

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-200'>
      <div className='mx-10 w-full max-w-[400px] rounded-lg bg-white p-4'>
        <Text className='heading-sm  text-brand-rama-600'>{'Login'}</Text>

        <hr className='my-5' />

        <LoginForm />

        <hr className='my-5' />

        <div className='flex justify-between'>
          <Link
            to={ROUTES.forgotPassword}
            className='text-brand-rama-500 underline transition-all hover:opacity-70'
          >
            Esqueci minha senha
          </Link>
          <Link
            to={ROUTES.signUp}
            className='text-brand-rama-500 underline transition-all hover:opacity-70'
          >
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
