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
  HStack,
  IconButton,
} from '@chakra-ui/react'
import { Navigation } from '@/components/Navigation'
import FilterBar from '@/components/FilterBar'
import ProgramCard from '@/components/ProgramCard'
import { programasService } from '@/services/programas.service'
import { useAppStore } from '@/store/useAppStore'
import { Programa } from '@/types/domain'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

const ITEMS_PER_PAGE = 6

export default function Programas() {
  const [todosProgramas, setTodosProgramas] = useState<Programa[]>([])
  const [programasDaPagina, setProgramasDaPagina] = useState<Programa[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { filtros } = useAppStore()
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const carregarProgramas = async () => {
      setLoading(true)
      setError(null)
      try {
        const resultado = await programasService.listarProgramas(filtros)
        setTodosProgramas(resultado)
        setCurrentPage(1)
      } catch (err) {
        setError('Erro ao carregar programas. Tente novamente.')
        console.error('Erro ao carregar programas:', err)
      } finally {
        setLoading(false)
      }
    }
    carregarProgramas()
  }, [filtros])

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    setProgramasDaPagina(todosProgramas.slice(startIndex, endIndex))
  }, [todosProgramas, currentPage])

  const totalPages = Math.ceil(todosProgramas.length / ITEMS_PER_PAGE)

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
            <Spinner size="xl" color="blue.500" />
            <Text color="gray.600">Carregando programas...</Text>
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

    if (todosProgramas.length === 0) {
      return (
        <Center py={10}>
          <VStack spacing={4}>
            <Text fontSize="lg" color="gray.600">
              Nenhum programa encontrado com os filtros aplicados.
            </Text>
            <Text fontSize="sm" color="gray.500">
              Tente ajustar os filtros ou limpe-os para ver todos os programas.
            </Text>
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
          <Box textAlign={{ base: 'center', md: 'left' }}>
            <Heading as="h1" size={{ base: 'lg', md: 'xl' }} fontWeight="bold" mb={2}>
              Catálogo de Programas
            </Heading>
            <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.600">
              Encontre o programa ideal para sua carreira em tecnologia
            </Text>
          </Box>
          <FilterBar />
          {renderContent()}
        </VStack>
      </Container>
    </Box>
  )
}