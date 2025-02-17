'use client'

import { DAYS, WEEKDAYS, WEEKEND, DEFAULT_TIME_RANGE, AvailabilityModes } from './utils'
import type { AvailabilityMode, WeeklyAvailability, TimeRange } from './types'

const calculateNewTimeRange = (lastRange: TimeRange): TimeRange => {
  const lastToHour = Number.parseInt(lastRange.to.split(':')[0], 10)
  if (lastToHour >= 22) {
    return DEFAULT_TIME_RANGE
  }
  const newFrom = `${String(lastToHour + 1).padStart(2, '0')}:00`
  const newTo = `${String(Math.min(lastToHour + 2, 23)).padStart(2, '0')}:00`
  return { from: newFrom, to: newTo }
}

interface TimeRangeStrategy {
  updateTimeRange: (
    availability: WeeklyAvailability,
    day: string,
    index: number,
    newRange: TimeRange,
  ) => WeeklyAvailability
  addTimeRange: (availability: WeeklyAvailability, day: string) => WeeklyAvailability
  removeTimeRange: (availability: WeeklyAvailability, day: string, index: number) => WeeklyAvailability
}

const wholeWeekStrategy: TimeRangeStrategy = {
  updateTimeRange: (availability, _, index, newRange) => {
    const newAvailability = { ...availability }
    DAYS.forEach(d => {
      newAvailability[d.value].timeRanges[index] = newRange
    })
    return newAvailability
  },
  addTimeRange: availability => {
    const newAvailability = { ...availability }
    const lastRange = newAvailability[DAYS[0].value].timeRanges[newAvailability[DAYS[0].value].timeRanges.length - 1]
    const newRange = calculateNewTimeRange(lastRange)
    DAYS.forEach(d => {
      newAvailability[d.value].timeRanges.push(newRange)
    })
    return newAvailability
  },
  removeTimeRange: (availability, _, index) => {
    const newAvailability = { ...availability }
    DAYS.forEach(d => {
      newAvailability[d.value].timeRanges.splice(index, 1)
      if (newAvailability[d.value].timeRanges.length === 0) {
        newAvailability[d.value].timeRanges = [DEFAULT_TIME_RANGE]
      }
    })
    return newAvailability
  },
}

const weekdaysStrategy: TimeRangeStrategy = {
  updateTimeRange: (availability, day, index, newRange) => {
    const newAvailability = { ...availability }
    if (WEEKEND.some(d => d.value === day)) {
      newAvailability[day].timeRanges[index] = newRange
    } else {
      WEEKDAYS.forEach(d => {
        newAvailability[d.value].timeRanges[index] = newRange
      })
    }
    return newAvailability
  },
  addTimeRange: (availability, day) => {
    const newAvailability = { ...availability }
    if (WEEKEND.some(d => d.value === day)) {
      const lastRange = newAvailability[day].timeRanges[newAvailability[day].timeRanges.length - 1]
      const newRange = calculateNewTimeRange(lastRange)
      newAvailability[day].timeRanges.push(newRange)
    } else {
      const lastRange =
        newAvailability[WEEKDAYS[0].value].timeRanges[newAvailability[WEEKDAYS[0].value].timeRanges.length - 1]
      const newRange = calculateNewTimeRange(lastRange)
      WEEKDAYS.forEach(d => {
        newAvailability[d.value].timeRanges.push(newRange)
      })
    }
    return newAvailability
  },
  removeTimeRange: (availability, day, index) => {
    const newAvailability = { ...availability }
    if (WEEKEND.some(d => d.value === day)) {
      newAvailability[day].timeRanges.splice(index, 1)
      if (newAvailability[day].timeRanges.length === 0) {
        newAvailability[day].timeRanges = [DEFAULT_TIME_RANGE]
      }
    } else {
      WEEKDAYS.forEach(d => {
        newAvailability[d.value].timeRanges.splice(index, 1)
        if (newAvailability[d.value].timeRanges.length === 0) {
          newAvailability[d.value].timeRanges = [DEFAULT_TIME_RANGE]
        }
      })
    }
    return newAvailability
  },
}

const individualStrategy: TimeRangeStrategy = {
  updateTimeRange: (availability, day, index, newRange) => {
    const newAvailability = { ...availability }
    newAvailability[day].timeRanges[index] = newRange
    return newAvailability
  },
  addTimeRange: (availability, day) => {
    const newAvailability = { ...availability }
    const lastRange = newAvailability[day].timeRanges[newAvailability[day].timeRanges.length - 1]
    const newRange = calculateNewTimeRange(lastRange)
    newAvailability[day].timeRanges.push(newRange)
    return newAvailability
  },
  removeTimeRange: (availability, day, index) => {
    const newAvailability = { ...availability }
    newAvailability[day].timeRanges.splice(index, 1)
    if (newAvailability[day].timeRanges.length === 0) {
      newAvailability[day].timeRanges = [DEFAULT_TIME_RANGE]
    }
    return newAvailability
  },
}

export const timeRangeStartegy: Record<AvailabilityMode, TimeRangeStrategy> = {
  [AvailabilityModes.WHOLE_WEEK]: wholeWeekStrategy,
  [AvailabilityModes.WEEKDAYS]: weekdaysStrategy,
  [AvailabilityModes.INDIVIDUAL]: individualStrategy,
}
