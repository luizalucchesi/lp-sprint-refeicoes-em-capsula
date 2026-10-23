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

      {/* Seções abaixo da dobra com Suspense seguro para transição suave */}
      <Suspense
        fallback={
          <div className="py-12 bg-cream text-center opacity-40 font-mono text-xs">...</div>
        }
      >
        {/* 2. Dores: Chegando do trabalho, geladeira cheia, fadiga de decisão */}
        <SecaoChegandoDoTrabalho />

        {/* 3. A Virada de Chave: Os 3 Passos (Prepara, Congela, Monta) + Frango & Feijão */}
        <SecaoAVirada />

        {/* 4. O que muda na sua semana: Tempo, Dinheiro, Repertório, Sem monotonia */}
        <SecaoOQueMuda />

        {/* 5. O que você recebe: 24 bases, 229 fichas, 5 grupos de sustento */}
        <SecaoOQueVoceRecebe />

        {/* 6. Os 4 Bônus exclusivos da página com valores riscados */}
        <SecaoOs4Bonus />

        {/* 7. Quem está por trás do método: Chef Luiza, trajetória Michelin e carrossel de fotos */}
        <SecaoQuemEstaPorTras />

        {/* 8. Tabela de Preço completa: De R$157 por R$47 */}
        <SecaoPreco />

        {/* 9. Garantia incondicional de 7 dias com risco zero */}
        <SecaoGarantia />

        {/* 10. FAQ com respostas do documento */}
        <SecaoFaq />

        {/* 11. Rodapé institucional com avisos e links */}
        <Footer />
      </Suspense>
    </div>
  )
}
