import { useMemo } from 'react'
import Link from 'next/link'
import { slug } from 'github-slugger'

import tagData from '@/app/tag-data.json'

// export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

// @TODO: Add primary color
export default async function TagsPage() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = useMemo(() => [...tagKeys].sort((a, b) => tagCounts[b] - tagCounts[a]), [tagCounts, tagKeys])

  return (
    <div className='sm:space-y-8'>
      <h2 className='text-2xl font-semibold sm:text-3xl'>Tags</h2>

      <ul>
        {tagKeys.length === 0 && 'No tags found.'}
        {sortedTags.map(tag => {
          return (
            <li key={tag}>
              <Link href={`/tags/${slug(tag)}`} className='tag'>
                {tag.split(' ').join('-')}
              </Link>

              <Link
                href={`/tags/${slug(tag)}`}
                className='-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300'
                aria-label={`View posts tagged ${tag}`}
              >
                {` (${tagCounts[tag]})`}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
