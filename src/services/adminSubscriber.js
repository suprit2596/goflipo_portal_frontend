// // C:\goflipo-frontend\goflipo_portal_frontend\src\services\adminSubscriber.js
// // Create this new file

// import {api} from './api';

// export const adminSubscriberService = {
//   // Get all subscribers with pagination and filters
//   getAllSubscribers: async (page = 1, limit = 20, blocked = '', search = '') => {
//     let url = `/admin/subscribers?page=${page}&limit=${limit}`;
//     if (blocked) url += `&blocked=${blocked}`;
//     if (search) url += `&search=${search}`;
    
//     const response = await api.get(url);
//     return response.data;
//   },

//   // Get single subscriber by ID
//   getSubscriberById: async (id) => {
//     const response = await api.get(`/admin/subscribers/${id}`);
//     return response.data;
//   },

//   // Block subscriber with reason
//   blockSubscriber: async (id, reason) => {
//     const response = await api.put(`/admin/subscribers/${id}/block`, { reason });
//     return response.data;
//   },

//   // Unblock subscriber
//   unblockSubscriber: async (id) => {
//     const response = await api.put(`/admin/subscribers/${id}/unblock`, {});
//     return response.data;
//   }
// };
// C:\goflipo-frontend\goflipo_portal_frontend\src\services\adminSubscriber.js
// Create this file with this exact code:

import { api } from './api';

export const adminSubscriberService = {
  getAllSubscribers: async (page = 1, limit = 20, blocked = '', search = '', businessId = '') => {
    let url = `/api/admin/subscribers?page=${page}&limit=${limit}`;
    
    // ✅ FIXED: Convert frontend → backend properly
    if (blocked === 'blocked') {
      url += '&blocked=true';
    } else if (blocked === 'active') {
      url += '&blocked=false';
    } 
    // Empty string = no blocked param (show all)
    
  // ← ADD THIS
  if (businessId && businessId.trim()) {
    url += `&businessId=${encodeURIComponent(businessId.trim())}`;
  }

    if (search && search.trim()) {
      url += `&search=${encodeURIComponent(search.trim())}`;
    }
    
    console.log('🌐 Request URL:', url); // DEBUG
    const response = await api.get(url);
    console.log('📊 Response Data:', response.data); // DEBUG
    return response.data;
  },
  
  getSubscriberById: async (id) => {
    // ✅ ADD /api prefix
    const response = await api.get(`/api/admin/subscribers/${id}`);
    return response.data;
  },
  
  blockSubscriber: async (id, reason) => {
    // ✅ ADD /api prefix
    const response = await api.put(`/api/admin/subscribers/${id}/block`, { reason });
    return response.data;
  },
  
  unblockSubscriber: async (id,reason) => {
    // ✅ ADD /api prefix
    const response = await api.put(`/api/admin/subscribers/${id}/unblock`, { reason });
    return response.data;
  }
};