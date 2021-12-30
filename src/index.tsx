import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import App from './App'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'

import { Dict } from '@chakra-ui/utils'

import './index.css'
import '@fontsource/inter/variable.css'

/*
Chakra UI

Theme customization
 */
const styles = {
  global: (props: Dict) => ({
    'html, body': {
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('white', 'neutral.900')(props),
    },
  }),
}

const colors = {
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#525252',
    800: '#262626',
    900: '#171717',
  },
}

const fonts = {
  heading: 'InterVariable',
  body: 'InterVariable',
}

const components = {
  Drawer: {
    baseStyle: (props: Dict) => ({
      dialog: {
        bg: mode('white', 'neutral.800')(props),
      },
    }),
  },
}

const theme = extendTheme({
  styles,
  colors,
  fonts,
  components,
})

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorkerRegistration.register()
