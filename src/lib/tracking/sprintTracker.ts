/**
 * Módulo de Rastreamento Canônico SPRINT + Meta Pixel (ref 59168).
 *
 * Implementação funcionalmente idêntica aos snippets oficiais do SPRINT:
 * - Negócio: 'instituto-do-sabor'
 * - Sessão persistente única (sprint_instituto-do-sabor_session_id): sobrevive à navegação e renova só após 30 min de inatividade
 * - Persistência de UTMs no localStorage ('sprint_utms')
 * - Cookies _fbp e _fbc lidos a cada evento
 * - Hash determinístico curto da URL
 * - Atribuição e Detecção de Tráfego Pago
 * - Guard client-side de 30s para evitar re-disparos idênticos
 * - Helper central window.CRM.enviar (Pixel com eventID canônico + fetch ao CRM com keepalive)
 * - Evento PageView: PageView_<session_id>_<hashCurto>
 * - Propagação automática de UTMs e session_id para URLs Kiwify
 * - InitiateCheckout no click delegado com eventID InitiateCheckout_<session_id>
 * - ContentRead aos 85% de rolagem
 * - Purchase em /obrigado 100% SERVER-SIDE (NUNCA fbq('track', 'Purchase') no navegador)
 */

import {
  META_PIXEL_ID,
  SPRINT_CONVERSOES_ENDPOINT,
  SPRINT_NEGOCIO_SLUG,
  SPRINT_PRODUCT_ID,
  SPRINT_VALOR_REAIS,
} from './config'

export const ENDPOINT = SPRINT_CONVERSOES_ENDPOINT
export const NEGOCIO_ID = SPRINT_NEGOCIO_SLUG
export const SESSION_KEY = 'sprint_instituto-do-sabor_session_id'
export const SESSION_TS_KEY = 'sprint_instituto-do-sabor_session_ts'
export const SESSION_TTL = 30 * 60 * 1000

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    _fbq?: unknown
    _fbqInitialized?: boolean
    CRM?: {
      enviar?: (
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

// 1. Cookies _fbp e _fbc (releitura a cada evento para capturar cookie recém-gravado pelo pixel)
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
export const extrairCookiesMeta = lerCookies

// 2. Hash determinístico curto da URL para diferenciar páginas sem gerar novos IDs a cada re-render
export function hashCurto(str: string): string {
  let h = 5381
  for (let i = 0; i < (str || '').length; i++) {
    h = (h << 5) + h + str.charCodeAt(i)
    h = h & 0xffffffff
  }
  return Math.abs(h).toString(36).slice(0, 8)
}
export const gerarHashCurto = hashCurto

// 3. Captura e persistência de UTMs e parâmetros de tráfego pago no localStorage
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
  let params = new URLSearchParams()
  if (typeof window === 'undefined') return params

  const search = searchOuUrl
    ? searchOuUrl.includes('?')
      ? searchOuUrl.split('?')[1]
      : searchOuUrl
    : window.location.search

  try {
    const rawParams = new URLSearchParams(search)
    rawParams.forEach((valor, chaveBruta) => {
      let chaveNorm = chaveBruta
      try {
        chaveNorm = decodeURIComponent(chaveNorm)
      } catch {
        /* ignore */
      }
      chaveNorm = chaveNorm.replace(/^[s?%3F]+/i, '').trim()
      if (chaveNorm && (!params.has(chaveNorm) || valor)) {
        params.set(chaveNorm, valor)
      }
    })
  } catch {
    try {
      params = new URLSearchParams(search)
    } catch {
      /* ignore */
    }
  }
  return params
}

export const utmKeys = [
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

/**
 * Fallback canônico de cookie _fbc da Meta:
 * Quando fbclid estiver presente (na URL ou sprint_utms) e o cookie _fbc não existir,
 * grava _fbc = fb.1.<timestamp_em_segundos>.<fbclid> com path=/, max-age 90 dias, SameSite=Lax.
 */
export function sincronizarCookieFbc(fbclidParam?: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  try {
    const cookiesAtuais = lerCookies()
    if (cookiesAtuais.fbc) {
      return cookiesAtuais.fbc
    }

    let fbclid = fbclidParam
    if (!fbclid && typeof window !== 'undefined') {
      const urlParams = extrairUrlParams()
      fbclid = urlParams.get('fbclid') || ''
    }
    if (!fbclid && typeof localStorage !== 'undefined') {
      try {
        const salvos = localStorage.getItem('sprint_utms')
        if (salvos) {
          const parsed = JSON.parse(salvos)
          fbclid = parsed?.fbclid || ''
        }
      } catch {
        /* ignore */
      }
    }

    if (fbclid) {
      const timestampSegundos = Math.floor(Date.now() / 1000)
      const novoFbc = `fb.1.${timestampSegundos}.${fbclid}`
      const maxAgeSegundos = 90 * 24 * 60 * 60 // ~90 dias (7.776.000s)
      const isHttps = typeof window !== 'undefined' && window.location.protocol === 'https:'
      const cookieStr = `_fbc=${encodeURIComponent(novoFbc)}; path=/; max-age=${maxAgeSegundos}; SameSite=Lax${isHttps ? '; Secure' : ''}`
      document.cookie = cookieStr
      return novoFbc
    }
  } catch {
    /* ignore */
  }
  return undefined
}

export function capturarEPersistirUtms(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  const urlParams = extrairUrlParams()
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

  // Se houver fbclid (URL ou localStorage) e _fbc não existir, sincroniza fallback
  if (utms.fbclid) {
    sincronizarCookieFbc(utms.fbclid)
  }

  return utms
}

// 4. Sessão persistente única (sprint_instituto-do-sabor_session_id): sobrevive à navegação e renova só após 30 min de inatividade
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

// 5. Atribuição e Detecção de Tráfego Pago
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

// 6. Guard client-side de 30s para evitar re-disparos idênticos no navegador
export function deveDisparar(tipo: string, urlNorm: string, customSessionId?: string): boolean {
  if (typeof window === 'undefined') return false
  const sess = customSessionId || obterOuCriarSessionId()
  const chave = 'sprint_guard_' + sess + '_' + tipo + '_' + hashCurto(urlNorm)
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

// Helper para registrar external_id no Advanced Matching da Meta de forma segura e canônica
export function configurarMetaAdvancedMatching(sessionId: string, pixelId = META_PIXEL_ID): void {
  if (typeof window === 'undefined' || !sessionId) return
  const cleanPixelId = String(pixelId)
    .replace(/^['"]+|['"]+$/g, '')
    .trim()
  if (typeof window.fbq === 'function') {
    try {
      // 1. Mecanismo canônico da Meta: fbq('init', pixelId, { external_id })
      // Re-chamar init com user data atualiza a instância sem recarregar o script
      window.fbq('init', cleanPixelId, { external_id: sessionId })
      // 2. Mecanismo complementar suportado pela runtime do pixel
      window.fbq('set', 'userData', { external_id: sessionId })
    } catch (e) {
      console.warn('Falha ao configurar external_id no Meta Pixel:', e)
    }
  }
}

// Inicializador Meta Pixel base (idempotente - complementa o snippet estático do <head>)
export function inicializarMetaPixel(pixelId = META_PIXEL_ID) {
  if (typeof window === 'undefined') return
  const cleanPixelId = String(pixelId)
    .replace(/^['"]+|['"]+$/g, '')
    .trim()
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

  const sessionId = obterOuCriarSessionId()

  // Se o fbq foi recém-criado dinamicamente e ainda não foi inicializado com o pixelId
  if (window.fbq && !window._fbqInitialized) {
    try {
      window.fbq('init', cleanPixelId, { external_id: sessionId })
      window.fbq('set', 'autoConfig', false, cleanPixelId)
      window.fbq('set', 'userData', { external_id: sessionId })
      window._fbqInitialized = true
    } catch (e) {
      console.warn('Falha ao inicializar Meta Pixel:', e)
    }
  } else if (window.fbq) {
    // Pixel já criado (pelo head do index.html): registra Advanced Matching com external_id
    configurarMetaAdvancedMatching(sessionId, cleanPixelId)
  }
}

// 7. Helper central CRM.enviar: dispara Meta Pixel com eventID canônico + fetch ao CRM com keepalive
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
  const fbclid = utms.fbclid || urlParams.get('fbclid') || ''

  // Garante fallback de _fbc caso ausente e fbclid exista
  if (fbclid) {
    sincronizarCookieFbc(fbclid)
  }

  const urlAtual = window.location.href
  const cookiesAtuais = lerCookies()
  const userData: Record<string, string> = {}
  if (cookiesAtuais.fbp) userData.fbp = cookiesAtuais.fbp
  if (cookiesAtuais.fbc) userData.fbc = cookiesAtuais.fbc
  if (sessionId) userData.external_id = sessionId
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
    (/^s_\d+/i.test(utmTerm) || /^\d+$/.test(utmTerm) ? '' : utmTerm)
  const campaignName = rawCampaignNameParam || utmCampaign
  const docReferrer = typeof document !== 'undefined' ? document.referrer || '' : ''
  const isPaid =
    /cpc|paid|ppc|ads|traffic/i.test(utmMedium) ||
    Boolean(
      fbclid ||
      adId ||
      adsetId ||
      /(.|^)(facebook.com|fb.com|instagram.com|threads.net|messenger.com)/i.test(docReferrer),
    )
  const fonteNormalizada = utmSource || (fbclid ? 'meta' : docReferrer ? 'referral' : 'direto')

  if (typeof window.fbq === 'function') {
    try {
      // Assegura Advanced Matching registrado antes do disparo
      configurarMetaAdvancedMatching(sessionId)
      // Dispara evento com eventID e user_data no 4º parâmetro
      window.fbq('track', evento, extra || {}, {
        eventID: canonicalId,
        user_data: { external_id: sessionId },
      })
    } catch (errPixel) {
      console.warn('Erro ao disparar Meta Pixel:', errPixel)
    }
  }

  try {
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        negocio_id: NEGOCIO_ID,
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
    }).catch(function (e) {
      console.error('Erro CRM.enviar (' + evento + '):', e)
    })
  } catch {
    /* ignore */
  }
}

// Garante o binding global de window.CRM.enviar
if (typeof window !== 'undefined') {
  window.CRM = window.CRM || {}
  window.CRM.enviar = enviarEventoSPRINT
}

// 8. Evento canônico PageView: PageView_<session_id>_<hashCurtoDaURL>
export function dispararPageViewCanonico() {
  if (typeof window === 'undefined') return
  const sessionId = obterOuCriarSessionId()
  const urlNormAtual = window.location.origin + window.location.pathname
  const pageViewEventId = 'PageView_' + sessionId + '_' + hashCurto(urlNormAtual)
  if (deveDisparar('PageView', urlNormAtual, sessionId)) {
    if (window.CRM && typeof window.CRM.enviar === 'function') {
      window.CRM.enviar('PageView', pageViewEventId, {})
    } else {
      enviarEventoSPRINT('PageView', pageViewEventId, {})
    }
  }
}

// 9. Propagador de Atribuição para Kiwify: anexa TODAS as UTMs da sessão + session_id aos links de checkout
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
    const adId = utms.ad_id || (/^\d+$/.test(utmContent) ? utmContent : '')
    const adName = rawAdNameParam || (/^\d+$/.test(utmContent) ? '' : utmContent)
    const adsetId = utms.adset_id || ''
    const utmTerm = utms.utm_term || ''
    const adsetName =
      rawAdsetNameParam ||
      rawAdNameParam ||
      (/^s_\d+/i.test(utmTerm) || /^\d+$/.test(utmTerm) ? '' : utmTerm)

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
    if (adsetName && !u.searchParams.get('adset_name')) u.searchParams.set('adset_name', adsetName)
    if (adName && !u.searchParams.get('ad_name')) u.searchParams.set('ad_name', adName)
    if (adId && !u.searchParams.get('ad_id')) u.searchParams.set('ad_id', adId)
    if (adsetId && !u.searchParams.get('adset_id')) u.searchParams.set('adset_id', adsetId)
    if (fbclid && !u.searchParams.get('fbclid')) u.searchParams.set('fbclid', fbclid)
    return u.toString()
  } catch {
    return urlOriginal
  }
}

export function configurarCheckoutKiwify() {
  if (typeof document === 'undefined') return
  try {
    const seletor =
      'a[href*="kiwify"], a[href*="checkout"], button[data-checkout], a[data-checkout]'
    const links = document.querySelectorAll(seletor)
    links.forEach(function (elem) {
      try {
        if (elem.tagName === 'A' && (elem as HTMLAnchorElement).href) {
          ;(elem as HTMLAnchorElement).href = enriquecerUrlCheckout(
            (elem as HTMLAnchorElement).href,
          )
        }
      } catch {
        /* ignore url inválida */
      }
    })
  } catch {
    /* ignore */
  }
}

export function dispararInitiateCheckoutCanonico() {
  if (typeof window === 'undefined') return
  const sessionId = obterOuCriarSessionId()
  const icUrl = window.location.origin + window.location.pathname
  if (deveDisparar('InitiateCheckout', icUrl, sessionId)) {
    const checkoutEventId = 'InitiateCheckout_' + sessionId
    if (window.CRM && typeof window.CRM.enviar === 'function') {
      window.CRM.enviar('InitiateCheckout', checkoutEventId, { content_name: 'Checkout' }, true)
    } else {
      enviarEventoSPRINT('InitiateCheckout', checkoutEventId, { content_name: 'Checkout' }, true)
    }
  }
}

/**
 * Inicializador da Landing Page (executa exatamente o snippet oficial)
 */
export function inicializarRastreamentoLanding(): () => void {
  if (typeof window === 'undefined') return () => {}

  try {
    // 1. Inicializa pixel base se necessário
    try {
      inicializarMetaPixel()
    } catch (e) {
      console.warn('Erro ao inicializarMetaPixel:', e)
    }

    // 2. Captura UTMs e cria sessão
    try {
      capturarEPersistirUtms()
    } catch (e) {
      console.warn('Erro ao capturarEPersistirUtms:', e)
    }
    const sessionId = obterOuCriarSessionId()

    // 3. Garante window.CRM.enviar
    window.CRM = window.CRM || {}
    window.CRM.enviar = enviarEventoSPRINT

    // 4. PageView canônico
    try {
      dispararPageViewCanonico()
    } catch (e) {
      console.warn('Erro ao dispararPageViewCanonico:', e)
    }

    // 5. Configurar URLs da Kiwify
    try {
      configurarCheckoutKiwify()
    } catch (e) {
      console.warn('Erro ao configurarCheckoutKiwify:', e)
    }

    // 6. Listener delegado em fase de captura (true) para links de checkout
    const handleClickCapture = function (ev: MouseEvent) {
      try {
        const target = ev.target as HTMLElement | null
        const el =
          target && target.closest
            ? (target.closest(
                'a[href*="kiwify"], a[href*="checkout"], button[data-checkout], a[data-checkout]',
              ) as HTMLElement | null)
            : null
        if (!el) return

        if (el.tagName === 'A' && (el as HTMLAnchorElement).href) {
          ;(el as HTMLAnchorElement).href = enriquecerUrlCheckout((el as HTMLAnchorElement).href)
        }

        const icUrl = window.location.origin + window.location.pathname
        if (deveDisparar('InitiateCheckout', icUrl, sessionId)) {
          const checkoutEventId = 'InitiateCheckout_' + sessionId
          if (window.CRM && typeof window.CRM.enviar === 'function') {
            window.CRM.enviar(
              'InitiateCheckout',
              checkoutEventId,
              { content_name: 'Checkout' },
              true,
            )
          } else {
            enviarEventoSPRINT(
              'InitiateCheckout',
              checkoutEventId,
              { content_name: 'Checkout' },
              true,
            )
          }
        }
      } catch {
        /* ignore */
      }
    }

    document.addEventListener('click', handleClickCapture, true)

    // 7. Evento canônico ContentRead ao rolar até 85% do conteúdo
    let contentReadSent = false
    const handleScroll = function () {
      if (contentReadSent) return
      try {
        const scrollPercent =
          (window.scrollY + window.innerHeight) / (document.documentElement.scrollHeight || 1)
        if (scrollPercent >= 0.85) {
          const crUrl = window.location.origin + window.location.pathname
          if (deveDisparar('ContentRead', crUrl, sessionId)) {
            contentReadSent = true
            const readEventId = 'ContentRead_' + sessionId + '_' + hashCurto(crUrl)
            if (window.CRM && typeof window.CRM.enviar === 'function') {
              window.CRM.enviar('ContentRead', readEventId, {})
            } else {
              enviarEventoSPRINT('ContentRead', readEventId, {})
            }
          }
        }
      } catch {
        /* ignore */
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      document.removeEventListener('click', handleClickCapture, true)
      window.removeEventListener('scroll', handleScroll)
    }
  } catch (err) {
    console.warn('Erro global em inicializarRastreamentoLanding:', err)
    return () => {}
  }
}

/**
 * Snippet da página /obrigado (Purchase 100% server-side — NUNCA fbq('track','Purchase') no navegador)
 */
export function dispararPurchaseSPRINT(customValor?: number): void {
  if (typeof window === 'undefined') return

  // Garante que variáveis globais existam caso não tenham sido definidas
  if (window.SPRINT_VALOR === undefined) window.SPRINT_VALOR = 47.0
  if (window.SPRINT_PRODUCT_ID === undefined)
    window.SPRINT_PRODUCT_ID = 'cd86f860-ca5d-11f1-b7fe-c57a0f1a8146'

  let utms: Record<string, string> = {}
  try {
    const salvos = localStorage.getItem('sprint_utms')
    if (salvos) utms = JSON.parse(salvos) || {}
  } catch {
    /* ignore */
  }

  const urlParams = extrairUrlParams()
  const fbclid = urlParams.get('fbclid') || utms.fbclid || ''

  // Garante fallback de _fbc se ausente e fbclid existir
  if (fbclid) {
    sincronizarCookieFbc(fbclid)
  }

  const cookies = lerCookies()
  const userData: Record<string, string> = {}
  if (cookies.fbp) userData.fbp = cookies.fbp
  if (cookies.fbc) userData.fbc = cookies.fbc
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
    (/^s_\d+/i.test(utmTerm) || /^\d+$/.test(utmTerm) ? '' : utmTerm)
  const docReferrer = typeof document !== 'undefined' ? document.referrer || '' : ''
  const isPaid =
    /cpc|paid|ppc|ads|traffic/i.test(utmMedium) ||
    Boolean(
      fbclid ||
      adId ||
      adsetId ||
      /(.|^)(facebook.com|fb.com|instagram.com|threads.net|messenger.com)/i.test(docReferrer),
    )

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
    (window.SPRINT_PRODUCT_ID !== undefined
      ? window.SPRINT_PRODUCT_ID
      : 'cd86f860-ca5d-11f1-b7fe-c57a0f1a8146')

  // Sessão: (a) URL session_id ou utm_term no formato s_<dígitos>; (b) localStorage 'sprint_instituto-do-sabor_session_id'; (c) legado 'metodoplana_session_id'; (d) legado 'sprint_session_id'
  const rawSessionParam = urlParams.get('session_id') || ''
  const rawUtmTerm = urlParams.get('utm_term') || ''
  let sessionId = rawSessionParam || (/^s_\d+/i.test(rawUtmTerm) ? rawUtmTerm : '')
  if (!sessionId) {
    try {
      sessionId =
        localStorage.getItem('sprint_instituto-do-sabor_session_id') ||
        localStorage.getItem('metodoplana_session_id') ||
        localStorage.getItem('sprint_session_id') ||
        ''
    } catch {
      /* ignore */
    }
  }

  // Sem session_id: NÃO dispara compra (evita duplicidade com webhook Kiwify)
  if (!sessionId) {
    return
  }

  // Inclui external_id = session_id no user_data do payload server-side
  userData.external_id = sessionId

  // Garante Advanced Matching no Pixel também na página de obrigado
  if (typeof window.fbq === 'function') {
    configurarMetaAdvancedMatching(sessionId)
  }

  const canonicalEventId = sessionId + '_purchase'

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

  fetch('https://aomkmulukjuwsbrlbfgl.supabase.co/functions/v1/conversoes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      negocio_id: 'instituto-do-sabor',
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
  }).catch(function (e) {
    console.error('Erro envio SPRINT Purchase:', e)
  })
}

export const inicializarRastreamentoObrigado = dispararPurchaseSPRINT
