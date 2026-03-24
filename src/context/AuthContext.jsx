// // // // // // // import React, { createContext, useState, useContext, useEffect } from 'react';
// // // // // // // import { authService } from '../services/auth';

// // // // // // // const AuthContext = createContext();

// // // // // // // export const useAuth = () => {
// // // // // // //   const context = useContext(AuthContext);
// // // // // // //   if (!context) {
// // // // // // //     throw new Error('useAuth must be used within an AuthProvider');
// // // // // // //   }
// // // // // // //   return context;
// // // // // // // };

// // // // // // // export const AuthProvider = ({ children }) => {
// // // // // // //   const [user, setUser] = useState(null);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [error, setError] = useState(null);

// // // // // // //   useEffect(() => {
// // // // // // //     const token = localStorage.getItem('token');
// // // // // // //     const userData = localStorage.getItem('user');

// // // // // // //     if (token && userData) {
// // // // // // //       try {
// // // // // // //         const parsedUser = JSON.parse(userData);
// // // // // // //         setUser(parsedUser);
// // // // // // //       } catch (err) {
// // // // // // //         console.error('Error parsing user data:', err);
// // // // // // //         logout();
// // // // // // //       }
// // // // // // //     }
// // // // // // //     setLoading(false);
// // // // // // //   }, []);

// // // // // // //   const login = async (email, password) => {
// // // // // // //     try {
// // // // // // //       setError(null);

// // // // // // //       const response = await authService.login(email, password);

// // // // // // //       localStorage.setItem('token', response.token);
// // // // // // //       localStorage.setItem('user', JSON.stringify({
// // // // // // //         email: response.email,
// // // // // // //         role: response.role,
// // // // // // //         tenantId: response.tenantId,
// // // // // // //         fullName: response.fullName
// // // // // // //       }));

// // // // // // //       setUser({
// // // // // // //         email: response.email,
// // // // // // //         role: response.role,
// // // // // // //         tenantId: response.tenantId,
// // // // // // //         fullName: response.fullName
// // // // // // //       });

// // // // // // //       return { success: true };
// // // // // // //     } catch (error) {
// // // // // // //       // setError(error.message || 'Login failed');
// // // // // // //       // return { success: false, error: error.message };
// // // // // // //        let errorMessage = 'Login failed. Please try again.';

// // // // // // //     // Check if it's an axios error
// // // // // // //     if (error.response) {
// // // // // // //       // Server responded with error status
// // // // // // //       const { status, data } = error.response;

// // // // // // //       console.log('AuthContext: HTTP Status:', status);
// // // // // // //       console.log('AuthContext: Error data:', data);

// // // // // // //       if (status === 401) {
// // // // // // //         // Your backend returns {error: "Invalid credentials"}
// // // // // // //         errorMessage = data?.error || data?.message || data?.errorMessage || 'Invalid email or password';
// // // // // // //         console.log('Extracted 401 error message:', errorMessage);
// // // // // // //       } else if (status === 400) {
// // // // // // //         errorMessage = data?.message || data?.error || 'Invalid request format';
// // // // // // //       } else if (status === 404) {
// // // // // // //         errorMessage = 'User not found';
// // // // // // //       } else if (status >= 500) {
// // // // // // //         errorMessage = 'Server error. Please try again later.';
// // // // // // //       } else {
// // // // // // //         errorMessage = data?.message || data?.error || `Error: ${status}`;
// // // // // // //       }
// // // // // // //     } else if (error.request) {
// // // // // // //       // Request was made but no response
// // // // // // //       console.error('AuthContext: No response received');
// // // // // // //       errorMessage = 'No response from server. Please check your connection.';
// // // // // // //     } else {
// // // // // // //       // Something else happened
// // // // // // //       console.error('AuthContext: Other error:', error.message);
// // // // // // //       errorMessage = error.message;
// // // // // // //     }

// // // // // // //     console.log('AuthContext: Final error message:', errorMessage);
// // // // // // //     setError(errorMessage);
// // // // // // //     return { success: false, error: errorMessage };

// // // // // // //     }
// // // // // // //   };

// // // // // // //   const logout = () => {
// // // // // // //     localStorage.removeItem('token');
// // // // // // //     localStorage.removeItem('user');
// // // // // // //     setUser(null);
// // // // // // //     setError(null);
// // // // // // //   };

// // // // // // //   const updateUser = (updates) => {
// // // // // // //     const updatedUser = { ...user, ...updates };
// // // // // // //     setUser(updatedUser);
// // // // // // //     localStorage.setItem('user', JSON.stringify(updatedUser));
// // // // // // //   };

// // // // // // //   const value = {
// // // // // // //     user,
// // // // // // //     loading,
// // // // // // //     error,
// // // // // // //     login,
// // // // // // //     logout,
// // // // // // //     updateUser,
// // // // // // //     isAuthenticated: !!user,
// // // // // // //     isAdmin: user?.role === 'ADMIN',
// // // // // // //     isBusinessUser: user?.role === 'BUSINESS_USER'
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <AuthContext.Provider value={value}>
// // // // // // //       {children}
// // // // // // //     </AuthContext.Provider>
// // // // // // //   );
// // // // // // // };

// // // // // // import React, { createContext, useState, useContext, useEffect } from 'react';
// // // // // // import { authService } from '../services/auth';
// // // // // // import { USER_ROLES } from '../utils/constants';

// // // // // // /**
// // // // // //  * 🔧 AUTH MODE FLAG
// // // // // //  * true  → MOCK AUTH (no backend)
// // // // // //  * false → REAL BACKEND AUTH
// // // // // //  */
// // // // // // const IS_MOCK_AUTH = false;

// // // // // // const AuthContext = createContext(null);

// // // // // // export const useAuth = () => {
// // // // // //   const context = useContext(AuthContext);
// // // // // //   if (!context) {
// // // // // //     throw new Error('useAuth must be used within an AuthProvider');
// // // // // //   }
// // // // // //   return context;
// // // // // // };

// // // // // // export const AuthProvider = ({ children }) => {
// // // // // //   const [user, setUser] = useState(null);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [error, setError] = useState(null);

// // // // // //   /**
// // // // // //    * 🔹 INITIAL AUTH CHECK
// // // // // //    */
// // // // // //   useEffect(() => {
// // // // // //     if (IS_MOCK_AUTH) {
// // // // // //       const mockUser = {
// // // // // //         email: 'admin@test.com',
// // // // // //         role: USER_ROLES.ADMIN, // change to BUSINESS_USER if needed
// // // // // //         tenantId: 'tenant_123',
// // // // // //         fullName: 'Mock Admin'
// // // // // //       };

// // // // // //       localStorage.setItem('token', 'mock-token');
// // // // // //       localStorage.setItem('user', JSON.stringify(mockUser));

// // // // // //       setUser(mockUser);
// // // // // //       setLoading(false);
// // // // // //       return;
// // // // // //     }

// // // // // //     const token = localStorage.getItem('token');
// // // // // //     const userData = localStorage.getItem('user');

// // // // // //     if (token && userData) {
// // // // // //       try {
// // // // // //         setUser(JSON.parse(userData));
// // // // // //       } catch (err) {
// // // // // //         console.error('Error parsing user data:', err);
// // // // // //         logout();
// // // // // //       }
// // // // // //     }

// // // // // //     setLoading(false);
// // // // // //   }, []);

// // // // // //   /**
// // // // // //    * 🔹 LOGIN
// // // // // //    */
// // // // // //  const login = async (email, password) => {
// // // // // //   try {
// // // // // //     setError(null);

// // // // // //     const result = await authService.login(email, password);

// // // // // //     if (!result.success) {
// // // // // //       setError(result.error);
// // // // // //       return { success: false, error: result.error };
// // // // // //     }

// // // // // //     const { token, ...user } = result.user;

// // // // // //     localStorage.setItem('token', token);
// // // // // //     localStorage.setItem('user', JSON.stringify(user));

// // // // // //     setUser(user);

// // // // // //     return { success: true, user };
// // // // // //   } catch (err) {
// // // // // //     const message = err.message || 'Login failed';
// // // // // //     setError(message);
// // // // // //     return { success: false, error: message };
// // // // // //   }
// // // // // // };

// // // // // //   /**
// // // // // //    * 🔹 LOGOUT
// // // // // //    */
// // // // // //   const logout = () => {
// // // // // //     localStorage.removeItem('token');
// // // // // //     localStorage.removeItem('user');
// // // // // //     setUser(null);
// // // // // //     setError(null);
// // // // // //   };

// // // // // //   /**
// // // // // //    * 🔹 UPDATE USER
// // // // // //    */
// // // // // //   const updateUser = (updates) => {
// // // // // //     const updatedUser = { ...user, ...updates };
// // // // // //     setUser(updatedUser);
// // // // // //     localStorage.setItem('user', JSON.stringify(updatedUser));
// // // // // //   };

// // // // // //   const value = {
// // // // // //     user,
// // // // // //     loading,
// // // // // //     error,
// // // // // //     login,
// // // // // //     logout,
// // // // // //     updateUser,
// // // // // //     isAuthenticated: !!user,
// // // // // //     isAdmin: user?.role === USER_ROLES.ADMIN,
// // // // // //     isBusinessUser: user?.role === USER_ROLES.BUSINESS_USER
// // // // // //   };

// // // // // //   return (
// // // // // //     <AuthContext.Provider value={value}>
// // // // // //       {!loading && children}
// // // // // //     </AuthContext.Provider>
// // // // // //   );
// // // // // // };

// // // // // import React, { createContext, useContext, useEffect, useState } from 'react';
// // // // // import { authService } from '../services/auth';
// // // // // import { USER_ROLES } from '../utils/constants';

// // // // // const AuthContext = createContext(null);

// // // // // export const useAuth = () => useContext(AuthContext);

// // // // // export const AuthProvider = ({ children }) => {
// // // // //   const [user, setUser] = useState(null);
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   useEffect(() => {
// // // // //     const token = localStorage.getItem('token');
// // // // //     const storedUser = localStorage.getItem('user');

// // // // //     if (token && storedUser) {
// // // // //       setUser(JSON.parse(storedUser));
// // // // //     }

// // // // //     setLoading(false);
// // // // //   }, []);

// // // // //   const login = async (email, password) => {
// // // // //     const result = await authService.login(email, password);

// // // // //     if (!result.success) {
// // // // //       return result;
// // // // //     }

// // // // //     const { token, ...userData } = result.user;

// // // // //     localStorage.setItem('token', token);
// // // // //     localStorage.setItem('user', JSON.stringify(userData));

// // // // //     setUser(userData);
// // // // //     return { success: true, user: userData };
// // // // //   };

// // // // //   const logout = () => {
// // // // //     localStorage.clear();
// // // // //     setUser(null);
// // // // //   };

// // // // //   return (
// // // // //     <AuthContext.Provider
// // // // //       value={{
// // // // //         user,
// // // // //         loading,
// // // // //         login,
// // // // //         logout,
// // // // //         isAuthenticated: !!user,
// // // // //         isAdmin: user?.role === USER_ROLES.ADMIN,
// // // // //       }}
// // // // //     >
// // // // //       {!loading && children}
// // // // //     </AuthContext.Provider>
// // // // //   );
// // // // // };

// // // // import React, { createContext, useContext, useEffect, useState } from 'react';
// // // // import { authService } from '../services/auth';
// // // // import { USER_ROLES } from '../utils/constants';
// // // // import { decodeToken } from '../utils/auth';

// // // // const AuthContext = createContext(null);

// // // // export const useAuth = () => useContext(AuthContext);

// // // // export const AuthProvider = ({ children }) => {
// // // //   const [user, setUser] = useState(null);
// // // //   const [loading, setLoading] = useState(true);

// // // //   useEffect(() => {
// // // //     const token = localStorage.getItem('token');
// // // //     const storedUser = localStorage.getItem('user');

// // // //     if (token && storedUser) {
// // // //       // Check if token is valid and not expired
// // // //       try {
// // // //         const decoded = decodeToken(token);
// // // //         if (decoded && decoded.exp * 1000 > Date.now()) {
// // // //           setUser(JSON.parse(storedUser));
// // // //         } else {
// // // //           // Token expired, clear storage
// // // //           localStorage.clear();
// // // //         }
// // // //       } catch (error) {
// // // //         console.error('Token validation error:', error);
// // // //         localStorage.clear();
// // // //       }
// // // //     }

// // // //     setLoading(false);
// // // //   }, []);

// // // //   const login = async (email, password) => {
// // // //     const result = await authService.login(email, password);

// // // //     if (!result.success) {
// // // //       return result;
// // // //     }

// // // //     const { token, ...userData } = result.user;

// // // //     localStorage.setItem('token', token);
// // // //     localStorage.setItem('user', JSON.stringify(userData));

// // // //     setUser(userData);
// // // //     return { success: true, user: userData };
// // // //   };

// // // //   const businessLogin = async (username, password) => {
// // // //     const result = await authService.businessLogin(username, password);

// // // //     if (!result.success) {
// // // //       return result;
// // // //     }

// // // //     if (result.requiresPasswordChange) {
// // // //       // Don't store token if password change is required
// // // //       return {
// // // //         success: true,
// // // //         requiresPasswordChange: true,
// // // //         business: result.business,
// // // //         tempToken: result.token
// // // //       };
// // // //     }

// // // //     // Store business token and data
// // // //     localStorage.setItem('token', result.token);
// // // //     localStorage.setItem('user', JSON.stringify(result.business));

// // // //     setUser(result.business);
// // // //     return { 
// // // //       success: true, 
// // // //       user: result.business,
// // // //       requiresPasswordChange: false 
// // // //     };
// // // //   };

// // // //   const logout = () => {
// // // //     localStorage.clear();
// // // //     setUser(null);
// // // //   };

// // // //   const updateUser = (userData) => {
// // // //     setUser(userData);
// // // //     localStorage.setItem('user', JSON.stringify(userData));
// // // //   };

// // // //   return (
// // // //     <AuthContext.Provider
// // // //       value={{
// // // //         user,
// // // //         loading,
// // // //         login,
// // // //         businessLogin,
// // // //         logout,
// // // //         updateUser,
// // // //         isAuthenticated: !!user,
// // // //         isAdmin: user?.role === USER_ROLES.ADMIN,
// // // //         isBusiness: user?.businessId !== undefined,
// // // //       }}
// // // //     >
// // // //       {!loading && children}
// // // //     </AuthContext.Provider>
// // // //   );
// // // // };

// // // import React, { createContext, useContext, useEffect, useState } from 'react';
// // // import { authService } from '../services/auth';
// // // import { USER_ROLES } from '../utils/constants';
// // // import { decodeToken, isTokenExpired } from '../utils/auth';

// // // const AuthContext = createContext(null);

// // // export const useAuth = () => useContext(AuthContext);

// // // export const AuthProvider = ({ children }) => {
// // //   const [user, setUser] = useState(null);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     initializeAuth();
// // //   }, []);

// // //   const initializeAuth = () => {
// // //     const token = localStorage.getItem('token');
// // //     const storedUser = localStorage.getItem('user');

// // //     if (token && storedUser) {
// // //       try {
// // //         // Check if token is valid and not expired
// // //         if (isTokenExpired(token)) {
// // //           console.warn('Token expired, logging out...');
// // //           logout();
// // //         } else {
// // //           const userData = JSON.parse(storedUser);
// // //           setUser(userData);
// // //         }
// // //       } catch (error) {
// // //         console.error('Auth initialization error:', error);
// // //         logout();
// // //       }
// // //     }

// // //     setLoading(false);
// // //   };

// // //   const login = async (email, password) => {
// // //     try {
// // //       const result = await authService.login(email, password);

// // //       if (!result.success) {
// // //         return result;
// // //       }

// // //       const { token, ...userData } = result.user;

// // //       // Validate token before storing
// // //       const decoded = decodeToken(token);
// // //       if (!decoded) {
// // //         return {
// // //           success: false,
// // //           error: 'Invalid token received',
// // //         };
// // //       }

// // //       localStorage.setItem('token', token);
// // //       localStorage.setItem('user', JSON.stringify(userData));
// // //       setUser(userData);
      
// // //       return { success: true, user: userData };
// // //     } catch (error) {
// // //       console.error('Login error:', error);
// // //       return {
// // //         success: false,
// // //         error: error.message || 'Login failed',
// // //       };
// // //     }
// // //   };

// // //   const businessLogin = async (username, password) => {
// // //     try {
// // //       const result = await authService.businessLogin(username, password);

// // //       if (!result.success) {
// // //         return result;
// // //       }

// // //       // If password change required, return temp token without storing
// // //       if (result.requiresPasswordChange) {
// // //         return {
// // //           success: true,
// // //           requiresPasswordChange: true,
// // //           business: result.business,
// // //           token: result.token, // This is the temp token
// // //         };
// // //       }

// // //       // Validate regular token before storing
// // //       const decoded = decodeToken(result.token);
// // //       if (!decoded) {
// // //         return {
// // //           success: false,
// // //           error: 'Invalid token received',
// // //         };
// // //       }

// // //       localStorage.setItem('token', result.token);
// // //       localStorage.setItem('user', JSON.stringify(result.user));
// // //       setUser(result.user);
      
// // //       return { 
// // //         success: true, 
// // //         user: result.user,
// // //         requiresPasswordChange: false 
// // //       };
// // //     } catch (error) {
// // //       console.error('Business login error:', error);
// // //       return {
// // //         success: false,
// // //         error: error.message || 'Business login failed',
// // //       };
// // //     }
// // //   };

// // //   const logout = () => {
// // //     localStorage.removeItem('token');
// // //     localStorage.removeItem('user');
// // //     localStorage.removeItem('userRole');
// // //     setUser(null);
    
// // //     // Optional: Redirect to login page
// // //     if (window.location.pathname !== '/login') {
// // //       window.location.href = '/login';
// // //     }
// // //   };

// // //   const updateUser = (userData) => {
// // //     try {
// // //       setUser(userData);
// // //       localStorage.setItem('user', JSON.stringify(userData));
// // //     } catch (error) {
// // //       console.error('Error updating user:', error);
// // //     }
// // //   };

// // //   const updateToken = (newToken) => {
// // //     try {
// // //       localStorage.setItem('token', newToken);
// // //     } catch (error) {
// // //       console.error('Error updating token:', error);
// // //     }
// // //   };

// // //   const isAuthenticated = () => {
// // //     const token = localStorage.getItem('token');
// // //     if (!token) return false;
    
// // //     return !isTokenExpired(token);
// // //   };

// // //   const getCurrentUser = () => {
// // //     return user;
// // //   };

// // //   const getCurrentRole = () => {
// // //     if (!user) return null;
    
// // //     if (user.role) {
// // //       return user.role;
// // //     }
    
// // //     // For business users without explicit role field
// // //     if (user.businessId) {
// // //       return USER_ROLES.BUSINESS_USER;
// // //     }
    
// // //     return null;
// // //   };

// // //   return (
// // //     <AuthContext.Provider
// // //       value={{
// // //         // State
// // //         user,
// // //         loading,
        
// // //         // Methods
// // //         login,
// // //         businessLogin,
// // //         logout,
// // //         updateUser,
// // //         updateToken,
        
// // //         // Computed properties
// // //         isAuthenticated: isAuthenticated(),
// // //         isAdmin: getCurrentRole() === USER_ROLES.ADMIN,
// // //         isBusiness: getCurrentRole() === USER_ROLES.BUSINESS_USER,
// // //         currentRole: getCurrentRole(),
        
// // //         // Getters
// // //         getCurrentUser,
// // //       }}
// // //     >
// // //       {!loading && children}
// // //     </AuthContext.Provider>
// // //   );
// // // };

// // import React, { createContext, useContext, useEffect, useState } from 'react';
// // import { authService } from '../services/auth';
// // import { USER_ROLES } from '../utils/constants';
// // import { decodeToken, isTokenExpired, isValidTokenFormat } from '../utils/auth';

// // const AuthContext = createContext(null);

// // export const useAuth = () => useContext(AuthContext);

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [authError, setAuthError] = useState(null);

// //   useEffect(() => {
// //     initializeAuth();
// //   }, []);

// //   const initializeAuth = () => {
// //     console.log('🔄 Initializing auth...');
    
// //     const token = localStorage.getItem('token');
// //     const storedUser = localStorage.getItem('user');

// //     console.log('📝 Stored token:', token ? `Exists (${token.length} chars)` : 'None');
// //     console.log('📝 Stored user:', storedUser ? 'Exists' : 'None');

// //     if (token && storedUser) {
// //       try {
// //         // First validate token format
// //         if (!isValidTokenFormat(token)) {
// //           console.error('❌ Invalid token format stored in localStorage');
// //           setAuthError('Stored authentication token is invalid');
// //           logout();
// //           setLoading(false);
// //           return;
// //         }

// //         // Check if token is valid and not expired
// //         if (isTokenExpired(token)) {
// //           console.warn('⚠️ Token expired, logging out...');
// //           setAuthError('Your session has expired');
// //           logout();
// //         } else {
// //           const userData = JSON.parse(storedUser);
// //           console.log('✅ Valid user data:', userData);
// //           setUser(userData);
// //           setAuthError(null);
// //         }
// //       } catch (error) {
// //         console.error('❌ Auth initialization error:', error);
// //         setAuthError('Failed to restore session');
// //         logout();
// //       }
// //     } else {
// //       console.log('👤 No stored authentication found');
// //     }

// //     setLoading(false);
// //   };

// //   const login = async (email, password) => {
// //     console.log('🔐 Admin login attempt for:', email);
// //     setAuthError(null);
    
// //     try {
// //       const result = await authService.login(email, password);

// //       if (!result.success) {
// //         console.error('❌ Admin login failed:', result.error);
// //         setAuthError(result.error);
// //         return result;
// //       }

// //       const { token, ...userData } = result.user;

// //       console.log('✅ Admin login successful, token length:', token.length);

// //       // Validate token before storing
// //       if (!isValidTokenFormat(token)) {
// //         const errorMsg = 'Received invalid token format from server';
// //         console.error('❌', errorMsg);
// //         setAuthError(errorMsg);
// //         return {
// //           success: false,
// //           error: errorMsg,
// //         };
// //       }

// //       localStorage.setItem('token', token);
// //       localStorage.setItem('user', JSON.stringify(userData));
// //       setUser(userData);
// //       setAuthError(null);
      
// //       console.log('✅ User stored successfully:', userData);
// //       return { success: true, user: userData };
// //     } catch (error) {
// //       console.error('❌ Login error:', error);
// //       const errorMsg = error.message || 'Login failed unexpectedly';
// //       setAuthError(errorMsg);
// //       return {
// //         success: false,
// //         error: errorMsg,
// //       };
// //     }
// //   };

// //   const businessLogin = async (username, password) => {
// //     console.log('🏢 Business login attempt for:', username);
// //     setAuthError(null);
    
// //     try {
// //       const result = await authService.businessLogin(username, password);

// //       if (!result.success) {
// //         console.error('❌ Business login failed:', result.error);
// //         setAuthError(result.error);
// //         return result;
// //       }

// //       // If password change required, return temp token without storing
// //       if (result.requiresPasswordChange) {
// //         console.log('🔄 Password change required, returning temp token');
// //         return {
// //           success: true,
// //           requiresPasswordChange: true,
// //           business: result.business,
// //           token: result.token,
// //         };
// //       }

// //       const token = result.token;
// //       const userData = result.user;

// //       console.log('✅ Business login successful, token length:', token?.length || 0);

// //       // Validate token before storing
// //       if (!token || !isValidTokenFormat(token)) {
// //         const errorMsg = 'Received invalid token format from server';
// //         console.error('❌', errorMsg);
// //         setAuthError(errorMsg);
// //         return {
// //           success: false,
// //           error: errorMsg,
// //         };
// //       }

// //       localStorage.setItem('token', token);
// //       localStorage.setItem('user', JSON.stringify(userData));
// //       setUser(userData);
// //       setAuthError(null);
      
// //       console.log('✅ Business user stored successfully:', userData);
// //       return { 
// //         success: true, 
// //         user: userData,
// //         requiresPasswordChange: false 
// //       };
// //     } catch (error) {
// //       console.error('❌ Business login error:', error);
// //       const errorMsg = error.message || 'Business login failed unexpectedly';
// //       setAuthError(errorMsg);
// //       return {
// //         success: false,
// //         error: errorMsg,
// //       };
// //     }
// //   };

// //   const logout = () => {
// //     console.log('🚪 Logging out...');
// //     localStorage.removeItem('token');
// //     localStorage.removeItem('user');
// //     localStorage.removeItem('userRole');
// //     setUser(null);
// //     setAuthError(null);
// //   };

// //   const updateUser = (userData) => {
// //     console.log('📝 Updating user data:', userData);
// //     try {
// //       setUser(userData);
// //       localStorage.setItem('user', JSON.stringify(userData));
// //     } catch (error) {
// //       console.error('Error updating user:', error);
// //     }
// //   };

// //   const updateToken = (newToken) => {
// //     console.log('🔄 Updating token, length:', newToken?.length || 0);
// //     try {
// //       if (newToken && isValidTokenFormat(newToken)) {
// //         localStorage.setItem('token', newToken);
// //       } else {
// //         console.error('Cannot update with invalid token');
// //       }
// //     } catch (error) {
// //       console.error('Error updating token:', error);
// //     }
// //   };

// //   const isAuthenticated = () => {
// //     const token = localStorage.getItem('token');
// //     if (!token) {
// //       console.log('🔐 No token for authentication check');
// //       return false;
// //     }
    
// //     if (!isValidTokenFormat(token)) {
// //       console.log('🔐 Invalid token format');
// //       return false;
// //     }
    
// //     return !isTokenExpired(token);
// //   };

// //   const getCurrentUser = () => {
// //     return user;
// //   };

// //   const getCurrentRole = () => {
// //     if (!user) {
// //       console.log('👤 No user for role check');
// //       return null;
// //     }
    
// //     if (user.role) {
// //       console.log('👤 User has explicit role:', user.role);
// //       return user.role;
// //     }
    
// //     // For business users without explicit role field
// //     if (user.businessId) {
// //       console.log('👤 User has businessId, assuming BUSINESS_USER role');
// //       return USER_ROLES.BUSINESS_USER;
// //     }
    
// //     console.log('👤 No role detected for user');
// //     return null;
// //   };

// //   const clearAuthError = () => {
// //     setAuthError(null);
// //   };

// //   return (
// //     <AuthContext.Provider
// //       value={{
// //         // State
// //         user,
// //         loading,
// //         authError,
        
// //         // Methods
// //         login,
// //         businessLogin,
// //         logout,
// //         updateUser,
// //         updateToken,
// //         clearAuthError,
        
// //         // Computed properties
// //         isAuthenticated: isAuthenticated(),
// //         isAdmin: getCurrentRole() === USER_ROLES.ADMIN,
// //         isBusiness: getCurrentRole() === USER_ROLES.BUSINESS_USER,
// //         currentRole: getCurrentRole(),
        
// //         // Getters
// //         getCurrentUser,
// //       }}
// //     >
// //       {!loading && children}
// //     </AuthContext.Provider>
// //   );
// // };

// import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
// import { authService } from '../services/auth';
// import { USER_ROLES } from '../utils/constants';
// import { decodeToken, isTokenExpired, isValidTokenFormat } from '../utils/auth';

// const AuthContext = createContext(null);

// export const useAuth = () => useContext(AuthContext);

// // Safe localStorage wrapper
// const safeStorage = {
//   getItem: (key) => {
//     try {
//       const value = localStorage.getItem(key);
//       console.log(`📝 [STORAGE] GET ${key}:`, value ? `${value.length} chars` : 'null');
//       return value;
//     } catch (error) {
//       console.error(`❌ [STORAGE] Error getting ${key}:`, error);
//       return null;
//     }
//   },
  
//   setItem: (key, value) => {
//     try {
//       console.log(`📝 [STORAGE] SET ${key}:`);
//       console.log(`   Value: ${value}`);
//       console.log(`   Type: ${typeof value}`);
//       console.log(`   Length: ${value?.length}`);
      
//       if (value === undefined) {
//         console.error(`❌ [STORAGE] Cannot store undefined for ${key}`);
//         return false;
//       }
      
//       if (value === 'undefined') {
//         console.error(`❌ [STORAGE] Cannot store string "undefined" for ${key}`);
//         return false;
//       }
      
//       localStorage.setItem(key, value);
//       console.log(`✅ [STORAGE] ${key} stored successfully`);
//       return true;
//     } catch (error) {
//       console.error(`❌ [STORAGE] Error setting ${key}:`, error);
//       return false;
//     }
//   },
  
//   removeItem: (key) => {
//     try {
//       console.log(`🗑️ [STORAGE] REMOVE ${key}`);
//       localStorage.removeItem(key);
//       return true;
//     } catch (error) {
//       console.error(`❌ [STORAGE] Error removing ${key}:`, error);
//       return false;
//     }
//   },
  
//   clear: () => {
//     try {
//       console.log('🧹 [STORAGE] CLEAR ALL');
//       localStorage.clear();
//       return true;
//     } catch (error) {
//       console.error('❌ [STORAGE] Error clearing:', error);
//       return false;
//     }
//   }
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [authError, setAuthError] = useState(null);
//   const initializing = useRef(false);

//   useEffect(() => {
//     if (!initializing.current) {
//       initializing.current = true;
//       console.log('🔄 [AUTH CONTEXT] Initializing auth...');
//       initializeAuth();
//     }
//   }, []);

//   const initializeAuth = () => {
//     const token = safeStorage.getItem('token');
//     const storedUser = safeStorage.getItem('user');

//     console.log('📋 [AUTH CONTEXT] Stored data:');
//     console.log('   Token:', token);
//     console.log('   User:', storedUser);

//     if (token && storedUser) {
//       try {
//         // Check for "undefined" string
//         if (token === 'undefined') {
//           console.error('❌ [AUTH CONTEXT] Token is string "undefined"');
//           safeStorage.removeItem('token');
//           safeStorage.removeItem('user');
//           setAuthError('Invalid session - please login again');
//           setLoading(false);
//           return;
//         }

//         // Validate token
//         if (!isValidTokenFormat(token)) {
//           console.error('❌ [AUTH CONTEXT] Invalid token format');
//           safeStorage.removeItem('token');
//           safeStorage.removeItem('user');
//           setAuthError('Session invalid - please login again');
//           setLoading(false);
//           return;
//         }

//         // Check expiration
//         if (isTokenExpired(token)) {
//           console.warn('⚠️ [AUTH CONTEXT] Token expired');
//           safeStorage.removeItem('token');
//           safeStorage.removeItem('user');
//           setAuthError('Your session has expired');
//           setLoading(false);
//           return;
//         }

//         const userData = JSON.parse(storedUser);
//         console.log('✅ [AUTH CONTEXT] Valid user restored:', userData);
//         setUser(userData);
//         setAuthError(null);
        
//       } catch (error) {
//         console.error('❌ [AUTH CONTEXT] Initialization error:', error);
//         safeStorage.clear();
//         setAuthError('Failed to restore session');
//       }
//     } else {
//       console.log('👤 [AUTH CONTEXT] No stored session found');
//     }

//     setLoading(false);
//     initializing.current = false;
//   };

//   const login = async (email, password) => {
//     console.log('🔐 [AUTH CONTEXT] Admin login for:', email);
//     setAuthError(null);
    
//     try {
//       const result = await authService.login(email, password);

//       if (!result.success) {
//         console.error('❌ [AUTH CONTEXT] Admin login failed:', result.error);
//         setAuthError(result.error);
//         return result;
//       }

//       const { token, ...userData } = result.user;

//       console.log('📋 [AUTH CONTEXT] Login result:');
//       console.log('   Token:', token);
//       console.log('   Token length:', token?.length);
//       console.log('   User data:', userData);

//       // Validate token
//       if (!token || token === 'undefined') {
//         const errorMsg = `Invalid token: ${token}`;
//         console.error('❌ [AUTH CONTEXT]', errorMsg);
//         setAuthError(errorMsg);
//         return {
//           success: false,
//           error: errorMsg,
//         };
//       }

//       if (!isValidTokenFormat(token)) {
//         const errorMsg = 'Token has invalid format';
//         console.error('❌ [AUTH CONTEXT]', errorMsg);
//         setAuthError(errorMsg);
//         return {
//           success: false,
//           error: errorMsg,
//         };
//       }

//       // Store securely
//       if (!safeStorage.setItem('token', token)) {
//         const errorMsg = 'Failed to store authentication';
//         console.error('❌ [AUTH CONTEXT]', errorMsg);
//         setAuthError(errorMsg);
//         return {
//           success: false,
//           error: errorMsg,
//         };
//       }

//       if (!safeStorage.setItem('user', JSON.stringify(userData))) {
//         safeStorage.removeItem('token');
//         const errorMsg = 'Failed to store user data';
//         console.error('❌ [AUTH CONTEXT]', errorMsg);
//         setAuthError(errorMsg);
//         return {
//           success: false,
//           error: errorMsg,
//         };
//       }

//       setUser(userData);
//       setAuthError(null);
      
//       console.log('✅ [AUTH CONTEXT] Admin login complete');
//       return { success: true, user: userData };
//     } catch (error) {
//       console.error('❌ [AUTH CONTEXT] Login error:', error);
//       const errorMsg = error.message || 'Login failed';
//       setAuthError(errorMsg);
//       return {
//         success: false,
//         error: errorMsg,
//       };
//     }
//   };

//   const businessLogin = async (username, password) => {
//     console.log('🏢 [AUTH CONTEXT] Business login for:', username);
//     setAuthError(null);
    
//     try {
//       const result = await authService.businessLogin(username, password);

//       console.log('📋 [AUTH CONTEXT] Business login result:', result);

//       if (!result.success) {
//         console.error('❌ [AUTH CONTEXT] Business login failed:', result.error);
//         setAuthError(result.error);
//         return result;
//       }

//       // If password change required
//       if (result.requiresPasswordChange) {
//         console.log('🔄 [AUTH CONTEXT] Password change required');
//         console.log('🔐 Temp token:', result.token);
//         console.log('📏 Temp token length:', result.token?.length);
        
//         if (!result.token || result.token === 'undefined') {
//           console.error('❌ [AUTH CONTEXT] No temp token for password change');
//           setAuthError('No temporary token received for password change');
//           return {
//             success: false,
//             error: 'No temporary token received',
//           };
//         }
        
//         return {
//           success: true,
//           requiresPasswordChange: true,
//           business: result.business,
//           token: result.token,
//         };
//       }

//       const token = result.token;
//       const userData = result.user;

//       console.log('📋 [AUTH CONTEXT] Regular business login:');
//       console.log('   Token:', token);
//       console.log('   Token length:', token?.length);
//       console.log('   User data:', userData);

//       // Validate token
//       if (!token || token === 'undefined') {
//         const errorMsg = `Invalid business token: ${token}`;
//         console.error('❌ [AUTH CONTEXT]', errorMsg);
//         setAuthError(errorMsg);
//         return {
//           success: false,
//           error: errorMsg,
//         };
//       }

//       if (!isValidTokenFormat(token)) {
//         const errorMsg = 'Business token has invalid format';
//         console.error('❌ [AUTH CONTEXT]', errorMsg);
//         setAuthError(errorMsg);
//         return {
//           success: false,
//           error: errorMsg,
//         };
//       }

//       // Store securely
//       if (!safeStorage.setItem('token', token)) {
//         const errorMsg = 'Failed to store business authentication';
//         console.error('❌ [AUTH CONTEXT]', errorMsg);
//         setAuthError(errorMsg);
//         return {
//           success: false,
//           error: errorMsg,
//         };
//       }

//       if (!safeStorage.setItem('user', JSON.stringify(userData))) {
//         safeStorage.removeItem('token');
//         const errorMsg = 'Failed to store business user data';
//         console.error('❌ [AUTH CONTEXT]', errorMsg);
//         setAuthError(errorMsg);
//         return {
//           success: false,
//           error: errorMsg,
//         };
//       }

//       setUser(userData);
//       setAuthError(null);
      
//       console.log('✅ [AUTH CONTEXT] Business login complete');
//       return { 
//         success: true, 
//         user: userData,
//         requiresPasswordChange: false 
//       };
//     } catch (error) {
//       console.error('❌ [AUTH CONTEXT] Business login error:', error);
//       const errorMsg = error.message || 'Business login failed';
//       setAuthError(errorMsg);
//       return {
//         success: false,
//         error: errorMsg,
//       };
//     }
//   };

//   const logout = () => {
//     console.log('🚪 [AUTH CONTEXT] Logging out...');
//     safeStorage.clear();
//     setUser(null);
//     setAuthError(null);
//   };

//   const updateUser = (userData) => {
//     console.log('📝 [AUTH CONTEXT] Updating user:', userData);
//     try {
//       setUser(userData);
//       safeStorage.setItem('user', JSON.stringify(userData));
//     } catch (error) {
//       console.error('❌ [AUTH CONTEXT] Error updating user:', error);
//     }
//   };

//   const isAuthenticated = () => {
//     const token = safeStorage.getItem('token');
//     if (!token || token === 'undefined') {
//       console.log('🔐 [AUTH CONTEXT] No valid token');
//       return false;
//     }
    
//     if (!isValidTokenFormat(token)) {
//       console.log('🔐 [AUTH CONTEXT] Invalid token format');
//       return false;
//     }
    
//     return !isTokenExpired(token);
//   };

//   const getCurrentUser = () => {
//     return user;
//   };

//   const getCurrentRole = () => {
//     if (!user) return null;
    
//     if (user.role) {
//       return user.role;
//     }
    
//     if (user.businessId) {
//       return USER_ROLES.BUSINESS_USER;
//     }
    
//     return null;
//   };

//   const clearAuthError = () => {
//     setAuthError(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         authError,
//         login,
//         businessLogin,
//         logout,
//         updateUser,
//         clearAuthError,
//         isAuthenticated: isAuthenticated(),
//         isAdmin: getCurrentRole() === USER_ROLES.ADMIN,
//         isBusiness: getCurrentRole() === USER_ROLES.BUSINESS_USER,
//         currentRole: getCurrentRole(),
//         getCurrentUser,
//       }}
//     >
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { authService } from '../services/auth';
import { USER_ROLES } from '../utils/constants';
import { decodeToken, isTokenExpired, isValidTokenFormat,getToken,setToken,clearTokens } from '../utils/auth';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

// Safe localStorage wrapper
const safeStorage = {
  getItem: (key) => {
    try {
      const value = localStorage.getItem(key);
      console.log(`📝 [STORAGE] GET ${key}:`, value ? `${value.length} chars` : 'null');
      return value;
    } catch (error) {
      console.error(`❌ [STORAGE] Error getting ${key}:`, error);
      return null;
    }
  },
  
  setItem: (key, value) => {
    try {
      console.log(`📝 [STORAGE] SET ${key}:`);
      console.log(`   Value: ${value}`);
      console.log(`   Type: ${typeof value}`);
      console.log(`   Length: ${value?.length}`);
      
      if (value === undefined) {
        console.error(`❌ [STORAGE] Cannot store undefined for ${key}`);
        return false;
      }
      
      if (value === 'undefined') {
        console.error(`❌ [STORAGE] Cannot store string "undefined" for ${key}`);
        return false;
      }
      
      localStorage.setItem(key, value);
      console.log(`✅ [STORAGE] ${key} stored successfully`);
      return true;
    } catch (error) {
      console.error(`❌ [STORAGE] Error setting ${key}:`, error);
      return false;
    }
  },
  
  removeItem: (key) => {
    try {
      console.log(`🗑️ [STORAGE] REMOVE ${key}`);
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`❌ [STORAGE] Error removing ${key}:`, error);
      return false;
    }
  },
  
  clear: () => {
    try {
      console.log('🧹 [STORAGE] CLEAR ALL');
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('❌ [STORAGE] Error clearing:', error);
      return false;
    }
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const initializing = useRef(false);

  useEffect(() => {
    if (!initializing.current) {
      initializing.current = true;
      console.log('🔄 [AUTH CONTEXT] Initializing auth...');
      initializeAuth();
    }
  }, []);

  const initializeAuth = () => {
  const token = getToken(); // now reads sessionStorage
  const storedUser = sessionStorage.getItem('user');

    console.log('📋 [AUTH CONTEXT] Stored data:');
    console.log('   Token:', token);
    console.log('   User:', storedUser);

    if (token && storedUser) {
      try {
        // Check for "undefined" string
        if (token === 'undefined') {
          console.error('❌ [AUTH CONTEXT] Token is string "undefined"');
          safeStorage.removeItem('token');
          safeStorage.removeItem('user');
          setAuthError('Invalid session - please login again');
          setLoading(false);
          return;
        }

        // Validate token
        if (!isValidTokenFormat(token)) {
          console.error('❌ [AUTH CONTEXT] Invalid token format');
          safeStorage.removeItem('token');
          safeStorage.removeItem('user');
          setAuthError('Session invalid - please login again');
          setLoading(false);
          return;
        }

        // Check expiration
        if (isTokenExpired(token)) {
          console.warn('⚠️ [AUTH CONTEXT] Token expired');
          safeStorage.removeItem('token');
          safeStorage.removeItem('user');
          setAuthError('Your session has expired');
          setLoading(false);
          return;
        }

        const userData = JSON.parse(storedUser);
        console.log('✅ [AUTH CONTEXT] Valid user restored:', userData);
        setUser(userData);
        setAuthError(null);
        
      } catch (error) {
        console.error('❌ [AUTH CONTEXT] Initialization error:', error);
        safeStorage.clear();
        setAuthError('Failed to restore session');
      }
    } else {
      console.log('👤 [AUTH CONTEXT] No stored session found');
    }

    setLoading(false);
    initializing.current = false;
  };

  const login = async (email, password) => {
    console.log('🔐 [AUTH CONTEXT] Admin login for:', email);
    setAuthError(null);
    
    try {
      const result = await authService.login(email, password);

      if (!result.success) {
        console.error('❌ [AUTH CONTEXT] Admin login failed:', result.error);
        setAuthError(result.error);
        return result;
      }

      const { token, ...userData } = result.user;

      console.log('📋 [AUTH CONTEXT] Login result:');
      console.log('   Token:', token);
      console.log('   Token length:', token?.length);
      console.log('   User data:', userData);

      // Validate token
      if (!token || token === 'undefined') {
        const errorMsg = `Invalid token: ${token}`;
        console.error('❌ [AUTH CONTEXT]', errorMsg);
        setAuthError(errorMsg);
        return {
          success: false,
          error: errorMsg,
        };
      }

      if (!isValidTokenFormat(token)) {
        const errorMsg = 'Token has invalid format';
        console.error('❌ [AUTH CONTEXT]', errorMsg);
        setAuthError(errorMsg);
        return {
          success: false,
          error: errorMsg,
        };
      }

      // Store securely
      // if (!safeStorage.setItem('token', token)) {
      //   const errorMsg = 'Failed to store authentication';
      //   console.error('❌ [AUTH CONTEXT]', errorMsg);
      //   setAuthError(errorMsg);
      //   return {
      //     success: false,
      //     error: errorMsg,
      //   };
      // }
      // Store securely

      setToken(token, 'admin');
sessionStorage.setItem('user', JSON.stringify(userData));

      if (!safeStorage.setItem('user', JSON.stringify(userData))) {
        safeStorage.removeItem('token');
        const errorMsg = 'Failed to store user data';
        console.error('❌ [AUTH CONTEXT]', errorMsg);
        setAuthError(errorMsg);
        return {
          success: false,
          error: errorMsg,
        };
      }

      setUser(userData);
      setAuthError(null);
      
      console.log('✅ [AUTH CONTEXT] Admin login complete');
      
      // FIXED: Return user WITH token
      return { 
        success: true, 
        user: { 
          ...userData, 
          token // Include the token!
        } 
      };
    } catch (error) {
      console.error('❌ [AUTH CONTEXT] Login error:', error);
      const errorMsg = error.message || 'Login failed';
      setAuthError(errorMsg);
      return {
        success: false,
        error: errorMsg,
      };
    }
  };

  const businessLogin = async (username, password) => {
    console.log('🏢 [AUTH CONTEXT] Business login for:', username);
    setAuthError(null);
    
    try {
      const result = await authService.businessLogin(username, password);

      console.log('📋 [AUTH CONTEXT] Business login result:', result);

      if (!result.success) {
        console.error('❌ [AUTH CONTEXT] Business login failed:', result.error);
        setAuthError(result.error);
        return result;
      }

      // If password change required
      if (result.requiresPasswordChange) {
        console.log('🔄 [AUTH CONTEXT] Password change required');
        console.log('🔐 Temp token:', result.token);
        console.log('📏 Temp token length:', result.token?.length);
        
        if (!result.token || result.token === 'undefined') {
          console.error('❌ [AUTH CONTEXT] No temp token for password change');
          setAuthError('No temporary token received for password change');
          return {
            success: false,
            error: 'No temporary token received',
          };
        }
        
        return {
          success: true,
          requiresPasswordChange: true,
          business: result.business,
          token: result.token,
        };
      }

      // const token = result.token;
      // const userData = result.user;
      const token = result.token;
const decoded = decodeToken(token);
const userData = {
  ...result.user,
  businessId: decoded?.businessId || result.business?.businessId || result.user?.businessId,
};

      console.log('📋 [AUTH CONTEXT] Regular business login:');
      console.log('   Token:', token);
      console.log('   Token length:', token?.length);
      console.log('   User data:', userData);

      // Validate token
      if (!token || token === 'undefined') {
        const errorMsg = `Invalid business token: ${token}`;
        console.error('❌ [AUTH CONTEXT]', errorMsg);
        setAuthError(errorMsg);
        return {
          success: false,
          error: errorMsg,
        };
      }

      if (!isValidTokenFormat(token)) {
        const errorMsg = 'Business token has invalid format';
        console.error('❌ [AUTH CONTEXT]', errorMsg);
        setAuthError(errorMsg);
        return {
          success: false,
          error: errorMsg,
        };
      }

      // // Store securely
      // if (!safeStorage.setItem('token', token)) {
      //   const errorMsg = 'Failed to store business authentication';
      //   console.error('❌ [AUTH CONTEXT]', errorMsg);
      //   setAuthError(errorMsg);
      //   return {
      //     success: false,
      //     error: errorMsg,
      //   };
      // }
      // Store securely
      setToken(token, 'business');
      sessionStorage.setItem('user', JSON.stringify(userData));


      if (!safeStorage.setItem('user', JSON.stringify(userData))) {
        safeStorage.removeItem('token');
        const errorMsg = 'Failed to store business user data';
        console.error('❌ [AUTH CONTEXT]', errorMsg);
        setAuthError(errorMsg);
        return {
          success: false,
          error: errorMsg,
        };
      }

      setUser(userData);
      setAuthError(null);
      
      console.log('✅ [AUTH CONTEXT] Business login complete');
      
      // FIXED: Return user WITH token
      return { 
        success: true, 
        user: { 
          ...userData, 
          token // Include the token!
        },
        requiresPasswordChange: false 
      };
    } catch (error) {
      console.error('❌ [AUTH CONTEXT] Business login error:', error);
      const errorMsg = error.message || 'Business login failed';
      setAuthError(errorMsg);
      return {
        success: false,
        error: errorMsg,
      };
    }
  };

  // const logout = () => {
  //   console.log('🚪 [AUTH CONTEXT] Logging out...');
  //   safeStorage.clear();
  //   setUser(null);
  //   setAuthError(null);
  // };

  const logout = () => {
  console.log('🚪 [AUTH CONTEXT] Logging out...');
  clearTokens();
  sessionStorage.removeItem('user');
  setUser(null);
  setAuthError(null);
};

  const updateUser = (userData) => {
    console.log('📝 [AUTH CONTEXT] Updating user:', userData);
    try {
      setUser(userData);
      safeStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('❌ [AUTH CONTEXT] Error updating user:', error);
    }
  };

  const updateToken = (newToken) => {
    console.log('🔄 [AUTH CONTEXT] Updating token, length:', newToken?.length || 0);
    try {
      if (newToken && isValidTokenFormat(newToken)) {
        safeStorage.setItem('token', newToken);
      } else {
        console.error('❌ [AUTH CONTEXT] Cannot update with invalid token');
      }
    } catch (error) {
      console.error('❌ [AUTH CONTEXT] Error updating token:', error);
    }
  };

  const isAuthenticated = () => {
    // const token = safeStorage.getItem('token');
    const token = getToken();
    if (!token || token === 'undefined') {
      console.log('🔐 [AUTH CONTEXT] No valid token');
      return false;
    }
    
    if (!isValidTokenFormat(token)) {
      console.log('🔐 [AUTH CONTEXT] Invalid token format');
      return false;
    }
    
    return !isTokenExpired(token);
  };

  const getCurrentUser = () => {
    return user;
  };

  const getCurrentRole = () => {
    if (!user) return null;
    
    if (user.role) {
      return user.role;
    }
    
    if (user.businessId) {
      return USER_ROLES.BUSINESS_USER;
    }
    
    return null;
  };

  const clearAuthError = () => {
    setAuthError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authError,
        login,
        businessLogin,
        logout,
        updateUser,
        updateToken,
        clearAuthError,
        isAuthenticated: isAuthenticated(),
        isAdmin: getCurrentRole() === USER_ROLES.ADMIN,
        isBusiness: getCurrentRole() === USER_ROLES.BUSINESS_USER,
        currentRole: getCurrentRole(),
        getCurrentUser,
      }}
    >
      {/* {!loading && children} */}
      {children}
    </AuthContext.Provider>
  );
};