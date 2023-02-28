import { StackProps } from '@chakra-ui/react'
import { FormFieldType, OnFormSubmit } from '../types'
import React, { FC } from 'react'
import FormWrapper from '../_layout/FormWrapper'
import { formValidationRgx } from '../helpers/rgx'

export type DevFormFields = {
  email: string
  password: string
}

interface DevFormComponentProps extends StackProps {
  data?: DevFormFields
  onFormSubmit?: OnFormSubmit<Partial<DevFormFields>>
  error?: any
  buttonLabel?: string
}

const DevFormComponent: FC<DevFormComponentProps> = ( { data, buttonLabel, onFormSubmit, ...props } ) => {

  const inputFields: FormFieldType<DevFormFields>[] = [
   {
      componentType: 'input',
      name: 'email',
      label: 'email',
      placeholder: 'type the email',
      helperText: 'Login mail',
      initialValue: '',
      validation: {
        required: true,
        validator: {
          regEx: formValidationRgx.email,
          error: 'Invalid email format'
        }
      }
    },
    {
      componentType: 'input',
      name: 'password',
      label: 'password',
      type: 'password',
      initialValue: '',
      validation: {
        required: true,
        validator: {
          regEx: formValidationRgx.limitChars(4, 25),
          error: 'The password must be 4 valid character long'
        }
      }
    },
  ]

  const handleOnFormSubmit = async ( updatedData: Partial<DevFormFields> ) => {
    if ( !onFormSubmit ) return
    await onFormSubmit( updatedData )
    console.log(updatedData)
  }

  return (
    <FormWrapper<DevFormFields>
      onSubmitCb={ handleOnFormSubmit }
      { ...{ inputFields } }
      { ...props }
    />
  )
}

export default DevFormComponent
