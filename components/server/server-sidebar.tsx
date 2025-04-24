import { currentProfile } from '@/lib/current-profile'
import { ServerHeader } from './server-header'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { ChannelType } from '@prisma/client'
import { Separator } from '../ui/separator'
import { ScrollArea } from '../ui/scroll-area'
import { ServerChannel } from './server-channel'
import { ServerSearch } from './server-search'
import { Hash, Mic, Video } from 'lucide-react'

interface ServerHeaderProps {
  serverId: string
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className='h-4 w-4 mr-2' />,
  [ChannelType.VIDEO]: <Video className='h-4 w-4 mr-2' />,
  [ChannelType.AUDIO]: <Mic className='h-4 w-4 mr-2' />,
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

      <ScrollArea className='flex-1 px-3'>
        <div className='mt-2'>
          <ServerSearch
            data={[
              {
                label: 'Text Channels',
                type: 'channel',
                data: textChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
            ]}
          />

          <Separator className='my-2 rounded-md bg-zinc-200 dark:bg-zinc-700' />

          {textChannels?.length && (
            <div className='mb-2'>
              <div className='space-y-1'>
                {textChannels.map((channel) => (
                  <ServerChannel
                    key={channel.id}
                    server={server}
                    role={role}
                    channel={channel}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
