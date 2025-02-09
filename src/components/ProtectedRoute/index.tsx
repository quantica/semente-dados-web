import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { AppItem, Header, MenuItem, ProtectedApp, useSementeAuth } from 'semente-js'
import { Logo } from '../../assets'
import { AnimatePresence } from 'framer-motion'
import Navbar from '../Navbar'

const ProtectedRoute: React.FC = () => {
  const { getUser, signOut } = useSementeAuth()
  const navigate = useNavigate()
  const user = getUser()

  const clickMenuItem = (menuItem: MenuItem) => {
    navigate(menuItem.route)
  }

  const clickApp = (appItem: AppItem) => {
    window.open(appItem.url, '_self')
  }

  return (
    <div className='flex h-screen flex-col'>
      <ProtectedApp>
        <AnimatePresence>
          <Header
            urlImage={Logo}
            menu={[]}
            user={user}
            onClickApp={clickApp}
            onClickMenu={clickMenuItem}
            userItems={[
              {
                icon: 'signout-solid',
                label: 'Terminar sessão',
                onClick: signOut
              }
            ]}
          />

          <div className='flex h-full w-full'>
            <Navbar />
            <div className='flex h-full w-full p-8'>
              <Outlet />
            </div>
          </div>
        </AnimatePresence>
      </ProtectedApp>
    </div>
  )
}

export default ProtectedRoute
