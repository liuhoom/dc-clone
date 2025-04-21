import { db } from './db'
import { currentUser } from '@clerk/nextjs/server'

export const initialProfile = async () => {
  const user = await currentUser()

  if (!user) return null

  const currentProfile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  })

  if (currentProfile) return currentProfile

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  })

  return newProfile
}
