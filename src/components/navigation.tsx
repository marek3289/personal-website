'use client'

import Link from 'next/link'
import { MobileMenu, NavLink, ThemeSwitch } from '@/components'
import siteMetadata from '@/data/site-metadata'
import navLinks from '@/data/nav-links'
// import Logo from '@/data/logo.svg'

// import MobileMenu from './mobile-menu'
// import NavLink from '@/components'
// import SearchButton from './SearchButton'

export default function Navigation() {
  return (
    <nav className='flex w-full justify-between sm:w-auto sm:flex-col sm:justify-start sm:space-y-8'>
      <div>
        <Link href='/' aria-label={siteMetadata.headerTitle}>
          <h1 className='font-cardo px-2 text-3xl font-semibold'>M</h1>
        </Link>
      </div>

      <div className='flex items-center sm:flex-col'>
        <ul className='flex flex-col gap-4'>
          {navLinks
            // .filter(link => link.href !== '/')
            .map(link => (
              <li key={link.title}>
                <NavLink href={link.href}>{link.title}</NavLink>
              </li>
            ))}
        </ul>

        <div className='mr-10 mt-4'>
          <ThemeSwitch />
        </div>
        <MobileMenu />
      </div>
    </nav>
  )
}
