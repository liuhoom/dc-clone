import { InitModal } from '@/components/modals/init-modal'
import { db } from '@/lib/db'
import { initialProfile } from '@/lib/initial-profile'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const profile = await initialProfile()

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  })

  if (server) redirect(`/servers/${server.id}`)

  return (
    <div className=''>
      <InitModal />
    </div>
  )
}
