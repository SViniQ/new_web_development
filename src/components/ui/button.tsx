import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react'
import { forwardRef } from 'react'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => <ChakraButton ref={ref} {...props} />
)

Button.displayName = 'Button'