import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center">
              <img 
                src="/img/logo.png" 
                alt="ScanCal Logo" 
                className="h-12 rounded-lg"
              />
            </Link>
            
            <Link
              to="/"
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
            >
              Voltar ao Site
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Política de Privacidade
          </h1>
          <p className="text-xl text-gray-600">
            Última atualização: 1º de janeiro de 2025
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-8">
          
          {/* Introdução */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introdução</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Esta Política de Privacidade descreve como o ScanCal coleta, usa, armazena e protege suas 
              informações pessoais quando você utiliza nossos serviços. Estamos comprometidos em proteger 
              sua privacidade e garantir a segurança dos seus dados.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Esta política está em conformidade com a Lei Geral de Proteção de Dados (LGPD) do Brasil 
              e outras regulamentações aplicáveis de proteção de dados.
            </p>
          </section>

          {/* Informações Coletadas */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Informações que Coletamos</h2>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">1.1 Informações Fornecidas por Você</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li>Número de telefone do WhatsApp</li>
              <li>Nome (opcional)</li>
              <li>Fotos de alimentos para análise</li>
              <li>Informações de contato quando você nos contata</li>
              <li>Dados de pagamento (processados por terceiros seguros)</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">1.2 Informações Coletadas Automaticamente</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Data e hora das interações</li>
              <li>Histórico de análises realizadas</li>
              <li>Preferências de uso do serviço</li>
              <li>Informações de dispositivo e navegador (quando aplicável)</li>
            </ul>
          </section>

          {/* Como Usamos */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Como Usamos Suas Informações</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Utilizamos suas informações pessoais para os seguintes fins:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Fornecer análises nutricionais dos alimentos</li>
              <li>Manter seu diário alimentar e histórico</li>
              <li>Personalizar sugestões e recomendações</li>
              <li>Processar pagamentos e gerenciar assinaturas</li>
              <li>Fornecer suporte ao cliente</li>
              <li>Melhorar nossos serviços e desenvolver novos recursos</li>
              <li>Cumprir obrigações legais</li>
            </ul>
          </section>

          {/* Compartilhamento */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Compartilhamento de Informações</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto nas 
              seguintes circunstâncias:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li><strong>Prestadores de serviços:</strong> Parceiros confiáveis que nos ajudam a operar nosso serviço</li>
              <li><strong>Processadores de pagamento:</strong> Para processar transações de forma segura</li>
              <li><strong>Obrigação legal:</strong> Quando exigido por lei ou autoridades competentes</li>
              <li><strong>Proteção de direitos:</strong> Para proteger nossos direitos, propriedade ou segurança</li>
              <li><strong>Consentimento:</strong> Com seu consentimento explícito</li>
            </ul>
          </section>

          {/* Armazenamento */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Armazenamento e Segurança</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger 
              suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Criptografia de dados em trânsito e em repouso</li>
              <li>Acesso restrito às informações pessoais</li>
              <li>Monitoramento regular de segurança</li>
              <li>Backup seguro dos dados</li>
              <li>Treinamento de funcionários em proteção de dados</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              <strong>Importante:</strong> As fotos que você envia são processadas automaticamente e 
              não são armazenadas permanentemente em nossos servidores.
            </p>
          </section>

          {/* Seus Direitos */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Seus Direitos</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              De acordo com a LGPD, você tem os seguintes direitos em relação aos seus dados pessoais:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li><strong>Acesso:</strong> Solicitar informações sobre os dados que temos sobre você</li>
              <li><strong>Correção:</strong> Solicitar correção de dados incorretos ou incompletos</li>
              <li><strong>Exclusão:</strong> Solicitar a exclusão de seus dados pessoais</li>
              <li><strong>Portabilidade:</strong> Solicitar uma cópia dos seus dados em formato legível</li>
              <li><strong>Oposição:</strong> Opor-se ao processamento dos seus dados</li>
              <li><strong>Revogação:</strong> Revogar o consentimento a qualquer momento</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              Para exercer qualquer um desses direitos, entre em contato conosco através dos canais 
              indicados na seção "Contato".
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies e Tecnologias Similares</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Utilizamos cookies e tecnologias similares para melhorar sua experiência e analisar 
              o uso de nossos serviços. Você pode configurar seu navegador para recusar cookies, 
              mas isso pode afetar a funcionalidade do serviço.
            </p>
          </section>

          {/* Retenção */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Retenção de Dados</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os 
              propósitos descritos nesta política, a menos que um período de retenção mais longo 
              seja exigido ou permitido por lei.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Dados de conta ativa: Durante a duração da conta</li>
              <li>Dados de pagamento: Conforme exigido por regulamentações financeiras</li>
              <li>Dados de comunicação: 2 anos após a última interação</li>
              <li>Dados de análise nutricional: 1 ano após a última análise</li>
            </ul>
          </section>

          {/* Menores */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Proteção de Menores</h2>
            <p className="text-gray-600 leading-relaxed">
              Nossos serviços não são direcionados a menores de 13 anos. Não coletamos 
              intencionalmente informações pessoais de menores de 13 anos. Se tomarmos 
              conhecimento de que coletamos dados de um menor, tomaremos medidas para 
              excluir essas informações.
            </p>
          </section>

          {/* Alterações */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Alterações nesta Política</h2>
            <p className="text-gray-600 leading-relaxed">
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos 
              sobre mudanças significativas através do WhatsApp ou email. Recomendamos que 
              você revise esta política regularmente para se manter informado sobre como 
              protegemos suas informações.
            </p>
          </section>

          {/* Contato */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contato</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos 
              seus dados pessoais, entre em contato conosco:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700"><strong>Email:</strong> contato@scancal.com.br</p>
              <p className="text-gray-700"><strong>WhatsApp:</strong> +55 62 98448-536</p>
              <p className="text-gray-700"><strong>Endereço:</strong> Brasil</p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default PrivacyPage;
