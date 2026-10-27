import React from 'react'
import { Clock, DollarSign, Compass, Repeat } from 'lucide-react'
import { CtaButton } from './CtaButton'

export const SecaoOQueMuda: React.FC = () => {
  const mudancas = [
    {
      icon: Clock,
      title: 'Falta de tempo.',
      text: 'Um dia de cozinha, umas 3 horas, rende refeições para duas semanas. Nos outros 13 dias, sua cozinha é montagem de 5 a 15 minutos.',
      tag: 'Economia de ~12 horas por semana',
    },
    {
      icon: DollarSign,
      title: 'Dinheiro e desperdício.',
      text: 'Você compra para o ciclo e usa tudo. Nada estraga esquecido na gaveta, e o delivery deixa de ser rotina.',
      tag: 'Economia média de R$ 400 a R$ 800/mês',
    },
    {
      icon: Compass,
      title: 'Falta de repertório.',
      text: 'As fichas eliminam o "e agora, o que eu faço com isso?". Cada uma diz exatamente o que combinar com o quê.',
      tag: '229 fichas passo a passo',
    },
    {
      icon: Repeat,
      title: 'Comida repetitiva.',
      text: 'Mais de 200 pratos saem das mesmas 24 bases. Cardápio gostoso e variado todos os dias, sem aumentar o esforço.',
      tag: 'Zero monotonia no prato',
    },
  ]

  return (
    <section className="py-20 md:py-24 bg-cream-50/60 border-t border-cream-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-caramel font-semibold px-3 py-1 rounded bg-cream-200 inline-block">
            Impacto no Dia a Dia
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight">
            O que muda na sua semana
          </h2>
          <p className="text-forest/75 text-base sm:text-lg font-sans">
            As quatro maiores dores da cozinha cotidiana resolvidas de uma vez por todas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mudancas.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="bg-cream-100/90 rounded-2xl p-7 border border-caramel/20 shadow-sm hover:shadow-md hover:border-terracotta/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-forest">{item.title}</h3>

                  <p className="text-forest/85 text-base leading-relaxed font-sans">{item.text}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-caramel/15 text-xs font-mono text-caramel-dark font-medium">
                  {item.tag}
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA estratégico após benefícios/mudanças de rotina */}
        <div className="mt-12 flex justify-center">
          <CtaButton
            text="Quero economizar tempo e dinheiro na cozinha"
            subtext="Mais de 200 pratos práticos • Apenas R$47 com garantia de 7 dias"
            variant="primary"
            showBadge
            badgeText="Sem Monotonia"
          />
        </div>
      </div>
    </section>
  )
}
