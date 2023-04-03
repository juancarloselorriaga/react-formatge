import { StackProps } from '@chakra-ui/react'
import { FormFieldType, OnFormSubmit } from '../types'
import React, { FC } from 'react'
import FormWrapper from '../_layout/FormWrapper'
import DateRangePickerComponent from '../_components/DateComponents/DateRangePickerComponent'

export type DevFormFields = {
  dates: [Date, Date]
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
      name: 'dates' as const,
      componentType: 'component' as const,
      label: 'Start and end date',
      initialValue: [ new Date(), new Date() ] as [ Date, Date ],
      validation: {
        required: false,
      },
      component: (
        <DateRangePickerComponent
          isDisabled
          title={ 'Start and end date' }
        />
      ),

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
