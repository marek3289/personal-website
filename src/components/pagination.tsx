'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import BlurFade from '@/components/magicui/blur-fade'
import { BLUR_FADE_DELAY, POSTS_PER_PAGE } from '@/helpers/constants'

export interface PaginationProps {
  totalPages: number
  currentPage: number
}

export default function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <BlurFade delay={BLUR_FADE_DELAY * 2 + POSTS_PER_PAGE * 0.05}>
      <div className='space-y-2 pb-8 pt-6 md:space-y-5'>
        <nav className='flex justify-between'>
          {!prevPage && (
            <button className='cursor-auto disabled:opacity-50' disabled={!prevPage}>
              Previous
            </button>
          )}
          {prevPage && (
            <Link href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`} rel='prev'>
              Previous
            </Link>
          )}
          <span>
            {currentPage} of {totalPages}
          </span>
          {!nextPage && (
            <button className='cursor-auto disabled:opacity-50' disabled={!nextPage}>
              Next
            </button>
          )}
          {nextPage && (
            <Link href={`/${basePath}/page/${currentPage + 1}`} rel='next'>
              Next
            </Link>
          )}
        </nav>
      </div>
    </BlurFade>
  )
}
