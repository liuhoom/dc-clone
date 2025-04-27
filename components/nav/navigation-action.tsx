'use client'

import { Plus } from 'lucide-react'

import { useModal } from '@/hooks/use-modal'
import { ActionTooltip } from '../action-tooltip'

export function NavigationAction() {
  const { onOpen } = useModal()

  return (
    <ActionTooltip side='right' align='center' label='Add a server'>
      <button
        className='group flex items-center'
        onClick={() => onOpen('createServer')}
      >
        <div className='flex mx-3 h-[48px] w-[48px] rounded-[24px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500 group-hover:rounded-[16px]'>
          <Plus
            className='text-emerald-500 transition group-hover:text-white'
            size={25}
          />
        </div>
      </button>
    </ActionTooltip>
  )
}
