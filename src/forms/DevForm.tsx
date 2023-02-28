import { StackProps } from '@chakra-ui/react'
import { FormFieldType, OnFormSubmit } from '../types'
import React, { FC } from 'react'
import FormWrapper from '../_layout/FormWrapper'

export type DevFormFields = {
  input: string
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
      name: 'input',
      label: 'input',
      initialValue: data?.input || '',
      componentType: 'input',
    }
  ]

  const handleOnFormSubmit = async ( updatedData: Partial<DevFormFields> ) => {
    if ( !onFormSubmit ) return
    await onFormSubmit( updatedData )
    console.log(updatedData)
  }

  return (
    <FormWrapper<DevFormFields>
      onSubmitCb={ handleOnFormSubmit }
      followInitialState
      { ...{ inputFields } }
      { ...props }
    />
  )
}

export default DevFormComponent
