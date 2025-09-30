'use client'

import { Programa } from '@/types/domain'
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Text,
  Heading,
  Badge,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  IconButton,
} from '@chakra-ui/react'
import { CalendarIcon, InfoIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { useAppStore } from '@/store/useAppStore'
import Link from 'next/link'

interface ProgramCardProps {
  programa: Programa
}

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

const ProgramCard = ({ programa }: ProgramCardProps) => {
  const { favoritos, toggleFavorito } = useAppStore()
  const isFavorito = favoritos.includes(programa.id)

  return (
    <Card 
      h="full" 
      shadow="md" 
      transition="all 0.2s"
      _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
    >
      <CardHeader pb={3}>
        <HStack justify="space-between" align="start">
          <Heading as="h3" size="md" flex={1} lineHeight="1.3">
            {programa.titulo}
          </Heading>
          <IconButton
            aria-label={isFavorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            icon={<Text fontSize="lg">{isFavorito ? '❤️' : '🤍'}</Text>}
            variant="ghost"
            size="sm"
            onClick={() => toggleFavorito(programa.id)}
          />
        </HStack>
      </CardHeader>
      
      <CardBody pt={0} pb={3}>
        <VStack align="stretch" spacing={4}>
          <Wrap spacing={2}>
            <WrapItem>
              <Badge colorScheme="blue" variant="solid">
                {areaLabels[programa.area]}
              </Badge>
            </WrapItem>
            <WrapItem>
              <Badge colorScheme="green" variant="outline">
                {nivelLabels[programa.nivel]}
              </Badge>
            </WrapItem>
            <WrapItem>
              <Badge colorScheme="purple" variant="outline">
                {modalidadeLabels[programa.modalidade]}
              </Badge>
            </WrapItem>
          </Wrap>
          
          <Text fontSize="sm" color="gray.600" noOfLines={3}>
            {programa.resumo}
          </Text>
          
          <VStack align="stretch" spacing={2} fontSize="sm" color="gray.500">
            <HStack>
              <InfoIcon />
              <Text>{programa.cidade}, {programa.estado}</Text>
            </HStack>
            <HStack>
              <CalendarIcon />
              <Text>
                Inscrições: {new Date(programa.periodoInscricao.inicio).toLocaleDateString('pt-BR')} - {new Date(programa.periodoInscricao.fim).toLocaleDateString('pt-BR')}
              </Text>
            </HStack>
          </VStack>
          
          <Wrap spacing={1}>
            {programa.tags.slice(0, 3).map((tag) => (
              <WrapItem key={tag}>
                <Badge size="sm" variant="outline" fontSize="xs">
                  {tag}
                </Badge>
              </WrapItem>
            ))}
            {programa.tags.length > 3 && (
              <WrapItem>
                <Badge size="sm" variant="outline" fontSize="xs">
                  +{programa.tags.length - 3}
                </Badge>
              </WrapItem>
            )}
          </Wrap>
        </VStack>
      </CardBody>
      
      <CardFooter pt={0}>
        <HStack spacing={2} w="full">
          <Button as={Link} href={`/programas/${programa.id}`} flex={1} size="sm" colorScheme="blue">
            Ver detalhes
          </Button>
          <IconButton
            as="a"
            href={programa.editalUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir edital"
            icon={<ExternalLinkIcon />}
            variant="outline"
            size="sm"
          />
        </HStack>
      </CardFooter>
    </Card>
  )
}

export default ProgramCard