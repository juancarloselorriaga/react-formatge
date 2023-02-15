# React Formatge

[![NPM version][npm-image]][npm-url]
[![Build][github-build]][github-build-url]
![npm-typescript]
[![License][github-license]][github-license-url]

The declarative library for creating quick and full-featured react forms.

[**Live Demo**](https://juancarloselorriaga.github.io/react-formatge/)

## Installation:

```bash
npm install react-formatge --save
```

or

```bash
yarn add react-formatge
```

## Usage :

Form encapsulation in a single component will return the form data on submit.

```js
// App.ts
const App: FC = () => {
  const [data, setData] = useState<ExampleFormFields | null>(null)

  return (
    <ExampleForm onFormSubmit={setData} />
  )
}

export default App

```

Basic example on how we declare the fields of a form.

```js
// ExampleForm.ts
const ExampleFormComponent: FC<ExampleFormComponentProps> = ({ data, onFormSubmit, ...props }) => {
  const inputFields: FormFieldType<ExampleFormKeys>[] = [
    {
      componentType: 'input',
      name: 'name',
      label: 'name',
      initialValue: defaultValues.name,
    },
    {
      componentType: 'input',
      name: 'email',
      label: 'email',
      initialValue: defaultValues.email,
    },
  ]

  const handleOnFormSubmit = async (updatedData: ExampleFormFields) => {
    await onFormSubmit(updatedData)
  }

  return (
    <FormWrapper
          onSubmitCb={handleOnFormSubmit}
          {...{ inputFields }}
          {...props}
    />
  )
}

export default ExampleFormComponent

```

[npm-url]: https://www.npmjs.com/package/react-formatge
[npm-image]: https://img.shields.io/npm/v/react-formatge
[github-license]: https://img.shields.io/github/license/juancarloselorriaga/react-formatge
[github-license-url]: https://github.com/juancarloselorriaga/react-formatge/blob/master/LICENSE
[github-build]: https://github.com/juancarloselorriaga/react-formatge/actions/workflows/publish.yml/badge.svg
[github-build-url]: https://github.com/juancarloselorriaga/react-formatge/actions/workflows/publish.yml
[npm-typescript]: https://img.shields.io/npm/types/react-formatge