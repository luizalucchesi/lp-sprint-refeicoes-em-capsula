import React from 'react'
import { CtaButton } from './CtaButton'
import { ChevronDown, Clock, Sparkles } from 'lucide-react'

// Imagem conceitual de cozinha real (panela no fogo, luz natural de janela, bancada de madeira)
const HERO_IMAGE_URL = 'https://img.usecurling.com/p/800/800?q=cooking%20chicken%20pot&color=orange'

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden bg-cream pt-12 pb-16 md:py-20">
      {/* Círculo suave de terracota desfocado no fundo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-terracotta/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-caramel/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        {/* Eyebrow / Pré-título */}
        <div className="flex flex-col items-center text-center mb-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-terracotta/10 text-terracotta text-xs md:text-sm font-mono uppercase tracking-widest font-semibold border border-terracotta/20 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            Para quem cozinha para uma ou duas pessoas
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Coluna Texto (Lado esquerdo no desktop) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            {/* Headline com Fraunces */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-forest leading-[1.12] tracking-tight">
              Você não precisa mais{' '}
              <span className="text-terracotta italic">decidir o que comer</span> todos os dias
            </h1>

            {/* Subheadline fiel ao documento */}
            <p className="text-base sm:text-lg md:text-xl text-forest/85 leading-relaxed font-sans max-w-2xl">
              O método <strong>Refeições em Cápsula</strong> organiza seu freezer em 24 bases que se
              combinam em mais de 200 pratos. Você decide o que comer uma vez a cada duas semanas e
              prepara algumas bases simples. Nos outros dias, o jantar fica pronto em 5 a 15
              minutos.
            </p>

            {/* Tag de destaque temporal */}
            <div className="flex items-center gap-3 text-xs sm:text-sm font-mono text-caramel-dark bg-cream-200/70 border border-caramel/20 px-4 py-2 rounded-lg">
              <Clock className="w-4 h-4 text-terracotta shrink-0" />
              <span>Cozinhe 1 vez a cada 14 dias • Jantar pronto em 5 a 15 min</span>
            </div>

            {/* CTA Principal */}
            <div className="pt-2 w-full sm:w-auto">
              <CtaButton
                text="Quero parar de decidir o que comer todos os dias"
                subtext="Oferta completa por R$47, com acesso imediato e garantia de 7 dias."
                variant="primary"
                className="w-full sm:w-auto"
              />
            </div>
          </div>

          {/* Coluna Imagem (Lado direito no desktop) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Moldura com efeito polaroid de cozinha real */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-cream-50 bg-cream-100 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <img
                  src={HERO_IMAGE_URL}
                  alt="Preparo de base na panela em cozinha com luz natural"
                  className="w-full h-80 sm:h-96 object-cover"
                  loading="eager"
                />

                {/* Efeito vinheta quente e sutil */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/70 via-transparent to-transparent pointer-events-none" />

                {/* Etiqueta estilo fita adesiva (IBM Plex Mono) */}
                <div className="absolute bottom-4 left-4 right-4 bg-cream/95 backdrop-blur-sm p-3.5 rounded-xl border border-caramel/20 shadow-md">
                  <div className="flex items-center justify-between text-xs font-mono text-forest">
                    <span className="font-bold text-terracotta flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
                      BASE 04: FRANGO DESFIADO
                    </span>
                    <span className="text-caramel text-[11px]">CICLO 14 DIAS</span>
                  </div>
                  <p className="text-xs text-forest/80 font-sans mt-1">
                    Rende 8 porções • Vira galinhada, wrap, salada e recheio
                  </p>
                </div>
              </div>

              {/* Tag flutuante decorativa */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-terracotta text-cream px-3.5 py-1.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider shadow-lg transform rotate-6 border-2 border-cream">
                24 Bases • 229 Pratos
              </div>
            </div>
          </div>
        </div>

        {/* Indicador de rolagem */}
        <div className="mt-14 flex flex-col items-center justify-center text-caramel/70 text-xs font-mono">
          <span className="tracking-wider uppercase">Conheça o método abaixo</span>
          <ChevronDown className="w-5 h-5 animate-bounce mt-1 text-terracotta" />
        </div>
      </div>
    </section>
  )
}
