import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Header = ({ onLogout }) => {
  const { user } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'pending':
        return 'Aguardando pagamento';
      default:
        return 'Inativo';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/img/logo.png" 
              alt="ScanCal Logo" 
              className="h-12 rounded-lg"
            />
          </div>

          {/* User Info & Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Status Badge - Hidden on very small screens */}
            <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium hidden sm:block ${getStatusColor(user?.status)}`}>
              {getStatusText(user?.status)}
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 sm:space-x-3 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 p-1 sm:p-0"
              >
                <div className="w-8 h-8 sm:w-8 sm:h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <span className="hidden lg:block font-medium text-gray-700">
                  {user?.name}
                </span>
                <svg className="w-4 h-4 text-gray-400 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    {/* Status badge for mobile */}
                    <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 sm:hidden ${getStatusColor(user?.status)}`}>
                      {getStatusText(user?.status)}
                    </div>
                  </div>
                  
                  
                  <div className="border-t border-gray-100"></div>
                  
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onLogout();
                    }}
                    className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <span className="mr-2">🚪</span>
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Close menu when clicking outside */}
      {showProfileMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowProfileMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;
