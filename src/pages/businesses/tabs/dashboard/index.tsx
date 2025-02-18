import React from 'react'
import Dashboard from '../../../../components/Dashboard'
import { Props } from '../types'
import { Dashboards } from '../../../../common/enums'

const DashboardTab: React.FC<Props> = () => {
  return <Dashboard id={Dashboards.Business} />
}

export default DashboardTab
