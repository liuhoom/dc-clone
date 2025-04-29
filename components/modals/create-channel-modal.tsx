'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import qs from 'query-string'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogContent,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useModal } from '@/hooks/use-modal'
import { ChannelType } from '@prisma/client'

interface CreateChannelModalProps {}

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Channel name is required.' })
    .refine((name) => name !== 'general', {
      message: 'Channel name cannot be general',
    }),
  type: z.nativeEnum(ChannelType),
})

export function CreateChannelModal({}: CreateChannelModalProps) {
  const params = useParams()
  const router = useRouter()

  const { isOpen, type, onClose, data } = useModal()

  const isModalOpen = isOpen && type === 'createChannel'
  const { channelType } = data

  console.log(channelType)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: channelType || ChannelType.TEXT,
    },
  })

  useEffect(() => {
    if (channelType) form.setValue('type', channelType)
    else form.setValue('type', ChannelType.TEXT)

    console.log(form.getValues('type'))
  }, [channelType, form])

  const isLoading = form.formState.isSubmitting
  const handleClose = () => {
    form.reset()
    onClose()
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: '/api/channels',
        query: {
          serverId: params?.serverId,
        },
      })

      console.log(values)

      await axios.post(url, values)

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
          <DialogTitle className='uppercase text-2xl font-bold text-center'>
            Create channel
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            autoCapitalize='off'
            autoComplete='off'
            className='space-y-8'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className='px-6 space-y-8'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-zinc-500 font-bold'>
                      Channel name
                    </FormLabel>

                    <FormControl>
                      <Input
                        className='text-black dark:text-white bgz-inc-300/50 dark:bg-zinc-300/10 border-0'
                        placeholder='Enter channel name'
                        disabled={isLoading}
                        aria-disabled={isLoading}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase font-bold text-zinc-500'>
                      Channel type
                    </FormLabel>

                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='bg-zinc-300/50 dark:bg-zinc-300/10 capitalize'>
                          <SelectValue placeholder='Select a channel type' />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {Object.values(ChannelType).map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className='capitalize'
                          >
                            {type.toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className='py-4 px-6'>
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
