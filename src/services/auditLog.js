import {api} from './api';

export const auditLogService = {
  
  getLogs: (params) => api.get('/api/admin/audit-logs', { params }).then(res => {
    console.log('getLogs response:', res.data);
    return res.data;
  }),
  getFilters: () => api.get('/api/admin/audit-logs/filters').then(res => {
    console.log('getFilters response:', res.data);
    return res.data;
  })

};