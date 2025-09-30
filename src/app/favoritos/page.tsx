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
  Button,
} from '@chakra-ui/react'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import ProgramCard from '@/components/ProgramCard'
import { programasService } from '@/services/programas.service'
import { useAppStore } from '@/store/useAppStore'
import { Programa } from '@/types/domain'

export default function Favoritos() {
  const [programasFavoritos, setProgramasFavoritos] = useState<Programa[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { favoritos } = useAppStore()

  useEffect(() => {
    const carregarFavoritos = async () => {
      setLoading(true)
      setError(null)
      try {
        if (favoritos.length === 0) {
          setProgramasFavoritos([])
          setLoading(false)
          return
        }
        
        const todosProgramas = await programasService.listarProgramas()
        const favoritados = todosProgramas.filter((p) => favoritos.includes(p.id))
        setProgramasFavoritos(favoritados)
      } catch (err) {
        setError('Erro ao carregar favoritos. Tente novamente.')
        console.error('Erro ao carregar favoritos:', err)
      } finally {
        setLoading(false)
      }
    }

    carregarFavoritos()
  }, [favoritos])

  return (
    <Box minH="100vh" bg="gray.50">
      <Navigation />
      
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading as="h1" size="xl" color="red.500" mb={4}>
              ❤️ Meus Favoritos
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Programas que você salvou para consultar depois
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
                <Spinner size="xl" color="red.500" />
                <Text color="gray.600">Carregando favoritos...</Text>
              </VStack>
            </Center>
          ) : programasFavoritos.length === 0 ? (
            <Center py={16}>
              <VStack spacing={6}>
                <Text fontSize="6xl">💔</Text>
                <Heading as="h2" size="lg" color="gray.600" textAlign="center">
                  Nenhum programa favoritado ainda
                </Heading>
                <Text color="gray.500" textAlign="center" maxW="md">
                  Que tal explorar nossos programas e adicionar alguns aos seus favoritos? 
                  Clique no coração nos cards dos programas para salvá-los aqui.
                </Text>
                <Button as={Link} href="/programas" colorScheme="blue" size="lg">
                  Explorar Programas
                </Button>
              </VStack>
            </Center>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {programasFavoritos.map((programa) => (
                <ProgramCard key={programa.id} programa={programa} />
              ))}
            </SimpleGrid>
          )}

          {!loading && programasFavoritos.length > 0 && (
            <Center>
              <Text fontSize="sm" color="gray.500">
                {programasFavoritos.length} programa{programasFavoritos.length !== 1 ? 's' : ''} favorito{programasFavoritos.length !== 1 ? 's' : ''}
              </Text>
            </Center>
          )}
        </VStack>
      </Container>
    </Box>
  )
}