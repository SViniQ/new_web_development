'use client'

import {
  Box,
  Flex,
  Button,
  Text,
  Container,
  HStack,
  Icon,
  IconButton,
  Collapse,
  VStack,
} from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaHome, FaBookOpen, FaBuilding, FaHeart, FaUser } from 'react-icons/fa'
import { GraduationCap } from 'lucide-react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { useState } from 'react'

const NavItems = [
  { name: 'Início', href: '/', icon: <FaHome /> },
  { name: 'Programas', href: '/programas', icon: <FaBookOpen /> },
  { name: 'Instituições', href: '/instituicoes', icon: <FaBuilding /> },
  { name: 'Favoritos', href: '/favoritos', icon: <FaHeart /> },
  { name: 'Perfil', href: '/perfil', icon: <FaUser /> },
]

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

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

          <HStack spacing={2} display={{ base: 'none', md: 'flex' }} py={2}>
            {NavItems.map((item) => (
              <Link key={item.name} href={item.href} passHref>
                <Button
                  as="a"
                  variant={pathname === item.href ? 'solid' : 'ghost'}
                  bg={pathname === item.href ? '#007bff' : 'transparent'}
                  color={pathname === item.href ? 'white' : 'gray.800'}
                  size="sm"
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

          <IconButton
            aria-label="Abrir Menu"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={toggleMenu}
            display={{ base: 'flex', md: 'none' }}
            variant="ghost"
          />
        </Flex>
      </Container>
      <Collapse in={isOpen} animateOpacity>
        <Box pb={4} display={{ md: 'none' }}>
          <VStack as="nav" spacing={2} align="stretch" px={4}>
            {NavItems.map((item) => (
              <Link key={item.name} href={item.href} passHref>
                <Button
                  as="a"
                  variant={pathname === item.href ? 'solid' : 'ghost'}
                  bg={pathname === item.href ? 'blue.500' : 'transparent'}
                  color={pathname === item.href ? 'white' : 'gray.800'}
                  size="md"
                  w="full"
                  justifyContent="flex-start"
                  leftIcon={item.icon}
                  onClick={toggleMenu}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </VStack>
        </Box>
      </Collapse>
    </Box>
  )
}