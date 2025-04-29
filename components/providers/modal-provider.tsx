'use client'

import { CreateServerModal } from '@/components/modals/create-server-modal'
import { InviteModal } from '@/components/modals/invite-modal'
import { EditServerModal } from '@/components/modals/edit-server-modal'
import { MemebersModal } from '@/components/modals/members-modal'
import { CreateChannelModal } from '@/components/modals/create-channel-modal'
import { DeleteServerModal } from '@/components/modals/delete-server-modal'
import { LeaveServerModal } from '@/components/modals/leave-server-modal'

export function ModalProvider() {
  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MemebersModal />
      <CreateChannelModal />
      <DeleteServerModal />
      <LeaveServerModal />
    </>
  )
}
