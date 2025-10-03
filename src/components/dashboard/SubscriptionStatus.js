import React, { useState } from 'react';
import axios from 'axios';

const SubscriptionStatus = ({ user, onUpdate }) => {
  const [activating, setActivating] = useState(false);
  const isActive = user?.status === 'active' && user?.subscription === 'premium';
  
  const getDaysRemaining = () => {
    if (!user?.subscriptionExpiresAt) return 0;
    const expirationDate = new Date(user.subscriptionExpiresAt);
    const today = new Date();
    const diffTime = expirationDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const daysRemaining = getDaysRemaining();

  const handleActivate = async () => {
    setActivating(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/debug/activate`);
      if (response.data.success) {
        alert('Conta ativada com sucesso!');
        onUpdate && onUpdate(response.data.data.user);
      }
    } catch (error) {
      console.error('Erro ao ativar conta:', error);
      alert('Erro ao ativar conta. Tente novamente.');
    } finally {
      setActivating(false);
    }
  };

  if (isActive) {
    return (
      <div className="card bg-green-50 border-green-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-green-800">
              Conta Premium Ativa! ✨
            </h3>
            <p className="text-green-700">
              {daysRemaining > 0 ? (
                `Sua assinatura expira em ${daysRemaining} dia${daysRemaining !== 1 ? 's' : ''}`
              ) : (
                'Sua assinatura expira hoje'
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-yellow-50 border-yellow-200">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-medium text-yellow-800">
            Aguardando Ativação 🔄
          </h3>
          <p className="text-yellow-700">
            Sua conta será ativada automaticamente após a confirmação do pagamento
          </p>
        </div>
        <div className="flex-shrink-0">
          <button 
            onClick={handleActivate}
            disabled={activating}
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {activating ? 'Ativando...' : 'Ative Agora'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionStatus;
