import { StackProps } from '@chakra-ui/react'
import { FormFieldType, OnFormSubmit } from '../types'
import React, { FC } from 'react'
import FormWrapper from '../_layout/FormWrapper'

export type DevFormFields = {
  field: string
}

type DevFormKeys = keyof DevFormFields

interface DevFormComponentProps extends StackProps {
  data?: DevFormFields
  onFormSubmit?: OnFormSubmit<DevFormFields>
  error?: any
  buttonLabel?: string
}

const DevFormComponent: FC<DevFormComponentProps> = ( { data, buttonLabel, onFormSubmit, ...props } ) => {
  const defaultValues = {
    field: data?.field || '',
  }

  const inputFields: FormFieldType<DevFormKeys>[] = [
    {
      componentType: 'input',
      name: 'field',
      label: 'field',
      initialValue: defaultValues.field
    }
  ]

  const buttonProps = {
    children: 'Save'
  }

  const handleOnFormSubmit = async ( updatedData: DevFormFields ) => {
    if ( !onFormSubmit ) return
    await onFormSubmit( updatedData )
  }

  return (
      <FormWrapper<DevFormKeys, DevFormFields>
          onSubmitCb={ handleOnFormSubmit }
          { ...{ inputFields, buttonProps } }
          { ...props }
      />
  )
}

export default DevFormComponent
