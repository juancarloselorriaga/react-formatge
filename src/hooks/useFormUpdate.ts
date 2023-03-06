import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import useLoadingButton from './useLoadingButton'
import { FormSchemaUpdatedDataState, FormSchemaValidationState, HandleUpdateDataPayload } from '../types'

export interface FormUpdateHook<T> {
  formData: FormSchemaUpdatedDataState<T>
  updatedData: Partial<T>
  handleUpdateData: <K>( payload: HandleUpdateDataPayload<T, K> ) => Promise<void>
  isEnabled: boolean
  handleOnSubmit: () => void
  isLoading: boolean
  resetData: () => void
}

const useFormUpdate = <T>(
  initialState: FormSchemaUpdatedDataState<T>,
  validationSchema: FormSchemaValidationState<T>,
  callback: ( updatedData: Partial<T>, formData: FormSchemaUpdatedDataState<T> )
    => void | Promise<void> = () => undefined,
): FormUpdateHook<T> => {

  const [ isLoading, setButtonLoading ] = useLoadingButton()
  const [ isEnabled, setIsEnabled ] = useState<boolean>( false )

  const [ formData, setFormData ] = useReducer(
    (
      state: FormSchemaUpdatedDataState<T>,
      newState: FormSchemaUpdatedDataState<T>,
    ) => ( { ...state, ...newState } ), initialState )

  const [ updatedData, setUpdatedData ] = useReducer( (
    state: Partial<T>,
    newState: Partial<T> | null,
  ) => {
    if ( newState === null ) {
      return {}
    } else {
      return ( { ...state, ...newState } )
    }
  }, {} )


  const isStateValid = useMemo( () => {
    return Object.keys( validationSchema ).some( ( key ) => {
      const k = key as keyof T
      const isRequired = validationSchema[k].required

      try {
        const { value, error } = formData[k]
        return ( isRequired && !value ) || error
      } catch {
        return false
      }
    } )
  }, [ formData, validationSchema ] )

  useEffect( () => {
    setIsEnabled( !isStateValid )
  }, [ isStateValid, setIsEnabled ] )

  const handleUpdateData = useCallback( async <K>( payload: HandleUpdateDataPayload<T, K> ) => {
      const { name, value, id } = payload
      const { required: isRequired, equalsField, validator } = validationSchema[name as keyof T]
      const isValueString = typeof value === 'string'
      const updatedDataPayload = { [name]: value } as Partial<T>
      let error = ''

      if ( isRequired && !value ) {
        error = 'required'
      }

      if ( !validator && equalsField ) {
        if ( value !== formData[equalsField.field].value ) {
          error = equalsField.error
        }

        const formDataPayload = { [name]: { value, error, id } } as FormSchemaUpdatedDataState<T>
        setFormData( formDataPayload )
        setUpdatedData( updatedDataPayload )
      }


      if ( validator ) {
        if ( isValueString && !validator.regEx.test( value ) ) {
          error = validator.error
        }
      }

      const formDataPayload = { [name]: { value, error, id } } as FormSchemaUpdatedDataState<T>
      setFormData( formDataPayload )
      setUpdatedData( updatedDataPayload )
    },
    [ validationSchema, formData ],
  )

  const handleOnSubmit = useCallback( async () => {
    setButtonLoading( true )

    if ( !isStateValid ) {
      try {
        await callback( updatedData, formData )
      } catch ( error ) {
        console.warn( 'Form submit error', error )
      }

      setButtonLoading( false )
    }
  }, [ setButtonLoading, isStateValid, callback, updatedData, formData ] )

  const resetData = useCallback( () => {
    setFormData( initialState )
    setUpdatedData( null )
  }, [ initialState ] )

  return {
    formData,
    updatedData,
    handleUpdateData,
    isEnabled,
    handleOnSubmit,
    isLoading,
    resetData,
  }
}

export default useFormUpdate