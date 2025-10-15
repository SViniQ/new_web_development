import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { FiltrosPrograma } from '@/types/domain'

interface AppState {
  filtros: FiltrosPrograma
  setFiltros: (filtros: Partial<FiltrosPrograma>) => void
  resetFiltros: () => void
  
  favoritos: string[]
  toggleFavorito: (programaId: string) => void
  
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
      filtros: filtrosIniciais,
      favoritos: [],
      loading: false,
      
      setFiltros: (novosFiltros) =>
        set((state) => ({
          filtros: { ...state.filtros, ...novosFiltros },
        })),
      
      resetFiltros: () =>
        set({ filtros: filtrosIniciais }),
      
      toggleFavorito: (programaId) =>
        set((state) => ({
          favoritos: state.favoritos.includes(programaId)
            ? state.favoritos.filter((id) => id !== programaId)
            : [...state.favoritos, programaId],
        })),
      
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: 'techforma-storage',
      partialize: (state) => ({ favoritos: state.favoritos }),
    }
  )
)