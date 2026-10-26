/**
 * Meta Tracking Snippet - SPRINT pattern (ref 59168)
 * Integrates Meta Pixel (fbq) + Conversions Endpoint (Supabase edge function).
 */

export const META_PIXEL_ID = '2370355543368387'
export const META_CONVERSIONS_ENDPOINT =
  'https://aomkmulukjuwsbrlbfgl.supabase.co/functions/v1/conversoes'
export const KIWIFY_CHECKOUT_URL = 'https://pay.kiwify.com.br/kPUhdIm'
export const NEGOCIO_ID = 'instituto-do-sabor'
export const SESSION_KEY = 'sprint_instituto-do-sabor_session_id'
export const SESSION_TS_KEY = 'sprint_instituto-do-sabor_session_ts'
export const SESSION_TTL = 30 * 60 * 1000

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    _fbq?: unknown
  }
}

/**
 * Retorna cookies _fbp e _fbc
 */
export function lerCookies(): { fbp?: string; fbc?: string } {
  const cookies: { fbp?: string; fbc?: string } = {}
  if (typeof document === 'undefined') return cookies
  try {
    const partes = (document.cookie || '').split('; ')
    for (let i = 0; i < partes.length; i++) {
      const par = partes[i].split('=')
      if (par[0] === '_fbp') cookies.fbp = decodeURIComponent(par[1] || '')
      if (par[0] === '_fbc') cookies.fbc = decodeURIComponent(par[1] || '')
    }
  } catch {
    /* ignore */
  }
  return cookies
}

/**
 * Hash determinístico curto da URL
 */
export function hashCurto(str: string): string {
  let h = 5381
  for (let i = 0; i < (str || '').length; i++) {
    h = (h << 5) + h + str.charCodeAt(i)
    h = h & 0xffffffff
  }
  return Math.abs(h).toString(36).slice(0, 8)
}

/**
 * Retorna ou gera o ID de sessão único do Instituto do Sabor (30 min TTL)
 */
export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return 's_ssr_0'
  const agora = Date.now()
  let sessionId = ''
  try {
    const sExistente = localStorage.getItem(SESSION_KEY)
    const sTs = parseInt(localStorage.getItem(SESSION_TS_KEY) || '0', 10)
    if (sExistente && sTs && agora - sTs < SESSION_TTL) {
      sessionId = sExistente
    } else {
      sessionId = 's_' + agora + '_' + Math.random().toString(36).substring(2, 8)
      localStorage.setItem(SESSION_KEY, sessionId)
    }
    localStorage.setItem(SESSION_TS_KEY, agora.toString())
  } catch {
    sessionId = 's_' + agora + '_' + Math.random().toString(36).substring(2, 8)
  }
  return sessionId
}

/**
 * Gera um event_id canônico e único para deduplicação entre Pixel do navegador e CAPI.
 */
export function generateCanonicalEventId(eventName: string): string {
  const sessionId = getOrCreateSessionId()
  const urlNorm =
    typeof window !== 'undefined' ? window.location.origin + window.location.pathname : ''
  return `${eventName}_${sessionId}_${hashCurto(urlNorm)}`
}

let pixelInitialized = false

/**
 * Inicializa o Meta Pixel base no <head> com o PIXEL_ID fornecido (executa apenas uma vez).
 */
export function initMetaPixel(pixelId: string = META_PIXEL_ID): void {
  if (typeof window === 'undefined' || pixelInitialized) return

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
    try {
      window.fbq('init', pixelId)
      pixelInitialized = true
    } catch {
      /* ignore */
    }
  }
}

/**
 * Envia evento PageView client-side e sincroniza com o endpoint de conversões.
 */
export function trackPageView(pageUrl?: string): void {
  if (typeof window === 'undefined') return
  const sessionId = getOrCreateSessionId()
  const currentUrl = pageUrl || window.location.href
  const eventId = 'PageView_' + sessionId + '_' + hashCurto(currentUrl)

  if (window.fbq) {
    try {
      window.fbq('track', 'PageView', {}, { eventID: eventId })
    } catch {
      /* ignore */
    }
  }

  sendToConversionsApi({
    evento: 'PageView',
    event_id: eventId,
    session_id: sessionId,
    event_source_url: currentUrl,
  })
}

/**
 * Disparado ao clicar no botão de CTA / checkout.
 */
export function trackInitiateCheckout(customData?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  const sessionId = getOrCreateSessionId()
  const eventId = 'InitiateCheckout_' + sessionId

  if (window.fbq) {
    try {
      window.fbq(
        'track',
        'InitiateCheckout',
        { content_name: 'Checkout', ...customData },
        { eventID: eventId },
      )
    } catch {
      /* ignore */
    }
  }

  sendToConversionsApi({
    evento: 'InitiateCheckout',
    event_id: eventId,
    session_id: sessionId,
    event_source_url: window.location.href,
  })
}

/**
 * Purchase é disparado EXCLUSIVAMENTE via SERVER-SIDE no endpoint SPRINT
 * (a página /obrigado não dispara Purchase client-side, somente via endpoint de conversões).
 */
export function sendServerSidePurchase(params: {
  value?: number
  currency?: string
  productId?: string
}): Promise<void> {
  const sessionId = getOrCreateSessionId()
  if (!sessionId) return Promise.resolve()

  const canonicalEventId = sessionId + '_purchase'

  return sendToConversionsApi({
    evento: 'Purchase',
    event_id: canonicalEventId,
    session_id: sessionId,
    event_source_url: typeof window !== 'undefined' ? window.location.href : '',
    valor: params.value ?? 47.0,
    moeda: params.currency ?? 'BRL',
    product_id: params.productId ?? 'cd86f860-ca5d-11f1-b7fe-c57a0f1a8146',
  })
}

/**
 * Envia o evento para a edge function de conversões (Supabase).
 */
async function sendToConversionsApi(payload: Record<string, unknown>): Promise<void> {
  try {
    const cookiesAtuais = lerCookies()
    const userData: Record<string, string> = {}
    if (cookiesAtuais.fbp) userData.fbp = cookiesAtuais.fbp
    if (cookiesAtuais.fbc) userData.fbc = cookiesAtuais.fbc

    const body = JSON.stringify({
      negocio_id: NEGOCIO_ID,
      client_user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      user_data: Object.keys(userData).length > 0 ? userData : undefined,
      ...payload,
    })

    await fetch(META_CONVERSIONS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    })
  } catch (error) {
    console.debug('[MetaTracking SPRINT] Conversions API dispatch note:', error)
  }
}
