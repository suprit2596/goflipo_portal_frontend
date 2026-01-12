// // import { api } from './api';

// // export const adminService = {
// //   // Business operations
// //   getDashboard: () => api.get('/admin/dashboard'),
  
// //   getAllBusinesses: () => api.get('/admin/businesses'),
  
// //   getBusiness: (tenantId) => api.get(`/admin/business/${tenantId}`),
  
// //   createBusiness: (businessData) => api.post('/admin/business', businessData),
  
// //   updateBusiness: (tenantId, businessData) => 
// //     api.put(`/admin/business/${tenantId}`, businessData),
  
// //   deleteBusiness: (tenantId) => api.delete(`/admin/business/${tenantId}`),

// //   // Application operations
// //   createApplication: (tenantId, applicationData) => 
// //     api.post(`/admin/business/${tenantId}/applications`, applicationData),

// //   getApplications: (tenantId) => 
// //     api.get(`/admin/business/${tenantId}/applications`),

// //   // User operations
// //   createBusinessUser: (tenantId, userData) => 
// //     api.post(`/admin/business/${tenantId}/users`, userData),

// //   getBusinessUsers: (tenantId) => 
// //     api.get(`/admin/business/${tenantId}/users`),

// //   // Statistics
// //   getBusinessStats: () => api.get('/admin/stats/business'),
  
// //   getApplicationStats: () => api.get('/admin/stats/applications'),
// // };
// // import { api } from './api';

// // export const adminService = {
// //   // Business operations
// //   getDashboard: () => api.get('/admin/dashboard'),
  
// //   getAllBusinesses: () => api.get('/admin/businesses'),
  
// //   getBusiness: (tenantId) => api.get(`/admin/business/${tenantId}`),
  
// //   createBusiness: (businessData) => api.post('/admin/business', businessData),
  
// //   updateBusiness: (tenantId, businessData) => 
// //     api.put(`/admin/business/${tenantId}`, businessData),
  
// //   deleteBusiness: (tenantId) => api.delete(`/admin/business/${tenantId}`),

// //   // Application operations
// //   createApplication: (tenantId, applicationData) => 
// //     api.post(`/admin/business/${tenantId}/applications`, applicationData),

// //   getBusinessApplications: (tenantId) => 
// //     api.get(`/admin/business/${tenantId}/applications`),

// //   getApplications: () => api.get('/admin/applications'),

// //   getApplicationToken: (appId) => 
// //     api.post(`/admin/applications/${appId}/token`),

// //   // User operations
// //   createBusinessUser: (tenantId, userData) => 
// //     api.post(`/admin/business/${tenantId}/users`, userData),

// //   getBusinessUsers: (tenantId) => 
// //     api.get(`/admin/business/${tenantId}/users`),

// //   // Statistics
// //   getBusinessStats: () => api.get('/admin/stats/business'),
  
// //   getApplicationStats: () => api.get('/admin/stats/applications'),
// // };

// import { api } from './api';

// export const adminService = {
//   // Business CRUD
//   getDashboard: () => api.get('/admin/dashboard'),
  
//   // getAllBusinesses: () => api.get('/admin/businesses'),
  
//   // getBusiness: (tenantId) => api.get(`/admin/business/${tenantId}`),
  
//   // createBusiness: (businessData) => api.post('/admin/business', businessData),
  
//   // getAllBusinesses: () => 
//   //   api.get('/api/businesses').then(res => res.data),
//     // getAllBusinesses: (page = 0, limit = 10, search = '', status = '') =>
//     // api.get("/api/businesses", {
//     //   params: {
//     //     page: page + 1, // backend is 1-based
//     //     limit,
//     //     search,
//     //     status: status !== 'ALL' ? status : ''
//     //   },
//     // }).then(res => res.data),

//     // getBusiness: (id) => 
//     //   api.get(`/api/business/${id}`).then(res => res.data),

//     // createBusiness: (businessData) => 
//     //   api.post('/api/business', businessData)
//     //     .then(res => res.data)
//     //     .catch(error => {
//     //       // Extract the actual error message from 
//     //       const errorMessage = error.response?.data?.error || 
//     //                           error.response?.data?.message || 
//     //                           error.message;
//     //       throw new Error(errorMessage);
//     //     }),
  
//   getAllBusinesses: (page = 0, limit = 10, search = '', status = '') =>
//     api
//       .get('/api/businesses', {
//         params: {
//           page: page + 1,
//           limit,
//           search,
//           status: status === 'ALL' ? '' : status,
//         },
//       })
//       .then((res) => res.data),

//   getBusiness: (id) =>
//     api.get(`/api/business/${id}`).then((res) => res.data),

//   createBusiness: (businessData) =>
//     api.post('/api/business', businessData).then((res) => res.data),


//   updateBusiness: (tenantId, businessData) => 
//     api.put(`/admin/business/${tenantId}`, businessData),
  
//   deleteBusiness: (tenantId) => api.delete(`/admin/business/${tenantId}`),

//   // Application CRUD
//   createApplication: (tenantId, applicationData) => 
//     api.post(`/admin/business/${tenantId}/applications`, applicationData),

//   getBusinessApplications: (tenantId) => 
//     api.get(`/admin/business/${tenantId}/applications`),

//   getApplication: (appId) => api.get(`/admin/applications/${appId}`),

//   updateApplication: (appId, applicationData) => 
//     api.put(`/admin/applications/${appId}`, applicationData),

//   deleteApplication: (appId) => api.delete(`/admin/applications/${appId}`),

//   getApplications: () => api.get('/admin/applications'),

//   getApplicationToken: (appId) => 
//     api.post(`/admin/applications/${appId}/token`),

//   // User operations
//   createBusinessUser: (tenantId, userData) => 
//     api.post(`/admin/business/${tenantId}/users`, userData),

//   getBusinessUsers: (tenantId) => 
//     api.get(`/admin/business/${tenantId}/users`),

  

//  // Optional: Add these if your backend supports them
//   deleteUser: (userId) => 
//     api.delete(`/admin/users/${userId}`),
  
//   resetUserPassword: (userId) => 
//     api.post(`/admin/users/${userId}/reset-password`),
  
//   updateUser: (userId, userData) => 
//     api.put(`/admin/users/${userId}`, userData),

//  getBusinessUsers: (tenantId) => 
//     api.get(`/admin/business/${tenantId}/users`),
  
//   getUser: (userId) => 
//     api.get(`/admin/users/${userId}`),
  
//   updateUser: (userId, userData) => 
//     api.put(`/admin/users/${userId}`, userData),
  
//   deleteUser: (userId) => 
//     api.delete(`/admin/users/${userId}`),
  
//   resetUserPassword: (userId) => 
//     api.post(`/admin/users/${userId}/reset-password`),
  
//   updateUserStatus: (userId, status) => 
//     api.put(`/admin/users/${userId}/status`, { status }),
// };


import { api } from './api';

export const adminService = {
  getDashboard: () => api.get('/admin/dashboard'),

  getAllBusinesses: (page = 0, limit = 10, search = '', status = '') =>
    api
      .get('/api/businesses', {
        params: {
          page: page + 1,
          limit,
          search,
          status: status === 'ALL' ? '' : status,
        },
      })
      .then((res) => res.data),

  getBusiness: (id) =>
    api.get(`/api/business/${id}`).then((res) => res.data),

  createBusiness: (businessData) =>
    api.post('/api/business', businessData).then((res) => res.data),

  updateBusiness: (tenantId, businessData) => 
    api.put(`/admin/business/${tenantId}`, businessData),

  deleteBusiness: (tenantId) => api.delete(`/admin/business/${tenantId}`),

  // 🔐 Fetch decrypted secret key
  getBusinessSecret: (id) =>
    api.get(`/api/business/${id}/secret`).then(res => res.data),

  // Application CRUD
  createApplication: (tenantId, applicationData) => 
    api.post(`/admin/business/${tenantId}/applications`, applicationData),

  getBusinessApplications: (tenantId) => 
    api.get(`/admin/business/${tenantId}/applications`),

  getApplication: (appId) => api.get(`/admin/applications/${appId}`),

  updateApplication: (appId, applicationData) => 
    api.put(`/admin/applications/${appId}`, applicationData),

  deleteApplication: (appId) => api.delete(`/admin/applications/${appId}`),

  getApplications: () => api.get('/admin/applications'),

  getApplicationToken: (appId) => 
    api.post(`/admin/applications/${appId}/token`),

  createBusinessUser: (tenantId, userData) => 
    api.post(`/admin/business/${tenantId}/users`, userData),

  getBusinessUsers: (tenantId) => 
    api.get(`/admin/business/${tenantId}/users`),

  deleteUser: (userId) => 
    api.delete(`/admin/users/${userId}`),

  resetUserPassword: (userId) => 
    api.post(`/admin/users/${userId}/reset-password`),

  updateUser: (userId, userData) => 
    api.put(`/admin/users/${userId}`, userData),

  updateUserStatus: (userId, status) => 
    api.put(`/admin/users/${userId}/status`, { status }),
};
