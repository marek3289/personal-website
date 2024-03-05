import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'

import { Image, Link } from './mdx'

export const components: MDXComponents = {
  Image,
  a: Link,
  TOCInline,
  pre: Pre,
  BlogNewsletterForm,
}
