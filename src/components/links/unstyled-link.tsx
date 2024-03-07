import { forwardRef } from 'react'
import Link, { LinkProps } from 'next/link'

import { cn } from '@/helpers/cn'

export type UnstyledLinkProps = {
  children: React.ReactNode
  href: string
  openNewTab?: boolean
  className?: string
  nextLinkProps?: Omit<LinkProps, 'href'>
} & React.ComponentPropsWithRef<'a'>

const UnstyledLink = forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  ({ children, href, openNewTab, className, nextLinkProps, ...rest }, ref) => {
    const isNewTab = openNewTab !== undefined ? openNewTab : href && !href.startsWith('/') && !href.startsWith('#')

    if (!isNewTab) {
      return (
        <Link href={href} ref={ref} className={className} {...rest} {...nextLinkProps}>
          {children}
        </Link>
      )
    }

    return (
      <a
        ref={ref}
        target='_blank'
        rel='noopener noreferrer'
        href={href}
        {...rest}
        className={cn('cursor-newtab', className)}
      >
        {children}
      </a>
    )
  },
)

UnstyledLink.displayName = 'UnstyledLink'

export default UnstyledLink
