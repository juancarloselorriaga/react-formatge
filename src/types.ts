import { ButtonProps, StackProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { InputFieldProps } from './_components/InputField'
import { FormItemWrapperProps } from './_layout/FormItemWrapper'
import { FormUpdateHook } from './hooks/useFormUpdate'
import { IOption } from './_components/OptionSelection/OptionSelection'

export type AnyFormType = string | number | undefined | boolean | null | Date | [ Date, Date ] | IOption[]

// ********* Schemas **********
export interface FormSchemaUpdatedData<T> {
  value: T
  error: string
  id?: string | null
}

export interface FormSchemaValidation<T> {
  required?: boolean
  validator?: {
    regEx: RegExp
    error: string
  }
  equalsField?: {
    field: keyof T
    error: string
  }
}

// ********* Hooks **********
export type FormSchemaUpdatedDataState<T> = Record<keyof T, FormSchemaUpdatedData<unknown>>
export type FormSchemaValidationState<T> = Record<keyof T, FormSchemaValidation<T>>
export type HandleUpdateDataPayload<T, K> = {
  name: keyof T
  value: K
  id?: string | null
}

// ********* Forms **********
export type OnFormSubmit<T> = (formData: T) => Promise<void> | void

//********** Form Wrapper ***********
export type FormUpdatePayload<T> = Pick<FormUpdateHook<T>, 'updatedData' | 'isEnabled'> & {
  formId?: string
}

export type FormWrapperProps<T> = StackProps & {
  inputFields: FormFieldType<T>[]
  onSubmitCb?: (updatedData: Partial<T>, formData: FormSchemaUpdatedDataState<T>) => Promise<void>
  buttonProps?: ButtonProps
  error?: string
  onUpdate?: (payload: FormUpdatePayload<T>) => void | Promise<void>
  // property passed to be
  followInitialState?: boolean
  formId?: string
}

//********** Form Fields ***********
export type FormFieldBaseType<T> = {
  name: keyof T
  initialValue: AnyFormType
  validation?: FormSchemaValidation<T>
}

export type FormFieldType<T> = ComponentFormField<T> | InputFormField<T>

export type ComponentFormField<T> = FormFieldBaseType<T> &
  FormItemWrapperProps & {
    componentType: 'component'
    component: ReactElement<CustomComponentImplementation<AnyFormType>>
  }

export type InputFormField<T> = FormFieldBaseType<T> &
  InputFieldProps & {
    componentType: 'input'
    ref?: React.RefObject<HTMLInputElement>
    onValueChange?: (payload: HandleUpdateDataPayload<T, string>) => void
  }

//********** Custom or Extra Components ***********
// A component should extend this type in order to make an integration with the form
export interface CustomComponentImplementation<T> {
  value?: T
  defaultValue?: T
  onUpdateValue?: (value: T) => void
}
