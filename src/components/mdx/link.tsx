import type { AnchorHTMLAttributes } from 'react'
import type { LinkProps } from 'next/link'
import Link from 'next/link'

const CustomLink = ({ href, children, ...rest }: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    )
  }

  if (isAnchorLink) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <a target='_blank' rel='noopener noreferrer' href={href} {...rest}>
      {children}
    </a>
  )
}

export default CustomLink
