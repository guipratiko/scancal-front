import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const Goals = ({ user, onUpdate }) => {
  const { updateUser } = useAuth();
  const [preferences, setPreferences] = useState({
    goal: user?.preferences?.goal || 'maintain_weight',
    dailyCalories: user?.preferences?.dailyCalories || 2000
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const goals = [
    {
      id: 'lose_weight',
      title: 'Emagrecer',
      description: 'Perder peso de forma saudável',
      icon: '📉',
      color: 'bg-red-50 border-red-200',
      textColor: 'text-red-800',
      recommendedCalories: 1500
    },
    {
      id: 'gain_mass',
      title: 'Ganhar Massa',
      description: 'Aumentar massa muscular',
      icon: '💪',
      color: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-800',
      recommendedCalories: 2500
    },
    {
      id: 'maintain_weight',
      title: 'Manter Peso',
      description: 'Manter o peso atual',
      icon: '⚖️',
      color: 'bg-green-50 border-green-200',
      textColor: 'text-green-800',
      recommendedCalories: 2000
    }
  ];

  const handleGoalChange = (goalId) => {
    const selectedGoal = goals.find(g => g.id === goalId);
    setPreferences({
      goal: goalId,
      dailyCalories: selectedGoal?.recommendedCalories || preferences.dailyCalories
    });
  };

  const handleCaloriesChange = (calories) => {
    setPreferences({
      ...preferences,
      dailyCalories: parseInt(calories) || 0
    });
  };

  const savePreferences = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/auth/preferences`, {
        goal: preferences.goal,
        dailyCalories: preferences.dailyCalories
      });

      if (response.data.success) {
        updateUser(response.data.data.user);
        setMessage('Metas atualizadas com sucesso!');
        onUpdate && onUpdate();
        
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Erro ao salvar preferências:', error);
      setMessage('Erro ao salvar metas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const selectedGoal = goals.find(g => g.id === preferences.goal);

  return (
    <div className="space-y-6">
      {/* Current Goals */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Suas Metas Atuais</h3>
        
        {selectedGoal && (
          <div className={`p-4 rounded-lg border ${selectedGoal.color} ${selectedGoal.textColor}`}>
            <div className="flex items-center">
              <span className="text-3xl mr-4">{selectedGoal.icon}</span>
              <div>
                <h4 className="font-semibold text-lg">{selectedGoal.title}</h4>
                <p className="text-sm opacity-80">{selectedGoal.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Goal Selection */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Escolha seu Objetivo</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {goals.map((goal) => (
            <div
              key={goal.id}
              onClick={() => handleGoalChange(goal.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                preferences.goal === goal.id
                  ? `${goal.color} ${goal.textColor} border-2`
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="text-4xl mb-3">{goal.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{goal.title}</h4>
                <p className="text-sm text-gray-600">{goal.description}</p>
                <div className="mt-3 text-xs text-gray-500">
                  ~{goal.recommendedCalories} kcal/dia
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calorie Target */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Meta de Calorias Diárias</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantidade de calorias por dia
            </label>
            <input
              type="number"
              value={preferences.dailyCalories}
              onChange={(e) => handleCaloriesChange(e.target.value)}
              className="input-field w-full md:w-64"
              min="800"
              max="4000"
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Distribuição Recomendada:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium text-green-600">Proteínas</div>
                <div>{(preferences.dailyCalories * 0.15 / 4).toFixed(0)}g</div>
                <div className="text-xs text-gray-500">15% das calorias</div>
              </div>
              <div>
                <div className="font-medium text-yellow-600">Carboidratos</div>
                <div>{(preferences.dailyCalories * 0.55 / 4).toFixed(0)}g</div>
                <div className="text-xs text-gray-500">55% das calorias</div>
              </div>
              <div>
                <div className="font-medium text-red-600">Gorduras</div>
                <div>{(preferences.dailyCalories * 0.25 / 9).toFixed(0)}g</div>
                <div className="text-xs text-gray-500">25% das calorias</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">💡 Dicas para Alcançar sua Meta</h3>
        
        <div className="space-y-3 text-blue-700">
          {preferences.goal === 'lose_weight' && (
            <>
              <div className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Crie um déficit calórico de 300-500 calorias por dia</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Mantenha uma dieta rica em proteínas para preservar massa muscular</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Combine alimentação saudável com exercícios regulares</span>
              </div>
            </>
          )}
          
          {preferences.goal === 'gain_mass' && (
            <>
              <div className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Consuma mais calorias do que gasta (superávit calórico)</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Priorize proteínas de alta qualidade (1.6-2.2g por kg de peso)</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Treine com pesos para estimular o crescimento muscular</span>
              </div>
            </>
          )}
          
          {preferences.goal === 'maintain_weight' && (
            <>
              <div className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Mantenha um equilíbrio entre calorias consumidas e gastas</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Varie sua alimentação para garantir todos os nutrientes</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Monitore seu peso semanalmente para ajustes</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={savePreferences}
          disabled={loading}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Salvando...' : 'Salvar Metas'}
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg ${
          message.includes('sucesso') 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Goals;
