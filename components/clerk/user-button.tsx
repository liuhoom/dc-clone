'use client'

import { UserButton as ClerkUserButton } from '@clerk/nextjs'

export function UserButton() {
  return (
    <ClerkUserButton
      appearance={{
        elements: {
          avatarBox: 'h-[42px] w-[42px]',
        },
      }}
      userProfileMode='navigation'
      userProfileUrl='/account'
    />
  )
}
