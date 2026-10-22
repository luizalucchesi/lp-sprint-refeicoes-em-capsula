import React from 'react'
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react'
import { KIWIFY_CHECKOUT_URL } from '@/lib/tracking/config'
import {
  dispararInitiateCheckoutCanonico,
  enriquecerUrlCheckout,
} from '@/lib/tracking/sprintTracker'

interface CtaButtonProps {
  children?: React.ReactNode
  text?: string
  className?: string
  variant?: 'primary' | 'secondary' | 'light' | 'outline'
  showBadge?: boolean
  badgeText?: string
  subtext?: string
  onClick?: () => void
}

export const CtaButton: React.FC<CtaButtonProps> = ({
  children,
  text,
  className = '',
  variant = 'primary',
  showBadge = false,
  badgeText = 'Acesso Imediato',
  subtext,
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    dispararInitiateCheckoutCanonico()
    if (onClick) onClick()
    const targetUrl = enriquecerUrlCheckout(KIWIFY_CHECKOUT_URL)
    e.currentTarget.href = targetUrl
  }

  const baseStyles =
    'group relative inline-flex items-center justify-center font-bold tracking-tight rounded-full transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-terracotta/30 text-center select-none shadow-lg'

  const variantStyles = {
    primary:
      'bg-terracotta text-cream hover:bg-terracotta-hover shadow-terracotta/30 hover:shadow-terracotta/40 py-4 px-8 text-lg sm:text-xl',
    secondary:
      'bg-forest text-cream hover:bg-forest-light shadow-forest/20 py-3.5 px-7 text-base sm:text-lg',
    light:
      'bg-cream text-terracotta hover:bg-cream-50 shadow-black/10 py-4 px-9 text-lg sm:text-xl border border-terracotta/20',
    outline:
      'bg-transparent text-forest border-2 border-forest hover:bg-forest hover:text-cream py-3 px-6 text-base',
  }

  const targetUrl = enriquecerUrlCheckout(KIWIFY_CHECKOUT_URL)

  return (
    <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
      {showBadge && (
        <span className="inline-flex items-center gap-1 text-[11px] font-mono tracking-wider uppercase px-3 py-1 rounded-full bg-terracotta/10 text-terracotta font-semibold">
          <Zap className="w-3 h-3 fill-current" />
          {badgeText}
        </span>
      )}
      <a
        href={targetUrl}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        data-checkout="true"
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      >
        <span>{text || children}</span>
        <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
      </a>
      {subtext && (
        <p className="text-xs text-caramel/90 flex items-center justify-center gap-1.5 font-sans mt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-forest shrink-0" />
          <span>{subtext}</span>
        </p>
      )}
    </div>
  )
}
