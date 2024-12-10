import { Text, useToastContext } from 'semente-js'
import EmailForm from './email-form'
import { useState } from 'react'
import CodeForm from './code-form'
import PasswordForm from './password-form'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes/path'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string>()
  const [token, setToken] = useState<string>()
  const navigate = useNavigate()
  const { toast } = useToastContext()

  const completePasswordUpdate = () => {
    navigate(ROUTES.login)
    toast.success('Senha atualizada com sucesso!')
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-200'>
      <div className='mx-10 w-full max-w-[400px] rounded-lg bg-white p-4'>
        <Text className='heading-sm  text-brand-rama-600'>{'Recureção de senha'}</Text>
        {email && <Text className='body-md  text-brand-rama-600'>Email: {email}</Text>}

        <hr className='my-5' />

        {!email ? (
          <EmailForm onSuccess={setEmail} />
        ) : !token ? (
          <CodeForm email={email} onSuccess={setToken} />
        ) : (
          <PasswordForm token={token} onSuccess={completePasswordUpdate} />
        )}
      </div>
    </div>
  )
}

export default ForgotPasswordPage
