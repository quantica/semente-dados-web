import UserService from '../../services/user.service'
import { useAuth } from '../../contexts/auth'
import { useCallback, useEffect, useState } from 'react'
import Page from '../../components/page'
import UpdateUser from './update-user'
import UserItem from './user-item'
import { User } from '../../types'

const HomePage = () => {
  const { user } = useAuth()
  const [users, setUsers] = useState<User[]>()
  const [loading, setLoading] = useState(true)
  const [userToUpdate, setUserToUpdate] = useState<User>()

  const listUsers = useCallback(async () => {
    const { data } = await UserService.list()
    setUsers(data.data)
    setLoading(false)
  }, [])

  useEffect(() => {
    listUsers()
  }, [listUsers])

  const openEditModal = (user: User) => {
    setUserToUpdate(user)
  }
  const closeEditModal = () => {
    setUserToUpdate(undefined)
  }

  const onSuccessUpdate = async () => {
    await listUsers()
    closeEditModal()
  }

  return (
    <Page title='Usuários' subtitle='Voce pode atualizar apenas o seu usuário'>
      <div className='border-[1px] border-solid border-brand-rama-500'>
        {loading
          ? 'Loading...'
          : users?.map(item => (
              <UserItem
                user={item}
                key={item.id}
                onEdit={openEditModal}
                isActive={user?.id === item?.id}
              />
            ))}
      </div>
      <UpdateUser
        userToUpdate={userToUpdate}
        onClose={closeEditModal}
        onSuccess={onSuccessUpdate}
      />
    </Page>
  )
}

export default HomePage
