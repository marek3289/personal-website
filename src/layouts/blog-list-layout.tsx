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
    <>
      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        <div className='space-y-2 pb-8 pt-6 md:space-y-5'>
          <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
            {title}
          </h1>
          <div className='relative max-w-lg'>
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
          </div>
        </div>

        <div className='pt-4'>
          {!filteredBlogPosts.length && 'No posts found.'}

          <ul>
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
    </>
  )
}
