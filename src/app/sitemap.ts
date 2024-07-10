import { MetadataRoute } from 'next'
import { allPosts } from 'contentlayer/generated'

import tagData from '@/app/tag-data.json'
import site from '@/data/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = site.siteUrl

  const routes = ['', 'blog', 'projects', 'tags'].map(route => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  const blogRoutes = allPosts
    .filter(post => !post.draft)
    .map(post => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))

  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = [...tagKeys].sort((a, b) => tagCounts[b] - tagCounts[a])

  const tagRoutes = sortedTags.map(tag => ({
    url: `${siteUrl}/tags/${tag}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogRoutes, ...tagRoutes]
}
