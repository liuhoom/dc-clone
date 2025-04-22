import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Github, LogOut } from 'lucide-react'
import { SignedIn, SignOutButton } from '@clerk/nextjs'

import { Separator } from '@/components/ui/separator'
import { UserButton } from '@/components/clerk/user-button'
import { ScrollArea } from '@/components/ui/scroll-area'

import { db } from '@/lib/db'
import { currentProfile } from '@/lib/current-profile'
import { NavigationAction } from './navigation-action'
import { NavigationItem } from './navigation-item'
import { ModeSwitcher } from '../theme-swither'

export async function NavigationSidebar() {
  const profile = await currentProfile()

  if (!profile) redirect('/')

  const servers = db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  return (
    <div className='flex flex-col items-center h-full w-full py-3 text-primary space-y-4 dark:bg-[#1E1F22] bg-[#E3E5E8]'>
      <Link href='/'>
        <Image
          src='/logo.png'
          alt='home image'
          width={48}
          height={48}
          className='rounded-full items-center justify-center text-center'
        />
      </Link>

      <Separator className='h-[2px] w-10 mx-auto bg-zinc-300 dark:bg-zinc-700 rounded-md' />

      <NavigationAction />

      <ScrollArea className='flex-1 w-full'>
        {/* @ts-ignore */}
        {/* {servers?.map((server) => (
          <div className='mb-4' key={server.id}>
            <NavigationItem
              id={server.id}
              imageUrl={server.imageUrl}
              name={server.name}
            />
          </div>
        ))} */}
        <div className=''>hehed</div>
      </ScrollArea>

      <ModeSwitcher />

      <div className='flex flex-col items-center justify-center pb-4 mt-auto gap-y-4'>
        <Link href='https://github.com' target='_blank'>
          <Github className='w-8 h-8' />
        </Link>

        <SignedIn>
          <div className='hidden md:block'>
            <UserButton />
          </div>

          <SignOutButton>
            <button
              title='log out'
              className='md:hidden hover:bg-background/30 p-2.5 rounded-md'
            >
              <LogOut className='h-5 w-5 cursor-pointer' />
            </button>
          </SignOutButton>
        </SignedIn>
      </div>
    </div>
  )
}
