'use client'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface UserAavatarProps {
  src?: string
  alt: string
  className?: string
}

export function UserAavatar({ src, alt, className }: UserAavatarProps) {
  return (
    <Avatar className={cn(className, 'h-7 w-7 md:h-10 md:w-10')}>
      <AvatarImage src={src} alt={alt} />
    </Avatar>
  )
}
