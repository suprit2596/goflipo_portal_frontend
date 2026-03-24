// // // // // import { api } from './api';

// // // // // export const authService = {
// // // // //   login: async (email, password) => {
// // // // //     // const response = await api.post('/auth/login', { email, password });
// // // // //     // return response;
// // // // //     try {
// // // // //       const response = await api.post('/auth/login', { email, password });
// // // // //       return response;
// // // // //     } catch (error) {
// // // // //       // Re-throw the error so AuthContext can handle it
// // // // //       throw error;
// // // // //     }
// // // // //   },

// // // // //   createAdmin: async (userData) => {
// // // // //     const response = await api.post('/auth/setup/admin', userData);
// // // // //     return response;
// // // // //   },

// // // // //   signup: async (userData) => {
// // // // //     const response = await api.post('/auth/signup', userData);
// // // // //     return response;
// // // // //   },

// // // // //   logout: () => {
// // // // //     localStorage.removeItem('token');
// // // // //     localStorage.removeItem('user');
// // // // //   },

// // // // //   getCurrentUser: () => {
// // // // //     const user = localStorage.getItem('user');
// // // // //     return user ? JSON.parse(user) : null;
// // // // //   },

// // // // //   getToken: () => {
// // // // //     return localStorage.getItem('token');
// // // // //   }
// // // // // };

// // // // // services/auth.js
// // // // // import { api } from './api'; // your axios instance

// // // // // export const authService = {
// // // // //   login: async (email, password) => {
// // // // //     try {
// // // // //       const response = await api.post('api/auth/login', { email, password });

// // // // //       // API returns token + user info
// // // // //       const { token, ...user } = response.data;

// // // // //       return { success: true, user: { ...user, token } };
// // // // //     } catch (error) {
// // // // //       let errorMessage = 'Login failed. Please try again.';

// // // // //       if (error.response) {
// // // // //         const { status, data } = error.response;
// // // // //         if (status === 401) errorMessage = data?.message || 'Invalid email or password';
// // // // //         else if (status === 404) errorMessage = data?.message || 'User not found';
// // // // //         else if (status >= 500) errorMessage = 'Server error. Please try again later.';
// // // // //       } else if (error.request) {
// // // // //         errorMessage = 'No response from server.';
// // // // //       } else {
// // // // //         errorMessage = error.message;
// // // // //       }

// // // // //       return { success: false, error: errorMessage };
// // // // //     }
// // // // //   },
// // // // // };

// // // // import { api } from './api';

// // // // export const authService = {
// // // //   login: async (email, password) => {
// // // //     try {
// // // //       const response = await api.post('/api/auth/login', {
// // // //         email,
// // // //         password,
// // // //       });

// // // //       const { token, user } = response.data;

// // // //       return { success: true, user: { ...user, token } };
// // // //     } catch (error) {
// // // //       return {
// // // //         success: false,
// // // //         error:
// // // //           error.response?.data?.message ||
// // // //           'Login failed',
// // // //       };
// // // //     }
// // // //   },
// // // // };
// // // import { api } from './api';
// // // import { businessAuthService } from './businessAuth';

// // // export const authService = {
// // //   // Admin login
// // //   login: async (email, password) => {
// // //     try {
// // //       const response = await api.post('/api/auth/login', {
// // //         email,
// // //         password,
// // //       });

// // //       const { token, user } = response.data;

// // //       return { success: true, user: { ...user, token } };
// // //     } catch (error) {
// // //       return {
// // //         success: false,
// // //         error: error.message || 'Login failed',
// // //       };
// // //     }
// // //   },

// // //   // Business login
// // //   businessLogin: async (username, password) => {
// // //     return await businessAuthService.businessLogin(username, password);
// // //   },

// // //   // Common logout
// // //   logout: () => {
// // //     localStorage.clear();
// // //   },
// // // };

// // import { api, tempApi } from './api';
// // import { businessAuthService } from './businessAuth';

// // export const authService = {
// //   // Admin login (regular token)
// //   login: async (email, password) => {
// //     try {
// //       const response = await tempApi.post('/api/auth/login', {
// //         email,
// //         password,
// //       });

// //       const { token, user } = response.data;

// //       return { success: true, user: { ...user, token } };
// //     } catch (error) {
// //       return {
// //         success: false,
// //         error: error.message || 'Login failed',
// //       };
// //     }
// //   },

// //   // Business login (may return temp token)
// //   businessLogin: async (username, password) => {
// //     return await businessAuthService.businessLogin(username, password);
// //   },

// //   // Common logout
// //   logout: () => {
// //     localStorage.clear();
// //   },
// // };

// import { api, tempApi } from './api';
// import { businessAuthService } from './businessAuth';

// export const authService = {
//   // Admin login (regular token)
//   login: async (email, password) => {
//     console.log('📞 Making admin login request...');
//     try {
//       const response = await tempApi.post('/api/auth/login', {
//         email,
//         password,
//       });

//       console.log('✅ Admin login response received');
//       console.log('Response data:', response.data);
      
//       const { token, user } = response.data;
      
//       if (!token) {
//         console.error('❌ No token in admin login response');
//         throw new Error('No authentication token received');
//       }
      
//       console.log('📏 Admin token length:', token.length);
//       console.log('👤 Admin user data:', user);

//       return { success: true, user: { ...user, token } };
//     } catch (error) {
//       console.error('❌ Admin login API error:', error);
//       console.error('Error response:', error.response?.data);
//       return {
//         success: false,
//         error: error.response?.data?.message || error.message || 'Login failed',
//       };
//     }
//   },

//   // Business login (may return temp token)
//   businessLogin: async (username, password) => {
//     console.log('📞 Making business login request...');
//     const result = await businessAuthService.businessLogin(username, password);
    
//     if (result.success) {
//       console.log('✅ Business login service returned success');
//       console.log('Token exists:', !!result.token);
//       console.log('Token length:', result.token?.length || 0);
//       console.log('Requires password change:', result.requiresPasswordChange);
//       console.log('Business data:', result.business);
//     } else {
//       console.error('❌ Business login service failed:', result.error);
//     }
    
//     return result;
//   },

//   // Common logout
//   logout: () => {
//     console.log('🧹 Clearing localStorage...');
//     localStorage.clear();
//   },
// };

import { api, tempApi } from './api';
import { businessAuthService } from './businessAuth';
import { setToken } from '../utils/auth';

export const authService = {
  // Admin login (regular token)
  login: async (email, password) => {
    console.log('📞 [AUTH] Making admin login request...');
    console.log('📧 Email:', email);
    
    try {
      const response = await tempApi.post('/api/auth/login', {
        email,
        password,
      });

      console.log('✅ [AUTH] Admin login response received');
      console.log('📋 Full response:', JSON.stringify(response.data, null, 2));
      
      const { token, user } = response.data;
      
      // DEBUG: Log token details
      console.log('🔐 [AUTH] Token from response:', token);
      console.log('📏 [AUTH] Token length:', token?.length);
      console.log('🔍 [AUTH] Token type:', typeof token);
      console.log('👤 [AUTH] User from response:', user);

      if (!token) {
        console.error('❌ [AUTH] NO TOKEN in admin login response!');
        throw new Error('No authentication token received from server');
      }
      
      if (typeof token !== 'string') {
        console.error('❌ [AUTH] Token is not a string:', typeof token);
        throw new Error(`Invalid token type: ${typeof token}`);
      }
      
      if (token === 'undefined') {
        console.error('❌ [AUTH] Token is literal string "undefined"');
        throw new Error('Server returned invalid token');
      }
      setToken(token, 'admin');
      return { success: true, user: { ...user, token } };
    } catch (error) {
      console.error('❌ [AUTH] Admin login API error:', error);
      console.error('📡 Error response:', error.response?.data);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Login failed',
      };
    }
  },

  // Business login (may return temp token)
  // Business login (may return temp token)
businessLogin: async (username, password) => {
  console.log('📞 [AUTH] Calling businessAuthService.businessLogin...');
  console.log('👤 Username:', username);
  
  const result = await businessAuthService.businessLogin(username, password);
  
  console.log('📋 [AUTH] businessAuthService result:', result);
  
  if (result.success) {
    console.log('✅ [AUTH] Business login service returned success');
    console.log('🔐 Token exists:', !!result.token);
    console.log('📏 Token length:', result.token?.length);
    console.log('🔍 Token value:', result.token);
    console.log('🔄 Requires password change:', result.requiresPasswordChange);
    console.log('🏢 Business data:', result.business);
    
    // FIX: If user is undefined but business exists, create user
    if (!result.user && result.business) {
      result.user = {
        id: result.business.id,
        businessId: result.business.businessId,
        businessName: result.business.businessName,
        username: result.business.username,
        email: result.business.email,
        role: 'business'
      };
      console.log('🔄 [AUTH] Created user from business:', result.user);
    }
  } else {
    console.error('❌ [AUTH] Business login service failed:', result.error);
  }
  
  return result;
},

  // Common logout
  // logout: () => {
  //   console.log('🧹 [AUTH] Clearing localStorage...');
  //   localStorage.clear();
  // },
  logout: () => {
  console.log('🧹 [AUTH] Clearing localStorage...');
  localStorage.removeItem('token_admin');
  localStorage.removeItem('token_business');
  localStorage.removeItem('active_role');
  localStorage.removeItem('authType');
  localStorage.removeItem('industry');
},
};