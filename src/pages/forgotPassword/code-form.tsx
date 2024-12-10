import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import { Input, useToastContext } from 'semente-js'
import * as Yup from 'yup'
import { ROUTES } from '../../routes/path'
import AuthService from '../../services/auth.service'
import React from 'react'

interface CodeFormValues {
  code: string
}

const initialValues: CodeFormValues = {
  code: ''
}

const validationSchema = Yup.object({
  code: Yup.string().min(6, 'Código invalido').required('O email é obrigatório')
})

type Props = { email: string; onSuccess: (token: string) => void }

const CodeForm: React.FC<Props> = ({ email, onSuccess }) => {
  const { toast } = useToastContext()

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async ({ code }: CodeFormValues) => {
      try {
        const { data } = await AuthService.validateCode({ email, code })

        onSuccess(data.token)
      } catch (err) {
        toast.error((err as Error).message || '')
      }
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='mb-5'>
        <Input
          placeholder='Código'
          id='code'
          name='code'
          type='code'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.code}
          maxLength={6}
        />
        {formik.touched.code && formik.errors.code ? (
          <div className='text-red-500'>{formik.errors.code}</div>
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
          Validar codigo
        </button>
      </div>
    </form>
  )
}

export default CodeForm
