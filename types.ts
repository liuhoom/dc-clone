import type { Member, Profile, Server } from '@prisma/client'

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profiles: Profile })[]
}
