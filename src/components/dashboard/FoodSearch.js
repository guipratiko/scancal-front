import React, { useState } from 'react';
import axios from 'axios';

const FoodSearch = ({ onLogFood }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState(100);
  const [unit, setUnit] = useState('g');
  const [mealType, setMealType] = useState('breakfast');
  const [logging, setLogging] = useState(false);

  const handleSearch = async () => {
    if (searchTerm.length < 2) return;

    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/food/search?q=${searchTerm}`);
      if (response.data.success) {
        setSearchResults(response.data.data.foods);
      }
    } catch (error) {
      console.error('Erro na busca:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogFood = async () => {
    if (!selectedFood) return;

    setLogging(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/food/log`, {
        foodId: selectedFood.id,
        quantity: parseInt(quantity),
        unit,
        mealType
      });

      if (response.data.success) {
        alert('Alimento registrado com sucesso!');
        setSelectedFood(null);
        setQuantity(100);
        setSearchTerm('');
        setSearchResults([]);
        onLogFood && onLogFood();
      }
    } catch (error) {
      console.error('Erro ao registrar alimento:', error);
      alert('Erro ao registrar alimento');
    } finally {
      setLogging(false);
    }
  };

  const getMealTypeLabel = (type) => {
    const labels = {
      breakfast: 'Café da manhã',
      lunch: 'Almoço',
      dinner: 'Jantar',
      snack: 'Lanche'
    };
    return labels[type] || type;
  };

  const calculateNutrition = (food, qty) => {
    const factor = qty / 100;
    return {
      calories: Math.round(food.caloriesPer100g * factor),
      protein: Math.round(food.protein * factor * 10) / 10,
      carbs: Math.round(food.carbs * factor * 10) / 10,
      fat: Math.round(food.fat * factor * 10) / 10
    };
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Buscar Alimentos</h3>
        
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Digite o nome do alimento..."
            className="input-field flex-1"
          />
          <button
            onClick={handleSearch}
            disabled={loading || searchTerm.length < 2}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? '🔍' : 'Buscar'}
          </button>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Resultados:</h4>
            {searchResults.map((food) => (
              <div
                key={food.id}
                onClick={() => setSelectedFood(food)}
                className={`p-3 border rounded-lg cursor-pointer transition-colors duration-200 ${
                  selectedFood?.id === food.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="font-medium text-gray-900">{food.name}</h5>
                    <p className="text-sm text-gray-500 capitalize">{food.category}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-green-600">{food.caloriesPer100g} kcal</div>
                    <div className="text-xs text-gray-500">por 100g</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Food Details & Log */}
      {selectedFood && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Registrar: {selectedFood.name}
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Food Info */}
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Informações Nutricionais</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Calorias:</span>
                  <span className="font-medium">{selectedFood.caloriesPer100g} kcal</span>
                </div>
                <div className="flex justify-between">
                  <span>Proteínas:</span>
                  <span className="font-medium">{selectedFood.protein}g</span>
                </div>
                <div className="flex justify-between">
                  <span>Carboidratos:</span>
                  <span className="font-medium">{selectedFood.carbs}g</span>
                </div>
                <div className="flex justify-between">
                  <span>Gorduras:</span>
                  <span className="font-medium">{selectedFood.fat}g</span>
                </div>
              </div>
            </div>

            {/* Log Form */}
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Registrar Refeição</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantidade
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="input-field flex-1"
                      min="1"
                    />
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="input-field w-16 sm:w-20"
                    >
                      <option value="g">g</option>
                      <option value="ml">ml</option>
                      <option value="un">un</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Refeição
                  </label>
                  <select
                    value={mealType}
                    onChange={(e) => setMealType(e.target.value)}
                    className="input-field"
                  >
                    <option value="breakfast">Café da manhã</option>
                    <option value="lunch">Almoço</option>
                    <option value="dinner">Jantar</option>
                    <option value="snack">Lanche</option>
                  </select>
                </div>

                {/* Calculated Nutrition */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h5 className="font-medium text-gray-700 mb-2">Valores para {quantity}{unit}:</h5>
                  {(() => {
                    const nutrition = calculateNutrition(selectedFood, quantity);
                    return (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <div>Calorias: <span className="font-medium text-green-600">{nutrition.calories}</span></div>
                        <div>Proteínas: <span className="font-medium">{nutrition.protein}g</span></div>
                        <div>Carboidratos: <span className="font-medium">{nutrition.carbs}g</span></div>
                        <div>Gorduras: <span className="font-medium">{nutrition.fat}g</span></div>
                      </div>
                    );
                  })()}
                </div>

                <button
                  onClick={handleLogFood}
                  disabled={logging}
                  className="w-full btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {logging ? 'Registrando...' : `Registrar ${getMealTypeLabel(mealType)}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodSearch;
