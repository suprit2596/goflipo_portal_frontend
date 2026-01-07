import jwtDecode from 'jwt-decode';

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;
  
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

export const getTokenData = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  return decodeToken(token);
};

export const hasRole = (requiredRole) => {
  const tokenData = getTokenData();
  if (!tokenData) return false;
  
  return tokenData.role === requiredRole;
};