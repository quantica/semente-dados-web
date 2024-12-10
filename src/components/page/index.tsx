import { Text } from 'semente-js'
import { useAuth } from '../../contexts/auth'
import Header from '../header'

type Props = { title: string; subtitle?: string; children: React.ReactNode }

const Page: React.FC<Props> = ({ title, children, subtitle }) => {
  const { user, logout } = useAuth()

  return (
    <div className='flex min-h-screen flex-col items-center bg-white'>
      {user && <Header user={user} onLogout={logout} />}

      <div className='mx-auto flex w-full max-w-[1024px] flex-col p-2'>
        <Text as='h3' className='heading-md mb-4 mt-2 text-brand-rama-600'>
          {title}
        </Text>
        {subtitle && (
          <Text className='body-md mb-4 mt-[-16px] text-brand-rama-400'>{subtitle}</Text>
        )}

        {children}
      </div>
    </div>
  )
}

export default Page
