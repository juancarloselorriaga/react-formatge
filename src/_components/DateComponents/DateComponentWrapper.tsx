import React, { FC, ReactNode } from 'react'
import { Input } from '@chakra-ui/react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import PopoverComponent, { PopoverComponentProps } from '../PopOver'

interface DateComponentWrapperProps extends Partial<PopoverComponentProps> {
  title: string
  value?: string | number | readonly string[]
  children: ReactNode
  isDisabled?: boolean
}

const DateComponentWrapper: FC<DateComponentWrapperProps> = ({ value, children, isDisabled, ...props }) => {
  return (
    <PopoverComponent
      target={
        <Input
          readOnly
          cursor={'pointer'}
          borderColor={'primary'}
          name={'date-picker-input'}
          bg='background.default'
          {...{ value, isDisabled }}
        />
      }
      contentProps={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minW: 400,
        minH: 450,
      }}
      {...props}
    >
      {children}
    </PopoverComponent>
  )
}

export default DateComponentWrapper
