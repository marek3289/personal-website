import { CodeIcon, HomeIcon, NotebookIcon, HashIcon } from 'lucide-react'

import { Icons } from '@/components/icons'
import site from './site'
import routes from './routes'

export const navMenu = [
  { href: routes.home, icon: HomeIcon, label: 'Home' },
  { href: routes.blog, icon: NotebookIcon, label: 'Blog' },
  { href: routes.projects, icon: CodeIcon, label: 'Projects' },
  { href: routes.tags, icon: HashIcon, label: 'Tags' },
]

export const socialMenu = [
  { href: site.contact.linkedin, icon: Icons.linkedin, label: 'Linkedin', username: 'Marek Mazur' },
  { href: site.contact.github, icon: Icons.github, label: 'Github', username: '@marek3289' },
  { href: site.contact.twitter, icon: Icons.twitter, label: 'X', username: '@marko3289' },
]
