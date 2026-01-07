export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const maskSensitiveData = (value, type = 'default') => {
  if (!value) return '••••••••';
  
  const length = value.length;
  
  switch (type) {
    case 'email':
      const [username, domain] = value.split('@');
      const maskedUsername = username.charAt(0) + '•••' + username.charAt(username.length - 1);
      return `${maskedUsername}@${domain}`;
    
    case 'token':
    case 'secret':
    case 'password':
      return '••••••••';
    
    case 'apiKey':
      if (length <= 8) return '••••••••';
      return value.substring(0, 4) + '••••' + value.substring(length - 4);
    
    default:
      if (length <= 4) return '••••';
      return '••••' + value.substring(length - 4);
  }
};

export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};