import BlurFade from '@/components/magicui/blur-fade'
import { ProjectCard } from '@/components/project-card'
import { BLUR_FADE_DELAY } from '@/helpers/constants'
import data from '@/data/data'

export async function generateMetadata() {
  return {
    title: 'My Projects',
    description: `Take a look at my projects and explore the different things I'm passionate about. From tech experiments to creative endeavors, discover what I've been working on.`,
  }
}

export default function Projects() {
  return (
    <section className='sm:space-y-8'>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className='mb-8 text-2xl font-medium tracking-tighter'>projects</h1>
      </BlurFade>

      <ul>
        {data.projects.map((project, idx) => {
          return (
            <li key={project.title}>
              <BlurFade delay={BLUR_FADE_DELAY + idx * 0.05}>
                <ProjectCard
                  href={project.href}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                  secondary
                />
              </BlurFade>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
