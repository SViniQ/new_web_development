'use client'

import { useEffect, useState } from 'react'
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  SimpleGrid,
  HStack,
  Spinner,
  Center,
} from '@chakra-ui/react'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import ProgramCard from '@/components/ProgramCard'
import { programasService } from '@/services/programas.service'
import { Programa } from '@/types/domain'

export default function Home() {
  const [programasDestaque, setProgramasDestaque] = useState<Programa[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const carregarProgramas = async () => {
      try {
        const programas = await programasService.listarProgramas()
        setProgramasDestaque(programas.slice(0, 6)) // Primeiros 6 programas
      } catch (error) {
        console.error('Erro ao carregar programas:', error)
      } finally {
        setLoading(false)
      }
    }

    carregarProgramas()
  }, [])

  return (
    <Box minH="100vh" bg="gray.50">
      <Navigation />
      
      {/* Hero Section */}
      <Box bg="gradient-to-br from-blue.500 to-purple.600" color="white" py={20}>
        <Container maxW="container.xl">
          <VStack spacing={6} textAlign="center">
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2} opacity={0.9}>
                ✨ Sua carreira em tecnologia começa aqui
              </Text>
              <Heading as="h1" size="3xl" mb={4} lineHeight="1.1">
                Encontre os melhores{' '}
                <Text as="span" bgGradient="linear(to-r, yellow.300, orange.300)" bgClip="text">
                  programas de formação
                </Text>{' '}
                em tecnologia
              </Heading>
            </Box>
            
            <Text fontSize="xl" maxW="2xl" opacity={0.9} lineHeight="1.6">
              Centralizamos oportunidades de capacitação em desenvolvimento, dados, cloud, UX e muito mais.
            </Text>
            
            <HStack spacing={4} pt={4}>
              <Button as={Link} href="/programas" size="lg" colorScheme="yellow" color="gray.800">
                Explorar Programas
              </Button>
              <Button as={Link} href="/instituicoes" size="lg" variant="outline" _hover={{ bg: 'whiteAlpha.200' }}>
                Ver Instituições
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Programas em Destaque */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={12} align="stretch">
          <Box textAlign="center">
            <Heading as="h2" size="xl" color="blue.700" mb={4}>
              🚀 Programas em Destaque
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Confira as melhores oportunidades disponíveis agora
            </Text>
          </Box>

          {loading ? (
            <Center py={10}>
              <VStack spacing={4}>
                <Spinner size="xl" color="blue.500" />
                <Text color="gray.600">Carregando programas...</Text>
              </VStack>
            </Center>
          ) : (
            <>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                {programasDestaque.map((programa) => (
                  <ProgramCard key={programa.id} programa={programa} />
                ))}
              </SimpleGrid>
              
              <Center>
                <Button as={Link} href="/programas" variant="outline" colorScheme="blue" size="lg">
                  Ver Todos os Programas
                </Button>
              </Center>
            </>
          )}
        </VStack>
      </Container>
    </Box>
  )
}
