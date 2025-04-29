import { type NextRequest, NextResponse } from 'next/server'

import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      serverId: string
    }
  }
) {
  try {
    const profile = await currentProfile()

    if (!profile) return new NextResponse('Unauthorized.', { status: 401 })

    if (!params.serverId)
      return new NextResponse('Server id is required.', { status: 400 })

    const { name, imageUrl } = await req.json()

    const server = db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log(error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function DELETE(
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
      return new NextResponse('Server id is requried.', { status: 400 })

    const server = await db.server.delete({
      where: {
        profileId: profile.id,
        id: params.serverId,
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.error(error)
    return new NextResponse('Internal Server Error.', { status: 500 })
  }
}
