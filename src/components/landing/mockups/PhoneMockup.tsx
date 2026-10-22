import React from 'react'

interface PhoneMockupProps {
  children?: React.ReactNode
  className?: string
  rotate?: 'left' | 'right' | 'none'
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Mockup de Celular moderno em CSS puro
 * - Borda metálica fina em titânio escuro
 * - Dynamic Island / notch elegante no topo
 * - Cantos arredondados contínuos
 * - Reflexo de tela diagonal para aspecto premium
 * - Leve perspectiva e rotação opcional
 */
export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  children,
  className = '',
  rotate = 'none',
  size = 'md',
}) => {
  const getRotationClass = () => {
    switch (rotate) {
      case 'left':
        return '-rotate-2 sm:-rotate-3 hover:rotate-0'
      case 'right':
        return 'rotate-2 sm:rotate-3 hover:rotate-0'
      default:
        return 'rotate-0'
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'max-w-[210px] sm:max-w-[230px]'
      case 'lg':
        return 'max-w-[290px] sm:max-w-[320px]'
      default:
        return 'max-w-[250px] sm:max-w-[275px]'
    }
  }

  return (
    <div
      className={`relative mx-auto transition-transform duration-500 ease-out perspective-[1200px] ${getSizeClasses()} ${className}`}
    >
      {/* Sombra de apoio no chão */}
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[80%] h-6 bg-forest-dark/30 blur-xl rounded-full pointer-events-none" />

      {/* Carcaça externa do Celular (borda metálica) */}
      <div
        className={`relative rounded-[38px] p-[8px] sm:p-[9px] bg-gradient-to-b from-[#3D4044] via-[#1F2124] to-[#111214] shadow-[0_25px_50px_-12px_rgba(20,30,25,0.45),0_10px_20px_-5px_rgba(0,0,0,0.3)] border border-[#525559]/70 transition-transform duration-500 ${getRotationClass()}`}
        style={{
          boxShadow:
            '0 24px 45px -10px rgba(15, 23, 18, 0.45), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.85)',
        }}
      >
        {/* Botão de volume à esquerda (detalhe) */}
        <div className="absolute -left-[2px] top-20 w-[2px] h-9 bg-[#2c2d30] rounded-l" />
        <div className="absolute -left-[2px] top-32 w-[2px] h-9 bg-[#2c2d30] rounded-l" />
        {/* Botão de liga/desliga à direita */}
        <div className="absolute -right-[2px] top-24 w-[2px] h-12 bg-[#2c2d30] rounded-r" />

        {/* Moldura da tela (Bezel interno) */}
        <div className="relative rounded-[30px] overflow-hidden bg-cream aspect-[9/18.5] sm:aspect-[9/19] w-full shadow-inner border border-black/60 flex flex-col">
          {/* Dynamic Island / Pílula superior */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-30 flex items-center justify-end pr-2.5 shadow-sm">
            {/* Lente da câmera frontal */}
            <div className="w-2 h-2 rounded-full bg-[#111827] border border-[#1f2937] flex items-center justify-center">
              <div className="w-0.5 h-0.5 rounded-full bg-[#2563eb]/60" />
            </div>
          </div>

          {/* Barra de status sutil */}
          <div className="pt-2 px-5 pb-1 flex items-center justify-between text-[9px] font-mono font-medium text-forest/70 relative z-20 pointer-events-none">
            <span>19:42</span>
            <div className="flex items-center gap-1 opacity-75">
              <span>5G</span>
              <div className="w-4 h-2 border border-current rounded-xs p-[0.5px]">
                <div className="w-2.5 h-full bg-current rounded-xs" />
              </div>
            </div>
          </div>

          {/* Conteúdo da tela do celular */}
          <div className="flex-1 overflow-hidden relative z-10 flex flex-col">{children}</div>

          {/* Barra home inferior */}
          <div className="py-1.5 flex justify-center bg-transparent relative z-20 pointer-events-none">
            <div className="w-24 h-1 bg-forest/30 rounded-full" />
          </div>

          {/* Reflexo diagonal na tela de celular */}
          <div
            className="absolute inset-0 pointer-events-none z-30 bg-gradient-to-tr from-transparent via-white/[0.08] to-white/[0.22]"
            style={{
              clipPath: 'polygon(0 0, 85% 0, 15% 100%, 0% 100%)',
            }}
          />

          {/* Brilho linear fino no topo */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-white/25 pointer-events-none z-30" />
        </div>
      </div>
    </div>
  )
}
