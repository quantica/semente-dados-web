import React from 'react'
import Dashboard from '../../components/Dashboard'
import { Dashboards } from '../../common/enums'

const HomePage = () => {
  return (
    <div className='h-full w-full'>
      <span className='text-4xl font-bold text-[#141414]'>Início</span>

      <Dashboard id={Dashboards.Home} />
    </div>
  )
}

export default HomePage
