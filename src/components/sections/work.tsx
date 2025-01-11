import BlurFade from '@/components/magicui/blur-fade'
import { ResumeCard } from '@/components/resume-card'
import { BLUR_FADE_DELAY } from '@/helpers/constants'
import data from '@/data/data'

export default function Work() {
  const filteredArr = [...data.work].sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime())

  return (
    <section id='work'>
      <div className='flex min-h-0 flex-col gap-4'>
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <h2 className='font-medium'>Work Experience</h2>
        </BlurFade>

        {filteredArr.map((work, id) => (
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
