import { ReactNode } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Post } from 'contentlayer/generated'

import siteMetadata from '@/data/site-metadata'

interface BlogLayoutProps {
  content: CoreContent<Post>
  children: ReactNode
}

export default function PostLayout({ content, children }: BlogLayoutProps) {
  const { filePath, path, slug, date, title, tags } = content
  const basePath = path.split('/')[0]

  return (
    <article className='sm:space-y-8'>
      <header>
        <div>
          <dl>
            <div>
              <dt className='sr-only'>Published on</dt>
              <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
                <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
              </dd>
            </div>
          </dl>
          <div>
            <h2 className='text-2xl font-semibold sm:text-3xl'>{title}</h2>
          </div>
        </div>
      </header>

      <div className='grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0'>
        <div className='divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0'>
          <div className='prose max-w-none pb-8 pt-10 dark:prose-invert'>{children}</div>
        </div>
      </div>
    </article>
  )
}
