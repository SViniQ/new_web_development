<h1 align="center">🎓 TechForma</h1>

<p align="center">
  <img loading="lazy" src="https://img.shields.io/badge/STATUS-CONCLUÍDO-brightgreen?style=for-the-badge"/>
  <img loading="lazy" src="https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js"/>
  <img loading="lazy" src="https://img.shields.io/badge/Chakra_UI-2.10.9-teal?style=for-the-badge&logo=chakraui"/>
  <img loading="lazy" src="https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript"/>
  <img loading="lazy" src="https://img.shields.io/badge/Zustand-orange?style=for-the-badge"/>
</p>

<p align="center">
  <img loading="lazy" src="https://img.shields.io/github/stars/YlsonSantos/frontend-prompt-gen?style=social"/>
  <img loading="lazy" src="https://img.shields.io/github/forks/YlsonSantos/frontend-prompt-gen?style=social"/>
</p>

---

## 📋 Índice

* [Descrição do Projeto](#-descrição-do-projeto)
* [Status do Projeto](#-status-do-projeto)
* [Funcionalidades e Demonstração](#-funcionalidades-e-demonstração)
* [Acesso ao Projeto](#-acesso-ao-projeto)
* [Tecnologias Utilizadas](#-tecnologias-utilizadas)
* [Estrutura do Projeto](#-estrutura-do-projeto)
* [Arquitetura](#-arquitetura)
* [Como Executar](#-como-executar)
* [Pessoas Desenvolvedoras](#-pessoas-desenvolvedoras)
* [Licença](#-licença)

---

## 📖 Descrição do Projeto

O **TechForma** é uma plataforma web moderna que centraliza programas de formação em tecnologia, facilitando a descoberta de oportunidades de capacitação profissional. Desenvolvido como uma recriação do projeto original em React/Vite para **Next.js**, mantendo total compatibilidade funcional.

A plataforma oferece uma experiência completa para usuários que buscam capacitação em diversas áreas tecnológicas como:
- 🖥️ **Desenvolvimento Frontend & Backend**
- 📊 **Ciência de Dados & Analytics**
- ☁️ **Cloud Computing & DevOps**
- 🎨 **UX/UI Design**
- 📱 **Desenvolvimento Mobile**
- 🔒 **Segurança da Informação**

---

## 🚀 Status do Projeto

<h4 align="center"> 
	✅ TechForma - Projeto Concluído ✅
</h4>

**Todas as funcionalidades do repositório original foram implementadas com sucesso!**

---

## 🔨 Funcionalidades e Demonstração

### Funcionalidades Principais

- `Página Inicial`: Hero section com gradient e showcase de programas em destaque
- `Catálogo de Programas`: Lista completa com sistema de filtros avançados
- `Detalhes do Programa`: Página individual com informações completas
- `Sistema de Favoritos`: Persistência local dos programas favoritos
- `Lista de Instituições`: Catálogo de instituições parceiras
- `Perfil do Usuário`: Página de perfil com estatísticas pessoais
- `Navegação Intuitiva`: Sistema de roteamento com indicadores visuais
- `Filtros Inteligentes`: Busca por área, modalidade, nível e texto
- `Design Responsivo`: Interface adaptável para desktop e mobile
- `Estados de Loading`: Feedback visual durante carregamento de dados

### Demonstração Visual

A aplicação possui uma interface moderna e intuitiva:

- **Hero Section**: Seção principal com busca destacada e call-to-action
- **Cards Interativos**: Componentes com hover effects e sistema de favoritos
- **Filtros Dinâmicos**: Sistema de busca em tempo real
- **Layout Responsivo**: Design que se adapta a diferentes dispositivos

---

## 📁 Acesso ao Projeto

### � Links Importantes

- **Repositório Original**: [frontend-prompt-gen](https://github.com/YlsonSantos/frontend-prompt-gen.git)
- **Tecnologias Obrigatórias**: Next.js + Chakra UI + Zustand

### 💻 Como baixar o projeto

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/techforma.git

# Acesse o diretório
cd techforma
```

---

## 🛠️ Abrir e Rodar o Projeto

**Pré-requisitos necessários:**
- Node.js (versão 18 ou superior)
- npm ou yarn
- Git

**Instruções de instalação:**

```bash
# 1. Instale as dependências
npm install

# 2. Execute o servidor de desenvolvimento
npm run dev

# 3. Acesse no navegador
# http://localhost:3000
```

**Scripts disponíveis:**
- `npm run dev` - Executa em modo de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run start` - Executa build de produção
- `npm run lint` - Executa verificação de código

---

## 🚀 Tecnologias Utilizadas

### Framework & Core
- ![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?logo=next.js) **Next.js 15** - Framework React com App Router
- ![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react) **React 19** - Biblioteca JavaScript para UI
- ![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript) **TypeScript** - Superset JavaScript com tipagem

### UI & Styling
- ![Chakra UI](https://img.shields.io/badge/Chakra_UI-2.10.9-teal?logo=chakraui) **Chakra UI** - Sistema de design modular
- ![Emotion](https://img.shields.io/badge/Emotion-11.14.0-pink) **Emotion** - CSS-in-JS para estilização
- ![Framer Motion](https://img.shields.io/badge/Framer_Motion-6.5.1-purple) **Framer Motion** - Animações fluidas

### Estado & Dados
- ![Zustand](https://img.shields.io/badge/Zustand-orange) **Zustand** - Gerenciamento de estado global
- **Zustand Persist** - Persistência no localStorage

### Ícones & Assets
- ![React Icons](https://img.shields.io/badge/React_Icons-5.5.0-red) **React Icons** - Biblioteca de ícones
- **Chakra UI Icons** - Ícones integrados ao sistema de design

### Desenvolvimento
- ![ESLint](https://img.shields.io/badge/ESLint-purple?logo=eslint) **ESLint** - Linting de código
- **Turbopack** - Bundler de alta performance

---

## 📂 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── layout.tsx         # Layout global da aplicação
│   ├── page.tsx           # Página inicial (/)
│   ├── programas/         # Rotas de programas
│   │   ├── page.tsx       # Lista de programas
│   │   └── [id]/page.tsx  # Detalhes do programa
│   ├── instituicoes/      # Lista de instituições
│   ├── favoritos/         # Programas favoritos
│   ├── perfil/           # Perfil do usuário
│   └── not-found.tsx     # Página 404
├── components/            # Componentes reutilizáveis
│   ├── Navigation.tsx     # Barra de navegação
│   ├── FilterBar.tsx      # Sistema de filtros
│   ├── ProgramCard.tsx    # Card de programa
│   └── InstitutionCard.tsx # Card de instituição
├── store/                # Gerenciamento de estado
│   └── useAppStore.ts    # Store principal com Zustand
├── services/             # Camada de serviços
│   └── programasService.ts # Serviços de dados
├── data/                 # Dados mocados
│   ├── programas.ts      # Lista de programas
│   └── instituicoes.ts   # Lista de instituições
├── types/               # Definições TypeScript
│   └── index.ts         # Interfaces principais
└── lib/                 # Utilitários
    └── utils.ts         # Funções auxiliares
```

---

## �️ Arquitetura

### Padrões Arquiteturais Utilizados

#### **1. App Router (Next.js 13+)**
- Roteamento baseado em sistema de arquivos
- Server Components por padrão
- Layouts aninhados e compartilhados

#### **2. Gerenciamento de Estado (Zustand)**
```typescript
interface AppState {
  // Filtros de busca
  filtros: FiltrosPrograma
  setFiltros: (filtros: Partial<FiltrosPrograma>) => void
  
  // Sistema de favoritos
  favoritos: string[]
  toggleFavorito: (programaId: string) => void
  
  // Estados de UI
  loading: boolean
  setLoading: (loading: boolean) => void
}
```

#### **3. Componentização (Chakra UI)**
- Sistema de design consistente
- Componentes reutilizáveis e acessíveis
- Theming personalizável

#### **4. Tipagem Forte (TypeScript)**
```typescript
interface Programa {
  id: string
  titulo: string
  descricao: string
  area: AreaPrograma
  modalidade: Modalidade
  nivel: NivelPrograma
  duracao: string
  instituicao: string
  preco: number
  gratuito: boolean
  certificado: boolean
  destaque: boolean
}
```

### **Fluxo de Dados**
1. **Componentes** consomem dados do store Zustand
2. **Services** centralizam lógica de negócio
3. **Mock Data** simula API externa
4. **Persistência** via localStorage (favoritos)

---

## 📊 Funcionalidades Implementadas vs Original

| Funcionalidade | Status | Observações |
|---------------|--------|-------------|
| Página Inicial | ✅ | Hero section aprimorada |
| Lista de Programas | ✅ | Com filtros funcionais |
| Detalhes do Programa | ✅ | Página individual completa |
| Sistema de Favoritos | ✅ | Com persistência localStorage |
| Lista de Instituições | ✅ | Cards com informações completas |
| Perfil do Usuário | ✅ | Com estatísticas e mock data |
| Navegação | ✅ | Indicadores visuais ativos |
| Filtros | ✅ | Busca, área, modalidade, nível |
| Design Responsivo | ✅ | Mobile-first approach |
| Estados de Loading | ✅ | Feedback visual consistente |

---

## 🎯 Decisões Técnicas

### **Por que Next.js?**
- ✅ **SSR/SSG** - Melhor SEO e performance
- ✅ **App Router** - Roteamento moderno
- ✅ **Otimizações** - Bundle splitting automático
- ✅ **Developer Experience** - Hot reload e TypeScript

### **Por que Chakra UI?**
- ✅ **Sistema de Design** - Componentes consistentes
- ✅ **Acessibilidade** - ARIA by default
- ✅ **Customização** - Theming flexível
- ✅ **Developer Experience** - Props intuitivas

### **Por que Zustand?**
- ✅ **Simplicidade** - API minimalista
- ✅ **Performance** - Re-renders otimizados
- ✅ **TypeScript** - Tipagem nativa
- ✅ **Persistência** - Plugin de localStorage

---

## 👥 Pessoas Desenvolvedoras

| [<img loading="lazy" src="https://avatars.githubusercontent.com/u/username?v=4" width=115><br><sub>Seu Nome</sub>](https://github.com/username) |
| :---: |

**Desenvolvedor Fullstack Sênior**
- 💼 Especialista em Next.js e React
- 🎯 Foco em arquitetura escalável e UX
- 📧 Contato: [seu.email@exemplo.com](mailto:seu.email@exemplo.com)

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## � Agradecimentos

- **Repositório Original**: [YlsonSantos](https://github.com/YlsonSantos) pelo projeto base
- **Chakra UI Team**: Pela excelente biblioteca de componentes
- **Vercel Team**: Pelo Next.js e suas inovações
- **Zustand Team**: Pela solução elegante de gerenciamento de estado

---

<p align="center">
  Feito com ❤️ e muito ☕ usando <strong>Next.js + Chakra UI + Zustand</strong>
</p>

<p align="center">
  <img loading="lazy" src="https://img.shields.io/badge/Made_with-❤️-red?style=for-the-badge"/>
  <img loading="lazy" src="https://img.shields.io/badge/Powered_by-☕-brown?style=for-the-badge"/>
</p>
