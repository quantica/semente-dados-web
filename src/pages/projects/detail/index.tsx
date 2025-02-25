import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProjectService from '../../../services/project.service'
import { Button, Icon, Loading, ProfileImage } from 'semente-js'

const ProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data, isPending } = useQuery({
    queryKey: ['projects-data', id],
    queryFn: () => ProjectService.find(id as string)
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
                  initials={data.project?.substring(0, 2) || '-'}
                  className='size-20 !text-4xl'
                />
                <div className='flex flex-col'>
                  <span className='text-4xl font-bold'>{data.project}</span>
                  <span className='text-lg font-normal'>{data.business_unity}</span>
                </div>
              </div>

              <Button
                label='Ver impacto da Semente'
                color='gray'
                layout='rounded'
                className='bg-[#EBEBEB]'
              />
            </div>

            <div className='mt-9 grid w-full grid-cols-2'>
              <div className='flex w-full items-center gap-3'>
                <div className='px-1'>
                  <Icon name='check-circle-solid' color='#1D8640' size='28' />
                </div>
                <div className='flex flex-1 flex-col border-b-[1px] border-solid border-[#EBEBEB] py-4'>
                  <span className='text-base font-semibold'>Concluído</span>
                  <span className='text-sm font-normal text-[#3D3D3D]'>Status</span>
                </div>
              </div>

              <div className='flex items-center gap-3 '>
                <ProfileImage initials='FA' />
                <div className='flex flex-1 flex-col border-b-[1px] border-solid border-[#EBEBEB] py-4'>
                  <span className='text-base font-semibold'>Fundação ABC</span>
                  <span className='text-sm font-normal text-[#3D3D3D]'>Cliente</span>
                </div>
              </div>

              <div className='flex items-center gap-3 '>
                <ProfileImage initials='BC' />
                <div className='flex flex-1 flex-col border-b-[1px] border-solid border-[#EBEBEB] py-4'>
                  <span className='text-base font-semibold'>Beatriz Costa</span>
                  <span className='text-sm font-normal text-[#3D3D3D]'>Gestor de Carteira</span>
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

              <div className='flex items-center gap-3 '>
                <div className='px-1'>
                  <Icon name='calendar-solid' color='#141414' size='28' />
                </div>
                <div className='flex flex-col py-4'>
                  <span className='text-base font-semibold'>01/03/2023 - 01/12/2023</span>
                  <span className='text-sm font-normal text-[#3D3D3D]'>Período</span>
                </div>
              </div>
            </div>

            <span className='mt-9 text-xl font-bold'>Índices</span>
            <div className='mt-4 flex gap-4'>
              <div className='flex h-full w-full flex-col rounded-3xl border-[1px] border-solid border-[#EBEBEB] p-4'>
                <span className='text-xl font-bold'>8.5</span>
                <span className='mt-3 text-base font-semibold text-[#5C5C5C]'>NPS</span>
              </div>
              <div className='flex h-full w-full flex-col rounded-3xl border-[1px] border-solid border-[#EBEBEB] p-4'>
                <span className='text-xl font-bold'>8.7</span>
                <span className='mt-3 text-base font-semibold text-[#5C5C5C]'>
                  Índice de Satisfação com a Experiência
                </span>
              </div>
              <div className='flex h-full w-full flex-col rounded-3xl border-[1px] border-solid border-[#EBEBEB] p-4'>
                <span className='text-xl font-bold'>8.3</span>
                <span className='mt-3 text-base font-semibold text-[#5C5C5C]'>Índice IVAV</span>
              </div>
            </div>

            <span className='mt-9 text-base font-bold'>Descrição</span>
            <span className='font-regular text-sm text-[#3D3D3D]'>
              O objetivo do programa Futuro Verde foi capacitar empreendedores locais a
              desenvolverem 10 negócios voltados para sustentabilidade e impacto ambiental nas
              comunidades periféricas de Porto Alegre. O programa buscou fomentar habilidades
              empreendedoras e inovadoras, criando soluções práticas para desafios ambientais e
              promovendo uma sociedade mais verde e consciente.
              <br />
              <br />
              Com duração de 9 meses, o escopo começou com o lançamento do edital e a inscrição de
              40 projetos. Após uma avaliação criteriosa, 20 negócios foram selecionados para
              participar de um programa intensivo de capacitação, incluindo uma maratona de
              validação. Ao final, 10 negócios receberam mentoria e acompanhamento, com foco no uso
              sustentável dos recursos e impacto ambiental positivo.
            </span>

            <span className='mt-9 text-base font-bold'>Resultados</span>
            <span className='font-regular text-sm text-[#3D3D3D]'>
              <ul>
                <li>40 projetos inscritos, com foco em sustentabilidade e inovação ambiental.</li>
                <li>20 negócios capacitados por meio de workshops e mentorias especializadas.</li>
                <li>
                  10 projetos selecionados para receber acompanhamento e suporte para implementação.
                </li>
                <li>
                  Impacto direto em mais de 500 pessoas, promovendo educação ambiental e ações
                  práticas de sustentabilidade nas comunidades.
                </li>
              </ul>

              <br />
              <br />

              <p>O programa foi composto por 3 etapas principais:</p>
              <ol>
                <li>
                  <strong>Seleção e Capacitação Inicial:</strong> Análise dos projetos inscritos e
                  workshops introdutórios sobre empreendedorismo sustentável.
                </li>
                <li>
                  <strong>Maratona de Validação:</strong> Atividades para validar as propostas de
                  impacto ambiental e preparar os negócios para o mercado.
                </li>
                <li>
                  <strong>Acompanhamento e Implantação:</strong> Mentorias especializadas e suporte
                  financeiro para garantir a viabilidade e sustentabilidade dos negócios.
                </li>
              </ol>
            </span>

            <span className='mt-9 text-2xl font-bold'>Equipe Sementer</span>
            <div className='grid w-full grid-cols-2 grid-rows-2'>
              <div className='flex w-full items-center gap-3'>
                <ProfileImage initials='LF' />
                <div className='flex flex-1 flex-col border-b-[1px] border-solid border-[#EBEBEB] py-4'>
                  <span className='text-base font-semibold'>Luiza Ferreira</span>
                  <span className='text-sm font-normal text-[#3D3D3D]'>Pessoa Consultora</span>
                </div>
              </div>

              <div className='flex items-center gap-3 '>
                <ProfileImage initials='TM' />
                <div className='flex flex-1 flex-col border-b-[1px] border-solid border-[#EBEBEB] py-4'>
                  <span className='text-base font-semibold'>Taynara Morae</span>
                  <span className='text-sm font-normal text-[#3D3D3D]'>Analista de Dados</span>
                </div>
              </div>

              <div className='flex items-center gap-3 '>
                <ProfileImage initials='DK' />
                <div className='flex flex-col py-4'>
                  <span className='text-base font-semibold'>Daniel Kunde</span>
                  <span className='text-sm font-normal text-[#3D3D3D]'>
                    Pessoa Consultora Especialista
                  </span>
                </div>
              </div>

              <div className='flex items-center gap-3 '>
                <ProfileImage initials='NC' />
                <div className='flex flex-col py-4'>
                  <span className='text-base font-semibold'>Nayara Calixto</span>
                  <span className='text-sm font-normal text-[#3D3D3D]'>Analista Financeira</span>
                </div>
              </div>
            </div>

            <span className='mt-9 text-2xl font-bold'>Equipe da Rede</span>
            <div className='flex items-center gap-3 '>
              <ProfileImage initials='GW' />
              <div className='flex flex-col py-4'>
                <span className='text-base font-semibold'>Giulia Wada</span>
                <span className='text-sm font-normal text-[#3D3D3D]'>Pessoa Consultora</span>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default ProjectDetail
