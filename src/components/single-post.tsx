import Link from 'next/link'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Post } from 'contentlayer/generated'

import BlurFade from '@/components/magicui/blur-fade'
import { Badge } from '@/components/ui/badge'
import routes from '@/data/routes'

interface SinglePostProps {
  post: CoreContent<Post>
  delay?: number
}

export default function SinglePost({ post, delay = 0 }: SinglePostProps) {
  const { title, date, path, summary, layout } = post

  return (
    <BlurFade delay={delay}>
      <article>
        <Link href={`${routes.blog}/${path}`} className='mb-4 flex flex-col space-y-2'>
          <div className='flex items-center gap-2'>
            <h3 className='tracking-tight'>{title}</h3>
            {layout === 'ComponentLayout' && <Badge variant='secondary'>Component</Badge>}
          </div>

          <p className='prose max-w-none text-sm text-muted-foreground'>{summary}</p>
          <time className='text-xs text-muted-foreground'>
            {new Date(date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
        </Link>
      </article>
    </BlurFade>
  )
}
