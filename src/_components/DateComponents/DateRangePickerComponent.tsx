import React, { FC, useCallback, useMemo } from 'react'
import { DateRange, DateRangeProps, RangeKeyDict } from 'react-date-range'
import { formatDate } from '../../helpers/utils'
import DateComponentWrapper from './DateComponentWrapper'
import { CustomComponentImplementation } from '../../types'

type DatePickerRangeDate = [ Date, Date ]

interface DatePickerComponentProps extends CustomComponentImplementation<[ Date, Date ]> {
  title: string
  onChange?: ( dates: DatePickerRangeDate ) => void
  dateDisplayFormat?: string
  isDisabled?: boolean
  dateRangePickerProps?: DateRangeProps
}

const DateRangePickerComponent: FC<DatePickerComponentProps> = ( {
                                                                   title,
                                                                   onChange,
                                                                   dateDisplayFormat,
                                                                   defaultValue,
                                                                   value,
                                                                   onUpdateValue,
                                                                   dateRangePickerProps: {
                                                                     onChange: dateRangePickerOnChange,
                                                                     ...dateRangePickerProps
                                                                   } = {},
                                                                   ...props
                                                                 } ) => {
  const updateRange = ( range: RangeKeyDict ) => {
    const newRange: [ Date, Date ] = [ range[0].startDate!, range[0].endDate! ]
    onChange && onChange( newRange )
    onUpdateValue && onUpdateValue( newRange )
    dateRangePickerOnChange?.( range )
  }

  const date = useCallback( ( pos: number ) => {
    if ( value ) {
      return formatDate( value[pos] )
    } else {
      if ( defaultValue ) {
        return formatDate( defaultValue[pos] )
      }
    }

    return null

  }, [ value, defaultValue ] )

  const dateValue = useMemo( () => {
    if ( date( 0 ) !== null ) {
      if ( date( 1 ) !== null ) {
        return `${ date( 0 ) } | ${ date( 1 ) }`
      } else {
        return `${ date( 0 ) }`
      }
    } else {
      return '-'
    }
  }, [ date ] )

  return (
    <DateComponentWrapper
      value={ dateValue }
      { ...{ title } }
      { ...props }
    >
      <DateRange
        editableDateInputs={ true }
        onChange={ ( item: RangeKeyDict ) => updateRange( item ) }
        moveRangeOnFirstSelection
        ranges={ [
          {
            startDate: ( value && value[0] ) || new Date(),
            endDate: ( value && value[1] ) || new Date(),
            key: 'selection',
          },
        ] }
        rangeColors={ [ 'primary', 'primary' ] }
        { ...{ dateDisplayFormat } }
        { ...dateRangePickerProps }
      />
    </DateComponentWrapper>
  )
}

export default DateRangePickerComponent
