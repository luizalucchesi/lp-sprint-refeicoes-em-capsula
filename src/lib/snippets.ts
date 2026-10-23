/**
 * Snippets Meta Tracking - SPRINT (ref 59168)
 *
 * Módulo unificado para integração com a API de Conversões da Meta via edge function:
 * Endpoint: https://aomkmulukjuwsbrlbfgl.supabase.co/functions/v1/conversoes
 * Negócio: 'instituto-do-sabor'
 * Sessão: 'sprint_instituto-do-sabor_session_id'
 * Event IDs canônicos para deduplicação entre browser e servidor
 * Purchase dispara EXCLUSIVAMENTE server-side (sem `fbq('track', 'Purchase')` no navegador)
 */

export {
  META_PIXEL_ID,
  KIWIFY_CHECKOUT_URL,
  SPRINT_NEGOCIO_SLUG,
  SPRINT_PRODUCT_ID,
  SPRINT_PRODUCT_NAME,
  SPRINT_VALOR_REAIS,
  SPRINT_CONVERSOES_ENDPOINT,
} from '@/lib/tracking/config'

export {
  obterOuCriarSessionId,
  capturarEPersistirUtms,
  inicializarMetaPixel,
  dispararPageViewCanonico,
  dispararInitiateCheckoutCanonico,
  dispararPurchaseSPRINT,
  enriquecerUrlCheckout,
  enviarEventoSPRINT,
  configurarCheckoutKiwify,
  inicializarRastreamentoLanding,
  inicializarRastreamentoObrigado,
} from '@/lib/tracking/sprintTracker'
