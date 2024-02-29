import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allPosts } from 'contentlayer/generated'

// import { genPageMetadata } from '@/app/seo'
// export const metadata = genPageMetadata({ title: 'Blog' })

const POSTS_PER_PAGE = 5

export default async function BlogPage() {
  const posts = allCoreContent(sortPosts(allPosts))

  const pageNumber = 1
  const initialDisplayPosts = posts.slice(POSTS_PER_PAGE * (pageNumber - 1), POSTS_PER_PAGE * pageNumber)
  const pagination = { currentPage: pageNumber, totalPages: Math.ceil(posts.length / POSTS_PER_PAGE) }

  return <div>blog</div>
  // return (
  //   <ListLayout
  //     posts={posts}
  //     initialDisplayPosts={initialDisplayPosts}
  //     pagination={pagination}
  //     title="All Posts"
  //   />
}
