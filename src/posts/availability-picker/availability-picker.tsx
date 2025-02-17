'use client'

import * as React from 'react'
import { Plus, Minus } from 'lucide-react'

import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

import TimeRangeInput from './time-range-input'
import { timeRangeStartegy } from './time-range.strategy'
import { modeStrategy } from './mode.strategy'
import { type ValidationErrors, validateAvailability } from './validation'
import { DAYS, WEEKDAYS, WEEKEND, defaultAvailability, DEFAULT_TIME_RANGE, AvailabilityModes } from './utils'
import type { AvailabilityMode, WeeklyAvailability, AvailabilityPickerProps, TimeRange } from './types'

export const defaultWeeklyAvailability = defaultAvailability

export default function AvailabilityPicker({ value = defaultAvailability, onChange }: AvailabilityPickerProps) {
  const [availability, setAvailability] = React.useState<WeeklyAvailability>(value)
  const [mode, setMode] = React.useState<AvailabilityMode>(AvailabilityModes.INDIVIDUAL)
  const [sharedTimeRange, setSharedTimeRange] = React.useState<TimeRange>(DEFAULT_TIME_RANGE)
  const [errors, setErrors] = React.useState<ValidationErrors>({})

  const updateAvailability = (newAvailability: WeeklyAvailability) => {
    setAvailability(newAvailability)
    onChange(newAvailability)
    setErrors(validateAvailability(newAvailability))
  }

  const handleModeChange = (newMode: AvailabilityMode, checked: boolean) => {
    const strategy = modeStrategy[newMode ?? AvailabilityModes.INDIVIDUAL]
    const { newAvailability, newMode: resultMode } = strategy.updateAvailability(availability, checked, sharedTimeRange)

    setMode(resultMode)
    setErrors({})
    updateAvailability(newAvailability)
  }

  const handleSharedTimeChange = (index: number, newRange: TimeRange) => {
    const newAvailability = { ...availability }
    const daysToUpdate = mode === AvailabilityModes.WHOLE_WEEK ? DAYS : WEEKDAYS

    daysToUpdate.forEach(day => {
      newAvailability[day.value].timeRanges[index] = newRange
    })

    setErrors(prevErrors => {
      const newErrors = { ...prevErrors }
      daysToUpdate.forEach(day => {
        delete newErrors[day.value]
      })
      return newErrors
    })

    updateAvailability(newAvailability)
  }

  const handleWeekendTimeChange = (day: string, index: number, newRange: TimeRange) => {
    if (mode === AvailabilityModes.WEEKDAYS && availability[day].enabled) {
      const newAvailability = { ...availability }
      newAvailability[day] = {
        enabled: true,
        timeRanges: newAvailability[day].timeRanges.map((range, i) => (i === index ? newRange : range)),
      }

      setErrors(prevErrors => {
        const newErrors = { ...prevErrors }
        delete newErrors[day]
        return newErrors
      })

      updateAvailability(newAvailability)
    }
  }

  const updateDayTimeRange = (day: string, index: number, newRange: TimeRange) => {
    const strategy = timeRangeStartegy[mode]
    const newAvailability = strategy.updateTimeRange(availability, day, index, newRange)
    if (mode !== AvailabilityModes.INDIVIDUAL) {
      setSharedTimeRange(newRange)
    }
    updateAvailability(newAvailability)
  }

  const addTimeRange = (day: string) => {
    const strategy = timeRangeStartegy[mode]
    const newAvailability = strategy.addTimeRange(availability, day)
    updateAvailability(newAvailability)
  }

  const removeTimeRange = (day: string, index: number) => {
    const strategy = timeRangeStartegy[mode]
    const newAvailability = strategy.removeTimeRange(availability, day, index)
    updateAvailability(newAvailability)
  }

  const toggleWeekendDay = (day: string, enabled: boolean) => {
    if (mode !== AvailabilityModes.WEEKDAYS) return

    const newAvailability = {
      ...availability,
      [day]: {
        enabled,
        timeRanges: enabled ? [DEFAULT_TIME_RANGE] : [],
      },
    }

    setErrors(prevErrors => {
      const newErrors = { ...prevErrors }
      delete newErrors[day]
      return newErrors
    })

    updateAvailability(newAvailability)
  }

  const toggleDay = (day: string, enabled: boolean) => {
    if (mode !== AvailabilityModes.INDIVIDUAL) return

    const newAvailability = {
      ...availability,
      [day]: {
        enabled,
        timeRanges: enabled ? [DEFAULT_TIME_RANGE] : [],
      },
    }

    setErrors(prevErrors => {
      const newErrors = { ...prevErrors }
      delete newErrors[day]
      return newErrors
    })

    updateAvailability(newAvailability)
  }

  return (
    <div className='w-full space-y-2 py-2'>
      <div className='space-y-2'>
        <div className='space-y-2'>
          <div className='grid grid-cols-3 items-start'>
            <div className='flex items-center gap-2'>
              <div className='flex items-center'>
                <Checkbox
                  id='whole-week'
                  checked={mode === AvailabilityModes.WHOLE_WEEK}
                  onCheckedChange={(checked: boolean) => handleModeChange(AvailabilityModes.WHOLE_WEEK, checked)}
                />
              </div>
              <label htmlFor='whole-week' className='text-base'>
                Cały tydzień
              </label>
            </div>

            {mode === AvailabilityModes.WHOLE_WEEK && (
              <div className='col-span-2 flex flex-col gap-4'>
                {availability[DAYS[0].value].timeRanges.map((timeRange, index) => (
                  <div key={index} className='flex flex-col gap-2'>
                    <div className='flex w-full items-stretch justify-stretch'>
                      <TimeRangeInput
                        value={timeRange}
                        onChange={newRange => handleSharedTimeChange(index, newRange)}
                        aria-invalid={errors[DAYS[0].value] && errors[DAYS[0].value][index] ? true : false}
                      />
                      {index === availability[DAYS[0].value].timeRanges.length - 1 &&
                        availability[DAYS[0].value].timeRanges.length < 3 && (
                          <Button variant='outline' onClick={() => addTimeRange(DAYS[0].value)}>
                            <Plus />
                          </Button>
                        )}
                      {availability[DAYS[0].value].timeRanges.length > 1 && index !== 0 && (
                        <Button variant='outline' onClick={() => removeTimeRange(DAYS[0].value, index)}>
                          <Minus />
                        </Button>
                      )}
                    </div>

                    <p className='text-destructive text-xs'>{errors[DAYS[0].value] && errors[DAYS[0].value][index]}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className='space-y-2'>
          <div className='grid grid-cols-3 items-start md:grid-cols-2'>
            <div className='flex items-center gap-2'>
              <div className='flex items-center'>
                <Checkbox
                  id='weekdays'
                  checked={mode === AvailabilityModes.WEEKDAYS || mode === AvailabilityModes.WHOLE_WEEK}
                  onCheckedChange={checked => handleModeChange(AvailabilityModes.WEEKDAYS, checked as boolean)}
                  disabled={mode === AvailabilityModes.WHOLE_WEEK}
                />
              </div>
              <label htmlFor='weekdays' className='text-base'>
                Poniedziałek - piątek
              </label>
            </div>

            {mode === AvailabilityModes.WEEKDAYS && (
              <div className='col-span-2 flex flex-col gap-4 md:col-span-1'>
                {availability[WEEKDAYS[0].value].timeRanges.map((timeRange, index) => (
                  <div key={index} className='flex flex-col gap-2'>
                    <div className='flex w-full items-stretch justify-stretch'>
                      <TimeRangeInput
                        value={timeRange}
                        onChange={newRange => handleSharedTimeChange(index, newRange)}
                        aria-invalid={errors[WEEKDAYS[0].value] && errors[WEEKDAYS[0].value][index] ? true : false}
                      />
                      {index === availability[WEEKDAYS[0].value].timeRanges.length - 1 &&
                        availability[WEEKDAYS[0].value].timeRanges.length < 3 && (
                          <Button variant='outline' onClick={() => addTimeRange(WEEKDAYS[0].value)}>
                            <Plus />
                          </Button>
                        )}
                      {availability[WEEKDAYS[0].value].timeRanges.length > 1 && index !== 0 && (
                        <Button variant='outline' onClick={() => removeTimeRange(WEEKDAYS[0].value, index)}>
                          <Minus />
                        </Button>
                      )}
                    </div>

                    <p className='text-destructive text-xs'>
                      {errors[WEEKDAYS[0].value] && errors[WEEKDAYS[0].value][index]}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='space-y-2'>
        {DAYS.map(day => {
          const isWeekend = WEEKEND.some(d => d.value === day.value)
          const isWeekendMode = mode === AvailabilityModes.WEEKDAYS && isWeekend
          const isDayEnabled =
            mode === AvailabilityModes.WHOLE_WEEK ||
            (mode === AvailabilityModes.WEEKDAYS && !isWeekend) ||
            (mode === AvailabilityModes.WEEKDAYS && isWeekend && availability[day.value].enabled) ||
            (mode === AvailabilityModes.INDIVIDUAL && availability[day.value].enabled)

          const isTimeInputDisabled =
            !isDayEnabled ||
            mode === AvailabilityModes.WHOLE_WEEK ||
            (mode === AvailabilityModes.WEEKDAYS && !isWeekend)

          return (
            <div key={day.value} className='space-y-2'>
              <div className='grid grid-cols-3 items-start md:grid-cols-2'>
                <div className='flex items-center gap-2'>
                  <div className='flex items-center'>
                    <Checkbox
                      id={`day-${day.value}`}
                      checked={isDayEnabled}
                      onCheckedChange={checked =>
                        isWeekendMode
                          ? toggleWeekendDay(day.value, checked as boolean)
                          : toggleDay(day.value, checked as boolean)
                      }
                      disabled={
                        mode === AvailabilityModes.WHOLE_WEEK || (mode === AvailabilityModes.WEEKDAYS && !isWeekend)
                      }
                    />
                  </div>
                  <label htmlFor={`day-${day.value}`} className='text-base'>
                    {day.label}
                  </label>
                </div>

                {isDayEnabled && !isTimeInputDisabled && (
                  <div className='col-span-2 flex flex-col gap-4 md:col-span-1'>
                    {availability[day.value].timeRanges.map((timeRange, index) => (
                      <div key={index} className='flex flex-col gap-2'>
                        <div className='flex w-full items-stretch justify-stretch'>
                          <TimeRangeInput
                            value={timeRange}
                            onChange={newRange => updateDayTimeRange(day.value, index, newRange)}
                            aria-invalid={errors[day.value] && errors[day.value][index] ? true : false}
                          />
                          {index === availability[day.value].timeRanges.length - 1 &&
                            availability[day.value].timeRanges.length < 3 && (
                              <Button variant='outline' onClick={() => addTimeRange(day.value)}>
                                <Plus />
                              </Button>
                            )}
                          {availability[day.value].timeRanges.length > 1 && index !== 0 && (
                            <Button variant='outline' onClick={() => removeTimeRange(day.value, index)}>
                              <Minus />
                            </Button>
                          )}
                        </div>

                        <p className='text-destructive text-xs'>{errors[day.value] && errors[day.value][index]}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
