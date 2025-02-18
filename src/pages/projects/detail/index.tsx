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
          <div className='flex w-full flex-col px-[10vw]'>
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
          </div>
        )
      )}
    </div>
  )
}

export default ProjectDetail
