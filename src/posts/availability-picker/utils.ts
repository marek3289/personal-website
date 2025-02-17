import type { WeeklyAvailability } from './types'

export const AvailabilityModes = { INDIVIDUAL: 'individual', WHOLE_WEEK: 'whole-week', WEEKDAYS: 'weekdays' } as const

export const DAYS = [
  { label: 'Monday', value: 'monday' },
  { label: 'Tuesday', value: 'tuesday' },
  { label: 'Wednesday', value: 'wednesday' },
  { label: 'Thursday', value: 'thursday' },
  { label: 'Friday', value: 'friday' },
  { label: 'Saturday', value: 'saturday' },
  { label: 'Sunday', value: 'sunday' },
] as const

export const WEEKDAYS = DAYS.slice(0, 5)
export const WEEKEND = DAYS.slice(5)
export const DEFAULT_TIME_RANGE = { from: '09:00', to: '17:00' }

export const defaultAvailability: WeeklyAvailability = DAYS.reduce(
  (acc, day) => ({
    ...acc,
    [day.value]: {
      enabled: false,
      timeRanges: [DEFAULT_TIME_RANGE],
    },
  }),
  {} as WeeklyAvailability,
)
