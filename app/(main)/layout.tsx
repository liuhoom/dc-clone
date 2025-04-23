import { NavigationSidebar } from '@/components/nav/nav-sidebar'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='h-full'>
      <aside className='hidden md:flex h-full w-[72px] fixed inset-y-0 z-30'>
        <NavigationSidebar />
      </aside>

      <main className='md:ml-[72px] h-full'>{children}</main>
    </div>
  )
}
