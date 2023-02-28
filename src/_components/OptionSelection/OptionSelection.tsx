import { Select, VStack, SelectProps, StackProps } from '@chakra-ui/react'
import React, { FC } from 'react'

export interface IOption {
  label: string
  value: string | null
  color?: string
}

export interface OptionSelectionProps extends SelectProps {
  options: IOption[]
  label?: string
  alignItems?: string
  wrapperProps?: StackProps
}

const OptionSelection: FC<OptionSelectionProps> = ( { options, alignItems, wrapperProps, ...selectProps } ) => {
  return (
    <VStack
      alignItems={ alignItems }
      w='100%' { ...wrapperProps }>
      <Select
        variant='filled'
        { ...selectProps }>
        { options?.map( ( { value, label } ) => (
          <option
            key={ value }
            value={ value ?? '' }
          >
            { label }
          </option>
        ) ) }
      </Select>
    </VStack>
  )
}

export default OptionSelection
