import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'
import { currentUser } from '@clerk/nextjs/server'

const f = createUploadthing()

const handleAuth = async () => {
  const user = await currentUser()
  const userId = user?.id
  console.log(userId)

  if (!userId) throw new UploadThingError('Unauthorized.')

  return { userId }
}

export const appFileRouter = {
  serverImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  messageFile: f(['image', 'pdf'])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter

export type AppFileRouter = typeof appFileRouter
