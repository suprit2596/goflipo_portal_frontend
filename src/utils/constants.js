export const ROUTES = {
  LOGIN: '/login',
  ADMIN_DASHBOARD: '/admin/dashboard',
  BUSINESS_DASHBOARD: '/business/dashboard',
  ADMIN_BUSINESSES: '/admin/businesses',
  ADMIN_CREATE_BUSINESS: '/admin/businesses/create',
  ADMIN_CREATE_APPLICATION: '/admin/applications/create',
  BUSINESS_APPLICATIONS: '/business/applications',
    ADMIN_CREATE_BUSINESS_USER: '/admin/businesses/:tenantId/create-user',
  NOT_FOUND: '/404',
};

export const BUSINESS_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
 
};

export const USER_ROLES = {
  ADMIN: 'admin',
  BUSINESS_USER: 'business',
};

export const BUSINESS_STATUS_COLORS = {
  [BUSINESS_STATUS.ACTIVE]: 'success',
  [BUSINESS_STATUS.INACTIVE]: 'error',
  [BUSINESS_STATUS.SUSPENDED]: 'error',
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