'use client'

import { CreateServerModal } from '@/components/modals/create-server-modal'
import { InviteModal } from '@/components/modals/invite-modal'
import { EditServerModal } from '@/components/modals/edit-server-modal'
import { MemebersModal } from '../modals/members-modal'

export function ModalProvider() {
  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MemebersModal />
    </>
  )
}
