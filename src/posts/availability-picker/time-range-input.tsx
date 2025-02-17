'use client'

import * as React from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/helpers/cn'
import type { TimeRange } from './types'

interface TimeRangeInputProps extends Omit<React.ComponentProps<'input'>, 'value' | 'onChange'> {
  value: TimeRange
  onChange: (value: TimeRange) => void
}

export default function TimeRangeInput({ value, onChange, disabled = false, ...props }: TimeRangeInputProps) {
  return (
    <div className='flex flex-1 items-center gap-2'>
      <div className='grid flex-1 grid-cols-2 gap-2'>
        <div className='flex flex-col gap-1.5'>
          <Input
            {...props}
            type='time'
            value={value.from}
            onChange={e => onChange({ ...value, from: e.target.value })}
            className={cn('w-full', props['aria-invalid'] && 'border-destructive')}
            disabled={disabled}
            placeholder='Od'
          />
        </div>
        <div className='flex flex-col gap-1.5'>
          <Input
            {...props}
            type='time'
            value={value.to}
            onChange={e => onChange({ ...value, to: e.target.value })}
            className={cn('w-full', props['aria-invalid'] && 'border-destructive')}
            disabled={disabled}
            placeholder='Do'
          />
        </div>
      </div>
    </div>
  )
}
