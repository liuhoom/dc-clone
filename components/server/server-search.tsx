'use client'

import { Search, type LucideIcon } from 'lucide-react'
import { useEffect, useState, type ReactElement } from 'react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { useParams, useRouter } from 'next/navigation'

interface ServerSearchProps {
  data: {
    label: string
    type: 'channel' | 'member'
    data:
      | {
          icon: ReactElement<LucideIcon> | null
          name: string
          id: string
        }[]
      | undefined
  }[]
}

export function ServerSearch({ data }: ServerSearchProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const onClick = ({
    id,
    type,
  }: {
    id: string
    type: 'channel' | 'member'
  }) => {
    setOpen(false)
    if (type === 'channel')
      router.push(`/servers/${params.serverId}/channels/${id}`)
  }

  return (
    <>
      <button
        className='group flex w-full px-2 py-2 items-center rounded-md gap-x-2 hover:bg-zinc-700/10'
        onClick={() => setOpen(true)}
      >
        <Search className='h-4 w-4 text-zinc-500 dark:text-zinc-400' />

        <p className='text-sm font-semibold text-zinc-500 transition'>Search</p>

        <kbd
          title='Press Ctrl/Cmd + k to open search modal'
          className='inline-flex h-5 px-1.5 ml-auto items-center rounded border pointer-events-none select-none font-mono bg-muted text-[10px] font-medium text-muted-foreground'
          aria-disabled
        >
          <span>Ctrl</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Search all channels and members' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {data.map(({ label, type, data: subData }) => {
            if (!subData?.length) return null

            return (
              <CommandGroup key={label} heading={label}>
                {subData?.map(({ id, icon, name }) => {
                  return (
                    <CommandItem
                      key={id}
                      onSelect={() => onClick({ id, type })}
                      className='cursor-pointer'
                    >
                      {icon}
                      <span>{name}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            )
          })}
        </CommandList>
      </CommandDialog>
    </>
  )
}
