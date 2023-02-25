import React, { FC, useEffect, useState } from 'react'
import { Button, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import ExampleForm, { ExampleFormFields } from './ExampleForm'
// @ts-ignore
import { version } from '../package.json'

const AppComponent: FC = () => {
  const [ formSize, setFormSize ] = useState<string>( 'sm' )
  const [ data, setData ] = useState<Partial<ExampleFormFields> | null>( null )

  useEffect( () => {
    if ( data ) {
      console.dir( 'FORM DATA', data )
    }
  }, [ data ] )

  return (
    <VStack w={ 'full' } justifyContent={ 'center' } spacing={ 6 } py={ 12 }>
      <Heading>React Formatge</Heading>

      <HStack>
        <Button size={ 'sm' } onClick={ () => setFormSize( 'sm' ) } bg={ formSize === 'sm' ? 'burlywood' : 'initial' }>
          small
        </Button>
        <Button size={ 'sm' } onClick={ () => setFormSize( 'lg' ) } bg={ formSize === 'lg' ? 'burlywood' : 'initial' }>
          medium
        </Button>
        <Button size={ 'sm' } onClick={ () => setFormSize( '3xl' ) }
                bg={ formSize === '3xl' ? 'burlywood' : 'initial' }>
          large
        </Button>
      </HStack>

      <ExampleForm
        w={ formSize }
        bg={ 'white' }
        border={ '4px solid black' }
        borderRadius={ 12 }
        p={ 6 }
        onFormSubmit={ setData }
        data={ data ?? undefined }
      />

      <Text fontSize={ 'xs' }>{ version }</Text>
    </VStack>
  )
}

export default AppComponent
