'use client'

import {
  Box,
  Flex,
  Button,
  Text,
  Container,
  HStack,
  Icon,
} from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaHome, FaBookOpen, FaBuilding, FaHeart, FaUser } from 'react-icons/fa'
import { GraduationCap } from 'lucide-react'

const NavItems = [
  { name: 'Início', href: '/', icon: <FaHome /> },
  { name: 'Programas', href: '/programas', icon: <FaBookOpen /> },
  { name: 'Instituições', href: '/instituicoes', icon: <FaBuilding /> },
  { name: 'Favoritos', href: '/favoritos', icon: <FaHeart /> },
  { name: 'Perfil', href: '/perfil', icon: <FaUser /> },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <Box
      bg="white"
      borderBottom="1px"
      borderColor="gray.200"
      position="sticky"
      top={0}
      zIndex={1000}
      backdropFilter="blur(10px)"
      backgroundColor="rgba(255, 255, 255, 0.9)"
    >
      <Container maxW="1400px">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          {/* Logo */}
          <Link href="/">
            <HStack spacing={1} cursor="pointer">
              <Icon as={GraduationCap} w={8} h={8} color="blue.500" />
              <Text
                fontSize="xl"
                fontWeight="bold"
                bgGradient="linear(to-r, blue.500, purple.600)"
                bgClip="text"
              >
                TechForma
              </Text>
            </HStack>
          </Link>

          {/* Navigation Items (Desktop) */}
          <HStack spacing={2} display={{ base: 'none', md: 'flex' }} py={2}>
            {NavItems.map((item) => (
              <Link key={item.name} href={item.href} passHref>
                <Button
                  as="a"
                  variant={pathname === item.href ? 'solid' : 'ghost'}
                  bg={pathname === item.href ? '#007bff' : 'transparent'}
                  color={pathname === item.href ? 'white' : 'gray.800'}
                  size="sm"
                  // Reduzido para 'md' no botão selecionado
                  borderRadius={pathname === item.href ? 'md' : 'full'}
                  _hover={{
                    bg: pathname === item.href ? 'blue.800' : 'gray.100',
                    color: pathname === item.href ? 'white' : 'gray.900'
                  }}
                  leftIcon={item.icon}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </HStack>

          {/* Mobile Navigation */}
          <HStack spacing={1} display={{ base: 'flex', md: 'none' }}>
            {NavItems.map((item) => (
              <Link key={item.name} href={item.href} passHref>
                <Button
                  as="a"
                  variant={pathname === item.href ? 'solid' : 'ghost'}
                  colorScheme={pathname === item.href ? 'blue' : 'gray'}
                  bg={pathname === item.href ? 'blue.500' : 'transparent'}
                  color={pathname === item.href ? 'white' : 'gray.800'}
                  size="md"
                  p={2}
                  // Reduzido para 'md' no botão selecionado (mobile)
                  borderRadius={pathname === item.href ? 'md' : 'full'}
                  _hover={{
                    bg: pathname === item.href ? 'blue.600' : 'gray.100',
                    color: pathname === item.href ? 'white' : 'gray.900'
                  }}
                >
                  {item.icon}
                </Button>
              </Link>
            ))}
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}
