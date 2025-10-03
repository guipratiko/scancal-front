import React from 'react';
import { Link } from 'react-router-dom';

const TermsPage = () => {
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
            Termos de Uso
          </h1>
          <p className="text-xl text-gray-600">
            Última atualização: 1º de janeiro de 2025
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-8">
          
          {/* 1. Aceitação dos Termos */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Aceitação dos Termos</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Ao utilizar o ScanCal, você concorda em cumprir e estar vinculado a estes Termos de Uso. 
              Se você não concordar com qualquer parte destes termos, não deve usar nosso serviço.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Estes termos podem ser atualizados periodicamente. Recomendamos que você revise esta página 
              regularmente para se manter informado sobre eventuais alterações.
            </p>
          </section>

          {/* 2. Descrição do Serviço */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Descrição do Serviço</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              O ScanCal é um serviço de análise nutricional de alimentos que funciona através do WhatsApp. 
              Nossos serviços incluem:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Análise nutricional de alimentos através de fotos</li>
              <li>Informações sobre calorias, macronutrientes e micronutrientes</li>
              <li>Sugestões de alimentos mais saudáveis</li>
              <li>Diário alimentar e acompanhamento de progresso</li>
              <li>Metas nutricionais personalizadas</li>
            </ul>
          </section>

          {/* 3. Uso Adequado */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Uso Adequado do Serviço</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Você concorda em usar o ScanCal apenas para fins legítimos e de acordo com estes termos. 
              Você não deve:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Usar o serviço para atividades ilegais ou não autorizadas</li>
              <li>Interferir no funcionamento normal do serviço</li>
              <li>Tentar acessar áreas restritas do sistema</li>
              <li>Enviar conteúdo inadequado, ofensivo ou prejudicial</li>
              <li>Usar o serviço para spam ou comunicações não solicitadas</li>
            </ul>
          </section>

          {/* 4. Precisão das Informações */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Precisão das Informações</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Embora nos esforcemos para fornecer informações nutricionais precisas, os dados fornecidos 
              são apenas para fins informativos e educacionais. Você não deve usar essas informações como 
              substituto para aconselhamento médico, nutricional ou profissional.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Recomendamos sempre consultar um profissional de saúde qualificado antes de fazer 
              mudanças significativas em sua dieta ou estilo de vida.
            </p>
          </section>

          {/* 5. Planos e Pagamentos */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Planos de Assinatura e Pagamentos</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              O ScanCal oferece diferentes planos de assinatura:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li><strong>Plano Gratuito:</strong> 5 análises por dia por 24 horas</li>
              <li><strong>Plano Premium:</strong> Análises ilimitadas e funcionalidades avançadas</li>
              <li><strong>Plano Anual:</strong> Inclui consultoria nutricional e suporte VIP</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              Os pagamentos são processados de forma segura através de nossos parceiros de pagamento. 
              Você pode cancelar sua assinatura a qualquer momento através do WhatsApp ou email.
            </p>
          </section>

          {/* 6. Privacidade */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Privacidade e Proteção de Dados</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Levamos a proteção da sua privacidade muito a sério. Nossa Política de Privacidade 
              detalha como coletamos, usamos e protegemos suas informações pessoais.
            </p>
            <p className="text-gray-600 leading-relaxed">
              As fotos que você envia são processadas automaticamente e não são armazenadas permanentemente 
              em nossos servidores. Utilizamos apenas as informações necessárias para fornecer nossos serviços.
            </p>
          </section>

          {/* 7. Limitação de Responsabilidade */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitação de Responsabilidade</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              O ScanCal é fornecido "como está" e "conforme disponível". Não garantimos que o serviço 
              será ininterrupto, livre de erros ou atenderá às suas expectativas específicas.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Em nenhuma circunstância seremos responsáveis por danos diretos, indiretos, incidentais, 
              especiais ou consequenciais resultantes do uso ou incapacidade de usar nosso serviço.
            </p>
          </section>

          {/* 8. Modificações */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Modificações dos Termos</h2>
            <p className="text-gray-600 leading-relaxed">
              Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações 
              entrarão em vigor imediatamente após a publicação na plataforma. É sua responsabilidade 
              revisar periodicamente estes termos para se manter informado sobre eventuais mudanças.
            </p>
          </section>

          {/* 9. Contato */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contato</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700"><strong>Email:</strong> contato@scancal.com.br</p>
              <p className="text-gray-700"><strong>WhatsApp:</strong> +55 62 98448-536</p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default TermsPage;
