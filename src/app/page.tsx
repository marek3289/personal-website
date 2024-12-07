import { Hero, About, Work, Skills, Projects, Contact } from '@/components/sections'

export default function Home() {
  return (
    <main className='flex min-h-[100dvh] flex-col space-y-10'>
      <Hero />
      <About />
      <Work />
      <Skills />
      <Projects />
      <Contact />
    </main>
  )
}
