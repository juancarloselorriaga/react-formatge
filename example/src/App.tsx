import React, { FC, useState } from 'react'
import { Button, Heading, HStack, VStack } from '@chakra-ui/react'
// @ts-ignore
import ExampleForm, { ExampleFormFields } from './ExampleForm'

const AppComponent: FC = () => {
  const [formSize, setFormSize] = useState<string>('sm')
  const [data, setData] = useState<ExampleFormFields | null>(null)

  return (
    <VStack w={'full'} justifyContent={'center'} spacing={6} py={12}>
      <Heading>Example Form</Heading>

      <HStack>
        <Button size={'sm'} onClick={() => setFormSize('sm')} bg={formSize === 'sm' ? 'burlywood' : 'initial'}>
          small
        </Button>
        <Button size={'sm'} onClick={() => setFormSize('lg')} bg={formSize === 'lg' ? 'burlywood' : 'initial'}>
          medium
        </Button>
        <Button size={'sm'} onClick={() => setFormSize('3xl')} bg={formSize === '3xl' ? 'burlywood' : 'initial'}>
          large
        </Button>
      </HStack>

      <ExampleForm
        w={formSize}
        bg={'white'}
        border={'4px solid black'}
        borderRadius={12}
        p={6}
        onFormSubmit={setData}
        data={data ?? undefined}
      />
    </VStack>
  )
}

export default AppComponent
