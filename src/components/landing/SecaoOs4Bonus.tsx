import React from 'react'
import { Snowflake, FileSpreadsheet, Activity, Sparkles, AlertTriangle } from 'lucide-react'
import { TabletMockup } from './mockups/TabletMockup'
import { EbookCoverPlaceholder } from './mockups/EbookCoverPlaceholder'
import { ManualDoFreezerCover } from './mockups/ManualDoFreezerCover'
import { EBOOK_COVERS } from './mockups/ebookCoversConfig'
import {
  capaOcasioesEspeciais,
  planilhaMestraBonus2,
  tabelaMacrosBonus3,
} from '@/assets/mockupImages'

export const SecaoOs4Bonus: React.FC = () => {
  const bonusList = [
    {
      id: 'manual-do-freezer',
      num: 'Bônus 1',
      title: 'Manual do Freezer',
      preco: 'R$32',
      accentColor: 'border-t-ice bg-ice/10',
      tagColor: 'text-forest bg-ice/40 border-ice',
      icon: Snowflake,
      coverData: EBOOK_COVERS.manualDoFreezer,
      customCover: <ManualDoFreezerCover />,
      rotate: 'left' as const,
      copy: 'Como as 24 bases cabem no seu congelador: 4 jeitos de guardar, sendo sacos achatados com vincos, formas e doses, potes empilháveis e bandeja de pré-congelamento, mais o sistema de etiquetas e o arquivo vertical que organiza tudo por categoria.',
    },
    {
      id: 'planilha-inteligente',
      num: 'Bônus 2',
      title: 'Planilha inteligente',
      preco: 'R$35',
      accentColor: 'border-t-caramel bg-caramel/10',
      tagColor: 'text-caramel-dark bg-caramel/20 border-caramel/30',
      icon: FileSpreadsheet,
      coverData: EBOOK_COVERS.planilhaInteligente,
      customCover: (
        <div className="relative h-full w-full bg-[#1E3A2B] overflow-hidden flex flex-col justify-between">
          <img
            src={planilhaMestraBonus2}
            alt="Planilha Inteligente - Freezer Cápsula: Planilha Mestra"
            loading="lazy"
            decoding="async"
            width={700}
            height={522}
            className="w-full h-full object-cover object-top select-none"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pt-3 pb-1 px-2 text-center pointer-events-none">
            <span className="inline-block text-[9px] font-semibold text-white/95 tracking-wide drop-shadow-xs">
              Planilha Mestra • Google Sheets + Excel
            </span>
          </div>
        </div>
      ),
      rotate: 'right' as const,
      copy: 'Você escolhe as bases do seu ciclo e a planilha lista os pratos possíveis com o que está no freezer. Nunca mais abrir a geladeira sem saber o que montar.',
    },
    {
      id: 'tabela-de-macros',
      num: 'Bônus 3',
      title: 'Tabela de Macros',
      preco: 'R$24',
      accentColor: 'border-t-forest bg-forest/10',
      tagColor: 'text-forest bg-forest/15 border-forest/30',
      icon: Activity,
      coverData: EBOOK_COVERS.tabelaDeMacros,
      customCover: (
        <div className="relative h-full w-full bg-[#1F2E28] overflow-hidden flex flex-col justify-between">
          <img
            src={tabelaMacrosBonus3}
            alt="Tabela de Equivalência de Macros e Calorias com fórmulas vivas"
            loading="lazy"
            decoding="async"
            width={800}
            height={452}
            className="w-full h-full object-cover object-top select-none"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pt-3 pb-1 px-2 text-center pointer-events-none">
            <span className="inline-block text-[9px] font-semibold text-white/95 tracking-wide drop-shadow-xs">
              Tabela de Macros • Fórmulas vivas
            </span>
          </div>
        </div>
      ),
      rotate: 'left' as const,
      copy: 'As calorias e macros das receitas do guia, de acordo com as porções que você usa de verdade. Assim, você tem total controle sobre a sua dieta sem deixar de comer variado.',
    },
    {
      id: 'ocasioes-especiais',
      num: 'Bônus 4',
      title: 'Receitas para ocasiões especiais',
      preco: 'R$19',
      accentColor: 'border-t-terracotta bg-terracotta/10',
      tagColor: 'text-terracotta bg-terracotta/15 border-terracotta/30',
      icon: Sparkles,
      coverData: {
        ...EBOOK_COVERS.ocasiaoEspeciais,
        imageUrl: capaOcasioesEspeciais,
      },
      rotate: 'right' as const,
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

        {/* 4 Cards de Bônus (2x2) com Mockup de Tablet em cada card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bonusList.map((bonus, idx) => {
            const Icon = bonus.icon
            return (
              <div
                key={idx}
                className="bg-cream-100 rounded-2xl border border-caramel/25 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
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
                    <span className="bg-terracotta text-cream px-2.5 py-0.5 rounded font-bold uppercase tracking-wider shadow-xs">
                      GRÁTIS
                    </span>
                  </div>
                </div>

                {/* Corpo do card: Mockup do Tablet e Texto explicativo */}
                <div className="p-6 sm:p-7 flex flex-col sm:flex-row gap-6 items-center flex-1">
                  {/* Mockup de Tablet com a capa do material */}
                  <div className="w-full sm:w-[46%] shrink-0 flex justify-center py-2">
                    <TabletMockup rotate={bonus.rotate} size="sm">
                      {bonus.customCover ? (
                        bonus.customCover
                      ) : (
                        <EbookCoverPlaceholder cover={bonus.coverData} />
                      )}
                    </TabletMockup>
                  </div>

                  {/* Informações textuais do Bônus */}
                  <div className="space-y-3 flex-1 text-center sm:text-left">
                    <div className="inline-block sm:hidden">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-terracotta font-semibold">
                        {bonus.num} • E-book Digital
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-forest leading-snug">
                      {bonus.title}
                    </h3>
                    <p className="text-forest/80 text-sm leading-relaxed font-sans">{bonus.copy}</p>
                  </div>
                </div>

                {/* Rodapé do card */}
                <div className="px-6 py-3 bg-cream-200/50 border-t border-caramel/15 text-[11px] font-mono text-caramel flex items-center justify-between">
                  <span>Acesso digital imediato</span>
                  <span className="font-semibold text-terracotta">Incluso na oferta</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
