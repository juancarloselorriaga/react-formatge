# React Formatge

[![NPM version][npm-image]][npm-url]
[![Build][github-build]][github-build-url]
![npm-typescript]
[![License][github-license]][github-license-url]

The declarative library for creating quick and full-featured react forms based on Chakra UI components.

## Live demo:

[**React Formatge Live Demo**](https://juancarloselorriaga.github.io/react-formatge/)

## Installation:

```bash
npm install react-formatge --save
```

or

```bash
yarn add react-formatge
```

## Important notes:

This package will only work in a [ChakraUI](https://chakra-ui.com/) project, and it will also
need [date-fns](https://www.npmjs.com/package/date-fns)
and [react-date-range](https://www.npmjs.com/package/react-date-range)

````bash
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion react-date-range date-fns
````

After installing these dependencies, wrap your main app with ChakraProvider

### Wrap with the provider

Complete instructions in [ChakraUI Getting Started](https://chakra-ui.com/getting-started)

````js
import * as React from 'react'

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'


function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      <TheRestOfYourApplication/>
    </ChakraProvider>
  )
}
````

## Usage :

Form encapsulation in a single component will return the form data on submit.

```tsx
// App.ts
const App: FC = () => {
  const [ data, setData ] = useState<Partial<ExampleFormFields> | null>( null )

  return (
    <ExampleForm onFormSubmit={ setData } />
  )
}

export default App

```

Basic example on how we declare the fields of a form.

```tsx
// ExampleForm.ts
export type ExampleFormFields = {
  name: string
  email: string
}

interface ExampleFormComponentProps extends StackProps {
  data?: ExampleFormFields
  onFormSubmit: OnFormSubmit<ExampleFormFields>
}

const ExampleFormComponent: FC<ExampleFormComponentProps> = ( { data, onFormSubmit, ...props } ) => {
  const inputFields: FormFieldType<ExampleFormFields>[] = [
    {
      componentType: 'input',
      name: 'name',
      label: 'name',
      initialValue: '',
    },
    {
      componentType: 'input',
      name: 'email',
      label: 'email',
      initialValue: '',
    },
  ]

  const buttonProps = {
    children: 'Save',
  }

  const handleOnFormSubmit = async ( updatedData: ExampleFormFields ) => await onFormSubmit( updatedData )

  return (
    <FormWrapper<ExampleFormFields>
      onSubmitCb={ handleOnFormSubmit }
      { ...{ inputFields, buttonProps } }
      { ...props }
    />
  )
}

export default ExampleFormComponent

```

### Pass additional props to the input fields

````tsx
const inputFields = [
  {
    componentType: 'input',
    name: 'password',
    label: 'password',
    // pass additional props to the field to customize it
    placeholder: 'type the password',
    type: 'password',
    // The optional "helperText" let us pass tips or explanations to the user
    helperText: 'This password let the user log in securely',
    // the initialState is mandatory.
    initialValue: '',
  },
]
````

### Validate fields and mark them as required

The form won't enable the button until all the fields marked as required are correctly set

````tsx
const inputFields = [
  {
    componentType: 'input',
    name: 'email',
    label: 'email',
    initialValue: '',
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
]
````

### Create textarea components

````tsx
const inputFields = [
  {
    componentType: 'input',
    name: 'description',
    label: 'description',
    // we can set fields as texareas
    textarea: true,
    noOfLines: 4,
    placeholder: 'type an optional description',
    initialValue: '',
  },
]
````

### Match fields

````tsx
const inputFields = [
  {
    componentType: 'input',
    name: 'password',
    label: 'password',
    type: 'password',
    initialValue: '',
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
]
````

### Affect the value of other fields

Passing an onValueChange prop to modify another field or the same field by passing the value prop again

````tsx
const inputFields = [
  {
    componentType: 'input',
    name: 'name',
    label: 'name',
    placeholder: 'type the name',
    // a field can affect the value of another component field
    onValueChange: ( payload ) => setSlug( slugify( payload.value ) ),
    initialValue: '',
  },

  {
    componentType: 'input',
    name: 'slug',
    label: 'slug',
    placeholder: 'type the slug',
    // a field can affect its own value
    onValueChange: ( payload ) => setSlug( slugify( payload.value ) ),
    // And then passing the custom value again as "value"
    value: slug,
  },
]
````

### Additional built-in components

````tsx

const inputFields = [
  {
    name: 'isEnabled',
    componentType: 'component',
    label: 'simple checkbox',
    helperText: 'This checkboxes can enable or disable functionality',
    initialValue: false,
    // We can use onChange to use the value outside the form
    component: (
      <CheckboxComponent onChange={ ( e ) => console.log( 'The component can still return the event ->', e ) }>
        is enabled
      </CheckboxComponent>
    ),
  },

  {
    componentType: 'component',
    name: 'date',
    initialValue: new Date(),
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
    initialValue: [ new Date(), new Date() ],
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

````


### Creating your own React-Formatge extension components

You can create your own extension components with custom logic, it's simple! You just have to implement the
CustomComponentImplementation<any> type on your custom component like so:

````tsx

import React, { FC } from 'react'
import { Checkbox, CheckboxProps } from '@chakra-ui/react'
import { CustomComponentImplementation } from '../types'

type CheckboxComponentProps = CheckboxProps & CustomComponentImplementation<boolean>

const CheckboxComponent: FC<CheckboxComponentProps> = (
  {
    value,
    onUpdateValue,
    onChange,
    defaultValue,
    ...props
  } ) => {
  
  return (
    <Checkbox
      defaultChecked={ defaultValue }
      isChecked={ value }
      onChange={ ( e ) => {
        onUpdateValue && onUpdateValue( e.target.checked )
        // preserve the default onChange events
        onChange && onChange( e )
      } }
      { ...props }
    />
  )
}

export default CheckboxComponent

````

### Affect the button behaviour

Passing "isDisabled" to the props will let you handle and extend the conditions to disable the submit button.

````tsx
  const buttonProps = {
  isDisabled: true, // any boolean logic
  children: 'Save'  // The children of the buttons can be a component or a label string
}
````

### Overwrite default buttons

1. Passing updating the buttonProps to hide the default component.
2. Pass a callback to "onUpdate" to FormWrapper component to set your state
3. Use the button state or the updated form data with custom logic

````tsx

const [ formUpdate, setFormUpdate ] = useState<FormUpdatePayload<DevFormFields> | null>( null )

const buttonProps = {
  display: 'none', // 1.
}

return (
  <VStack { ...props }>
    <FormWrapper<DevFormFields>
      onSubmitCb={ handleOnFormSubmit }
      onUpdate={ setFormUpdate } // 2.
      { ...{ inputFields, buttonProps } }
    />
    <HStack w={ 'full' } justify={ 'flex-end' }>
      <Button
        colorScheme={ 'red' }
        variant={ 'ghost' }>
        Cancel
      </Button>
      <Button
        isDisabled={ !formUpdate?.isEnabled } // 3.
        onClick={ () => formUpdate && handleOnFormSubmit( formUpdate.updatedData ) } // 3.
      >
        Accept
      </Button>
    </HStack>
  </VStack>
)
````



[npm-url]: https://www.npmjs.com/package/react-formatge

[npm-image]: https://img.shields.io/npm/v/react-formatge

[github-license]: https://img.shields.io/github/license/juancarloselorriaga/react-formatge

[github-license-url]: https://github.com/juancarloselorriaga/react-formatge/blob/master/LICENSE

[github-build]: https://github.com/juancarloselorriaga/react-formatge/actions/workflows/publish.yml/badge.svg

[github-build-url]: https://github.com/juancarloselorriaga/react-formatge/actions/workflows/publish.yml

[npm-typescript]: https://img.shields.io/npm/types/react-formatge