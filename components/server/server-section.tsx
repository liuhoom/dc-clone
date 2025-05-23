'use client'

import { ServerWithMembersWithProfiles } from '@/types'
import { type ChannelType, MemberRole } from '@prisma/client'
import { ActionTooltip } from '../action-tooltip'
import { Plus, Settings } from 'lucide-react'
import { useModal } from '@/hooks/use-modal'

interface ServerSectionProps {
  label: string
  role?: MemberRole
  sectionType: 'channels' | 'members'
  channelType?: ChannelType
  server?: ServerWithMembersWithProfiles
}

export function ServerSection({
  label,
  role,
  sectionType,
  channelType,
  server,
}: ServerSectionProps) {
  const { onOpen } = useModal()

  return (
    <div className='flex items-center justify-between py-2'>
      <p className='text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400'>
        {label}
      </p>

      {role !== MemberRole.GUEST && sectionType === 'channels' && (
        <ActionTooltip side='top' label='Create Channel'>
          <button
            onClick={() => onOpen('createChannel', { channelType })}
            className='text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition'
          >
            <Plus className='h-4 w-4 mr-2' />
          </button>
        </ActionTooltip>
      )}

      {role === MemberRole.ADMIN && sectionType === 'members' && (
        <ActionTooltip side='top' label='Manage Members'>
          <button
            onClick={() => onOpen('members', { server })}
            className='text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition'
          >
            <Settings className='h-4 w-4 mr-2' />
          </button>
        </ActionTooltip>
      )}
    </div>
  )
}
