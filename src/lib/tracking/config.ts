/**
 * Constantes de Configuração do Funil de Vendas e Rastreamento Meta / SPRINT (ref 59168).
 */

export const META_PIXEL_ID =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_META_PIXEL_ID) || '2370355543368387'

export const KIWIFY_CHECKOUT_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_KIWIFY_CHECKOUT_URL) ||
  'https://pay.kiwify.com.br/kPUhdIm'

export const SPRINT_NEGOCIO_SLUG = 'instituto-do-sabor'
export const SPRINT_PRODUCT_ID = 'cd86f860-ca5d-11f1-b7fe-c57a0f1a8146'
export const SPRINT_PRODUCT_NAME = 'Refeições em Cápsula'
export const SPRINT_VALOR_REAIS = 47.0

export const SPRINT_CONVERSOES_ENDPOINT =
  'https://aomkmulukjuwsbrlbfgl.supabase.co/functions/v1/conversoes'
