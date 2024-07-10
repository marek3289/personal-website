import Link from 'next/link'

import { ThemeSwitch } from '@/components'
import { Dock, DockIcon } from '@/components/magicui/dock'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/helpers/cn'
import { navMenu, socialMenu } from '@/data/nav-links'

export default function Navbar() {
  return (
    <div className='pointer-events-none fixed inset-x-0 bottom-8 z-30 mx-auto mb-4 flex h-full max-h-14 origin-bottom'>
      <div className='bg-background dark:bg-background fixed inset-x-0 bottom-0 h-16 w-full to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)]'></div>
      <Dock className='bg-background pointer-events-auto relative z-50 mx-auto flex h-full min-h-full transform-gpu items-center px-1 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] '>
        {navMenu.map(item => (
          <DockIcon key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={item.href} className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'size-12')}>
                  <item.icon className='size-4' />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}

        <Separator orientation='vertical' className='h-full' />

        {socialMenu.map(item => (
          <DockIcon key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={item.href} className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'size-12')}>
                  <item.icon className='size-4' />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}

        <Separator orientation='vertical' className='h-full py-2' />

        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <ThemeSwitch />
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle theme</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      </Dock>
    </div>
  )
}
