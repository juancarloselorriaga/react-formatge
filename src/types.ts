import { ButtonProps, StackProps } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { IInputFieldProps } from './_components/InputField'
import { UpdateDataPayload } from './hooks/useFormUpdate'
import { FormItemWrapperProps } from './_layout/FormItemWrapper'

export type AllAllowed = string | number | undefined | Date | boolean | null | [Date, Date]

export interface FormSchemaAllAllowedObject {
  value: AllAllowed
  error: string
}

export interface FormSchemaValidation {
  required?: boolean
  validator?: {
    regEx: RegExp
    error: string
  }
  equalsField?: {
    field: string
    error: string
  }
}

export type OnFormSubmit<T> = (formData: T) => Promise<void> | void

export type RecordConstraints = string | number | symbol

export type FormWrapperProps<T, K, P> = StackProps & {
  inputFields: FormFieldType<T>[]
  onSubmitCb: (updatedData: P, formData: K) => Promise<void>
  buttonProps?: ButtonProps
  error?: any
  onUpdate?: (updatedData: Partial<P>) => Promise<void> | void
}

export type FormFieldType<T> = FormComponentField<T> | FormInputField<T>

export type FormFieldBaseType<T> = {
  name: T
  initialValue: AllAllowed
  validation?: FormSchemaValidation
}

export type FormField<T> = FormFieldBaseType<T> & {
  componentType: 'input'
}

export type FormComponentField<T> = FormFieldBaseType<T> & {
  componentType: 'component'
  component: ReactNode
} & FormItemWrapperProps

export type FormInputField<T> = FormField<T> &
  IInputFieldProps & {
    ref?: React.RefObject<HTMLInputElement>
    onValueChange?: (payload: UpdateDataPayload<string>) => void
  }

export type FormUpdatedData<T extends string | number | symbol> = Record<T, FormSchemaAllAllowedObject>

export interface FormComponent<T> {
  value?: T
  defaultValue?: T
  onUpdateValue?: (value: T) => void
}
