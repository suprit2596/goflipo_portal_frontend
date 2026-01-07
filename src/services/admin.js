// import { api } from './api';

// export const adminService = {
//   // Business operations
//   getDashboard: () => api.get('/admin/dashboard'),
  
//   getAllBusinesses: () => api.get('/admin/businesses'),
  
//   getBusiness: (tenantId) => api.get(`/admin/business/${tenantId}`),
  
//   createBusiness: (businessData) => api.post('/admin/business', businessData),
  
//   updateBusiness: (tenantId, businessData) => 
//     api.put(`/admin/business/${tenantId}`, businessData),
  
//   deleteBusiness: (tenantId) => api.delete(`/admin/business/${tenantId}`),

//   // Application operations
//   createApplication: (tenantId, applicationData) => 
//     api.post(`/admin/business/${tenantId}/applications`, applicationData),

//   getApplications: (tenantId) => 
//     api.get(`/admin/business/${tenantId}/applications`),

//   // User operations
//   createBusinessUser: (tenantId, userData) => 
//     api.post(`/admin/business/${tenantId}/users`, userData),

//   getBusinessUsers: (tenantId) => 
//     api.get(`/admin/business/${tenantId}/users`),

//   // Statistics
//   getBusinessStats: () => api.get('/admin/stats/business'),
  
//   getApplicationStats: () => api.get('/admin/stats/applications'),
// };
// import { api } from './api';

// export const adminService = {
//   // Business operations
//   getDashboard: () => api.get('/admin/dashboard'),
  
//   getAllBusinesses: () => api.get('/admin/businesses'),
  
//   getBusiness: (tenantId) => api.get(`/admin/business/${tenantId}`),
  
//   createBusiness: (businessData) => api.post('/admin/business', businessData),
  
//   updateBusiness: (tenantId, businessData) => 
//     api.put(`/admin/business/${tenantId}`, businessData),
  
//   deleteBusiness: (tenantId) => api.delete(`/admin/business/${tenantId}`),

//   // Application operations
//   createApplication: (tenantId, applicationData) => 
//     api.post(`/admin/business/${tenantId}/applications`, applicationData),

//   getBusinessApplications: (tenantId) => 
//     api.get(`/admin/business/${tenantId}/applications`),

//   getApplications: () => api.get('/admin/applications'),

//   getApplicationToken: (appId) => 
//     api.post(`/admin/applications/${appId}/token`),

//   // User operations
//   createBusinessUser: (tenantId, userData) => 
//     api.post(`/admin/business/${tenantId}/users`, userData),

//   getBusinessUsers: (tenantId) => 
//     api.get(`/admin/business/${tenantId}/users`),

//   // Statistics
//   getBusinessStats: () => api.get('/admin/stats/business'),
  
//   getApplicationStats: () => api.get('/admin/stats/applications'),
// };

import { api } from './api';

export const adminService = {
  // Business CRUD
  getDashboard: () => api.get('/admin/dashboard'),
  
  getAllBusinesses: () => api.get('/admin/businesses'),
  
  getBusiness: (tenantId) => api.get(`/admin/business/${tenantId}`),
  
  createBusiness: (businessData) => api.post('/admin/business', businessData),
  
  updateBusiness: (tenantId, businessData) => 
    api.put(`/admin/business/${tenantId}`, businessData),
  
  deleteBusiness: (tenantId) => api.delete(`/admin/business/${tenantId}`),

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

  // User operations
  createBusinessUser: (tenantId, userData) => 
    api.post(`/admin/business/${tenantId}/users`, userData),

  getBusinessUsers: (tenantId) => 
    api.get(`/admin/business/${tenantId}/users`),



 // Optional: Add these if your backend supports them
  deleteUser: (userId) => 
    api.delete(`/admin/users/${userId}`),
  
  resetUserPassword: (userId) => 
    api.post(`/admin/users/${userId}/reset-password`),
  
  updateUser: (userId, userData) => 
    api.put(`/admin/users/${userId}`, userData),

 getBusinessUsers: (tenantId) => 
    api.get(`/admin/business/${tenantId}/users`),
  
  getUser: (userId) => 
    api.get(`/admin/users/${userId}`),
  
  updateUser: (userId, userData) => 
    api.put(`/admin/users/${userId}`, userData),
  
  deleteUser: (userId) => 
    api.delete(`/admin/users/${userId}`),
  
  resetUserPassword: (userId) => 
    api.post(`/admin/users/${userId}/reset-password`),
  
  updateUserStatus: (userId, status) => 
    api.put(`/admin/users/${userId}/status`, { status }),
};