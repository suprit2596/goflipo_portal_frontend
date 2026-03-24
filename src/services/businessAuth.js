// // // // import { api } from './api';

// // // // export const businessAuthService = {
// // // //   // Business login (using username/email)
// // // //   businessLogin: async (username, password) => {
// // // //     try {
// // // //       const response = await api.post('/api/business/login', {
// // // //         username,
// // // //         password,
// // // //       });

// // // //       const { token, requiresPasswordChange, tempToken, business } = response.data;

// // // //       return { 
// // // //         success: true, 
// // // //         requiresPasswordChange,
// // // //         token: token || tempToken,
// // // //         business 
// // // //       };
// // // //     } catch (error) {
// // // //       return {
// // // //         success: false,
// // // //         error: error.message || 'Business login failed',
// // // //       };
// // // //     }
// // // //   },

// // // //   // Change password (for first login)
// // // //   changePassword: async (oldPassword, newPassword, confirmPassword, tokenType = 'temp') => {
// // // //     try {
// // // //       const endpoint = tokenType === 'temp' 
// // // //         ? '/api/business/change-password'  // POST for temp token
// // // //         : '/api/business/change-password'; // PUT for regular token

// // // //       const method = tokenType === 'temp' ? 'post' : 'put';
      
// // // //       const response = await api[method](endpoint, {
// // // //         oldPassword,
// // // //         newPassword,
// // // //         confirmPassword,
// // // //       });

// // // //       return { success: true, data: response.data };
// // // //     } catch (error) {
// // // //       return {
// // // //         success: false,
// // // //         error: error.message || 'Failed to change password',
// // // //       };
// // // //     }
// // // //   },

// // // //   // Get business profile
// // // //   getBusinessProfile: async () => {
// // // //     try {
// // // //       const response = await api.get('/api/business/profile');
// // // //       return { success: true, data: response.data };
// // // //     } catch (error) {
// // // //       return {
// // // //         success: false,
// // // //         error: error.message || 'Failed to fetch business profile',
// // // //       };
// // // //     }
// // // //   },
// // // // };

// // // import { api, tempApi } from './api';

// // // export const businessAuthService = {
// // //   // Business login (using username/email)
// // //   businessLogin: async (username, password) => {
// // //     try {
// // //       // Use tempApi to avoid auto-attaching regular token
// // //       const response = await tempApi.post('/api/business/login', {
// // //         username,
// // //         password,
// // //       });

// // //       const { token, requiresPasswordChange, tempToken, business } = response.data;

// // //       return { 
// // //         success: true, 
// // //         requiresPasswordChange,
// // //         token: token || tempToken,
// // //         business 
// // //       };
// // //     } catch (error) {
// // //       return {
// // //         success: false,
// // //         error: error.message || 'Business login failed',
// // //       };
// // //     }
// // //   },

// // //   // Change password with temp token (first login)
// // //   changePasswordWithTempToken: async (tempToken, newPassword, confirmPassword) => {
// // //     try {
// // //       const response = await tempApi.post(
// // //         '/api/business/change-password',
// // //         {
// // //           newPassword,
// // //           confirmPassword,
// // //         },
// // //         {
// // //           headers: {
// // //             Authorization: `Bearer ${tempToken}`,
// // //           },
// // //         }
// // //       );

// // //       return { success: true, data: response.data };
// // //     } catch (error) {
// // //       return {
// // //         success: false,
// // //         error: error.message || 'Failed to change password',
// // //       };
// // //     }
// // //   },

// // //   // Change password with regular token (after first login)
// // //   changePassword: async (oldPassword, newPassword, confirmPassword) => {
// // //     try {
// // //       const response = await api.put('/api/business/change-password', {
// // //         oldPassword,
// // //         newPassword,
// // //         confirmPassword,
// // //       });

// // //       return { success: true, data: response.data };
// // //     } catch (error) {
// // //       return {
// // //         success: false,
// // //         error: error.message || 'Failed to change password',
// // //       };
// // //     }
// // //   },

// // //   // Get business profile
// // //   getBusinessProfile: async () => {
// // //     try {
// // //       const response = await api.get('/api/business/profile');
// // //       return { success: true, data: response.data };
// // //     } catch (error) {
// // //       return {
// // //         success: false,
// // //         error: error.message || 'Failed to fetch business profile',
// // //       };
// // //     }
// // //   },
// // // };


// // import { api, tempApi } from './api';

// // export const businessAuthService = {
// //   // Business login (using username/email)
// //   businessLogin: async (username, password) => {
// //     console.log('🔑 Sending business login to /api/business/login');
// //     console.log('Username:', username);
    
// //     try {
// //       // Use tempApi to avoid auto-attaching regular token
// //       const response = await tempApi.post('/api/business/login', {
// //         username,
// //         password,
// //       });

// //       console.log('✅ Business login API response:');
// //       console.log('Full response:', response.data);
// //       console.log('Success:', response.data.success);
// //       console.log('Token exists:', !!response.data.token);
// //       console.log('Temp token exists:', !!response.data.tempToken);
// //       console.log('Requires password change:', response.data.requiresPasswordChange);
// //       console.log('Business data:', response.data.business);

// //       const { token, requiresPasswordChange, tempToken, business } = response.data;

// //       // Determine which token to use
// //       const actualToken = token || tempToken;
// //       console.log('🔐 Actual token to use:', actualToken ? `${actualToken.substring(0, 20)}...` : 'None');

// //       return { 
// //         success: true, 
// //         requiresPasswordChange,
// //         token: actualToken,
// //         business 
// //       };
// //     } catch (error) {
// //       console.error('❌ Business login API error:');
// //       console.error('Error:', error);
// //       console.error('Error message:', error.message);
// //       console.error('Response status:', error.response?.status);
// //       console.error('Response data:', error.response?.data);
      
// //       return {
// //         success: false,
// //         error: error.response?.data?.message || error.message || 'Business login failed',
// //       };
// //     }
// //   },

// //   // Change password with temp token (first login)
// //   changePasswordWithTempToken: async (tempToken, newPassword, confirmPassword) => {
// //     console.log('🔑 Changing password with temp token');
// //     console.log('Temp token length:', tempToken?.length || 0);
    
// //     try {
// //       const response = await tempApi.post(
// //         '/api/business/change-password',
// //         {
// //           newPassword,
// //           confirmPassword,
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${tempToken}`,
// //           },
// //         }
// //       );

// //       console.log('✅ Password change successful');
// //       console.log('Response:', response.data);

// //       return { success: true, data: response.data };
// //     } catch (error) {
// //       console.error('❌ Password change error:');
// //       console.error('Error:', error);
// //       console.error('Response:', error.response?.data);
      
// //       return {
// //         success: false,
// //         error: error.response?.data?.message || error.message || 'Failed to change password',
// //       };
// //     }
// //   },

// //   // Change password with regular token (after first login)
// //   changePassword: async (oldPassword, newPassword, confirmPassword) => {
// //     console.log('🔑 Changing password with regular token');
    
// //     try {
// //       const response = await api.put('/api/business/change-password', {
// //         oldPassword,
// //         newPassword,
// //         confirmPassword,
// //       });

// //       console.log('✅ Regular password change successful');
      
// //       return { success: true, data: response.data };
// //     } catch (error) {
// //       console.error('❌ Regular password change error:', error);
// //       return {
// //         success: false,
// //         error: error.message || 'Failed to change password',
// //       };
// //     }
// //   },

// //   // Get business profile
// //   getBusinessProfile: async () => {
// //     console.log('📊 Fetching business profile...');
    
// //     try {
// //       const response = await api.get('/api/business/profile');
// //       console.log('✅ Business profile fetched');
      
// //       return { success: true, data: response.data };
// //     } catch (error) {
// //       console.error('❌ Business profile error:', error);
// //       return {
// //         success: false,
// //         error: error.message || 'Failed to fetch business profile',
// //       };
// //     }
// //   },
// // };

// import { api, tempApi } from './api';

// export const businessAuthService = {
//   // Business login (using username/email)
//   businessLogin: async (username, password) => {
//     console.log('🔑 [BUSINESS AUTH] Sending login to /api/business/login');
//     console.log('👤 Username:', username);
    
//     try {
//       // Use tempApi to avoid auto-attaching regular token
//       const response = await tempApi.post('/api/business/login', {
//         username,
//         password,
//       });

//       console.log('✅ [BUSINESS AUTH] Login API response:');
//       console.log('📋 Full response:', JSON.stringify(response.data, null, 2));
      
//       const { token, requiresPasswordChange, tempToken, business } = response.data;

//       console.log('🔍 [BUSINESS AUTH] Response analysis:');
//       console.log('   token exists:', !!token);
//       console.log('   token value:', token);
//       console.log('   tempToken exists:', !!tempToken);
//       console.log('   tempToken value:', tempToken);
//       console.log('   requiresPasswordChange:', requiresPasswordChange);
//       console.log('   business:', business);

//       // Determine which token to use
//       let actualToken = null;
      
//       if (requiresPasswordChange) {
//         console.log('🔄 [BUSINESS AUTH] Password change required, using tempToken');
//         actualToken = tempToken;
//       } else {
//         console.log('✅ [BUSINESS AUTH] Regular login, using token');
//         actualToken = token;
//       }

//       console.log('🔐 [BUSINESS AUTH] Final token to return:');
//       console.log('   Value:', actualToken);
//       console.log('   Type:', typeof actualToken);
//       console.log('   Length:', actualToken?.length);

//       if (!actualToken && !requiresPasswordChange) {
//         console.error('❌ [BUSINESS AUTH] No token for regular login!');
//         throw new Error('No authentication token received');
//       }

//       return { 
//         success: true, 
//         requiresPasswordChange,
//         token: actualToken,
//         business 
//       };
//     } catch (error) {
//       console.error('❌ [BUSINESS AUTH] Login API error:');
//       console.error('   Error:', error);
//       console.error('   Message:', error.message);
//       console.error('   Status:', error.response?.status);
//       console.error('   Response data:', error.response?.data);
      
//       return {
//         success: false,
//         error: error.response?.data?.message || error.message || 'Business login failed',
//       };
//     }
//   },

//   // Change password with temp token (first login)
//   changePasswordWithTempToken: async (tempToken, newPassword, confirmPassword) => {
//     console.log('🔑 [BUSINESS AUTH] Changing password with temp token');
//     console.log('📏 Temp token length:', tempToken?.length);
    
//     try {
//       const response = await tempApi.post(
//         '/api/business/change-password',
//         {
//           newPassword,
//           confirmPassword,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${tempToken}`,
//           },
//         }
//       );

//       console.log('✅ [BUSINESS AUTH] Password change successful');
//       console.log('📋 Response:', response.data);

//       return { success: true, data: response.data };
//     } catch (error) {
//       console.error('❌ [BUSINESS AUTH] Password change error:', error);
      
//       return {
//         success: false,
//         error: error.response?.data?.message || error.message || 'Failed to change password',
//       };
//     }
//   },

//   // Change password with regular token (after first login)
//   changePassword: async (oldPassword, newPassword, confirmPassword) => {
//     console.log('🔑 [BUSINESS AUTH] Changing password with regular token');
    
//     try {
//       const response = await api.put('/api/business/change-password', {
//         oldPassword,
//         newPassword,
//         confirmPassword,
//       });

//       console.log('✅ [BUSINESS AUTH] Regular password change successful');
      
//       return { success: true, data: response.data };
//     } catch (error) {
//       console.error('❌ [BUSINESS AUTH] Regular password change error:', error);
//       return {
//         success: false,
//         error: error.message || 'Failed to change password',
//       };
//     }
//   },

//   // Get business profile
//   getBusinessProfile: async () => {
//     console.log('📊 [BUSINESS AUTH] Fetching business profile...');
    
//     try {
//       const response = await api.get('/api/business/profile');
//       console.log('✅ [BUSINESS AUTH] Business profile fetched');
      
//       return { success: true, data: response.data };
//     } catch (error) {
//       console.error('❌ [BUSINESS AUTH] Business profile error:', error);
//       return {
//         success: false,
//         error: error.message || 'Failed to fetch business profile',
//       };
//     }
//   },
// };

import { api, tempApi } from './api';
import { setToken } from '../utils/auth';

export const businessAuthService = {
  // Business login (using email only)
  businessLogin: async (email, password) => {
    console.log('🔑 [BUSINESS AUTH] Sending login to /api/business/login');
    console.log('📧 Email:', email);
    
    try {
      const response = await tempApi.post('/api/business/login', {
        email,
        password,
      });

      console.log('✅ [BUSINESS AUTH] Login API response:', response.data);
      
      const { token, requiresPasswordChange, tempToken, business } = response.data;

      localStorage.setItem("authType",business.authType)
      localStorage.setItem("industry",business.industry)

     
      // Determine which token to use
      let actualToken = null;
      
       if (!requiresPasswordChange && actualToken) {
      setToken(actualToken, 'business');
      }
      
      if (requiresPasswordChange) {
        console.log('🔄 [BUSINESS AUTH] Password change required, using tempToken');
        actualToken = tempToken;
      } else {
        console.log('✅ [BUSINESS AUTH] Regular login, using token');
        actualToken = token;
      }

      if (!actualToken && !requiresPasswordChange) {
        console.error('❌ [BUSINESS AUTH] No token for regular login!');
        throw new Error('No authentication token received');
      }

      return { 
        success: true, 
        requiresPasswordChange,
        token: actualToken,
        business 
      };
    } catch (error) {
      console.error('❌ [BUSINESS AUTH] Login API error:', error.response?.data || error.message);
      
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Business login failed',
      };
    }
  },

  // Change password with temp token (first login)
  changePasswordWithTempToken: async (tempToken, oldPassword, newPassword, confirmPassword) => {
    console.log('🔑 [BUSINESS AUTH] Changing password with temp token');
    
    try {
      const response = await tempApi.put(
        '/api/business/change-password',
        {
          oldPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${tempToken}`,
          },
        }
      );

      console.log('✅ [BUSINESS AUTH] Password change successful:', response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('❌ [BUSINESS AUTH] Password change error:', error.response?.data || error.message);
      
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to change password',
      };
    }
  },

  // Change password with regular token (after first login)
  changePassword: async (oldPassword, newPassword, confirmPassword) => {
    console.log('🔑 [BUSINESS AUTH] Changing password with regular token');
    
    try {
      const response = await api.put('/api/business/change-password', {
        oldPassword,
        newPassword,
        confirmPassword,
      });

      console.log('✅ [BUSINESS AUTH] Regular password change successful:', response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('❌ [BUSINESS AUTH] Regular password change error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to change password',
      };
    }
  },

  // Get business profile
  getBusinessProfile: async () => {
    console.log('📊 [BUSINESS AUTH] Fetching business profile...');
    
    try {
      const response = await api.get('/api/business/profile');
      console.log('✅ [BUSINESS AUTH] Business profile fetched');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('❌ [BUSINESS AUTH] Business profile error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to fetch business profile',
      };
    }
  },

  // Get business dashboard
  getBusinessDashboard: async () => {
    console.log('📊 [BUSINESS AUTH] Fetching business dashboard...');
    
    try {
      const response = await api.get('/api/business/dashboard');
      console.log('✅ [BUSINESS AUTH] Business dashboard fetched');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('❌ [BUSINESS AUTH] Business dashboard error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to fetch dashboard data',
      };
    }
  },
  
// Add this ONE function to existing businessAuth.js
  getBusinessTransactions: async (businessId, event = null, page = 1, limit = 10) => {
  console.log('💳 [BUSINESS AUTH] Fetching transactions for business:', businessId);
  
  try {
    const params = {
      businessId,
      page,
      limit
    };
    
    // Add event if provided (and not 'ALL')
    if (event && event !== 'ALL') {
      params.event = event;
    }
    
    console.log('📤 Sending params:', params);
    
    // Use GET request with URL params
    const response = await api.get('/api/transactions', { params });
    console.log('✅ Transactions API response:', response.data);
    
    if (response.data.success) {
      return {
        success: true,
        data: response.data.data.transactions,
        pagination: response.data.data.pagination
      };
    }
    
    return {
      success: false,
      error: response.data.message || 'Failed to fetch transactions'
    };
  } catch (error) {
    console.error('❌ Get transactions error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch transactions'
    };
  }
},
};