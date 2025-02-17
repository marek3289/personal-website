'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import AvailabilityPicker, { defaultWeeklyAvailability } from './availability-picker'
import type { WeeklyAvailability } from './types'

export default function AvailabilityPickerDemo() {
  const [availability, setAvailability] = React.useState<WeeklyAvailability>(defaultWeeklyAvailability)
  const [savedData, setSavedData] = React.useState<string>('')

  const handleSave = () => {
    const enabledDays = Object.entries(availability)
      .filter(([_, value]) => value.enabled)
      .map(([day, value]) => ({ day, timeRanges: value.timeRanges }))

    setSavedData(JSON.stringify(enabledDays, null, 2))
  }

  return (
    <div className='space-y-16'>
      <div className='space-y-4'>
        <AvailabilityPicker value={availability} onChange={newAvailability => setAvailability(newAvailability)} />
        <Button onClick={handleSave}>Save Availability</Button>
      </div>

      {savedData && (
        <div className='rounded-lg border bg-muted p-4'>
          <h3 className='mb-2 font-medium'>Saved Availability:</h3>
          <pre className='whitespace-pre-wrap text-sm'>{savedData}</pre>
        </div>
      )}
    </div>
  )
}
