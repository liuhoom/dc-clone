'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { useModal } from '@/hooks/use-modal'
import axios from 'axios'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { useRouter, redirect } from 'next/navigation'
import { FileUpload } from '../file-upload'
import { Input } from '@/components/ui/input'
import { Button } from '../ui/button'

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
  const router = useRouter()

  const isModalOpen = type === 'createServer' && isOpen

  const form = useForm({
    resolver: zodResolver(formSchem),
    defaultValues: {
      name: '',
      imageUrl: '',
    },
  })

  const isLoading = form.formState.isLoading

  const onsubmit = async (values: z.infer<typeof formSchem>) => {
    try {
      await axios.post('/api/server', values)

      form.reset()
      router.refresh()
      window.location.reload()
    } catch (error) {
      console.error('Create Server Error:', error)
    }
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className='p-0 items-center overflow-hidden'>
        <DialogHeader className='px-6 pt-8'>
          <DialogTitle className='text-center font-bold text-2xl'>
            Create your server.
          </DialogTitle>

          <DialogDescription className='text-center text-zinc-400'>
            Give your server a personality with a name and an image. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onsubmit)}
            autoCapitalize='off'
            autoComplete='off'
          >
            <div className='space-y-8'>
              <div className=''>
                <FormField
                  name='imageUrl'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint='serverImage'
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name='name'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        aria-disabled={isLoading}
                        placeholder='enter your server name'
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                variant='primary'
                disabled={isLoading}
                aria-disabled={isLoading}
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
