import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Icon, Loading, ProfileImage } from 'semente-js'
import TeamService from '../../../services/team.service'

const TeamDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data, isPending } = useQuery({
    queryKey: ['team-data', id],
    queryFn: () => TeamService.find(id as string)
  })

  return (
    <div className='flex size-full flex-col'>
      {isPending ? (
        <div className='flex size-full flex-col items-center justify-center'>
          <Loading />
        </div>
      ) : (
        data && (
          <div className='flex w-full flex-col px-[10vw]  pb-24'>
            <button className='flex items-center gap-2' onClick={() => navigate(-1)}>
              <Icon name='arrow-left-alt' color='#141414' size='14' />
              <span className='text-base font-semibold'>Voltar</span>
            </button>

            <div className='mt-4 flex w-full items-start justify-between'>
              <div className='flex items-center gap-4'>
                <ProfileImage
                  initials={data.name?.substring(0, 2) || '-'}
                  className='size-20 !text-4xl'
                />
                <div className='flex flex-col'>
                  <span className='text-4xl font-bold'>{data.name}</span>
                  <span className='text-lg font-normal'>{data.email}</span>
                </div>
              </div>
            </div>

            <span className='mt-9 text-2xl font-bold'>Projetos alocados</span>
            <div className='grid grid-cols-2'>
              <div className='flex items-center gap-3 '>
                <ProfileImage initials='TD' />
                <div className='flex flex-col py-4'>
                  <span className='text-base font-semibold'>Transformação Digital</span>
                  <span className='text-sm font-normal text-[#3D3D3D]'>Tecnologia e Inovação</span>
                  <span className='text-sm font-normal text-[#3D3D3D]'>
                    Pessoa Gestora de Carteira
                  </span>
                </div>
              </div>

              <div className='flex items-center gap-3 '>
                <ProfileImage initials='AS' />
                <div className='flex flex-col py-4'>
                  <span className='text-base font-semibold'>Agricultura Sustentável</span>
                  <span className='text-sm font-normal text-[#3D3D3D]'>Desenvolvimento Rural</span>
                  <span className='text-sm font-normal text-[#3D3D3D]'>
                    Pessoa Gestora de Carteira
                  </span>
                </div>
              </div>

              <div className='flex items-center gap-3 '>
                <ProfileImage initials='IC' />
                <div className='flex flex-col py-4'>
                  <span className='text-base font-semibold'>Inovação no Campo</span>
                  <span className='text-sm font-normal text-[#3D3D3D]'>
                    Pesquisa e Desenvolvimento
                  </span>
                  <span className='text-sm font-normal text-[#3D3D3D]'>
                    Pessoa Gestora de Carteira
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default TeamDetail
