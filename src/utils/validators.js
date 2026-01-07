export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
  if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
  if (!/\d/.test(password)) return 'Password must contain at least one number';
  return '';
};

export const validateBusiness = (business) => {
  const errors = {};
  
  if (!business.businessName?.trim()) {
    errors.businessName = 'Business name is required';
  }
  
  if (!business.industry?.trim()) {
    errors.industry = 'Industry is required';
  }
  
  if (!business.contactEmail?.trim()) {
    errors.contactEmail = 'Contact email is required';
  } else if (!validateEmail(business.contactEmail)) {
    errors.contactEmail = 'Invalid email format';
  }
  
  return errors;
};

export const validateApplication = (application) => {
  const errors = {};
  
  if (!application.name?.trim()) {
    errors.name = 'Application name is required';
  }
  
  if (!application.type) {
    errors.type = 'Application type is required';
  }
  
  return errors;
};