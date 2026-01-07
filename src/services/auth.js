import { api } from './api';

export const authService = {
  login: async (email, password) => {
    // const response = await api.post('/auth/login', { email, password });
    // return response;
    try {
      const response = await api.post('/auth/login', { email, password });
      return response;
    } catch (error) {
      // Re-throw the error so AuthContext can handle it
      throw error;
    }
  },

  createAdmin: async (userData) => {
    const response = await api.post('/auth/setup/admin', userData);
    return response;
  },

  signup: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  }
};