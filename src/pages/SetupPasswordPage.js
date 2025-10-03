import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const SetupPasswordPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [userInfo, setUserInfo] = useState(null);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/setup-info/${userId}`);
      if (response.data.success) {
        setUserInfo(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Erro ao buscar informações:', error);
      setError('Erro ao carregar informações do usuário');
    } finally {
      setLoadingInfo(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserInfo();
  }, [userId, fetchUserInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError(''); // Clear error when user starts typing
  };

  const validateForm = () => {
    if (!formData.password.trim()) {
      setError('Senha é obrigatória');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Senhas não coincidem');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/setup-password/${userId}`, {
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });

      if (response.data.success) {
        setSuccess('Senha criada com sucesso! Redirecionando...');
        
        // Auto login
        const { user } = response.data.data;
        login(user.email, formData.password);
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (loadingInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
            <div className="text-red-600 text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Link Inválido
            </h2>
            <p className="text-gray-600 mb-6">
              {error || 'Este link de configuração de senha não é válido ou já foi utilizado.'}
            </p>
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Ir para Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-16 w-auto rounded-lg"
          src="/img/logo.png"
          alt="ScanCal Logo"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Crie sua senha
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Olá, <strong>{userInfo.name}</strong>!<br />
          Crie uma senha para acessar sua conta premium
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Premium Badge */}
          <div className="mb-6 p-4 bg-gradient-to-r from-green-400 to-green-600 rounded-lg text-white text-center">
            <div className="text-2xl mb-2">👑</div>
            <h3 className="font-bold text-lg">Conta Premium Ativa!</h3>
            <p className="text-sm opacity-90">
              Sua assinatura já foi confirmada. Agora é só criar sua senha!
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Nova Senha *
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmar Senha *
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Erro:</strong>
                <span className="block sm:inline"> {error}</span>
              </div>
            )}

            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Sucesso:</strong>
                <span className="block sm:inline"> {success}</span>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Criando senha...' : 'Criar Senha e Entrar'}
              </button>
            </div>
          </form>

          {/* Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Sua conta premium foi ativada automaticamente após o pagamento.<br />
              Este link é válido apenas uma vez.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupPasswordPage;
