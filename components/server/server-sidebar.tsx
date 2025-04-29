import { currentProfile } from '@/lib/current-profile'
import { ServerHeader } from './server-header'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { ChannelType, MemberRole } from '@prisma/client'
import { Separator } from '../ui/separator'
import { ScrollArea } from '../ui/scroll-area'
import { ServerChannel } from './server-channel'
import { ServerSearch } from './server-search'
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from 'lucide-react'
import { ServerSection } from './server-section'
import { ServerMembers } from './server-members'

interface ServerHeaderProps {
  serverId: string
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className='h-4 w-4 mr-2' />,
  [ChannelType.VIDEO]: <Video className='h-4 w-4 mr-2' />,
  [ChannelType.AUDIO]: <Mic className='h-4 w-4 mr-2' />,
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className='h-4 w-4 mr-2 text-indigo-500' />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className='h-4 w-4 mr-2 text-rose-500' />,
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
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  )
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  )
  const members = server?.members.filter((member) => member.id !== profile.id)

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
              {
                label: 'Audio Channels',
                type: 'channel',
                data: audioChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: 'Video Channels',
                type: 'channel',
                data: videoChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: 'Members',
                type: 'member',
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIconMap[member.role],
                })),
              },
            ]}
          />

          <Separator className='my-2 rounded-md bg-zinc-200 dark:bg-zinc-700' />

          {!!textChannels?.length && (
            <div className='mb-2'>
              <ServerSection
                label='Text Channel'
                role={role}
                sectionType='channels'
                channelType={ChannelType.TEXT}
              />
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

          {!!audioChannels?.length && (
            <div className='mb-2'>
              <ServerSection
                label='Audio Channel'
                role={role}
                sectionType='channels'
                channelType={ChannelType.AUDIO}
              />
              <div className='space-y-1'>
                {audioChannels.map((channel) => (
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

          {!!videoChannels?.length && (
            <div className='mb-2'>
              <ServerSection
                label='Video Channel'
                role={role}
                sectionType='channels'
                channelType={ChannelType.VIDEO}
              />
              <div className='space-y-1'>
                {videoChannels.map((channel) => (
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

          {!!members?.length && (
            <div className='mb-2'>
              <ServerSection
                label='Members'
                role={role}
                sectionType='members'
                server={server}
              />
              <div className='space-y-1'>
                {members.map((member) => (
                  <ServerMembers
                    key={member.id}
                    server={server}
                    member={member}
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
