import { ServerSidebar } from '@/components/server/server-sidebar'
import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'

export default async function ServerLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {
    serverId: string
  }
}) {
  const profile = await currentProfile()

  if (!profile) return redirect('/sign-in')

  const server = db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  })

  if (!server) redirect('/')

  return (
    <div className='h-full'>
      <aside className='hidden md:flex h-full w-60 flex-col fixed inset-y-0 bg-indigo-100'>
        <ServerSidebar serverId={params.serverId} />
      </aside>
      <main className='h-full md:pl-60'>{children}</main>
    </div>
  )
}
