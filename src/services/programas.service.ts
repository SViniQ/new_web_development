import { Programa, Instituicao, FiltrosPrograma } from '@/types/domain'
import { programas } from '@/data/programas'
import { instituicoes } from '@/data/instituicoes'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export class ProgramasService {
  async listarProgramas(filtros?: Partial<FiltrosPrograma>): Promise<Programa[]> {
    await delay(300) 
    
    let resultado = [...programas]
    
    if (filtros) {
      if (filtros.busca) {
        const busca = filtros.busca.toLowerCase()
        resultado = resultado.filter(programa => 
          programa.titulo.toLowerCase().includes(busca) ||
          programa.resumo.toLowerCase().includes(busca) ||
          programa.tags.some(tag => tag.toLowerCase().includes(busca))
        )
      }
      
      if (filtros.area) {
        resultado = resultado.filter(programa => programa.area === filtros.area)
      }
      
      if (filtros.modalidade) {
        resultado = resultado.filter(programa => programa.modalidade === filtros.modalidade)
      }
      
      if (filtros.nivel) {
        resultado = resultado.filter(programa => programa.nivel === filtros.nivel)
      }
    }
    
    return resultado
  }
  
  async buscarPrograma(id: string): Promise<Programa | null> {
    await delay(200)
    return programas.find(programa => programa.id === id) || null
  }
  
  async listarInstituicoes(): Promise<Instituicao[]> {
    await delay(200)
    return [...instituicoes]
  }
  
  async buscarInstituicao(id: string): Promise<Instituicao | null> {
    await delay(150)
    return instituicoes.find(instituicao => instituicao.id === id) || null
  }
}

export const programasService = new ProgramasService()