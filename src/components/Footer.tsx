'use client'

import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
  HStack,
  Icon,
  Link,
  Flex,
  VStack,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { GraduationCap } from 'lucide-react'
import { ReactNode } from 'react'

const FooterLinks = [
    { name: 'Início', href: '/' },
    { name: 'Programas', href: '/programas' },
    { name: 'Instituições', href: '/instituicoes' },
    { name: 'Favoritos', href: '/favoritos' },
    { name: 'Perfil', href: '/perfil' },
]

interface SocialButtonProps {
    children: ReactNode
    href: string
}

const SocialButton = ({ children, href }: SocialButtonProps) => {
  return (
    <Link
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={10} 
      h={10}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
        color: 'blue.500'
      }}>
      {children}
    </Link>
  )
}

export function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.100', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      mt="auto" 
      borderTop="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      w="full"
    >
        <Container 
            maxW={'1400'}
            py={6}
            as={Flex}
            direction={{ base: 'column', md: 'row' }}
            align={'center'}
            justify={'space-between'}
        >
            <VStack 
                spacing={3} 
                align={{ base: 'center', md: 'flex-start' }}
                order={{ base: 1, md: 1 }}
            >
                <HStack spacing={1} cursor="pointer" as={NextLink} href="/">
                    <Icon as={GraduationCap} w={8} h={8} color="blue.500" />
                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                      bgGradient="linear(to-r, blue.500, purple.600)"
                      bgClip="text"
                    >
                      TechForma
                    </Text>
                </HStack>
                <HStack spacing={3}>
                    <SocialButton href={'#'}>
                      <FaLinkedin size={20} />
                    </SocialButton>
                    <SocialButton href={'https://github.com/SViniQ'}>
                      <FaGithub size={20} />
                    </SocialButton>
                    <SocialButton href={'#'}>
                      <FaTwitter size={20} />
                    </SocialButton>
                </HStack>
            </VStack>
            
            <Stack 
                direction={'column'}
                spacing={2} 
                align={{ base: 'center', md: 'flex-end' }}
                order={{ base: 2, md: 2 }}
                mt={{ base: 4, md: 0 }}
            >
                {FooterLinks.map((item) => (
                    <Link 
                        key={item.name}
                        as={NextLink} 
                        href={item.href}
                        fontSize={{ base: 'md', md: 'sm' }} 
                        fontWeight={'medium'}
                        _hover={{ color: 'blue.500' }}
                    >
                        {item.name}
                    </Link>
                ))}
            </Stack>
        </Container>

        <Box
          borderTopWidth={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          bg={useColorModeValue('gray.200', 'gray.800')}
          w="full"
          py={3}
        >
          <Container
            maxW={'container.xl'}
            textAlign={'center'}
          >
            <Text fontSize={'xs'} color={useColorModeValue('gray.600', 'gray.400')}>
              © {new Date().getFullYear()} TechForma. Todos os direitos reservados.
            </Text>
          </Container>
        </Box>
    </Box>
  )
}
