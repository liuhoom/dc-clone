import { InitModal } from '@/components/init-modal'
import { initialProfile } from '@/lib/initial-profile'
import { UserButton } from '@clerk/nextjs'

export default async function HomePage() {
  const user = await initialProfile()

  return (
    <div className=''>
      <UserButton />
      <InitModal />
    </div>
  )
}
