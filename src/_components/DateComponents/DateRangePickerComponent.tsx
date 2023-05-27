import React, { FC, useCallback, useMemo } from 'react'
import { DateRange, Range, RangeKeyDict } from 'react-date-range'
import { formatDate } from '../../helpers/utils'
import DateComponentWrapper from './DateComponentWrapper'
import { CustomComponentImplementation } from '../../types'

type DatePickerRangeDate = [ Date, Date ]

interface DatePickerComponentProps extends CustomComponentImplementation<[ Date, Date ]> {
  title: string
  onChange?: ( dates: DatePickerRangeDate ) => void
  dateDisplayFormat?: string
  isDisabled?: boolean
}

const DateRangePickerComponent: FC<DatePickerComponentProps> = ( {
                                                                   title,
                                                                   onChange,
                                                                   dateDisplayFormat,
                                                                   defaultValue,
                                                                   value,
                                                                   onUpdateValue,
                                                                   ...props
                                                                 } ) => {
  const updateRange = ( range: Range[] ) => {
    onChange && onChange( [ range[0].startDate!, range[0].endDate! ] )
    onUpdateValue && onUpdateValue( [ range[0].startDate!, range[0].endDate! ] )
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

  }, [value, defaultValue] )

  const dateValue = useMemo(() => {
    if ( date(0) !== null  ) {
      if ( date(1) !== null ) {
        return `${ date( 0 ) } | ${ date( 1 ) }`
      } else {
          return `${ date( 0 ) }`
      }
    } else {
      return '-'
    }
  }, [date])

  return (
    <DateComponentWrapper
      value={ dateValue }
      { ...{ title } }
      { ...props }
    >
      <DateRange
        editableDateInputs={ true }
        onChange={ ( item: RangeKeyDict ) => updateRange( [ item.selection ] ) }
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
      />
    </DateComponentWrapper>
  )
}

export default DateRangePickerComponent
