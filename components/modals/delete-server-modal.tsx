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

export function DeleteServerModal() {
  const { isOpen, type, onClose, data } = useModal()
  const { server } = data
  const isModalOpen = isOpen && type === 'deleteServer'

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)
      await axios.delete(`/api/servers/${server?.id}`)

      onClose()
      router.refresh()
      router.push('/')
    } catch (error) {
      console.error('Error: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='p-0 overflow-hidden'>
        <DialogHeader className='px-6 pt-8'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Delete Server
          </DialogTitle>

          <DialogDescription className='text-center'>
            Are you sure you want to do this? <br />
            <span className='font-semibold text-indigo-500'>
              {server?.name}
            </span>{' '}
            will be permanently deleted.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className='px-6 py-4 bg-gray-100/90 dark:bg-gray-100/10'>
          <div className='flex items-center justify-between w-full'>
            <Button
              disabled={isLoading}
              aria-disabled={isLoading}
              onClick={onClose}
              variant='ghost'
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              aria-disabled={isLoading}
              onClick={onClick}
              variant='destructive'
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
