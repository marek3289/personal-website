import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allPosts } from 'contentlayer/generated'

import { BlogListLayout } from '@/layouts'

const POSTS_PER_PAGE = 2

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

  return paths
}

export default async function BlogPage({ params }: { params: { page: string } }) {
  const posts = allCoreContent(sortPosts(allPosts))

  const pageNumber = parseInt(params.page as string)
  const initialDisplayPosts = posts.slice(POSTS_PER_PAGE * (pageNumber - 1), POSTS_PER_PAGE * pageNumber)
  const pagination = { currentPage: pageNumber, totalPages: Math.ceil(posts.length / POSTS_PER_PAGE) }

  return (
    <BlogListLayout title='All Posts' posts={posts} initialDisplayPosts={initialDisplayPosts} pagination={pagination} />
  )
}
