import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'

interface InviteCodeProps {
  params: {
    inviteCode: string
  }
}

export default async function InviteCode({ params }: InviteCodeProps) {
  const profile = await currentProfile()

  if (!profile) redirect('/')

  if (!params.inviteCode) redirect('/')

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  if (existingServer) redirect(`/servers/${existingServer.id}`)

  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  })

  if (server) redirect(`/servers/${server.id}`)

  return null
}
