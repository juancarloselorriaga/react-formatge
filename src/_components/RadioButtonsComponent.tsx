import React, { FC } from 'react'
import { Radio, RadioGroup, RadioGroupProps, Stack, Text, VStack } from '@chakra-ui/react'
import { CustomComponentImplementation } from '../types'

type RadioButtonsComponentProps = Partial<RadioGroupProps> & CustomComponentImplementation<string> & {
  label: string
  items: { value: string, label: string }[]
}

const RadioButtonsComponent: FC<RadioButtonsComponentProps> = (
  {
    label,
    value,
    onUpdateValue,
    onChange,
    defaultValue,
    items,
    ...props
  } ) => {
  return (
    <VStack w='full' justifyContent={ 'flex-start' } alignItems={ 'flex-start' }>
      <Text>{ label }</Text>
      <RadioGroup
        onChange={ ( val ) => {
          onUpdateValue && onUpdateValue( val )
          onChange && onChange( val )
        } }
        { ...props }
        { ...{ value, defaultValue } }
      >
        <Stack direction='row'>
          {
            items.map( ( item, index ) => (
              <Radio key={ index } value={ item.value }>{ item.label }</Radio>
            ) )
          }
        </Stack>
      </RadioGroup>
    </VStack>
  )
}

export default RadioButtonsComponent
