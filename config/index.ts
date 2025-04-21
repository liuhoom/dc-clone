import type { Metadata } from 'next'

export const siteConfig: Metadata = {
  title: '排班系统-SAAS',
  description: '你的专属排班神器',
  keywords: [
    '排班',
    'shift arrangement',
    'work schedule',
    'saas',
    'nextjs',
    'tailwind',
    'shadcn',
    'typescript',
  ] as Array<string>,
  authors: {
    name: 'liuhoom',
    url: 'https://github.com/liuhoom',
  },
} as const

export const links = {
  sourceCode: 'https://github.com/liuhoom/shift-arrangement-saas',
} as const
