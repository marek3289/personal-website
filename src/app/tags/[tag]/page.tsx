import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allPosts } from 'contentlayer/generated'

import BlogListLayout from '@/layouts/blog-list-layout'
import tagData from '@/app/tag-data.json'
import site from '@/data/site'

export async function generateMetadata({ params }) {
  const tag = decodeURI(params.tag)

  return {
    title: `Articles Related to #${tag} Tag`,
    description: `Explore a collection of blog articles related to the #${tag} tag. Stay informed and updated with the latest insights and information.`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${site.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  }
}

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)

  return tagKeys.map(tag => ({ tag: encodeURI(tag) }))
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURI(params.tag)

  const filteredPosts = allCoreContent(
    sortPosts(allPosts.filter(post => post.tags && post.tags.map(t => slug(t)).includes(tag))),
  )

  return <BlogListLayout title={tag} posts={filteredPosts} />
}
