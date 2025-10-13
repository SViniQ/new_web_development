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
  Box,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useAppStore } from '@/store/useAppStore'
import Link from 'next/link'
import { FaHeart, FaMapPin, FaCalendarAlt } from 'react-icons/fa' // Importa ícones do original

interface ProgramCardProps {
  programa: Programa
}

// Mapeamento para exibição
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

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  }).replace('.', '') 
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
      display="flex"
      flexDirection="column"
      borderRadius="lg"
    >
      <CardHeader pb={3}>
        <HStack justify="space-between" align="start">
          <Heading as="h3" size="sm" flex={1} lineHeight="1.3" fontWeight="semibold">
            {programa.titulo}
          </Heading>
          <IconButton
            aria-label={isFavorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            icon={<FaHeart size={16} />}
            variant="ghost"
            minW="0" 
            p={1}    
            h="auto" 
            color={isFavorito ? 'red.500' : 'gray.300'}
            onClick={() => toggleFavorito(programa.id)}
            _hover={{ color: isFavorito ? 'red.600' : 'red.400' }}
          />
        </HStack>
        
        <HStack spacing={2} mt={2}>
            <Badge colorScheme="purple" variant="solid" px={2} borderRadius="md" textTransform="capitalize" fontSize="xs">
                {areaLabels[programa.area]}
            </Badge>
            <Badge colorScheme="gray" variant="outline" px={2} borderRadius="md" textTransform="capitalize" fontSize="xs">
                {nivelLabels[programa.nivel]}
            </Badge>
        </HStack>

      </CardHeader>
      
      <CardBody pt={0} pb={3} flexGrow={1}>
        <VStack align="stretch" spacing={4}>
          <Text fontSize="sm" color="gray.600" noOfLines={3} minH="4.5em"> 
            {programa.resumo}
          </Text>
          
          <VStack align="stretch" spacing={2} fontSize="sm" color="gray.700">
            <HStack spacing={2}>
                <Box as={FaMapPin} boxSize={4} color="gray.500" />
                <Text>
                  {programa.cidade}, {programa.estado} • {modalidadeLabels[programa.modalidade]}
                </Text>
            </HStack>
            
            <HStack spacing={2}>
              <Box as={FaCalendarAlt} boxSize={4} color="gray.500" />
              <Text>
                Inscrições: {formatDate(programa.periodoInscricao.inicio)} - {formatDate(programa.periodoInscricao.fim)}
              </Text>
            </HStack>
          </VStack>
          
          <Wrap spacing={1} pt={2}>
            {programa.tags.slice(0, 4).map((tag) => (
              <WrapItem key={tag}>
                <Badge size="sm" variant="outline" fontSize="xs" px={2} py={1} borderRadius="md" textTransform="none">
                  {tag}
                </Badge>
              </WrapItem>
            ))}
            {programa.tags.length > 4 && (
              <WrapItem>
                <Badge size="sm" variant="outline" fontSize="xs" px={2} py={1} borderRadius="md" textTransform="none">
                  +{programa.tags.length - 4}
                </Badge>
              </WrapItem>
            )}
          </Wrap>
        </VStack>
      </CardBody>
      
      <CardFooter pt={0}>
        <HStack spacing={2} mt={2} w="full">
          <Button 
            as={Link} 
            href={`/programas/${programa.id}`} 
            flex={1} 
            size="sm"
            colorScheme="blue"
            bg="#007bff"
            color="white"
            _hover={{ bg: 'blue.600' }}
          >
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
            colorScheme="blue"
          />
        </HStack>
      </CardFooter>
    </Card>
  )
}

export default ProgramCard
