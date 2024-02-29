import Link from 'next/link'

import { ThemeSwitch } from '@/components'
import siteMetadata from '@/data/site-metadata'
import navLinks from '@/data/nav-links'
// import Logo from '@/data/logo.svg'
// import MobileNav from './MobileNav'
// import SearchButton from './SearchButton'

const Header = () => {
  return (
    <header className='flex items-center justify-between py-10'>
      <div>
        <Link href='/' aria-label={siteMetadata.headerTitle}>
          <div className='flex items-center justify-between'>
            <div className='hidden h-6 text-2xl font-semibold sm:block'>{siteMetadata.headerTitle}</div>
          </div>
        </Link>
      </div>

      <div className='flex items-center space-x-4 leading-5 sm:space-x-6'>
        {navLinks
          .filter(link => link.href !== '/')
          .map(link => (
            <Link
              key={link.title}
              href={link.href}
              className='hidden font-medium text-gray-900 sm:block dark:text-gray-100'
            >
              {link.title}
            </Link>
          ))}

        {/* <SearchButton /> */}
        <ThemeSwitch />
        {/* <MobileNav /> */}
      </div>
    </header>
  )
}

export default Header
