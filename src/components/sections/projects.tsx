import BlurFade from '@/components/magicui/blur-fade'
// import { Badge } from '@/components/ui/badge'
import { ProjectCard } from '@/components/project-card'
import { BLUR_FADE_DELAY } from '@/helpers/constants'
import data from '@/data/data'

export default function Skills() {
  return (
    <section id='projects'>
      <div className='w-full space-y-12 py-12'>
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
          <div className='flex flex-col items-center justify-center space-y-4 text-center'>
            <div className='space-y-2'>
              <div className='inline-block rounded-lg bg-foreground px-3 py-1 text-sm text-background'>My Projects</div>
              <h2 className='text-xl font-semibold tracking-tighter sm:text-3xl'>Check out my latest work</h2>
              <p className='text-muted-foreground md:text-lg/relaxed'>
                I&apos;ve worked on a variety of projects, from simple websites to complex web applications. Here are a
                few of my favorites.
              </p>
            </div>
          </div>
        </BlurFade>
        <ul className='mx-auto grid max-w-[800px] grid-cols-1 gap-3 sm:grid-cols-2'>
          {data.projects.map((project, id) => (
            <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
              <li key={project.title}>
                <ProjectCard
                  href={project.href}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                />
              </li>
            </BlurFade>
          ))}
        </ul>
      </div>
    </section>
  )
}
