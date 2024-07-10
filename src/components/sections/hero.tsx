import BlurFade from '@/components/magicui/blur-fade'
import BlurFadeText from '@/components/magicui/blur-fade-text'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import data from '@/data/data'
import { BLUR_FADE_DELAY } from '@/helpers/constants'

export default function Hero() {
  return (
    <section id='hero'>
      <div className='mx-auto w-full max-w-2xl space-y-8'>
        <div className='flex justify-between gap-2'>
          <div className='flex flex-1 flex-col space-y-1.5'>
            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'
              yOffset={8}
              text={`Hi, I'm ${data.name.split(' ')[0]} 👋`}
            />
            <BlurFadeText className='max-w-[600px] md:text-xl' delay={BLUR_FADE_DELAY} text={data.description} />
          </div>

          <BlurFade delay={BLUR_FADE_DELAY}>
            <Avatar className='size-28 border'>
              <AvatarImage alt={`Avatar of ${data.name}`} src={data.avatarUrl} />
              <AvatarFallback>{data.initials}</AvatarFallback>
            </Avatar>
          </BlurFade>
        </div>
      </div>
    </section>
  )
}
