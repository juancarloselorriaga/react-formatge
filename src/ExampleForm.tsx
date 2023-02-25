import React, { FC, useState } from 'react'
import { StackProps } from '@chakra-ui/react'

import {
  CheckboxComponent,
  DatePickerComponent,
  DateRangePickerComponent,
  formValidationRgx,
  FormWrapper,
  slugify,
} from 'react-formatge'
import { FormFieldType, OnFormSubmit } from 'react-formatge/dist/cjs/types'

export type ExampleFormFields = {
  simpleField: string
  name: string
  email: string
  description: string
  slug: string
  age: string
  password: string
  isEnabled: boolean
  date: Date
  repeatPassword: string
  rangeDate: [ Date, Date ]
}

type PartialFields = Partial<ExampleFormFields>
interface ExampleFormComponentProps extends StackProps {
  data?: PartialFields
  onFormSubmit: OnFormSubmit<PartialFields>
}

const ExampleFormComponent: FC<ExampleFormComponentProps> = ( { data, onFormSubmit, ...props } ) => {
  // We can pass default values coming from already set information or empty values
  const defaultValues = {
    simpleField: data?.simpleField || '',
    name: data?.name || '',
    email: data?.email || '',
    slug: data?.slug || '',
    description: data?.description || '',
    date: data?.date ? new Date( data.date ) : new Date(),
    age: data?.age || 25,
    isEnabled: !!data?.isEnabled,
    rangeDate: data?.rangeDate || [ new Date(), new Date() ],
  }

  const [ slug, setSlug ] = useState<string>( defaultValues.slug )

  const inputFields: FormFieldType<ExampleFormFields>[] = [
    {
      componentType: 'input',
      name: 'simpleField',
      label: 'simple field',
      initialValue: defaultValues.simpleField,
    },

    {
      componentType: 'input',
      name: 'name',
      label: 'name',
      placeholder: 'type the name',
      // a field can affect the value of ancomponent field
      onValueChange: ( payload ) => setSlug( slugify( payload.value ) ),
      // the initialState is mandatory.
      initialValue: defaultValues.name,
      validation: {
        // We can set the field as required
        required: true,
        // We can pass an optional validator with a custom error message
        validator: {
          regEx: formValidationRgx.validCharsWithLimit( 30 ),
          error: 'The character limit is 30',
        },
      },
    },

    {
      componentType: 'input',
      name: 'slug',
      label: 'slug',
      placeholder: 'type the slug',
      // We can trigger custom on change events throug "onValueChange"
      onValueChange: ( payload ) => setSlug( slugify( payload.value ) ),
      // And then passing the custom value again as "value"
      value: slug,
      // The optional "helperText" let us pass tips or explanations to the user
      helperText: 'The slug is the unique path in the URL (i.e. /blog/my-new-blog)',
      initialValue: defaultValues.slug,
      validation: {
        required: true,
      },
    },

    {
      componentType: 'input',
      name: 'email',
      label: 'email',
      placeholder: 'type the email',
      helperText: 'Login mail',
      initialValue: defaultValues.email,
      validation: {
        // We can set the field as required
        required: true,
        // We can pass an optional validator with a custom error message
        validator: {
          regEx: formValidationRgx.email,
          error: 'Invalid email format',
        },
      },
    },

    {
      componentType: 'input',
      name: 'description',
      label: 'description',
      // we can set fields as texareas
      textarea: true,
      noOfLines: 4,
      placeholder: 'type an optional description',
      initialValue: defaultValues.description,
    },

    {
      componentType: 'input',
      name: 'age',
      label: 'age',
      type: 'number',
      initialValue: defaultValues.age,
    },

    {
      componentType: 'input',
      name: 'password',
      label: 'password',
      type: 'password',
      initialValue: '',
      validation: {
        required: true,
        validator: {
          regEx: formValidationRgx.limitChars( 8, 15 ),
          error: 'The password must be between 8 and 15 valid characters.',
        },
      },
    },

    {
      name: 'repeatPassword',
      componentType: 'input',
      label: 'new password',
      helperText: 'this field should match password',
      type: 'password',
      initialValue: null,
      validation: {
        required: true,
        equalsField: {
          field: 'password',
          error: 'No match',
        },
      },
    },

    {
      name: 'isEnabled',
      componentType: 'component',
      label: 'simple checkbox',
      helperText: 'This checkboxes can enable or disable functionality',
      initialValue: defaultValues.isEnabled,
      // The component should implement FormComponent<T> to receive the values from the form.
      // We can use the onChangeProperty to use the value outside the form
      component: (
        <CheckboxComponent onChange={ ( e ) => console.log( 'The component can still return a value ->', e ) }>
          is enabled
        </CheckboxComponent>
      ),
    },

    {
      componentType: 'component',
      name: 'date',
      initialValue: defaultValues.date,
      label: 'date',
      helperText: 'Single date selector',
      component: <DatePickerComponent title={ 'Pick a date' } />,
      validation: {
        required: true,
      },
    },

    {
      componentType: 'component',
      name: 'rangeDate',
      initialValue: defaultValues.rangeDate,
      label: 'start and end date',
      helperText: 'Range date selector',
      // We can handle data outside the form
      component: (
        <DateRangePickerComponent
          title={ 'pick the start and end date' }
          onChange={ ( range: [ Date, Date ] ) => console.log( 'This component returns the value ->', range ) }
        />
      ),
      validation: {
        required: true,
      },
    },
  ]

  const buttonProps = {
    children: 'Save',
  }

  const handleOnFormSubmit = async ( updatedData: PartialFields ) => await onFormSubmit( updatedData )

  return (
    <FormWrapper<ExampleFormFields>
      onSubmitCb={ handleOnFormSubmit }
      { ...{ inputFields, buttonProps } }
      { ...props }
    />
  )
}

export default ExampleFormComponent
