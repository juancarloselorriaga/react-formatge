import { StackProps } from '@chakra-ui/react'
import { FormFieldType, OnFormSubmit } from '../types'
import React, { FC } from 'react'
import FormWrapper from '../_layout/FormWrapper'
import { formValidationRgx } from '../helpers/rgx'

export type DevFormFields = {
  description: string
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
      name: 'description',
      componentType: 'input',
      label: 'description (SEO)',
      placeholder: 'type an optional description',
      initialValue: '',
      validation: {
        required: false,
        validator: {
          regEx: formValidationRgx.limitChars( 0, 10 ),
          error: 'The character limit is 250'
        }
      }
    },
  ]

  const handleOnFormSubmit = async ( updatedData: Partial<DevFormFields> ) => {
    if ( !onFormSubmit ) return
    await onFormSubmit( updatedData )
    console.log( updatedData )
  }

  return (
    <FormWrapper<DevFormFields>
      onSubmitCb={ handleOnFormSubmit }
      followInitialState
      onUpdate={ ( data: any ) => console.log( data ) }
      { ...{ inputFields } }
      { ...props }
    />
  )
}

export default DevFormComponent
