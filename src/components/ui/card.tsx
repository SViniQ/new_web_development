import { Card as ChakraCard, CardBody as ChakraCardBody, CardHeader as ChakraCardHeader, CardFooter as ChakraCardFooter, CardProps, BoxProps } from '@chakra-ui/react'
import { forwardRef } from 'react'

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (props, ref) => <ChakraCard ref={ref} {...props} />
)

export const CardContent = forwardRef<HTMLDivElement, BoxProps>(
  (props, ref) => <ChakraCardBody ref={ref} {...props} />
)

export const CardHeader = forwardRef<HTMLDivElement, BoxProps>(
  (props, ref) => <ChakraCardHeader ref={ref} {...props} />
)

export const CardFooter = forwardRef<HTMLDivElement, BoxProps>(
  (props, ref) => <ChakraCardFooter ref={ref} {...props} />
)

export const CardTitle = forwardRef<HTMLDivElement, BoxProps>(
  ({ children, ...props }, ref) => (
    <ChakraCardHeader ref={ref} {...props}>
      {children}
    </ChakraCardHeader>
  )
)

Card.displayName = 'Card'
CardContent.displayName = 'CardContent'
CardHeader.displayName = 'CardHeader'
CardFooter.displayName = 'CardFooter'
CardTitle.displayName = 'CardTitle'