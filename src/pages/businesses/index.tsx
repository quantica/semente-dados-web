import React from 'react'
import { Tab, TabItem } from '../../components/Tab'
import { useSearchParams } from 'react-router-dom'
import * as TabComponents from './tabs'

const tabs: TabItem<keyof typeof TabComponents>[] = [
  {
    key: 'dashboard',
    label: 'Dashboard'
  },
  {
    key: 'businesses',
    label: 'Negócios no detalhe'
  }
]

const BusinessesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const memberTab = tabs.find(tab => tab.key === searchParams.get('t')) || tabs[0]
  const TabComponent = TabComponents[memberTab.key]

  return (
    <div className='flex h-full w-full flex-col'>
      <span className='mb-5 text-4xl font-bold text-[#141414]'>Negócios Apoiados</span>
      <Tab tabs={tabs} current={memberTab} handleChange={e => setSearchParams({ t: e.key })} />

      <TabComponent />
    </div>
  )
}

export default BusinessesPage
