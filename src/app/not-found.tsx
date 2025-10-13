'use client'

import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
} from '@chakra-ui/react'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'

export default function NotFound() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Navigation />
      
      <Container maxW="1400px" py={20}>
        <VStack spacing={8} textAlign="center">
          <Text fontSize="8xl">🔍</Text>
          <Heading as="h1" size="2xl" color="blue.600">
            Página não encontrada
          </Heading>
          <Text fontSize="xl" color="gray.600" maxW="md">
            A página que você está procurando não existe ou foi movida.
          </Text>
          <Button as={Link} href="/" colorScheme="blue" size="lg">
            Voltar ao início
          </Button>
        </VStack>
      </Container>
    </Box>
  )
}