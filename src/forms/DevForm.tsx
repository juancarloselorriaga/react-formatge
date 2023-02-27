import { StackProps } from '@chakra-ui/react'
import { FormFieldType, OnFormSubmit } from '../types'
import React, { FC, useState } from 'react'
import FormWrapper from '../_layout/FormWrapper'

export type DevFormFields = {
  field: string
  otherField: string
}

interface DevFormComponentProps extends StackProps {
  data?: DevFormFields
  onFormSubmit?: OnFormSubmit<Partial<DevFormFields>>
  error?: any
  buttonLabel?: string
}

const DevFormComponent: FC<DevFormComponentProps> = ( { data, buttonLabel, onFormSubmit, ...props } ) => {
  const [ variable, setVariable ] = useState( '',
  )
  const inputFields: FormFieldType<DevFormFields>[] = [
    {
      componentType: 'input',
      name: 'field',
      label: 'field',
      onValueChange: ( payload ) => setVariable( payload.value ),
      initialValue: data?.field || '',
      validation: {
        required: true,
      },
    },
    ...(
      variable === 'test' ? [
        {
          componentType: 'input' as const,
          name: 'otherField' as const,
          label: 'other field',
          initialValue: data?.otherField || '',
          validation: {
            required: true,
          },
        },
      ] : []
    ),
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
