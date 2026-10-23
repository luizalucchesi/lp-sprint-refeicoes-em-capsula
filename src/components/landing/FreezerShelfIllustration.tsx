import React, { useId } from 'react'
import { useSectionReveal } from '@/hooks/use-section-reveal'
import { Snowflake } from 'lucide-react'

/**
 * FreezerShelfIllustration
 * Ilustração animada em CSS/SVG puro (vetorial, sem bitmap).
 * Prateleira de freezer vista de frente com potes e saquinhos de porções etiquetados
 * em IBM Plex Mono (ex: "FRANGO DESFIADO — 12/03").
 * Fundo e acentos em azul gelo #C9D8DD (marcador visual do freezer).
 * Disparada via IntersectionObserver (useSectionReveal) com suporte a prefers-reduced-motion.
 */
export const FreezerShelfIllustration: React.FC = () => {
  const { ref, isVisible } = useSectionReveal<HTMLDivElement>(0.2)
  const clipId = useId()

  return (
    <div
      ref={ref}
      aria-label="Ilustração animada da prateleira de freezer organizada"
      className="relative w-full max-w-xl mx-auto rounded-3xl overflow-hidden border-2 border-ice/50 bg-[#14261E] shadow-2xl transition-all"
    >
      {/* Barra superior de identificação do Freezer */}
      <div className="bg-[#1C3328] px-4 py-2.5 border-b border-ice/20 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 text-ice">
          <Snowflake className="w-4 h-4 text-ice animate-pulse" />
          <span className="font-semibold tracking-wider uppercase text-[11px]">
            Freezer Inteligente • -18°C
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-ice/15 text-ice text-[10px] font-mono border border-ice/30">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-ping" />
            Arquivo Vertical
          </span>
        </div>
      </div>

      {/* SVG da Prateleira com Potes & Saquinhos */}
      <div className="p-3 sm:p-5 relative">
        <svg
          viewBox="0 0 540 330"
          className="w-full h-auto drop-shadow-md select-none"
          aria-hidden="true"
        >
          <defs>
            {/* Gradiente de fundo interno do freezer (azul gelo + profundidade) */}
            <linearGradient id={`${clipId}-freezer-bg`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E362C" />
              <stop offset="40%" stopColor="#182E25" />
              <stop offset="100%" stopColor="#0F1E18" />
            </linearGradient>

            {/* Gradiente de geada/frio nas laterais */}
            <linearGradient id={`${clipId}-frost-v`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C9D8DD" stopOpacity="0.35" />
              <stop offset="15%" stopColor="#C9D8DD" stopOpacity="0.08" />
              <stop offset="85%" stopColor="#C9D8DD" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#C9D8DD" stopOpacity="0.35" />
            </linearGradient>

            {/* Gradiente metálico da grelha da prateleira */}
            <linearGradient id={`${clipId}-shelf-metal`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8A5A3B" stopOpacity="0.2" />
              <stop offset="10%" stopColor="#C9D8DD" />
              <stop offset="50%" stopColor="#E2EBEF" />
              <stop offset="90%" stopColor="#C9D8DD" />
              <stop offset="100%" stopColor="#8A5A3B" stopOpacity="0.2" />
            </linearGradient>

            {/* Gradiente para saquinho a vácuo / zip */}
            <linearGradient id={`${clipId}-pouch-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.28" />
              <stop offset="60%" stopColor="#C9D8DD" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
            </linearGradient>

            {/* Padrão de textura de grelha metálica */}
            <pattern id={`${clipId}-grill`} width="18" height="18" patternUnits="userSpaceOnUse">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="18"
                stroke="#C9D8DD"
                strokeOpacity="0.12"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          {/* Fundo da câmara interna do freezer */}
          <rect
            x="8"
            y="8"
            width="524"
            height="314"
            rx="16"
            fill={`url(#${clipId}-freezer-bg)`}
            stroke="#C9D8DD"
            strokeOpacity="0.3"
            strokeWidth="1.5"
          />

          {/* Textura de fundo e reflexo de frio */}
          <rect x="8" y="8" width="524" height="314" rx="16" fill={`url(#${clipId}-grill)`} />
          <rect x="8" y="8" width="524" height="314" rx="16" fill={`url(#${clipId}-frost-v)`} />

          {/* Efeito de névoa fria / vapor sutil no topo */}
          <ellipse
            cx="270"
            cy="22"
            rx="200"
            ry="14"
            fill="#C9D8DD"
            fillOpacity="0.12"
            filter="blur(6px)"
          />

          {/* ============================================================== */}
          {/* PRATELEIRA SUPERIOR (Suporte de trilhos finos) */}
          {/* ============================================================== */}
          <g id="shelf-top-rack" opacity="0.4">
            <line
              x1="16"
              y1="28"
              x2="524"
              y2="28"
              stroke="#C9D8DD"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
          </g>

          {/* ============================================================== */}
          {/* PRATELEIRA 1 (SUPERIOR) - Y de base = 145 */}
          {/* ============================================================== */}
          <g id="top-row-items">
            {/* ITEM T1: Pote de Vidro / Hermético - Caldo de Frango */}
            <g
              className={`transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
              style={{ transitionDelay: '150ms' }}
            >
              {/* Tampa Hermética Terracota */}
              <rect
                x="36"
                y="52"
                width="76"
                height="10"
                rx="3"
                fill="#B84A24"
                stroke="#D96E49"
                strokeWidth="1"
              />
              <rect x="52" y="48" width="44" height="5" rx="2" fill="#D96E49" />
              {/* Corpo de Vidro com Caldo Amarelo-Dourado */}
              <rect
                x="40"
                y="62"
                width="68"
                height="74"
                rx="5"
                fill="#8A5A3B"
                fillOpacity="0.45"
                stroke="#C9D8DD"
                strokeOpacity="0.4"
                strokeWidth="1.2"
              />
              {/* Nível do conteúdo */}
              <rect x="42" y="76" width="64" height="58" rx="3" fill="#D99B4B" fillOpacity="0.35" />
              {/* Brilho do vidro */}
              <line
                x1="45"
                y1="66"
                x2="45"
                y2="130"
                stroke="#FFFFFF"
                strokeOpacity="0.45"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Etiqueta IBM Plex Mono */}
              <rect
                x="45"
                y="86"
                width="58"
                height="30"
                rx="3"
                fill="#F7F1E7"
                stroke="#8A5A3B"
                strokeWidth="0.8"
              />
              <text
                x="74"
                y="98"
                fill="#2E4A3B"
                fontSize="6.5"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="700"
                textAnchor="middle"
              >
                CALDO DE
              </text>
              <text
                x="74"
                y="106"
                fill="#2E4A3B"
                fontSize="6.5"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="700"
                textAnchor="middle"
              >
                LEGUMES
              </text>
              <text
                x="74"
                y="113"
                fill="#B84A24"
                fontSize="5.5"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="600"
                textAnchor="middle"
              >
                14/03 • 500ml
              </text>
            </g>

            {/* ITEM T2: Saquinho Achatado Zip - Molho de Tomate Rústico */}
            <g
              className={`transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              {/* Fecho zip */}
              <rect
                x="130"
                y="44"
                width="70"
                height="7"
                rx="2"
                fill="#2E4A3B"
                stroke="#C9D8DD"
                strokeWidth="0.8"
              />
              <line
                x1="130"
                y1="47.5"
                x2="200"
                y2="47.5"
                stroke="#C9D8DD"
                strokeWidth="1"
                strokeDasharray="3 2"
              />
              {/* Saquinho em pé / vinco */}
              <path
                d="M132 51 L198 51 L194 136 L136 136 Z"
                fill="#B84A24"
                fillOpacity="0.75"
                stroke="#C9D8DD"
                strokeWidth="1.2"
              />
              <path d="M132 51 L198 51 L194 136 L136 136 Z" fill={`url(#${clipId}-pouch-grad)`} />
              {/* Vinco vertical que mostra ser achatado */}
              <line
                x1="165"
                y1="52"
                x2="165"
                y2="134"
                stroke="#FFFFFF"
                strokeOpacity="0.25"
                strokeWidth="1"
                strokeDasharray="2 3"
              />
              {/* Etiqueta */}
              <rect
                x="139"
                y="80"
                width="52"
                height="34"
                rx="3"
                fill="#F7F1E7"
                stroke="#B84A24"
                strokeWidth="0.8"
              />
              <text
                x="165"
                y="93"
                fill="#2E4A3B"
                fontSize="6.5"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="700"
                textAnchor="middle"
              >
                MOLHO
              </text>
              <text
                x="165"
                y="101"
                fill="#2E4A3B"
                fontSize="6.5"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="700"
                textAnchor="middle"
              >
                RÚSTICO
              </text>
              <text
                x="165"
                y="110"
                fill="#B84A24"
                fontSize="5.5"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="600"
                textAnchor="middle"
              >
                10/03 • 2 doses
              </text>
            </g>

            {/* ITEM T3: Pote Empilhável Hermético - Pesto de Manjericão */}
            <g
              className={`transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
              style={{ transitionDelay: '450ms' }}
            >
              {/* Tampa Verde Escuro */}
              <rect
                x="222"
                y="66"
                width="66"
                height="8"
                rx="2.5"
                fill="#1F3429"
                stroke="#C9D8DD"
                strokeWidth="0.8"
              />
              {/* Recipiente com Pesto */}
              <rect
                x="225"
                y="74"
                width="60"
                height="62"
                rx="4"
                fill="#2E4A3B"
                fillOpacity="0.85"
                stroke="#C9D8DD"
                strokeOpacity="0.5"
                strokeWidth="1.2"
              />
              <rect x="227" y="82" width="56" height="52" rx="2" fill="#3D614E" fillOpacity="0.7" />
              <line
                x1="230"
                y1="78"
                x2="230"
                y2="132"
                stroke="#FFFFFF"
                strokeOpacity="0.4"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              {/* Etiqueta */}
              <rect
                x="231"
                y="90"
                width="48"
                height="28"
                rx="3"
                fill="#F7F1E7"
                stroke="#2E4A3B"
                strokeWidth="0.8"
              />
              <text
                x="255"
                y="101"
                fill="#2E4A3B"
                fontSize="6"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="700"
                textAnchor="middle"
              >
                PESTO VERDE
              </text>
              <text
                x="255"
                y="111"
                fill="#B84A24"
                fontSize="5"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="600"
                textAnchor="middle"
              >
                11/03 • 180g
              </text>
            </g>

            {/* ITEM T4 & T5: Duas Doses Pequenas Empilhadas (Sofrito / Alho confit) */}
            <g
              className={`transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              {/* Pote superior */}
              <rect
                x="310"
                y="58"
                width="56"
                height="6"
                rx="2"
                fill="#C9D8DD"
                stroke="#2E4A3B"
                strokeWidth="0.6"
              />
              <rect
                x="313"
                y="64"
                width="50"
                height="32"
                rx="3"
                fill="#8A5A3B"
                fillOpacity="0.5"
                stroke="#C9D8DD"
                strokeOpacity="0.4"
                strokeWidth="1"
              />
              <rect x="318" y="72" width="40" height="18" rx="2" fill="#F7F1E7" />
              <text
                x="338"
                y="81"
                fill="#2E4A3B"
                fontSize="5.5"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="700"
                textAnchor="middle"
              >
                ALHO CONFIT
              </text>
              <text
                x="338"
                y="87"
                fill="#8A5A3B"
                fontSize="4.5"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="600"
                textAnchor="middle"
              >
                08/03
              </text>

              {/* Pote inferior */}
              <rect
                x="310"
                y="98"
                width="56"
                height="6"
                rx="2"
                fill="#C9D8DD"
                stroke="#2E4A3B"
                strokeWidth="0.6"
              />
              <rect
                x="313"
                y="104"
                width="50"
                height="32"
                rx="3"
                fill="#B84A24"
                fillOpacity="0.6"
                stroke="#C9D8DD"
                strokeOpacity="0.4"
                strokeWidth="1"
              />
              <rect x="318" y="112" width="40" height="18" rx="2" fill="#F7F1E7" />
              <text
                x="338"
                y="121"
                fill="#2E4A3B"
                fontSize="5.5"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="700"
                textAnchor="middle"
              >
                SOFRITO BASE
              </text>
              <text
                x="338"
                y="127"
                fill="#8A5A3B"
                fontSize="4.5"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="600"
                textAnchor="middle"
              >
                08/03
              </text>
            </g>

            {/* ITEM T6: Saquinho de Grão-de-Bico Cozido Al Dente */}
            <g
              className={`transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
              style={{ transitionDelay: '750ms' }}
            >
              <rect
                x="390"
                y="50"
                width="62"
                height="7"
                rx="2"
                fill="#2E4A3B"
                stroke="#C9D8DD"
                strokeWidth="0.8"
              />
              <path
                d="M392 57 L450 57 L446 136 L396 136 Z"
                fill="#BA8563"
                fillOpacity="0.65"
                stroke="#C9D8DD"
                strokeWidth="1.2"
              />
              <path d="M392 57 L450 57 L446 136 L396 136 Z" fill={`url(#${clipId}-pouch-grad)`} />
              {/* Pequenas texturas de grãos dentro do saco */}
              <circle cx="406" cy="118" r="4" fill="#E3D5C1" fillOpacity="0.7" />
              <circle cx="418" cy="124" r="4.5" fill="#E3D5C1" fillOpacity="0.7" />
              <circle cx="432" cy="120" r="4" fill="#E3D5C1" fillOpacity="0.7" />
              {/* Etiqueta */}
              <rect
                x="398"
                y="74"
                width="46"
                height="32"
                rx="3"
                fill="#F7F1E7"
                stroke="#8A5A3B"
                strokeWidth="0.8"
              />
              <text
                x="421"
                y="86"
                fill="#2E4A3B"
                fontSize="5.8"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="700"
                textAnchor="middle"
              >
                GRÃO-DE-BICO
              </text>
              <text
                x="421"
                y="94"
                fill="#2E4A3B"
                fontSize="5.2"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="600"
                textAnchor="middle"
              >
                AL DENTE
              </text>
              <text
                x="421"
                y="102"
                fill="#B84A24"
                fontSize="4.8"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="600"
                textAnchor="middle"
              >
                13/03 • 350g
              </text>
            </g>

            {/* ITEM T7: Tag Lateral Azul Gelo "Pronto pra Uso" */}
            <g
              className={`transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ transitionDelay: '900ms' }}
            >
              <rect
                x="472"
                y="68"
                width="46"
                height="58"
                rx="6"
                fill="#C9D8DD"
                fillOpacity="0.18"
                stroke="#C9D8DD"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
              <text
                x="495"
                y="92"
                fill="#C9D8DD"
                fontSize="6.5"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="700"
                textAnchor="middle"
              >
                BASE
              </text>
              <text
                x="495"
                y="103"
                fill="#C9D8DD"
                fontSize="6.5"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="700"
                textAnchor="middle"
              >
                EXTRA
              </text>
              <text
                x="495"
                y="114"
                fill="#C9D8DD"
                fontSize="5"
                fontFamily="'IBM Plex Mono', monospace"
                textAnchor="middle"
              >
                -18°C
              </text>
            </g>
          </g>

          {/* ============================================================== */}
          {/* BARRA DA PRATELEIRA DO MEIO (Viga metálica com reflexo de gelo) */}
          {/* ============================================================== */}
          <rect
            x="12"
            y="138"
            width="516"
            height="8"
            rx="2"
            fill={`url(#${clipId}-shelf-metal)`}
            stroke="#C9D8DD"
            strokeWidth="1"
          />
          <line
            x1="12"
            y1="140"
            x2="528"
            y2="140"
            stroke="#FFFFFF"
            strokeOpacity="0.8"
            strokeWidth="1"
          />
          {/* Cristais sutis de gelo na prateleira */}
          <circle cx="80" cy="142" r="1.5" fill="#FFFFFF" fillOpacity="0.7" />
          <circle cx="210" cy="142" r="1" fill="#FFFFFF" fillOpacity="0.7" />
          <circle cx="340" cy="142" r="1.5" fill="#FFFFFF" fillOpacity="0.7" />
          <circle cx="460" cy="142" r="1" fill="#FFFFFF" fillOpacity="0.7" />

          {/* ============================================================== */}
          {/* PRATELEIRA 2 (INFERIOR) - O Arquivo Vertical em Ação */}
          {/* Mostra saquinhos achatados como fichários + o destaque da tarefa */}
          {/* "FRANGO DESFIADO — 12/03" entrando e se acomodando */}
          {/* ============================================================== */}
          <g id="bottom-row-items">
            {/* ITEM B1: Carne Louca Desfiada (vertical) */}
            <g
              className={`transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <rect
                x="36"
                y="160"
                width="8"
                height="120"
                rx="2"
                fill="#2E4A3B"
                stroke="#C9D8DD"
                strokeWidth="0.8"
              />
              <rect
                x="44"
                y="166"
                width="46"
                height="114"
                rx="4"
                fill="#674127"
                fillOpacity="0.85"
                stroke="#C9D8DD"
                strokeWidth="1"
              />
              <rect
                x="44"
                y="166"
                width="46"
                height="114"
                rx="4"
                fill={`url(#${clipId}-pouch-grad)`}
              />
              {/* Etiqueta na lombada/frente */}
              <rect
                x="48"
                y="195"
                width="38"
                height="54"
                rx="3"
                fill="#F7F1E7"
                stroke="#674127"
                strokeWidth="0.8"
              />
              <text
                x="67"
                y="210"
                fill="#2E4A3B"
                fontSize="6"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="700"
                textAnchor="middle"
              >
                CARNE
              </text>
              <text
                x="67"
                y="218"
                fill="#2E4A3B"
                fontSize="6"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="700"
                textAnchor="middle"
              >
                DE PANELA
              </text>
              <text
                x="67"
                y="232"
                fill="#B84A24"
                fontSize="5.2"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="600"
                textAnchor="middle"
              >
                09/03
              </text>
              <text
                x="67"
                y="241"
                fill="#2E4A3B"
                fontSize="5"
                fontFamily="'IBM Plex Mono', monospace"
                textAnchor="middle"
              >
                2 porções
              </text>
            </g>

            {/* ITEM B2: ESTRELA DA CENA — SACO DE FRANGO DESFIADO */}
            {/* Animado entrando suavemente na prateleira como o exemplo da tarefa: "FRANGO DESFIADO — 12/03" */}
            <g
              className={`transition-all duration-1000 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 -translate-y-12 scale-95'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              {/* Halo sutil de azul gelo ao redor da base estrela */}
              <rect
                x="110"
                y="158"
                width="114"
                height="124"
                rx="8"
                fill="#C9D8DD"
                fillOpacity="0.12"
                stroke="#C9D8DD"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />

              {/* Zip lock superior */}
              <rect
                x="116"
                y="162"
                width="102"
                height="9"
                rx="3"
                fill="#2E4A3B"
                stroke="#C9D8DD"
                strokeWidth="1"
              />
              <line
                x1="116"
                y1="166.5"
                x2="218"
                y2="166.5"
                stroke="#C9D8DD"
                strokeWidth="1"
                strokeDasharray="3 2"
              />

              {/* Corpo do saco achatado a vácuo (Frango dourado) */}
              <rect
                x="118"
                y="171"
                width="98"
                height="108"
                rx="5"
                fill="#C98B32"
                fillOpacity="0.82"
                stroke="#C9D8DD"
                strokeWidth="1.4"
              />
              <rect
                x="118"
                y="171"
                width="98"
                height="108"
                rx="5"
                fill={`url(#${clipId}-pouch-grad)`}
              />

              {/* Vinco central mostrando formato achatado para congelamento vertical */}
              <line
                x1="167"
                y1="172"
                x2="167"
                y2="277"
                stroke="#FFFFFF"
                strokeOpacity="0.3"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />

              {/* Textura interna de frango desfiado suculento */}
              <path
                d="M126 195 Q140 190 154 196 T182 194 T208 197"
                stroke="#8A5A3B"
                strokeWidth="1"
                strokeOpacity="0.5"
                fill="none"
              />
              <path
                d="M126 250 Q145 246 164 251 T198 248"
                stroke="#8A5A3B"
                strokeWidth="1"
                strokeOpacity="0.5"
                fill="none"
              />

              {/* Etiqueta Destacada em IBM Plex Mono com a data do enunciado */}
              <rect
                x="125"
                y="198"
                width="84"
                height="46"
                rx="4"
                fill="#F7F1E7"
                stroke="#B84A24"
                strokeWidth="1.2"
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
              />
              {/* Marcador de cor terracota no topo da etiqueta */}
              <rect x="125" y="198" width="84" height="4" rx="1" fill="#B84A24" />

              <text
                x="167"
                y="214"
                fill="#2E4A3B"
                fontSize="7.5"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="700"
                letterSpacing="0.3"
                textAnchor="middle"
              >
                FRANGO DESFIADO
              </text>
              <line
                x1="133"
                y1="219"
                x2="201"
                y2="219"
                stroke="#B84A24"
                strokeWidth="0.8"
                strokeOpacity="0.4"
              />
              <text
                x="167"
                y="229"
                fill="#B84A24"
                fontSize="7"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="700"
                letterSpacing="0.4"
                textAnchor="middle"
              >
                12/03 • 400g
              </text>
              <text
                x="167"
                y="238"
                fill="#2E4A3B"
                fontSize="5"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="600"
                letterSpacing="0.2"
                textAnchor="middle"
              >
                PORÇÃO P/ 2 REFEIÇÕES
              </text>

              {/* Tag de destaque flutuante Azul Gelo */}
              <g className="animate-bounce" style={{ animationDuration: '3s' }}>
                <rect
                  x="135"
                  y="146"
                  width="64"
                  height="14"
                  rx="7"
                  fill="#C9D8DD"
                  stroke="#2E4A3B"
                  strokeWidth="0.8"
                />
                <text
                  x="167"
                  y="156"
                  fill="#1F3429"
                  fontSize="5.5"
                  fontFamily="'IBM Plex Mono', monospace"
                  fontWeight="700"
                  textAnchor="middle"
                >
                  ★ PRONTO EM 8 MIN
                </text>
              </g>
            </g>

            {/* ITEM B3: Feijão Carioca Temperado (vertical) */}
            <g
              className={`transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
              }`}
              style={{ transitionDelay: '550ms' }}
            >
              <rect
                x="246"
                y="160"
                width="8"
                height="120"
                rx="2"
                fill="#2E4A3B"
                stroke="#C9D8DD"
                strokeWidth="0.8"
              />
              <rect
                x="254"
                y="166"
                width="58"
                height="114"
                rx="4"
                fill="#8A5A3B"
                fillOpacity="0.88"
                stroke="#C9D8DD"
                strokeWidth="1"
              />
              <rect
                x="254"
                y="166"
                width="58"
                height="114"
                rx="4"
                fill={`url(#${clipId}-pouch-grad)`}
              />
              <line
                x1="283"
                y1="168"
                x2="283"
                y2="278"
                stroke="#FFFFFF"
                strokeOpacity="0.3"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              {/* Etiqueta */}
              <rect
                x="260"
                y="200"
                width="46"
                height="46"
                rx="3"
                fill="#F7F1E7"
                stroke="#8A5A3B"
                strokeWidth="0.8"
              />
              <text
                x="283"
                y="214"
                fill="#2E4A3B"
                fontSize="6.2"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="700"
                textAnchor="middle"
              >
                FEIJÃO
              </text>
              <text
                x="283"
                y="223"
                fill="#2E4A3B"
                fontSize="6.2"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="700"
                textAnchor="middle"
              >
                CARIOCA
              </text>
              <text
                x="283"
                y="235"
                fill="#B84A24"
                fontSize="5.2"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="600"
                textAnchor="middle"
              >
                12/03 • 350g
              </text>
            </g>

            {/* ITEM B4: Purê de Mandioquinha / Abóbora Assada */}
            <g
              className={`transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
              }`}
              style={{ transitionDelay: '700ms' }}
            >
              <rect
                x="330"
                y="166"
                width="54"
                height="114"
                rx="4"
                fill="#E07A28"
                fillOpacity="0.75"
                stroke="#C9D8DD"
                strokeWidth="1"
              />
              <rect
                x="330"
                y="166"
                width="54"
                height="114"
                rx="4"
                fill={`url(#${clipId}-pouch-grad)`}
              />
              <rect
                x="336"
                y="202"
                width="42"
                height="42"
                rx="3"
                fill="#F7F1E7"
                stroke="#B84A24"
                strokeWidth="0.8"
              />
              <text
                x="357"
                y="216"
                fill="#2E4A3B"
                fontSize="6"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="700"
                textAnchor="middle"
              >
                PURÊ DE
              </text>
              <text
                x="357"
                y="225"
                fill="#2E4A3B"
                fontSize="5.5"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="700"
                textAnchor="middle"
              >
                CABOTIÁ
              </text>
              <text
                x="357"
                y="236"
                fill="#B84A24"
                fontSize="5"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="600"
                textAnchor="middle"
              >
                07/03 • 300g
              </text>
            </g>

            {/* ITEM B5: Arroz Integral com Castanhas */}
            <g
              className={`transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
              style={{ transitionDelay: '850ms' }}
            >
              <rect
                x="402"
                y="166"
                width="50"
                height="114"
                rx="4"
                fill="#A39678"
                fillOpacity="0.8"
                stroke="#C9D8DD"
                strokeWidth="1"
              />
              <rect
                x="402"
                y="166"
                width="50"
                height="114"
                rx="4"
                fill={`url(#${clipId}-pouch-grad)`}
              />
              <rect
                x="408"
                y="202"
                width="38"
                height="42"
                rx="3"
                fill="#F7F1E7"
                stroke="#2E4A3B"
                strokeWidth="0.8"
              />
              <text
                x="427"
                y="216"
                fill="#2E4A3B"
                fontSize="6"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="700"
                textAnchor="middle"
              >
                ARROZ
              </text>
              <text
                x="427"
                y="225"
                fill="#2E4A3B"
                fontSize="5.5"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="700"
                textAnchor="middle"
              >
                INTEGRAL
              </text>
              <text
                x="427"
                y="236"
                fill="#B84A24"
                fontSize="5"
                fontFamily="'IBM Plex Mono', monospace"
                fontWeight="600"
                textAnchor="middle"
              >
                11/03 • 300g
              </text>
            </g>

            {/* ITEM B6: Gaveta lateral de temperos / cubos de caldo */}
            <g
              className={`transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: '1000ms' }}
            >
              <rect
                x="470"
                y="176"
                width="48"
                height="104"
                rx="4"
                fill="#C9D8DD"
                fillOpacity="0.1"
                stroke="#C9D8DD"
                strokeOpacity="0.4"
                strokeWidth="1"
              />
              {/* Formas de gelo com doses */}
              <rect
                x="476"
                y="186"
                width="16"
                height="16"
                rx="2"
                fill="#2E4A3B"
                stroke="#C9D8DD"
                strokeWidth="0.6"
              />
              <rect
                x="496"
                y="186"
                width="16"
                height="16"
                rx="2"
                fill="#2E4A3B"
                stroke="#C9D8DD"
                strokeWidth="0.6"
              />
              <rect
                x="476"
                y="208"
                width="16"
                height="16"
                rx="2"
                fill="#B84A24"
                stroke="#C9D8DD"
                strokeWidth="0.6"
              />
              <rect
                x="496"
                y="208"
                width="16"
                height="16"
                rx="2"
                fill="#B84A24"
                stroke="#C9D8DD"
                strokeWidth="0.6"
              />
              <rect
                x="476"
                y="230"
                width="16"
                height="16"
                rx="2"
                fill="#8A5A3B"
                stroke="#C9D8DD"
                strokeWidth="0.6"
              />
              <rect
                x="496"
                y="230"
                width="16"
                height="16"
                rx="2"
                fill="#8A5A3B"
                stroke="#C9D8DD"
                strokeWidth="0.6"
              />
              <text
                x="494"
                y="260"
                fill="#C9D8DD"
                fontSize="5"
                fontFamily="'IBM Plex Mono', monospace"
                textAnchor="middle"
              >
                DOSES EM CUBO
              </text>
            </g>
          </g>

          {/* ============================================================== */}
          {/* PRATELEIRA INFERIOR (Piso com grade e reflexo) */}
          {/* ============================================================== */}
          <rect
            x="12"
            y="280"
            width="516"
            height="10"
            rx="2"
            fill={`url(#${clipId}-shelf-metal)`}
            stroke="#C9D8DD"
            strokeWidth="1"
          />
          <line
            x1="12"
            y1="282"
            x2="528"
            y2="282"
            stroke="#FFFFFF"
            strokeOpacity="0.8"
            strokeWidth="1"
          />

          {/* Indicador de fluxo / ciclo de rotação (First in, first out) */}
          <g opacity="0.8">
            <text
              x="270"
              y="306"
              fill="#C9D8DD"
              fontSize="6.5"
              fontFamily="'IBM Plex Mono', monospace"
              fontWeight="600"
              textAnchor="middle"
              letterSpacing="0.8"
            >
              ORGANIZAÇÃO VERTICAL: RETIRE 1 BASE, COMBINE COM OUTRA EM 10 MIN
            </text>
          </g>
        </svg>
      </div>

      {/* Legenda inferior de alto contraste em Azul Gelo */}
      <div className="bg-[#10221A] px-4 py-3 border-t border-ice/20 flex items-center justify-center text-xs font-mono">
        <div className="text-ice/80 text-[11px] font-semibold">
          Sacos achatados • 70% menos espaço
        </div>
      </div>
    </div>
  )
}
