'use client'

import { type MouseEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRightIcon } from 'lucide-react'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/helpers/cn'

interface ResumeCardProps {
  logoUrl: string
  altText: string
  title: string
  subtitle?: string
  href?: string
  period: string
  description?: string
}

export const ResumeCard = ({ logoUrl, altText, title, subtitle, period, description }: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (description) {
      e.preventDefault()
      setIsExpanded(!isExpanded)
    }
  }

  console.log('logoUrl', logoUrl)

  return (
    <button className='block w-full cursor-pointer' onClick={handleClick}>
      <Card className='flex items-center'>
        <div className='flex-none'>
          <Avatar className='bg-muted-background m-auto size-12 border dark:bg-foreground'>
            <AvatarImage src={logoUrl} alt={altText} className='object-contain' />
            <AvatarFallback>{altText[0]}</AvatarFallback>
          </Avatar>
        </div>

        <div className='group ml-4 flex-grow flex-col items-center'>
          <CardHeader>
            <div className='flex items-center justify-between gap-x-2 text-base'>
              <h3 className='inline-flex items-center justify-center text-xs font-semibold leading-none sm:text-sm'>
                {title}
                <ChevronRightIcon
                  className={cn(
                    'size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100',
                    isExpanded ? 'rotate-90' : 'rotate-0',
                  )}
                />
              </h3>

              <div className='text-right text-xs tabular-nums text-muted-foreground sm:text-sm'>{period}</div>
            </div>

            {subtitle && <p className='self-start font-sans text-xs'>{subtitle}</p>}
          </CardHeader>

          {description && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isExpanded ? 1 : 0,

                height: isExpanded ? 'auto' : 0,
              }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className='mt-2 text-xs sm:text-sm'
            >
              {description}
            </motion.div>
          )}
        </div>
      </Card>
    </button>
  )
}
