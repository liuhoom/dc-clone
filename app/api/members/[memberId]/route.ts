import { NextRequest, NextResponse } from 'next/server'

import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      memberId: string
    }
  }
) {
  try {
    const { searchParams } = new URL(req.url)
    const { role } = await req.json()
    const serverId = searchParams.get('serverId')

    const profile = await currentProfile()

    console.log(profile?.id, params.memberId)

    if (!profile) return new NextResponse('Unauthorized.', { status: 401 })

    if (!serverId)
      return new NextResponse('Server id is required.', { status: 400 })

    if (!params.memberId)
      return new NextResponse('Member id is required.', { status: 400 })

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: params.memberId,
              profileId: {
                not: profile.id,
              },
            },
            data: {
              role,
            },
          },
        },
      },
      include: {
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

    return NextResponse.json(server)
  } catch (error) {
    console.error('Error: ', error)
    return new NextResponse('Internal Server Error.', { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      memberId: string
    }
  }
) {
  try {
    const profile = await currentProfile()
    const { searchParams } = new URL(req.url)
    const serverId = searchParams.get('serverId')

    if (!profile) return new NextResponse('Unauthorized.', { status: 401 })

    if (!serverId)
      return new NextResponse('Server id is required.', { status: 400 })

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          deleteMany: {
            id: params.memberId,
            profileId: {
              not: profile.id,
            },
          },
        },
      },
      include: {
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

    return NextResponse.json(server)
  } catch (error) {
    console.error('Error: ', error)
    return new NextResponse('Internal Server Error.', { status: 500 })
  }
}
