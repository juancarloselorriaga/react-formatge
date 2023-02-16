import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'

const root = ReactDOM.createRoot( document.getElementById( 'root' ) as HTMLElement )
root.render(
  <React.StrictMode>
    <ChakraProvider resetCSs>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)