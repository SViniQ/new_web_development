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
        <Container maxW="container.xl" py={8}>
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
      
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Header com botão voltar */}
          <HStack>
            <IconButton
              aria-label="Voltar"
              icon={<ArrowBackIcon />}
              variant="ghost"
              onClick={() => router.back()}
            />
            <Text color="gray.600">Detalhes do Programa</Text>
          </HStack>

          {/* Cabeçalho do programa */}
          <Card shadow="lg">
            <CardBody>
              <VStack spacing={6} align="stretch">
                <HStack justify="space-between" align="start">
                  <VStack align="start" spacing={3} flex={1}>
                    <Heading as="h1" size="xl" color="blue.700" lineHeight="1.2">
                      {programa.titulo}
                    </Heading>
                    
                    {instituicao && (
                      <HStack spacing={3}>
                        <Avatar 
                          src={instituicao.logoUrl} 
                          name={instituicao.nome}
                          size="sm"
                        />
                        <Text fontSize="lg" fontWeight="medium" color="gray.700">
                          {instituicao.nome}
                        </Text>
                      </HStack>
                    )}
                  </VStack>
                  
                  <IconButton
                    aria-label={isFavorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                    icon={<Text fontSize="2xl">{isFavorito ? '❤️' : '🤍'}</Text>}
                    variant="ghost"
                    size="lg"
                    onClick={() => toggleFavorito(programa.id)}
                  />
                </HStack>

                <Wrap spacing={3}>
                  <WrapItem>
                    <Badge colorScheme="blue" variant="solid" px={3} py={1} fontSize="sm">
                      {areaLabels[programa.area]}
                    </Badge>
                  </WrapItem>
                  <WrapItem>
                    <Badge colorScheme="green" variant="outline" px={3} py={1} fontSize="sm">
                      {nivelLabels[programa.nivel]}
                    </Badge>
                  </WrapItem>
                  <WrapItem>
                    <Badge colorScheme="purple" variant="outline" px={3} py={1} fontSize="sm">
                      {modalidadeLabels[programa.modalidade]}
                    </Badge>
                  </WrapItem>
                </Wrap>
              </VStack>
            </CardBody>
          </Card>

          <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8}>
            {/* Conteúdo principal */}
            <Box gridColumn={{ base: 1, lg: '1 / 3' }}>
              <VStack spacing={6} align="stretch">
                {/* Sobre o programa */}
                <Card shadow="md">
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      <Heading as="h2" size="lg" color="blue.700">
                        Sobre o programa
                      </Heading>
                      <Text color="gray.700" lineHeight="1.7" fontSize="lg">
                        {programa.resumo}
                      </Text>
                      {programa.descricaoCompleta && (
                        <Text color="gray.600" lineHeight="1.6">
                          {programa.descricaoCompleta}
                        </Text>
                      )}
                    </VStack>
                  </CardBody>
                </Card>

                {/* Tecnologias */}
                <Card shadow="md">
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      <Heading as="h2" size="lg" color="blue.700">
                        🚀 Tecnologias abordadas
                      </Heading>
                      <Wrap spacing={2}>
                        {programa.tags.map((tag) => (
                          <WrapItem key={tag}>
                            <Badge 
                              variant="outline" 
                              colorScheme="blue"
                              px={3} 
                              py={1}
                              fontSize="sm"
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

            {/* Sidebar com informações */}
            <VStack spacing={6} align="stretch">
              {/* Informações do programa */}
              <Card shadow="md" bg="blue.50" borderLeft="4px solid" borderLeftColor="blue.400">
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    <Heading as="h3" size="md" color="blue.700">
                      📋 Informações
                    </Heading>
                    
                    <VStack spacing={3} align="stretch">
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

              {/* Ações */}
              <VStack spacing={3}>
                <Button 
                  as="a"
                  href={programa.editalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  rightIcon={<ExternalLinkIcon />}
                  colorScheme="blue"
                  size="lg"
                  w="full"
                >
                  Ver Edital Completo
                </Button>
                
                {instituicao && (
                  <Button 
                    as="a"
                    href={instituicao.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    colorScheme="blue"
                    size="lg"
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