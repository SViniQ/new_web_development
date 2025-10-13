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
import InstitutionCard from '@/components/InstitutionCard'
import { programasService } from '@/services/programas.service'
import { Instituicao } from '@/types/domain'

export default function Instituicoes() {
  const [instituicoes, setInstituicoes] = useState<Instituicao[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const carregarInstituicoes = async () => {
      setLoading(true)
      setError(null)
      try {
        const resultado = await programasService.listarInstituicoes()
        setInstituicoes(resultado)
      } catch (err) {
        setError('Erro ao carregar instituições. Tente novamente.')
        console.error('Erro ao carregar instituições:', err)
      } finally {
        setLoading(false)
      }
    }

    carregarInstituicoes()
  }, [])

  return (
    <Box minH="100vh"  bg="gray.50">
      <Navigation />
      
      <Container maxW="1400px" py={8}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading as="h1" size="xl" color="blue.600" mb={4}>
              🏢 Instituições Parceiras
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Conheça as organizações que oferecem os melhores programas de formação em tecnologia
            </Text>
          </Box>

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
                <Text color="gray.600">Carregando instituições...</Text>
              </VStack>
            </Center>
          ) : instituicoes.length === 0 ? (
            <Center py={10}>
              <Text fontSize="lg" color="gray.600">
                Nenhuma instituição encontrada.
              </Text>
            </Center>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {instituicoes.map((instituicao) => (
                <InstitutionCard key={instituicao.id} instituicao={instituicao} />
              ))}
            </SimpleGrid>
          )}

          {!loading && instituicoes.length > 0 && (
            <Center>
              <Text fontSize="sm" color="gray.500">
                {instituicoes.length} instituição{instituicoes.length !== 1 ? 'ões' : ''} encontrada{instituicoes.length !== 1 ? 's' : ''}
              </Text>
            </Center>
          )}
        </VStack>
      </Container>
    </Box>
  )
}