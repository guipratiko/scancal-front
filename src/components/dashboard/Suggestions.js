import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Suggestions = () => {
  const [selectedCategory, setSelectedCategory] = useState('refrigerante');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    {
      id: 'refrigerante',
      title: 'Refrigerantes',
      description: 'Substitua por opções mais saudáveis',
      icon: '🥤',
      color: 'bg-red-50 border-red-200'
    },
    {
      id: 'frituras',
      title: 'Frituras',
      description: 'Alternativas mais nutritivas',
      icon: '🍟',
      color: 'bg-orange-50 border-orange-200'
    },
    {
      id: 'doces',
      title: 'Doces',
      description: 'Opções naturais e saudáveis',
      icon: '🍰',
      color: 'bg-pink-50 border-pink-200'
    }
  ];

  const fetchSuggestions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/food/suggestions/${selectedCategory}`);
      if (response.data.success) {
        setSuggestions(response.data.data.suggestions);
      }
    } catch (error) {
      console.error('Erro ao buscar sugestões:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  const getCategoryLabel = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.title : categoryId;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Sugestões Inteligentes 💡
          </h3>
          <p className="text-gray-600">
            Substitua alimentos menos saudáveis por opções mais nutritivas
          </p>
        </div>
      </div>

      {/* Category Selection */}
      <div className="card">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Escolha uma categoria</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                selectedCategory === category.id
                  ? `${category.color} border-2`
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h5 className="font-semibold text-gray-900 mb-2">{category.title}</h5>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Suggestions */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold text-gray-900">
            Alternativas para {getCategoryLabel(selectedCategory)}
          </h4>
          {loading && (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
          )}
        </div>

        {suggestions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="bg-green-50 border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <h5 className="font-semibold text-green-800 text-lg">
                    {suggestion.name}
                  </h5>
                  <div className="text-right">
                    <div className="font-bold text-green-600">
                      {suggestion.calories} kcal
                    </div>
                    <div className="text-xs text-green-600">por 100g</div>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded border border-green-100">
                  <div className="flex items-start">
                    <span className="text-green-600 mr-2">✨</span>
                    <p className="text-sm text-green-700">{suggestion.benefit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🔍</div>
            <p>Nenhuma sugestão encontrada</p>
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* General Tips */}
        <div className="card bg-blue-50 border-blue-200">
          <h4 className="text-lg font-semibold text-blue-800 mb-4">💡 Dicas Gerais</h4>
          
          <div className="space-y-3 text-blue-700">
            <div className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Substitua gradualmente os alimentos menos saudáveis</span>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Experimente novas receitas e sabores</span>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Planeje suas refeições com antecedência</span>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Mantenha opções saudáveis sempre disponíveis</span>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="card bg-green-50 border-green-200">
          <h4 className="text-lg font-semibold text-green-800 mb-4">🌟 Benefícios</h4>
          
          <div className="space-y-3 text-green-700">
            <div className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Melhora na qualidade nutricional</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Redução de calorias vazias</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Mais vitaminas e minerais</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Melhor digestão e bem-estar</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="card">
        <div className="text-center">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Pronto para fazer mudanças?
          </h4>
          <p className="text-gray-600 mb-6">
            Use a busca de alimentos para encontrar e registrar suas novas escolhas saudáveis
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-secondary">
              Buscar Alimentos Saudáveis
            </button>
            <button className="btn-primary">
              Ver Meu Diário
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
