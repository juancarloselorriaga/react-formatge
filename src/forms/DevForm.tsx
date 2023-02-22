import { Button, HStack, StackProps, VStack } from '@chakra-ui/react'
import { FormFieldType, OnFormSubmit } from '../types'
import React, { FC, useState } from 'react'
import FormWrapper from '../_layout/FormWrapper'

export type DevFormFields = {
  field: string
}

type DevFormKeys = keyof DevFormFields

interface DevFormComponentProps extends StackProps {
  data?: DevFormFields
  onFormSubmit?: OnFormSubmit<Partial<DevFormFields>>
  error?: any
  buttonLabel?: string
}

const DevFormComponent: FC<DevFormComponentProps> = ( { data, buttonLabel, onFormSubmit, ...props } ) => {
  const [ updatedFormData, setUpdatedFormData ] = useState<Partial<DevFormFields> | null>( null )

  const inputFields: FormFieldType<DevFormKeys>[] = [
    {
      componentType: 'input',
      name: 'field',
      label: 'field',
      initialValue: data?.field || ''
    }
  ]

  const buttonProps = {
    display: 'none'
  }

  const handleOnFormSubmit = async ( updatedData: Partial<DevFormFields> ) => {
    if ( !onFormSubmit ) return
    await onFormSubmit( updatedData )
  }

  return (
      <VStack { ...props }>
        <FormWrapper<DevFormKeys, DevFormFields>
            onSubmitCb={ handleOnFormSubmit }
            onUpdate={ setUpdatedFormData }
            { ...{ inputFields, buttonProps } }
        />
        <HStack w={ 'full' } justify={ 'flex-end' }>
          <Button colorScheme={ 'red' } variant={ 'ghost' }>
            Cancel
          </Button>
          <Button onClick={ () =>
              updatedFormData && handleOnFormSubmit( updatedFormData ) }>
            Accept
          </Button>
        </HStack>
      </VStack>

  )
}

export default DevFormComponent
