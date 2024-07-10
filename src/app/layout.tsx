import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

import { Providers, Navbar } from '@/components'
import { cn } from '@/helpers/cn'
import site from '@/data/site'
import './globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: site.title,
    template: `%s | ${site.shortTitle}`,
  },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: './',
    siteName: site.title,
    // images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${site.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: site.title,
    card: 'summary_large_image',
    // images: [siteMetadata.socialBanner],
  },
  verification: {
    google: '',
    yandex: '',
  },
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html suppressHydrationWarning lang={site.language} className='scroll-smooth'>
      <head>
        <link rel='apple-touch-icon' sizes='180x180' href='/static/favicon/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/static/favicon/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/static/favicon/favicon-16x16.png' />
        <link rel='manifest' href='/static/favicon/site.webmanifest' />
        <link rel='mask-icon' href='/static/favicon/safari-pinned-tab.svg' color='#383838' />
        <meta name='msapplication-TileColor' content='#000000' />
        <meta name='theme-color' content='#000000' />
        <link rel='alternate' type='application/rss+xml' href='/feed.xml' />
      </head>

      <body
        className={cn(
          'mx-auto min-h-screen max-w-2xl border-border bg-background px-6 py-12 font-sans text-foreground antialiased sm:py-24',
          fontSans.variable,
        )}
      >
        <Providers>
          {children}
          <Navbar />
        </Providers>
      </body>
    </html>
  )
}
