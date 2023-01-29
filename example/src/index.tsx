// @ts-ignore
import React from 'react'
import { HelloWorld } from 'react-formatge'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <React.StrictMode>
    <div>
      <h2>Default counter</h2>
      <HelloWorld />
    </div>
    <hr />
    <div>
      <h2>Counter with predefined value</h2>
      <HelloWorld value={5} />
    </div>
  </React.StrictMode>,
)
