// import { genPageMetadata } from '@/app/seo'
// export const metadata = genPageMetadata({ title: 'Projects' })

// export default async function BlogPage() {
//   // const projects = allCoreContent(sortPosts(allPosts))
//   return <ProjectsLayout />
// }

export default function Projects() {
  return (
    <div className='sm:space-y-8'>
      <h2 className='text-2xl font-semibold sm:text-3xl'>Projects</h2>
      <div>Project list</div>
    </div>
  )
}

{
  /* <div className='-m-4 flex flex-wrap'>
  {projectsData.map(d => (
    <Card key={d.title} title={d.title} description={d.description} imgSrc={d.imgSrc} href={d.href} />
  ))} */
}
