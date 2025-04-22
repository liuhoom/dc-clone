import Image from 'next/image'
import Link from 'next/link'

import { Separator } from '@/components/ui/separator'
import { UserButton } from '../clerk/user-button'
import { NavigationAction } from './navigation-action'

export function NavigationSidebar() {
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

      <div className='flex-1'></div>

      <div className='mb-8'>
        <UserButton />
      </div>
    </div>
  )
}
