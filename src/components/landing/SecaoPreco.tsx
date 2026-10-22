import React from 'react'
import { CtaButton } from './CtaButton'
import { Pizza, ShoppingBag, Percent } from 'lucide-react'

const precos = [
  { nome: 'Refeições em Cápsula (guia completo)', valor: 'R$47', destaque: true },
  { nome: 'Manual do Freezer', valor: 'R$32' },
  { nome: 'Planilha inteligente', valor: 'R$35' },
  { nome: 'Tabela de Macros', valor: 'R$24' },
  { nome: 'Receitas para ocasiões especiais', valor: 'R$19' },
]

export const SecaoPreco: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-cream-50/70 border-t border-cream-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Título da seção */}
        <div className="text-center space-y-3 mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-caramel font-semibold px-3 py-1 rounded bg-cream-200 inline-block">
            Valor do Investimento
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight">
            De{' '}
            <span className="line-through decoration-terracotta decoration-4 text-terracotta/80">
              R$157
            </span>{' '}
            por <span className="text-terracotta">R$47</span>
          </h2>
        </div>

        {/* Tabela de Preços */}
        <div className="bg-cream-100 rounded-3xl border border-caramel/25 shadow-lg overflow-hidden">
          {/* Cabeçalho da tabela */}
          <div className="bg-forest text-cream px-6 py-4 grid grid-cols-12 gap-4">
            <span className="col-span-8 font-mono text-xs uppercase tracking-widest text-cream/80 font-semibold">
              Item
            </span>
            <span className="col-span-4 text-right font-mono text-xs uppercase tracking-widest text-cream/80 font-semibold">
              Valor
            </span>
          </div>

          {/* Linhas */}
          <div className="divide-y divide-caramel/15">
            {precos.map((item, idx) => (
              <div
                key={idx}
                className={`px-6 py-4 grid grid-cols-12 gap-4 items-center ${
                  idx % 2 === 1 ? 'bg-cream-200/40' : 'bg-cream-100'
                }`}
              >
                <span className="col-span-8 text-sm sm:text-base text-forest font-sans">
                  {item.nome}
                </span>
                <span className="col-span-4 text-right font-serif text-lg font-bold text-forest">
                  {item.valor}
                </span>
              </div>
            ))}

            {/* Total riscado */}
            <div className="px-6 py-5 bg-cream-200/70 grid grid-cols-12 gap-4 items-center border-t-2 border-caramel/25">
              <span className="col-span-8 font-serif text-xl font-bold text-forest">Total</span>
              <span className="col-span-4 text-right font-serif text-2xl font-bold text-gray-400 line-through decoration-terracotta decoration-2">
                R$157
              </span>
            </div>

            {/* Linha de preço final */}
            <div className="px-6 py-6 bg-forest text-cream text-center">
              <p className="text-sm font-mono uppercase tracking-widest text-cream/75 mb-1">
                Nesta página, tudo sai por
              </p>
              <p className="font-serif text-5xl sm:text-6xl font-bold text-cream tracking-tight">
                R$47
              </p>
              <p className="text-xs text-cream/70 mt-1 font-sans">
                Os 4 bônus entram de graça na oferta
              </p>
            </div>
          </div>

          {/* Comparativo e CTA */}
          <div className="p-6 sm:p-8 bg-cream-100 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-sans">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-cream-200/60 border border-caramel/20">
                <Pizza className="w-5 h-5 text-terracotta shrink-0" />
                <span className="text-forest/85">Menos que um delivery.</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-cream-200/60 border border-caramel/20">
                <ShoppingBag className="w-5 h-5 text-terracotta shrink-0" />
                <span className="text-forest/85">Cada ciclo rende duas semanas de refeições.</span>
              </div>
            </div>

            <div className="flex justify-center pt-3">
              <CtaButton
                text="Quero tudo por R$47"
                variant="primary"
                showBadge
                badgeText="Oferta desta página"
                subtext="Acesso imediato + Garantia de 7 dias + Acesso vitalício"
              />
            </div>

            <p className="text-center text-[11px] text-caramel-dark font-mono uppercase tracking-wider flex items-center justify-center gap-1.5">
              <Percent className="w-3.5 h-3.5 text-terracotta" />
              Pagamento processado com segurança pela Kiwify
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
