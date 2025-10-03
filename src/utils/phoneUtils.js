// Utility functions for phone number formatting and normalization

/**
 * Normalizes Brazilian phone numbers according to regional rules
 * DDDs 11-19 (São Paulo region): Keep 9th digit
 * Other DDDs: Remove 9th digit if present
 * @param {string} phone - Phone number to normalize
 * @returns {string} Normalized phone number
 */
export const normalizePhoneNumber = (phone) => {
  if (!phone) return phone;
  
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  // If it's empty or too short, return as is
  if (digitsOnly.length < 10) return phone;
  
  // Extract DDD (first 2 digits)
  const ddd = digitsOnly.substring(0, 2);
  
  // DDDs that keep the 9th digit (São Paulo region: 11-19)
  const keepNinthDigit = ['11', '12', '13', '14', '15', '16', '17', '18', '19'];
  
  if (keepNinthDigit.includes(ddd)) {
    // Keep the number as is (with 9th digit)
    return digitsOnly;
  } else {
    // Remove 9th digit if present
    if (digitsOnly.length === 11 && digitsOnly.charAt(2) === '9') {
      return digitsOnly.substring(0, 2) + digitsOnly.substring(3);
    }
    return digitsOnly;
  }
};

/**
 * Formats phone number for display (62) 99999-9999
 * @param {string} phone - Phone number to format
 * @returns {string} Formatted phone number
 */
export const formatPhoneForDisplay = (phone) => {
  if (!phone) return '';
  
  const digitsOnly = phone.replace(/\D/g, '');
  
  if (digitsOnly.length === 10) {
    // Format: (62) 9999-9999
    return `(${digitsOnly.substring(0, 2)}) ${digitsOnly.substring(2, 6)}-${digitsOnly.substring(6)}`;
  } else if (digitsOnly.length === 11) {
    // Format: (62) 99999-9999
    return `(${digitsOnly.substring(0, 2)}) ${digitsOnly.substring(2, 7)}-${digitsOnly.substring(7)}`;
  }
  
  return phone;
};

/**
 * Formats phone input as user types with better visual formatting
 * @param {string} value - Input value
 * @returns {string} Formatted value
 */
export const formatPhoneInput = (value) => {
  const digitsOnly = value.replace(/\D/g, '');
  
  if (digitsOnly.length <= 2) {
    return digitsOnly;
  } else if (digitsOnly.length <= 3) {
    return `(${digitsOnly.substring(0, 2)}) ${digitsOnly.substring(2)}`;
  } else if (digitsOnly.length <= 7) {
    return `(${digitsOnly.substring(0, 2)}) ${digitsOnly.substring(2, 3)} ${digitsOnly.substring(3)}`;
  } else if (digitsOnly.length <= 11) {
    return `(${digitsOnly.substring(0, 2)}) ${digitsOnly.substring(2, 3)} ${digitsOnly.substring(3, 7)}-${digitsOnly.substring(7)}`;
  } else {
    return `(${digitsOnly.substring(0, 2)}) ${digitsOnly.substring(2, 3)} ${digitsOnly.substring(3, 7)}-${digitsOnly.substring(7, 11)}`;
  }
};

/**
 * Formats CPF for display (000.000.000-00)
 * @param {string} cpf - CPF to format
 * @returns {string} Formatted CPF
 */
export const formatCPFForDisplay = (cpf) => {
  if (!cpf) return '';
  
  const digitsOnly = cpf.replace(/\D/g, '');
  
  if (digitsOnly.length <= 3) {
    return digitsOnly;
  } else if (digitsOnly.length <= 6) {
    return `${digitsOnly.substring(0, 3)}.${digitsOnly.substring(3)}`;
  } else if (digitsOnly.length <= 9) {
    return `${digitsOnly.substring(0, 3)}.${digitsOnly.substring(3, 6)}.${digitsOnly.substring(6)}`;
  } else {
    return `${digitsOnly.substring(0, 3)}.${digitsOnly.substring(3, 6)}.${digitsOnly.substring(6, 9)}-${digitsOnly.substring(9, 11)}`;
  }
};

/**
 * Formats CPF input as user types
 * @param {string} value - Input value
 * @returns {string} Formatted value
 */
export const formatCPFInput = (value) => {
  const digitsOnly = value.replace(/\D/g, '');
  
  if (digitsOnly.length <= 3) {
    return digitsOnly;
  } else if (digitsOnly.length <= 6) {
    return `${digitsOnly.substring(0, 3)}.${digitsOnly.substring(3)}`;
  } else if (digitsOnly.length <= 9) {
    return `${digitsOnly.substring(0, 3)}.${digitsOnly.substring(3, 6)}.${digitsOnly.substring(6)}`;
  } else {
    return `${digitsOnly.substring(0, 3)}.${digitsOnly.substring(3, 6)}.${digitsOnly.substring(6, 9)}-${digitsOnly.substring(9, 11)}`;
  }
};

/**
 * Validates CPF using Brazilian algorithm
 * @param {string} cpf - CPF to validate
 * @returns {boolean} True if valid
 */
export const validateCPF = (cpf) => {
  if (!cpf) return false;
  
  const digitsOnly = cpf.replace(/\D/g, '');
  
  // Check if it has 11 digits
  if (digitsOnly.length !== 11) return false;
  
  // Check if all digits are the same
  if (/^(\d)\1{10}$/.test(digitsOnly)) return false;
  
  // Validate first check digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digitsOnly.charAt(i)) * (10 - i);
  }
  let remainder = sum % 11;
  let firstDigit = remainder < 2 ? 0 : 11 - remainder;
  
  if (parseInt(digitsOnly.charAt(9)) !== firstDigit) return false;
  
  // Validate second check digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(digitsOnly.charAt(i)) * (11 - i);
  }
  remainder = sum % 11;
  let secondDigit = remainder < 2 ? 0 : 11 - remainder;
  
  return parseInt(digitsOnly.charAt(10)) === secondDigit;
};
