import { useEffect, useState } from 'react'

type HookReturnType = [isButtonLoading: boolean, setButtonLoader: (bool: boolean) => void]

const useLoadingButton = (): HookReturnType => {
  const [isButtonLoading, setButtonLoading] = useState<boolean>(false)

  useEffect(() => {
    return () => {
      setButtonLoading(false)
    }
  }, [setButtonLoading])

  return [isButtonLoading, setButtonLoading]
}

export default useLoadingButton
