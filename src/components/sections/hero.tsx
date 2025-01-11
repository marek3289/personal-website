import BlurFade from '@/components/magicui/blur-fade'
import BlurFadeText from '@/components/magicui/blur-fade-text'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components//ui/badge'

import { BLUR_FADE_DELAY } from '@/helpers/constants'
import data from '@/data/data'

export default function Hero() {
  return (
    <section id='hero'>
      <div className='flex items-center gap-4'>
        <BlurFade delay={BLUR_FADE_DELAY}>
          <Avatar className='size-24 border'>
            <AvatarImage alt={`Avatar of ${data.name}`} src={data.avatarUrl} />
            <AvatarFallback>{data.initials}</AvatarFallback>
          </Avatar>
        </BlurFade>

        <div className='space-y-1'>
          <BlurFadeText
            delay={BLUR_FADE_DELAY}
            className='text-2xl font-semibold tracking-tighter'
            yOffset={8}
            text={data.name}
          />
          <BlurFadeText className='text-sm text-muted-foreground' delay={BLUR_FADE_DELAY} text={data.description} />
          <BlurFade className='text-sm text-muted-foreground' delay={BLUR_FADE_DELAY}>
            <Badge variant='success' className='rounded-xl'>
              <div className='mr-1 h-2 w-2 rounded-full bg-green-500' />
              <span>Available for work</span>
            </Badge>
          </BlurFade>
        </div>
      </div>
    </section>
  )
}
