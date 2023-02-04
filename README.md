# React Formatge

[![NPM version][npm-image]][npm-url]
[![Build][github-build]][github-build-url]
![npm-typescript]
[![License][github-license]][github-license-url]

The declarative library for creating quick and full-featured react forms.

[**Live Demo**](https://juancarloselorriaga.github.io/react-formatge/)

## Installation:

```bash
npm install react-formatge --save-dev
```

or

```bash
yarn add -D react-formatge
```

## Usage :

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelloWorld } from 'my-formatge'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
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

```

[npm-url]: https://www.npmjs.com/package/react-formatge
[npm-image]: https://img.shields.io/npm/v/react-formatge
[github-license]: https://img.shields.io/github/license/juancarloselorriaga/react-formatge
[github-license-url]: https://github.com/juancarloselorriaga/react-formatge/blob/master/LICENSE
[github-build]: https://github.com/juancarloselorriaga/react-formatge/actions/workflows/publish.yml/badge.svg
[github-build-url]: https://github.com/juancarloselorriaga/react-formatge/actions/workflows/publish.yml
[npm-typescript]: https://img.shields.io/npm/types/react-formatge