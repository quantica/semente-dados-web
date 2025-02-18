import React from 'react'

export type TabItem<T extends string | number | symbol> = {
  key: T
  label: string
  counter?: number
}

export type TabProps = {
  handleChange: (tab: TabItem<string>) => void
  current: TabItem<string>
  tabs: TabItem<string>[]
}

export const Tab: React.FC<TabProps> = ({ tabs, current, handleChange }) => {
  const labelClass = {
    false: 'text-sm font-regular text-text-tertiary',
    true: 'text-sm font-medium text-[#0077CC]'
  }

  return (
    <div className='flex w-full gap-4 border-b-[4px] border-b-[#EBEBEB]'>
      {tabs.map(tab => (
        <div key={tab.label.toLowerCase()} className='relative pb-3'>
          <button
            onClick={() => handleChange(tab)}
            id={`${tab.label.toLowerCase()}-button`}
            className={`${labelClass[(tab.label.toLowerCase() === current.label.toLowerCase()).toString() as keyof typeof labelClass]} flex items-center justify-center gap-1`}
          >
            {tab.label}

            {tab.counter && (
              <div className='bg-background-brand-primary flex h-5 w-5 items-center justify-center rounded-full'>
                <span className='text-3xs text-white'>{tab.counter}</span>
              </div>
            )}
          </button>

          {tab.label.toLowerCase() === current.label.toLowerCase() && (
            <div className='absolute bottom-[-4px] h-[4px] w-full bg-[#0077CC]' />
          )}
        </div>
      ))}
    </div>
  )
}
