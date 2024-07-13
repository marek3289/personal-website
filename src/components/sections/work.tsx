import BlurFade from '@/components/magicui/blur-fade'
import BlurFadeText from '@/components/magicui/blur-fade-text'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ResumeCard } from '@/components/resume-card'
import { BLUR_FADE_DELAY } from '@/helpers/constants'
import data from '@/data/data'

export default function Work() {
  return (
    <section id='work'>
      <div className='flex min-h-0 flex-col gap-y-3'>
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <h2 className='text-xl font-bold'>Work Experience</h2>
        </BlurFade>

        {data.work.map((work, id) => (
          <BlurFade key={work.company} delay={BLUR_FADE_DELAY * 6 + id * 0.05}>
            <ResumeCard
              key={work.company}
              logoUrl={work.logoUrl}
              altText={work.company}
              title={work.company}
              subtitle={work.title}
              href={work.href}
              period={`${work.start} - ${work.end ?? 'Present'}`}
              description={work.description}
            />
          </BlurFade>
        ))}
      </div>
    </section>
  )
}
