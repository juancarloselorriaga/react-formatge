import React, { FC } from 'react'
import { Radio, RadioGroup, RadioGroupProps, Stack, Text, VStack } from '@chakra-ui/react'
import { CustomComponentImplementation } from '../types'

type RadioButtonsComponentProps = Partial<RadioGroupProps> & CustomComponentImplementation<string> & {
  label: string
}

const RadioButtonsComponent: FC<RadioButtonsComponentProps> = (
    {
      label,
      value,
      onUpdateValue,
      onChange,
      defaultValue,
      ...props
    } ) => {
  return (
      <VStack w="full" justifyContent={ 'flex-start' } alignItems={"flex-start"}>
        <Text>{ label }</Text>
        <RadioGroup
            onChange={ ( val ) => {
              onUpdateValue && onUpdateValue( val )
              onChange && onChange( val )
            } }
            { ...props }
            { ...{ value, defaultValue } }
        >
          <Stack direction="row">
            <Radio value={ '1' }>No</Radio>
            <Radio value={ '0' }>Yes</Radio>
          </Stack>
        </RadioGroup>
      </VStack>
  )
}

export default RadioButtonsComponent
