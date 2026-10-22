/**
 * Módulo de Rastreamento Canônico SPRINT + Meta Pixel.
 *
 * Reproduz rigorosamente as regras canônicas do SPRINT (projeto de referência 59168):
 * - Normalização de chaves de query (?utm_source, %3Futm_source -> utm_source)
 * - Persistência de UTMs no localStorage ('sprint_utms')
 * - Sessão de 30 min ('metodoplana_session_id', fallback 'sprint_session_id')
 * - Event IDs canônicos idênticos entre Pixel e API:
 *     PageView: PageView_<session_id>_<hashCurto>
 *     InitiateCheckout: InitiateCheckout_<session_id>
 *     Purchase: <session_id>_purchase (enviado 100% SERVER-SIDE via endpoint SPRINT, NUNCA fbq Purchase no navegador)
 * - Propagação automática de UTMs e session_id para URLs de checkout Kiwify
 */

import {
  META_PIXEL_ID,
  SPRINT_CONVERSOES_ENDPOINT,
  SPRINT_NEGOCIO_SLUG,
  SPRINT_PRODUCT_ID,
  SPRINT_VALOR_REAIS,
} from './config'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    _fbq?: unknown
    CRM?: {
      enviar: (
        evento: string,
        canonicalId: string,
        extra?: Record<string, unknown>,
        keepaliveOpt?: boolean,
      ) => void
    }
    SPRINT_VALOR?: number
    SPRINT_PRODUCT_ID?: string
  }
}

export function normalizarChaveQuery(chaveBruta: string): string {
  let chaveNorm = chaveBruta
  try {
    chaveNorm = decodeURIComponent(chaveNorm)
  } catch {
    /* ignore */
  }
  return chaveNorm.replace(/^[s?%3F]+/i, '').trim()
}

export function extrairUrlParams(searchOuUrl?: string): URLSearchParams {
  const search = searchOuUrl
    ? searchOuUrl.includes('?')
      ? searchOuUrl.split('?')[1]
      : searchOuUrl
    : typeof window !== 'undefined'
      ? window.location.search
      : ''

  const params = new URLSearchParams()
  try {
    const rawParams = new URLSearchParams(search)
    rawParams.forEach((valor, chaveBruta) => {
      const chaveNorm = normalizarChaveQuery(chaveBruta)
      if (chaveNorm && (!params.has(chaveNorm) || valor)) {
        params.set(chaveNorm, valor)
      }
    })
  } catch {
    /* ignore */
  }
  return params
}

export function extrairCookiesMeta(): { fbp?: string; fbc?: string } {
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

export function gerarHashCurto(str: string): string {
  let h = 5381
  for (let i = 0; i < (str || '').length; i++) {
    h = (h << 5) + h + str.charCodeAt(i)
    h = h & 0xffffffff
  }
  return Math.abs(h).toString(36).slice(0, 8)
}

export const SESSION_KEY = 'metodoplana_session_id'
export const SESSION_TS_KEY = 'metodoplana_session_ts'
export const SESSION_TTL = 30 * 60 * 1000

export function obterOuCriarSessionId(): string {
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

export function capturarEPersistirUtms(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  const urlParams = extrairUrlParams()
  const utmKeys = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'campaign_id',
    'meta_campaign_id',
    'ad_id',
    'adset_id',
    'fbclid',
    'adset_name',
    'ad_name',
    'campaign_name',
  ]
  let utms: Record<string, string> = {}
  try {
    const salvos = localStorage.getItem('sprint_utms')
    if (salvos) utms = JSON.parse(salvos) || {}
  } catch {
    /* ignore */
  }

  utmKeys.forEach((k) => {
    const v = urlParams.get(k)
    if (v) utms[k] = v
  })

  try {
    localStorage.setItem('sprint_utms', JSON.stringify(utms))
  } catch {
    /* ignore */
  }

  return utms
}

export function detectarTrafegoPago(utms: Record<string, string>): boolean {
  if (typeof window === 'undefined') return false
  const urlParams = extrairUrlParams()
  const fbclid = utms.fbclid || urlParams.get('fbclid') || ''
  const utmMedium = utms.utm_medium || ''
  const utmContent = utms.utm_content || ''
  const utmTerm = utms.utm_term || ''
  const adId = utms.ad_id || (/^\d+$/.test(utmContent) ? utmContent : '')
  const adsetId = utms.adset_id || (/^\d+$/.test(utmTerm) ? utmTerm : '')
  const docReferrer = typeof document !== 'undefined' ? document.referrer || '' : ''

  return (
    /cpc|paid|ppc|ads|traffic/i.test(utmMedium) ||
    Boolean(
      fbclid ||
      adId ||
      adsetId ||
      /(.|^)(facebook.com|fb.com|instagram.com|threads.net|messenger.com)/i.test(docReferrer),
    )
  )
}

function deveDisparar(tipo: string, urlNorm: string, sessionId: string): boolean {
  if (typeof window === 'undefined') return false
  const chave = 'sprint_guard_' + sessionId + '_' + tipo + '_' + gerarHashCurto(urlNorm)
  const agoraMs = Date.now()
  try {
    const ultimo = parseInt(localStorage.getItem(chave) || '0', 10)
    if (agoraMs - ultimo < 30000) return false
    localStorage.setItem(chave, agoraMs.toString())
    return true
  } catch {
    return true
  }
}

/**
 * Inicializa a biblioteca Meta Pixel no navegador uma única vez
 */
export function inicializarMetaPixel(pixelId = META_PIXEL_ID) {
  if (typeof window === 'undefined') return
  if (window.fbq) return /* eslint-disable */
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
    s.parentNode.insertBefore(t, s)
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
  /* eslint-enable */

  if (window.fbq) {
    try {
      window.fbq('init', pixelId)
    } catch (e) {
      console.warn('Falha ao inicializar Meta Pixel:', e)
    }
  }
}

/**
 * Helper central de despacho SPRINT (dispara Meta Pixel com eventID canônico + fetch ao CRM)
 */
export function enviarEventoSPRINT(
  evento: string,
  canonicalId: string,
  extra?: Record<string, unknown>,
  keepaliveOpt?: boolean,
) {
  if (typeof window === 'undefined') return
  const sessionId = obterOuCriarSessionId()
  const utms = capturarEPersistirUtms()
  const urlParams = extrairUrlParams()
  const urlAtual = window.location.href
  const cookiesAtuais = extrairCookiesMeta()
  const userData: Record<string, string> = {}
  if (cookiesAtuais.fbp) userData.fbp = cookiesAtuais.fbp
  if (cookiesAtuais.fbc) userData.fbc = cookiesAtuais.fbc

  const fbclid = utms.fbclid || urlParams.get('fbclid') || ''
  const utmSource = utms.utm_source || ''
  const utmMedium = utms.utm_medium || ''
  const utmCampaign = utms.utm_campaign || ''
  const campaignId = utms.campaign_id || utms.meta_campaign_id || ''
  const utmContent = utms.utm_content || ''
  const utmTerm = utms.utm_term || ''
  const rawAdsetNameParam = utms.adset_name || urlParams.get('adset_name') || ''
  const rawAdNameParam = utms.ad_name || urlParams.get('ad_name') || ''
  const rawCampaignNameParam = utms.campaign_name || urlParams.get('campaign_name') || ''
  const adId = utms.ad_id || (/^\d+$/.test(utmContent) ? utmContent : '')
  const adName = rawAdNameParam || (/^\d+$/.test(utmContent) ? '' : utmContent)
  const adsetId = utms.adset_id || (/^\d+$/.test(utmTerm) ? utmTerm : '')
  const adsetName =
    rawAdsetNameParam ||
    rawAdNameParam ||
    (/^\s*\d+/i.test(utmTerm) || /^\d+$/.test(utmTerm) ? '' : utmTerm)
  const campaignName = rawCampaignNameParam || utmCampaign
  const docReferrer = document.referrer || ''
  const isPaid = detectarTrafegoPago(utms)
  const fonteNormalizada = utmSource || (fbclid ? 'meta' : docReferrer ? 'referral' : 'direto')

  // Dispara Pixel no navegador COM eventID para deduplicação com CAPI
  if (typeof window.fbq === 'function') {
    try {
      window.fbq('track', evento, extra || {}, { eventID: canonicalId })
    } catch (errPixel) {
      console.warn('Erro ao disparar Meta Pixel:', errPixel)
    }
  }

  // Dispara fetch ao CRM SPRINT (mantém métricas de funil internas)
  try {
    fetch(SPRINT_CONVERSOES_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        negocio_id: SPRINT_NEGOCIO_SLUG,
        session_id: sessionId,
        event_id: canonicalId,
        evento: evento,
        client_user_agent: navigator.userAgent || undefined,
        event_source_url: urlAtual,
        referrer: docReferrer || undefined,
        campaign: campaignName || undefined,
        campaign_id: campaignId || undefined,
        campaign_name: rawCampaignNameParam || undefined,
        fonte: fonteNormalizada,
        trafego_pago: isPaid,
        ad_id: adId || undefined,
        ad_name: adName || undefined,
        adset_id: adsetId || undefined,
        adset_name: adsetName || undefined,
        fbclid: fbclid || undefined,
        user_data: Object.keys(userData).length > 0 ? userData : undefined,
      }),
      keepalive: Boolean(keepaliveOpt),
    }).catch((e) => {
      console.warn('Envio CRM SPRINT informativo:', e)
    })
  } catch {
    /* ignore */
  }
}

/**
 * Dispara PageView canônico na Landing Page ou página qualquer
 */
export function dispararPageViewCanonico() {
  if (typeof window === 'undefined') return
  const sessionId = obterOuCriarSessionId()
  capturarEPersistirUtms()
  const urlNormAtual = window.location.origin + window.location.pathname
  const pageViewEventId = 'PageView_' + sessionId + '_' + gerarHashCurto(urlNormAtual)

  if (deveDisparar('PageView', urlNormAtual, sessionId)) {
    enviarEventoSPRINT('PageView', pageViewEventId, {})
  }
}

/**
 * Enriquece uma URL de checkout Kiwify com session_id e UTMs capturadas
 */
export function enriquecerUrlCheckout(urlOriginal: string): string {
  if (typeof window === 'undefined') return urlOriginal
  try {
    const sessionId = obterOuCriarSessionId()
    const utms = capturarEPersistirUtms()
    const urlParams = extrairUrlParams()
    const u = new URL(urlOriginal, window.location.origin)

    const fbclid = utms.fbclid || urlParams.get('fbclid') || ''
    const utmSource = utms.utm_source || ''
    const utmMedium = utms.utm_medium || ''
    const utmCampaign = utms.utm_campaign || ''
    const campaignId = utms.campaign_id || utms.meta_campaign_id || ''
    const utmContent = utms.utm_content || ''
    const rawAdsetNameParam = utms.adset_name || urlParams.get('adset_name') || ''
    const rawAdNameParam = utms.ad_name || urlParams.get('ad_name') || ''
    const rawCampaignNameParam = utms.campaign_name || urlParams.get('campaign_name') || ''
    const adId = utms.ad_id || ''
    const adsetId = utms.adset_id || ''

    if (sessionId && !u.searchParams.get('utm_term')) u.searchParams.set('utm_term', sessionId)
    if (sessionId && !u.searchParams.get('session_id')) u.searchParams.set('session_id', sessionId)
    if (utmSource && !u.searchParams.get('utm_source')) u.searchParams.set('utm_source', utmSource)
    if (utmMedium && !u.searchParams.get('utm_medium')) u.searchParams.set('utm_medium', utmMedium)
    if (utmCampaign && !u.searchParams.get('utm_campaign'))
      u.searchParams.set('utm_campaign', utmCampaign)
    if (utmContent && !u.searchParams.get('utm_content'))
      u.searchParams.set('utm_content', utmContent)
    if (campaignId && !u.searchParams.get('campaign_id'))
      u.searchParams.set('campaign_id', campaignId)
    if (rawCampaignNameParam && !u.searchParams.get('campaign_name'))
      u.searchParams.set('campaign_name', rawCampaignNameParam)
    if (rawAdsetNameParam && !u.searchParams.get('adset_name'))
      u.searchParams.set('adset_name', rawAdsetNameParam)
    if (rawAdNameParam && !u.searchParams.get('ad_name'))
      u.searchParams.set('ad_name', rawAdNameParam)
    if (adId && !u.searchParams.get('ad_id')) u.searchParams.set('ad_id', adId)
    if (adsetId && !u.searchParams.get('adset_id')) u.searchParams.set('adset_id', adsetId)
    if (fbclid && !u.searchParams.get('fbclid')) u.searchParams.set('fbclid', fbclid)

    return u.toString()
  } catch {
    return urlOriginal
  }
}

/**
 * Dispara InitiateCheckout canônico antes de redirecionar para a Kiwify
 */
export function dispararInitiateCheckoutCanonico() {
  if (typeof window === 'undefined') return
  const sessionId = obterOuCriarSessionId()
  const icUrl = window.location.origin + window.location.pathname
  if (deveDisparar('InitiateCheckout', icUrl, sessionId)) {
    const checkoutEventId = 'InitiateCheckout_' + sessionId
    enviarEventoSPRINT('InitiateCheckout', checkoutEventId, { content_name: 'Checkout' }, true)
  }
}

/**
 * Disparador de compra canônico na página /obrigado:
 * Regra inegociável do SPRINT:
 * 1. O disparo de Compra (Purchase) à Meta é 100% SERVER-SIDE via CAPI pelo endpoint SPRINT.
 * 2. NUNCA dispara `fbq('track', 'Purchase')` no navegador (evita duplicação).
 * 3. O event_id canônico é `<session_id>_purchase`.
 * 4. Se não houver session_id, NÃO dispara compra client-side.
 */
export function dispararPurchaseSPRINT(customValor?: number) {
  if (typeof window === 'undefined') return
  const urlParams = extrairUrlParams()
  const utms = capturarEPersistirUtms()
  const cookies = extrairCookiesMeta()
  const userData: Record<string, string> = {}
  if (cookies.fbp) userData.fbp = cookies.fbp
  if (cookies.fbc) userData.fbc = cookies.fbc

  const fbclid = urlParams.get('fbclid') || utms.fbclid || ''
  const campaignParam = urlParams.get('utm_campaign') || utms.utm_campaign || ''
  const campaignIdParam =
    urlParams.get('campaign_id') ||
    urlParams.get('meta_campaign_id') ||
    utms.campaign_id ||
    utms.meta_campaign_id ||
    ''
  const rawCampaignNameParam = urlParams.get('campaign_name') || utms.campaign_name || ''
  const campaignName = rawCampaignNameParam || campaignParam
  const utmSource = urlParams.get('utm_source') || utms.utm_source || ''
  const utmMedium = urlParams.get('utm_medium') || utms.utm_medium || ''
  const utmContent = urlParams.get('utm_content') || utms.utm_content || ''
  const utmTerm = urlParams.get('utm_term') || utms.utm_term || ''
  const rawAdsetNameParam = urlParams.get('adset_name') || utms.adset_name || ''
  const rawAdNameParam = urlParams.get('ad_name') || utms.ad_name || ''
  const adId = utms.ad_id || (/^\d+$/.test(utmContent) ? utmContent : '')
  const adName = rawAdNameParam || (/^\d+$/.test(utmContent) ? '' : utmContent)
  const adsetId = utms.adset_id || (/^\d+$/.test(utmTerm) ? utmTerm : '')
  const adsetName =
    rawAdsetNameParam ||
    rawAdNameParam ||
    (/^\s*d+/i.test(utmTerm) || /^\d+$/.test(utmTerm) ? '' : utmTerm)
  const docReferrer = document.referrer || ''
  const isPaid = detectarTrafegoPago(utms)

  const valorRaw =
    urlParams.get('valor') ||
    (window.SPRINT_VALOR !== undefined ? window.SPRINT_VALOR : null) ||
    customValor
  let valorFinal = SPRINT_VALOR_REAIS
  if (valorRaw !== null && valorRaw !== '' && !isNaN(Number(valorRaw))) {
    valorFinal = Number(valorRaw)
  }
  const productIdSnippet =
    urlParams.get('product_id') ||
    (window.SPRINT_PRODUCT_ID !== undefined ? window.SPRINT_PRODUCT_ID : SPRINT_PRODUCT_ID)

  // Prioridade 1: session_id vindo da URL
  // Prioridade 2: localStorage ('metodoplana_session_id')
  // Prioridade 3: fallback legado ('sprint_session_id')
  const rawSessionParam = urlParams.get('session_id') || ''
  const rawUtmTerm = urlParams.get('utm_term') || ''
  let sessionId = rawSessionParam || (/^s_\d+/i.test(rawUtmTerm) ? rawUtmTerm : '')
  if (!sessionId) {
    try {
      sessionId =
        localStorage.getItem(SESSION_KEY) || localStorage.getItem('sprint_session_id') || ''
    } catch {
      /* ignore */
    }
  }

  // Regra v0.0.44: Se não houver session_id, NÃO dispara compra client-side
  if (!sessionId) {
    return
  }

  const canonicalEventId = sessionId + '_purchase'

  // Guard de 30s
  const guardKey = 'sprint_last_purchase_' + canonicalEventId
  try {
    const lastPurchase = localStorage.getItem(guardKey)
    if (lastPurchase && Date.now() - parseInt(lastPurchase, 10) < 30000) {
      return
    }
    localStorage.setItem(guardKey, Date.now().toString())
  } catch {
    /* ignore */
  }

  fetch(SPRINT_CONVERSOES_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      negocio_id: SPRINT_NEGOCIO_SLUG,
      session_id: sessionId,
      event_id: canonicalEventId,
      evento: 'Purchase',
      valor: valorFinal,
      valor_estimado: true,
      moeda: 'BRL',
      product_id: productIdSnippet || undefined,
      client_user_agent: navigator.userAgent || undefined,
      event_time: new Date().toISOString(),
      event_source_url: window.location.href,
      referrer: docReferrer || undefined,
      campaign: campaignName || undefined,
      campaign_id: campaignIdParam || undefined,
      campaign_name: rawCampaignNameParam || undefined,
      fonte: utmSource || undefined,
      trafego_pago: isPaid,
      ad_id: adId || undefined,
      ad_name: adName || undefined,
      adset_id: adsetId || undefined,
      adset_name: adsetName || undefined,
      fbclid: fbclid || undefined,
      user_data: Object.keys(userData).length > 0 ? userData : undefined,
    }),
    keepalive: true,
  }).catch((e) => {
    console.warn('Erro envio SPRINT Purchase:', e)
  })
}
