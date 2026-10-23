import React from 'react'

interface ManualDoFreezerCoverProps {
  className?: string
}

/**
 * Capa do Manual do Freezer (Bônus 1) recriada fielmente em HTML/CSS a partir do Slide 1 do PPTX:
 * - Fundo terracota (#B84A24)
 * - Painel / bloco central em creme (#F7F1E7) com bordas elegantes
 * - No topo do painel: "INSTITUTO DO SABOR · RECEITAS EM CÁPSULA" (IBM Plex Mono, caramelo/terracota)
 * - Título: "Manual do Freezer" em Fraunces (serifa expressiva, verde profundo #2E4A3B)
 * - Subtítulo: "Como as 24 bases cabem no seu congelador." (Inter / sans)
 * - Base: etiqueta mono "PREPARA · CONGELA · MONTA"
 * - Proporção vertical de capa de ebook para a tela de tablet
 */
export const ManualDoFreezerCover: React.FC<ManualDoFreezerCoverProps> = ({ className = '' }) => {
  return (
    <div
      className={`w-full h-full relative overflow-hidden bg-[#B84A24] p-3 sm:p-3.5 flex flex-col justify-center items-stretch select-none text-forest shadow-inner ${className}`}
      style={{ backgroundColor: '#B84A24' }}
      aria-label="Capa do E-book: Manual do Freezer - Instituto do Sabor"
    >
      {/* Textura sutil do fundo terracota */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#F7F1E7_1px,transparent_1px)] [background-size:10px_10px]"
        aria-hidden="true"
      />

      {/* Painel / bloco central em creme (#F7F1E7) */}
      <div className="relative z-10 w-full h-full bg-[#F7F1E7] rounded-sm p-4 sm:p-5 flex flex-col justify-between items-center text-center shadow-md border border-[#E3D5C1]">
        {/* Linha superior: Marca e submarca */}
        <div className="w-full pt-1 sm:pt-2">
          <p className="font-mono text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.16em] text-[#B84A24] font-semibold leading-relaxed">
            INSTITUTO DO SABOR
          </p>
          <p className="font-mono text-[7.5px] sm:text-[8.5px] uppercase tracking-[0.18em] text-[#8A5A3B] font-medium mt-0.5">
            · RECEITAS EM CÁPSULA ·
          </p>
          <div className="w-8 h-[1px] bg-[#B84A24]/30 mx-auto mt-2" />
        </div>

        {/* Bloco central: Título e Subtítulo */}
        <div className="my-auto py-2 w-full flex flex-col items-center">
          <h1 className="font-serif text-[26px] sm:text-[30px] font-bold text-[#2E4A3B] leading-[1.08] tracking-tight">
            Manual do
            <span className="block italic font-normal text-[#2E4A3B]">Freezer</span>
          </h1>

          <div className="w-10 h-[2px] bg-[#B84A24] my-2.5 sm:my-3 rounded-full" />

          <p className="text-[10px] sm:text-[11.5px] text-[#2E4A3B]/85 font-sans leading-snug max-w-[190px]">
            Como as 24 bases cabem no seu congelador.
          </p>
        </div>

        {/* Linha inferior: Etiqueta mono e selo */}
        <div className="w-full pb-1 sm:pb-2 pt-1 border-t border-[#E3D5C1]/70 flex flex-col items-center gap-1.5">
          <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-[#2E4A3B] font-bold bg-[#FAF6EE] px-2.5 py-1 rounded border border-[#E3D5C1] shadow-2xs">
            PREPARA · CONGELA · MONTA
          </span>
          <span className="font-mono text-[7px] text-[#8A5A3B] uppercase tracking-widest">
            GUIA OFICIAL DE ARMAZENAMENTO
          </span>
        </div>
      </div>
    </div>
  )
}
