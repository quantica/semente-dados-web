import React from 'react'

type Props = {
  label: string
  value: string
}

const EntrepeneurCard: React.FC<Props> = ({ label, value }) => {
  return (
    <div className='flex h-full w-full justify-between gap-4 rounded-xl border-[1px] border-solid border-[#EBEBEB] p-4'>
      <span className='text-base font-semibold'>{value}</span>
      <span className='text-base font-semibold text-[#5C5C5C]'>{label}</span>
    </div>
  )
}

export default EntrepeneurCard
