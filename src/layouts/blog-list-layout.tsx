'use client'

import { useState, useMemo } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Post } from 'contentlayer/generated'

import { SinglePost, Pagination } from '@/components'
import type { PaginationProps } from '@/components/pagination'

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
    <div className='sm:space-y-8'>
      <h2 className='font-cardo text-2xl font-semibold sm:text-3xl'>{title}</h2>

      <div>
        {!filteredBlogPosts.length && 'No posts found.'}

        <ul className='flex flex-col gap-4'>
          {displayPosts.map(post => (
            <li key={post.path}>
              <SinglePost post={post} />
            </li>
          ))}
        </ul>

        {pagination && pagination.totalPages > 1 && !searchValue && (
          <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
        )}
      </div>
    </div>
  )
}
