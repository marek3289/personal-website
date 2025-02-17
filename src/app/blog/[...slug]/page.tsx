import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import { allPosts } from 'contentlayer/generated'
import type { Post } from 'contentlayer/generated'

import siteMetadata from '@/data/site'
import { PostLayout, ComponentLayout } from '@/layouts'
import { components } from '@/components/mdx-components'
import '@/styles/prism.css'
import 'katex/dist/katex.css'

const defaultLayout = 'PostLayout'

const layouts = { PostLayout, ComponentLayout }

export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'))
  const post = allPosts.find(p => p.slug === slug)

  if (!post) {
    return
  }

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
    },
  }
}

export const generateStaticParams = async () => {
  return allPosts.map(p => ({ slug: p.slug.split('/') }))
}

export default async function BlogPost({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'))

  const sortedCoreContents = allCoreContent(sortPosts(allPosts))
  const postIndex = sortedCoreContents.findIndex(p => p.slug === slug)

  if (postIndex === -1) {
    return notFound()
  }

  const post = allPosts.find(p => p.slug === slug) as Post
  const mainContent = coreContent(post)

  const Layout = layouts[post.layout || defaultLayout]

  return (
    <Layout content={mainContent}>
      <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
    </Layout>
  )
}
