import Link from 'next/link'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Post } from 'contentlayer/generated'

interface SinglePostProps {
  post: CoreContent<Post>
}

export default function SinglePost({ post }: SinglePostProps) {
  const { title, date, path, summary } = post

  return (
    <article>
      <Link href={`/blog/${path}`} className='text-gray-900 dark:text-gray-100'>
        <h3>{title}</h3>
        <time className='text-gray-500'>
          {new Date(date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
        </time>
        <p className='prose max-w-none text-gray-500 dark:text-gray-400'>{summary}</p>
      </Link>
    </article>
  )
}
