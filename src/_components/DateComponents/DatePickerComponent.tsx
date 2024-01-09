import React, { FC, useMemo } from 'react'
import { Calendar, CalendarProps } from 'react-date-range'
import { formatDate } from '../../helpers/utils'
import DateComponentWrapper from './DateComponentWrapper'
import { CustomComponentImplementation } from '../../types'

interface DatePickerComponentProps extends CustomComponentImplementation<Date> {
  title: string
  onChange?: ( date: Date ) => void
  dateDisplayFormat?: string
  datePickerProps?: CalendarProps
}

const DatePickerComponent: FC<DatePickerComponentProps> = (
  {
    title,
    dateDisplayFormat = 'yyyy-MM-dd',
    onChange,
    defaultValue,
    onUpdateValue,
    value,
    datePickerProps: {
      onChange: datePickerOnChange,
      ...datePickerProps
    } = {},
    ...props
  } ) => {
  const updateDate = ( date: Date ) => {
    onChange && onChange( date )
    onUpdateValue && onUpdateValue( date )
    datePickerOnChange?.(date)
  }

  const date = useMemo( () => {
    if ( value ) {
      return `${ formatDate( value ) }`
    } else if ( defaultValue ) {
      return `${ formatDate( defaultValue ) }`
    } else {
      return '-'
    }
  }, [value, defaultValue] )

  return (
    <DateComponentWrapper value={ date } { ...{ title } } { ...props }>
      <Calendar
        editableDateInputs={ true }
        date={ value }
        onChange={ updateDate }
        { ...{ dateDisplayFormat } }
        {...datePickerProps}
      />
    </DateComponentWrapper>
  )
}

export default DatePickerComponent
