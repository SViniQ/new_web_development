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
  Button,
  HStack,
  IconButton,
} from '@chakra-ui/react'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import ProgramCard from '@/components/ProgramCard'
import { programasService } from '@/services/programas.service'
import { useAppStore } from '@/store/useAppStore'
import { Programa } from '@/types/domain'
import { FaHeart } from 'react-icons/fa'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

const ITEMS_PER_PAGE = 6

export default function Favoritos() {
  const [programasFavoritos, setProgramasFavoritos] = useState<Programa[]>([])
  const [programasDaPagina, setProgramasDaPagina] = useState<Programa[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { favoritos } = useAppStore()
  const [currentPage, setCurrentPage] = useState(1)

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
        setCurrentPage(1)
      } catch (err) {
        setError('Erro ao carregar favoritos. Tente novamente.')
        console.error('Erro ao carregar favoritos:', err)
      } finally {
        setLoading(false)
      }
    }

    carregarFavoritos()
  }, [favoritos])

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    setProgramasDaPagina(programasFavoritos.slice(startIndex, endIndex))
  }, [programasFavoritos, currentPage])

  const totalPages = Math.ceil(programasFavoritos.length / ITEMS_PER_PAGE)

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const renderContent = () => {
    if (loading) {
      return (
        <Center py={10}>
          <VStack spacing={4}>
            <Spinner size="xl" color="red.500" />
            <Text color="gray.600">Carregando favoritos...</Text>
          </VStack>
        </Center>
      )
    }

    if (error) {
      return (
          <Center py={10}>
              <Text fontSize="lg" color="red.500">
                  {error}
              </Text>
          </Center>
      )
    }
    
    if (programasFavoritos.length === 0) {
      return (
        <Center py={16}>
          <VStack spacing={6}>
            <Box as={FaHeart} boxSize={16} color="gray.400" />
            <Heading as="h2" size="lg" color="gray.600" textAlign="center">
              Nenhum programa favoritado ainda
            </Heading>
            <Text color="gray.500" textAlign="center" maxW="md">
              Explore nosso catálogo e salve os programas que interessam você
            </Text>
            <Button as={Link} href="/programas" colorScheme="blue" size="lg">
              Explorar Programas
            </Button>
          </VStack>
        </Center>
      )
    }

    return (
      <VStack spacing={6} align="stretch">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {programasDaPagina.map((programa) => (
            <ProgramCard key={programa.id} programa={programa} />
          ))}
        </SimpleGrid>
        {totalPages > 1 && (
          <HStack justify="center" mt={4} spacing={2}>
            <IconButton
              onClick={handlePreviousPage}
              isDisabled={currentPage === 1}
              aria-label="Página anterior"
              icon={<ArrowLeftIcon />}
            />
            <Text>
              Página {currentPage} de {totalPages}
            </Text>
            <IconButton
              onClick={handleNextPage}
              isDisabled={currentPage === totalPages}
              aria-label="Próxima página"
              icon={<ArrowRightIcon />}
            />
          </HStack>
        )}
      </VStack>
    )
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <Navigation />
      
      <Container maxW="1400px" py={8}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="left">
            <HStack align="center" spacing={3}>
              <Heading as="h1" size="xl" fontWeight="bold">
                Meus Favoritos
              </Heading>
            </HStack>
            <Text fontSize="md" color="gray.600" mt={2}>
              Programas que você salvou para consultar depois
            </Text>
          </Box>
          
          {renderContent()}
          
        </VStack>
      </Container>
    </Box>
  )
}
