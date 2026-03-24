// // // import { jwtDecode } from 'jwt-decode';

// // // export const decodeToken = (token) => {
// // //   try {
// // //     return jwtDecode(token);
// // //   } catch (error) {
// // //     console.error('Error decoding token:', error);
// // //     return null;
// // //   }
// // // };

// // // export const isTokenExpired = (token) => {
// // //   const decoded = decodeToken(token);
// // //   if (!decoded || !decoded.exp) return true;
  
// // //   const currentTime = Date.now() / 1000;
// // //   return decoded.exp < currentTime;
// // // };

// // // export const getTokenData = () => {
// // //   const token = localStorage.getItem('token');
// // //   if (!token) return null;
  
// // //   return decodeToken(token);
// // // };

// // // export const hasRole = (requiredRole) => {
// // //   const tokenData = getTokenData();
// // //   if (!tokenData) return false;
  
// // //   return tokenData.role === requiredRole;
// // // };

// // import { jwtDecode } from 'jwt-decode';

// // export const decodeToken = (token) => {
// //   try {
// //     return jwtDecode(token);
// //   } catch (error) {
// //     console.error('Error decoding token:', error);
// //     return null;
// //   }
// // };

// // export const isTokenExpired = (token) => {
// //   const decoded = decodeToken(token);
// //   if (!decoded || !decoded.exp) return true;
  
// //   const currentTime = Date.now() / 1000;
// //   return decoded.exp < currentTime;
// // };

// // export const getTokenData = () => {
// //   const token = localStorage.getItem('token');
// //   if (!token) return null;
  
// //   return decodeToken(token);
// // };

// // export const hasRole = (requiredRole) => {
// //   const tokenData = getTokenData();
// //   if (!tokenData) return false;
  
// //   return tokenData.role === requiredRole;
// // };

// // // New helper to get token type
// // export const getTokenType = () => {
// //   const tokenData = getTokenData();
// //   if (!tokenData) return null;
  
// //   return tokenData.role; // 'admin', 'business', or 'business_temp'
// // };

// // // Check if token is temporary (for password change)
// // export const isTempToken = () => {
// //   const tokenData = getTokenData();
// //   if (!tokenData) return false;
  
// //   return tokenData.role === 'business_temp' && tokenData.purpose === 'change_password';
// // };

// import { jwtDecode, InvalidTokenError } from 'jwt-decode';

// export const decodeToken = (token) => {
//   try {
//     if (!token || typeof token !== 'string') {
//       console.warn('Token is not a valid string:', token);
//       return null;
//     }
    
//     // Trim whitespace first
//     const trimmedToken = token.trim();
    
//     // Check if token has proper JWT format (3 parts separated by dots)
//     const parts = trimmedToken.split('.');
//     if (parts.length !== 3) {
//       console.warn('Invalid JWT format, expected 3 parts, got:', parts.length);
//       console.log('Token sample:', trimmedToken.substring(0, 50) + '...');
//       return null;
//     }
    
//     // Check if all parts are non-empty
//     for (let i = 0; i < parts.length; i++) {
//       if (!parts[i]) {
//         console.warn(`JWT part ${i} is empty`);
//         return null;
//       }
//     }
    
//     console.log('🔐 Decoding token...');
//     const decoded = jwtDecode(trimmedToken);
//     console.log('✅ Token decoded successfully:', decoded);
//     return decoded;
//   } catch (error) {
//     if (error instanceof InvalidTokenError) {
//       console.error('Invalid token format:', error.message);
//       // Log token for debugging (first and last 20 chars)
//       if (token && typeof token === 'string') {
//         console.error('Token sample (first 50):', token.substring(0, 50));
//         console.error('Token length:', token.length);
//       }
//     } else {
//       console.error('Error decoding token:', error);
//     }
//     return null;
//   }
// };

// export const isTokenExpired = (token) => {
//   const decoded = decodeToken(token);
//   if (!decoded || !decoded.exp) {
//     console.warn('Token is invalid or has no expiration');
//     return true; // Consider invalid tokens as expired
//   }
  
//   const currentTime = Date.now() / 1000;
//   const isExpired = decoded.exp < currentTime;
  
//   if (isExpired) {
//     console.warn('Token expired at:', new Date(decoded.exp * 1000));
//   }
  
//   return isExpired;
// };

// export const getTokenData = () => {
//   const token = localStorage.getItem('token');
//   if (!token) {
//     console.log('No token found in localStorage');
//     return null;
//   }
  
//   console.log('Token found, length:', token.length);
//   return decodeToken(token);
// };

// export const hasRole = (requiredRole) => {
//   const tokenData = getTokenData();
//   if (!tokenData) return false;
  
//   return tokenData.role === requiredRole;
// };

// // New helper to validate token format
// // export const isValidTokenFormat = (token) => {
// //   if (!token || typeof token !== 'string') return false;
  
// //   const parts = token.split('.');
// //   if (parts.length !== 3) return false;
  
// //   // Check each part is non-empty and looks like base64
// //   return parts.every(part => part.length > 0 && /^[A-Za-z0-9-_]+$/.test(part));
// // };

// // New helper to validate token format
// export const isValidTokenFormat = (token) => {
//   if (!token || typeof token !== 'string') {
//     console.log('❌ Token is not a valid string');
//     return false;
//   }
  
//   // Trim whitespace
//   const trimmedToken = token.trim();
  
//   // Check minimum length (JWT tokens are usually at least 50 chars)
//   if (trimmedToken.length < 50) {
//     console.log(`❌ Token too short: ${trimmedToken.length} chars`);
//     return false;
//   }
  
//   const parts = trimmedToken.split('.');
  
//   // JWT must have exactly 3 parts
//   if (parts.length !== 3) {
//     console.log(`❌ Token has ${parts.length} parts, expected 3`);
//     return false;
//   }
  
//   // Check each part
//   for (let i = 0; i < parts.length; i++) {
//     const part = parts[i];
    
//     // Each part must be non-empty
//     if (!part || part.length === 0) {
//       console.log(`❌ Token part ${i} is empty`);
//       return false;
//     }
    
//     // Header and payload should be Base64Url encoded
//     // Signature can contain various characters
//     if (i < 2) {
//       // Check if it's valid Base64Url (no = padding in JWT)
//       if (!/^[A-Za-z0-9_-]+$/.test(part)) {
//         console.log(`❌ Token part ${i} has invalid Base64Url characters`);
//         console.log(`Part ${i}: ${part.substring(0, 20)}...`);
//         return false;
//       }
//     }
//   }
  
//   console.log(`✅ Token format is valid (${trimmedToken.length} chars)`);
//   return true;
// };

// // Get token type safely
// export const getTokenType = () => {
//   const tokenData = getTokenData();
//   if (!tokenData) return null;
  
//   return tokenData.role; // 'admin', 'business', or 'business_temp'
// };

// // Check if token is temporary (for password change)
// export const isTempToken = () => {
//   const tokenData = getTokenData();
//   if (!tokenData) return false;
  
//   return tokenData.role === 'business_temp' && tokenData.purpose === 'change_password';
// };

import { jwtDecode, InvalidTokenError } from 'jwt-decode';

// Safe token validation without throwing
export const decodeToken = (token) => {
  try {
    console.log('🔐 [AUTH UTILS] decodeToken called');
    console.log('📏 Input token length:', token?.length);
    console.log('🔍 Input token type:', typeof token);
    
    if (!token) {
      console.warn('❌ [AUTH UTILS] No token provided');
      return null;
    }
    
    if (typeof token !== 'string') {
      console.warn(`❌ [AUTH UTILS] Token is not a string: ${typeof token}`);
      return null;
    }
    
    const trimmedToken = token.trim();
    
    // Check for "undefined" string
    if (trimmedToken === 'undefined') {
      console.warn('❌ [AUTH UTILS] Token is literal string "undefined"');
      return null;
    }
    
    // Basic JWT format check
    if (trimmedToken.length < 50) {
      console.warn(`❌ [AUTH UTILS] Token too short for JWT: ${trimmedToken.length} chars`);
      console.warn(`   Token: "${trimmedToken}"`);
      return null;
    }
    
    const parts = trimmedToken.split('.');
    console.log(`🔍 [AUTH UTILS] Token has ${parts.length} parts`);
    
    if (parts.length !== 3) {
      console.warn(`❌ [AUTH UTILS] JWT should have 3 parts, got: ${parts.length}`);
      return null;
    }
    
    // Check each part
    for (let i = 0; i < parts.length; i++) {
      if (!parts[i] || parts[i].length === 0) {
        console.warn(`❌ [AUTH UTILS] JWT part ${i} is empty`);
        return null;
      }
    }
    
    console.log('✅ [AUTH UTILS] Token format looks good, decoding...');
    const decoded = jwtDecode(trimmedToken);
    console.log('✅ [AUTH UTILS] Token decoded successfully');
    console.log('📋 Decoded:', decoded);
    
    return decoded;
  } catch (error) {
    if (error instanceof InvalidTokenError) {
      console.error('❌ [AUTH UTILS] JWT decode failed:', error.message);
    } else {
      console.error('❌ [AUTH UTILS] Unexpected decode error:', error);
    }
    return null;
  }
};

export const isTokenExpired = (token) => {
  console.log('⏰ [AUTH UTILS] Checking token expiration');
  const decoded = decodeToken(token);
  
  if (!decoded || !decoded.exp) {
    console.warn('❌ [AUTH UTILS] Token invalid or has no expiration');
    return true;
  }
  
  const currentTime = Date.now() / 1000;
  const isExpired = decoded.exp < currentTime;
  
  console.log(`⏰ [AUTH UTILS] Token expires at: ${new Date(decoded.exp * 1000).toISOString()}`);
  console.log(`⏰ [AUTH UTILS] Current time: ${new Date(currentTime * 1000).toISOString()}`);
  console.log(`⏰ [AUTH UTILS] Is expired: ${isExpired}`);
  
  return isExpired;
};

export const getTokenData = () => {
  try {
    const token = localStorage.getItem('token');
    console.log('📝 [AUTH UTILS] getTokenData from localStorage');
    console.log('🔍 Token in storage:', token);
    console.log('📏 Length:', token?.length);
    
    if (!token) {
      console.log('📝 [AUTH UTILS] No token in storage');
      return null;
    }
    
    return decodeToken(token);
  } catch (error) {
    console.error('❌ [AUTH UTILS] Error getting token data:', error);
    return null;
  }
};

export const hasRole = (requiredRole) => {
  const tokenData = getTokenData();
  if (!tokenData) return false;
  
  return tokenData.role === requiredRole;
};

export const isValidTokenFormat = (token) => {
  console.log('✅ [AUTH UTILS] Validating token format');
  console.log('📏 Input length:', token?.length);
  console.log('🔍 Input type:', typeof token);
  
  if (!token || typeof token !== 'string') {
    console.log('❌ [AUTH UTILS] Not a valid string');
    return false;
  }
  
  const trimmedToken = token.trim();
  
  // Check for "undefined" string
  if (trimmedToken === 'undefined') {
    console.log('❌ [AUTH UTILS] Token is string "undefined"');
    return false;
  }
  
  // Basic length check
  if (trimmedToken.length < 50) {
    console.log(`❌ [AUTH UTILS] Token too short: ${trimmedToken.length} chars`);
    console.log(`   Token: "${trimmedToken}"`);
    return false;
  }
  
  const parts = trimmedToken.split('.');
  console.log(`🔍 [AUTH UTILS] Token parts: ${parts.length}`);
  
  if (parts.length !== 3) {
    console.log(`❌ [AUTH UTILS] Wrong part count: ${parts.length}`);
    return false;
  }
  
  // Check all parts exist
  const valid = parts[0] && parts[1] && parts[2];
  console.log(`✅ [AUTH UTILS] Token format valid: ${valid}`);
  
  return valid;
};

export const getTokenType = () => {
  const tokenData = getTokenData();
  if (!tokenData) return null;
  
  return tokenData.role;
};

export const isTempToken = () => {
  const tokenData = getTokenData();
  if (!tokenData) return false;
  
  return tokenData.role === 'business_temp' && tokenData.purpose === 'change_password';
};

// REMOVE the setToken, getToken, clearTokens you added previously
// REPLACE with these:

export const setToken = (token, role) => {
  sessionStorage.setItem('token', token);   // per-tab, never shared
  sessionStorage.setItem('active_role', role);
};

export const getToken = () => {
  return sessionStorage.getItem('token');   // reads only THIS tab's token
};

export const clearTokens = () => {
  sessionStorage.clear();                   // only clears THIS tab
  localStorage.removeItem('token');         // remove old key if still there
  localStorage.removeItem('token_admin');   // remove old role-based keys
  localStorage.removeItem('token_business');
  localStorage.removeItem('active_role');
  localStorage.removeItem('authType');
  localStorage.removeItem('industry');
};