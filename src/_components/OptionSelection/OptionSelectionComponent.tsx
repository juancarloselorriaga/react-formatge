
import React, { FC } from 'react'
import { VStack } from '@chakra-ui/react'
import { CustomComponentImplementation } from '../../types'
import OptionSelection, { OptionSelectionProps } from './OptionSelection'

type OptionSelectionComponentProps = Partial<OptionSelectionProps> & CustomComponentImplementation<string> & {
  items: { label: string, value: string }[]
}

const OptionSelectionComponent: FC<OptionSelectionComponentProps> = (
    {
      value,
      defaultValue,
      onUpdateValue,
      items,
      onChange,
      ...props
    } ) => (

    <VStack
        w="full"
        align="flex-start"
    >
      <OptionSelection
          data-initial={ defaultValue }
          bg="background.default"
          borderColor="text.default"
          borderWidth="1px"
          onChange={ ( e: any ) => {
            onUpdateValue && onUpdateValue( e.target.value )
            onChange && onChange( e )
          } }
          options={ [ ...items ] }
          { ...props }
          { ...{ value } }

      />
    </VStack>
)

export default OptionSelectionComponent