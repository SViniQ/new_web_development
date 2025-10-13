'use client'

import {
  Input,
  Button,
  Select,
  HStack,
  VStack,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
} from '@chakra-ui/react'
import { SearchIcon, CloseIcon } from '@chakra-ui/icons'
import { useAppStore } from '@/store/useAppStore'
import { Area, Modalidade, Nivel } from '@/types/domain'

const FilterBar = () => {
  const { filtros, setFiltros, resetFiltros } = useAppStore()

  const hasActiveFilters =
    filtros.busca ||
    filtros.area ||
    filtros.modalidade ||
    filtros.nivel

  return (
    <VStack spacing={4} align="stretch">
      <HStack spacing={2}>
        <InputGroup flex={1}>
          <InputLeftElement>
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Buscar por título, tags ou descrição..."
            value={filtros.busca}
            onChange={(e) => setFiltros({ busca: e.target.value })}
            // Tamanho do input alterado para 'sm'
            size="sm" 
            bg="transparent"
            borderColor="gray.200"
            _hover={{ borderColor: 'gray.300' }}
          />
        </InputGroup>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={resetFiltros}
            leftIcon={<CloseIcon />}
            title="Limpar filtros"
          >
            Limpar
          </Button>
        )}
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={3}>
        <Select
          placeholder="Área"
          value={filtros.area || ""}
          onChange={(e) => setFiltros({ area: e.target.value as Area })}
          // Tamanho do select alterado para 'sm'
          size="sm" 
          bg="transparent"
          borderColor="gray.200"
          _hover={{ borderColor: 'gray.300' }}
        >
          <option value="">Todas as áreas</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="dados">Dados</option>
          <option value="cloud">Cloud</option>
          <option value="ux">UX/UI</option>
          <option value="mobile">Mobile</option>
          <option value="seguranca">Segurança</option>
        </Select>

        <Select
          placeholder="Modalidade"
          value={filtros.modalidade || ""}
          onChange={(e) => setFiltros({ modalidade: e.target.value as Modalidade })}
          size="sm" 
          bg="transparent"
          borderColor="gray.200"
          _hover={{ borderColor: 'gray.300' }}
        >
          <option value="">Todas as modalidades</option>
          <option value="presencial">Presencial</option>
          <option value="online">Online</option>
          <option value="hibrido">Híbrido</option>
        </Select>

        <Select
          placeholder="Nível"
          value={filtros.nivel || ""}
          onChange={(e) => setFiltros({ nivel: e.target.value as Nivel })}
          // Tamanho do select alterado para 'sm'
          size="sm" 
          bg="transparent"
          borderColor="gray.200"
          _hover={{ borderColor: 'gray.300' }}
        >
          <option value="">Todos os níveis</option>
          <option value="iniciante">Iniciante</option>
          <option value="intermediario">Intermediário</option>
          <option value="avancado">Avançado</option>
        </Select>
      </SimpleGrid>
    </VStack>
  )
}

export default FilterBar
