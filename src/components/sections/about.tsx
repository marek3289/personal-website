import ReactMarkdown from 'react-markdown'

import ExternalLinkBadge from '@/components/external-link-badge'
import BlurFade from '@/components/magicui/blur-fade'
import { BLUR_FADE_DELAY } from '@/helpers/constants'
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
        <ul className='flex flex-wrap items-center gap-2'>
          {socialMenu.map(item => (
            <li key={item.href}>
              <ExternalLinkBadge icon={item.icon} label={item.username} href={item.href} source={item.label} />
            </li>
          ))}
        </ul>
      </BlurFade>
    </section>
  )
}
