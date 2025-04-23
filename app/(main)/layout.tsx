import { NavigationSidebar } from '@/components/nav/nav-sidebar'

export default function ComponentName({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className=''>
      <aside className='hidden md:flex h-full w-[72px] fixed inset-y-0'>
        <NavigationSidebar />
      </aside>

      <div className='md:ml-[72px] h-full'>{children}</div>
    </div>
  )
}
