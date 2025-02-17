import { DAYS, WEEKDAYS, AvailabilityModes } from './utils'
import type { WeeklyAvailability, TimeRange, AvailabilityMode } from './types'

interface ModeStrategy {
  updateAvailability: (
    availability: WeeklyAvailability,
    checked: boolean,
    sharedTimeRange: TimeRange,
  ) => {
    newAvailability: WeeklyAvailability
    newMode: AvailabilityMode
  }
}

const wholeWeekStrategy: ModeStrategy = {
  updateAvailability: (availability, checked, sharedTimeRange) => {
    const newAvailability = { ...availability }

    if (checked) {
      DAYS.forEach(day => {
        newAvailability[day.value] = {
          enabled: true,
          timeRanges: [sharedTimeRange],
        }
      })
    } else {
      DAYS.forEach(day => {
        newAvailability[day.value] = {
          enabled: false,
          timeRanges: [],
        }
      })
    }

    return {
      newAvailability,
      newMode: checked ? AvailabilityModes.WHOLE_WEEK : AvailabilityModes.INDIVIDUAL,
    }
  },
}

const weekdaysStrategy: ModeStrategy = {
  updateAvailability: (availability, checked, sharedTimeRange) => {
    const newAvailability = { ...availability }

    if (checked) {
      WEEKDAYS.forEach(day => {
        newAvailability[day.value] = {
          enabled: true,
          timeRanges: [sharedTimeRange],
        }
      })
    } else {
      WEEKDAYS.forEach(day => {
        newAvailability[day.value] = {
          enabled: false,
          timeRanges: [],
        }
      })
    }

    return {
      newAvailability,
      newMode: checked ? AvailabilityModes.WEEKDAYS : AvailabilityModes.INDIVIDUAL,
    }
  },
}

const individualStrategy: ModeStrategy = {
  updateAvailability: availability => {
    const newAvailability = Object.fromEntries(
      Object.entries(availability).map(([day]) => [
        day,
        {
          enabled: false,
          timeRanges: [],
        },
      ]),
    ) as WeeklyAvailability

    return {
      newAvailability,
      newMode: AvailabilityModes.INDIVIDUAL,
    }
  },
}

export const modeStrategy: Record<AvailabilityMode, ModeStrategy> = {
  [AvailabilityModes.WHOLE_WEEK]: wholeWeekStrategy,
  [AvailabilityModes.WEEKDAYS]: weekdaysStrategy,
  [AvailabilityModes.INDIVIDUAL]: individualStrategy,
}
