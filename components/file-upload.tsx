'use client'

import { X } from 'lucide-react'
import Image from 'next/image'

import { UploadDropzone } from '@/lib/uploadthing'

// import '@uploadthing/react/styles.css'

interface FileUploadProps {
  value: string
  onChange: (url?: string) => void
  endpoint: 'messageFile' | 'serverImage'
}

export function FileUpload({ endpoint, value, onChange }: FileUploadProps) {
  const fileType = value.split('.').pop()

  if (fileType !== 'pdf' && value) {
    return (
      <div className='relative h-20 w-20'>
        <Image src={value} className='rounded-full' alt='server image' fill />
        <button
          className='bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm'
          onClick={() => onChange('')}
          type='button'
        >
          <X className='h-4 w-4' />
        </button>
      </div>
    )
  }

  return (
    <UploadDropzone
      className='border-zinc-500 ut-button:bg-indigo-500 ut-button:ut-uploading:bg-indigo-500/70 after:ut-button:ut-uploading:bg-indigo-500 ut-label:text-indigo-500 hover:ut-label:text-indigo-500/70'
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url)
      }}
      onUploadError={(error) => {
        console.error('File Upload Error: ', error)
      }}
    />
  )
}
