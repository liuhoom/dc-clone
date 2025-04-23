import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Montserrat, Inter } from 'next/font/google'
import type { PropsWithChildren } from 'react'

import { siteConfig } from '@/config'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { ModalProvider } from '@/components/providers/modal-provider'

import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: '600' })
export const metadata: Metadata = siteConfig

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#6F5AF6',
        },
        layout: {
          logoPlacement: 'none',
        },
      }}
    >
      <html lang='en'>
        <body className={inter.className}>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            disableTransitionOnChange
            enableColorScheme
          >
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
