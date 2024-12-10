import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { Input, Text, useToastContext } from 'semente-js'
import * as Yup from 'yup'
import { ROUTES } from '../../routes/path'
import UserService from '../../services/user.service'

interface SignUpFormValues {
  email: string
  name: string
  surname: string
  password: string
  confirmPassword: string
}

const initialValues: SignUpFormValues = {
  email: '',
  name: '',
  surname: '',
  password: '',
  confirmPassword: ''
}

const validationSchema = Yup.object({
  email: Yup.string().email('Email inválido').required('O email é obrigatório'),
  name: Yup.string().required('O nome é obrigatório'),
  surname: Yup.string().required('O sobrenome é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('A senha é obrigatória'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'As senhas não coincidem')
    .required('A confirmação da senha é obrigatória')
})

const SignUpPage = () => {
  const { toast } = useToastContext()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: SignUpFormValues) => {
      try {
        await UserService.create(values)
        navigate(ROUTES.login)
        toast.success('Conta criada com sucesso!')
      } catch (err) {
        toast.error((err as Error).message || 'Algo deu errado')
        formik.setFieldError('email', (err as Error).message)
      }
    }
  })

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-200'>
      <div className='mx-10 w-full max-w-[400px] rounded-lg bg-white p-4'>
        <Text className='heading-sm  text-brand-rama-600'>{'Novo usuário'}</Text>

        <hr className='my-5' />

        <form onSubmit={formik.handleSubmit}>
          <div className='mb-4'>
            <Input
              placeholder='Email'
              id='email'
              name='email'
              type='email'
              onBlur={formik.handleBlur}
              value={formik.values.email}
              onChange={formik.handleChange}
              errorMessage={
                formik.touched.email && formik.errors.email ? formik.errors.email : undefined
              }
            />
          </div>

          <div className='mb-4'>
            <Input
              placeholder='Nome'
              id='name'
              name='name'
              type='text'
              maxLength={100}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              onChange={formik.handleChange}
              errorMessage={
                formik.touched.name && formik.errors.name ? formik.errors.name : undefined
              }
            />
          </div>

          <div className='mb-4'>
            <Input
              placeholder='Sobrenome'
              id='surname'
              name='surname'
              type='text'
              maxLength={100}
              onBlur={formik.handleBlur}
              value={formik.values.surname}
              onChange={formik.handleChange}
              errorMessage={
                formik.touched.surname && formik.errors.surname ? formik.errors.surname : undefined
              }
            />
          </div>

          <div className='mb-4'>
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
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : undefined
              }
            />
          </div>

          <div className='mb-4'>
            <Input
              placeholder='Confirmar senha'
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              maxLength={100}
              errorMessage={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? formik.errors.confirmPassword
                  : undefined
              }
            />
          </div>
          <hr className='my-5' />

          <div className='mb-2 flex gap-2'>
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
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage
