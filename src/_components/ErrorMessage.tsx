import React, { FC } from 'react'
import { Text } from '@chakra-ui/react'

interface IErrorMessage {
  errorMessage: string
}

const ErrorMessage: FC<IErrorMessage> = ({ errorMessage }) => {
  return (
    <>
      {errorMessage && (
        <Text color={'tomato'} mt={4} fontSize='sm'>
          {errorMessage}
        </Text>
      )}
    </>
  )
}

export default ErrorMessage
