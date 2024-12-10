import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import { Input, useToastContext } from 'semente-js'
import * as Yup from 'yup'
import { ROUTES } from '../../routes/path'
import AuthService from '../../services/auth.service'
import React from 'react'

interface EmailFormValues {
  email: string
}

const initialValues: EmailFormValues = {
  email: ''
}

const validationSchema = Yup.object({
  email: Yup.string().email('Email inválido').required('O email é obrigatório')
})

type Props = { onSuccess: (email: string) => void }

const EmailForm: React.FC<Props> = ({ onSuccess }) => {
  const { toast } = useToastContext()

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: EmailFormValues) => {
      try {
        await AuthService.sendValidationCode(values)
        onSuccess(values.email)
      } catch (err) {
        toast.error((err as Error).message || '')
      }
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='mb-5'>
        <Input
          placeholder='Email'
          id='email'
          name='email'
          type='email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          maxLength={100}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className='text-red-500'>{formik.errors.email}</div>
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
          Enviar código
        </button>
      </div>
    </form>
  )
}

export default EmailForm
