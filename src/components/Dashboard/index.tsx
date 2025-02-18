import React, { useCallback, useEffect } from 'react'
import SupersetService from '../../services/superset.service'
import { embedDashboard } from '@superset-ui/embedded-sdk'

type Props = {
  id: string
}

const Dashboard: React.FC<Props> = ({ id }) => {
  const getGuestToken = useCallback(async () => {
    return await SupersetService.getGuestToken(id)
  }, [id])

  useEffect(() => {
    embedDashboard({
      id: id, // given by the Superset embedding UI
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
  }, [getGuestToken, id])

  return <div id='superset-container' className='mt-8 h-full w-full' />
}

export default Dashboard
