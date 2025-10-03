import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Preferences = ({ user, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    dailyCalories: '',
    dailyProtein: '',
    dailyCarbs: '',
    dailyFat: '',
    dailyFiber: '',
    dailyWater: '',
    notifications: {
      email: true,
      whatsapp: true,
      reminder: true,
      weeklyReport: true
    },
    privacy: {
      shareData: false,
      publicProfile: false,
      analytics: true
    },
    units: {
      weight: 'kg',
      height: 'cm',
      temperature: 'celsius'
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.preferences) {
      setFormData({
        dailyCalories: user.preferences.dailyCalories || '',
        dailyProtein: user.preferences.dailyProtein || '',
        dailyCarbs: user.preferences.dailyCarbs || '',
        dailyFat: user.preferences.dailyFat || '',
        dailyFiber: user.preferences.dailyFiber || '',
        dailyWater: user.preferences.dailyWater || '',
        notifications: {
          email: user.preferences.notifications?.email ?? true,
          whatsapp: user.preferences.notifications?.whatsapp ?? true,
          reminder: user.preferences.notifications?.reminder ?? true,
          weeklyReport: user.preferences.notifications?.weeklyReport ?? true
        },
        privacy: {
          shareData: user.preferences.privacy?.shareData ?? false,
          publicProfile: user.preferences.privacy?.publicProfile ?? false,
          analytics: user.preferences.privacy?.analytics ?? true
        },
        units: {
          weight: user.preferences.units?.weight || 'kg',
          height: user.preferences.units?.height || 'cm',
          temperature: user.preferences.units?.temperature || 'celsius'
        }
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/users/preferences`, formData);
      
      if (response.data.success) {
        alert('Preferências salvas com sucesso!');
        onUpdate && onUpdate(response.data.data.user);
        onClose && onClose();
      }
    } catch (error) {
      console.error('Erro ao salvar preferências:', error);
      alert('Erro ao salvar preferências. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const calculateMacros = () => {
    if (formData.dailyCalories) {
      const calories = parseFloat(formData.dailyCalories);
      return {
        protein: Math.round(calories * 0.15 / 4), // 15% das calorias
        carbs: Math.round(calories * 0.55 / 4),   // 55% das calorias
        fat: Math.round(calories * 0.25 / 9)      // 25% das calorias
      };
    }
    return null;
  };

  const macros = calculateMacros();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Preferências</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nutritional Goals */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Metas Nutricionais Diárias</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Calorias (kcal)
              </label>
              <input
                type="number"
                name="dailyCalories"
                value={formData.dailyCalories}
                onChange={handleChange}
                className="input-field"
                placeholder="2000"
                min="800"
                max="5000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Proteínas (g)
              </label>
              <input
                type="number"
                name="dailyProtein"
                value={formData.dailyProtein}
                onChange={handleChange}
                className="input-field"
                placeholder={macros?.protein || '75'}
                min="20"
                max="300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Carboidratos (g)
              </label>
              <input
                type="number"
                name="dailyCarbs"
                value={formData.dailyCarbs}
                onChange={handleChange}
                className="input-field"
                placeholder={macros?.carbs || '275'}
                min="50"
                max="600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gorduras (g)
              </label>
              <input
                type="number"
                name="dailyFat"
                value={formData.dailyFat}
                onChange={handleChange}
                className="input-field"
                placeholder={macros?.fat || '56'}
                min="20"
                max="200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fibras (g)
              </label>
              <input
                type="number"
                name="dailyFiber"
                value={formData.dailyFiber}
                onChange={handleChange}
                className="input-field"
                placeholder="25"
                min="10"
                max="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Água (ml)
              </label>
              <input
                type="number"
                name="dailyWater"
                value={formData.dailyWater}
                onChange={handleChange}
                className="input-field"
                placeholder="2000"
                min="500"
                max="5000"
              />
            </div>
          </div>

          {/* Macro Calculator */}
          {macros && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">💡 Sugestão baseada em {formData.dailyCalories} kcal:</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>Proteínas: <span className="font-medium">{macros.protein}g</span></div>
                <div>Carboidratos: <span className="font-medium">{macros.carbs}g</span></div>
                <div>Gorduras: <span className="font-medium">{macros.fat}g</span></div>
              </div>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notificações</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-700">Email</h4>
                <p className="text-sm text-gray-500">Receber notificações por email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="notifications.email"
                  checked={formData.notifications.email}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-700">WhatsApp</h4>
                <p className="text-sm text-gray-500">Receber notificações via WhatsApp</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="notifications.whatsapp"
                  checked={formData.notifications.whatsapp}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-700">Lembretes</h4>
                <p className="text-sm text-gray-500">Lembretes para registrar refeições</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="notifications.reminder"
                  checked={formData.notifications.reminder}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-700">Relatório Semanal</h4>
                <p className="text-sm text-gray-500">Receber relatório semanal de progresso</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="notifications.weeklyReport"
                  checked={formData.notifications.weeklyReport}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacidade</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-700">Compartilhar Dados</h4>
                <p className="text-sm text-gray-500">Permitir uso de dados para melhorar o serviço</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="privacy.shareData"
                  checked={formData.privacy.shareData}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-700">Perfil Público</h4>
                <p className="text-sm text-gray-500">Tornar perfil visível para outros usuários</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="privacy.publicProfile"
                  checked={formData.privacy.publicProfile}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-700">Analytics</h4>
                <p className="text-sm text-gray-500">Permitir coleta de dados de uso</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="privacy.analytics"
                  checked={formData.privacy.analytics}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Units */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Unidades de Medida</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Peso
              </label>
              <select
                name="units.weight"
                value={formData.units.weight}
                onChange={handleChange}
                className="input-field"
              >
                <option value="kg">Quilogramas (kg)</option>
                <option value="lbs">Libras (lbs)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Altura
              </label>
              <select
                name="units.height"
                value={formData.units.height}
                onChange={handleChange}
                className="input-field"
              >
                <option value="cm">Centímetros (cm)</option>
                <option value="ft">Pés (ft)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Temperatura
              </label>
              <select
                name="units.temperature"
                value={formData.units.temperature}
                onChange={handleChange}
                className="input-field"
              >
                <option value="celsius">Celsius (°C)</option>
                <option value="fahrenheit">Fahrenheit (°F)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Salvando...' : 'Salvar Preferências'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Preferences;
