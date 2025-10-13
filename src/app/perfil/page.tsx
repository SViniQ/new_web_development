'use client'

import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Card,
  CardBody,
  CardHeader,
  SimpleGrid,
  Badge,
  Avatar,
  HStack,
  Wrap,
  WrapItem,
  Divider,
} from '@chakra-ui/react'
import { EmailIcon, InfoIcon } from '@chakra-ui/icons'
import { Navigation } from '@/components/Navigation'

export default function Perfil() {
  const usuario = {
    nome: 'João Silva',
    email: 'joao.silva@email.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    interesses: ['Frontend', 'React', 'TypeScript', 'Node.js', 'Cloud', 'UX/UI'],
    bio: 'Desenvolvedor apaixonado por tecnologia, sempre em busca de novos desafios e oportunidades de aprendizado.',
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <Navigation />
      
      <Container maxW="1400px" py={8}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="left">
            <Heading as="h1" size="xl" fontWeight="bold" mb={2}>
              Meu Perfil
            </Heading>
            <Text fontSize="md" color="gray.600">
              Gerencie suas informações e preferências
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
            <Card shadow="md">
              <CardHeader>
                <HStack spacing={2} color="black" alignItems="center">
                  <InfoIcon />
                  <Heading as="h2" size="md">
                    Informações Pessoais
                  </Heading>
                </HStack>
              </CardHeader>
              <CardBody>
                <VStack spacing={6} align="stretch">
                  <HStack spacing={4}>
                    <Avatar 
                      src={usuario.avatar} 
                      name={usuario.nome}
                      size="xl"
                    />
                    <VStack align="start" spacing={2} flex={1}>
                      <Heading as="h3" size="lg" color="gray.800">
                        {usuario.nome}
                      </Heading>
                      <HStack color="gray.600">
                        <EmailIcon />
                        <Text>{usuario.email}</Text>
                      </HStack>
                    </VStack>
                  </HStack>
                  
                  <Divider />
                  
                  <Box>
                    <Heading as="h4" size="sm" color="gray.700" mb={3}>
                      Sobre mim
                    </Heading>
                    <Text color="gray.600" lineHeight="1.6">
                      {usuario.bio}
                    </Text>
                  </Box>
                </VStack>
              </CardBody>
            </Card>

            <Card shadow="md">
              <CardHeader>
                <HStack spacing={2} color="black" alignItems="center">
                  <Heading as="h2" size="md">
                    Áreas de Interesse
                  </Heading>
                </HStack>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Text color="gray.600">
                    Suas áreas de interesse ajudam a personalizar as recomendações de programas.
                  </Text>
                  
                  <Wrap spacing={3}>
                    {usuario.interesses.map((interesse) => (
                      <WrapItem key={interesse}>
                        <Badge 
                          colorScheme="blue" 
                          variant="solid"
                          px={2}
                          py={1}
                          borderRadius="full"
                          fontSize="xs"
                        >
                          {interesse}
                        </Badge>
                      </WrapItem>
                    ))}
                  </Wrap>
                  
                  <Box mt={4} p={4} bg="blue.50" borderRadius="md" borderLeft="4px solid" borderLeftColor="blue.400">
                    <Text fontSize="sm" color="blue.800">
                      <strong>Dica:</strong> Com base nos seus interesses, recomendamos explorar os programas de 
                      <strong> Frontend</strong>, <strong>Backend</strong> e <strong>Cloud</strong>.
                    </Text>
                  </Box>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>

          <Card shadow="md">
            <CardHeader>
              <HStack spacing={2} color="black" alignItems="center">
                <Heading as="h2" size="md">
                  Suas Estatísticas
                </Heading>
              </HStack>
            </CardHeader>
            <CardBody>
              <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
                <VStack>
                  <Text fontSize="3xl" fontWeight="bold" color="blue.500">12</Text>
                  <Text fontSize="sm" color="gray.600" textAlign="center">Programas Visualizados</Text>
                </VStack>
                <VStack>
                  <Text fontSize="3xl" fontWeight="bold" color="red.500">3</Text>
                  <Text fontSize="sm" color="gray.600" textAlign="center">Programas Favoritos</Text>
                </VStack>
                <VStack>
                  <Text fontSize="3xl" fontWeight="bold" color="green.500">6</Text>
                  <Text fontSize="sm" color="gray.600" textAlign="center">Áreas de Interesse</Text>
                </VStack>
                <VStack>
                  <Text fontSize="3xl" fontWeight="bold" color="purple.500">85%</Text>
                  <Text fontSize="sm" color="gray.600" textAlign="center">Perfil Completo</Text>
                </VStack>
              </SimpleGrid>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Box>
  )
}
