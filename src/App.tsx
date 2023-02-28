import React, { FC, useEffect, useState } from 'react'
import { Button, Heading, HStack, VStack } from '@chakra-ui/react'
import DevForm, { DevFormFields } from './forms/DevForm'

const AppComponent: FC = () => {
  const [ formSize, setFormSize ] = useState<string>( 'sm' )
  const [ data, setData ] = useState<Partial<DevFormFields> | null>( null )

  const handleFormSubmit = async ( data: Partial<DevFormFields> ) => {
    setData( data )
  }

  useEffect( () => {
    console.log( 'DATA UPDATE', data )
  }, [ data ] )

  return (
    <VStack w={ 'full' } justifyContent={ 'center' } spacing={ 6 } py={ 12 }>
      <Heading>Example Form</Heading>

      <HStack>
        <Button size={ 'sm' } onClick={ () => setFormSize( 'sm' ) }
                bg={ formSize === 'sm' ? 'burlywood' : 'initial' }>
          small
        </Button>
        <Button size={ 'sm' } onClick={ () => setFormSize( 'lg' ) }
                bg={ formSize === 'lg' ? 'burlywood' : 'initial' }>
          medium
        </Button>
        <Button size={ 'sm' } onClick={ () => setFormSize( '3xl' ) }
                bg={ formSize === '3xl' ? 'burlywood' : 'initial' }>
          large
        </Button>
      </HStack>

      <DevForm
        w={ formSize }
        bg={ 'white' }
        border={ '4px solid black' }
        borderRadius={ 12 }
        p={ 6 }
        onFormSubmit={ handleFormSubmit }
        data={ { input: formSize } }
      />
    </VStack>
  )
}

export default AppComponent
