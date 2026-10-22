import React from 'react'
import { ShieldCheck, Heart } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-forest-dark text-cream border-t border-cream/10 pt-14 pb-16 px-4">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-6">
        {/* Logotipo / Marca */}
        <div className="flex flex-col items-center gap-1">
          <span className="font-mono text-xs uppercase tracking-widest text-caramel-light font-semibold">
            Método de Cozinha Inteligente
          </span>
          <h3 className="font-serif text-2xl font-bold tracking-tight text-cream">
            Instituto do Sabor
          </h3>
          <p className="text-xs text-cream/70 max-w-md mt-1">
            Sabor com sistema. Ordem a serviço do prazer na cozinha real.
          </p>
        </div>

        {/* Linha divisória suave */}
        <div className="w-24 h-px bg-cream/15" />

        {/* Garantia & Avisos */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-cream/75 max-w-xl">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-terracotta" />
            Compra 100% segura via Kiwify
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-ice" />
            Garantia incondicional de 7 dias
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-terracotta fill-terracotta/40" />
            Acesso vitalício à área de membros
          </span>
        </div>

        {/* Disclaimer legal */}
        <p className="text-[11px] leading-relaxed text-cream/50 max-w-2xl">
          Este site não é afiliado ao Facebook ou a qualquer entidade do Meta Inc. Uma vez que você
          deixar o Facebook, a responsabilidade não é deles e sim do nosso site. Fazemos todos os
          esforços para indicar claramente e mostrar todas as provas do produto e usar resultados
          reais.
        </p>

        {/* Copyright & Links */}
        <div className="pt-4 border-t border-cream/10 w-full flex flex-col sm:flex-row items-center justify-between text-xs text-cream/60 gap-3">
          <p>© {new Date().getFullYear()} Instituto do Sabor. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <a href="#termos" className="hover:text-cream transition-colors">
              Termos de Uso
            </a>
            <span className="text-cream/30">•</span>
            <a href="#privacidade" className="hover:text-cream transition-colors">
              Políticas de Privacidade
            </a>
            <span className="text-cream/30">•</span>
            <a href="#contato" className="hover:text-cream transition-colors">
              Suporte Kiwify
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
