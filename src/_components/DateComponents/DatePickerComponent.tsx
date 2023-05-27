import React, { FC } from 'react'
import { Calendar } from 'react-date-range'
import { formatDate } from '../../helpers/utils'
import DateComponentWrapper from './DateComponentWrapper'
import { CustomComponentImplementation } from '../../types'

interface DatePickerComponentProps extends CustomComponentImplementation<Date> {
  title: string
  onChange?: (date: Date) => void
  dateDisplayFormat?: string
}

const DatePickerComponent: FC<DatePickerComponentProps> = ({
  title,
  dateDisplayFormat = 'yyyy-MM-dd',
  onChange,
  defaultValue = new Date(),
  onUpdateValue,
  value,
  ...props
}) => {
  const updateDate = (date: Date) => {
    onChange && onChange(date)
    onUpdateValue && onUpdateValue(date)
  }

  return (
    <DateComponentWrapper value={`${formatDate(value || defaultValue)}`} {...{ title }} {...props}>
      <Calendar editableDateInputs={true} date={value} onChange={updateDate} {...{ dateDisplayFormat }} />
    </DateComponentWrapper>
  )
}

export default DatePickerComponent
