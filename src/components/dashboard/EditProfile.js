import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatPhoneForDisplay, formatPhoneInput, normalizePhoneNumber, formatCPFForDisplay, formatCPFInput, validateCPF } from '../../utils/phoneUtils';

const EditProfile = ({ user, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    birthDate: '',
    gender: '',
    height: '',
    weight: '',
    activityLevel: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: formatPhoneForDisplay(user.phone) || '',
        cpf: formatCPFForDisplay(user.cpf) || '',
        birthDate: user.birthDate || '',
        gender: user.gender || '',
        height: user.height || '',
        weight: user.weight || '',
        activityLevel: user.activityLevel || 'moderate'
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    
    // Format phone input as user types
    if (name === 'phone') {
      processedValue = formatPhoneInput(value);
    }
    
    // Format CPF input as user types
    if (name === 'cpf') {
      processedValue = formatCPFInput(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Telefone deve ter pelo menos 10 dígitos';
    }

    if (!formData.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!validateCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido';
    }

    if (formData.height && (formData.height < 100 || formData.height > 250)) {
      newErrors.height = 'Altura deve estar entre 100 e 250 cm';
    }

    if (formData.weight && (formData.weight < 30 || formData.weight > 300)) {
      newErrors.weight = 'Peso deve estar entre 30 e 300 kg';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Prepare data with normalized phone and CPF (silently)
      const submitData = {
        ...formData,
        phone: normalizePhoneNumber(formData.phone),
        cpf: formData.cpf.replace(/\D/g, '')
      };
      
      // Ensure CPF is not empty
      if (!submitData.cpf || submitData.cpf.length !== 11) {
        alert('CPF inválido. Deve ter 11 dígitos.');
        setLoading(false);
        return;
      }
      
      
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/users/profile`, submitData);
      
      if (response.data.success) {
        alert('Perfil atualizado com sucesso!');
        onUpdate && onUpdate(response.data.data.user);
        onClose && onClose();
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Erro ao atualizar perfil. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const calculateBMI = () => {
    if (formData.height && formData.weight) {
      const heightInMeters = formData.height / 100;
      const bmi = formData.weight / (heightInMeters * heightInMeters);
      return bmi.toFixed(1);
    }
    return null;
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: 'Abaixo do peso', color: 'text-blue-600' };
    if (bmi < 25) return { category: 'Peso normal', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Sobrepeso', color: 'text-yellow-600' };
    return { category: 'Obesidade', color: 'text-red-600' };
  };

  const bmi = calculateBMI();
  const bmiInfo = bmi ? getBMICategory(bmi) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Editar Perfil</h2>
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
        {/* Personal Information */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações Pessoais</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                placeholder="Seu nome completo"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                placeholder="seu@email.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
                placeholder="(62) 9 9844-8536"
                required
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CPF *
              </label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                className={`input-field ${errors.cpf ? 'border-red-500' : ''}`}
                placeholder="000.000.000-00"
                maxLength="14"
                required
              />
              {errors.cpf && <p className="text-red-500 text-xs mt-1">{errors.cpf}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data de Nascimento
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gênero
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Selecione</option>
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
                <option value="other">Outro</option>
              </select>
            </div>
          </div>
        </div>

        {/* Physical Information */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações Físicas</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Altura (cm)
              </label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className={`input-field ${errors.height ? 'border-red-500' : ''}`}
                placeholder="170"
                min="100"
                max="250"
              />
              {errors.height && <p className="text-red-500 text-xs mt-1">{errors.height}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Peso (kg)
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className={`input-field ${errors.weight ? 'border-red-500' : ''}`}
                placeholder="70"
                min="30"
                max="300"
                step="0.1"
              />
              {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nível de Atividade
              </label>
              <select
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
                className="input-field"
              >
                <option value="sedentary">Sedentário</option>
                <option value="light">Pouco ativo</option>
                <option value="moderate">Moderadamente ativo</option>
                <option value="active">Muito ativo</option>
                <option value="very_active">Extremamente ativo</option>
              </select>
            </div>
          </div>

          {/* BMI Display */}
          {bmi && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">Índice de Massa Corporal (IMC)</h4>
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold text-gray-900">{bmi}</span>
                <span className={`font-medium ${bmiInfo.color}`}>
                  {bmiInfo.category}
                </span>
              </div>
            </div>
          )}
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
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
