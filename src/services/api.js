// // // import axios from 'axios';

// // // const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// // // const api = axios.create({
// // //   baseURL: API_BASE_URL,
// // //   headers: {
// // //     'Content-Type': 'application/json',
// // //   },
// // // });

// // // // Request interceptor to add token
// // // api.interceptors.request.use(
// // //   (config) => {
// // //     const token = localStorage.getItem('token');
// // //     if (token) {
// // //       config.headers.Authorization = `Bearer ${token}`;
// // //     }
// // //     return config;
// // //   },
// // //   (error) => {
// // //     return Promise.reject(error);
// // //   }
// // // );

// // // // Response interceptor for error handling
// // // api.interceptors.response.use(
// // //   (response) => response.data,
// // //   (error) => {
// // //     if (error.response?.status === 401) {
// // //       localStorage.removeItem('token');
// // //       localStorage.removeItem('user');
// // //       window.location.href = '/login';
// // //     }
// // //     return Promise.reject(error);
// // //   }
// // // );

// // // export { api };
// // import axios from 'axios';

// // const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// // const api = axios.create({
// //   baseURL: API_BASE_URL,
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// // });

// // // Request interceptor to add token
// // // api.interceptors.request.use(
// // //   (config) => {
// // //     const token = localStorage.getItem('token');
// // //     if (token) {
// // //       config.headers.Authorization = `Bearer ${token}`;
// // //     }
// // //     return config;
// // //   },
// // //   (error) => {
// // //     return Promise.reject(error);
// // //   }
// // // );

// // // // Response interceptor for error handling
// // // api.interceptors.response.use(
// // //   (response) => response.data,
// // //   (error) => {
// // //     if (error.response?.status === 401) {
// // //       // Don't redirect if it's a login request
// // //       const isLoginRequest = error.config?.url?.includes('/auth/login');
      
// // //       if (!isLoginRequest) {
// // //         localStorage.removeItem('token');
// // //         localStorage.removeItem('user');
// // //         window.location.href = '/login';
// // //       }
// // //     }
// // //     return Promise.reject(error);
// // //   }
// // // );

// // export { api };

// // import axios from 'axios';

// // const API_BASE_URL =
// //   process.env.REACT_APP_API_URL || 'http://localhost:5000';

// // const api = axios.create({
// //   baseURL: API_BASE_URL,
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// // });

// // api.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem('token');
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// //   },
// //   (error) => Promise.reject(error)
// // );

// // export { api };


// import axios from 'axios';

// const API_BASE_URL =
//   process.env.REACT_APP_API_URL || 'http://localhost:4000';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // 🔐 Attach token automatically
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

// // ❗ GLOBAL ERROR HANDLING (THIS IS THE KEY)
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const backendMessage =
//       error.response?.data?.message ||
//       error.response?.data?.error ||
//       error.message ||
//       'Something went wrong';

//     // IMPORTANT: throw clean Error
//     return Promise.reject(new Error(backendMessage));
//   }
// );

// export { api };


import axios from 'axios';
import { getToken } from '../utils/auth';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4001';

// Create base axios instance WITHOUT interceptors
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create a separate instance for temp token requests
export const tempApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// // Regular API interceptor (for normal requests)
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



api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Temp API interceptor - NEVER attaches token automatically
// We'll manually add temp token when needed
tempApi.interceptors.request.use(
  (config) => {
    // Don't auto-attach any token
    return config;
  },
  (error) => Promise.reject(error)
);

// Common error interceptor
const errorHandler = (error) => {
  const backendMessage =
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    'Something went wrong';
  return Promise.reject(new Error(backendMessage));
};

api.interceptors.response.use((response) => response, errorHandler);
tempApi.interceptors.response.use((response) => response, errorHandler);

export { api };