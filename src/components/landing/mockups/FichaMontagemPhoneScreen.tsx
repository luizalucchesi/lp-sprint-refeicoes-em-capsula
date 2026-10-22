import React from 'react'
import { Clock, Flame, Snowflake, Sparkles } from 'lucide-react'

interface FichaMontagemPhoneScreenProps {
  className?: string
  imageUrl?: string // Opção de exibir imagem real se a usuária preferir enviar screenshot/foto da ficha
}

/**
 * Ficha de montagem estilizada para ser exibida dentro da tela do PhoneMockup.
 * Usa:
 * - Azul Gelo (#C9D8DD) como marcador/destaque temático de freezer/sistema
 * - Terracota (#B84A24) e Verde Profundo (#2E4A3B)
 * - IBM Plex Mono para códigos de bases e tempos
 * - Passos numerados de montagem rápida
 */
export const FichaMontagemPhoneScreen: React.FC<FichaMontagemPhoneScreenProps> = ({
  className = '',
  imageUrl,
}) => {
  if (imageUrl && imageUrl.trim().length > 0) {
    return (
      <div className={`w-full h-full relative overflow-hidden bg-cream ${className}`}>
        <img
          src={imageUrl}
          alt="Ficha de montagem na tela do celular"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <div
      className={`w-full h-full bg-[#FAF6EE] text-forest flex flex-col justify-between p-3 select-none text-left overflow-hidden ${className}`}
    >
      {/* Cabeçalho da Ficha com Etiqueta Azul Gelo */}
      <div className="space-y-2">
        <div className="flex items-center justify-between border-b border-caramel/15 pb-2">
          {/* Marcador em Azul Gelo com estilo de etiqueta de laboratório/cozinha profissional */}
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-ice text-forest font-mono text-[9px] font-bold tracking-wider uppercase shadow-xs">
            <Snowflake className="w-2.5 h-2.5 text-forest" />
            <span>FICHA 042</span>
          </div>

          <span className="font-mono text-[8px] text-caramel uppercase tracking-widest font-semibold">
            229 Fichas
          </span>
        </div>

        {/* Nome do Prato em Fraunces */}
        <div>
          <h5 className="font-serif text-sm font-bold text-forest leading-tight">
            Escondidinho Rústico
          </h5>
          <div className="flex items-center gap-2 mt-1 text-[9px] font-mono text-caramel-dark">
            <span className="inline-flex items-center gap-0.5 text-terracotta font-semibold">
              <Clock className="w-2.5 h-2.5" /> 8 minutos
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-0.5">
              <Flame className="w-2.5 h-2.5 text-caramel" /> Forno / Airfryer
            </span>
          </div>
        </div>

        {/* Bases Utilizadas (combinação do método) */}
        <div className="bg-cream-100 rounded-lg p-2 border border-caramel/20 space-y-1">
          <span className="text-[8px] font-mono uppercase tracking-wider text-caramel font-semibold block">
            Bases do freezer necessárias:
          </span>
          <div className="flex flex-wrap gap-1">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-ice/70 text-forest text-[8.5px] font-mono font-medium border border-ice">
              <span className="w-1.5 h-1.5 rounded-full bg-forest" />
              B04: Frango Desfiado (1 dose)
            </span>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-terracotta/10 text-terracotta text-[8.5px] font-mono font-medium border border-terracotta/25">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
              B09: Purê de Mandioquinha
            </span>
          </div>
        </div>
      </div>

      {/* Passos Numerados de Montagem */}
      <div className="space-y-1.5 my-1.5">
        <span className="text-[8px] font-mono uppercase tracking-wider text-forest/70 font-semibold flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-terracotta" />
          Montagem em 3 passos:
        </span>

        <div className="space-y-1 text-[8.5px] font-sans leading-tight text-forest/90">
          <div className="flex items-start gap-1.5 bg-white/70 p-1.5 rounded border border-caramel/10">
            <span className="font-mono font-bold text-[9px] text-terracotta shrink-0 w-3">1.</span>
            <span>Descongele o purê e o frango por 2 min no micro-ondas.</span>
          </div>

          <div className="flex items-start gap-1.5 bg-white/70 p-1.5 rounded border border-caramel/10">
            <span className="font-mono font-bold text-[9px] text-terracotta shrink-0 w-3">2.</span>
            <span>Espalhe o frango no refratário e cubra com a camada de purê.</span>
          </div>

          <div className="flex items-start gap-1.5 bg-white/70 p-1.5 rounded border border-caramel/10">
            <span className="font-mono font-bold text-[9px] text-terracotta shrink-0 w-3">3.</span>
            <span>Finalize com queijo ralado e gratine por 6 min até dourar.</span>
          </div>
        </div>
      </div>

      {/* Rodapé da ficha / Marcador do Sistema */}
      <div className="pt-1.5 border-t border-caramel/15 flex items-center justify-between text-[8px] font-mono text-caramel">
        <span className="bg-ice/40 px-1.5 py-0.5 rounded text-forest font-semibold">
          ❄️ Retirada direta do freezer
        </span>
        <span className="text-terracotta font-bold">1 porção</span>
      </div>
    </div>
  )
}
