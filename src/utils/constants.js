export const ROUTES = {
  LOGIN: '/login',
  CHANGE_PASSWORD: '/change-password',
  ADMIN_DASHBOARD: '/admin/dashboard',
  BUSINESS_DASHBOARD: '/business/dashboard',
  ADMIN_BUSINESSES: '/admin/businesses',
  ADMIN_CREATE_BUSINESS: '/admin/businesses/create',
  ADMIN_CREATE_APPLICATION: '/admin/applications/create',
  ADMIN_SUBSCRIBERS: '/admin/subscribers',
  BUSINESS_APPLICATIONS: '/business/applications',
  ADMIN_CREATE_BUSINESS_USER: '/admin/businesses/:tenantId/create-user',
  BUSINESS_PROFILE: '/business/profile',
  BUSINESS_TRANSACTIONS: '/business/transactions',
  NOT_FOUND: '/404',
  ADMIN_LOGS: '/admin/logs',
};

export const BUSINESS_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  BLOCKED: 'BLOCKED' 
 
};

export const USER_ROLES = {
  ADMIN: 'admin',
  BUSINESS_USER: 'business',
};

export const BUSINESS_STATUS_COLORS = {
  [BUSINESS_STATUS.ACTIVE]: 'success',
  [BUSINESS_STATUS.INACTIVE]: 'error',
  [BUSINESS_STATUS.SUSPENDED]: 'error',
   [BUSINESS_STATUS.BLOCKED]: 'error', 
};

export const APPLICATION_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  PENDING: 'PENDING',
};

export const APPLICATION_STATUS_COLORS = {
  [APPLICATION_STATUS.ACTIVE]: 'success',
  [APPLICATION_STATUS.INACTIVE]: 'warning',
  [APPLICATION_STATUS.PENDING]: 'info',
};


// src/utils/constants.js
export const APP_CONFIG = {
  // App Info
  APP_NAME: 'Pinnacle Authenticator',
  COMPANY_NAME: 'Pinnacle Technologies',
  SUPPORT_EMAIL: 'support@pinnacleAuthenticator.com',
  COPYRIGHT_TEXT: `© ${new Date().getFullYear()} Pinnacle Authenticator. All rights reserved.`,
  
  // URLs
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  APP_URL: process.env.REACT_APP_URL || 'http://localhost:3000',
};
