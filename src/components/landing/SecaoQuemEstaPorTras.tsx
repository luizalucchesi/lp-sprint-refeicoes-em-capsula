import React, { useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import fotoAula from '@/assets/luiza-1-7d847.jpg'
import fotoDrink from '@/assets/luiza-2-521f3.jpg'
import fotoCozinha from '@/assets/luiza-3-a6c15.jpg'

interface SlideFoto {
  src: string
  alt: string
  legenda: string
  etiqueta: string
}

const FOTOS_LUIZA: SlideFoto[] = [
  {
    src: fotoAula,
    alt: 'Luiza de uniforme preto e touca preta ministrando aula prática na cozinha',
    legenda: 'Cozinhas profissionais e ensino prático de gastronomia',
    etiqueta: 'CHEF & EDUCADORA',
  },
  {
    src: fotoDrink,
    alt: 'Retrato de Luiza com óculos e cabelo cacheado segurando café especial',
    legenda: 'Paixão por torrefação de cafés especiais e rotina real',
    etiqueta: 'EMPRESÁRIA & TORREFADORA',
  },
  {
    src: fotoCozinha,
    alt: 'Luiza debruçada sobre bancada profissional montando canapés com precisão',
    legenda: 'Rigor e técnica Michelin aplicados ao dia a dia',
    etiqueta: 'TÉCNICA MICHELIN',
  },
]

export const SecaoQuemEstaPorTras: React.FC = () => {
  // Índice inicial 0 garante que a primeira foto (fotoAula / luiza-1) seja sempre exibida ao carregar
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % FOTOS_LUIZA.length)
  }, [])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + FOTOS_LUIZA.length) % FOTOS_LUIZA.length)
  }, [])

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
  }

  // Sem autoplay automático para manter a foto principal de Luiza visível até a usuária interagir

  // Swipe em mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX)
    setTouchEndX(null)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return
    const diff = touchStartX - touchEndX
    const minSwipeDistance = 45 // 45px mínimo para swipe
    if (diff > minSwipeDistance) {
      handleNext()
    } else if (diff < -minSwipeDistance) {
      handlePrev()
    }
    setTouchStartX(null)
    setTouchEndX(null)
  }

  return (
    <section className="py-20 md:py-28 bg-[#FBF7F0] border-t border-caramel/20 relative overflow-hidden">
      {/* Detalhes sutis decorativos com a paleta oficial */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-ice/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 md:mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-terracotta font-semibold px-3 py-1 rounded bg-terracotta/10 border border-terracotta/20 inline-block">
            Origem & Experiência Real
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight">
            Quem está por trás do método
          </h2>
        </div>

        {/* Ordem: Carrossel de fotos PRIMEIRO, depois a copy do texto (desktop e mobile) */}
        <div className="flex flex-col items-center gap-12 lg:gap-16 max-w-3xl mx-auto">
          {/* Carrossel de Fotos da Luiza (Acima do texto no Desktop e Mobile) */}
          <div className="w-full flex flex-col items-center">
            <div
              className="relative w-full max-w-[360px] sm:max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-cream-50 bg-forest-dark group touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Slides de Fotos */}
              {FOTOS_LUIZA.map((foto, idx) => {
                const isActive = idx === currentIndex
                return (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      isActive
                        ? 'opacity-100 z-10 pointer-events-auto'
                        : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={foto.src}
                      alt={foto.alt}
                      className="w-full h-full object-cover object-center transform transition-transform duration-1000 scale-[1.01]"
                      loading="lazy"
                      decoding="async"
                      width={420}
                      height={525}
                    />

                    {/* Gradiente escuro na base para legibilidade da legenda */}
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/95 via-forest-dark/30 to-transparent pointer-events-none" />

                    {/* Etiqueta no topo da foto em IBM Plex Mono */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none">
                      <span className="font-mono text-[11px] font-bold px-3 py-1 rounded-full bg-forest/80 text-cream backdrop-blur-sm border border-cream/20 shadow">
                        {foto.etiqueta}
                      </span>
                      <span className="font-mono text-[10px] text-cream/80 bg-forest/80 px-2 py-0.5 rounded backdrop-blur-sm">
                        {idx + 1} / {FOTOS_LUIZA.length}
                      </span>
                    </div>

                    {/* Legenda na base */}
                    <div className="absolute bottom-12 left-4 right-4 text-left pointer-events-none">
                      <p className="text-cream text-xs sm:text-sm font-sans font-medium drop-shadow-sm leading-snug">
                        {foto.legenda}
                      </p>
                    </div>
                  </div>
                )
              })}

              {/* Botões de navegação Anterior / Próximo (Desktop e Mobile) */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Foto anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-cream/90 hover:bg-cream text-forest flex items-center justify-center shadow-lg transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-terracotta opacity-85 hover:opacity-100"
              >
                <ChevronLeft className="w-5 h-5 text-forest" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Próxima foto"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-cream/90 hover:bg-cream text-forest flex items-center justify-center shadow-lg transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-terracotta opacity-85 hover:opacity-100"
              >
                <ChevronRight className="w-5 h-5 text-forest" />
              </button>

              {/* Indicadores / Dots na base do card */}
              <div className="absolute bottom-3.5 left-0 right-0 z-20 flex justify-center items-center gap-2">
                {FOTOS_LUIZA.map((_, dotIdx) => {
                  const isCurrent = dotIdx === currentIndex
                  return (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => handleDotClick(dotIdx)}
                      aria-label={`Ir para a foto ${dotIdx + 1}`}
                      className={`h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-terracotta ${
                        isCurrent ? 'w-7 bg-terracotta' : 'w-2 bg-cream/60 hover:bg-cream'
                      }`}
                    />
                  )
                })}
              </div>
            </div>
          </div>

          {/* Coluna de Texto (Copy Exata sem alterações, posicionada depois das fotos) */}
          <div className="w-full space-y-6 text-forest/90 font-sans text-base sm:text-lg leading-relaxed">
            <p className="first-letter:font-serif first-letter:text-4xl first-letter:font-bold first-letter:text-terracotta first-letter:mr-1 first-letter:float-left">
              Prazer, meu nome é Luiza. Sou formada em gastronomia, com passagem por cozinhas de
              restaurantes Michelin no Brasil e na França. Hoje, dedico a maior parte do meu tempo à
              minha outra paixão, a torrefação de cafés especiais, e cozinho para mim todo santo
              dia.
            </p>

            <p>
              Foi na pandemia que nasceu o Instituto do Sabor, um espaço para ensinar que comida boa
              não depende de ocasião especial nem de jornada infinita na cozinha. A ideia era
              ensinar às pessoas a ter independência alimentar e comer bem todos os dias, sem ficar
              o dia inteiro na cozinha.
            </p>

            <p>
              Apesar de ser chef de cozinha, a verdade é que eu também não tenho tempo para ficar 3,
              4 horas na cozinha todos os dias. Por isso, decidi juntar o meu conhecimento sobre
              armazenamento, gestão e segurança alimentar que aprendi nas cozinhas profissionais
              para facilitar o meu dia a dia. E aí eu criei um método, mas ele é tão bom que eu não
              poderia deixar de compartilhar com o máximo de pessoas possível!
            </p>

            <p className="p-4 rounded-2xl bg-cream-200/60 border-l-4 border-terracotta text-forest font-medium">
              O método nasceu ao mesmo tempo de cima para baixo e de baixo para cima: Tanto das
              técnicas que eu trouxe das cozinhas por onde passei quanto da minha própria realidade
              atual: uma empresária ocupada, mas que não abre mão de comer comida boa, variada e
              saudável todo santo dia. O resultado está no meu freezer, e pode estar no seu também.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
