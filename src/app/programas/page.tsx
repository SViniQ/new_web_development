'use client'

import { useEffect, useState } from 'react'
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Spinner,
  Center,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { Navigation } from '@/components/Navigation'
import FilterBar from '@/components/FilterBar'
import ProgramCard from '@/components/ProgramCard'
import { programasService } from '@/services/programas.service'
import { useAppStore } from '@/store/useAppStore'
import { Programa } from '@/types/domain'

export default function Programas() {
  const [programas, setProgramas] = useState<Programa[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { filtros } = useAppStore()

  useEffect(() => {
    const carregarProgramas = async () => {
      setLoading(true)
      setError(null)
      try {
        const resultado = await programasService.listarProgramas(filtros)
        setProgramas(resultado)
      } catch (err) {
        setError('Erro ao carregar programas. Tente novamente.')
        console.error('Erro ao carregar programas:', err)
      } finally {
        setLoading(false)
      }
    }

    carregarProgramas()
  }, [filtros])

  return (
    <Box minH="100vh" bg="gray.50">
      <Navigation />
      
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading as="h1" size="xl" color="blue.600" mb={4}>
              Programas de Formação
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Descubra os melhores programas para acelerar sua carreira em tecnologia
            </Text>
          </Box>

          <FilterBar />

          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}

          {loading ? (
            <Center py={10}>
              <VStack spacing={4}>
                <Spinner size="xl" color="blue.500" />
                <Text color="gray.600">Carregando programas...</Text>
              </VStack>
            </Center>
          ) : programas.length === 0 ? (
            <Center py={10}>
              <VStack spacing={4}>
                <Text fontSize="lg" color="gray.600">
                  Nenhum programa encontrado com os filtros atuais.
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Tente ajustar os filtros ou limpe-os para ver todos os programas.
                </Text>
              </VStack>
            </Center>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {programas.map((programa) => (
                <ProgramCard key={programa.id} programa={programa} />
              ))}
            </SimpleGrid>
          )}

          {!loading && programas.length > 0 && (
            <Center>
              <Text fontSize="sm" color="gray.500">
                {programas.length} programa{programas.length !== 1 ? 's' : ''} encontrado{programas.length !== 1 ? 's' : ''}
              </Text>
            </Center>
          )}
        </VStack>
      </Container>
    </Box>
  )
}