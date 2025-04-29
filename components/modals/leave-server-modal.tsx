'use client'

import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { useModal } from '@/hooks/use-modal'

interface LeaveServerModalProps {}

export function LeaveServerModal({}: LeaveServerModalProps) {
  const { isOpen, type, data, onClose } = useModal()
  const { server } = data
  const isModalOpen = isOpen && type === 'leaveServer'

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onClick = async () => {
    try {
      setIsLoading(true)
      await axios.patch(`/api/servers/${server?.id}/leave`)

      onClose()
      router.refresh()
      router.push('/')
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(true)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='p-0 overflow-hidden'>
        <DialogHeader className='px-6 pt-8'>
          <DialogTitle className='font-bold text-center text-2xl'>
            Leave Server
          </DialogTitle>
          <DialogDescription className='text-center'>
            Are you sure you want to leave{' '}
            <span className='font-semibold text-indigo-500'>
              {server?.name}
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className='px-6 py-4 bg-gray-100/90 dark:bg-gray-100/10'>
          <div className='flex justify-between items-center w-full'>
            <Button
              variant='ghost'
              disabled={isLoading}
              aria-disabled={isLoading}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant='destructive'
              disabled={isLoading}
              aria-disabled={isLoading}
              onClick={onClick}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
