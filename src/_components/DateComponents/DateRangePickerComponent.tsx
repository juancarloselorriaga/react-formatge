import React, { FC } from 'react'
import { DateRange, Range, RangeKeyDict } from 'react-date-range'
import { formatDate } from '../../helpers/utils'
import DateComponentWrapper from './DateComponentWrapper'
import { FormComponent } from '../../types'

type DatePickerRangeDate = [Date, Date]

interface DatePickerComponentProps extends FormComponent<[Date, Date]> {
  title: string
  onChange?: (dates: DatePickerRangeDate) => void
  dateDisplayFormat?: string
}

const DateRangePickerComponent: FC<DatePickerComponentProps> = ({
  title,
  onChange,
  dateDisplayFormat,
  defaultValue,
  value,
  onUpdateValue,
  ...props
}) => {
  const updateRange = (range: Range[]) => {
    onChange && onChange([range[0].startDate!, range[0].endDate!])
    onUpdateValue && onUpdateValue([range[0].startDate!, range[0].endDate!])
  }

  if (!defaultValue) {
    return null
  }

  return (
    <DateComponentWrapper
      value={`${formatDate(value ? value[0] : defaultValue[0])} | ${formatDate(value ? value[1] : defaultValue[1])}`}
      {...{ title }}
      {...props}
    >
      <DateRange
        editableDateInputs={true}
        onChange={(item: RangeKeyDict) => updateRange([item.selection])}
        moveRangeOnFirstSelection
        ranges={[
          {
            startDate: (value && value[0]) || new Date(),
            endDate: (value && value[1]) || new Date(),
            key: 'selection',
          },
        ]}
        rangeColors={['primary', 'primary']}
        {...{ dateDisplayFormat }}
      />
    </DateComponentWrapper>
  )
}

export default DateRangePickerComponent
