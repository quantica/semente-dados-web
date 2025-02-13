import React, { useCallback, useEffect } from 'react'
import { embedDashboard } from '@superset-ui/embedded-sdk'
import DashboardsIds from '../../common/constants'
import SupersetService from '../../services/superset.service'

const HomePage = () => {
  const getGuestToken = useCallback(async () => {
    return await SupersetService.getGuestToken(DashboardsIds.home)
  }, [])

  useEffect(() => {
    embedDashboard({
      id: DashboardsIds.home, // given by the Superset embedding UI
      supersetDomain: process.env.REACT_APP_SUPERSET_URL || '',
      mountPoint: document.getElementById('superset-container') as HTMLElement, // any html element that can contain an iframe
      fetchGuestToken: () => getGuestToken(),
      dashboardUiConfig: {
        filters: {
          visible: false,
          expanded: false
        }
      }
    })
  }, [])

  return (
    <div className='h-full w-full'>
      <span className='text-4xl font-bold text-[#141414]'>Início</span>

      <div id='superset-container' className='mt-8 h-full w-full' />
    </div>
  )
}

export default HomePage
