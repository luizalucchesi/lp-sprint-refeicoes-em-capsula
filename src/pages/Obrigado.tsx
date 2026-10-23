import React, { useEffect, useRef } from 'react'
import { dispararPurchaseSPRINT, inicializarMetaPixel } from '@/lib/tracking/sprintTracker'
import { CheckCircle2, Mail, ExternalLink, ShieldCheck, Instagram } from 'lucide-react'

const Obrigado: React.FC = () => {
  const trackingRanRef = useRef(false)

  // Disparo de Purchase 100% server-side via SPRINT Conversions API (SEM fbq Purchase client-side)
  useEffect(() => {
    if (trackingRanRef.current) return
    trackingRanRef.current = true

    window.SPRINT_VALOR = 47.0
    window.SPRINT_PRODUCT_ID = 'cd86f860-ca5d-11f1-b7fe-c57a0f1a8146'

    inicializarMetaPixel()
    dispararPurchaseSPRINT(47.0)
  }, [])

  return (
    <div className="w-full bg-[#F7F1E7] min-h-screen text-[#2E4A3B]">
      <div className="mx-auto max-w-[640px] px-5 py-16 text-center space-y-8">
        {/* Ícone de confirmação */}
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#2E4A3B]/10 ring-8 ring-[#2E4A3B]/5">
            <CheckCircle2 className="h-10 w-10 text-[#2E4A3B]" />
          </div>
        </div>

        {/* Cabeçalho */}
        <div className="space-y-3">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#B84A24]">
            Instituto do Sabor
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2E4A3B] tracking-tight">
            Pagamento confirmado!
          </h1>
          <p className="text-base leading-relaxed text-[#2E4A3B]/85">
            Sua compra do <strong>Refeições em Cápsula</strong> foi aprovada e o acesso completo
            está a caminho do seu e-mail agora mesmo.
          </p>
        </div>

        {/* Card: O que acontece agora */}
        <div className="rounded-2xl border border-[#E5DCD0] bg-white p-6 sm:p-7 text-left space-y-4 shadow-sm">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-[#2E4A3B] flex items-center gap-2">
            <Mail className="h-5 w-5 text-[#B84A24]" /> O que acontece agora
          </h2>
          <ol className="space-y-3 text-sm leading-relaxed text-[#2E4A3B]/85 list-decimal pl-5">
            <li>
              A <strong>Kiwify</strong> envia seu acesso para o e-mail usado na compra, com o
              assunto <em>"Seu acesso ao Refeições em Cápsula"</em> (costuma chegar em até 2
              minutos).
            </li>
            <li>
              Clique no link recebido para <strong>criar sua senha</strong> e entrar na área de
              membros exclusiva.
            </li>
            <li>
              <strong>Não encontrou o e-mail?</strong> Dá uma olhada na pasta de <em>Spam</em>,{' '}
              <em>Lixo Eletrônico</em> ou na aba <em>Promoções</em> — e-mails de acesso adoram sumir
              lá.
            </li>
            <li>
              <strong>Tudo pronto:</strong> dentro da área você já encontra o método completo, as
              229 fichas e os 4 bônus (Manual do Freezer, Planilha Inteligente, Tabela de Macros e
              Ocasiões Especiais) totalmente liberados.
            </li>
          </ol>
        </div>

        {/* Botão de ação e suporte */}
        <div className="flex flex-col items-center gap-3 pt-2">
          <a
            href="https://dashboard.kiwify.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B84A24] hover:bg-[#963919] px-8 py-3.5 font-semibold text-[#F7F1E7] shadow-md transition-all cursor-pointer"
          >
            <span>Ir para a Área de Membros</span>
            <ExternalLink className="h-4 w-4" />
          </a>

          <p className="text-xs text-[#8A5A3B] flex items-center justify-center gap-1.5 flex-wrap">
            <span>Dúvidas com o acesso? Fala com a gente no Instagram:</span>
            <a
              href="https://instagram.com/institutodosabor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#B84A24] hover:underline"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@institutodosabor</span>
            </a>
          </p>
        </div>

        {/* Garantia */}
        <div className="flex items-center justify-center gap-2 text-xs text-[#2E4A3B]/70 pt-2 border-t border-[#E5DCD0]">
          <ShieldCheck className="h-4 w-4 text-[#2E4A3B]" />
          <span>Garantia incondicional de 7 dias — sem perguntas, sem burocracia</span>
        </div>
      </div>
    </div>
  )
}

export default Obrigado
