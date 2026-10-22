import React, { useEffect, useState } from 'react'
import { KIWIFY_CHECKOUT_URL } from '@/lib/tracking/config'
import {
  dispararInitiateCheckoutCanonico,
  enriquecerUrlCheckout,
} from '@/lib/tracking/sprintTracker'
import { ArrowRight, Sparkles } from 'lucide-react'

export const StickyPurchaseBar: React.FC = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Aparece após a primeira dobra (aproximadamente 80-90% da altura da viewport)
      const threshold = window.innerHeight * 0.85
      setVisible(window.scrollY > threshold)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    dispararInitiateCheckoutCanonico()
    const targetUrl = enriquecerUrlCheckout(KIWIFY_CHECKOUT_URL)
    e.currentTarget.href = targetUrl
  }

  const targetUrl = enriquecerUrlCheckout(KIWIFY_CHECKOUT_URL)

  return (
    <>
      {/* Desktop Bar (Top fixed) */}
      <div
        className={`hidden md:block fixed top-0 left-0 right-0 z-40 bg-forest-dark/95 backdrop-blur-md text-cream shadow-xl border-b border-cream/10 transition-transform duration-300 ease-out ${
          visible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-terracotta/20 text-terracotta border border-terracotta/30 text-xs font-mono font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Oferta Especial
            </span>
            <p className="text-sm font-medium text-cream/95">
              <strong className="font-serif font-bold text-cream">Refeições em Cápsula</strong> + 4
              bônus, de <span className="line-through text-cream/60">R$157</span> por{' '}
              <strong className="text-terracotta font-serif text-base text-[#E26A40]">R$47</strong>
            </p>
          </div>

          <a
            href={targetUrl}
            onClick={handleClick}
            data-checkout="true"
            className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-hover text-cream px-5 py-2 rounded-full font-bold text-sm tracking-tight transition-transform hover:scale-105 active:scale-95 shadow-md shadow-terracotta/30"
          >
            <span>Quero tudo por R$47</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Mobile Bar (Bottom fixed com safe-area) */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-forest-dark/95 backdrop-blur-md text-cream shadow-2xl border-t border-cream/15 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 ease-out ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-mono text-cream/70 uppercase tracking-wider truncate">
              Guia + 4 Bônus
            </span>
            <p className="text-xs font-medium text-cream truncate">
              De <span className="line-through text-cream/60">R$157</span> por{' '}
              <strong className="text-[#E26A40] font-bold text-sm">R$47</strong>
            </p>
          </div>

          <a
            href={targetUrl}
            onClick={handleClick}
            data-checkout="true"
            className="inline-flex items-center justify-center gap-1.5 bg-terracotta hover:bg-terracotta-hover text-cream px-4 py-2.5 rounded-full font-bold text-xs tracking-tight shrink-0 shadow-md"
          >
            <span>Quero tudo por R$47</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </>
  )
}
