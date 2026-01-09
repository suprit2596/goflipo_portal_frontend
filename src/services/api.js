// // import axios from 'axios';

// // const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// // const api = axios.create({
// //   baseURL: API_BASE_URL,
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// // });

// // // Request interceptor to add token
// // api.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem('token');
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// //   },
// //   (error) => {
// //     return Promise.reject(error);
// //   }
// // );

// // // Response interceptor for error handling
// // api.interceptors.response.use(
// //   (response) => response.data,
// //   (error) => {
// //     if (error.response?.status === 401) {
// //       localStorage.removeItem('token');
// //       localStorage.removeItem('user');
// //       window.location.href = '/login';
// //     }
// //     return Promise.reject(error);
// //   }
// // );

// // export { api };
// import axios from 'axios';

// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor to add token
// // api.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem('token');
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// //   },
// //   (error) => {
// //     return Promise.reject(error);
// //   }
// // );

// // // Response interceptor for error handling
// // api.interceptors.response.use(
// //   (response) => response.data,
// //   (error) => {
// //     if (error.response?.status === 401) {
// //       // Don't redirect if it's a login request
// //       const isLoginRequest = error.config?.url?.includes('/auth/login');
      
// //       if (!isLoginRequest) {
// //         localStorage.removeItem('token');
// //         localStorage.removeItem('user');
// //         window.location.href = '/login';
// //       }
// //     }
// //     return Promise.reject(error);
// //   }
// // );

// export { api };

// import axios from 'axios';

// const API_BASE_URL =
//   process.env.REACT_APP_API_URL || 'http://localhost:5000';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export { api };


import axios from 'axios';

const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔐 Attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ❗ GLOBAL ERROR HANDLING (THIS IS THE KEY)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const backendMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Something went wrong';

    // IMPORTANT: throw clean Error
    return Promise.reject(new Error(backendMessage));
  }
);

export { api };
