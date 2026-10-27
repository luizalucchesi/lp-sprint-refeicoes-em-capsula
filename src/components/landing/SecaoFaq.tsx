import React, { useState } from 'react'
import { Plus, Minus, HelpCircle } from 'lucide-react'
import { CtaButton } from './CtaButton'

interface FaqItem {
  pergunta: string
  resposta: string
}

const faqs: FaqItem[] = [
  {
    pergunta: 'Preciso de um freezer grande?',
    resposta:
      'Não. O Manual do Freezer mostra como as 24 bases cabem num congelador comum, com 4 métodos de armazenamento que economizam espaço.',
  },
  {
    pergunta: 'Moro sozinho. Funciona pra mim?',
    resposta:
      'O método foi montado em porções individuais. Cada base rende porções para uma pessoa, e você descongela só o que vai comer. Por isso, funciona para todas as casas: quem mora sozinho, tira uma porção. Quem vai comer em família, tira a quantidade certa para o número de pessoas na casa, sem estresse.',
  },
  {
    pergunta: 'Quanto tempo as bases duram no freezer?',
    resposta:
      'De 2 a 6 meses, conforme a base. Cada receita traz a validade certa e o jeito certo de congelar.',
  },
  {
    pergunta: 'Preciso de equipamento especial?',
    resposta:
      'Tudo o que você precisa para o método funcionar já está na sua cozinha. Algumas receitas são feitas na panela de pressão. Se você não tiver uma, pode cozinhar sem pressão normalmente, como já está acostumado. Você pode congelar com os potes e saquinhos que já tem em casa. Ou, se preferir, no bônus do manual de congelamento nós montamos uma listinha com links da shopee para comprar sacos ziplock no tamanho adequado, potes retangulares que economizam espaço, caneta permanente, tudo no precinho.',
  },
  {
    pergunta: 'Como recebo o material?',
    resposta:
      'Tudo é digital. O acesso libera imediatamente após a confirmação do pagamento. Você vai receber o link para a sua área de membros, e o acesso é vitalício.',
  },
  {
    pergunta: 'E se eu não gostar?',
    resposta:
      'Você tem 7 dias de garantia incondicional. O pedido de reembolso pode ser feito pela própria plataforma da Kiwify, sem nenhuma burocracia. O reembolso é feito automaticamente, não precisa conversar com ninguém e nem explicar nada.',
  },
  {
    pergunta: 'Vou pagar e receber um PDF raso?',
    resposta:
      'Não! Por metade do valor de uma pizza, você recebe um sistema, não um e-book de receitas sem nexo. Aplicando, você vai ver uma mudança real na sua vida e na sua rotina na mesma semana, isso eu te garanto.',
  },
  {
    pergunta: 'E se eu perder o arquivo PDF ou meu computador estragar?',
    resposta:
      'Uma vez que o seu pagamento for confirmado, você já tem acesso para a vida toda à sua área de membros! Você pode baixar o material quantas vezes quiser, não tem nenhum tipo de limite de downloads. Caso você perca a sua senha, é só você entrar na página da Kiwify, pedir a recuperação de senha e todo o material que você comprou por lá vai estar disponível para você.',
  },
  {
    pergunta: 'Eu vou enjoar das receitas do método?',
    resposta:
      'As bases servem para você ter várias possibilidades de combinação com poucos preparos. Só nas fichas, você tem praticamente uma receita por dia útil do ano! E além disso, uma vez que você entendeu o conceito do método e sentiu confiança na cozinha, você pode preparar outros tipos de bases e testar o que funciona para você. As possibilidades são realmente infinitas!',
  },
]

export const SecaoFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-caramel font-semibold px-3 py-1 rounded bg-cream-200 inline-block">
            Tire Suas Dúvidas
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="text-forest/75 text-base sm:text-lg font-sans">
            Tudo o que você precisa saber antes de garantir seu acesso.
          </p>
        </div>

        {/* Lista de cards retráteis (apenas um aberto por vez) */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className="bg-cream-100 rounded-2xl border border-caramel/20 shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:bg-cream-200/50"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0">
                      <HelpCircle className="w-4 h-4" />
                    </span>
                    <span className="font-serif text-lg sm:text-xl font-bold text-forest leading-snug">
                      {faq.pergunta}
                    </span>
                  </div>

                  <span
                    className={`w-8 h-8 rounded-full bg-cream flex items-center justify-center shrink-0 border border-caramel/25 text-forest transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-forest text-cream' : ''
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                {/* Resposta retrátil */}
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-forest/85 text-base leading-relaxed font-sans border-t border-caramel/10 animate-fade-in">
                    <p>{faq.resposta}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* CTA estratégico após FAQ para quem tirou todas as dúvidas */}
        <div className="mt-14 flex flex-col items-center justify-center text-center p-8 bg-cream-100 rounded-3xl border border-caramel/25 shadow-sm">
          <p className="font-serif text-2xl sm:text-3xl font-bold text-forest mb-2">
            Ainda com alguma dúvida?
          </p>
          <p className="text-forest/80 text-sm sm:text-base font-sans max-w-lg mb-6">
            Lembre-se: você tem 7 dias de garantia incondicional para experimentar o método sem
            nenhum risco.
          </p>
          <CtaButton
            text="Garantir meu acesso agora por R$47"
            subtext="Acesso imediato • 4 bônus inclusos • Garantia de 7 dias"
            variant="primary"
            showBadge
            badgeText="Sem Risco"
          />
        </div>
      </div>
    </section>
  )
}
