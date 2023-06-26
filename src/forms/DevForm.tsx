import { StackProps } from '@chakra-ui/react'
import { FormFieldType, OnFormSubmit } from '../types'
import React, { FC } from 'react'
import FormWrapper from '../_layout/FormWrapper'

export type DevFormFields = {
  name: string
  title: string
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
      name: 'name',
      componentType: 'input',
      label: 'Name',
      placeholder: 'Enter name',
      initialValue: '',
    },
    {
      name: 'title',
      componentType: 'input',
      label: 'Title',
      placeholder: 'Enter title',
      initialValue: '',

    },
    {
      name: 'description',
      componentType: 'input',
      label: 'Description',
      placeholder: 'Enter description',
      initialValue: '',
    },
  ]

  const handleOnFormSubmit = async ( updatedData: Partial<DevFormFields> ) => {
    if ( !onFormSubmit ) return
    await onFormSubmit( updatedData )
  }

  return (
    <FormWrapper<DevFormFields>
      w='full'
      bg='red'
      maxH={ 200 }
      flexWrap='wrap'
      sx={{
        '.rf__input-field-wrapper': {
          w: 'auto',
          mt: 0
        }
      }}
      onSubmitCb={ handleOnFormSubmit }
      { ...{ inputFields } }
      { ...props }
    />
  )
}

export default DevFormComponent
