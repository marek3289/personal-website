import ReactMarkdown from 'react-markdown'

import BlurFade from '@/components/magicui/blur-fade'
import data from '@/data/data'
import { BLUR_FADE_DELAY } from '@/helpers/constants'

export default function About() {
  return (
    <section id='about'>
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <h2 className='text-xl font-bold'>About</h2>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 4}>
        <ReactMarkdown>{data.summary}</ReactMarkdown>
      </BlurFade>
    </section>
  )
}
