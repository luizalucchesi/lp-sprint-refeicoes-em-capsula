import React from 'react'
import { Link } from 'react-router-dom'
import { Instagram, ArrowLeft } from 'lucide-react'

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="space-y-3">
    <h2 className="font-serif text-xl font-bold text-[#2E4A3B]">{title}</h2>
    <div className="space-y-2.5 text-sm leading-relaxed text-[#2E4A3B]/85">{children}</div>
  </section>
)

const PoliticaPrivacidade: React.FC = () => {
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
            Política de Privacidade
          </h1>
          <p className="text-xs sm:text-sm text-[#8A5A3B]">Última atualização: outubro de 2026</p>
        </header>

        <Section title="1. Quem somos">
          <p>
            O <strong>Instituto do Sabor</strong> é a iniciativa responsável pelo método e produto
            digital <strong>Refeições em Cápsula</strong>, atuando como controladora dos dados
            pessoais descritos nesta política.
          </p>
          <p>
            Para qualquer contato, dúvida ou solicitação sobre dados, nosso canal oficial é a página
            do Instagram:{' '}
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
        </Section>

        <Section title="2. Dados que coletamos">
          <p>
            Ao visitar nosso site ou adquirir o produto, podemos coletar as seguintes categorias de
            dados:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Dados de navegação e campanha:</strong> páginas visitadas, tempo de
              permanência, parâmetros de campanha (como UTMs, identificadores de anúncio e fbclid) e
              identificadores técnicos armazenados em cookies (incluindo <code>_fbp</code> e{' '}
              <code>_fbc</code> do Meta Pixel), utilizados para mensuração de tráfego e eficácia de
              comunicação publicitária.
            </li>
            <li>
              <strong>Dados de compra e transação:</strong> nome completo, e-mail, telefone, CPF e
              dados de pagamento coletados e processados de forma segura pela plataforma de checkout{' '}
              <strong>Kiwify</strong>. O Instituto do Sabor não armazena dados de cartão de crédito
              em seus próprios servidores.
            </li>
            <li>
              <strong>Dados de acesso ao material:</strong> e-mail cadastrado e credenciais de
              acesso à área de membros exclusiva hospedada na Kiwify.
            </li>
          </ul>
        </Section>

        <Section title="3. Como usamos os dados">
          <p>Tratamos os dados estritamente para as seguintes finalidades:</p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              Processar o pedido, validar o pagamento e liberar o acesso imediato ao conteúdo
              digital;
            </li>
            <li>
              Enviar comunicados essenciais sobre o produto, confirmação de pedido e instruções de
              uso da área de membros;
            </li>
            <li>
              Medir e aprimorar o desempenho das nossas páginas e campanhas de marketing através do
              Meta Pixel e da API de Conversões da Meta;
            </li>
            <li>
              Prestar suporte ao cliente e cumprir obrigações legais, regulatórias ou fiscais
              aplicáveis.
            </li>
          </ul>
        </Section>

        <Section title="4. Compartilhamento com terceiros">
          <p>
            Compartilhamos apenas os dados estritamente necessários com provedores de infraestrutura
            e serviços essenciais:
          </p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <strong>Kiwify:</strong> plataforma de checkout, processamento seguro de pagamentos e
              hospedagem da área de membros.
            </li>
            <li>
              <strong>Meta Platforms:</strong> mensuração e personalização de anúncios por meio de
              Meta Pixel e API de Conversões (servidor a servidor), utilizando cookies próprios de
              publicidade (<code>_fbp</code>/<code>_fbc</code>).
            </li>
            <li>
              <strong>Provedores de hospedagem e infraestrutura de entrega:</strong> para garantir a
              disponibilidade, segurança e velocidade de carregamento das páginas.
            </li>
          </ul>
          <p>
            Esses parceiros tratam os dados sob suas respectivas políticas de privacidade e padrões
            de segurança da informação.
          </p>
        </Section>

        <Section title="5. Cookies e publicidade">
          <p>
            Utilizamos cookies próprios e de terceiros para garantir o bom funcionamento do site,
            salvar parâmetros de navegação de campanhas e permitir a mensuração de desempenho
            publicitário junto à Meta Platforms.
          </p>
          <p>
            Você pode ajustar as permissões de cookies ou desativá-los diretamente nas configurações
            do seu navegador a qualquer momento. A recusa de certos cookies pode interferir em
            recursos específicos de rastreamento de ofertas.
          </p>
        </Section>

        <Section title="6. Seus direitos (LGPD)">
          <p>
            Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD), você
            possui o direito de solicitar a qualquer momento:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Confirmação da existência de tratamento e acesso aos dados;</li>
            <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
            <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</li>
            <li>
              Portabilidade dos dados a outro fornecedor, observados os segredos comercial e
              industrial;
            </li>
            <li>Revogação do consentimento concedido anteriormente.</li>
          </ul>
          <p>
            Para exercer qualquer um desses direitos, entre em contato enviando mensagem direta pelo
            canal oficial:{' '}
            <a
              href="https://instagram.com/institutodosabor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#B84A24] hover:underline"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@institutodosabor</span>
            </a>
            . Você também pode consultar o procedimento específico na página de{' '}
            <Link to="/exclusao-de-dados" className="font-semibold text-[#B84A24] underline">
              Exclusão de dados
            </Link>
            .
          </p>
        </Section>

        <Section title="7. Segurança">
          <p>
            Adotamos medidas técnicas, operacionais e organizacionais adequadas para proteger seus
            dados contra acessos não autorizados, perdas acidentais, destruição ou alterações
            indevidas, incluindo criptografia de tráfego via HTTPS e controle restrito de acessos
            aos sistemas de suporte.
          </p>
        </Section>

        <Section title="8. Retenção de dados">
          <p>
            Os dados pessoais são mantidos pelo período necessário para atender às finalidades
            informadas nesta política, cumprir prazos legais e fiscais obrigatórios e resguardar
            direitos em processos administrativos ou judiciais, sendo excluídos ou anonimizados após
            o término do prazo aplicável.
          </p>
        </Section>

        <Section title="9. Alterações desta política">
          <p>
            Esta política pode ser atualizada periodicamente para refletir mudanças em nossos
            processos ou adequações regulatórias. A data da versão mais recente estará sempre
            indicada no topo deste documento.
          </p>
        </Section>

        <div className="rounded-2xl border border-[#E5DCD0] bg-white p-6 text-sm text-[#2E4A3B]/85 space-y-2">
          <h3 className="font-serif font-bold text-base text-[#2E4A3B]">
            Canal de Suporte e Privacidade
          </h3>
          <p>
            Ficou com alguma dúvida sobre como seus dados são cuidados? Converse diretamente com a
            equipe do Instituto do Sabor pelo Instagram:{' '}
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

export default PoliticaPrivacidade
