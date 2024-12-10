import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import { Input, useToastContext } from 'semente-js'
import * as Yup from 'yup'
import { ROUTES } from '../../routes/path'
import React from 'react'
import UserService from '../../services/user.service'

interface PasswordFormValues {
  password: string
  confirmPassword: string
}

const initialValues: PasswordFormValues = {
  password: '',
  confirmPassword: ''
}

const validationSchema = Yup.object({
  password: Yup.string().required('Nova senha é obrigatória'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'As senhas não coincidem')
    .required('A confirmação da senha é obrigatória')
})

type Props = { token: string; onSuccess: () => void }

const PasswordForm: React.FC<Props> = ({ token, onSuccess }) => {
  const { toast } = useToastContext()

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: PasswordFormValues) => {
      try {
        await UserService.updatePassword(values, token)
        onSuccess()
      } catch (err) {
        toast.error((err as Error).message || '')
      }
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='mb-5'>
        <Input
          placeholder='Nova senha'
          id='password'
          name='password'
          type='password'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          maxLength={100}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className='text-red-500'>{formik.errors.password}</div>
        ) : null}
      </div>

      <div className='mb-4'>
        <Input
          placeholder='Confirmar nova senha'
          id='confirmPassword'
          name='confirmPassword'
          type='password'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          maxLength={100}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className='text-red-500'>{formik.errors.confirmPassword}</div>
        ) : null}
      </div>

      <div className='my-2 flex gap-2'>
        <Link
          to={ROUTES.login}
          className='m-0 rounded-lg bg-gray-200 px-4 py-2 transition-all hover:bg-gray-300'
        >
          Cancelar
        </Link>
        <button
          type='submit'
          className=' w-full rounded-lg bg-brand-rama-500 p-2 text-white transition-all hover:bg-brand-rama-600 active:bg-brand-rama-700'
        >
          Atualizar senha
        </button>
      </div>
    </form>
  )
}

export default PasswordForm
