import { ReactNode } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import Bleed from 'pliny/ui/Bleed'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Post } from 'contentlayer/generated'

import { Image } from '@/components/mdx'
import siteMetadata from '@/data/site'

interface BlogLayoutProps {
  content: CoreContent<Post>
  children: ReactNode
}

export default function PostBanner({ content, children }: BlogLayoutProps) {
  const { filePath, path, slug, date, title, tags, images } = content
  const basePath = path.split('/')[0]
  const displayImage = images && images.length > 0 ? images[0] : 'https://picsum.photos/seed/picsum/800/400'

  return (
    // <article className='sm:space-y-8'>
    //   <header>
    //     <div>
    //       <dl>
    //         <dt className='sr-only'>Published on</dt>
    //         <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
    //           <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
    //         </dd>
    //       </dl>
    //       <div>
    //         <h2 className='font-cardo text-2xl font-semibold sm:text-3xl'>{title}</h2>
    //       </div>
    //     </div>
    //   </header>

    //   <div className='grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0'>
    //     <div className='divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0'>
    //       <div className='prose max-w-none pb-8 pt-10 dark:prose-invert'>{children}</div>
    //     </div>
    //   </div>
    // </article>
    <article className='sm:space-y-8'>
      <div>
        <div className='space-y-1 pb-10 text-center dark:border-gray-700'>
          <div className='w-full'>
            <Bleed>
              <div className='relative aspect-[2/1] w-full'>
                <Image src={displayImage} alt={title} fill className='object-cover' />
              </div>
            </Bleed>
          </div>
          <div className='relative pt-10'>
            <h2 className='font-cardo text-2xl font-semibold sm:text-3xl'>{title}</h2>
          </div>
        </div>

        <div className='prose max-w-none py-4 dark:prose-invert'>{children}</div>

        {/* {siteMetadata.comments && (
          <div className='pb-6 pt-6 text-center text-gray-700 dark:text-gray-300' id='comment'>
            <Comments slug={slug} />
          </div>
        )} */}
        {/* <footer>
          <div className='flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base'>
            {prev && prev.path && (
              <div className='pt-4 xl:pt-8'>
                <Link
                  href={`/${prev.path}`}
                  className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                  aria-label={`Previous post: ${prev.title}`}
                >
                  &larr; {prev.title}
                </Link>
              </div>
            )}
            {next && next.path && (
              <div className='pt-4 xl:pt-8'>
                <Link
                  href={`/${next.path}`}
                  className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                  aria-label={`Next post: ${next.title}`}
                >
                  {next.title} &rarr;
                </Link>
              </div>
            )}
          </div>
        </footer> */}
      </div>
    </article>
  )
}

// import { ReactNode } from 'react'
// import Image from '@/components/Image'
// import Bleed from 'pliny/ui/Bleed'
// import { CoreContent } from 'pliny/utils/contentlayer'
// import type { Blog } from 'contentlayer/generated'
// import Comments from '@/components/Comments'
// import Link from '@/components/Link'
// import PageTitle from '@/components/PageTitle'
// import SectionContainer from '@/components/SectionContainer'
// import siteMetadata from '@/data/siteMetadata'
// import ScrollTopAndComment from '@/components/ScrollTopAndComment'

// interface LayoutProps {
//   content: CoreContent<Blog>
//   children: ReactNode
//   next?: { path: string; title: string }
//   prev?: { path: string; title: string }
// }

// export default function PostMinimal({ content, next, prev, children }: LayoutProps) {
