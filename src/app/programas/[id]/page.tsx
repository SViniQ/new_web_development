'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Badge,
  Card,
  CardBody,
  HStack,
  Wrap,
  WrapItem,
  Divider,
  Spinner,
  Center,
  Alert,
  AlertIcon,
  IconButton,
  Avatar,
  SimpleGrid,
} from '@chakra-ui/react'
import { ArrowBackIcon, CalendarIcon, InfoIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { Navigation } from '@/components/Navigation'
import { programasService } from '@/services/programas.service'
import { useAppStore } from '@/store/useAppStore'
import { Programa, Instituicao } from '@/types/domain'
import { FaHeart } from 'react-icons/fa'

const areaLabels: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  dados: 'Dados',
  cloud: 'Cloud',
  ux: 'UX/UI',
  mobile: 'Mobile',
  seguranca: 'Segurança',
}

const modalidadeLabels: Record<string, string> = {
  presencial: 'Presencial',
  online: 'Online',
  hibrido: 'Híbrido',
}

const nivelLabels: Record<string, string> = {
  iniciante: 'Iniciante',
  intermediario: 'Intermediário',
  avancado: 'Avançado',
}

export default function ProgramDetails() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const [programa, setPrograma] = useState<Programa | null>(null)
  const [instituicao, setInstituicao] = useState<Instituicao | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { favoritos, toggleFavorito } = useAppStore()
  const isFavorito = programa ? favoritos.includes(programa.id) : false

  useEffect(() => {
    const carregarDados = async () => {
      if (!id) return

      setLoading(true)
      setError(null)

      try {
        const prog = await programasService.buscarPrograma(id)
        if (!prog) {
          setError('Programa não encontrado.')
          return
        }

        setPrograma(prog)

        const inst = await programasService.buscarInstituicao(prog.instituicaoId)
        setInstituicao(inst)
      } catch (err) {
        setError('Erro ao carregar dados do programa. Tente novamente.')
        console.error('Erro ao carregar programa:', err)
      } finally {
        setLoading(false)
      }
    }

    carregarDados()
  }, [id])

  if (loading) {
    return (
      <Box minH="100vh" bg="gray.50">
        <Navigation />
        <Center py={20}>
          <VStack spacing={4}>
            <Spinner size="xl" color="blue.500" />
            <Text color="gray.600">Carregando programa...</Text>
          </VStack>
        </Center>
      </Box>
    )
  }

  if (error || !programa) {
    return (
      <Box minH="100vh" bg="gray.50">
        <Navigation />
        <Container maxW="1400px" py={8}>
          <VStack spacing={6}>
            <Alert status="error">
              <AlertIcon />
              {error || 'Programa não encontrado'}
            </Alert>
            <Button leftIcon={<ArrowBackIcon />} onClick={() => router.back()}>
              Voltar
            </Button>
          </VStack>
        </Container>
      </Box>
    )
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <Navigation />

      <Container maxW="1400px" py={8}>
        <VStack spacing={8} align="stretch">
          <HStack spacing={2} align="center">
            <IconButton
              aria-label="Voltar"
              icon={<ArrowBackIcon />}
              variant="ghost"
              onClick={() => router.back()}
              size="md"
            />
            <Heading as="h1" size="md" fontWeight="bold">
              Voltar
            </Heading>
          </HStack>

          <Card shadow="md" borderRadius="lg">
            <CardBody>
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between" align="start">
                  <VStack align="start" spacing={1} flex={1} >
                    <Heading as="h2" size={{ base: 'md', md: 'lg' }} color="black" lineHeight="1.2" mb={4}>
                      {programa.titulo}
                    </Heading>

                    {instituicao && (
                      <HStack spacing={2} align="center" mb={1}>
                        <Avatar
                          src={instituicao.logoUrl}
                          name={instituicao.nome}
                          size="sm"
                        />
                        <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight="medium" color="gray.700">
                          {instituicao.nome}
                        </Text>
                      </HStack>
                    )}
                  </VStack>

                  <IconButton
                    aria-label={isFavorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                    icon={<FaHeart />}
                    variant="ghost"
                    size="md"
                    color={isFavorito ? 'red.500' : 'gray.400'}
                    onClick={() => toggleFavorito(programa.id)}
                    _hover={{ color: isFavorito ? 'red.600' : 'red.400' }}
                    alignSelf="flex-start" 
                  />
                </HStack>

                <Wrap spacing={2}>
                  <WrapItem>
                    <Badge colorScheme="blue" variant="solid" px={2} py={0.5} fontSize={{ base: 'xx-small', md: 'xs' }}>
                      {areaLabels[programa.area]}
                    </Badge>
                  </WrapItem>
                  <WrapItem>
                    <Badge colorScheme="green" variant="outline" px={2} py={0.5} fontSize={{ base: 'xx-small', md: 'xs' }}>
                      {nivelLabels[programa.nivel]}
                    </Badge>
                  </WrapItem>
                  <WrapItem>
                    <Badge colorScheme="purple" variant="outline" px={2} py={0.5} fontSize={{ base: 'xx-small', md: 'xs' }}>
                      {modalidadeLabels[programa.modalidade]}
                    </Badge>
                  </WrapItem>
                </Wrap>
              </VStack>
            </CardBody>
          </Card>

          <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6}>
            <Box gridColumn={{ base: 1, lg: '1 / 3' }}>
              <VStack spacing={4} align="stretch">
                <Card shadow="md">
                  <CardBody>
                    <VStack spacing={3} align="stretch">
                      <Heading as="h3" size="md" color="black">
                        Sobre o programa
                      </Heading>
                      <Text color="gray.700" lineHeight="1.6" fontSize="md">
                        {programa.resumo}
                      </Text>
                      {programa.descricaoCompleta && (
                        <Text color="gray.600" lineHeight="1.5" fontSize="sm">
                          {programa.descricaoCompleta}
                        </Text>
                      )}
                    </VStack>
                  </CardBody>
                </Card>

                <Card shadow="md">
                  <CardBody>
                    <VStack spacing={3} align="stretch">
                      <Heading as="h3" size="md" color="black" mb={3}>
                        Tecnologias abordadas
                      </Heading>
                      <Wrap spacing={1}>
                        {programa.tags.map((tag) => (
                          <WrapItem key={tag}>
                            <Badge
                              variant="outline"
                              colorScheme="blue"
                              px={2}
                              py={0.5}
                              fontSize="xs"
                            >
                              {tag}
                            </Badge>
                          </WrapItem>
                        ))}
                      </Wrap>
                    </VStack>
                  </CardBody>
                </Card>
              </VStack>
            </Box>

            <VStack spacing={4} align="stretch">
              <Card shadow="md" bg="blue.50" borderLeft="4px solid" borderLeftColor="blue.400">
                <CardBody>
                  <VStack spacing={3} align="stretch">
                    <Heading as="h4" size="sm" color="black">
                      Informações
                    </Heading>

                    <VStack spacing={2} align="stretch">
                      <HStack>
                        <InfoIcon color="blue.500" />
                        <Text fontSize="sm">
                          <strong>Localização:</strong> {programa.cidade}, {programa.estado}
                        </Text>
                      </HStack>

                      <HStack>
                        <CalendarIcon color="blue.500" />
                        <Text fontSize="sm">
                          <strong>Inscrições:</strong><br />
                          {new Date(programa.periodoInscricao.inicio).toLocaleDateString('pt-BR')} - {new Date(programa.periodoInscricao.fim).toLocaleDateString('pt-BR')}
                        </Text>
                      </HStack>

                      <Divider />

                      <Text fontSize="sm" color="gray.700">
                        <strong>Público-alvo:</strong><br />
                        {programa.publicoAlvo}
                      </Text>
                    </VStack>
                  </VStack>
                </CardBody>
              </Card>

              <VStack spacing={2}>
                <Button
                  as="a"
                  href={programa.editalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  colorScheme="blue"
                  size="sm"
                  w="full"
                >
                   Edital completo
                </Button>

                {instituicao && (
                  <Button
                    as="a"
                    href={instituicao.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    colorScheme="blue"
                    size="sm"
                    w="full"
                  >
                    Visitar {instituicao.nome}
                  </Button>
                )}
              </VStack>
            </VStack>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}