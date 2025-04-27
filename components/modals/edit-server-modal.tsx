'use client'

import * as z from 'zod'
import { useModal } from '@/hooks/use-modal'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { FileUpload } from '../file-upload'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Server name is required.',
  }),
  imageUrl: z.string().min(1, {
    message: 'Server image is required.',
  }),
})

export function EditServerModal() {
  const { onClose, data, type, isOpen } = useModal()
  const { server } = data

  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
    },
  })

  useEffect(() => {
    if (server) {
      form.setValue('name', server.name)
      form.setValue('imageUrl', server.imageUrl)
    }
  }, [server, form])

  const isLoading = form.formState.isSubmitting

  const isModalOpen = isOpen && type === 'editServer'

  const handleClose = () => {
    form.reset()
    onClose()
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/servers/${server?.id}`, values)

      form.reset()
      router.refresh()
      onClose()
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className='p-0 overflow-hidden'>
        <DialogHeader className='px-6 pt-8'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Customize you server
          </DialogTitle>

          <DialogDescription className='text-center text-zinc-500'>
            Give your server a personality with a name and an image. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            autoCapitalize='off'
            autoComplete='off'
            className='space-y-8'
          >
            <div className='px-6 space-y-8'>
              <div className='flex items-center justify-center text-center'>
                <FormField
                  name='imageUrl'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        {/* <FileUpload
                          value={field.value}
                          endpoint='serverImage'
                          onChange={field.onChange}
                        /> */}
                        <div className=''>Bug</div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase font-bold text-zinc-500 text-xs'>
                      Server name
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder='Enter server name'
                        disabled={isLoading}
                        aria-disabled={isLoading}
                        className='border-0 bg-zinc-300/50 dark:bg-zinc-500/10 text-black dark:text-white'
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className='px-6 py-4'>
              <Button
                variant='primary'
                disabled={isLoading}
                aria-disabled={isLoading}
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
