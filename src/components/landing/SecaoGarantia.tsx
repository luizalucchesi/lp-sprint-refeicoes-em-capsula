import React from 'react'
import { ShieldCheck, Undo2 } from 'lucide-react'
import { CtaButton } from './CtaButton'

export const SecaoGarantia: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-b from-cream-100 to-cream-200/80 rounded-3xl p-8 sm:p-12 border-2 border-dashed border-caramel/40 shadow-sm text-center relative overflow-hidden">
          {/* Selo / Ícone */}
          <div className="w-16 h-16 mx-auto rounded-2xl bg-forest text-cream flex items-center justify-center shadow-md mb-6">
            <ShieldCheck className="w-9 h-9 text-ice" />
          </div>

          <span className="font-mono text-xs uppercase tracking-widest text-caramel font-semibold px-3 py-1 rounded bg-cream border border-caramel/20 inline-block mb-3">
            Risco Zero Para Você
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest tracking-tight mb-5">
            7 dias pra abrir, ler e decidir
          </h2>

          <p className="text-forest/85 text-base sm:text-lg leading-relaxed font-sans max-w-2xl mx-auto mb-8">
            Você tem 7 dias de garantia incondicional. Se o guia não for pra você, uma mensagem
            resolve e o valor volta, sem interrogatório. O risco fica do nosso lado.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CtaButton
              text="Quero testar por 7 dias sem risco"
              variant="secondary"
              subtext="Reembolso simplificado em 1 clique pela Kiwify"
            />
          </div>

          <div className="mt-8 pt-6 border-t border-caramel/20 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-caramel">
            <span className="flex items-center gap-1.5">
              <Undo2 className="w-3.5 h-3.5 text-forest" />
              100% do seu dinheiro de volta
            </span>
            <span>•</span>
            <span>Sem perguntas chatas</span>
            <span>•</span>
            <span>Processamento automático</span>
          </div>
        </div>
      </div>
    </section>
  )
}
