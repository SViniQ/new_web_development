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
  Box,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

interface InstitutionCardProps {
  instituicao: Instituicao
}

const InstitutionCard = ({ instituicao }: InstitutionCardProps) => {
  return (
    <Card 
      shadow="sm" 
      transition="all 0.2s"
      h="full"
      display="flex"
      flexDirection="column"
      _hover={{ shadow: 'md' }}
    >
      <VStack spacing={0} align="stretch" flexGrow={1}>
        <CardHeader pb={3}>
          <HStack spacing={4} align="center">
            <Avatar 
              src={instituicao.logoUrl} 
              name={instituicao.nome}
              size="md"
            />
            <VStack align="start" spacing={1} flex={1}>
              <Heading as="h3" size="md" lineHeight="1.2" fontWeight="semibold">
                {instituicao.nome}
              </Heading>
            </VStack>
          </HStack>
        </CardHeader>
        
        <CardBody pt={0} flexGrow={1}>
          <VStack align="stretch" spacing={4} h="full">
            <Text 
              fontSize="sm" 
              color="gray.600" 
              lineHeight="1.5"
              flexGrow={1} 
              mb={4} 
            > 
              {instituicao.descricao}
            </Text>
          </VStack>
        </CardBody>
      </VStack>

      <Box p={6} pt={0}>
        <Button 
          as="a"
          href={instituicao.siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          rightIcon={<ExternalLinkIcon />}
          colorScheme="blue"
          variant="outline"
          size="sm"
          w="full"
        >
          Visitar site
        </Button>
      </Box>
    </Card>
  )
}

export default InstitutionCard