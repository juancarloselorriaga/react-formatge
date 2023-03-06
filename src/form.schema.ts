// update these types when adding or removing fields
import { FormFieldType, FormSchemaUpdatedDataState, FormSchemaValidationState } from './types'

// update these objects when adding or removing fields
const formSchema = <T>(inputFields: FormFieldType<T>[]) => {
  const initialState = inputFields.reduce(
    (obj, item) => Object.assign(obj, { [item.name]: { value: item.initialValue, error: '' } }),
    {},
  )

  const validationStateSchema = inputFields.reduce(
    (obj, item) => Object.assign(obj, { [item.name]: item.validation || {} }),
    {},
  )

  return {
    initialState: initialState as FormSchemaUpdatedDataState<T>,
    validationStateSchema: validationStateSchema as FormSchemaValidationState<T>,
  }
}

export default formSchema
