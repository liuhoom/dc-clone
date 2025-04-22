'use client'

import { useParams, useRouter } from 'next/navigation'
import { ActionTooltip } from '../action-tooltip'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface NavigationItemProps {
  id: string
  imageUrl: string
  name: string
}

export function NavigationItem({ id, imageUrl, name }: NavigationItemProps) {
  const router = useRouter()
  const params = useParams()

  const onClick = () => {
    router.push(`/servers/${id}`)
  }

  return (
    <ActionTooltip side='right' align='center' label={name}>
      <button onClick={onClick} className='group relative flex items-center'>
        <div
          aria-hidden
          className={cn(
            'absolute left-0 w-[4px] bg-primary rounded-r-full transition-all',
            params.serverId !== id && 'group-hover:h-[20px]',
            params.serverId === id ? 'h-[36px]' : 'h-[8px]'
          )}
        />

        <div
          className={cn(
            'flex group relative mx-3 h-12 w-12 rounded-[24px] transition-all overflow-hidden',
            params.serverId === id &&
              'bg-primary/10 text-primary rounded-[16px]'
          )}
        >
          <Image src={imageUrl} alt={name} fill />
        </div>
      </button>
    </ActionTooltip>
  )
}
