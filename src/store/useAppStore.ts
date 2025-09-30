import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { FiltrosPrograma } from '@/types/domain'

interface AppState {
  // Filtros de busca
  filtros: FiltrosPrograma
  setFiltros: (filtros: Partial<FiltrosPrograma>) => void
  resetFiltros: () => void
  
  // Sistema de favoritos
  favoritos: string[]
  toggleFavorito: (programaId: string) => void
  
  // Loading states
  loading: boolean
  setLoading: (loading: boolean) => void
}

const filtrosIniciais: FiltrosPrograma = {
  busca: '',
  area: '',
  modalidade: '',
  nivel: '',
  periodo: '',
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Estado inicial
      filtros: filtrosIniciais,
      favoritos: [],
      loading: false,
      
      // Actions para filtros
      setFiltros: (novosFiltros) =>
        set((state) => ({
          filtros: { ...state.filtros, ...novosFiltros },
        })),
      
      resetFiltros: () =>
        set({ filtros: filtrosIniciais }),
      
      // Actions para favoritos
      toggleFavorito: (programaId) =>
        set((state) => ({
          favoritos: state.favoritos.includes(programaId)
            ? state.favoritos.filter((id) => id !== programaId)
            : [...state.favoritos, programaId],
        })),
      
      // Actions para loading
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: 'techforma-storage',
      // Apenas persistir favoritos
      partialize: (state) => ({ favoritos: state.favoritos }),
    }
  )
)