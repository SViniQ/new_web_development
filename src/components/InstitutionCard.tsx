'use client'

import { Instituicao } from '@/types/domain'
import {
  Card,
  CardBody,
  CardHeader,
  Text,
  Heading,
  Button,
  VStack,
  HStack,
  Avatar,
  Link,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

interface InstitutionCardProps {
  instituicao: Instituicao
}

const InstitutionCard = ({ instituicao }: InstitutionCardProps) => {
  return (
    <Card 
      shadow="md" 
      transition="all 0.2s"
      _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
      h="full"
    >
      <CardHeader>
        <HStack spacing={4}>
          <Avatar 
            src={instituicao.logoUrl} 
            name={instituicao.nome}
            size="md"
          />
          <VStack align="start" spacing={1} flex={1}>
            <Heading as="h3" size="md" lineHeight="1.2">
              {instituicao.nome}
            </Heading>
            <Link 
              href={instituicao.siteUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              color="blue.500"
              fontSize="sm"
              _hover={{ textDecoration: 'underline' }}
            >
              {instituicao.siteUrl.replace('https://', '').replace('http://', '')}
            </Link>
          </VStack>
        </HStack>
      </CardHeader>
      
      <CardBody pt={0}>
        <VStack align="stretch" spacing={4}>
          <Text fontSize="sm" color="gray.600" lineHeight="1.5">
            {instituicao.descricao}
          </Text>
          
          <Button 
            as="a"
            href={instituicao.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            rightIcon={<ExternalLinkIcon />}
            colorScheme="blue"
            variant="outline"
            size="sm"
          >
            Visitar site
          </Button>
        </VStack>
      </CardBody>
    </Card>
  )
}

export default InstitutionCard