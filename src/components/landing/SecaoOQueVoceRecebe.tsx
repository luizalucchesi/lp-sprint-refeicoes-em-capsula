import React from 'react'
import { BookOpen, Layers, Utensils, Gift, Check } from 'lucide-react'

// Flat-lay de sacos de freezer etiquetados sobre bancada rústica
const FLATLAY_IMAGE_URL =
  'https://img.usecurling.com/p/800/600?q=freezer%20bags%20labeled%20kitchen%20counter&color=orange'

export const SecaoOQueVoceRecebe: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Cabeçalho */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-caramel font-semibold px-3 py-1 rounded bg-cream-200 inline-block">
            Conteúdo Detalhado
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight">
            Veja tudo o que você recebe se comprar agora!
          </h2>

          <p className="text-forest/80 text-base sm:text-lg font-sans leading-relaxed">
            Você já deve ter comprado um guia de marmitas fit, um e-book cheio de receitas jogadas e
            que não fazem sentido e outros materiais que não te serviram de nada. Não tem nada mais
            frustrante do que isso. Só que esse{' '}
            <strong className="text-terracotta">não é um e-book de receitas</strong>, muito menos um
            guia sem graça de marmitas idênticas umas às outras. É um sistema que elimina a decisão
            da fadiga da sua vida.
          </p>
        </div>

        {/* 3 Pilares Centrais do Produto */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Pilar 1 */}
          <div className="bg-cream-100 rounded-2xl p-7 border border-caramel/20 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-terracotta/40 transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center font-bold">
                <Layers className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-caramel font-semibold">
                  Pilar 01
                </span>
                <h3 className="font-serif text-2xl font-bold text-forest">24 bases completas</h3>
              </div>

              <p className="text-forest/80 text-sm sm:text-base leading-relaxed font-sans">
                Cada uma com ingredientes, modo de preparo, rendimento em porções individuais, jeito
                certo de congelar e validade no freezer.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-caramel/15 text-xs font-mono text-terracotta font-semibold">
              ✓ Ingredientes simples e acessíveis
            </div>
          </div>

          {/* Pilar 2 */}
          <div className="bg-cream-100 rounded-2xl p-7 border border-caramel/20 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-terracotta/40 transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-forest/10 text-forest flex items-center justify-center font-bold">
                <BookOpen className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-caramel font-semibold">
                  Pilar 02
                </span>
                <h3 className="font-serif text-2xl font-bold text-forest">
                  229 fichas de montagem
                </h3>
              </div>

              <p className="text-forest/80 text-sm sm:text-base leading-relaxed font-sans">
                Cada ficha diz quais bases combinar e o passo a passo da montagem, com o tempo de
                cada prato. Tem pratos completos como arroz de carreteiro, tem lanches da tarde como
                burrito, esfiha aberta, escondidinho para o jantar... Todos usando de 2 a 3 bases em
                média.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-caramel/15 text-xs font-mono text-forest font-semibold">
              ✓ 1 prato diferente para cada dia útil do ano
            </div>
          </div>

          {/* Pilar 3 */}
          <div className="bg-cream-100 rounded-2xl p-7 border border-caramel/20 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-terracotta/40 transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-ice/40 text-forest flex items-center justify-center font-bold">
                <Utensils className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-caramel font-semibold">
                  Pilar 03
                </span>
                <h3 className="font-serif text-2xl font-bold text-forest">5 grupos de sustento</h3>
              </div>

              <p className="text-forest/80 text-sm sm:text-base leading-relaxed font-sans">
                Proteínas, molhos, carboidratos, leguminosas e legumes. Você escolhe um ou dois de
                cada grupo, cozinha em uma tarde, congela e tem comida boa e variada todos os dias.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-caramel/15 text-xs font-mono text-caramel-dark font-semibold">
              ✓ Variedade equilibrada e nutritiva
            </div>
          </div>
        </div>

        {/* Faixa de Destaque dos 4 Bônus Gratuitos */}
        <div className="bg-terracotta text-cream rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream/20 text-cream text-xs font-mono uppercase tracking-wider font-semibold">
                <Gift className="w-4 h-4" />
                Presente exclusivo desta página
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-snug">
                E só nesse link, você recebe mais 4 bônus gratuitamente:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm sm:text-base font-sans">
                <div className="flex items-center gap-2 bg-cream/10 p-3 rounded-xl border border-cream/15">
                  <Check className="w-5 h-5 text-ice shrink-0" />
                  <span>
                    <strong>Bônus 1:</strong> Manual do Freezer
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-cream/10 p-3 rounded-xl border border-cream/15">
                  <Check className="w-5 h-5 text-ice shrink-0" />
                  <span>
                    <strong>Bônus 2:</strong> Planilha inteligente
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-cream/10 p-3 rounded-xl border border-cream/15">
                  <Check className="w-5 h-5 text-ice shrink-0" />
                  <span>
                    <strong>Bônus 3:</strong> Tabela de Macros
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-cream/10 p-3 rounded-xl border border-cream/15">
                  <Check className="w-5 h-5 text-ice shrink-0" />
                  <span>
                    <strong>Bônus 4:</strong> Ocasiões especiais
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="rounded-2xl overflow-hidden border-2 border-cream/30 shadow-2xl max-w-xs w-full">
                <img
                  src={FLATLAY_IMAGE_URL}
                  alt="Flat-lay com sacos de freezer e fichas de receitas do guia"
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
