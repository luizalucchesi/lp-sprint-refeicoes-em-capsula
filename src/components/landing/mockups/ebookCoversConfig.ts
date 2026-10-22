/**
 * REGISTRO CENTRAL DE CAPAS DOS E-BOOKS E MATERIAIS
 *
 * INSTRUÇÕES PARA A USUÁRIA:
 * Quando você tiver a imagem real da capa (JPG, PNG, WEBP ou SVG),
 * basta colar a URL ou caminho da imagem na propriedade 'imageUrl' correspondente abaixo.
 *
 * Se 'imageUrl' estiver vazio (''), o sistema exibe automaticamente a capa-placeholder
 * gerada em HTML/CSS com a paleta oficial da marca e tipografia Fraunces.
 */

export interface EbookCoverData {
  id: string
  title: string
  subtitle?: string
  badge?: string
  accentColor?: string
  bgGradient?: string
  imageUrl?: string // << Coloque aqui o caminho da imagem real quando disponível!
  iconName?: 'snowflake' | 'spreadsheet' | 'macros' | 'special' | 'book'
}

export const EBOOK_COVERS: Record<string, EbookCoverData> = {
  manualDoFreezer: {
    id: 'bonus-manual-freezer',
    title: 'Manual do Freezer',
    subtitle: 'Como as 24 bases cabem no seu congelador com o sistema de arquivo vertical',
    badge: 'BÔNUS 01',
    accentColor: '#C9D8DD', // Azul Gelo
    bgGradient: 'from-[#1F3429] via-[#2E4A3B] to-[#1a2d23]',
    imageUrl: '', // << Substituir pela imagem real da capa quando enviar
    iconName: 'snowflake',
  },
  planilhaInteligente: {
    id: 'bonus-planilha-inteligente',
    title: 'Planilha Inteligente',
    subtitle: 'Escolha as bases do seu ciclo e liste os pratos possíveis instantaneamente',
    badge: 'BÔNUS 02',
    accentColor: '#8A5A3B', // Caramelo
    bgGradient: 'from-[#2a1b12] via-[#4d3221] to-[#251810]',
    imageUrl: '', // << Substituir pela imagem real da capa quando enviar
    iconName: 'spreadsheet',
  },
  tabelaDeMacros: {
    id: 'bonus-tabela-macros',
    title: 'Tabela de Macros',
    subtitle: 'Valores nutricionais e equilíbrio sem complicação e sem dieta restritiva',
    badge: 'BÔNUS 03',
    accentColor: '#C9D8DD', // Azul Gelo + Floresta
    bgGradient: 'from-[#14261c] via-[#243d30] to-[#16271e]',
    imageUrl: '', // << Substituir pela imagem real da capa quando enviar
    iconName: 'macros',
  },
  ocasiaoEspeciais: {
    id: 'bonus-ocasioes-especiais',
    title: 'Ocasiões Especiais',
    subtitle: 'Receitas que fogem do dia a dia e impressionam família e convidados',
    badge: 'BÔNUS 04',
    accentColor: '#B84A24', // Terracota
    bgGradient: 'from-[#4a1c0d] via-[#7D2E14] to-[#B84A24]',
    imageUrl: '', // << Substituir pela imagem real da capa quando enviar
    iconName: 'special',
  },
}
