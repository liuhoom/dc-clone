'use client'

import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from 'lucide-react'
import { useState } from 'react'
import { MemberRole } from '@prisma/client'
import qs from 'query-string'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

import { useModal } from '@/hooks/use-modal'
import { ServerWithMembersWithProfiles } from '@/types'
import { UserAavatar } from '@/components/user-avatar'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className='h-4 w-4 ml-2 text-indigo-500' />,
  ADMIN: <ShieldAlert className='h-4 w-4 ml-2 text-rose-500' />,
}

export function MemebersModal() {
  const [loadingId, setLoadingId] = useState('')
  const router = useRouter()
  const { type, isOpen, onOpen, onClose, data } = useModal()

  const { server } = data as { server: ServerWithMembersWithProfiles }
  const isModalOpen = isOpen && type === 'members'

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId)
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      })

      console.log(url)

      const response = await axios.patch(url, { role })
      router.refresh()
      onOpen('members', { server: response.data })
    } catch (error) {
      console.error('Error: ', error)
    } finally {
      setLoadingId('')
    }
  }

  const onKick = async (memberId: string) => {
    try {
      setLoadingId(memberId)
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      })

      const response = await axios.delete(url)
      router.refresh()
      onOpen('members', { server: response.data })
    } catch (error) {
      console.error('Error: ', error)
    } finally {
      setLoadingId('')
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='p-0 overflow-hidden'>
        <DialogHeader className='px-6 pt-8'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Manage Members
          </DialogTitle>

          <DialogDescription className='text-center text-zinc-500'>
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className='mt-8 max-h-[420px] px-6'>
          {server?.members?.map((member) => (
            <div className='flex gap-x-2 items-center mb-6' key={member.id}>
              <UserAavatar
                src={member.profile.imageUrl}
                alt={member.profile.name}
              />

              <div className='flex flex-col gap-y-1'>
                <div className='flex items-center text-xs font-semibold gap-x-1'>
                  {member.profile.name}
                  {roleIconMap[member.role]}
                </div>

                <p className='text-xs'>{member.profile.email}</p>
              </div>

              {server.profileId !== member.profileId &&
                loadingId !== member.id && (
                  <div className=''>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className='h-4 w-4 text-zinc-500' />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent side='left'>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className='flex items-center'>
                            <ShieldQuestion className='w-4 h-4 mr-2' />
                            <span className=''>Role</span>
                          </DropdownMenuSubTrigger>

                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() => onRoleChange(member.id, 'GUEST')}
                              >
                                <Shield className='h-4 w-4 mr-2' />
                                Guest
                                {member.role === 'GUEST' && (
                                  <Check className='h-4 w-4 mr-2' />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  onRoleChange(member.id, 'MODERATOR')
                                }
                              >
                                <ShieldCheck className='h-4 w-4 mr-2' />
                                Moderator
                                {member.role === 'MODERATOR' && (
                                  <Check className='h-4 w-4 mr-2' />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem onClick={() => onKick(member.id)}>
                          <Gavel className='h-4 w-4 mr-2' />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}

              {loadingId === member.id && (
                <Loader2 className='w-4 h-4 ml-auto animate-spin text-zinc-500' />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
