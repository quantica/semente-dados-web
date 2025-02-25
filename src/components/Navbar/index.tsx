import React from 'react'
import { NavItems } from './common/const'
import { useLocation, useNavigate } from 'react-router-dom'

const Navbar: React.FC = () => {
  const path = useLocation()
  const navigate = useNavigate()

  return (
    <div
      className='border-[#EBEBEB ] sticky top-0 z-10 flex
h-full w-[240px] flex-col border-r-[1px] py-9'
    >
      {NavItems.map(item => {
        const isCurrent = path.pathname === item.value

        return (
          <button
            key={item.value}
            onClick={() => navigate(item.value)}
            className={`relative flex px-3 py-3 font-semibold text-[#3D3D3D] ${isCurrent && 'bg-[#ECF6FE] !text-[#0077CC]'}`}
          >
            <span>{item.label}</span>

            {isCurrent && (
              <div className='absolute left-0 top-0 h-full w-[4px] rounded-full bg-[#0077CC]' />
            )}
          </button>
        )
      })}
    </div>
  )
}

export default Navbar
