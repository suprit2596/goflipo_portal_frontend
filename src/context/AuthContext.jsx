// // import React, { createContext, useState, useContext, useEffect } from 'react';
// // import { authService } from '../services/auth';

// // const AuthContext = createContext();

// // export const useAuth = () => {
// //   const context = useContext(AuthContext);
// //   if (!context) {
// //     throw new Error('useAuth must be used within an AuthProvider');
// //   }
// //   return context;
// // };

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const token = localStorage.getItem('token');
// //     const userData = localStorage.getItem('user');

// //     if (token && userData) {
// //       try {
// //         const parsedUser = JSON.parse(userData);
// //         setUser(parsedUser);
// //       } catch (err) {
// //         console.error('Error parsing user data:', err);
// //         logout();
// //       }
// //     }
// //     setLoading(false);
// //   }, []);

// //   const login = async (email, password) => {
// //     try {
// //       setError(null);

// //       const response = await authService.login(email, password);

// //       localStorage.setItem('token', response.token);
// //       localStorage.setItem('user', JSON.stringify({
// //         email: response.email,
// //         role: response.role,
// //         tenantId: response.tenantId,
// //         fullName: response.fullName
// //       }));

// //       setUser({
// //         email: response.email,
// //         role: response.role,
// //         tenantId: response.tenantId,
// //         fullName: response.fullName
// //       });

// //       return { success: true };
// //     } catch (error) {
// //       // setError(error.message || 'Login failed');
// //       // return { success: false, error: error.message };
// //        let errorMessage = 'Login failed. Please try again.';

// //     // Check if it's an axios error
// //     if (error.response) {
// //       // Server responded with error status
// //       const { status, data } = error.response;

// //       console.log('AuthContext: HTTP Status:', status);
// //       console.log('AuthContext: Error data:', data);

// //       if (status === 401) {
// //         // Your backend returns {error: "Invalid credentials"}
// //         errorMessage = data?.error || data?.message || data?.errorMessage || 'Invalid email or password';
// //         console.log('Extracted 401 error message:', errorMessage);
// //       } else if (status === 400) {
// //         errorMessage = data?.message || data?.error || 'Invalid request format';
// //       } else if (status === 404) {
// //         errorMessage = 'User not found';
// //       } else if (status >= 500) {
// //         errorMessage = 'Server error. Please try again later.';
// //       } else {
// //         errorMessage = data?.message || data?.error || `Error: ${status}`;
// //       }
// //     } else if (error.request) {
// //       // Request was made but no response
// //       console.error('AuthContext: No response received');
// //       errorMessage = 'No response from server. Please check your connection.';
// //     } else {
// //       // Something else happened
// //       console.error('AuthContext: Other error:', error.message);
// //       errorMessage = error.message;
// //     }

// //     console.log('AuthContext: Final error message:', errorMessage);
// //     setError(errorMessage);
// //     return { success: false, error: errorMessage };

// //     }
// //   };

// //   const logout = () => {
// //     localStorage.removeItem('token');
// //     localStorage.removeItem('user');
// //     setUser(null);
// //     setError(null);
// //   };

// //   const updateUser = (updates) => {
// //     const updatedUser = { ...user, ...updates };
// //     setUser(updatedUser);
// //     localStorage.setItem('user', JSON.stringify(updatedUser));
// //   };

// //   const value = {
// //     user,
// //     loading,
// //     error,
// //     login,
// //     logout,
// //     updateUser,
// //     isAuthenticated: !!user,
// //     isAdmin: user?.role === 'ADMIN',
// //     isBusinessUser: user?.role === 'BUSINESS_USER'
// //   };

// //   return (
// //     <AuthContext.Provider value={value}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { authService } from '../services/auth';
// import { USER_ROLES } from '../utils/constants';

// /**
//  * 🔧 AUTH MODE FLAG
//  * true  → MOCK AUTH (no backend)
//  * false → REAL BACKEND AUTH
//  */
// const IS_MOCK_AUTH = false;

// const AuthContext = createContext(null);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   /**
//    * 🔹 INITIAL AUTH CHECK
//    */
//   useEffect(() => {
//     if (IS_MOCK_AUTH) {
//       const mockUser = {
//         email: 'admin@test.com',
//         role: USER_ROLES.ADMIN, // change to BUSINESS_USER if needed
//         tenantId: 'tenant_123',
//         fullName: 'Mock Admin'
//       };

//       localStorage.setItem('token', 'mock-token');
//       localStorage.setItem('user', JSON.stringify(mockUser));

//       setUser(mockUser);
//       setLoading(false);
//       return;
//     }

//     const token = localStorage.getItem('token');
//     const userData = localStorage.getItem('user');

//     if (token && userData) {
//       try {
//         setUser(JSON.parse(userData));
//       } catch (err) {
//         console.error('Error parsing user data:', err);
//         logout();
//       }
//     }

//     setLoading(false);
//   }, []);

//   /**
//    * 🔹 LOGIN
//    */
//  const login = async (email, password) => {
//   try {
//     setError(null);

//     const result = await authService.login(email, password);

//     if (!result.success) {
//       setError(result.error);
//       return { success: false, error: result.error };
//     }

//     const { token, ...user } = result.user;

//     localStorage.setItem('token', token);
//     localStorage.setItem('user', JSON.stringify(user));

//     setUser(user);

//     return { success: true, user };
//   } catch (err) {
//     const message = err.message || 'Login failed';
//     setError(message);
//     return { success: false, error: message };
//   }
// };

//   /**
//    * 🔹 LOGOUT
//    */
//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setUser(null);
//     setError(null);
//   };

//   /**
//    * 🔹 UPDATE USER
//    */
//   const updateUser = (updates) => {
//     const updatedUser = { ...user, ...updates };
//     setUser(updatedUser);
//     localStorage.setItem('user', JSON.stringify(updatedUser));
//   };

//   const value = {
//     user,
//     loading,
//     error,
//     login,
//     logout,
//     updateUser,
//     isAuthenticated: !!user,
//     isAdmin: user?.role === USER_ROLES.ADMIN,
//     isBusinessUser: user?.role === USER_ROLES.BUSINESS_USER
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/auth';
import { USER_ROLES } from '../utils/constants';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const result = await authService.login(email, password);

    if (!result.success) {
      return result;
    }

    const { token, ...userData } = result.user;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));

    setUser(userData);
    return { success: true, user: userData };
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === USER_ROLES.ADMIN,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
