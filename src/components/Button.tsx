import React from 'react'

import { forwardRef, Box, BoxProps, useColorModeValue } from '@chakra-ui/react'

const Button = forwardRef<BoxProps, 'div'>((props, ref) => {
  const normalColor = useColorModeValue('text.light', 'text.dark')
  const hoverColor = useColorModeValue('background.light', 'background.dark')

  return (
    <Box
      as="button"
      rounded="md"
      color={normalColor}
      _hover={{ bg: hoverColor }}
      fontSize="sm"
      fontWeight="medium"
      ref={ref}
      {...props}
    >
      {props.children}
    </Box>
  )
})

export default Button
