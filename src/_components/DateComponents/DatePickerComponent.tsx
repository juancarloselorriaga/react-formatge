import React, { FC, useMemo } from 'react'
import { Calendar } from 'react-date-range'
import { formatDate } from '../../helpers/utils'
import DateComponentWrapper from './DateComponentWrapper'
import { CustomComponentImplementation } from '../../types'

interface DatePickerComponentProps extends CustomComponentImplementation<Date> {
  title: string
  onChange?: ( date: Date ) => void
  dateDisplayFormat?: string
}

const DatePickerComponent: FC<DatePickerComponentProps> = (
  {
    title,
    dateDisplayFormat = 'yyyy-MM-dd',
    onChange,
    defaultValue,
    onUpdateValue,
    value,
    ...props
  } ) => {
  const updateDate = ( date: Date ) => {
    onChange && onChange( date )
    onUpdateValue && onUpdateValue( date )
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
        onChange={ updateDate } { ...{ dateDisplayFormat } } />
    </DateComponentWrapper>
  )
}

export default DatePickerComponent
