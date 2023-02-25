import React, { FC } from 'react'
import { Checkbox, CheckboxProps } from '@chakra-ui/react'
import { CustomComponentImplementation } from '../types'

type CheckboxComponentProps = CheckboxProps & CustomComponentImplementation<boolean>

const CheckboxComponent: FC<CheckboxComponentProps> = ({ value, onUpdateValue, onChange, defaultValue, ...props }) => {
  return (
    <Checkbox
      defaultChecked={defaultValue}
      isChecked={value}
      onChange={(e) => {
        onUpdateValue && onUpdateValue(e.target.checked)
        onChange && onChange(e)
      }}
      {...props}
    />
  )
}

export default CheckboxComponent
