import React from 'react'
import { Link } from 'react-router-dom'
import { Instagram, ArrowLeft } from 'lucide-react'

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="space-y-3">
    <h2 className="font-serif text-xl font-bold text-[#2E4A3B]">{title}</h2>
    <div className="space-y-2.5 text-sm leading-relaxed text-[#2E4A3B]/85">{children}</div>
  </section>
)

const ExclusaoDeDados: React.FC = () => {
  return (
    <div className="w-full bg-[#F7F1E7] min-h-screen text-[#2E4A3B]">
      <div className="mx-auto max-w-[720px] px-5 py-12 md:py-16 space-y-8">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8A5A3B] hover:text-[#2E4A3B] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar à página inicial</span>
          </Link>
          <span className="font-mono text-xs uppercase tracking-widest text-[#B84A24] font-semibold">
            Instituto do Sabor
          </span>
        </div>

        <header className="space-y-2 border-b border-[#E5DCD0] pb-6">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#B84A24]">
            Refeições em Cápsula
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2E4A3B] tracking-tight">
            Exclusão de Dados
          </h1>
          <p className="text-xs sm:text-sm text-[#8A5A3B]">Última atualização: outubro de 2026</p>
        </header>

        <div className="text-sm leading-relaxed text-[#2E4A3B]/85">
          <p>
            Você pode solicitar a eliminação dos seus dados pessoais tratados pelo{' '}
            <strong>Instituto do Sabor</strong> a qualquer momento, sem nenhum custo, nos termos da
            Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
          </p>
        </div>

        <Section title="1. Como solicitar a exclusão">
          <p>
            Para solicitar a exclusão dos seus dados, envie uma mensagem direta para a nossa página
            oficial no Instagram:{' '}
            <a
              href="https://instagram.com/institutodosabor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#B84A24] hover:underline"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@institutodosabor</span>
            </a>
            .
          </p>
          <p>
            Na sua mensagem, informe o <strong>e-mail cadastrado no momento da compra</strong> e o
            título <em>"Exclusão de Dados"</em>. Nossa equipe confirmará o recebimento e processará
            a solicitação em até 15 dias.
          </p>
        </Section>

        <Section title="2. O que é excluído">
          <ul className="list-disc space-y-1.5 pl-5">
            <li>Dados cadastrais de contato e histórico de relacionamento com a nossa equipe;</li>
            <li>
              Identificadores de navegação e registros analíticos internos que possam estar
              associados ao seu perfil;
            </li>
            <li>Inscrições em listas de comunicados ou mensagens informativas sobre o produto.</li>
          </ul>
        </Section>

        <Section title="3. O que é mantido por obrigação legal">
          <p>
            Determinadas informações não podem ser eliminadas de imediato por força de obrigações
            legais e regulatórias:
          </p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              Registros fiscais e comprovantes de emissão de notas fiscais, mantidos pelos prazos
              exigidos pela legislação tributária;
            </li>
            <li>
              Registros estritamente necessários para eventual defesa em processos judiciais ou
              administrativos, pelo tempo correspondente aos prazos prescricionais legais.
            </li>
          </ul>
        </Section>

        <Section title="4. Dados tratados por terceiros">
          <p>
            Os pagamentos do produto <strong>Refeições em Cápsula</strong> e o acesso à área de
            membros são processados pela plataforma <strong>Kiwify</strong>, e as ferramentas de
            mensuração utilizam serviços da <strong>Meta Platforms</strong>.
          </p>
          <p>
            Caso deseje a exclusão específica de dados mantidos nessas plataformas terceiras, você
            também pode solicitar diretamente a elas, ou nos informar via Instagram para que
            possamos orientar e encaminhar os pedidos que estiverem sob a nossa alçada de controle.
          </p>
        </Section>

        <div className="rounded-2xl border border-[#E5DCD0] bg-white p-6 text-sm text-[#2E4A3B]/85 space-y-2">
          <h3 className="font-serif font-bold text-base text-[#2E4A3B]">
            Precisa de ajuda com o seu pedido?
          </h3>
          <p>
            Estamos à disposição para esclarecer qualquer etapa do processo. Fale diretamente com o
            Instituto do Sabor pelo Instagram:{' '}
            <a
              href="https://instagram.com/institutodosabor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#B84A24] hover:underline"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@institutodosabor</span>
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default ExclusaoDeDados
