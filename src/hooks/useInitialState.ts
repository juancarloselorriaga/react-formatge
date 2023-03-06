import InitialState from '../InitialState'
import { useEffect } from 'react'
import { FormSchemaUpdatedDataState } from '../types'

const useInitialState = <T>(
  initialState: FormSchemaUpdatedDataState<T>,
  resetDataCb: () => void,
  { paused }: { paused: boolean },
) => {
  const resetInitialState = () => InitialState.setInitialState(JSON.stringify(initialState))

  useEffect(() => {
    resetInitialState()
  }, [])

  useEffect(() => {
    if (JSON.stringify(initialState) !== InitialState.getInViewFormInitialState()) {
      if (!paused) {
        resetDataCb()
        resetInitialState()
      }
    }
  }, [initialState])
}

export default useInitialState
