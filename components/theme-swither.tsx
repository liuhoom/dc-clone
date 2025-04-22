'use client'

import * as React from 'react'
import { Moon, MoonIcon, Sun, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#09090b',
}

export function ModeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme()

  const setMetaColor = React.useCallback((color: string) => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', color)
  }, [])

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    setMetaColor(
      resolvedTheme === 'dark'
        ? META_THEME_COLORS.light
        : META_THEME_COLORS.dark
    )
  }, [resolvedTheme, setTheme, setMetaColor])

  return (
    <Button
      // asChild
      variant='outline'
      className='group/toggle h-11 w-11 px-0 rounded-full'
      onClick={toggleTheme}
    >
      <SunIcon className='!h-5 !w-5 hidden [html.dark_&]:block' />
      <MoonIcon className='!h-5 !w-5 hidden [html.light_&]:block' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
