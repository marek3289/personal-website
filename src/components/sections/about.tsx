import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { ExternalLink } from 'lucide-react'

import BlurFade from '@/components/magicui/blur-fade'
import { BLUR_FADE_DELAY } from '@/helpers/constants'
import { Badge } from '@/components/ui/badge'
import data from '@/data/data'
import { socialMenu } from '@/data/nav-links'

export default function About() {
  return (
    <section id='about' className='flex flex-col gap-4'>
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <h2 className='font-medium'>About</h2>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 4}>
        <ReactMarkdown className='leading-7 text-muted-foreground'>{data.summary}</ReactMarkdown>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 5}>
        <ul className='flex items-center gap-4'>
          {socialMenu.map(item => (
            <li key={item.href}>
              <Link href={item.href}>
                <Badge variant='outline' className='flex items-center gap-1 text-sm'>
                  <item.icon className='mr-1 size-4' />
                  {item.username}
                  <span className='text-xs font-normal text-muted-foreground'>{item.label}</span>
                  <ExternalLink className='size-3 text-muted-foreground' />
                </Badge>
              </Link>
            </li>
          ))}
        </ul>
      </BlurFade>
    </section>
  )
}
