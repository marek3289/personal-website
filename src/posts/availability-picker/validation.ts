import type { WeeklyAvailability, TimeRange } from './types'

export interface ValidationErrors {
  [key: string]: { [index: number]: string }
}

export function validateTimeRange(range: TimeRange): string[] {
  const errors: string[] = []

  if (!isValidTimeFormat(range.from)) {
    errors.push(`Invalid "From" time format`)
  }

  if (!isValidTimeFormat(range.to)) {
    errors.push(`Invalid "To" time format`)
  }

  if (isValidTimeFormat(range.from) && isValidTimeFormat(range.to) && !isFromBeforeTo(range.from, range.to)) {
    errors.push(`"From" time must be earlier than "To" time`)
  }

  return errors
}

export function validateAvailability(availability: WeeklyAvailability): ValidationErrors {
  const errors: ValidationErrors = {}

  Object.entries(availability).forEach(([day, dayAvailability]) => {
    if (dayAvailability.enabled) {
      const dayErrors: { [index: number]: string } = {}

      // Sprawdź każdy zakres czasowy
      dayAvailability.timeRanges.forEach((range, index) => {
        const rangeErrors = validateTimeRange(range)
        if (rangeErrors.length > 0) {
          dayErrors[index] = rangeErrors.join(', ')
        }
      })

      const overlaps = getOverlappingRanges(dayAvailability.timeRanges)

      overlaps.forEach(([range1, range2]) => {
        const index1 = dayAvailability.timeRanges.findIndex(r => r === range1)
        const index2 = dayAvailability.timeRanges.findIndex(r => r === range2)
        const overlapError = `Time ranges ${range1.from}-${range1.to} and ${range2.from}-${range2.to} overlap`

        dayErrors[index1] = dayErrors[index1] ? `${dayErrors[index1]}. ${overlapError}` : overlapError
        dayErrors[index2] = dayErrors[index2] ? `${dayErrors[index2]}. ${overlapError}` : overlapError
      })

      if (Object.keys(dayErrors).length > 0) {
        errors[day] = dayErrors
      }
    }
  })

  return errors
}

function isValidTimeFormat(time: string): boolean {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
  return timeRegex.test(time)
}

function isFromBeforeTo(from: string, to: string): boolean {
  const fromTime = new Date(`1970-01-01T${from}`)
  const toTime = new Date(`1970-01-01T${to}`)
  return fromTime < toTime
}

export function getOverlappingRanges(ranges: TimeRange[]): [TimeRange, TimeRange][] {
  const sortedRanges = [...ranges].sort((a, b) => {
    return new Date(`1970-01-01T${a.from}`).getTime() - new Date(`1970-01-01T${b.from}`).getTime()
  })

  const overlaps: [TimeRange, TimeRange][] = []

  for (let i = 0; i < sortedRanges.length - 1; i++) {
    for (let j = i + 1; j < sortedRanges.length; j++) {
      const currentEnd = new Date(`1970-01-01T${sortedRanges[i].to}`)
      const nextStart = new Date(`1970-01-01T${sortedRanges[j].from}`)
      if (currentEnd > nextStart) {
        overlaps.push([sortedRanges[i], sortedRanges[j]])
      }
    }
  }

  return overlaps
}
