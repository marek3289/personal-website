'use client'

import { useState, useMemo } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Post } from 'contentlayer/generated'

import BlurFade from '@/components/magicui/blur-fade'
import { SinglePost, Pagination } from '@/components'
import type { PaginationProps } from '@/components/pagination'
import { BLUR_FADE_DELAY } from '@/helpers/constants'

export interface BlogListLayoutProps {
  title: string
  posts: CoreContent<Post>[]
  initialDisplayPosts?: CoreContent<Post>[]
  pagination?: PaginationProps
}

export default function BlogListLayout({ posts, title, initialDisplayPosts, pagination }: BlogListLayoutProps) {
  const [searchValue, setSearchValue] = useState('')

  const filteredBlogPosts = useMemo(
    () =>
      posts.filter(post => {
        const searchContent = post.title + post.summary + post.tags?.join(' ')
        return searchContent.toLowerCase().includes(searchValue.toLowerCase())
      }),
    [posts, searchValue],
  )

  const displayPosts = useMemo(
    () =>
      initialDisplayPosts && initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts,
    [initialDisplayPosts, filteredBlogPosts, searchValue],
  )

  return (
    <section className='sm:space-y-8'>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className='mb-8 text-2xl font-medium tracking-tighter'>{title}</h1>
      </BlurFade>

      <div>
        {!filteredBlogPosts.length && 'blog is empty.'}

        <ul className='flex flex-col gap-4'>
          {displayPosts.map((post, idx) => (
            <li key={post.path}>
              <SinglePost post={post} delay={BLUR_FADE_DELAY * 2 + idx * 0.05} />
            </li>
          ))}
        </ul>

        {pagination && pagination.totalPages > 1 && !searchValue && (
          <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
        )}
      </div>
    </section>
  )
}
