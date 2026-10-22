/**
 * Constantes de Configuração do Funil de Vendas e Rastreamento Meta / SPRINT.
 *
 * Configurações para substituição pelo anunciante / dono do projeto:
 * - META_PIXEL_ID: ID do Pixel da Meta para o evento client-side (ex: '123456789012345')
 * - KIWIFY_CHECKOUT_URL: URL do checkout na Kiwify (ex: 'https://pay.kiwify.com.br/SEU_CHECKOUT')
 * - NEGOCIO_ID / NEGOCIO_SLUG: Identificador do negócio para a API de Conversões do SPRINT
 * - SPRINT_CONVERSOES_ENDPOINT: Endpoint do Supabase para onde o SPRINT envia conversões
 */

export const META_PIXEL_ID =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_META_PIXEL_ID) || '123456789012345' // Substitua pelo seu Pixel ID da Meta

export const KIWIFY_CHECKOUT_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_KIWIFY_CHECKOUT_URL) ||
  'https://pay.kiwify.com.br/kPUhdIm'

export const SPRINT_NEGOCIO_SLUG = 'instituto-do-sabor'
export const SPRINT_PRODUCT_ID = 'refeicoes-em-capsula-47'
export const SPRINT_PRODUCT_NAME = 'Refeições em Cápsula'
export const SPRINT_VALOR_REAIS = 47.0

export const SPRINT_CONVERSOES_ENDPOINT =
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL
    ? `${import.meta.env.VITE_SUPABASE_URL.replace(/\/+$/, '')}/functions/v1/conversoes`
    : 'https://aomkmulukjuwsbrlbfgl.supabase.co/functions/v1/conversoes'
