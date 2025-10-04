import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const [selectedFeature, setSelectedFeature] = useState(null);

  // Smooth scroll effect
  useEffect(() => {
    const handleSmoothScroll = (e) => {
      if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  const features = [
    {
      icon: '🔍',
      title: 'Busca Inteligente',
      description: 'Encontre informações nutricionais de milhares de alimentos',
      details: {
        title: 'Busca Inteligente de Alimentos',
        content: 'Nossa tecnologia de busca avançada permite encontrar informações nutricionais precisas de mais de 10.000 alimentos cadastrados em nossa base de dados. Basta digitar o nome do alimento e receber instantaneamente:',
        features: [
          'Informações calóricas detalhadas',
          'Macronutrientes (proteínas, carboidratos, gorduras)',
          'Micronutrientes essenciais',
          'Valores por 100g e por porção',
          'Comparação com outros alimentos similares'
        ],
        benefit: 'Economize tempo pesquisando e tenha certeza dos dados nutricionais corretos para suas refeições.'
      }
    },
    {
      icon: '⚖️',
      title: 'Estimativa por Porção',
      description: 'Calcule valores nutricionais baseados na quantidade exata',
      details: {
        title: 'Cálculo Preciso por Porção',
        content: 'Não mais estimativas imprecisas! Nosso sistema calcula automaticamente os valores nutricionais baseados na quantidade exata que você consome. Simplesmente informe:',
        features: [
          'Peso ou volume do alimento',
          'Unidade de medida (gramas, ml, unidades)',
          'Cálculo instantâneo de calorias e macros',
          'Ajuste automático para diferentes porções',
          'Histórico de porções consumidas'
        ],
        benefit: 'Controle exato da sua ingestão calórica e nutricional para resultados mais precisos.'
      }
    },
    {
      icon: '🥗',
      title: 'Sugestões Saudáveis',
      description: 'Receba alternativas mais nutritivas para seus alimentos',
      details: {
        title: 'Sugestões Inteligentes de Substituição',
        content: 'Transforme sua alimentação com sugestões personalizadas de alimentos mais saudáveis. Nosso algoritmo analisa seus hábitos e oferece:',
        features: [
          'Alternativas com menos calorias',
          'Opções com mais proteínas',
          'Substituições por alimentos integrais',
          'Sugestões sazonais e regionais',
          'Receitas com ingredientes saudáveis'
        ],
        benefit: 'Faça escolhas mais inteligentes sem abrir mão do sabor e variedade.'
      }
    },
    {
      icon: '📅',
      title: 'Diário Automático',
      description: 'Registre sua alimentação e acompanhe seu progresso',
      details: {
        title: 'Diário Alimentar Automático',
        content: 'Mantenha um registro completo e organizado da sua alimentação. Nosso diário inteligente oferece:',
        features: [
          'Registro automático via WhatsApp',
          'Organização por refeições (café, almoço, jantar, lanches)',
          'Gráficos de evolução semanal e mensal',
          'Alertas de metas diárias',
          'Exportação de relatórios detalhados'
        ],
        benefit: 'Tenha controle total sobre sua alimentação e visualize seu progresso de forma clara e motivadora.'
      }
    },
    {
      icon: '🎯',
      title: 'Metas Personalizadas',
      description: 'Defina objetivos e receba orientações personalizadas',
      details: {
        title: 'Metas e Objetivos Personalizados',
        content: 'Configure suas metas nutricionais e receba orientações personalizadas para alcançá-las. Defina:',
        features: [
          'Objetivo de peso (emagrecer, ganhar massa, manter)',
          'Meta calórica diária personalizada',
          'Distribuição ideal de macronutrientes',
          'Lembretes e alertas personalizados',
          'Acompanhamento de progresso detalhado'
        ],
        benefit: 'Alcance seus objetivos com orientação personalizada e acompanhamento constante.'
      }
    },
    {
      icon: '💬',
      title: 'WhatsApp Integration',
      description: 'Funciona via WhatsApp sem necessidade de baixar apps',
      details: {
        title: 'Integração Completa com WhatsApp',
        content: 'Acesse todas as funcionalidades do ScanCal diretamente pelo WhatsApp. Não precisa baixar aplicativos ou criar contas complexas:',
        features: [
          'Envie fotos de alimentos via WhatsApp',
          'Receba análises instantâneas',
          'Acesso ao seu diário alimentar',
          'Configuração de metas e lembretes',
          'Suporte ao cliente via chat'
        ],
        benefit: 'Simplicidade e praticidade: tudo que você precisa em um lugar que já usa todos os dias.'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Banner with Header */}
      <section className="relative">
        {/* Desktop Banner */}
        <div className="relative h-screen bg-cover bg-center bg-no-repeat hidden md:block" style={{backgroundImage: 'url(/img/banner.png)'}}>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          
          {/* Header Menu */}
          <header className="relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center">
                  <img 
                    src="/img/logo.png" 
                    alt="ScanCal Logo" 
                    className="h-12 rounded-lg"
                  />
                </div>
                
                 <div className="flex items-center space-x-4">
                   {/* Navigation Links */}
                   <nav className="hidden md:flex items-center space-x-6">
                     <a href="#funcionalidades" className="text-white hover:text-green-300 transition-colors duration-200">
                       Funcionalidades
                     </a>
                     <a href="#como-funciona" className="text-white hover:text-green-300 transition-colors duration-200">
                       Como Funciona
                     </a>
                     <a href="#avaliacoes" className="text-white hover:text-green-300 transition-colors duration-200">
                       Avaliações
                     </a>
                     <a href="#precos" className="text-white hover:text-green-300 transition-colors duration-200">
                       Preços
                     </a>
                   </nav>
                   
                   {isAuthenticated ? (
                     <Link
                       to="/dashboard"
                       className="bg-white text-green-600 px-6 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors duration-200"
                     >
                       Dashboard
                     </Link>
                   ) : (
                     <div className="flex items-center space-x-3">
                       <Link
                         to="/login"
                         className="text-white hover:text-green-300 transition-colors duration-200"
                       >
                         Entrar
                       </Link>
                       <Link
                         to="/register"
                         className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
                       >
                         Cadastrar
                       </Link>
                     </div>
                   )}
                 </div>
              </div>
            </div>
          </header>
          
          {/* Hero Content */}
          <div className="relative z-10 flex items-center h-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  Transforme sua 
                  <span className="text-green-400"> alimentação</span>
                </h1>
                <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                  Análise nutricional instantânea via WhatsApp. Descubra calorias, 
                  macros e receba sugestões saudáveis em segundos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/register"
                    className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors duration-200 text-center"
                  >
                    Começar Agora
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Banner */}
        <div className="relative h-screen bg-cover bg-center bg-no-repeat md:hidden" style={{backgroundImage: 'url(/img/Banne-smarth.png)'}}>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          
          {/* Header Menu */}
          <header className="relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center">
                  <img 
                    src="/img/logo.png" 
                    alt="ScanCal Logo" 
                    className="h-12 rounded-lg"
                  />
                </div>
                
                 <div className="flex items-center space-x-4">
                   {/* Navigation Links */}
                   <nav className="hidden md:flex items-center space-x-6">
                     <a href="#funcionalidades" className="text-white hover:text-green-300 transition-colors duration-200">
                       Funcionalidades
                     </a>
                     <a href="#como-funciona" className="text-white hover:text-green-300 transition-colors duration-200">
                       Como Funciona
                     </a>
                     <a href="#avaliacoes" className="text-white hover:text-green-300 transition-colors duration-200">
                       Avaliações
                     </a>
                     <a href="#precos" className="text-white hover:text-green-300 transition-colors duration-200">
                       Preços
                     </a>
                   </nav>
                   
                   {isAuthenticated ? (
                     <Link
                       to="/dashboard"
                       className="bg-white text-green-600 px-6 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors duration-200"
                     >
                       Dashboard
                     </Link>
                   ) : (
                     <>
                       <Link
                         to="/login"
                         className="text-white hover:text-green-300 transition-colors duration-200"
                       >
                         Entrar
                       </Link>
                       <Link
                         to="/register"
                         className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
                       >
                         Criar Conta
                       </Link>
                     </>
                   )}
                 </div>
              </div>
            </div>
          </header>

          {/* Hero Content */}
          <div className="relative z-10 flex items-center min-h-screen">
            <div className="w-full">
              <div className="flex items-center justify-start">
                <div className="max-w-2xl text-left pl-4 sm:pl-6 lg:pl-8">
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 fade-in">
                    Controle sua alimentação de forma
                    <span className="block text-green-300">inteligente</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-green-100 mb-8 fade-in">
                    ScanCal é o app que revoluciona como você monitora sua nutrição. 
                    Busque, calcule e registre tudo de forma simples e eficiente.
                  </p>
                  <div className="fade-in">
                    <Link
                      to={isAuthenticated ? "/dashboard" : "/register"}
                      className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-all duration-300 shadow-lg"
                    >
                      Começar Agora
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


       {/* Features Section */}
       <section id="funcionalidades" className="py-24" style={{backgroundColor: '#F9FAFB'}}>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-20">
             <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
               ✨ Funcionalidades Premium
             </div>
             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
               Tudo que você precisa para
               <span className="block text-green-600">transformar sua alimentação</span>
             </h2>
             <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
               Descubra como o ScanCal revoluciona sua relação com a comida através de tecnologia inteligente e WhatsApp
             </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
             {features.map((feature, index) => (
               <div 
                 key={index} 
                 className="group relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ease-out"
                 style={{
                   animationDelay: `${index * 100}ms`
                 }}
               >
                 {/* Gradient border on hover */}
                 <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                 
                 <div className="relative z-10">
                   {/* Icon with background */}
                   <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                     <span className="text-2xl">{feature.icon}</span>
                   </div>
                   
                   <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">
                     {feature.title}
                   </h3>
                   
                   <p className="text-gray-600 leading-relaxed">
                     {feature.description}
                   </p>
                   
                   {/* Arrow indicator */}
                   <button 
                     onClick={() => setSelectedFeature(feature)}
                     className="mt-6 flex items-center text-green-600 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-green-700"
                   >
                     <span className="text-sm">Saiba mais</span>
                     <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                     </svg>
                   </button>
                 </div>
               </div>
             ))}
           </div>

           {/* Stats section */}
           <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
             <div className="text-center">
               <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">1000+</div>
               <div className="text-gray-600">Alimentos cadastrados</div>
             </div>
             <div className="text-center">
               <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">99%</div>
               <div className="text-gray-600">Precisão nas análises</div>
             </div>
             <div className="text-center">
               <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">24/7</div>
               <div className="text-gray-600">Disponível sempre</div>
             </div>
             <div className="text-center">
               <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">5★</div>
               <div className="text-gray-600">Avaliação dos usuários</div>
             </div>
           </div>
         </div>
       </section>

       {/* How It Works Section */}
       <section id="como-funciona" className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
               Como funciona o ScanCal?
             </h2>
             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
               Simples, rápido e eficiente. Em apenas 3 passos você terá controle total da sua alimentação
             </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
             <div className="text-center">
               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                 <span className="text-3xl">📱</span>
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-4">1. Acesse via WhatsApp</h3>
               <p className="text-gray-600">
                 Envie uma foto do seu alimento pelo WhatsApp. Não precisa baixar nenhum app!
               </p>
             </div>
             <div className="text-center">
               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                 <span className="text-3xl">🤖</span>
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-4">2. IA Analisa</h3>
               <p className="text-gray-600">
                 Nossa inteligência artificial identifica o alimento e calcula as informações nutricionais
               </p>
             </div>
             <div className="text-center">
               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                 <span className="text-3xl">📊</span>
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-4">3. Receba os Resultados</h3>
               <p className="text-gray-600">
                 Obtenha calorias, macros, sugestões saudáveis e acompanhe seu progresso
               </p>
             </div>
           </div>
         </div>
       </section>

       {/* Google Reviews Section */}
       <section id="avaliacoes" className="py-24 bg-gray-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
               O que nossos usuários dizem
             </h2>
             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
               Mais de 10.000 usuários já transformaram sua alimentação com o ScanCal
             </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
               <div className="flex items-center mb-4">
                 <div className="flex text-yellow-400">
                   {[...Array(5)].map((_, i) => (
                     <span key={i}>⭐</span>
                   ))}
                 </div>
               </div>
               <p className="text-gray-600 mb-4">
                 "Incrível! Finalmente um app que funciona pelo WhatsApp. Muito prático e preciso nas análises."
               </p>
               <div className="flex items-center">
                 <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                   <span className="text-green-600 font-bold">M</span>
                 </div>
                 <div>
                   <div className="font-semibold text-gray-900">Maria Silva</div>
                   <div className="text-sm text-gray-500">via Google</div>
                 </div>
               </div>
             </div>

             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
               <div className="flex items-center mb-4">
                 <div className="flex text-yellow-400">
                   {[...Array(5)].map((_, i) => (
                     <span key={i}>⭐</span>
                   ))}
                 </div>
               </div>
               <p className="text-gray-600 mb-4">
                 "Revolucionou minha dieta! As sugestões de substituição são perfeitas e me ajudaram muito."
               </p>
               <div className="flex items-center">
                 <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                   <span className="text-blue-600 font-bold">J</span>
                 </div>
                 <div>
                   <div className="font-semibold text-gray-900">João Santos</div>
                   <div className="text-sm text-gray-500">via Google</div>
                 </div>
               </div>
             </div>

             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
               <div className="flex items-center mb-4">
                 <div className="flex text-yellow-400">
                   {[...Array(5)].map((_, i) => (
                     <span key={i}>⭐</span>
                   ))}
                 </div>
               </div>
               <p className="text-gray-600 mb-4">
                 "Interface simples e resultados precisos. Recomendo para quem quer cuidar da alimentação."
               </p>
               <div className="flex items-center">
                 <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                   <span className="text-purple-600 font-bold">A</span>
                 </div>
                 <div>
                   <div className="font-semibold text-gray-900">Ana Costa</div>
                   <div className="text-sm text-gray-500">via Google</div>
                 </div>
               </div>
             </div>
           </div>

           <div className="text-center mt-12">
             <div className="inline-flex items-center bg-white px-6 py-3 rounded-full shadow-sm border border-gray-100">
               <div className="h-8 w-24 bg-blue-600 rounded text-white flex items-center justify-center text-sm font-medium mr-3">
                 Google
               </div>
               <div className="text-left">
                 <div className="text-2xl font-bold text-gray-900">4.9</div>
                 <div className="text-sm text-gray-500">Avaliação média</div>
               </div>
               <div className="ml-4 flex text-yellow-400">
                 {[...Array(5)].map((_, i) => (
                   <span key={i}>⭐</span>
                 ))}
               </div>
             </div>
           </div>
         </div>
       </section>

       {/* Pricing Section */}
       <section id="precos" className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
               Planos que cabem no seu bolso
             </h2>
             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
               Comece grátis e escolha o plano ideal para seus objetivos
             </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center">
               <h3 className="text-xl font-bold text-gray-900 mb-4">Gratuito</h3>
               <div className="text-4xl font-bold text-gray-900 mb-2">R$ 0</div>
               <div className="text-gray-500 mb-6">Por 24h</div>
               <ul className="text-left space-y-3 mb-8">
                 <li className="flex items-center">
                   <span className="text-green-500 mr-2">✓</span>
                   <span className="text-gray-600">5 análises</span>
                 </li>
                 <li className="flex items-center">
                   <span className="text-green-500 mr-2">✓</span>
                   <span className="text-gray-600">Informações básicas</span>
                 </li>
                 <li className="flex items-center">
                   <span className="text-green-500 mr-2">✓</span>
                   <span className="text-gray-600">Suporte via WhatsApp</span>
                 </li>
               </ul>
               <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200">
                 Começar Grátis
               </button>
             </div>

             <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-green-500 text-center relative">
               <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                 <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                   Mais Popular
                 </span>
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-4">Premium</h3>
               <div className="text-4xl font-bold text-gray-900 mb-2">R$ 19,90</div>
               <div className="text-gray-500 mb-6">por mês</div>
               <ul className="text-left space-y-3 mb-8">
                 <li className="flex items-center">
                   <span className="text-green-500 mr-2">✓</span>
                   <span className="text-gray-600">Análises ilimitadas</span>
                 </li>
                 <li className="flex items-center">
                   <span className="text-green-500 mr-2">✓</span>
                   <span className="text-gray-600">Relatórios detalhados</span>
                 </li>
                 <li className="flex items-center">
                   <span className="text-green-500 mr-2">✓</span>
                   <span className="text-gray-600">Sugestões personalizadas</span>
                 </li>
                 <li className="flex items-center">
                   <span className="text-green-500 mr-2">✓</span>
                   <span className="text-gray-600">Suporte prioritário</span>
                 </li>
               </ul>
               <button className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors duration-200">
                 Assinar Premium
               </button>
             </div>

             <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center">
               <h3 className="text-xl font-bold text-gray-900 mb-4">Anual</h3>
               <div className="text-4xl font-bold text-gray-900 mb-2">R$ 199</div>
               <div className="text-gray-500 mb-6">por ano</div>
               <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-6 inline-block">
                 Economize 17%
               </div>
               <ul className="text-left space-y-3 mb-8">
                 <li className="flex items-center">
                   <span className="text-green-500 mr-2">✓</span>
                   <span className="text-gray-600">Tudo do Premium</span>
                 </li>
                 <li className="flex items-center">
                   <span className="text-green-500 mr-2">✓</span>
                   <span className="text-gray-600">Consultoria nutricional</span>
                 </li>
                 <li className="flex items-center">
                   <span className="text-green-500 mr-2">✓</span>
                   <span className="text-gray-600">Planos de refeição</span>
                 </li>
                 <li className="flex items-center">
                   <span className="text-green-500 mr-2">✓</span>
                   <span className="text-gray-600">Suporte VIP</span>
                 </li>
               </ul>
               <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200">
                 Assinar Anual
               </button>
             </div>
           </div>
         </div>
       </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Pronto para transformar sua alimentação?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Junte-se a milhares de pessoas que já descobriram uma forma mais saudável de viver
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={isAuthenticated ? "/dashboard" : "/register"}
              className="btn-secondary text-lg px-8 py-4"
            >
              Começar Gratuitamente
            </Link>
            <Link
              to="/login"
              className="btn-primary text-lg px-8 py-4"
            >
              Já tenho conta
            </Link>
          </div>
        </div>
      </section>

       {/* Footer */}
       <footer className="bg-gray-900 text-white py-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
             {/* Logo and Description */}
             <div className="md:col-span-2">
               <div className="flex items-center mb-4">
                 <img 
                   src="/img/logo.png" 
                   alt="ScanCal Logo" 
                   className="h-10 rounded-lg"
                 />
               </div>
               <p className="text-gray-400 mb-4 max-w-md">
                 Transforme sua alimentação de forma inteligente através do WhatsApp. 
                 Análise nutricional instantânea e sugestões personalizadas.
               </p>
               <div className="flex space-x-4">
                 <a href="https://wa.me/556298448536" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                   📱 WhatsApp
                 </a>
                 <a href="mailto:contato@scancal.com.br" className="text-gray-400 hover:text-white transition-colors duration-200">
                   📧 Email
                 </a>
               </div>
             </div>

             {/* Navigation */}
             <div>
               <h3 className="font-semibold text-white mb-4">Navegação</h3>
               <ul className="space-y-2">
                 <li><a href="#funcionalidades" className="text-gray-400 hover:text-white transition-colors duration-200">Funcionalidades</a></li>
                 <li><a href="#como-funciona" className="text-gray-400 hover:text-white transition-colors duration-200">Como Funciona</a></li>
                 <li><a href="#avaliacoes" className="text-gray-400 hover:text-white transition-colors duration-200">Avaliações</a></li>
                 <li><a href="#precos" className="text-gray-400 hover:text-white transition-colors duration-200">Preços</a></li>
               </ul>
             </div>

             {/* Support */}
             <div>
               <h3 className="font-semibold text-white mb-4">Suporte</h3>
               <ul className="space-y-2">
                 <li><Link to="/help" className="text-gray-400 hover:text-white transition-colors duration-200">Central de Ajuda</Link></li>
                 <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">Contato</Link></li>
                 <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">Termos de Uso</Link></li>
                 <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">Privacidade</Link></li>
               </ul>
             </div>
          </div>

          {/* Clerky Integration */}
          <div className="border-t border-gray-800 pt-8 pb-4">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
              <span className="text-gray-400 text-sm">Powered by</span>
              <a 
                href="https://www.clerky.com.br" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
              >
                <img 
                  src="/img/clerky.png" 
                  alt="Clerky - Plataforma de Integração WhatsApp" 
                  className="h-6"
                />
                <span className="text-gray-400 text-sm">
                  ScanCal usa a plataforma Clerky como integração de WhatsApp
                </span>
              </a>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
             <div className="text-center md:text-left">
               <p className="text-gray-400">
                 © 2025 ScanCal. Todos os direitos reservados.
               </p>
               <p className="text-gray-500 text-sm mt-1">
                 Transformando vidas através da alimentação consciente
               </p>
             </div>
             
             <div className="flex items-center mt-4 md:mt-0">
               <span className="text-gray-500 text-sm mr-2">Desenvolvido</span>
               <a 
                 href="https://wa.me/556298448536" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-green-600 hover:text-green-700 font-medium text-sm transition-colors duration-200"
               >
                 GuiP.DeV
               </a>
             </div>
           </div>
         </div>
       </footer>

       {/* Feature Details Modal */}
       {selectedFeature && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedFeature(null)}>
           <div 
             className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
             onClick={(e) => e.stopPropagation()}
           >
             {/* Modal Header */}
             <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
               <div className="flex items-center justify-between">
                 <div className="flex items-center">
                   <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mr-4">
                     <span className="text-2xl">{selectedFeature.icon}</span>
                   </div>
                   <h2 className="text-xl font-bold text-gray-900">{selectedFeature.details.title}</h2>
                 </div>
                 <button 
                   onClick={() => setSelectedFeature(null)}
                   className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                 >
                   <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                   </svg>
                 </button>
               </div>
             </div>

             {/* Modal Content */}
             <div className="px-6 py-6">
               <p className="text-gray-600 mb-6 leading-relaxed">
                 {selectedFeature.details.content}
               </p>

               {/* Features List */}
               <div className="mb-6">
                 <h3 className="font-semibold text-gray-900 mb-4">Principais funcionalidades:</h3>
                 <ul className="space-y-3">
                   {selectedFeature.details.features.map((feature, index) => (
                     <li key={index} className="flex items-start">
                       <span className="text-green-500 mr-3 mt-0.5">✓</span>
                       <span className="text-gray-600">{feature}</span>
                     </li>
                   ))}
                 </ul>
               </div>

               {/* Benefit */}
               <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                 <div className="flex items-start">
                   <span className="text-green-600 mr-3 mt-0.5">💡</span>
                   <div>
                     <h4 className="font-semibold text-green-800 mb-1">Benefício:</h4>
                     <p className="text-green-700">{selectedFeature.details.benefit}</p>
                   </div>
                 </div>
               </div>

               {/* Action Button */}
               <div className="mt-6 flex flex-col sm:flex-row gap-3">
                 <Link
                   to={isAuthenticated ? "/dashboard" : "/register"}
                   className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 text-center"
                 >
                   {isAuthenticated ? "Usar Agora" : "Experimentar Grátis"}
                 </Link>
                 <button 
                   onClick={() => setSelectedFeature(null)}
                   className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                 >
                   Fechar
                 </button>
               </div>
             </div>
           </div>
         </div>
       )}
    </div>
  );
};

export default LandingPage;
