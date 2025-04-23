'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import * as z from 'zod'
import axios from 'axios'

import { useModal } from '@/hooks/use-modal'

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
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { FileUpload } from '../file-upload'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

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

  const onSubmit = async (values: z.infer<typeof formSchem>) => {
    try {
      await axios.post('/api/servers', values)

      form.reset()
      router.refresh()
      onClose()
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
            onSubmit={form.handleSubmit(onSubmit)}
            autoCapitalize='off'
            autoComplete='off'
          >
            <div className='space-y-8 px-6'>
              <div className='flex items-center justify-center text-center'>
                <FormField
                  name='imageUrl'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint='messageFile'
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
                    <FormLabel>Server Name</FormLabel>
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
