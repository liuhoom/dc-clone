import { currentProfile } from '@/lib/current-profile'
import { ServerHeader } from './server-header'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { ChannelType } from '@prisma/client'

interface ServerHeaderProps {
  serverId: string
}

export async function ServerSidebar({ serverId }: ServerHeaderProps) {
  const profile = await currentProfile()

  if (!profile) return redirect('/sign-in')

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc',
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: 'asc',
        },
      },
    },
  })

  if (!server) return redirect('/')

  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  )

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role

  return (
    <div className='flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]'>
      {/* @ts-ignore */}
      <ServerHeader server={server} role={role} />
    </div>
  )
}
