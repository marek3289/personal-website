import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allPosts } from 'contentlayer/generated'

import { BlogListLayout } from '@/layouts'

// import { genPageMetadata } from '@/app/seo'
// export const metadata = genPageMetadata({ title: 'Blog' })

const POSTS_PER_PAGE = 2

export default async function Blog() {
  const posts = allCoreContent(sortPosts(allPosts))

  const pageNumber = 1
  const initialDisplayPosts = posts.slice(POSTS_PER_PAGE * (pageNumber - 1), POSTS_PER_PAGE * pageNumber)
  const pagination = { currentPage: pageNumber, totalPages: Math.ceil(posts.length / POSTS_PER_PAGE) }

  return (
    <BlogListLayout title='All Posts' posts={posts} initialDisplayPosts={initialDisplayPosts} pagination={pagination} />
  )
}
