import React, { FC, ReactNode } from 'react'
import { FormControl, FormControlProps, FormLabel, HStack } from '@chakra-ui/react'
import TextComponent from '../_components/TextComponent'

export type FormItemWrapperProps = Omit<FormControlWrapperProps, 'children' | 'onChange'>

interface FormControlWrapperProps extends FormControlProps {
  children?: ReactNode
  name: string
  label?: string
  helperText?: string
  isRequired?: boolean
  error?: string
  noTopSpace?: boolean
}

const FormItemWrapper: FC<FormControlWrapperProps> = ({
  error,
  noTopSpace,
  isRequired,
  name,
  label,
  helperText,
  children,
  ...props
}) => {
  return (
    <FormControl isInvalid={!!error} {...props}>
      <HStack h={noTopSpace ? 0 : 10} w={'full'}>
        {label && (
          <FormLabel m={0} htmlFor={name}>
            {label}
            {isRequired ? ' * ' : ''}
          </FormLabel>
        )}
        <TextComponent tooltip={error} flex={1} color={'red.400'} w={'full'} justifyContent='flex-end' fontSize='xs'>
          {error}
        </TextComponent>
      </HStack>

      {helperText && (
        <TextComponent color={'gray.500'} pb={0.5} tooltip={helperText} w={'full'} fontSize='sm'>
          {helperText}
        </TextComponent>
      )}
      {children}
    </FormControl>
  )
}

export default FormItemWrapper
