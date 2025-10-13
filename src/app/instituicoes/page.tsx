'use client'

import { useEffect, useState } from 'react'
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  Button,
  HStack,
  Image, 
  Spinner,
  Center,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { Navigation } from '@/components/Navigation'
import { programasService } from '@/services/programas.service'
import { Instituicao } from '@/types/domain'
import { ExternalLinkIcon } from '@chakra-ui/icons'

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

  const renderContent = () => {
    if (loading) {
      return (
        <Center py={10}>
          <VStack spacing={4}>
            <Spinner size="xl" color="blue.500" />
            <Text color="gray.600">Carregando instituições...</Text>
          </VStack>
        </Center>
      )
    }

    if (error) {
      return (
        <Alert status="error" mt={8}>
          <AlertIcon />
          {error}
        </Alert>
      )
    }

    if (instituicoes.length === 0) {
      return (
        <Center py={10}>
          <Text fontSize="lg" color="gray.600">
            Nenhuma instituição parceira encontrada no momento.
          </Text>
        </Center>
      )
    }

    return (
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {instituicoes.map((instituicao) => (
          <Card key={instituicao.id} shadow="md" borderRadius="lg">
            <CardBody>
              <VStack align="flex-start" spacing={4}>
                <HStack spacing={4} align="center">
                  <Image
                    src={instituicao.logoUrl}
                    alt={`${instituicao.nome} logo`}
                    boxSize="50px" 
                    objectFit="cover"
                    borderRadius="lg" 
                  />
                  <Heading as="h3" size="md" color="black">
                    {instituicao.nome}
                  </Heading>
                </HStack>
                <Text fontSize="sm" color="gray.600" noOfLines={3}>
                  {instituicao.descricao}
                </Text>
                <Button
                  as="a"
                  href={instituicao.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  colorScheme="blue"
                  size="sm"
                  rightIcon={<ExternalLinkIcon />}
                  w="full"
                  mt={2}
                >
                  Visitar site
                </Button>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    )
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <Navigation />
      <Container maxW="1400px" py={8}>
        <VStack spacing={8} align="stretch">
          <Box textAlign={{ base: 'center', md: 'left' }}>
            <Heading as="h1" size={{ base: 'xl', md: '2xl' }} fontWeight="bold" mb={2}>
              Instituições Parceiras
            </Heading>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600">
              Conheça as organizações que oferecem os melhores programas de formação em tecnologia
            </Text>
          </Box>
          {renderContent()}
        </VStack>
      </Container>
    </Box>
  )
}