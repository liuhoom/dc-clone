export default function ServerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='bg-gray-100 h-full'>
      <div className=''>Server Layout</div>
      {children}
    </div>
  )
}
