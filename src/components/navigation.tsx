'use client'

import Link from 'next/link'

import { MobileMenu, ThemeSwitch } from '@/components'
import siteMetadata from '@/data/site-metadata'
import navLinks from '@/data/nav-links'
// import Logo from '@/data/logo.svg'
import MobileNav from './mobile-menu'
// import SearchButton from './SearchButton'

export default function Navigation() {
  return (
    <header className='flex w-full justify-between sm:w-auto sm:flex-col sm:justify-start sm:space-y-8'>
      <div>
        <Link href='/' aria-label={siteMetadata.headerTitle}>
          <h1 className='text-3xl font-semibold'>{siteMetadata.headerTitle}</h1>
        </Link>
      </div>

      <div className='flex items-center sm:flex-col sm:items-start'>
        <ul className='flex flex-col leading-5'>
          {navLinks
            .filter(link => link.href !== '/')
            .map(link => (
              <li key={link.title}>
                <Link href={link.href} className='hidden font-medium text-gray-900 dark:text-gray-100 sm:block'>
                  {link.title}
                </Link>
              </li>
            ))}
        </ul>

        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}
