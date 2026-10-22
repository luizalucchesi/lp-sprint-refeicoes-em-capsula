import React from 'react'
import { Snowflake, ChefHat, CheckSquare } from 'lucide-react'

// Imagem: saquinho com frango etiquetado com caneta permanente e leve toque de gelo
const FREEZER_BAG_IMAGE =
  'https://img.usecurling.com/p/800/600?q=freezer%20meal%20prep%20labels&color=cyan'

export const SecaoAVirada: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-forest text-cream relative overflow-hidden">
      {/* Detalhes de textura e formas sutis de fundo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-ice/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-terracotta/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Cabeçalho da virada */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cream tracking-tight leading-tight">
            Decida o que comer uma vez. <br />
            <span className="text-[#F5A07A]">Coma bem por duas semanas.</span>
          </h2>

          <p className="text-cream/85 text-base sm:text-lg leading-relaxed font-sans">
            Existe um jeito de cozinhar que não depende de força de vontade diária. Funciona como um{' '}
            <strong className="text-cream font-semibold underline decoration-terracotta decoration-2">
              armário cápsula
            </strong>
            , só que pra comida: poucas peças boas que combinam entre si rendem dezenas de
            combinações.
          </p>
        </div>

        {/* Os 3 Passos Numerados */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {/* Passo 1 */}
          <div className="relative bg-forest-dark/80 rounded-2xl p-6 sm:p-7 border border-cream/10 shadow-xl flex flex-col justify-between hover:border-terracotta/40 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-caramel-light bg-forest-light/40 px-3 py-1 rounded-md border border-cream/10">
                  Passo 1
                </span>
                <ChefHat className="w-6 h-6 text-terracotta" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-cream flex items-baseline gap-2">
                1. Prepara
              </h3>
              <p className="text-cream/80 text-sm sm:text-base leading-relaxed font-sans">
                Num dia só, umas 3 horas com a limpeza incluída, você cozinha as bases do seu ciclo:
                proteínas, molhos, carboidratos, grãos e legumes.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-cream/10 text-xs font-mono text-cream/60">
              ⏱ ~3h a cada 14 dias
            </div>
          </div>

          {/* Passo 2: Congela com toque Azul Gelo */}
          <div className="relative bg-forest-dark/90 rounded-2xl p-6 sm:p-7 border-2 border-ice/30 shadow-xl flex flex-col justify-between hover:border-ice transition-colors">
            {/* Tag visual de gelo */}
            <div className="absolute -top-3 right-6 bg-ice text-forest text-[11px] font-mono font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow">
              Arquivo Vertical
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-ice bg-ice/15 px-3 py-1 rounded-md border border-ice/20">
                  Passo 2
                </span>
                <Snowflake className="w-6 h-6 text-ice" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-cream flex items-baseline gap-2">
                2. Congela
              </h3>
              <p className="text-cream/80 text-sm sm:text-base leading-relaxed font-sans">
                Cada base sai porcionada, etiquetada com nome e data, congelada do jeito certo e
                prático.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-cream/10 text-xs font-mono text-ice/80">
              ❄️ 2 a 6 meses de validade
            </div>
          </div>

          {/* Passo 3 */}
          <div className="relative bg-forest-dark/80 rounded-2xl p-6 sm:p-7 border border-cream/10 shadow-xl flex flex-col justify-between hover:border-terracotta/40 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-caramel-light bg-forest-light/40 px-3 py-1 rounded-md border border-cream/10">
                  Passo 3
                </span>
                <CheckSquare className="w-6 h-6 text-terracotta" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-cream flex items-baseline gap-2">
                3. Monta
              </h3>
              <p className="text-cream/80 text-sm sm:text-base leading-relaxed font-sans">
                No dia a dia, você escolhe uma ficha de receita, tira duas bases do freezer e monta
                o prato em 5 a 15 minutos.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-cream/10 text-xs font-mono text-cream/60">
              ⚡ Jantar em 5 a 15 min
            </div>
          </div>
        </div>

        {/* Linha de Exemplos Práticos: Frango e Feijão */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-forest-dark/60 rounded-3xl p-6 sm:p-10 border border-cream/10">
          <div className="lg:col-span-7 space-y-5">
            <h4 className="font-serif text-2xl font-bold text-cream">
              Cozinha poucas bases e tenha uma variedade quase infinita de pratos:
            </h4>

            <div className="space-y-4 font-sans text-base sm:text-lg">
              <div className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-terracotta mt-2 shrink-0" />
                <p className="text-cream/90">
                  O mesmo <strong className="text-cream">frango desfiado</strong> vira{' '}
                  <span className="text-[#F5A07A] font-semibold">
                    galinhada, wrap, salada, recheio de panqueca
                  </span>
                  .
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-ice mt-2 shrink-0" />
                <p className="text-cream/90">
                  O mesmo <strong className="text-cream">feijão</strong> vira{' '}
                  <span className="text-[#F5A07A] font-semibold">
                    tutu, caldinho, bolinho, salada fria
                  </span>
                  .
                </p>
              </div>
            </div>

            <p className="text-xs font-mono uppercase tracking-wider text-cream/60 pt-2">
              Você não come a mesma coisa todo dia. Come a mesma base vestida com pratos diferentes.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border-2 border-ice/20 shadow-2xl">
              <img
                src={FREEZER_BAG_IMAGE}
                alt="Porções de bases congeladas com etiquetas no freezer"
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-center">
                <span className="inline-block bg-cream/95 text-forest font-mono text-xs px-3 py-1 rounded shadow font-semibold">
                  Sacos achatados com vinco • Ocupa 70% menos espaço
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
