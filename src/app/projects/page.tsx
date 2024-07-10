import BlurFade from '@/components/magicui/blur-fade'
import { BLUR_FADE_DELAY } from '@/helpers/constants'

export async function generateMetadata() {
  return {
    title: 'My Projects',
    description:
      'Take a look at my projects and explore the different things I’m passionate about. From tech experiments to creative endeavors, discover what I’ve been working on.',
  }
}

export default function Projects() {
  return (
    <section className='sm:space-y-8'>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className='mb-8 text-2xl font-medium tracking-tighter'>projects</h1>
      </BlurFade>
    </section>
  )
}
