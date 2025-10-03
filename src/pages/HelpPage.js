import React from 'react';
import { Link } from 'react-router-dom';

const HelpPage = () => {
  const faqs = [
    {
      question: "Como funciona o ScanCal?",
      answer: "O ScanCal funciona via WhatsApp. Basta enviar uma foto do seu alimento para nosso número e você receberá instantaneamente informações nutricionais detalhadas, incluindo calorias, macronutrientes e sugestões saudáveis."
    },
    {
      question: "Preciso baixar algum aplicativo?",
      answer: "Não! O ScanCal funciona completamente via WhatsApp. Não é necessário baixar aplicativos ou criar contas complexas. Tudo acontece na conversa do WhatsApp."
    },
    {
      question: "Qual o número do WhatsApp do ScanCal?",
      answer: "Você pode acessar o ScanCal através do número +55 62 98448-536. Adicione este número aos seus contatos e inicie uma conversa enviando uma foto de qualquer alimento."
    },
    {
      question: "Quais tipos de alimentos posso analisar?",
      answer: "Nosso sistema pode analisar praticamente qualquer tipo de alimento: frutas, verduras, carnes, grãos, laticínios, pratos prontos, sobremesas e muito mais. Temos uma base de dados com mais de 10.000 alimentos."
    },
    {
      question: "Como funciona o plano gratuito de 24h?",
      answer: "O plano gratuito permite 5 análises de alimentos por dia durante 24 horas após o primeiro uso. Após esse período, você pode renovar gratuitamente ou fazer upgrade para o plano Premium."
    },
    {
      question: "Como faço upgrade para o plano Premium?",
      answer: "Para fazer upgrade, envie uma mensagem no WhatsApp solicitando o plano Premium. Nossa equipe entrará em contato com as informações de pagamento e ativação do plano."
    },
    {
      question: "Os dados nutricionais são precisos?",
      answer: "Sim! Nossos dados são baseados em tabelas nutricionais oficiais e constantemente atualizados. Temos 99% de precisão nas análises nutricionais."
    },
    {
      question: "Como posso acompanhar meu progresso?",
      answer: "O ScanCal mantém um histórico completo das suas análises. Você pode solicitar relatórios diários, semanais ou mensais através do WhatsApp, incluindo gráficos de evolução."
    }
  ];

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
            Central de Ajuda
          </h1>
          <p className="text-xl text-gray-600">
            Encontre respostas para suas dúvidas sobre o ScanCal
          </p>
        </div>

        {/* Quick Start */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🚀 Como Começar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">1. Adicione o WhatsApp</h3>
              <p className="text-gray-600 text-sm">Adicione +55 62 98448-536 aos seus contatos</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📸</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">2. Envie uma Foto</h3>
              <p className="text-gray-600 text-sm">Tire uma foto do alimento que deseja analisar</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">3. Receba a Análise</h3>
              <p className="text-gray-600 text-sm">Obtenha informações nutricionais instantâneas</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">❓ Perguntas Frequentes</h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 mt-12 text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Ainda tem dúvidas?
          </h2>
          <p className="text-green-700 mb-6">
            Nossa equipe de suporte está sempre disponível para ajudar você
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/556298448536"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
            >
              💬 WhatsApp Suporte
            </a>
            <a
              href="mailto:contato@scancal.com.br"
              className="bg-white text-green-600 border border-green-600 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors duration-200"
            >
              📧 Email Suporte
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HelpPage;
