import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ImpactService from '../../../services/impact.service'
import { Button, Icon, Loading, ProfileImage } from 'semente-js'
import Card from '../../../components/Card'

const ImpactDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data, isPending } = useQuery({
    queryKey: ['impacts-data', id],
    queryFn: () => ImpactService.find(id as string)
  })

  return (
    <div className='flex size-full flex-col'>
      {isPending ? (
        <div className='flex size-full flex-col items-center justify-center'>
          <Loading />
        </div>
      ) : (
        data && (
          <div className='flex w-full flex-col px-[10vw] pb-24'>
            <button className='flex items-center gap-2' onClick={() => navigate(-1)}>
              <Icon name='arrow-left-alt' color='#141414' size='14' />
              <span className='text-base font-semibold'>Voltar</span>
            </button>

            <div className='mt-4 flex w-full items-start justify-between'>
              <div className='flex items-center gap-4'>
                <ProfileImage
                  initials={data.project?.substring(0, 2) || '-'}
                  className='size-20 !text-4xl'
                />
                <div className='flex flex-col'>
                  <span className='text-4xl font-bold'>{data.project}</span>
                  <span className='text-lg font-normal'>{data.business_unity}</span>
                </div>
              </div>

              <Button
                label='Ver detalhes do projeto'
                color='gray'
                layout='rounded'
                className='bg-[#EBEBEB]'
              />
            </div>

            <div className='mt-9 flex items-center gap-3'>
              <ProfileImage initials={data.client?.substring(0, 2) || '-'} />
              <div className='flex flex-col'>
                <span className='text-base font-semibold'>{data.client}</span>
                <span className='text-sm font-normal text-[#3D3D3D]'>Cliente</span>
              </div>
            </div>

            <span className='mt-9 text-2xl font-bold'>Nível de Impacto</span>
            <div className='mt-4 flex gap-2'>
              <div className='rounded-lg bg-[#F5F5F5] p-2 py-1 text-base font-normal text-[#141414]'>
                <span>Pessoas Empreendedoras</span>
              </div>
              <div className='rounded-lg bg-[#F5F5F5] p-2 py-1 text-base font-normal text-[#141414]'>
                <span>Negócios</span>
              </div>
              <div className='rounded-lg bg-[#F5F5F5] p-2 py-1 text-base font-normal text-[#141414]'>
                <span>Ecossistemas</span>
              </div>
            </div>

            <span className='mt-9 text-2xl font-bold'>Pessoas Empreendedoras</span>

            <div className='mt-4 grid grid-cols-2 gap-4'>
              <Card label='Pessoas impactadas' value='5.000' />
              <Card label='Cidades impactadas' value='800' />
              <Card label='Evolução do índice de aprendizagem' value='15%' />
              <Card label='Estados impactados' value='15' />
            </div>

            <span className='mt-9 text-2xl font-bold'>Diversidade</span>

            <div className='mt-4 flex w-full items-center gap-4'>
              <Card label='Pessoas LGBT' value='50%' />
              <Card label='Pessoas Negras' value='60%' />
              <Card label='PcDs' value='40%' />
              <Card label='Mulheres' value='70%' />
            </div>

            <span className='mt-9 text-2xl font-bold'>Negócios</span>

            <div className='mt-4 flex w-full flex-col'>
              <Card label='Negócios impactados' value='500' />

              <div className='mt-4 flex w-full items-center gap-4'>
                <Card label='Evolução da maturidade no Caminho Empreendedor' value='12%' />
                <Card label='Evolução do faturamento' value='15%' />
              </div>
            </div>

            <span className='mt-9 text-2xl font-bold'>Ecossistemas</span>

            <div className='mt-4 flex w-full items-center gap-4'>
              <Card label='Evolução da maturidade no Caminho Empreendedor' value='R$ 850.000,00' />
              <Card label='Empregos gerados' value='18.000' />
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default ImpactDetail
