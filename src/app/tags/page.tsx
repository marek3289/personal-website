import { useMemo } from 'react'
import Link from 'next/link'
import { slug } from 'github-slugger'

import BlurFade from '@/components/magicui/blur-fade'
import tagData from '@/app/tag-data.json'
import { BLUR_FADE_DELAY } from '@/helpers/constants'

export async function generateMetadata() {
  return {
    title: 'Discover My Blog Topics',
    description:
      'Explore the different things I love to write about. From personal experiences to insightful articles, dive into my world of blogging.',
  }
}

export default async function TagsPage() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = useMemo(() => [...tagKeys].sort((a, b) => tagCounts[b] - tagCounts[a]), [tagCounts, tagKeys])

  return (
    <section className='sm:space-y-8'>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className='mb-8 text-2xl font-medium tracking-tighter'>tags</h1>
      </BlurFade>

      <ul>
        {tagKeys.length === 0 && 'No tags found.'}
        {sortedTags.map((tag, idx) => {
          return (
            <li key={tag}>
              <BlurFade delay={BLUR_FADE_DELAY + idx * 0.05}>
                <Link href={`/tags/${slug(tag)}`} className='tag' aria-label={`View posts tagged ${tag}`}>
                  {tag.split(' ').join('-')} {` (${tagCounts[tag]})`}
                </Link>
              </BlurFade>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
