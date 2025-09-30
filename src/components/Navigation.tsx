'use client'

import {
  Box,
  Flex,
  Button,
  Text,
  Container,
} from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavItems = [
  { name: 'Início', href: '/', icon: '🏠' },
  { name: 'Programas', href: '/programas', icon: '📚' },
  { name: 'Instituições', href: '/instituicoes', icon: '🏢' },
  { name: 'Favoritos', href: '/favoritos', icon: '❤️' },
  { name: 'Perfil', href: '/perfil', icon: '👤' },
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
      <Container maxW="container.xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          {/* Logo */}
          <Link href="/">
            <Flex alignItems="center" gap={2} cursor="pointer">
              <Text fontSize="2xl">🎓</Text>
              <Text
                fontSize="xl"
                fontWeight="bold"
                bgGradient="linear(to-r, primary.500, secondary.500)"
                bgClip="text"
              >
                TechForma
              </Text>
            </Flex>
          </Link>

          {/* Navigation Items */}
          <Flex gap={4} display={{ base: 'none', md: 'flex' }}>
            {NavItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={pathname === item.href ? 'solid' : 'ghost'}
                  colorScheme={pathname === item.href ? 'blue' : 'gray'}
                  size="sm"
                >
                  {item.icon} {item.name}
                </Button>
              </Link>
            ))}
          </Flex>

          {/* Mobile Navigation */}
          <Flex gap={2} display={{ base: 'flex', md: 'none' }}>
            {NavItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={pathname === item.href ? 'solid' : 'ghost'}
                  colorScheme={pathname === item.href ? 'blue' : 'gray'}
                  size="sm"
                  p={2}
                >
                  {item.icon}
                </Button>
              </Link>
            ))}
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}