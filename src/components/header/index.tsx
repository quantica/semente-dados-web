import { Button, ProfileImage } from 'semente-js'
import { User } from '../../types'

type Props = { user: User; onLogout: () => void }

const initialsFormat = (name: string, surname: string) => {
  return (name[0] + surname[0]).toUpperCase()
}

const Header: React.FC<Props> = ({ user, onLogout }) => {
  return (
    <header className='w-full border-b-[1px] p-2'>
      <div className='mx-auto flex max-w-[1024px] items-center'>
        <ProfileImage initials={initialsFormat(user.name, user.surname)} />
        <div className='ml-4 flex flex-col'>
          <span className='body-md font-bold text-brand-rama-500'>{`${user.name} ${user.surname}`}</span>
          <span className='body-xs text-gray-500'>{user.email}</span>
        </div>

        <Button
          size='sm'
          label='Sair'
          color='primary'
          layout='rounded'
          iconName='signout'
          onClick={onLogout}
          className='ml-auto bg-brand-rama-500'
        />
      </div>
    </header>
  )
}

export default Header
