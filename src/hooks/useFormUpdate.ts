import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import useLoadingButton from './useLoadingButton'

interface FormUpdateHook<T> {
  updatedData: T
  handleUpdateData: <K>(e: UpdateDataPayload<K>) => Promise<void>
  isEnabled: boolean
  handleOnSubmit: () => void
  isLoading: boolean
  resetData: () => void
  cleanData: Partial<T>
}

export type UpdateDataPayload<T> = { name: string; value: T; id?: string | null }

export default <T, K>(
  initialState: Record<string, unknown>,
  validationSchema: Record<string, unknown> = {},
  callback: (cleanData: K, updatedData: T) => Promise<void> = async () => undefined,
): FormUpdateHook<T> => {
  const [isLoading, setButtonLoader] = useLoadingButton()

  useEffect(() => {
    return () => {
      setButtonLoader(false)
    }
  }, [setButtonLoader])

  const [updatedData, setUpdatedData] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    initialState,
  )

  const [cleanData, setCleanData] = useReducer((state: any, newState: any) => ({ ...state, ...newState }), {})

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setNotValid] = useState<boolean>(false)
  const [isEnabled, setIsEnabled] = useState<boolean>(false)

  const validateState = useMemo(() => {
    return Object.keys(validationSchema).some((key) => {
      const isInputFieldRequired = (validationSchema as any)[key].required
      const stateValue = updatedData[key].value
      const stateError = updatedData[key].error

      return (isInputFieldRequired && !stateValue) || stateError
    })
  }, [updatedData, validationSchema])

  useEffect(() => {
    setIsEnabled(!validateState)
  }, [updatedData, validateState, setIsEnabled])

  const handleUpdateData = useCallback(
    async <R>(e: UpdateDataPayload<R>) => {
      const { name, value, id } = e
      setNotValid(true)

      let error = ''
      if ((validationSchema as any)[name].required) {
        if (!value) {
          error = 'required'
        }
      }
      if (!(validationSchema as any)[name].validator && (validationSchema as any)[name].equalsField) {
        if (value !== updatedData[(validationSchema as any)[name].equalsField.field].value) {
          error = (validationSchema as any)[name].equalsField.error
        }

        setUpdatedData({ [name]: { value, error, id } })
        setCleanData({ [name]: value })
      }

      if (
        (validationSchema as any)[name].validator !== null &&
        typeof (validationSchema as any)[name].validator === 'object'
      ) {
        if (value && !(validationSchema as any)[name].validator.regEx.test(value)) {
          error = (validationSchema as any)[name].validator.error
        }
      }

      setUpdatedData({ [name]: { value, error, id } })
      setCleanData({ [name]: value })
    },
    [validationSchema, updatedData],
  )

  const handleOnSubmit = useCallback(async () => {
    setButtonLoader(true)
    setIsEnabled(false)

    if (!validateState) {
      try {
        await callback(cleanData, updatedData)
      } catch (error) {
        console.log('Form submit error', error)
      }

      setButtonLoader(false)
    }
  }, [setButtonLoader, validateState, callback, cleanData, updatedData])

  const resetData = useCallback(() => {
    setUpdatedData(initialState)
  }, [initialState])

  return {
    updatedData,
    handleUpdateData,
    isEnabled,
    handleOnSubmit,
    isLoading,
    resetData,
    cleanData,
  }
}
