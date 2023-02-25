import React, { Fragment, useMemo } from 'react'
import InputField from '../_components/InputField'
import FormContainer from './FormContainer'
import formSchema from '../form.schema'
import { AnyFormType, CustomComponentImplementation, FormWrapperProps, HandleUpdateDataPayload } from '../types'
import useFormUpdate from '../hooks/useFormUpdate'
import useDidUpdateEffect from '../hooks/useDidUpdateEffect'
import FormItemWrapper from './FormItemWrapper'


function FormWrapper<T>(
  {
    inputFields,
    buttonProps,
    error,
    onSubmitCb,
    onUpdate,
    children,
    ...props
  }: FormWrapperProps<T> ) {
  const { initialState, validationStateSchema } = formSchema<T>( inputFields )

  const {
    formData,
    updatedData,
    handleUpdateData,
    handleOnSubmit,
    isLoading,
    isEnabled,
  } = useFormUpdate<T>( initialState, validationStateSchema, onSubmitCb )


  const isButtonDisabled = useMemo( () => {
    // the parent can configure extra isDisabled conditions if it includes isDisabled with additional logginc
    if ( buttonProps && 'isDisabled' in buttonProps ) {
      return !isEnabled || buttonProps.isDisabled
    } else {
      return !isEnabled
    }
  }, [ buttonProps, isEnabled ] )

  useDidUpdateEffect( () => {
    onUpdate && onUpdate( updatedData as Partial<T> )
  }, [ updatedData ] )


  return (
    <FormContainer
      buttonProps={ {
        ...buttonProps,
        isLoading,
        isDisabled: isButtonDisabled,
        onClick: handleOnSubmit,
      } }
      { ...{ error } }
      { ...props }
    >
      { inputFields.map( ( props ) => (
        <Fragment key={ props.name.toString() }>
          { ( () => {
            switch ( props.componentType ) {
              case 'input': {
                const {
                  componentType,
                  initialValue,
                  name,
                  validation,
                  value,
                  onValueChange,
                  ...restOfProps
                } = props

                // if a value is passed, this will update its state within useFormUpdate hook
                if ( typeof value === 'string' && formData[name].value !== value ) {
                  handleUpdateData( { id: restOfProps.id, name, value } ).then()
                }

                return (
                  <InputField
                    isRequired={ validation?.required }
                    value={ formData[name].value?.toString() || '' }
                    error={ formData[name].error }
                    { ...restOfProps }
                    onValueChange={ ( payload: HandleUpdateDataPayload<T, string> ) => {
                      onValueChange && onValueChange( payload )
                      handleUpdateData( payload ).then()
                    } }
                    { ...{ name } }
                  />
                )
              }

              case 'component': {
                const { name, validation, label, helperText, error, noTopSpace, component, initialValue } = props

                const clonedComponentProps: CustomComponentImplementation<AnyFormType> = {
                  defaultValue: initialValue,
                  value: formData[name].value as AnyFormType,
                  onUpdateValue: ( value ) =>
                    handleUpdateData( {
                      id: name,
                      name,
                      value,
                    } ),
                }

                return (
                  <FormItemWrapper
                    isRequired={ validation?.required }
                    { ...{
                      name,
                      label,
                      helperText,
                      error,
                      noTopSpace,
                    } }
                  >
                    { React.cloneElement( component, clonedComponentProps ) }
                  </FormItemWrapper>
                )
              }

              default:
                return props as never
            }
          } )() }
        </Fragment>
      ) ) }
      { children }
    </FormContainer>
  )
}

export default FormWrapper
