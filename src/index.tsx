import React from 'react'
import ReactDOM from 'react-dom'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import App from './App'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'

import { Dict } from '@chakra-ui/utils'

import '@fontsource/inter/variable.css'

/*
Chakra UI

Theme customization
 */
const styles = {
  global: (props: Dict) => ({
    'html, body': {
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('gray.100', 'neutral.900')(props),
    },
  }),
}

const fonts = {
  heading: 'InterVariable',
  body: 'InterVariable',
}

const colorSchemes = {
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
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
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

const mainColors = {
  background: {
    light: colorSchemes.gray['100'],
    dark: colorSchemes.neutral['900'],
  },
  main: {
    light: '#fff',
    dark: colorSchemes.neutral['800'],
  },
  text: {
    light: colorSchemes.gray['500'],
    dark: colorSchemes.neutral['400'],
  },
  border: {
    light: colorSchemes.gray['200'],
    dark: colorSchemes.neutral['700'],
  },
}

const components = {
  Drawer: {
    baseStyle: (props: Dict) => ({
      dialog: {
        bg: mode('main.light', 'main.dark')(props),
      },
    }),
  },
  Modal: {
    baseStyle: (props: Dict) => ({
      dialog: {
        bg: mode('main.light', 'main.dark')(props),
      },
    }),
  },
}

const theme = extendTheme({
  styles,
  fonts,
  colors: {
    ...colorSchemes,
    ...mainColors,
  },
  components,
})

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorkerRegistration.register()
