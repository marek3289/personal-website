import Link from 'next/link'

import BlurFade from '@/components/magicui/blur-fade'
import { BLUR_FADE_DELAY } from '@/helpers/constants'

export default function Contact() {
  return (
    <section id='contact'>
      <div className='grid w-full items-center justify-center gap-4 px-4 py-12 text-center md:px-6'>
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
          <div className='space-y-3'>
            <div className='inline-block rounded-lg bg-foreground px-3 py-1 text-sm text-background'>Contact</div>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>Get in Touch</h2>
            <p className='mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
              Want to chat? Just shoot me a message on my email address{' '}
              <a href='mailto:marek2494@o2.pl' className='text-blue-500 hover:underline'>
                marek2494@o2.pl{' '}
              </a>
              and I'll respond whenever I can. I will ignore all soliciting.
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}
