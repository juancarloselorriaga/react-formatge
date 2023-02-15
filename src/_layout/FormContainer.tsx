import React, { FC } from 'react'
import { Box, Button, ButtonProps, Flex, Stack, Text } from '@chakra-ui/react'

interface IFormContainer {
  buttonProps?: ButtonProps
  error?: string
  children?: any
}

const FormContainer: FC<IFormContainer> = ({ error, children, buttonProps, ...props }) => {
  return (
    <Stack direction='column' spacing={4} w={300} {...props}>
      {children}

      {buttonProps && (
        <Flex justifyContent='flex-end' pt={4}>
          <Button {...buttonProps} />
        </Flex>
      )}

      {error && (
        <Box my={2} w='100%'>
          <Text textAlign='right' color='status.error'>
            Something went wrong: {error}
          </Text>
        </Box>
      )}
    </Stack>
  )
}

export default FormContainer
