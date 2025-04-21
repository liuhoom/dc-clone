import Image from 'next/image'
import Link from 'next/link'

import { Separator } from '@/components/ui/separator'

export function NavigationSidebar() {
  return (
    <div className=''>
      <Link href='/'>
        <Image
          src='/logo.png'
          alt='home image'
          width={48}
          height={48}
          className='rounded-full'
        />
      </Link>

      <Separator className='h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto' />
    </div>
  )
}
