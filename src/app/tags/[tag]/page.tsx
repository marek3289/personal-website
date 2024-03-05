// import { Metadata } from 'next'
import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allPosts } from 'contentlayer/generated'

import BlogListLayout from '@/layouts/blog-list-layout'
// import { genPageMetadata } from 'app/seo'

import tagData from '@/app/tag-data.json'
import siteMetadata from '@/data/site-metadata'

// export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
//   const tag = decodeURI(params.tag)
//   return genPageMetadata({
//     title: tag,
//     description: `${siteMetadata.title} ${tag} tagged content`,
//     alternates: {
//       canonical: './',
//       types: {
//         'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
//       },
//     },
//   })
// }

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)

  return tagKeys.map(tag => ({ tag: encodeURI(tag) }))
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURI(params.tag)

  // Capitalize first letter and convert space to dash
  const title = `Tag: ${tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)}`

  const filteredPosts = allCoreContent(
    sortPosts(allPosts.filter(post => post.tags && post.tags.map(t => slug(t)).includes(tag))),
  )

  return <BlogListLayout posts={filteredPosts} title={title} />
}
