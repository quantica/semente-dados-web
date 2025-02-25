import React, { useState } from 'react'
import { Props } from '../types'
import { useQuery } from '@tanstack/react-query'
import { Input, Loading, ProfileImage } from 'semente-js'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ROUTES } from '../../../../routes/path'
import Filter, { FilterItem } from '../../../../components/Filter'
import TeamService from '../../../../services/team.service'

const filterItems: FilterItem = {
  units: 'Tipo',
  clients: 'Projetos',
  years: 'Ano'
}

const TeamTab: React.FC<Props> = () => {
  const [filters, setFilters] = useState<FilterItem>({} as FilterItem)
  const [searchParams, setSearchParams] = useSearchParams()
  const params = { t: searchParams.get('t') || '', q: searchParams.get('q') || '' }

  const navigation = useNavigate()
  const { data, isPending } = useQuery({
    queryKey: ['team-data', filters],
    queryFn: () => TeamService.list({ relations: filters, filter: params.q })
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
              <span className='text-xl font-bold'>{data?.length} Pessoas</span>

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
                <th className='w-1/3 text-start font-semibold text-[#5C5C5C]'>Nome completo</th>
                <th className='w-1/3 pl-3 text-start font-semibold text-[#5C5C5C]'>Tipo</th>
                <th className='w-1/3 pl-3 text-start font-semibold text-[#5C5C5C]'>
                  Projetos alocados
                </th>
              </tr>

              {data.map(user => (
                <tr
                  onClick={() =>
                    user.id && navigation(ROUTES.teamDetail.replace(':id', user.id.toString()))
                  }
                  key={user.id}
                  className='w-full cursor-pointer border-b-[1px] border-[#EBEBEB]'
                >
                  <td className='flex items-center gap-2 py-3'>
                    <ProfileImage initials={user.name?.substring(0, 2) || ''} />
                    <div className='flex max-w-60 flex-col'>
                      <span className='w-full overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold'>
                        {user.name || '-'}
                      </span>
                      <span className='overflow-hidden text-ellipsis whitespace-nowrap text-sm font-normal'>
                        {user.email || '-'}
                      </span>
                    </div>
                  </td>
                  <td className='pl-3 '>
                    <span className='whitespace-nowrap text-base font-semibold'>{user.type}</span>
                  </td>
                  <td className='pl-3 '>Em 3 projetos</td>
                </tr>
              ))}
            </table>
          </div>
        )
      )}
    </div>
  )
}

export default TeamTab
