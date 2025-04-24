'use client'

import { Hash, Lock, Mic, Video } from 'lucide-react'
import { Channel, ChannelType, MemberRole, Server } from '@prisma/client'
import { cn } from '@/lib/utils'
import { useParams, useRouter } from 'next/navigation'

interface ServerChannelProps {
  channel: Channel
  server: Server
  role?: MemberRole
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
}

export function ServerChannel({ channel, server, role }: ServerChannelProps) {
  const params = useParams()
  const router = useRouter()

  const Icon = iconMap[channel.type]

  const onClick = () => {
    router.push(`/servers/${params.serverId}/channels/${channel.id}`)
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'group flex w-full px-2 py-2 mb-1 items-center rounded-md transition gap-x-2 hover:bg-zinc-700/10 dark:bg-zinc-700/50',
        params?.channelId === channel.id && 'bg-zinc-700/20 dark:bg-zinc-700'
      )}
    >
      <Icon className='flex-shrink-0 w-5 h-5 text-zinc-500' />

      <p
        className={cn(
          'line-clamp-1 font-semibold transition text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300',
          params?.channelId === channel.id &&
            'text-primary dark:text-zinc-200 dark:group-hover:text-white'
        )}
      >
        {channel.name}
      </p>

      {channel.name === 'general' && (
        <Lock className='h-4 w-4 ml-auto text-zinc-500' />
      )}
    </button>
  )
}
