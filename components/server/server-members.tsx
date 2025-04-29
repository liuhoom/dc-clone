'use client'

import { ShieldAlert, ShieldCheck } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import {
  MemberRole,
  type Member,
  type Profile,
  type Server,
} from '@prisma/client'
import { UserAavatar } from '../user-avatar'
import { cn } from '@/lib/utils'

interface ServerMembersProps {
  member: Member & { profile: Profile }
  server: Server
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className='h-4 w-4 ml-2 text-indigo-500' />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className='h-4 w-4 ml-2 text-rose-500' />,
}

export function ServerMembers({ member, server }: ServerMembersProps) {
  const params = useParams()
  const router = useRouter()

  const icon = roleIconMap[member.role]

  const onClick = () => {
    router.push(`/servers/${params?.serverId}/conversation/${member.id}`)
  }
  return (
    <button
      onClick={onClick}
      className={cn(
        'group flex px-2 py-2 items-center rounded-md w-full gap-x-2 mb-1 transition hover:bg-zinc-700 dark:hover:bg-zinc-700/50',
        params?.memberId === member.id && 'bg-zinc-700/20 dark:bg-zinc-700'
      )}
    >
      <UserAavatar
        src={member.profile.imageUrl}
        alt={member.profile.name}
        className='h-8 w-8'
      />

      <p
        className={cn(
          'font-semibold text-zinc-500 text-sm group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition',
          params?.memberId === member.id &&
            'text-primary dark:text-zinc-200 dark:group-hover:text-white'
        )}
      >
        {member.profile.name}
      </p>

      {icon}
    </button>
  )
}
