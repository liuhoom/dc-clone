'use client'

import { useState } from 'react'
import { Check, Copy, RefreshCcw } from 'lucide-react'
import axios from 'axios'

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useModal } from '@/hooks/use-modal'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { ActionTooltip } from '../action-tooltip'
import { useOrigin } from '@/hooks/use-origin'

export function InviteModal() {
  const { type, onOpen, isOpen, onClose, data } = useModal()

  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const origin = useOrigin()
  const { server } = data

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`
  const isModalOpen = isOpen && type === 'invite'

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl)

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  const onNew = async () => {
    try {
      setIsLoading(true)

      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      )

      onOpen('invite', { server: response.data })
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Invite Friends
          </DialogTitle>
        </DialogHeader>

        <div className='p-6'>
          <Label className='uppercase text-xs font-bold text-zinc-500'>
            Server invite link
          </Label>

          <div className='flex items-center mt-2 gap-x-2'>
            <Input
              className='cursor-pointer pointer-events-none bg-zinc-300/300 dark:bg-zinc-300/10 text-black dark:text-white'
              tabIndex={-1}
              value={inviteUrl}
              disabled={isLoading}
              aria-disabled
            />

            <ActionTooltip
              side='left'
              align='end'
              label={copied ? 'Copied' : 'Copy to clipboard'}
            >
              <Button
                size='icon'
                disabled={isLoading}
                aria-disabled={isLoading}
                onClick={onCopy}
              >
                {copied ? (
                  <Check className='w-4 h-4' />
                ) : (
                  <Copy className='w-4 h-4' />
                )}
              </Button>
            </ActionTooltip>
          </div>

          <Button
            disabled={isLoading}
            variant='link'
            onClick={onNew}
            size='sm'
            className='text-xs text-zinc-500 mt-4'
          >
            Generate a new link
            <RefreshCcw className='h-4 w-4' />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
