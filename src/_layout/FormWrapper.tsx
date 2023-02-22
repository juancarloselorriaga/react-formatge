import React, { Fragment, ReactElement, useMemo } from 'react'
import InputField from '../_components/InputField'
import FormContainer from './FormContainer'
import formSchema from '../form.schema'
import { AllAllowed, FormComponent, FormSchemaAllAllowedObject, FormWrapperProps, RecordConstraints } from '../types'
import useFormUpdate, { UpdateDataPayload } from '../hooks/useFormUpdate'
import FormItemWrapper from './FormItemWrapper'
import useDidUpdateEffect from '../hooks/useDidUpdateEffect'

function FormWrapper<T extends RecordConstraints, P>({
  inputFields,
  buttonProps,
  error,
  onSubmitCb,
  onUpdate,
  children,
  ...props
}: FormWrapperProps<T, Record<T, FormSchemaAllAllowedObject>, P>) {
  const { initialState, validationStateSchema } = formSchema<T>(inputFields)

  const { updatedData, handleUpdateData, handleOnSubmit, isLoading, isEnabled, cleanData } = useFormUpdate<
    Record<T, FormSchemaAllAllowedObject>,
    P
  >(initialState, validationStateSchema, onSubmitCb)

  const isButtonDisabled = useMemo(() => {
    // the parent can configure extra isDisabled conditions if it includes isDisabled with additional logginc
    if (buttonProps && 'isDisabled' in buttonProps) {
      return !isEnabled || buttonProps.isDisabled
    } else {
      return !isEnabled
    }
  }, [buttonProps, isEnabled])

  useDidUpdateEffect(() => {
    onUpdate && onUpdate(cleanData as Partial<P>)
  }, [cleanData])

  return (
    <FormContainer
      buttonProps={{
        ...buttonProps,
        isLoading,
        isDisabled: isButtonDisabled,
        onClick: handleOnSubmit,
      }}
      {...{ error }}
      {...props}
    >
      {inputFields.map((props) => (
        <Fragment key={props.name.toString()}>
          {(() => {
            switch (props.componentType) {
              case 'input': {
                // Warning disabled because we want to spread restOfProsps
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { componentType, initialValue, ...restOfProps } = props

                const { name, validation, value, onValueChange, ...restOfFieldProps } = restOfProps

                // if a value is passed, this will update its state within useFormUpdate hook
                if (typeof value === 'string' && updatedData[name].value !== value) {
                  handleUpdateData({ id: restOfFieldProps.id, name, value }).then()
                }

                return (
                  <InputField
                    isRequired={validation?.required}
                    value={updatedData[name].value?.toString() || ''}
                    error={updatedData[name].error}
                    {...restOfFieldProps}
                    onValueChange={(e: UpdateDataPayload<string>) => {
                      onValueChange && onValueChange(e)
                      handleUpdateData(e).then()
                    }}
                    {...{ name }}
                  />
                )
              }

              case 'component': {
                const { name, validation, label, helperText, error, noTopSpace, component, initialValue } = props
                const nameStr = name.toString()

                const clonedComponentProps: FormComponent<AllAllowed> = {
                  defaultValue: initialValue,
                  value: updatedData[name].value,
                  onUpdateValue: (value) =>
                    handleUpdateData({
                      id: nameStr,
                      name: nameStr,
                      value,
                    }),
                }

                return (
                  <FormItemWrapper
                    isRequired={validation?.required}
                    {...{
                      name,
                      label,
                      helperText,
                      error,
                      noTopSpace,
                    }}
                  >
                    {React.cloneElement(component as ReactElement, clonedComponentProps)}
                  </FormItemWrapper>
                )
              }

              default:
                return props as never
            }
          })()}
        </Fragment>
      ))}
      {children}
    </FormContainer>
  )
}

export default FormWrapper
