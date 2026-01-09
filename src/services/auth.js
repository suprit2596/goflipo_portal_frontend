// import { api } from './api';

// export const authService = {
//   login: async (email, password) => {
//     // const response = await api.post('/auth/login', { email, password });
//     // return response;
//     try {
//       const response = await api.post('/auth/login', { email, password });
//       return response;
//     } catch (error) {
//       // Re-throw the error so AuthContext can handle it
//       throw error;
//     }
//   },

//   createAdmin: async (userData) => {
//     const response = await api.post('/auth/setup/admin', userData);
//     return response;
//   },

//   signup: async (userData) => {
//     const response = await api.post('/auth/signup', userData);
//     return response;
//   },

//   logout: () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//   },

//   getCurrentUser: () => {
//     const user = localStorage.getItem('user');
//     return user ? JSON.parse(user) : null;
//   },

//   getToken: () => {
//     return localStorage.getItem('token');
//   }
// };

// services/auth.js
// import { api } from './api'; // your axios instance

// export const authService = {
//   login: async (email, password) => {
//     try {
//       const response = await api.post('api/auth/login', { email, password });

//       // API returns token + user info
//       const { token, ...user } = response.data;

//       return { success: true, user: { ...user, token } };
//     } catch (error) {
//       let errorMessage = 'Login failed. Please try again.';

//       if (error.response) {
//         const { status, data } = error.response;
//         if (status === 401) errorMessage = data?.message || 'Invalid email or password';
//         else if (status === 404) errorMessage = data?.message || 'User not found';
//         else if (status >= 500) errorMessage = 'Server error. Please try again later.';
//       } else if (error.request) {
//         errorMessage = 'No response from server.';
//       } else {
//         errorMessage = error.message;
//       }

//       return { success: false, error: errorMessage };
//     }
//   },
// };

import { api } from './api';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      return { success: true, user: { ...user, token } };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Login failed',
      };
    }
  },
};
