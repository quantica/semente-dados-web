import React from 'react'
import { Icon } from 'semente-js'

type Props = {
  label: string
  hideBorder?: boolean
}

const OdsCard: React.FC<Props> = ({ label, hideBorder }) => {
  return (
    <div className='flex w-full items-center gap-3'>
      <div className='px-1'>
        <Icon name='check-circle-solid' color='#1D8640' size='28' />
      </div>
      <div
        className={`flex flex-1 flex-col border-b-[1px] ${!hideBorder && 'border-solid border-[#EBEBEB]'} py-4`}
      >
        <span className='text-base font-normal'>{label}</span>
      </div>
    </div>
  )
}

export default OdsCard
