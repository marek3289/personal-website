import BlurFade from '@/components/magicui/blur-fade'
import { Badge } from '@/components/ui/badge'
import { BLUR_FADE_DELAY } from '@/helpers/constants'
import data from '@/data/data'

export default function Skills() {
  return (
    <section id='skills'>
      <div className='flex min-h-0 flex-col gap-4'>
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <h2 className='font-medium'>Skills</h2>
        </BlurFade>
        <div className='flex flex-wrap gap-1'>
          {data.skills.map((skill, id) => (
            <BlurFade key={skill} delay={BLUR_FADE_DELAY * 8 + id * 0.05}>
              <Badge key={skill}>{skill}</Badge>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}
