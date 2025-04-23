'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { useModal } from '@/hooks/use-modal'

const formSchem = z.object({
  name: z.string().min(1, {
    message: 'Server name is required.',
  }),
  imageUrl: z.string().min(1, {
    message: 'Server image is required.',
  }),
})

export function CreateServerModal() {
  const { isOpen, onClose, type } = useModal()

  const form = useForm({
    resolver: zodResolver(formSchem),
    defaultValues: {
      name: '',
      imageUrl: '',
    },
  })

  const isLoading = form.formState.isLoading

  return <div className=''></div>
}
