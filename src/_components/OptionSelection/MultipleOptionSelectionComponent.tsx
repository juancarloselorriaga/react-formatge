import React, { FC } from 'react'
import { VStack } from '@chakra-ui/react'
import { CustomComponentImplementation } from '../../types'
import MultipleOptionSelection, { MultipleOptionSelectionProps } from './MultipleOptionSelection'
import { IOption } from './OptionSelection'

type MultipleOptionSelectionComponentProps =
  Partial<MultipleOptionSelectionProps>
  & CustomComponentImplementation<IOption[]>
  & {
  items: IOption[]
  placeholder?: string
}

const MultipleOptionSelectionComponent: FC<MultipleOptionSelectionComponentProps> = (
  {
    value,
    defaultValue,
    onUpdateValue,
    items,
    placeholder,
    ...props
  } ) => {
  const defaultSelected = Array.isArray(defaultValue) ? defaultValue as IOption[] : []

  return (
    <VStack
      w='full'
      align='flex-start'
    >
      <MultipleOptionSelection
        onUpdate={ ( payload: IOption[] ) => {
          onUpdateValue && onUpdateValue( payload )
        } }
        options={ [ ...items ] }
        { ...props }
        { ...{ value, defaultSelected, placeholder } }

      />
    </VStack>
  )
}

export default MultipleOptionSelectionComponent