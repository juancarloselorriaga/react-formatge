import React, { forwardRef, InputHTMLAttributes, LegacyRef } from 'react'
import {
  Box,
  Input,
  InputProps,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
  Textarea,
} from '@chakra-ui/react'
import FormItemWrapper, { FormItemWrapperProps } from '../_layout/FormItemWrapper'
import { HandleUpdateDataPayload } from '../types'

export type InputFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> &
  (InputProps | NumberInputProps) &
  FormItemWrapperProps & {
  name: string
  textarea?: boolean
  onValueChange?: (payload: HandleUpdateDataPayload<any, string>) => void
}

const InputField = forwardRef<HTMLInputElement | null, InputFieldProps>(
  ({ name, textarea, label, isRequired, error, noTopSpace, helperText, onValueChange, ...props }, ref) => {
    const [_, setValue] = React.useState(props.defaultValue?.toString() || '')

    const handleNumberInputChange = (valueString: string) => {
      setValue(valueString)
      onValueChange &&
      onValueChange({
        id: name,
        name,
        value: valueString,
      })
    }

    const inputComponentFactory = (type: 'number' | 'textarea' | 'input') => {
      const sharedProps = {
        id: name,
        name,
        placeholder: props.placeholder,
        errorBorderColor: 'red.200',
        borderColor: 'primary',
        variant: 'outline',
        bg: 'white',
        size: 'md',
        isDisabled: props.isDisabled
      }

      const dict = {
        number: (
          <NumberInput
            {...sharedProps}
            {...{ ref }}
            onChange={handleNumberInputChange}
            value={props.value as string | number | undefined}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        ),
        textarea: (
          <Textarea
            ref={ref as unknown as LegacyRef<HTMLTextAreaElement> | undefined}
            {...sharedProps}
            onChange={(e) => handleNumberInputChange(e.target.value)}
            value={props.value}
          />
        ),
        input: (
          <Input {...sharedProps} {...props} {...{ ref }} onChange={(e) => handleNumberInputChange(e.target.value)} />
        ),
      }

      return dict[type]
    }

    const inputComponentTypeFactory = () => {
      switch (true) {
        case props.type === 'number':
          return 'number'

        case !!textarea:
          return 'textarea'

        default:
          return 'input'
      }
    }

    return (
      <Box mt={2} w='100%'>
        <FormItemWrapper
          {...{
            name,
            label,
            isRequired,
            error,
            noTopSpace,
            helperText,
          }}
        >
          {inputComponentFactory(inputComponentTypeFactory())}
        </FormItemWrapper>
      </Box>
    )
  },
)

InputField.displayName = 'InputField'

export default InputField
