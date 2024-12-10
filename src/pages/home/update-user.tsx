/* eslint-disable react-hooks/exhaustive-deps */
import { Input, Modal, Text, useToastContext } from 'semente-js'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { User } from '../../types'
import * as Yup from 'yup'
import UserService from '../../services/user.service'

type Props = { userToUpdate?: User; onClose: () => void; onSuccess: () => void }

const validationSchema = Yup.object({
  name: Yup.string().required('O nome é obrigatório'),
  surname: Yup.string().required('O sobrenome é obrigatório'),
  email: Yup.string().email('Email inválido').required('O email é obrigatório')
})

const UpdateUser: React.FC<Props> = ({ userToUpdate, onClose, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToastContext()

  const formik = useFormik({
    validationSchema,
    initialValues: {
      email: userToUpdate?.email || '',
      name: userToUpdate?.name || '',
      surname: userToUpdate?.surname || ''
    },
    onSubmit: async (values: User) => {
      try {
        await UserService.update(values)
        onSuccess()
      } catch (err) {
        toast.error((err as Error).message || '')
      }
    }
  })

  useEffect(() => {
    if (!!userToUpdate?.id) {
      setIsOpen(true)
      formik.setValues(userToUpdate)
    } else {
      setIsOpen(false)
    }
  }, [userToUpdate])

  return (
    <Modal isOpen={isOpen} ariaLabelledby='Update User' onClose={onClose} withCloseButton>
      <div className='flex w-full flex-col'>
        <Text className='heading-md mb-4'>Atualizar usuário</Text>
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
            />
            {formik.touched.email && formik.errors.email && (
              <div className='text-red-500'>{formik.errors.email}</div>
            )}
          </div>

          <div className='mb-4'>
            <Input
              id='name'
              name='name'
              type='text'
              maxLength={100}
              placeholder='Nome'
              onBlur={formik.handleBlur}
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className='text-red-500'>{formik.errors.name}</div>
            ) : null}
          </div>

          <div className='mb-4'>
            <Input
              type='text'
              id='surname'
              name='surname'
              maxLength={100}
              placeholder='Sobrenome'
              onBlur={formik.handleBlur}
              value={formik.values.surname}
              onChange={formik.handleChange}
            />
            {formik.touched.surname && formik.errors.surname ? (
              <div className='text-red-500'>{formik.errors.surname}</div>
            ) : null}
          </div>

          <button
            type='submit'
            disabled={formik.isSubmitting}
            className='mt-5 w-full rounded-lg bg-brand-rama-500 p-2 text-white transition-all hover:bg-brand-rama-600 active:bg-brand-rama-700'
          >
            {formik.isSubmitting ? 'Loading...' : 'Atualizar dados'}
          </button>
        </form>
      </div>
    </Modal>
  )
}

export default UpdateUser
