import React from 'react'

type Props = {
  label: string
  value: string
}

const Card: React.FC<Props> = ({ label, value }) => {
  return (
    <div className='flex h-full w-full flex-col rounded-3xl border-[1px] border-solid border-[#EBEBEB] p-4'>
      <span className='text-xl font-bold'>{value}</span>
      <span className='mt-3 text-base font-semibold text-[#5C5C5C]'>{label}</span>
    </div>
  )
}

export default Card
