import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Input, useToastContext } from 'semente-js'
import { useAuth } from '../../contexts/auth'

interface LoginFormValues {
  email: string
  password: string
}

const initialValues: LoginFormValues = {
  email: '',
  password: ''
}

const validationSchema = Yup.object({
  email: Yup.string().email('Email inválido').required('O email é obrigatório'),
  password: Yup.string().required('A senha é obrigatória')
})

const LoginForm = () => {
  const { toast } = useToastContext()
  const { login } = useAuth()

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: LoginFormValues) => {
      try {
        await login(values)
      } catch (err) {
        toast.error((err as Error).message || 'Algo deu errado')
      }
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='flex flex-col'>
        <Input
          placeholder='Email'
          id='email'
          name='email'
          type='email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          maxLength={100}
          errorMessage={
            formik.touched.email && formik.errors.email ? formik.errors.email : undefined
          }
        />
      </div>

      <div className='mt-4 flex flex-col'>
        <Input
          placeholder='Senha'
          id='password'
          name='password'
          type='password'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          maxLength={100}
          errorMessage={
            formik.touched.password && formik.errors.password ? formik.errors.password : undefined
          }
        />
      </div>

      <button
        type='submit'
        className='mt-5 w-full rounded-lg bg-brand-rama-500 p-2 text-white transition-all hover:bg-brand-rama-600 active:bg-brand-rama-700'
      >
        Login
      </button>
    </form>
  )
}

export default LoginForm
