import React from 'react'
import { Snowflake, FileSpreadsheet, Activity, Sparkles, AlertTriangle } from 'lucide-react'

export const SecaoOs4Bonus: React.FC = () => {
  const bonusList = [
    {
      num: 'Bônus 1',
      title: 'Manual do Freezer',
      preco: 'R$32',
      accentColor: 'border-t-ice bg-ice/10',
      tagColor: 'text-forest bg-ice/40 border-ice',
      icon: Snowflake,
      copy: 'Como as 24 bases cabem no seu congelador: 4 jeitos de guardar, sendo sacos achatados com vincos, formas e doses, potes empilháveis e bandeja de pré-congelamento, mais o sistema de etiquetas e o arquivo vertical que organiza tudo por categoria.',
    },
    {
      num: 'Bônus 2',
      title: 'Planilha inteligente',
      preco: 'R$35',
      accentColor: 'border-t-caramel bg-caramel/10',
      tagColor: 'text-caramel-dark bg-caramel/20 border-caramel/30',
      icon: FileSpreadsheet,
      copy: 'Você escolhe as bases do seu ciclo e a planilha lista os pratos possíveis com o que está no freezer. Nunca mais abrir a geladeira sem saber o que montar.',
    },
    {
      num: 'Bônus 3',
      title: 'Tabela de Macros',
      preco: 'R$24',
      accentColor: 'border-t-forest bg-forest/10',
      tagColor: 'text-forest bg-forest/15 border-forest/30',
      icon: Activity,
      copy: 'Os macros das receitas do guia, pra você saber o que está comendo e montar pratos equilibrados. Sem discurso de dieta.',
    },
    {
      num: 'Bônus 4',
      title: 'Receitas para ocasiões especiais',
      preco: 'R$19',
      accentColor: 'border-t-terracotta bg-terracotta/10',
      tagColor: 'text-terracotta bg-terracotta/15 border-terracotta/30',
      icon: Sparkles,
      copy: 'Receitas simples de preparar, mas que fogem do dia a dia e impressionam em festas e jantares com família e amigos.',
    },
  ]

  return (
    <section className="py-20 md:py-28 bg-cream border-t border-cream-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Cabeçalho */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-terracotta font-semibold px-3 py-1 rounded bg-terracotta/10 border border-terracotta/20 inline-block">
            Oferta de Campanha
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight">
            4 bônus que só existem nesta página
          </h2>

          <div className="p-4 rounded-xl bg-terracotta/10 border border-terracotta/30 text-forest/90 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto flex items-start gap-3 text-left">
            <AlertTriangle className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
            <p>
              Estes bônus fazem parte da oferta deste link, o que vem dos anúncios. Eles não estão à
              venda separadamente e podem sair do ar quando a campanha encerrar. Se você sair e
              voltar depois pelo link do perfil, é possível que não estejam mais aqui.
            </p>
          </div>
        </div>

        {/* 4 Cards de Bônus (2x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bonusList.map((bonus, idx) => {
            const Icon = bonus.icon
            return (
              <div
                key={idx}
                className="bg-cream-100 rounded-2xl border border-caramel/25 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
              >
                {/* Faixa colorida de topo */}
                <div
                  className={`p-4 border-t-4 ${bonus.accentColor} flex items-center justify-between`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-cream flex items-center justify-center text-forest shadow-sm">
                      <Icon className="w-4 h-4 text-terracotta" />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider font-bold text-forest">
                      {bonus.num}
                    </span>
                  </div>

                  {/* Preço riscado + GRÁTIS */}
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="line-through text-gray-500 font-medium">{bonus.preco}</span>
                    <span className="bg-terracotta text-cream px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      GRÁTIS
                    </span>
                  </div>
                </div>

                {/* Corpo do card */}
                <div className="p-6 sm:p-7 space-y-3 flex-1">
                  <h3 className="font-serif text-2xl font-bold text-forest">{bonus.title}</h3>
                  <p className="text-forest/80 text-sm sm:text-base leading-relaxed font-sans">
                    {bonus.copy}
                  </p>
                </div>

                {/* Rodapé do card */}
                <div className="px-6 py-3 bg-cream-200/50 border-t border-caramel/15 text-[11px] font-mono text-caramel flex items-center justify-between">
                  <span>Acesso imediato no pack</span>
                  <span className="font-semibold text-terracotta">Incluso no plano</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
