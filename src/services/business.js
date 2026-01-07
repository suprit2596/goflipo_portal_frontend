import { api } from './api';

export const businessService = {
  getDashboard: (tenantId) => api.get(`/api/business/dashboard`),

  getBusinessDetails: () => api.get('/api/business/details'),

  getApplications: () => api.get('/api/business/applications'),

  getApplication: (appId) => api.get(`/api/business/applications/${appId}`),

  updateApplication: (appId, data) => 
    api.put(`/api/business/applications/${appId}`, data),

  getAppToken: (appId) => 
    api.post(`/api/business/applications/${appId}/token`),
};