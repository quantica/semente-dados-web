import React, { useState } from 'react'
import { Props } from '../types'
import { useQuery } from '@tanstack/react-query'
import { Input, Loading, ProfileImage } from 'semente-js'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ROUTES } from '../../../../routes/path'
import Filter, { FilterItem } from '../../../../components/Filter'
import BusinessService from '../../../../services/business.service'

const filterItems: FilterItem = {
  units: 'Unidades de Negócio',
  clients: 'Clientes',
  years: 'Ano'
}

const BusinessesTab: React.FC<Props> = () => {
  const [filters, setFilters] = useState<FilterItem>({} as FilterItem)
  const [searchParams, setSearchParams] = useSearchParams()
  const params = { t: searchParams.get('t') || '', q: searchParams.get('q') || '' }

  const navigation = useNavigate()
  const { data, isPending } = useQuery({
    queryKey: ['businesses-data', filters],
    queryFn: () => BusinessService.list({ relations: filters, filter: params.q })
  })

  return (
    <div className='flex size-full flex-col'>
      {isPending ? (
        <div className='flex size-full flex-col items-center justify-center'>
          <Loading />
        </div>
      ) : (
        data && (
          <div className='flex w-full flex-col'>
            <div className='mt-10 flex w-full justify-between'>
              <span className='text-xl font-bold'>{data?.length} Negócios</span>

              <div className='flex gap-2'>
                <Input
                  placeholder='Procurar'
                  type='search'
                  onChange={e => setSearchParams({ ...params, q: e.target.value.toString() })}
                  {...(params.q && { value: params.q as string })}
                  className='w-[430px]'
                  id='search-input'
                  icon='search'
                  layout='rounded'
                />

                <Filter handleFilter={setFilters} value={filters} items={filterItems} />
              </div>
            </div>

            <table className='mt-5 w-full'>
              <tr>
                <th className='w-4/12 text-start font-semibold text-[#5C5C5C]'>Negócio</th>
                <th className='w-2/12 pl-3 text-start font-semibold text-[#5C5C5C]'>ODS</th>
                <th className='w-2/12 pl-3 text-start font-semibold text-[#5C5C5C]'>Projeto</th>
                <th className='w-1/12 pl-3 text-start font-semibold text-[#5C5C5C]'>Maturidade</th>
                <th className='w-1/12 pl-3 text-start font-semibold text-[#5C5C5C]'>Estado</th>
                <th className='w-2/12 pl-3 text-start font-semibold text-[#5C5C5C]'>Diversidade</th>
              </tr>

              {data.map(business => (
                <tr
                  onClick={() =>
                    business.id_business &&
                    navigation(
                      ROUTES.businessDetail.replace(':id', business.id_business.toString())
                    )
                  }
                  key={business.id_business}
                  className='w-full cursor-pointer border-b-[1px] border-[#EBEBEB]'
                >
                  <td className='flex items-center gap-2 py-3'>
                    <ProfileImage initials={business.business?.substring(0, 2) || ''} />
                    <div className='flex max-w-60 flex-col'>
                      <span className='w-full overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold'>
                        {business.business || '-'}
                      </span>
                      <span className='overflow-hidden text-ellipsis whitespace-nowrap text-sm font-normal'>
                        {business.market_sector || '-'}
                      </span>
                    </div>
                  </td>
                  <td className='pl-3 '>
                    <span className='whitespace-nowrap text-base font-semibold'>-</span>
                  </td>
                  <td className='pl-3 '>AGRO IMPACT</td>
                  <td className='pl-3 '>-</td>
                  <td className='pl-3 '>{business.state || '-'}</td>
                  <td className='pl-3 '>-</td>
                </tr>
              ))}
            </table>
          </div>
        )
      )}
    </div>
  )
}

export default BusinessesTab
