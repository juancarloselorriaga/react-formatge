import { StackProps } from '@chakra-ui/react'
import { FormFieldType, OnFormSubmit } from '../types'
import React, { FC } from 'react'
import FormWrapper from '../_layout/FormWrapper'
import DatePickerComponent from '../_components/DateComponents/DatePickerComponent'

export type DevFormFields = {
  range: [Date, Date] | null
  date: Date | null
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
      name: 'date',
      componentType: 'component',
      label: 'Date',
      initialValue: null,
      component: (
        <DatePickerComponent title="Date" />
      )
    },
    {
      name: 'range',
      componentType: 'component',
      label: 'Date',
      initialValue: null,
      component: (
        <DatePickerComponent title="Date" />
      )
    }
  ]

  const handleOnFormSubmit = async ( updatedData: Partial<DevFormFields> ) => {
    if ( !onFormSubmit ) return
    await onFormSubmit( updatedData )
  }

  return (
    <FormWrapper<DevFormFields>
      w='full'
      onSubmitCb={ handleOnFormSubmit }
      { ...{ inputFields } }
      { ...props }
    />
  )
}

export default DevFormComponent
