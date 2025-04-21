import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

export async function currentProfile() {
  const { userId, redirectToSignIn } = await auth()

  if (!userId) return redirectToSignIn()

  const profile = db.profile.findUnique({
    where: {
      userId,
    },
  })

  return profile
}
