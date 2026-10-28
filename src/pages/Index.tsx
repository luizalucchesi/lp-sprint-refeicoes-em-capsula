import React, { useEffect } from 'react'
import { HeroSection } from '@/components/landing/HeroSection'
import { StickyPurchaseBar } from '@/components/landing/StickyPurchaseBar'
import { inicializarRastreamentoLanding } from '@/lib/tracking/sprintTracker'

// Imports diretos das seções para robustez máxima (renderização garantida, sem falhas de chunk/lazy de assets)
import { SecaoChegandoDoTrabalho } from '@/components/landing/SecaoChegandoDoTrabalho'
import { SecaoAVirada } from '@/components/landing/SecaoAVirada'
import { SecaoOQueMuda } from '@/components/landing/SecaoOQueMuda'
import { SecaoOQueVoceRecebe } from '@/components/landing/SecaoOQueVoceRecebe'
import { SecaoOs4Bonus } from '@/components/landing/SecaoOs4Bonus'
import { SecaoQuemEstaPorTras } from '@/components/landing/SecaoQuemEstaPorTras'
import { SecaoPreco } from '@/components/landing/SecaoPreco'
import { SecaoGarantia } from '@/components/landing/SecaoGarantia'
import { SecaoFaq } from '@/components/landing/SecaoFaq'
import { Footer } from '@/components/landing/Footer'

export default function Index() {
  useEffect(() => {
    // Inicialização do Meta Pixel e captura de UTMs + session_id SPRINT (ref 59168)
    try {
      const cleanup = inicializarRastreamentoLanding()
      return cleanup
    } catch (e) {
      console.warn('Erro ao inicializar tracking:', e)
    }
  }, [])

  return (
    <div className="min-h-screen bg-cream text-forest font-sans selection:bg-terracotta selection:text-cream">
      {/* Barra de Compra Persistente (Desktop topo / Mobile rodapé) */}
      <StickyPurchaseBar />

      {/* 1. Hero Section: Headline, promessa, CTA primário e cena núcleo (carregada imediatamente) */}
      <HeroSection />

      {/* Seções da página renderizadas diretamente para garantir que imagens e conteúdo nunca falhem */}
      {/* 2. Dores: Chegando do trabalho, geladeira cheia, fadiga de decisão */}
      <SecaoChegandoDoTrabalho />

      {/* 3. A Virada de Chave: Os 3 Passos + Frango & Feijão + Ilustração Freezer */}
      <SecaoAVirada />

      {/* 4. O que muda na sua semana: Tempo, Dinheiro, Repertório, Sem monotonia */}
      <SecaoOQueMuda />

      {/* 5. O que você recebe: 24 bases, 229 fichas, 5 grupos de sustento */}
      <SecaoOQueVoceRecebe />

      {/* 6. Os 4 Bônus exclusivos da página com valores riscados */}
      <SecaoOs4Bonus />

      {/* 7. Quem está por trás do método: Chef Luiza */}
      <SecaoQuemEstaPorTras />

      {/* 8. Tabela de Preço completa: De R$157 por R$47 */}
      <SecaoPreco />

      {/* 9. Garantia incondicional de 7 dias com risco zero */}
      <SecaoGarantia />

      {/* 10. FAQ com respostas do documento */}
      <SecaoFaq />

      {/* 11. Rodapé institucional com avisos e links */}
      <Footer />
    </div>
  )
}
