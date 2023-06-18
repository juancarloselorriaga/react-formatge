import { StackProps } from '@chakra-ui/react'
import { FormFieldType, OnFormSubmit } from '../types'
import React, { FC } from 'react'
import FormWrapper from '../_layout/FormWrapper'

export type DevFormFields = {
  originalPlannedDates: null | [Date,  Date]
  originalChangeCost: string
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
      name: 'originalChangeCost',
      componentType: 'input',
      label: 'Originally planned change cost',
      placeholder: 'Enter change cost',
      initialValue: '',
      size: 'sm',
      validation: {
        required: false
      },
    },
  ]

  const handleOnFormSubmit = async ( updatedData: Partial<DevFormFields> ) => {
    if ( !onFormSubmit ) return
    await onFormSubmit( updatedData )
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
