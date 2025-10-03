import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

// Components
import Header from '../components/dashboard/Header';
import StatsCard from '../components/dashboard/StatsCard';
import FoodSearch from '../components/dashboard/FoodSearch';
import FoodLog from '../components/dashboard/FoodLog';
import Goals from '../components/dashboard/Goals';
import Suggestions from '../components/dashboard/Suggestions';
import SubscriptionStatus from '../components/dashboard/SubscriptionStatus';
import EditProfile from '../components/dashboard/EditProfile';
import Preferences from '../components/dashboard/Preferences';

const Dashboard = () => {
  const { user, logout, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [dailyStats, setDailyStats] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });
  const [loading, setLoading] = useState(true);
  // const [showEditProfile, setShowEditProfile] = useState(false);
  // const [showPreferences, setShowPreferences] = useState(false);
  const [profileIncomplete, setProfileIncomplete] = useState(false);
  const [profileWarningShown, setProfileWarningShown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const fetchDailyStats = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/food/logs/${today}`);
      
      if (response.data.success) {
        setDailyStats(response.data.data.totals);
      }
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkProfileCompletion = useCallback(() => {
    if (!user) return;
    
    // Check if essential profile fields are missing
    const missingFields = [];
    
    // Essential fields for proper functionality
    if (!user.name || user.name.trim() === '') missingFields.push('nome');
    if (!user.height || user.height === 0) missingFields.push('altura');
    if (!user.weight || user.weight === 0) missingFields.push('peso');
    if (!user.gender) missingFields.push('gênero');
    
    // If essential fields are missing, redirect to edit profile
    if (missingFields.length > 0) {
      setProfileIncomplete(true);
      setActiveTab('edit-profile');
      // Show a single popup message only once
      if (!profileWarningShown) {
        setProfileWarningShown(true);
        setShowProfileModal(true);
      }
    } else {
      setProfileIncomplete(false);
      setProfileWarningShown(false); // Reset when profile is complete
    }
  }, [user, profileWarningShown]);

  useEffect(() => {
    fetchDailyStats();
    checkProfileCompletion();
  }, [user, checkProfileCompletion]);

  const handleUserUpdate = (updatedUser) => {
    updateUser && updateUser(updatedUser);
    fetchDailyStats(); // Refresh stats in case preferences changed
    // Check profile completion again after update
    setTimeout(() => {
      checkProfileCompletion();
    }, 100);
  };

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: '📊' },
    { id: 'search', label: 'Buscar Alimentos', icon: '🔍' },
    { id: 'log', label: 'Meu Diário', icon: '📅' },
    { id: 'goals', label: 'Metas', icon: '🎯' },
    { id: 'suggestions', label: 'Sugestões', icon: '💡' },
    { id: 'edit-profile', label: profileIncomplete ? 'Completar Perfil ⚠️' : 'Editar Perfil', icon: '👤' },
    { id: 'preferences', label: 'Preferências', icon: '⚙️' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Subscription Status */}
            <SubscriptionStatus user={user} onUpdate={handleUserUpdate} />
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <StatsCard
                title="Calorias"
                value={dailyStats.calories}
                target={user?.preferences?.dailyCalories || 2000}
                unit="kcal"
                color="green"
              />
              <StatsCard
                title="Proteínas"
                value={dailyStats.protein}
                target={user?.preferences?.dailyCalories * 0.15 / 4 || 75}
                unit="g"
                color="blue"
              />
              <StatsCard
                title="Carboidratos"
                value={dailyStats.carbs}
                target={user?.preferences?.dailyCalories * 0.55 / 4 || 275}
                unit="g"
                color="yellow"
              />
              <StatsCard
                title="Gorduras"
                value={dailyStats.fat}
                target={user?.preferences?.dailyCalories * 0.25 / 9 || 56}
                unit="g"
                color="red"
              />
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <button
                  onClick={() => setActiveTab('search')}
                  className="p-3 sm:p-4 border-2 border-green-200 rounded-lg hover:border-green-400 transition-colors duration-200 text-center"
                >
                  <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🔍</div>
                  <div className="text-xs sm:text-sm font-medium text-gray-700">Buscar Alimentos</div>
                </button>
                <button
                  onClick={() => setActiveTab('log')}
                  className="p-3 sm:p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 transition-colors duration-200 text-center"
                >
                  <div className="text-xl sm:text-2xl mb-1 sm:mb-2">📝</div>
                  <div className="text-xs sm:text-sm font-medium text-gray-700">Registrar Refeição</div>
                </button>
                <button
                  onClick={() => setActiveTab('goals')}
                  className="p-3 sm:p-4 border-2 border-purple-200 rounded-lg hover:border-purple-400 transition-colors duration-200 text-center"
                >
                  <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🎯</div>
                  <div className="text-xs sm:text-sm font-medium text-gray-700">Definir Metas</div>
                </button>
                <button
                  onClick={() => setActiveTab('suggestions')}
                  className="p-3 sm:p-4 border-2 border-orange-200 rounded-lg hover:border-orange-400 transition-colors duration-200 text-center"
                >
                  <div className="text-xl sm:text-2xl mb-1 sm:mb-2">💡</div>
                  <div className="text-xs sm:text-sm font-medium text-gray-700">Sugestões</div>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center">
                    <span className="text-lg mr-3">🌅</span>
                    <div>
                      <div className="font-medium text-gray-900">Café da manhã</div>
                      <div className="text-sm text-gray-500">Aveia com banana</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-green-600">320 kcal</div>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center">
                    <span className="text-lg mr-3">☀️</span>
                    <div>
                      <div className="font-medium text-gray-900">Almoço</div>
                      <div className="text-sm text-gray-500">Frango grelhado com arroz</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-green-600">450 kcal</div>
                </div>
                <div className="text-center py-4">
                  <button
                    onClick={() => setActiveTab('log')}
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    Ver diário completo →
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'search':
        return <FoodSearch onLogFood={fetchDailyStats} />;

      case 'log':
        return <FoodLog onStatsUpdate={fetchDailyStats} />;

      case 'goals':
        return <Goals user={user} onUpdate={fetchDailyStats} />;

      case 'suggestions':
        return <Suggestions />;

      case 'edit-profile':
        return (
          <EditProfile 
            user={user} 
            onUpdate={handleUserUpdate}
            onClose={() => setActiveTab('overview')}
          />
        );

      case 'preferences':
        return (
          <Preferences 
            user={user} 
            onUpdate={handleUserUpdate}
            onClose={() => setActiveTab('overview')}
          />
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        onLogout={logout}
      />
      
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {/* Welcome Message */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Olá, {user?.name || 'Usuário'}! 👋
              </h1>
              <p className="text-gray-600 mt-2">
                Bem-vindo ao seu painel de controle nutricional
              </p>
            </div>

        {/* Tabs */}
        <div className="mb-6 sm:mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-2 sm:space-x-8 overflow-x-auto pb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap py-2 px-2 sm:px-4 border-b-2 font-medium text-xs sm:text-sm flex items-center min-w-fit ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-1 sm:mr-2 text-base sm:text-sm">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="fade-in">
          {renderTabContent()}
        </div>
      </div>

      {/* Profile Completion Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Complete seu perfil
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Para acessar todas as funcionalidades do ScanCal, complete seu perfil com as informações básicas.
              </p>
              <button
                onClick={() => setShowProfileModal(false)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Entendi, vamos completar!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
