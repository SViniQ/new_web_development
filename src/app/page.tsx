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
import { ArrowForwardIcon } from '@chakra-ui/icons'

export default function Home() {
  const [programasDestaque, setProgramasDestaque] = useState<Programa[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const carregarProgramas = async () => {
      try {
        const programas = await programasService.listarProgramas()
        setProgramasDestaque(programas.slice(0, 6))
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
      
      <Box 
        bgGradient="linear(to-br, #E6F0F8, #E3E9F8)" 
        color="gray.800" 
        py={{ base: 16, md: 24 }}
      >
        <Container maxW="1400px">
          <VStack spacing={3} textAlign="center">
            <Box px={4} py={2} bg="orange.50" borderRadius="full">
              <Text fontSize="sm" fontWeight="medium" color="orange.400">
                ✨ Sua carreira em tecnologia começa aqui
              </Text>
            </Box>
            <Box>
              <Heading as="h1" size={{ base: '2xl', md: '3xl' }} mb="1" lineHeight="1.1" fontWeight="bold" color="gray.800">
                Encontre os melhores
              </Heading>
              <Heading as="h1" size={{ base: '2xl', md: '3xl' }} mb="1" lineHeight="1.1" fontWeight="bold">
                <Text as="span" bgGradient="linear(to-r, #3A73E4, #805AD5)" bgClip="text">
                  programas de formação
                </Text>
              </Heading>
              <Heading as="h1" size={{ base: '2xl', md: '3xl' }} lineHeight="1.1" fontWeight="bold" color="gray.800">
                em tecnologia
              </Heading>
            </Box>
            
            <Text fontSize={{ base: 'md', md: 'xl' }} maxW="2xl" color="gray.600" lineHeight="1.6">
              Centralizamos oportunidades de capacitação em desenvolvimento, dados, cloud, UX e muito mais.
            </Text>
            
            <HStack spacing={4} pt={4}>
              <Button as={Link} href="/programas" size="lg" colorScheme="blue" bg="#007bff" borderRadius="2xl" rightIcon={<ArrowForwardIcon />} fontSize="sm">
                Explorar programas
              </Button>
              <Button 
                as={Link} 
                href="/instituicoes" 
                size="lg" 
                variant="outline"
                bg="white"
                color="gray.800"
                borderColor="gray.200"
                _hover={{ bg: "gray.50" }}
                boxShadow="sm"
                borderRadius="2xl"
                fontSize="sm"
              >
                Ver instituições
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      <Container maxW="1400px" py={16}>
        <VStack spacing={8} align="stretch">
          
          <HStack justify="space-between" align="end" pb={4} borderBottom="1px solid" borderColor="transparent">
            <Box textAlign="left">
              <Heading as="h2" size="xl" color="gray.800">
                Programas em destaque
              </Heading>
              <Text fontSize="lg" color="gray.600">
                Confira as melhores oportunidades disponíveis
              </Text>
            </Box>
            <Button
              as={Link}
              href="/programas"
              variant="outline"
              colorScheme="gray"
              rightIcon={<ArrowForwardIcon />}
              fontWeight="medium"
              borderRadius="lg"
            >
              Ver todos
            </Button>
          </HStack>

          {loading ? (
            <Center py={10}>
              <VStack spacing={4}>
                <Spinner size="xl" color="blue.500" />
                <Text color="gray.600">Carregando programas...</Text>
              </VStack>
            </Center>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {programasDestaque.map((programa) => (
                <ProgramCard key={programa.id} programa={programa} />
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>
    </Box>
  )
}
