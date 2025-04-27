'use client'

import { Dialog, DialogContent, DialogHeader } from '../ui/dialog'

import { useModal } from '@/hooks/use-modal'

export function EditServerModal() {
  const { onOpen, onClose, data, type, isOpen } = useModal()

  const { server } = data

  const isModalOpen = isOpen && type === 'editServer'
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>omg</DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
