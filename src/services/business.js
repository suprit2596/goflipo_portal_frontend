// // // import { api } from './api';

// // // export const businessService = {
// // //   getDashboard: (tenantId) => api.get(`/api/business/dashboard`),

// // //   getBusinessDetails: () => api.get('/api/business/details'),

// // //   getApplications: () => api.get('/api/business/applications'),

// // //   getApplication: (appId) => api.get(`/api/business/applications/${appId}`),

// // //   updateApplication: (appId, data) => 
// // //     api.put(`/api/business/applications/${appId}`, data),

// // //   getAppToken: (appId) => 
// // //     api.post(`/api/business/applications/${appId}/token`),
// // // };

// // import { api } from './api';

// // export const businessService = {
// //   // Get business dashboard data - use profile as fallback
// //   getDashboard: async () => {
// //     console.log('📊 Fetching dashboard data...');
// //     try {
// //       // Try to get business profile (this endpoint exists)
// //       const response = await api.get('/api/business/profile');
// //       console.log('✅ Profile response:', response.data);
      
// //       if (response.data.success && response.data.data) {
// //         const profile = response.data.data;
        
// //         // Create dashboard data from profile
// //         return {
// //           businessName: profile.businessName,
// //           industry: profile.industry,
// //           contactEmail: profile.email || profile.contactEmail,
// //           username: profile.username,
// //           totalApplications: 0,
// //           applications: [],
// //           accountStatus: profile.accountStatus || 'ACTIVE',
// //           createdAt: profile.createdAt
// //         };
// //       }
      
// //       throw new Error('Invalid profile response');
      
// //     } catch (error) {
// //       console.error('❌ Dashboard fetch error:', error);
      
// //       // Return mock data as fallback
// //       const user = JSON.parse(localStorage.getItem('user') || '{}');
// //       return {
// //         businessName: user.businessName || 'Your Business',
// //         industry: user.industry || 'Not specified',
// //         contactEmail: user.email || 'Not available',
// //         username: user.username || 'Not available',
// //         totalApplications: 0,
// //         applications: [],
// //         accountStatus: 'ACTIVE',
// //         createdAt: new Date().toISOString()
// //       };
// //     }
// //   },


// //   // Use the actual profile endpoint
// //   getBusinessDetails: () => api.get('/api/business/profile').then(res => res.data.data),

// //   // Try to get applications, fallback gracefully
// //   getApplications: async () => {
// //     try {
// //       const response = await api.get('/api/business/applications');
// //       return response.data?.data || response.data?.applications || [];
// //     } catch (error) {
// //       console.log('Applications endpoint not available');
// //       return [];
// //     }
// //   },

// //   getApplication: (appId) => api.get(`/api/business/applications/${appId}`),

// //   updateApplication: (appId, data) => 
// //     api.put(`/api/business/applications/${appId}`, data),

// //   getAppToken: (appId) => 
// //     api.post(`/api/business/applications/${appId}/token`),
// // };

// import { api } from './api';

// export const businessService = {
//   // Get business dashboard data - use profile as fallback
//   getDashboard: async () => {
//     console.log('📊 [BUSINESS SERVICE] Fetching dashboard data...');
    
//     try {
//       // Try to get business profile (this endpoint exists)
//       console.log('📞 [BUSINESS SERVICE] Calling /api/business/profile');
//       const response = await api.get('/api/business/profile');
      
//       console.log('✅ [BUSINESS SERVICE] Profile API response:', response);
//       console.log('📋 Response data:', response.data);
      
//       if (response.data.success && response.data.data) {
//         const profile = response.data.data;
        
//         console.log('👤 [BUSINESS SERVICE] Profile data:', profile);
        
//         // Create dashboard data from profile
//         const dashboardData = {
//           businessName: profile.businessName || 'Your Business',
//           industry: profile.industry || 'Not specified',
//           contactEmail: profile.email || profile.contactEmail || 'Not available',
//           username: profile.username || 'Not available',
//           totalApplications: 0,
//           applications: [],
//           accountStatus: profile.accountStatus || 'ACTIVE',
//           createdAt: profile.createdAt || new Date().toISOString()
//         };
        
//         console.log('📊 [BUSINESS SERVICE] Created dashboard data:', dashboardData);
//         return dashboardData;
//       } else {
//         console.warn('⚠️ [BUSINESS SERVICE] Invalid profile response format:', response.data);
//         throw new Error('Invalid profile response format');
//       }
      
//     } catch (error) {
//       console.error('❌ [BUSINESS SERVICE] Dashboard fetch error:', error);
//       console.error('🔍 Error details:', {
//         message: error.message,
//         response: error.response?.data,
//         status: error.response?.status,
//         url: error.config?.url
//       });
      
//       // Return mock data as fallback
//       const userStr = localStorage.getItem('user');
//       let user = {};
      
//       try {
//         if (userStr) {
//           user = JSON.parse(userStr);
//         }
//       } catch (parseError) {
//         console.error('❌ [BUSINESS SERVICE] Error parsing user from localStorage:', parseError);
//       }
      
//       const fallbackData = {
//         businessName: user.businessName || user.username || 'Your Business',
//         industry: user.industry || 'Not specified',
//         contactEmail: user.email || 'Not available',
//         username: user.username || 'Not available',
//         totalApplications: 0,
//         applications: [],
//         accountStatus: 'ACTIVE',
//         createdAt: new Date().toISOString()
//       };
      
//       console.log('🔄 [BUSINESS SERVICE] Using fallback data:', fallbackData);
//       return fallbackData;
//     }
//   },

//   // Use the actual profile endpoint
//   getBusinessDetails: async () => {
//     try {
//       const response = await api.get('/api/business/profile');
//       return response.data.data;
//     } catch (error) {
//       console.error('❌ [BUSINESS SERVICE] getBusinessDetails error:', error);
//       throw error;
//     }
//   },

//   // Try to get applications, fallback gracefully
//   getApplications: async () => {
//     try {
//       const response = await api.get('/api/business/applications');
//       return response.data?.data || response.data?.applications || [];
//     } catch (error) {
//       console.log('⚠️ [BUSINESS SERVICE] Applications endpoint not available:', error.message);
//       return [];
//     }
//   },

//   getApplication: (appId) => api.get(`/api/business/applications/${appId}`),

//   updateApplication: (appId, data) => 
//     api.put(`/api/business/applications/${appId}`, data),

//   getAppToken: (appId) => 
//     api.post(`/api/business/applications/${appId}/token`),
// };

import { api } from './api';

export const businessService = {
  // Get business dashboard data - works without backend API
  getDashboard: async () => {
    console.log('📊 [BUSINESS SERVICE] Fetching dashboard from API');
    
    try {
      // Try to get business profile from backend
      const response = await api.get('/api/business/profile');
      console.log('✅ API response:', response.data);

      if (response.data.success && response.data.data) {
        // Return the business data directly
        return response.data.data;
      } else {
        throw new Error('Invalid API response');
      }
    } catch (error) {
      console.warn('⚠️ API failed, falling back to localStorage:', error.message);
      
      // Fallback to localStorage (for development/offline)
      const userStr = localStorage.getItem('user');
      const authType = localStorage.getItem('authType');
      let user = {};
      if (userStr) {
        try {
          user = JSON.parse(userStr);
        } catch (e) {
          console.error('Error parsing user:', e);
        }
      }

      return {
        businessName: user.businessName || 'Your Business',
        industry: localStorage.getItem('industry') || user.industry || 'Not specified',
        contactEmail: user.username || 'Not available',
        username: user.username || 'Not available',
        authType: authType || 'IN_APP',
        accountStatus: user.accountStatus || 'ACTIVE',
        createdAt: user.createdAt || new Date().toISOString(),
        totalApplications: 0,
        applications: []
      };
    }
  },

  // Get business profile - try API but fallback to localStorage
  getBusinessDetails: async () => {
    console.log('📊 [BUSINESS SERVICE] Getting business details');
    
    try {
      // Try API first
      const response = await api.get('/api/business/profile');
      console.log('✅ API response for profile:', response.data);
      
      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      throw new Error('Invalid API response');
      
    } catch (apiError) {
      console.log('⚠️ API failed, using localStorage:', apiError.message);
      
      // Fallback to localStorage
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          return {
            businessName: user.businessName,
            industry: user.industry,
            email: user.email,
            username: user.username,
            accountStatus: user.accountStatus,
            createdAt: user.createdAt
          };
        } catch (parseError) {
          console.error('Error parsing user:', parseError);
        }
      }
      
      // Ultimate fallback
      return {
        businessName: 'Your Business',
        industry: 'Not specified',
        email: 'Not available',
        username: 'Not available',
        accountStatus: 'ACTIVE',
        createdAt: new Date().toISOString()
      };
    }
  },

  // Try to get applications, fallback gracefully
  getApplications: async () => {
    try {
      const response = await api.get('/api/business/applications');
      return response.data?.data || response.data?.applications || [];
    } catch (error) {
      console.log('Applications endpoint not available');
      return [];
    }
  },

  getApplication: (appId) => api.get(`/api/business/applications/${appId}`),

  updateApplication: (appId, data) => 
    api.put(`/api/business/applications/${appId}`, data),

  getAppToken: (appId) => 
    api.post(`/api/business/applications/${appId}/token`),
};