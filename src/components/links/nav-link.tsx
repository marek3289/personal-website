'use client'

import { forwardRef, ComponentPropsWithRef, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import UnstyledLink from './unstyled-link'

import { cn } from '@/helpers/cn'

interface NavLinkProps extends ComponentPropsWithRef<'a'> {
  children: ReactNode
  href: string
  className?: string
}

// className='hidden font-medium text-gray-900 dark:text-gray-100 sm:block'
const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(({ children, href, className, ...rest }, ref) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <UnstyledLink
      href={href}
      ref={ref}
      className={cn(
        'font-cardo rounded p-2 text-lg text-gray-500',
        { 'bg-gray-800 text-black dark:text-white': isActive },
        className,
      )}
      {...rest}
    >
      {children}
    </UnstyledLink>
  )
})

NavLink.displayName = 'NavLink'

export default NavLink
