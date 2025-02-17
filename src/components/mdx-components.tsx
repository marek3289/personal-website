import type { MDXComponents } from 'mdx/types'
// import TOCInline from 'pliny/ui/TOCInline'
// import Pre from 'pliny/ui/Pre'
// import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'

import ExternalLinkBadge from '@/components/external-link-badge'
import AvailabilityPicker from '@/posts/availability-picker'
// import { Image, Link } from './mdx'

export const components: MDXComponents = {
  ExternalLinkBadge,
  // Image,
  // a: Link,
  // TOCInline,
  // pre: Pre,
  // BlogNewsletterForm,

  // Post components
  AvailabilityPicker,
}
