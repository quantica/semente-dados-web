import React, { useState } from 'react'
import { Button, Icon, ProfileImage } from 'semente-js'
import * as FilterKeys from './common/services'
import { useQuery } from '@tanstack/react-query'

export type FilterItem = { [x in keyof typeof FilterKeys]: string }

type Props = {
  items: FilterItem
  value: FilterItem
  handleFilter: (props: FilterItem) => void
}

const Filter: React.FC<Props> = ({ items, handleFilter, value }) => {
  const [filterIsOpen, setFilterIsOpen] = useState(false)
  const [currentFilter, setCurrentFilter] = useState<keyof FilterItem>()
  const isFiltered = currentFilter && !!items[currentFilter]

  const services = (Object.keys(FilterKeys) as Array<keyof typeof FilterKeys>).filter(key =>
    Object.keys(items).includes(key)
  )

  const { data, isPending } = useQuery({
    queryKey: ['filters-data'],
    queryFn: async () =>
      (await Promise.all(services.map(service => FilterKeys[service].list()))).reduce(
        (acc, item, index) => ({ ...acc, [services[index]]: item }),
        {} as { [x in keyof FilterItem]: { name: string; id: string }[] }
      )
  })

  const handleFormFilter = (key: keyof FilterItem, newValue: string) => {
    const currentValue = (value[key] || []) as string[]

    handleFilter({
      ...value,
      [key]: currentValue.includes(newValue)
        ? currentValue.filter(item => item !== newValue)
        : [...currentValue, newValue]
    })
  }

  return (
    <div className='relative'>
      <Button
        onClick={() => setFilterIsOpen(p => !p)}
        label='Filtros'
        iconName='sliders-v'
        color='gray'
        layout='rounded'
        className='bg-[#EBEBEB]'
      />

      {filterIsOpen && (
        <div className='absolute right-0 flex w-[400px] flex-col rounded-3xl bg-inherit bg-white py-2 shadow-2xl'>
          {isPending ? (
            <></>
          ) : (
            data && (
              <>
                <div className='flex w-full justify-between border-b-[1px] border-[#EBEBEB] px-3 py-3'>
                  <div className='flex gap-4'>
                    {isFiltered && (
                      <button onClick={() => setCurrentFilter(undefined)}>
                        <Icon name='arrow-left-alt' color='#141414' size='18' />
                      </button>
                    )}

                    <span className='text-base font-bold'>
                      {isFiltered ? items[currentFilter] : 'Adicionar filtros'}
                    </span>
                  </div>
                  <button onClick={() => setFilterIsOpen(false)}>
                    <Icon name='times' color='#141414' size='22' />
                  </button>
                </div>

                {isFiltered ? (
                  <div className='flex max-h-[300px] w-full flex-col overflow-auto'>
                    {data[currentFilter].length >= 1 ? (
                      <>
                        {data[currentFilter].map(item => (
                          <div className='flex w-full items-center gap-4 px-3 py-3' key={item.id}>
                            <input
                              type='checkbox'
                              className='size-4'
                              checked={(value[currentFilter] || ([] as string[])).includes(item.id)}
                              onChange={() => handleFormFilter(currentFilter, item.id)}
                            />
                            <ProfileImage
                              initials={item?.name ? item?.name.substring(0, 2) : '-'}
                            />
                            <span className='text-base font-normal'>
                              {item?.name ? item?.name.substring(0, 2) : '-'}
                            </span>
                          </div>
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                ) : (
                  <div className='flex w-full flex-col'>
                    {(Object.keys(items) as Array<keyof typeof items>).map(item => (
                      <button
                        key={item}
                        onClick={() => setCurrentFilter(item)}
                        className='flex w-full items-center justify-between px-3 py-3'
                      >
                        <span className='text-base font-normal'>{items[item]}</span>
                        <Icon name='angle-right' color='#141414' size='18' />
                      </button>
                    ))}
                  </div>
                )}
              </>
            )
          )}
        </div>
      )}
    </div>
  )
}

export default Filter
