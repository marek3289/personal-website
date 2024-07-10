import Link from 'next/link'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Post } from 'contentlayer/generated'

import BlurFade from '@/components/magicui/blur-fade'

interface SinglePostProps {
  post: CoreContent<Post>
  delay?: number
}

export default function SinglePost({ post, delay = 0 }: SinglePostProps) {
  const { title, date, path, summary } = post

  return (
    <BlurFade delay={delay}>
      <article>
        <Link href={`/blog/${path}`} className='mb-4 flex flex-col space-y-2'>
          <h3 className='tracking-tight'>{title}</h3>
          <p className='text-muted-foreground prose max-w-none text-sm'>{summary}</p>
          <time className='text-muted-foreground text-xs'>
            {new Date(date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
        </Link>
      </article>
    </BlurFade>
  )
}
