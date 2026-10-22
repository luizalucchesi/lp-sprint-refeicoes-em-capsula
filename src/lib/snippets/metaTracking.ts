/**
 * Meta Tracking Snippet - SPRINT pattern (ref 59168)
 * Integrates Meta Pixel (fbq) + Conversions Endpoint (Supabase edge function).
 */

export const META_PIXEL_ID = '123456789012345' // Configure aqui o seu Meta Pixel ID
export const META_CONVERSIONS_ENDPOINT =
  'https://aomkmulukjuwsbrlbfgl.supabase.co/functions/v1/conversoes'
export const KIWIFY_CHECKOUT_URL = 'https://pay.kiwify.com.br/placeholder-refeicoes-em-capsula' // Substituir pelo link do checkout Kiwify oficial

const SESSION_STORAGE_KEY = 'metodoplana_session_id'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    _fbq?: unknown
  }
}
/**
 * Retorna ou gera um ID único e persistido para a sessão.
 */
export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return ''
  try {
    const existing = localStorage.getItem(SESSION_STORAGE_KEY)
    if (existing) return existing
    const newId = 'sess_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36)
    localStorage.setItem(SESSION_STORAGE_KEY, newId)
    return newId
  } catch {
    return 'sess_fallback_' + Date.now()
  }
}

/**
 * Gera um event_id canônico e único para deduplicação entre Pixel do navegador e CAPI (servidor).
 */
export function generateCanonicalEventId(eventName: string): string {
  const sessionId = getOrCreateSessionId()
  return `${eventName}_${sessionId}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
}

let pixelInitialized = false

/**
 * Inicializa o Meta Pixel base no <head> com o PIXEL_ID fornecido (executa apenas uma vez).
 */
export function initMetaPixel(pixelId: string = META_PIXEL_ID): void {
  if (typeof window === 'undefined' || pixelInitialized) return

  // Verifica se o script do fbq já foi inserido
  if (!window.fbq) {
    /* eslint-disable */
    ;(function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      }
      if (!f._fbq) f._fbq = n
      n.push = n
      n.loaded = !0
      n.version = '2.0'
      n.queue = []
      t = b.createElement(e)
      t.async = !0
      t.src = v
      s = b.getElementsByTagName(e)[0]
      s?.parentNode?.insertBefore(t, s)
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
    /* eslint-enable */
  }

  if (window.fbq) {
    window.fbq('init', pixelId)
    pixelInitialized = true
  }
}

/**
 * Envia evento PageView client-side e sincroniza com o endpoint de conversões.
 */
export function trackPageView(pageUrl?: string): void {
  if (typeof window === 'undefined') return
  const eventId = generateCanonicalEventId('PageView')
  const sessionId = getOrCreateSessionId()
  const currentUrl = pageUrl || window.location.href

  // 1. Client-side fbq
  if (window.fbq) {
    window.fbq('track', 'PageView', {}, { eventID: eventId })
  }

  // 2. Server-side conversões
  sendToConversionsApi({
    event_name: 'PageView',
    event_id: eventId,
    session_id: sessionId,
    event_source_url: currentUrl,
  })
}

/**
 * Disparado ao clicar no botão de CTA / checkout.
 */
export function trackInitiateCheckout(customData?: Record<string, any>): void {
  if (typeof window === 'undefined') return
  const eventId = generateCanonicalEventId('InitiateCheckout')
  const sessionId = getOrCreateSessionId()
  const data = {
    content_name: 'Refeições em Cápsula + 4 bônus',
    content_category: 'Culinária / Sistema de Cozinha',
    value: 47.0,
    currency: 'BRL',
    ...customData,
  }

  // 1. Client-side
  if (window.fbq) {
    window.fbq('track', 'InitiateCheckout', data, { eventID: eventId })
  }

  // 2. Server-side
  sendToConversionsApi({
    event_name: 'InitiateCheckout',
    event_id: eventId,
    session_id: sessionId,
    event_source_url: window.location.href,
    custom_data: data,
  })
}

/**
 * Purchase é disparado EXCLUSIVAMENTE via SERVER-SIDE no endpoint SPRINT
 * (a página /obrigado não dispara Purchase client-side, somente via endpoint de conversões).
 */
export function sendServerSidePurchase(params: {
  value?: number
  currency?: string
  orderId?: string
  userEmail?: string
  userName?: string
}): Promise<void> {
  const eventId = generateCanonicalEventId('Purchase')
  const sessionId = getOrCreateSessionId()

  return sendToConversionsApi({
    event_name: 'Purchase',
    event_id: eventId,
    session_id: sessionId,
    event_source_url: typeof window !== 'undefined' ? window.location.href : '',
    custom_data: {
      content_name: 'Refeições em Cápsula + 4 bônus',
      value: params.value ?? 47.0,
      currency: params.currency ?? 'BRL',
      order_id: params.orderId || 'ord_' + Date.now(),
    },
    user_data: {
      email: params.userEmail,
      name: params.userName,
    },
  })
}

/**
 * Envia o evento para a edge function de conversões (Supabase).
 */
async function sendToConversionsApi(payload: {
  event_name: string
  event_id: string
  session_id: string
  event_source_url: string
  custom_data?: Record<string, any>
  user_data?: Record<string, any>
}): Promise<void> {
  try {
    const body = JSON.stringify({
      ...payload,
      timestamp: Math.floor(Date.now() / 1000),
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    })

    await fetch(META_CONVERSIONS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
      // keepalive para que a requisição complete mesmo com navegação de página
      keepalive: true,
    })
  } catch (error) {
    // Falha silenciosa para não quebrar a navegação do usuário
    console.debug('[MetaTracking SPRINT] Conversions API dispatch note:', error)
  }
}
