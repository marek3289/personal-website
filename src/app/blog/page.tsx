import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allPosts } from 'contentlayer/generated'

import { BlogListLayout } from '@/layouts'
import { POSTS_PER_PAGE } from '@/helpers/constants'

export async function generateMetadata() {
  return {
    title: 'Blog',
    description: `Dive into my latest thoughts, stories, and insights. From tech experiments to creative endeavors, explore what I'm passionate about and join the conversation.`,
  }
}

export default async function Blog() {
  const posts = allCoreContent(sortPosts(allPosts))

  const pageNumber = 1
  const initialDisplayPosts = posts.slice(POSTS_PER_PAGE * (pageNumber - 1), POSTS_PER_PAGE * pageNumber)
  const pagination = { currentPage: pageNumber, totalPages: Math.ceil(posts.length / POSTS_PER_PAGE) }

  return <BlogListLayout title='blog' posts={posts} initialDisplayPosts={initialDisplayPosts} pagination={pagination} />
}
