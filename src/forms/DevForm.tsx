import { Button, HStack, StackProps, VStack } from '@chakra-ui/react'
import { FormFieldType, FormUpdatePayload, OnFormSubmit } from '../types'
import React, { FC, useState } from 'react'
import FormWrapper from '../_layout/FormWrapper'

export type DevFormFields = {
  field: string
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
      name: 'field',
      label: 'field',
      initialValue: data?.field || '',
      validation: {
        required: true,
      },
    },
  ]

  const handleOnFormSubmit = async ( updatedData: Partial<DevFormFields> ) => {
    if ( !onFormSubmit ) return
    await onFormSubmit( updatedData )
  }

  const buttonProps = {
    display: 'none',
  }

  const [ formUpdate, setFormUpdate ] = useState<FormUpdatePayload<DevFormFields> | null>( null )

  return (
    <VStack { ...props }>
      <FormWrapper<DevFormFields>
        onSubmitCb={ handleOnFormSubmit }
        onUpdate={ setFormUpdate }
        { ...{ inputFields, buttonProps } }
      />
      <HStack w={ 'full' } justify={ 'flex-end' }>
        <Button
          colorScheme={ 'red' }
          variant={ 'ghost' }>
          Cancel
        </Button>
        <Button
          isDisabled={ !formUpdate?.isEnabled }
          onClick={ () => formUpdate && handleOnFormSubmit( formUpdate.updatedData ) }
        >
          Accept
        </Button>
      </HStack>
    </VStack>
  )
}

export default DevFormComponent
