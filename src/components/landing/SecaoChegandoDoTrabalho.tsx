import React from 'react'
import { ShoppingBag, UtensilsCrossed } from 'lucide-react'

import geladeiraGavetaLegumes from '@/assets/2-ec1a1.jpg'

export const SecaoChegandoDoTrabalho: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-cream-50/70 border-t border-cream-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Lado Esquerdo: Headline em Fraunces */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-forest leading-snug">
              Cheguei do trabalho, a geladeira está cheia e eu não sei o que jantar
            </h2>

            {/* Imagem contextual da geladeira real */}
            <div className="mt-4 rounded-2xl overflow-hidden border border-caramel/20 shadow-md">
              <img
                src={geladeiraGavetaLegumes}
                alt="Geladeira e gaveta aberta cheia de legumes frescos e potes"
                className="w-full h-48 sm:h-56 object-cover"
                loading="lazy"
                decoding="async"
                width={600}
                height={600}
              />
              <div className="p-2.5 bg-cream text-[11px] font-mono text-caramel text-center border-t border-caramel/10">
                A gaveta cheia de legumes que vão estragar devagar...
              </div>
            </div>
          </div>

          {/* Lado Direito: Cópia verbatim do documento */}
          <div className="lg:col-span-7 flex flex-col space-y-5 text-forest/90 text-base sm:text-lg leading-relaxed font-sans">
            <p>
              Você abre a geladeira e encara as prateleiras como se elas fossem cozinhar por você.
              Tem coisa lá dentro, mas parece que você não quer comer nada do que está ali. Você
              chegou sem energia e a última coisa que aguenta hoje é decidir o que fazer, e aí
              depois cozinhar e ter uma pilha de louças para lavar antes de dormir.
            </p>

            <div className="p-4 rounded-xl bg-cream-200/50 border-l-4 border-terracotta space-y-2">
              <div className="flex items-center gap-2 text-terracotta font-semibold text-sm font-mono uppercase">
                <ShoppingBag className="w-4 h-4" />
                O ciclo do delivery
              </div>
              <p className="text-forest/85 text-base">
                Aí vem o delivery. De novo. Uma comida cara e que não chega aos pés da sua. Enquanto
                isso, os ingredientes frescos que você comprou mais uma vez vão estragando devagar
                na gaveta...
              </p>
            </div>

            <div className="pt-2 text-center sm:text-left">
              <p className="text-caramel font-serif italic text-lg sm:text-xl font-medium leading-relaxed bg-cream-100 p-4 rounded-xl border border-caramel/15">
                <UtensilsCrossed className="w-5 h-5 text-terracotta inline mr-2 align-sub" />
                Isso não é falta de força de vontade, preguiça nem falta de vergonha na cara,{' '}
                <strong className="text-forest font-bold not-italic underline decoration-terracotta decoration-2 underline-offset-4">
                  chama fadiga de decisão.
                </strong>{' '}
                Cozinhar todo dia exige decidir o que fazer e com quais ingredientes. Depois de um
                dia inteiro de estresse e decisões no trabalho, ninguém aguenta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
