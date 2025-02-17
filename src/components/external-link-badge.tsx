import type { ElementType } from 'react'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

import { Badge } from '@/components/ui/badge'

interface IExternalLinkBadgeProps {
  icon: ElementType
  label: string
  href: string
  source: string
}

export default function ExternalLinkBadge({ icon: Icon, label, href, source }: IExternalLinkBadgeProps) {
  return (
    <Link href={href} className='no-underline'>
      <Badge variant='outline' className='flex w-max items-center gap-1 text-sm'>
        <Icon className='mr-1 size-4' />
        {label}
        <span className='text-xs font-normal text-muted-foreground'>{source}</span>
        <ExternalLink className='size-3 text-muted-foreground' />
      </Badge>
    </Link>
  )
}
