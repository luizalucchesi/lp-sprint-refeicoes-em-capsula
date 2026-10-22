import React from 'react'

interface TabletMockupProps {
  children?: React.ReactNode
  className?: string
  rotate?: 'left' | 'right' | 'none'
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Mockup de Tablet em CSS puro
 * - Borda com acabamento metálico escuro/acetinado
 * - Cantos arredondados industriais e botões sutis
 * - Reflexo diagonal na tela para realismo sem poluição
 * - Leve perspectiva 3D / rotação para profundidade natural
 * - Totalmente responsivo
 */
export const TabletMockup: React.FC<TabletMockupProps> = ({
  children,
  className = '',
  rotate = 'none',
  size = 'md',
}) => {
  const getRotationClass = () => {
    switch (rotate) {
      case 'left':
        return '-rotate-2 hover:rotate-0'
      case 'right':
        return 'rotate-2 hover:rotate-0'
      default:
        return 'rotate-0'
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'max-w-[220px] sm:max-w-[240px]'
      case 'lg':
        return 'max-w-[340px] sm:max-w-[380px]'
      default:
        return 'max-w-[260px] sm:max-w-[290px]'
    }
  }

  return (
    <div
      className={`relative mx-auto transition-transform duration-500 ease-out perspective-[1200px] ${getSizeClasses()} ${className}`}
    >
      {/* Sombra de projeção na base */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[85%] h-6 bg-forest-dark/25 blur-xl rounded-full pointer-events-none" />

      {/* Carcaça do Tablet */}
      <div
        className={`relative rounded-[26px] p-[10px] sm:p-[12px] bg-gradient-to-b from-[#3A3D40] via-[#1E2022] to-[#121315] shadow-[0_20px_45px_-12px_rgba(20,30,25,0.45),0_8px_16px_-4px_rgba(0,0,0,0.25)] border border-[#4E5155]/60 transition-transform duration-500 ${getRotationClass()}`}
        style={{
          boxShadow:
            '0 22px 40px -10px rgba(15, 23, 18, 0.4), inset 0 1px 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.8)',
        }}
      >
        {/* Detalhe da câmera frontal no topo central */}
        <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#0a0a0c] border border-[#2d2e30] flex items-center justify-center">
          <div className="w-0.5 h-0.5 rounded-full bg-[#203a43]/70" />
        </div>

        {/* Moldura interna (bezel preto da tela) */}
        <div className="relative rounded-[16px] overflow-hidden bg-black aspect-[3/4] w-full shadow-inner border border-black/40">
          {/* Conteúdo da tela (imagem da capa ou placeholder) */}
          <div className="w-full h-full relative z-0 flex flex-col">{children}</div>

          {/* Reflexo de luz / brilho diagonal sobre a tela */}
          <div
            className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-tr from-transparent via-white/[0.08] to-white/[0.18]"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 35% 100%, 0% 100%)',
            }}
          />

          {/* Brilho linear sutil na borda superior da tela */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-white/20 pointer-events-none z-20" />
        </div>
      </div>
    </div>
  )
}
