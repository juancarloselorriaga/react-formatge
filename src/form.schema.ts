// update these types when adding or removing fields
import { FormFieldType, FormSchemaAllAllowedObject, FormSchemaValidation, RecordConstraints } from './types'

// update these objects when adding or removing fields
const formSchema = <T extends RecordConstraints>(inputFields: FormFieldType<T>[]) => {
  return {
    initialState: inputFields.reduce(
      (obj, item) => Object.assign(obj, { [item.name]: { value: item.initialValue, error: '' } }),
      {},
    ) as Record<T, FormSchemaAllAllowedObject>,
    validationStateSchema: inputFields.reduce(
      (obj, item) => Object.assign(obj, { [item.name]: item.validation || {} }),
      {},
    ) as Record<T, FormSchemaValidation>,
  }
}

export default formSchema
