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
      <h2 className='text-2xl font-semibold sm:text-3xl'>{title}</h2>
      {/* <div className='relative max-w-lg'>
            <label>
              <span className='sr-only'>Search articles</span>
              <input
                aria-label='Search articles'
                type='text'
                onChange={e => setSearchValue(e.target.value)}
                placeholder='Search articles'
                className='block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100'
              />
            </label>
            <svg
              className='absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </div> */}

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
