import { StackProps } from '@chakra-ui/react'
import { FormFieldType, OnFormSubmit } from '../types'
import React, { FC } from 'react'
import FormWrapper from '../_layout/FormWrapper'
import MultipleOptionSelectionComponent from '../_components/OptionSelection/MultipleOptionSelectionComponent'
import { IOption } from '../_components/OptionSelection/OptionSelection'

export type DevFormFields = {
  selected: IOption[]
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
      name: 'selected',
      componentType: 'component',
      label: 'Status',
      initialValue: [ { label: 'New', value: 'NEW' }, { label: 'Planned', value: 'PLANNED' } ],
      validation: {
        required: false,
      },
      component: (
        <MultipleOptionSelectionComponent
          items={
            [
              { label: 'New', value: 'NEW' },
              { label: 'Planned', value: 'PLANNED' },
              { label: 'Started', value: 'STARTED' },
              { label: 'Done', value: 'DONE' },
              { label: 'New1', value: 'NEW1' },
              { label: 'Planned1', value: 'PLANNED1' },
              { label: 'Started1', value: 'STARTED1' },
              { label: 'Done1', value: 'DONE1' },
              { label: 'New2', value: 'NEW2' },
              { label: 'Planned2', value: 'PLANNED2' },
              { label: 'Started2', value: 'STARTED2' },
              { label: 'Done2', value: 'DONE2' },

            ] }
        />
      ),
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
