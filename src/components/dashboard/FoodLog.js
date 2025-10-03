import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const FoodLog = ({ onStatsUpdate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [logs, setLogs] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snack: []
  });
  const [totals, setTotals] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });
  const [loading, setLoading] = useState(false);

  const mealTypes = [
    { id: 'breakfast', label: 'Café da manhã', icon: '🌅', color: 'bg-yellow-50 border-yellow-200' },
    { id: 'lunch', label: 'Almoço', icon: '☀️', color: 'bg-orange-50 border-orange-200' },
    { id: 'dinner', label: 'Jantar', icon: '🌙', color: 'bg-blue-50 border-blue-200' },
    { id: 'snack', label: 'Lanche', icon: '🍎', color: 'bg-green-50 border-green-200' }
  ];

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/food/logs/${selectedDate}`);
      if (response.data.success) {
        setLogs(response.data.data.logs);
        setTotals(response.data.data.totals);
        onStatsUpdate && onStatsUpdate();
      }
    } catch (error) {
      console.error('Erro ao buscar logs:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedDate, onStatsUpdate]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const deleteLog = async (logId) => {
    if (!window.confirm('Deseja remover este alimento do diário?')) return;

    try {
      // Note: You would need to implement DELETE endpoint in backend
      // await axios.delete(`${process.env.REACT_APP_API_URL}/api/food/logs/${logId}`);
      alert('Funcionalidade de exclusão será implementada em breve');
      fetchLogs();
    } catch (error) {
      console.error('Erro ao excluir log:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getPreviousDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() - 1);
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const getNextDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + 1);
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Date Selector */}
      <div className="card">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Diário Alimentar - {formatDate(selectedDate)}
          </h3>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={getPreviousDay}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
            >
              ←
            </button>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input-field w-40"
            />
            <button
              onClick={getNextDay}
              disabled={selectedDate >= new Date().toISOString().split('T')[0]}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Totals Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card bg-green-50 border-green-200">
          <div className="text-sm text-green-700 mb-1">Calorias</div>
          <div className="text-2xl font-bold text-green-800">{Math.round(totals.calories)}</div>
        </div>
        <div className="card bg-blue-50 border-blue-200">
          <div className="text-sm text-blue-700 mb-1">Proteínas</div>
          <div className="text-2xl font-bold text-blue-800">{Math.round(totals.protein * 10) / 10}g</div>
        </div>
        <div className="card bg-yellow-50 border-yellow-200">
          <div className="text-sm text-yellow-700 mb-1">Carboidratos</div>
          <div className="text-2xl font-bold text-yellow-800">{Math.round(totals.carbs * 10) / 10}g</div>
        </div>
        <div className="card bg-red-50 border-red-200">
          <div className="text-sm text-red-700 mb-1">Gorduras</div>
          <div className="text-2xl font-bold text-red-800">{Math.round(totals.fat * 10) / 10}g</div>
        </div>
      </div>

      {/* Meal Types */}
      <div className="space-y-4">
        {mealTypes.map((meal) => (
          <div key={meal.id} className={`card ${meal.color}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{meal.icon}</span>
                <h4 className="text-lg font-semibold text-gray-900">{meal.label}</h4>
              </div>
              <div className="text-sm text-gray-600">
                {logs[meal.id]?.length || 0} alimento(s)
              </div>
            </div>

            {logs[meal.id]?.length > 0 ? (
              <div className="space-y-3">
                {logs[meal.id].map((log) => (
                  <div key={log._id} className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">{log.foodName}</h5>
                        <p className="text-sm text-gray-600">
                          {log.quantity} {log.unit}
                        </p>
                        <div className="flex space-x-4 mt-2 text-xs text-gray-500">
                          <span>P: {log.protein}g</span>
                          <span>C: {log.carbs}g</span>
                          <span>G: {log.fat}g</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">{log.calories} kcal</div>
                        <button
                          onClick={() => deleteLog(log._id)}
                          className="text-red-500 hover:text-red-700 text-xs mt-1"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">🍽️</div>
                <p>Nenhum alimento registrado</p>
                <p className="text-sm">Use a aba "Buscar Alimentos" para adicionar refeições</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Add */}
      <div className="card bg-gray-50">
        <div className="text-center">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            Adicionar Alimento Rápido
          </h4>
          <p className="text-gray-600 mb-4">
            Use a busca de alimentos para registrar suas refeições
          </p>
          <button className="btn-primary">
            Ir para Busca de Alimentos
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodLog;
