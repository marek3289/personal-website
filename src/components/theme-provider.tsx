'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import site from '@/data/site'

export default function ThemeProvider({ children, ...props }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute='class' defaultTheme={site.theme} enableSystem {...props}>
      {children}
    </NextThemesProvider>
  )
}
