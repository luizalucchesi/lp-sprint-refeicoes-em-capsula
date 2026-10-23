import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { dispararPurchaseSPRINT, inicializarMetaPixel } from '@/lib/tracking/sprintTracker'
import {
  CheckCircle,
  Mail,
  BookOpen,
  Snowflake,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Heart,
  HelpCircle,
} from 'lucide-react'

export default function Obrigado() {
  // Config global definida antes do disparo principal de Purchase (100% server-side, SEM fbq client-side)
  useEffect(() => {
    window.SPRINT_VALOR = 47.0
    window.SPRINT_PRODUCT_ID = 'cd86f860-ca5d-11f1-b7fe-c57a0f1a8146'

    inicializarMetaPixel()
    dispararPurchaseSPRINT(47.0)
  }, [])

  return (
    <div className="min-h-screen bg-[#F7F1E7] text-[#2E4A3B] py-12 md:py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Cabeçalho de Boas-vindas */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2E4A3B] text-white shadow-lg mb-6 ring-8 ring-[#2E4A3B]/10">
            <CheckCircle className="w-8 h-8 text-[#C9D8DD]" />
          </div>

          <div className="inline-block mb-3">
            <span className="font-mono text-xs uppercase tracking-widest font-semibold text-[#B84A24] bg-[#B84A24]/10 border border-[#B84A24]/20 px-3.5 py-1.5 rounded-full">
              Pedido Confirmado • Acesso Imediato
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2E4A3B] tracking-tight mb-4">
            Parabéns! Seja muito bem-vindo ao Instituto do Sabor
          </h1>

          <p className="text-base sm:text-lg text-[#2E4A3B]/85 max-w-xl mx-auto leading-relaxed">
            Seu pagamento foi confirmado com sucesso. Agora a sua cozinha vai trabalhar a favor do
            seu descanso e do seu prazer.
          </p>
        </div>

        {/* Card Principal de Instruções de Acesso */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-md border border-[#E5DCD0] mb-8">
          <div className="flex items-center gap-3 pb-6 border-b border-[#E5DCD0]">
            <div className="w-10 h-10 rounded-xl bg-[#B84A24]/10 text-[#B84A24] flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2E4A3B]">
                Como acessar o seu material agora
              </h2>
              <p className="text-xs sm:text-sm text-[#8A5A3B]">
                Enviamos os dados de login para a sua caixa de entrada
              </p>
            </div>
          </div>

          <div className="py-6 space-y-5 text-sm sm:text-base text-[#2E4A3B]/90">
            <div className="flex items-start gap-3.5">
              <span className="font-mono font-bold text-xs w-6 h-6 rounded-full bg-[#2E4A3B] text-white flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <div>
                <strong>Verifique seu e-mail:</strong> Procure por uma mensagem da{' '}
                <strong>Kiwify</strong> com o assunto "Seu acesso ao Refeições em Cápsula".
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <span className="font-mono font-bold text-xs w-6 h-6 rounded-full bg-[#2E4A3B] text-white flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div>
                <strong>Crie sua senha:</strong> Clique no link recebido para definir sua senha de
                acesso à área de membros exclusiva.
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <span className="font-mono font-bold text-xs w-6 h-6 rounded-full bg-[#2E4A3B] text-white flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div>
                <strong>Acesse vitaliciamente:</strong> Todos os 4 bônus, fichas de montagem e o
                guia completo já estão liberados para download e visualização.
              </div>
            </div>
          </div>

          {/* Dica da Caixa de Spam */}
          <div className="bg-[#FAF7F2] rounded-2xl p-4 sm:p-5 border border-[#E5DCD0] text-xs sm:text-sm text-[#8A5A3B] flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#B84A24] shrink-0 mt-0.5" />
            <p>
              <strong>Não encontrou o e-mail?</strong> Olhe também na pasta de <em>Spam</em>,{' '}
              <em>Lixo Eletrônico</em> ou na aba <em>Promoções</em> (no Gmail). Costuma chegar em
              menos de 2 minutos.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E5DCD0] flex flex-col sm:flex-row items-center justify-between gap-4">
            <a
              href="https://dashboard.kiwify.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-[#B84A24] hover:bg-[#963919] transition-all shadow-md cursor-pointer"
            >
              <span>Ir para a Área de Membros Kiwify</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <Link
              to="/"
              className="text-xs sm:text-sm text-[#8A5A3B] hover:text-[#2E4A3B] underline underline-offset-4"
            >
              Voltar à página inicial
            </Link>
          </div>
        </div>

        {/* O que você já tem em mãos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-[#E5DCD0]">
            <div className="flex items-center gap-2.5 font-serif font-bold text-base text-[#2E4A3B] mb-1.5">
              <BookOpen className="w-4 h-4 text-[#B84A24]" />
              <span>O Método & 229 Fichas</span>
            </div>
            <p className="text-xs sm:text-sm text-[#2E4A3B]/80">
              O sistema das 24 bases completas para acabar com o estresse diário do jantar.
            </p>
          </div>

          <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#C9D8DD]">
            <div className="flex items-center gap-2.5 font-serif font-bold text-base text-[#2E4A3B] mb-1.5">
              <Snowflake className="w-4 h-4 text-[#2E4A3B]" />
              <span>Os 4 Bônus Exclusivos</span>
            </div>
            <p className="text-xs sm:text-sm text-[#2E4A3B]/80">
              Manual do Freezer, Planilha inteligente, Tabela de Macros e Ocasiões Especiais.
            </p>
          </div>
        </div>

        {/* Garantia de 7 dias reiterada com tranquilidade */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E5DCD0] flex items-center gap-4 text-xs sm:text-sm text-[#2E4A3B]/85">
          <ShieldCheck className="w-8 h-8 text-[#2E4A3B] shrink-0" />
          <p>
            Lembre-se: você tem <strong>7 dias de garantia incondicional</strong>. Se por qualquer
            razão o método não fizer sentido para a sua rotina, o reembolso pode ser solicitado na
            própria Kiwify em 1 clique.
          </p>
        </div>

        {/* Rodapé simplificado do obrigado */}
        <div className="text-center mt-12 text-xs text-[#8A5A3B] flex items-center justify-center gap-2">
          <Heart className="w-3.5 h-3.5 text-[#B84A24]" />
          <span>Instituto do Sabor • Cozinhe para servir ao seu prazer.</span>
        </div>
      </div>
    </div>
  )
}
