import React from 'react'
import { Snowflake, FileSpreadsheet, Activity, Sparkles, BookOpen } from 'lucide-react'
import { EbookCoverData } from './ebookCoversConfig'

interface EbookCoverPlaceholderProps {
  cover: EbookCoverData
  className?: string
}

export const EbookCoverPlaceholder: React.FC<EbookCoverPlaceholderProps> = ({
  cover,
  className = '',
}) => {
  // Se houver imagem real fornecida, exibe diretamente
  if (cover.imageUrl && cover.imageUrl.trim().length > 0) {
    return (
      <div className={`w-full h-full relative overflow-hidden bg-forest-dark ${className}`}>
        <img
          src={cover.imageUrl}
          alt={cover.title}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
    )
  }

  // Placeholder elegante desenhado na paleta da marca
  const renderIcon = () => {
    const iconClass = 'w-6 h-6 opacity-90'
    switch (cover.iconName) {
      case 'snowflake':
        return <Snowflake className={iconClass} style={{ color: cover.accentColor || '#C9D8DD' }} />
      case 'spreadsheet':
        return (
          <FileSpreadsheet
            className={iconClass}
            style={{ color: cover.accentColor || '#BA8563' }}
          />
        )
      case 'macros':
        return <Activity className={iconClass} style={{ color: cover.accentColor || '#C9D8DD' }} />
      case 'special':
        return <Sparkles className={iconClass} style={{ color: cover.accentColor || '#F5A07A' }} />
      default:
        return <BookOpen className={iconClass} style={{ color: cover.accentColor || '#F7F1E7' }} />
    }
  }

  const gradient = cover.bgGradient || 'from-[#1F3429] via-[#2E4A3B] to-[#1a2d23]'

  return (
    <div
      className={`w-full h-full relative overflow-hidden bg-gradient-to-br ${gradient} p-4 sm:p-5 flex flex-col justify-between text-cream select-none shadow-inner border border-cream/10 ${className}`}
    >
      {/* Padrão geométrico sutil e elegante no fundo */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#F7F1E7_1px,transparent_1px)] [background-size:12px_12px]" />

      {/* Brilho suave superior */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-cream/10 rounded-full blur-2xl pointer-events-none" />

      {/* Faixa / Topo da capa */}
      <div className="relative z-10 flex items-center justify-between border-b border-cream/15 pb-2.5">
        <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-cream/75 font-semibold">
          Instituto do Sabor
        </span>
        {cover.badge && (
          <span
            className="text-[9px] sm:text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded uppercase"
            style={{
              backgroundColor: cover.accentColor
                ? `${cover.accentColor}33`
                : 'rgba(247, 241, 231, 0.15)',
              color: cover.accentColor || '#F7F1E7',
              border: `1px solid ${cover.accentColor || '#F7F1E7'}55`,
            }}
          >
            {cover.badge}
          </span>
        )}
      </div>

      {/* Miolo da capa com ícone e título em Fraunces */}
      <div className="relative z-10 my-auto py-3 text-center flex flex-col items-center">
        <div className="mb-2.5 p-2 rounded-xl bg-cream/10 backdrop-blur-xs border border-cream/15 shadow-sm">
          {renderIcon()}
        </div>

        <span className="text-[10px] font-mono uppercase tracking-widest text-cream/60 mb-1">
          Guia Digital
        </span>

        <h4 className="font-serif text-lg sm:text-xl font-bold text-cream tracking-tight leading-snug max-w-[200px]">
          {cover.title}
        </h4>

        {cover.subtitle && (
          <p className="text-[10px] sm:text-[11px] text-cream/75 font-sans mt-1.5 leading-relaxed line-clamp-2 max-w-[220px]">
            {cover.subtitle}
          </p>
        )}
      </div>

      {/* Rodapé da capa */}
      <div className="relative z-10 pt-2 border-t border-cream/15 flex items-center justify-between text-[9px] font-mono text-cream/65">
        <span>Método Cápsula</span>
        <span className="text-cream/90 font-semibold">E-book Oficial</span>
      </div>
    </div>
  )
}
