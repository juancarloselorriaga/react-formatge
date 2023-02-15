import { useCallback, useState } from 'react'

type HookReturnType = [isButtonLoading: boolean, setButtonLoader: (bool: boolean) => void]

const useLoadingButton = (): HookReturnType => {
  const [isButtonLoading, setButtonLoading] = useState<boolean>(false)

  const setButtonLoader = useCallback((bool: boolean) => {
    setButtonLoading(bool)
    return
  }, [])

  return [isButtonLoading, setButtonLoader]
}

export default useLoadingButton
