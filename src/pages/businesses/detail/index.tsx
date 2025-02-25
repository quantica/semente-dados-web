import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Icon, Loading, ProfileImage } from 'semente-js'
import BusinessService from '../../../services/business.service'
import EntrepeneurCard from './EntrepeneurCard'
import OdsCard from './OdsCard'

const BusinessDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data, isPending } = useQuery({
    queryKey: ['impacts-data', id],
    queryFn: () => BusinessService.find(id as string)
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
                  initials={data.business?.substring(0, 2) || '-'}
                  className='size-20 !text-4xl'
                />
                <div className='flex flex-col'>
                  <span className='text-4xl font-bold'>{data.business}</span>
                  <span className='text-lg font-normal'>{data.market_sector}</span>
                </div>
              </div>
            </div>

            <div className='mt-9 grid w-full grid-cols-2'>
              <div className='flex w-full items-center gap-3'>
                <div className='px-1'>
                  <Icon name='building-solid' color='#141414' size='28' />
                </div>
                <div className='flex flex-1 flex-col border-b-[1px] border-solid border-[#EBEBEB] py-4'>
                  <span className='text-base font-semibold'>00.123.456/0001-89</span>
                  <span className='text-sm font-normal text-[#3D3D3D]'>CNPJ</span>
                </div>
              </div>

              <div className='flex items-center gap-3 '>
                <div className='px-1'>
                  <Icon name='globe-solid' color='#141414' size='28' />
                </div>
                <div className='flex flex-1 flex-col border-b-[1px] border-solid border-[#EBEBEB] py-4'>
                  <span className='text-base font-semibold'>sustentaagro.com.br</span>
                  <span className='text-sm font-normal text-[#3D3D3D]'>Site</span>
                </div>
              </div>

              <div className='flex items-center gap-3 '>
                <div className='px-1'>
                  <Icon name='university-solid' color='#141414' size='28' />
                </div>
                <div className='flex flex-1 flex-col border-b-[1px] border-solid border-[#EBEBEB] py-4'>
                  <span className='text-base font-semibold'>Sociedade Limitada (LTDA)</span>
                  <span className='text-sm font-normal text-[#3D3D3D]'>Tipo Jurídico</span>
                </div>
              </div>

              <div className='flex items-center gap-3 '>
                <div className='px-1'>
                  <Icon name='map-marker-solid' color='#141414' size='28' />
                </div>
                <div className='flex flex-1 flex-col border-b-[1px] border-solid border-[#EBEBEB] py-4'>
                  <span className='text-base font-semibold'>Porto Alegre, Rio Grande do Sul</span>
                  <span className='text-sm font-normal text-[#3D3D3D]'>Localização</span>
                </div>
              </div>
            </div>

            <span className='mt-9 text-base font-bold'>Descritivo de Solução</span>
            <span className='font-regular text-sm text-[#3D3D3D]'>
              O Sustenta Agro tem como objetivo promover práticas agrícolas sustentáveis e
              inovadoras entre pequenos produtores da região Sul, incentivando o uso consciente de
              recursos naturais e aumentando a produtividade de forma sustentável. O programa inclui
              capacitação técnica, workshops sobre gestão agrícola e acesso a tecnologias inovadoras
              para a agricultura de baixo impacto ambiental. Além disso, o Sustenta Agro conecta os
              produtores a mercados que valorizam práticas sustentáveis.
            </span>

            <span className='mt-9 text-2xl font-bold'>Diversidade de fundadores</span>
            <div className='mt-4 flex gap-1'>
              <div className='rounded-full border-[1px] border-solid border-[#EBEBEB] px-2 py-1'>
                2 Pessoas LGBT
              </div>
              <div className='rounded-full border-[1px] border-solid border-[#EBEBEB] px-2 py-1'>
                2 Pessoas Negras
              </div>
              <div className='rounded-full border-[1px] border-solid border-[#EBEBEB] px-2 py-1'>
                1 Pessoas PcDs
              </div>
              <div className='rounded-full border-[1px] border-solid border-[#EBEBEB] px-2 py-1'>
                1 Mulheres
              </div>
            </div>

            <span className='mt-9 text-2xl font-bold'>ODS aos quais contrubui</span>
            <div className='mt-4 grid grid-cols-2 gap-4'>
              <OdsCard label='2. Erradicação da Fome' />
              <OdsCard label='6. Água Limpa e Saneamento' />
              <OdsCard label='13. Combate às Mudanças Climáticas' hideBorder />
            </div>

            <span className='mt-9 text-2xl font-bold'>Maturidade no Caminho Empreendedor</span>
            <div className='mt-4 grid grid-cols-2 gap-4'>
              <EntrepeneurCard label='Verde' value='Explorar' />
              <EntrepeneurCard label='Amarelo' value='Engajar' />
              <EntrepeneurCard label='Vermelho' value='Entregar' />
              <EntrepeneurCard label='Amarelo' value='Vender' />
              <EntrepeneurCard label='Verde' value='Crescer' />
              <EntrepeneurCard label='Verde' value='Estruturar' />
            </div>

            <span className='mt-9 text-2xl font-bold'>Projetos dos quais participa</span>
            <div className='grid w-full grid-cols-2'>
              <div className='flex items-center gap-3 '>
                <ProfileImage initials='FV' />
                <div className='flex flex-col py-4'>
                  <span className='text-base font-semibold'>Futuro Verde</span>
                  <span className='text-sm font-normal text-[#3D3D3D]'>
                    Sustentabilidade e Meio Ambiente
                  </span>
                </div>
              </div>
            </div>

            <span className='mt-9 text-2xl font-bold'>Projetos dos quais já participou</span>
            <div className='grid w-full grid-cols-2 grid-rows-2'>
              <div className='flex items-center gap-3 '>
                <ProfileImage initials='TR' />
                <div className='flex flex-col py-4'>
                  <span className='text-base font-semibold'>Transformação Rural</span>
                  <span className='text-sm font-normal text-[#3D3D3D]'>
                    01/01/2022 - 01/12/2022
                  </span>
                </div>
              </div>

              <div className='flex items-center gap-3 '>
                <ProfileImage initials='IC' />
                <div className='flex flex-col py-4'>
                  <span className='text-base font-semibold'>Inovação no Campo</span>
                  <span className='text-sm font-normal text-[#3D3D3D]'>
                    01/01/2021 - 01/12/2021
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

export default BusinessDetail
