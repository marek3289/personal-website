import { AvailabilityModes } from './utils'

export type AvailabilityMode = (typeof AvailabilityModes)[keyof typeof AvailabilityModes]

export type TimeRange = {
  from: string
  to: string
}

export type DayAvailability = {
  enabled: boolean
  timeRanges: TimeRange[]
}

export type WeeklyAvailability = Record<string, DayAvailability>

export interface AvailabilityPickerProps {
  value: WeeklyAvailability
  onChange: (value: WeeklyAvailability) => void
}
