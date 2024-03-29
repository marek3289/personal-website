import siteMetadata from '@/data/site-metadata'

// https://github.com/vercel/next.js/tree/canary/examples/blog-starter/src/app
// https://github.com/timlrx/tailwind-nextjs-starter-blog/tree/main/app

export default function Home() {
  return (
    <div className='w-full sm:space-y-8'>
      <h2 className='font-cardo text-2xl font-semibold sm:text-3xl'>{siteMetadata.shortTitle}</h2>

      <div>
        <p>Opis</p>
      </div>
    </div>
  )
}
