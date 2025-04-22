'use client'

import { UserButton as ClerkUserButton } from '@clerk/nextjs'

export function UserButton() {
  return (
    <ClerkUserButton
      appearance={{
        elements: {
          avatarBox: 'h-[48px] w-[48px]',
        },
      }}
      userProfileMode='navigation'
      userProfileUrl='/account'
    />
  )
}
