import { type NextRequest, NextResponse } from 'next/server'

import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: { serverId: string }
  }
) {
  try {
    const profile = await currentProfile()
    if (!profile) return new NextResponse('Unauthorized.', { status: 401 })

    if (!params.serverId)
      return new NextResponse('Server id is required.', { status: 400 })

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: {
          not: profile.id,
        },
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id,
          },
        },
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.error('Error: ', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
