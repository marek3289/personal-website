import type { Metadata } from 'next'
import { Habibi, Lancelot, Lato } from 'next/font/google'

import { Navigation, Footer } from '@/components'
import siteMetadata from '@/data/site-metadata'
import { ThemeProviders } from './theme-providers'
import '@/styles/tailwind.css'

const habibi = Habibi({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-habibi',
  weight: '400',
})

const lato = Lato({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-lato',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
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
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={siteMetadata.language}
      className={`${lato.variable} ${habibi.variable} scroll-smooth`}
      suppressHydrationWarning
    >
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

      <body className='bg-white text-black antialiased dark:bg-[#171717] dark:text-white'>
        {/* <ThemeProviders>
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />

              <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
                <Header />
                <main className="mb-auto">{children}</main>
              </SearchProvider>
              <Footer />
            */}

        <ThemeProviders>
          <section className='flex min-h-screen flex-col font-sans'>
            <div className='mx-auto flex h-full w-full max-w-3xl flex-1 flex-col gap-x-24 gap-y-8 px-16 pt-16 sm:flex-row sm:px-6 xl:px-0'>
              <Navigation />
              <main className='w-full'>{children}</main>
            </div>
            <div className='mt-auto'>
              <Footer />
            </div>
          </section>
        </ThemeProviders>
      </body>
    </html>
  )
}
