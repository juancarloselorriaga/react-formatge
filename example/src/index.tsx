// @ts-ignore
import React from 'react'
// @ts-ignore
import App from './App'

import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'

const container = document.getElementById( 'root' )
const root = createRoot( container! )
root.render(
  <React.StrictMode>
    <ChakraProvider resetCSS>
      <App />
    </ChakraProvider>
  </React.StrictMode>
  ,
)
