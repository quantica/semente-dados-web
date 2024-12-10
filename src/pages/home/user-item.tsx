import { Button, ListItem, Text } from 'semente-js'
import { User } from '../../types'

type Props = { user: User; isActive: boolean; onEdit: (user: User) => void }

const UserItem: React.FC<Props> = ({ user, isActive, onEdit }) => {
  return (
    <ListItem
      padding='p-2'
      className='border-b-[1px] border-b-gray-200'
      content={
        <div className='flex flex-col'>
          <Text className='body-md'>{`${user.name} ${user.surname}`}</Text>
          <Text className='body-sm text-gray-500'>{user.email}</Text>
        </div>
      }
      id={user.id || ''}
      leftContentIcon='user'
      state={isActive ? 'selected' : 'enabled'}
      rightContent={
        isActive && (
          <Button
            label='Editar'
            onClick={() => onEdit(user)}
            iconName='pen'
            className='bg-brand-rama-500'
            size='sm'
            layout='circle'
          />
        )
      }
    />
  )
}

export default UserItem
