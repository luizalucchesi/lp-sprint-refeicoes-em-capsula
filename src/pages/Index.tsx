import React, { Suspense, useEffect } from 'react'
import { HeroSection } from '@/components/landing/HeroSection'
import { StickyPurchaseBar } from '@/components/landing/StickyPurchaseBar'
import { inicializarRastreamentoLanding } from '@/lib/tracking/sprintTracker'

// Lazy loading das seções abaixo da dobra para otimizar o carregamento móvel
const SecaoChegandoDoTrabalho = React.lazy(() =>
  import('@/components/landing/SecaoChegandoDoTrabalho').then((m) => ({
    default: m.SecaoChegandoDoTrabalho,
  })),
)
const SecaoAVirada = React.lazy(() =>
  import('@/components/landing/SecaoAVirada').then((m) => ({ default: m.SecaoAVirada })),
)
const SecaoOQueMuda = React.lazy(() =>
  import('@/components/landing/SecaoOQueMuda').then((m) => ({ default: m.SecaoOQueMuda })),
)
const SecaoOQueVoceRecebe = React.lazy(() =>
  import('@/components/landing/SecaoOQueVoceRecebe').then((m) => ({
    default: m.SecaoOQueVoceRecebe,
  })),
)
const SecaoQuemEstaPorTras = React.lazy(() =>
  import('@/components/landing/SecaoQuemEstaPorTras').then((m) => ({
    default: m.SecaoQuemEstaPorTras,
  })),
)
const SecaoOs4Bonus = React.lazy(() =>
  import('@/components/landing/SecaoOs4Bonus').then((m) => ({ default: m.SecaoOs4Bonus })),
)
const SecaoPreco = React.lazy(() =>
  import('@/components/landing/SecaoPreco').then((m) => ({ default: m.SecaoPreco })),
)
const SecaoGarantia = React.lazy(() =>
  import('@/components/landing/SecaoGarantia').then((m) => ({ default: m.SecaoGarantia })),
)
const SecaoFaq = React.lazy(() =>
  import('@/components/landing/SecaoFaq').then((m) => ({ default: m.SecaoFaq })),
)
const Footer = React.lazy(() =>
  import('@/components/landing/Footer').then((m) => ({ default: m.Footer })),
)

export default function Index() {
  useEffect(() => {
    // Inicialização do Meta Pixel e captura de UTMs + session_id SPRINT (ref 59168)
    const cleanup = inicializarRastreamentoLanding()
    return cleanup
  }, [])

  return (
    <div className="min-h-screen bg-cream text-forest font-sans selection:bg-terracotta selection:text-cream">
      {/* Barra de Compra Persistente (Desktop topo / Mobile rodapé) */}
      <StickyPurchaseBar />

      {/* 1. Hero Section: Headline, promessa, CTA primário e cena núcleo (carregada imediatamente) */}
      <HeroSection />

      {/* Seções abaixo da dobra: cada seção possui seu próprio Suspense com min-height neutro (sem layout shift - CLS 0) */}
      {/* 2. Dores: Chegando do trabalho, geladeira cheia, fadiga de decisão */}
      <Suspense fallback={<div className="min-h-[480px] bg-cream-50/70" aria-hidden="true" />}>
        <SecaoChegandoDoTrabalho />
      </Suspense>

      {/* 3. A Virada de Chave: Os 3 Passos + Frango & Feijão + Ilustração Freezer */}
      <Suspense fallback={<div className="min-h-[680px] bg-forest" aria-hidden="true" />}>
        <SecaoAVirada />
      </Suspense>

      {/* 4. O que muda na sua semana: Tempo, Dinheiro, Repertório, Sem monotonia */}
      <Suspense fallback={<div className="min-h-[460px] bg-cream-50/60" aria-hidden="true" />}>
        <SecaoOQueMuda />
      </Suspense>

      {/* 5. O que você recebe: 24 bases, 229 fichas, 5 grupos de sustento */}
      <Suspense fallback={<div className="min-h-[780px] bg-cream" aria-hidden="true" />}>
        <SecaoOQueVoceRecebe />
      </Suspense>

      {/* 6. Os 4 Bônus exclusivos da página com valores riscados */}
      <Suspense fallback={<div className="min-h-[640px] bg-cream" aria-hidden="true" />}>
        <SecaoOs4Bonus />
      </Suspense>

      {/* 7. Quem está por trás do método: Chef Luiza */}
      <Suspense fallback={<div className="min-h-[620px] bg-[#FBF7F0]" aria-hidden="true" />}>
        <SecaoQuemEstaPorTras />
      </Suspense>

      {/* 8. Tabela de Preço completa: De R$157 por R$47 */}
      <Suspense fallback={<div className="min-h-[600px] bg-cream-50/70" aria-hidden="true" />}>
        <SecaoPreco />
      </Suspense>

      {/* 9. Garantia incondicional de 7 dias com risco zero */}
      <Suspense fallback={<div className="min-h-[380px] bg-cream" aria-hidden="true" />}>
        <SecaoGarantia />
      </Suspense>

      {/* 10. FAQ com respostas do documento */}
      <Suspense fallback={<div className="min-h-[640px] bg-cream" aria-hidden="true" />}>
        <SecaoFaq />
      </Suspense>

      {/* 11. Rodapé institucional com avisos e links */}
      <Suspense fallback={<div className="min-h-[220px] bg-forest-dark" aria-hidden="true" />}>
        <Footer />
      </Suspense>
    </div>
  )
}
