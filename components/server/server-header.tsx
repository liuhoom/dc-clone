'use client'

import { useModal } from '@/hooks/use-modal'
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from 'lucide-react'

import { MemberRole } from '@prisma/client'
import { ServerWithMembersWithProfiles } from '@/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles
  role?: MemberRole
}

export function ServerHeader({ server, role }: ServerHeaderProps) {
  const { onOpen } = useModal()

  const isAdmin = role === MemberRole.ADMIN
  const isModerator = isAdmin || role === MemberRole.MODERATOR

  console.log(isAdmin, isModerator)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='flex w-full px-3 items-center h-12 font-semibold border-neutral-200 border-b-2 transition hover:bg-zinc-700/10 dark:border-neutral-800 dark:hover:bg-zinc-700/50'>
          {server.name}
          <ChevronDown className='h-5 w-5 ml-auto' />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-56 text-xs font-medium text-black space-y-[2px] dark:text-neutral-400'>
        {isModerator && (
          <DropdownMenuItem className='px-3 py-2 text-sm cursor-pointer text-indigo-600 dark:text-indigo-400'>
            Invite People
            <UserPlus className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}

        {isAdmin && (
          <DropdownMenuItem className='px-3 py-2 text-sm cursor-pointer'>
            Server Settings
            <Settings className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}

        {isAdmin && (
          <DropdownMenuItem className='px-3 py-2 text-sm cursor-pointer'>
            Manage Members
            <Users className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem className='px-3 py-2 text-sm cursor-pointer'>
            Create Channel
            <PlusCircle className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem className='px-3 py-2 text-sm cursor-pointer text-rose-500'>
            Delete Server
            <Trash className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem className='px-3 py-2 text-sm cursor-pointer text-rose-500'>
            Leave Server
            <LogOut className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
