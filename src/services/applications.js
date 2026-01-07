import { api } from './api';

export const applicationsService = {
  // For apps endpoint (your existing AppController)
  getAllApps: () => api.get('/apps'),
  
  getApp: (appId) => api.get(`/apps/${appId}`),
  
  createApp: (appData) => api.post('/apps/create', appData),
  
  updateApp: (appId, appData) => api.put(`/apps/${appId}`, appData),
  
  deleteApp: (appId) => api.delete(`/apps/${appId}`),
  
  getAppToken: (appId) => api.post(`/apps/token/${appId}`),
};

export const APPLICATION_TYPES = {
  TWITTER: 'TWITTER',
  WEB_APP: 'WEB_APP',
  MOBILE_APP: 'MOBILE_APP',
  SALESFORCE: 'SALESFORCE',
  TUBULU: 'TUBULU',
};

export const APPLICATION_TYPE_LABELS = {
  [APPLICATION_TYPES.TWITTER]: 'Twitter',
  [APPLICATION_TYPES.WEB_APP]: 'Web Application',
  [APPLICATION_TYPES.MOBILE_APP]: 'Mobile App',
  [APPLICATION_TYPES.SALESFORCE]: 'Salesforce',
  [APPLICATION_TYPES.TUBULU]: 'Tubulu',
};

export const APPLICATION_FIELDS = {
  [APPLICATION_TYPES.TWITTER]: [
    { name: 'handler', label: 'Twitter Handler', type: 'text', required: true },
    { name: 'apiToken', label: 'API Token', type: 'password', required: true },
    { name: 'apiSecret', label: 'API Secret', type: 'password', required: true },
  ],
  [APPLICATION_TYPES.WEB_APP]: [
    { name: 'domain', label: 'Domain', type: 'text', required: true },
    { name: 'clientId', label: 'Client ID', type: 'text', required: true },
    { name: 'clientSecret', label: 'Client Secret', type: 'password', required: true },
  ],
  [APPLICATION_TYPES.MOBILE_APP]: [
    { name: 'appId', label: 'App ID', type: 'text', required: true },
    { name: 'platform', label: 'Platform', type: 'select', options: ['Android', 'iOS'], required: true },
    { name: 'apiKey', label: 'API Key', type: 'password', required: true },
  ],
  [APPLICATION_TYPES.SALESFORCE]: [
    { name: 'instanceUrl', label: 'Instance URL', type: 'text', required: true },
    { name: 'clientId', label: 'Client ID', type: 'text', required: true },
    { name: 'clientSecret', label: 'Client Secret', type: 'password', required: true },
  ],
  [APPLICATION_TYPES.TUBULU]: [
    { name: 'apiKey', label: 'API Key', type: 'password', required: true },
    { name: 'apiEndpoint', label: 'API Endpoint', type: 'text', required: true },
    { name: 'customField1', label: 'Custom Field 1', type: 'text' },
    { name: 'customField2', label: 'Custom Field 2', type: 'text' },
  ],
};