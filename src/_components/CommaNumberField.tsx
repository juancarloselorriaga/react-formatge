import React, { FC, useMemo } from 'react'
import { Box, NumberInput, NumberInputField, NumberInputProps } from '@chakra-ui/react'

export type ICommaNumberFieldProps = NumberInputProps & {
  name: string
}

const CommaNumberField: FC<ICommaNumberFieldProps> = ({ name, ...props }) => {
  const precision = props.precision || 0
  const [value, setValue] = React.useState((props.defaultValue as number) || 0)

  const isWithinRange = useMemo(() => {
    if (props.max && props.min) {
      return value >= props.min && value <= props.max
    }
    return false
  }, [props, value])

  const handleNumberInputChange = (valueNumber: number) => {
    setValue(valueNumber)
    if (props?.onChange) {
      props.onChange(valueNumber.toString(), valueNumber)
    }
  }

  const format = (valueAsNumber: number) => {
    let valueAsString = valueAsNumber.toString()

    const [integerPart, decimalPart = ''] = valueAsString.split('.')

    if (decimalPart) {
      valueAsString = `${integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${decimalPart.padEnd(precision, '0')}`
    } else {
      valueAsString = `${integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${'0'.repeat(precision)}`
    }

    return valueAsString
  }

  const parse = (valueAsString: string) => {
    let valueAsNumber

    try {
      let parsedValueAsString = valueAsString.replace(/\D/g, '')

      parsedValueAsString = parsedValueAsString.padStart(precision + 1, '0')

      parsedValueAsString = `${parsedValueAsString.substring(
        0,
        parsedValueAsString.length - precision,
      )}.${parsedValueAsString.slice(precision * -1)}`

      valueAsNumber = parseFloat(parsedValueAsString)
    } catch {
      valueAsNumber = 0
    }

    return valueAsNumber
  }

  return (
    <Box mt={2} w='100%'>
      <NumberInput
        id={name}
        type='decimal'
        borderColor={'primary'}
        variant='outline'
        placeholder={props.placeholder}
        size='md'
        isInvalid={!isWithinRange}
        clampValueOnBlur={false}
        keepWithinRange={false}
        {...{ name }}
        {...props}
        // order is important keep onChange bellow the received props
        value={format(value)}
        onChange={(valueAsString) => handleNumberInputChange(parse(valueAsString))}
      >
        <NumberInputField bg='background.default' />
      </NumberInput>
    </Box>
  )
}

export default CommaNumberField
