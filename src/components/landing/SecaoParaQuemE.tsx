import React from 'react'
import { Users2 } from 'lucide-react'

export const SecaoParaQuemE: React.FC = () => {
  return (
    <section className="py-14 md:py-20 bg-cream border-y border-cream-200">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <div className="inline-flex items-center justify-center gap-2 p-2 rounded-full bg-caramel/10 text-caramel mb-2">
          <Users2 className="w-5 h-5 text-terracotta" />
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-forest tracking-tight">
          Feito para quem mora sozinho ou em núcleo pequeno.
        </h2>

        {/* Flourish decorativo de caramelo */}
        <div className="w-20 h-1 bg-terracotta mx-auto rounded-full" />

        <p className="text-base sm:text-lg text-forest/75 font-sans max-w-2xl mx-auto">
          Cada porção sai dimensionada para evitar sobras na panela e legumes apodrecendo na gaveta.
          Você faz comida na medida certa para a sua casa.
        </p>
      </div>
    </section>
  )
}
