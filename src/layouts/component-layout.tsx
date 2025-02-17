import { ReactNode } from 'react'
import Link from 'next/link'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Post } from 'contentlayer/generated'
import { ArrowLeftIcon } from '@radix-ui/react-icons'

import ExternalLinkBadge from '@/components/external-link-badge'
import { Icons } from '@/components/icons'
import siteMetadata from '@/data/site'
import routes from '@/data/routes'

interface ComponentLayoutProps {
  content: CoreContent<Post>
  children: ReactNode
}

export default function ComponentLayout({ content, children }: ComponentLayoutProps) {
  const { title, summary, date, source } = content

  return (
    <article>
      <header className='sm:space-y-8'>
        <Link href={routes.home} className='flex items-center gap-2 text-sm font-medium text-muted-foreground'>
          <ArrowLeftIcon className='h-4 w-4' />
          Get back to home
        </Link>

        <div className='flex flex-col gap-4'>
          <div>
            <time className='text-sm font-medium text-muted-foreground' dateTime={date}>
              {formatDate(date, siteMetadata.locale)}
            </time>
            <h2 className='font-cardo text-2xl font-semibold sm:text-3xl'>{title}</h2>
          </div>

          <p className='text-foreground-muted'>{summary}</p>

          <ExternalLinkBadge
            icon={Icons.github}
            label='View on Github'
            source='Github'
            href={source ?? '/'}
          />
        </div>
      </header>

      <div className='prose flex max-w-none flex-col gap-4 py-4 dark:prose-invert'>{children}</div>
    </article>
  )
}

{
  /* <div className='space-y-1 pb-10 text-center dark:border-gray-700'>
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
        </div> */
}
{
  /* {siteMetadata.comments && (
          <div className='pb-6 pt-6 text-center text-gray-700 dark:text-gray-300' id='comment'>
            <Comments slug={slug} />
          </div>
        )} */
}
{
  /* <footer>
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
        </footer> */
}
