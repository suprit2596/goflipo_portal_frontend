// // import React, { useState } from 'react';
// // import { useNavigate, useLocation } from 'react-router-dom';
// // import {
// //   Box,
// //   Button,
// //   Container,
// //   Paper,
// //   TextField,
// //   Typography,
// //   Alert,
// //   CircularProgress,
// // } from '@mui/material';
// // import { businessAuthService } from '../services/businessAuth';
// // import { useAuth } from '../context/AuthContext';

// // const ChangePassword = () => {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const { logout } = useAuth();
  
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [success, setSuccess] = useState(false);
  
// //   const [formData, setFormData] = useState({
// //     oldPassword: '',
// //     newPassword: '',
// //     confirmPassword: '',
// //   });

// //   // Check if it's first login (no old password required)
// //   const isFirstLogin = location.state?.isFirstLogin || false;
// //   const businessName = location.state?.businessName || 'Your Business';

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError('');
// //     setLoading(true);

// //     const { oldPassword, newPassword, confirmPassword } = formData;

// //     // Validation
// //     if (!newPassword || !confirmPassword) {
// //       setError('New password and confirmation are required');
// //       setLoading(false);
// //       return;
// //     }

// //     if (newPassword !== confirmPassword) {
// //       setError('New password and confirmation do not match');
// //       setLoading(false);
// //       return;
// //     }

// //     if (newPassword.length < 6) {
// //       setError('Password must be at least 6 characters long');
// //       setLoading(false);
// //       return;
// //     }

// //     if (!isFirstLogin && !oldPassword) {
// //       setError('Old password is required');
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       const result = await businessAuthService.changePassword(
// //         isFirstLogin ? '' : oldPassword,
// //         newPassword,
// //         confirmPassword,
// //         isFirstLogin ? 'temp' : 'regular'
// //       );

// //       if (result.success) {
// //         setSuccess(true);
        
// //         // Store new token
// //         if (result.data.token) {
// //           localStorage.setItem('token', result.data.token);
// //           localStorage.setItem('user', JSON.stringify(result.data.business));
// //         }
        
// //         // Redirect after 2 seconds
// //         setTimeout(() => {
// //           if (isFirstLogin) {
// //             navigate('/business/dashboard');
// //           } else {
// //             navigate('/business/profile');
// //           }
// //         }, 2000);
// //       } else {
// //         setError(result.error);
// //       }
// //     } catch (err) {
// //       setError('Failed to change password. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleCancel = () => {
// //     if (isFirstLogin) {
// //       // For first login, logout and go to login page
// //       logout();
// //       navigate('/login');
// //     } else {
// //       // For regular password change, go back
// //       navigate(-1);
// //     }
// //   };

// //   return (
// //     <Container maxWidth="sm">
// //       <Box
// //         sx={{
// //           minHeight: '100vh',
// //           display: 'flex',
// //           alignItems: 'center',
// //           justifyContent: 'center',
// //           py: 4,
// //         }}
// //       >
// //         <Paper
// //           elevation={3}
// //           sx={{
// //             p: 4,
// //             width: '100%',
// //             borderRadius: 2,
// //           }}
// //         >
// //           <Typography variant="h5" component="h1" gutterBottom align="center">
// //             {isFirstLogin ? 'Set Your New Password' : 'Change Password'}
// //           </Typography>
          
// //           {isFirstLogin && (
// //             <Alert severity="info" sx={{ mb: 3 }}>
// //               <Typography variant="body2">
// //                 Welcome to <strong>{businessName}</strong>! For security reasons, 
// //                 you must change your default password on first login.
// //               </Typography>
// //             </Alert>
// //           )}

// //           {error && (
// //             <Alert severity="error" sx={{ mb: 3 }}>
// //               {error}
// //             </Alert>
// //           )}

// //           {success && (
// //             <Alert severity="success" sx={{ mb: 3 }}>
// //               Password changed successfully! Redirecting...
// //             </Alert>
// //           )}

// //           <form onSubmit={handleSubmit}>
// //             {!isFirstLogin && (
// //               <TextField
// //                 fullWidth
// //                 label="Current Password"
// //                 name="oldPassword"
// //                 type="password"
// //                 value={formData.oldPassword}
// //                 onChange={handleChange}
// //                 margin="normal"
// //                 required
// //                 disabled={loading || success}
// //               />
// //             )}

// //             <TextField
// //               fullWidth
// //               label="New Password"
// //               name="newPassword"
// //               type="password"
// //               value={formData.newPassword}
// //               onChange={handleChange}
// //               margin="normal"
// //               required
// //               disabled={loading || success}
// //               helperText="Must be at least 6 characters"
// //             />

// //             <TextField
// //               fullWidth
// //               label="Confirm New Password"
// //               name="confirmPassword"
// //               type="password"
// //               value={formData.confirmPassword}
// //               onChange={handleChange}
// //               margin="normal"
// //               required
// //               disabled={loading || success}
// //             />

// //             <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
// //               <Button
// //                 fullWidth
// //                 variant="contained"
// //                 color="primary"
// //                 type="submit"
// //                 disabled={loading || success}
// //               >
// //                 {loading ? (
// //                   <CircularProgress size={24} color="inherit" />
// //                 ) : (
// //                   'Change Password'
// //                 )}
// //               </Button>

// //               <Button
// //                 fullWidth
// //                 variant="outlined"
// //                 onClick={handleCancel}
// //                 disabled={loading || success}
// //               >
// //                 Cancel
// //               </Button>
// //             </Box>

// //             {isFirstLogin && (
// //               <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
// //                 Note: You must change your password to access the business portal.
// //               </Typography>
// //             )}
// //           </form>
// //         </Paper>
// //       </Box>
// //     </Container>
// //   );
// // };

// // export default ChangePassword;

// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import {
//   Box,
//   Button,
//   Container,
//   Paper,
//   TextField,
//   Typography,
//   Alert,
//   CircularProgress,
// } from '@mui/material';
// import { businessAuthService } from '../services/businessAuth';
// import { useAuth } from '../context/AuthContext';

// const ChangePassword = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { logout, updateUser } = useAuth();
  
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
  
//   const [formData, setFormData] = useState({
//     oldPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });

//   // Get state from navigation
//   const isFirstLogin = location.state?.isFirstLogin || false;
//   const businessName = location.state?.businessName || 'Your Business';
//   const tempToken = location.state?.tempToken || null;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const validateForm = () => {
//     const { oldPassword, newPassword, confirmPassword } = formData;

//     if (!newPassword || !confirmPassword) {
//       setError('New password and confirmation are required');
//       return false;
//     }

//     if (newPassword !== confirmPassword) {
//       setError('New password and confirmation do not match');
//       return false;
//     }

//     if (newPassword.length < 6) {
//       setError('Password must be at least 6 characters long');
//       return false;
//     }

//     if (!isFirstLogin && !oldPassword) {
//       setError('Current password is required');
//       return false;
//     }

//     return true;
//   };

//   const handleFirstLoginSubmit = async () => {
//     if (!tempToken) {
//       setError('Session expired. Please login again.');
//       setTimeout(() => {
//         logout();
//         navigate('/login');
//       }, 2000);
//       return;
//     }

//     const result = await businessAuthService.changePasswordWithTempToken(
//       tempToken,
//       formData.newPassword,
//       formData.confirmPassword
//     );

//     if (result.success) {
//       setSuccess(true);
      
//       // Store new regular token
//       if (result.data.token && result.data.business) {
//         localStorage.setItem('token', result.data.token);
//         localStorage.setItem('user', JSON.stringify(result.data.business));
//         updateUser(result.data.business);
//       }
      
//       // Redirect to dashboard
//       setTimeout(() => {
//         navigate('/business/dashboard');
//       }, 2000);
//     } else {
//       setError(result.error);
//     }
//   };

//   const handleRegularPasswordChange = async () => {
//     const result = await businessAuthService.changePassword(
//       formData.oldPassword,
//       formData.newPassword,
//       formData.confirmPassword
//     );

//     if (result.success) {
//       setSuccess(true);
      
//       // Update token if returned
//       if (result.data.token && result.data.business) {
//         localStorage.setItem('token', result.data.token);
//         localStorage.setItem('user', JSON.stringify(result.data.business));
//         updateUser(result.data.business);
//       }
      
//       // Redirect to profile or dashboard
//       setTimeout(() => {
//         navigate('/business/dashboard');
//       }, 2000);
//     } else {
//       setError(result.error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);

//     try {
//       if (isFirstLogin) {
//         await handleFirstLoginSubmit();
//       } else {
//         await handleRegularPasswordChange();
//       }
//     } catch (err) {
//       setError('Failed to change password. Please try again.');
//       console.error('Password change error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     if (isFirstLogin) {
//       // For first login, logout and go to login page
//       logout();
//       navigate('/login');
//     } else {
//       // For regular password change, go back
//       navigate(-1);
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box
//         sx={{
//           minHeight: '100vh',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           py: 4,
//         }}
//       >
//         <Paper
//           elevation={3}
//           sx={{
//             p: 4,
//             width: '100%',
//             borderRadius: 2,
//           }}
//         >
//           <Typography variant="h5" component="h1" gutterBottom align="center">
//             {isFirstLogin ? 'Set Your New Password' : 'Change Password'}
//           </Typography>
          
//           {isFirstLogin && (
//             <Alert severity="info" sx={{ mb: 3 }}>
//               <Typography variant="body2">
//                 Welcome to <strong>{businessName}</strong>! For security reasons, 
//                 you must change your default password on first login.
//               </Typography>
//             </Alert>
//           )}

//           {!tempToken && isFirstLogin && (
//             <Alert severity="warning" sx={{ mb: 3 }}>
//               <Typography variant="body2">
//                 Session token missing. You may need to login again.
//               </Typography>
//             </Alert>
//           )}

//           {error && (
//             <Alert severity="error" sx={{ mb: 3 }}>
//               {error}
//             </Alert>
//           )}

//           {success && (
//             <Alert severity="success" sx={{ mb: 3 }}>
//               Password changed successfully! Redirecting...
//             </Alert>
//           )}

//           <form onSubmit={handleSubmit}>
//             {!isFirstLogin && (
//               <TextField
//                 fullWidth
//                 label="Current Password"
//                 name="oldPassword"
//                 type="password"
//                 value={formData.oldPassword}
//                 onChange={handleChange}
//                 margin="normal"
//                 required
//                 disabled={loading || success}
//               />
//             )}

//             <TextField
//               fullWidth
//               label="New Password"
//               name="newPassword"
//               type="password"
//               value={formData.newPassword}
//               onChange={handleChange}
//               margin="normal"
//               required
//               disabled={loading || success}
//               helperText="Must be at least 6 characters"
//             />

//             <TextField
//               fullWidth
//               label="Confirm New Password"
//               name="confirmPassword"
//               type="password"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               margin="normal"
//               required
//               disabled={loading || success}
//             />

//             <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
//               <Button
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//                 type="submit"
//                 disabled={loading || success || (isFirstLogin && !tempToken)}
//               >
//                 {loading ? (
//                   <CircularProgress size={24} color="inherit" />
//                 ) : (
//                   'Change Password'
//                 )}
//               </Button>

//               <Button
//                 fullWidth
//                 variant="outlined"
//                 onClick={handleCancel}
//                 disabled={loading || success}
//               >
//                 Cancel
//               </Button>
//             </Box>

//             {isFirstLogin && (
//               <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
//                 Note: You must change your password to access the business portal.
//               </Typography>
//             )}
//           </form>
//         </Paper>
//       </Box>
//     </Container>
//   );
// };

// export default ChangePassword;

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import {
  LockOutlined,
  LockResetOutlined,
  SecurityOutlined,
} from '@mui/icons-material';
import { businessAuthService } from '../services/businessAuth';
import { useAuth } from '../context/AuthContext';

const ChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, updateUser } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Get state from navigation
  const isFirstLogin = location.state?.isFirstLogin || false;
  const businessName = location.state?.businessName || 'Your Business';
  const tempToken = location.state?.tempToken || null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { oldPassword, newPassword, confirmPassword } = formData;

    if (!newPassword || !confirmPassword) {
      setError('New password and confirmation are required');
      return false;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match');
      return false;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    if (newPassword === '123456') {
      setError('New password cannot be the default password (123456)');
      return false;
    }

    if (!isFirstLogin && !oldPassword) {
      setError('Current password is required');
      return false;
    }

    return true;
  };
const handleFirstLoginSubmit = async () => {
  if (!tempToken) {
    setError('Session expired. Please login again.');
    setTimeout(() => {
      logout();
      navigate('/business-login');
    }, 2000);
    return;
  }

  // For first login, old password is the default password
  const result = await businessAuthService.changePasswordWithTempToken(
    tempToken,
    '123456', // Default password for first login
    formData.newPassword,
    formData.confirmPassword
  );

  if (result.success) {
    setSuccess(true);
    
    // Store new regular token
    if (result.data.token && result.data.business) {
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('user', JSON.stringify(result.data.business));
      updateUser(result.data.business);
    }
    
    // Redirect to login page (CHANGED from dashboard to login)
    setTimeout(() => {
      // Clear any stored tokens to force fresh login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      logout();
      
      navigate('/business-login', {
        state: {
          message: 'Password changed successfully! Please login with your new password.',
          email: result.data.business?.email // Optional: pre-fill email
        }
      });
    }, 2000);
  } else {
    setError(result.error);
  }
};

  const handleRegularPasswordChange = async () => {
    const result = await businessAuthService.changePassword(
      formData.oldPassword,
      formData.newPassword,
      formData.confirmPassword
    );

    if (result.success) {
      setSuccess(true);
      
      // Update token if returned
      if (result.data.token && result.data.business) {
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data.business));
        updateUser(result.data.business);
      }
      
      // Redirect to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } else {
      setError(result.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (isFirstLogin) {
        await handleFirstLoginSubmit();
      } else {
        await handleRegularPasswordChange();
      }
    } catch (err) {
      setError('Failed to change password. Please try again.');
      console.error('Password change error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (isFirstLogin) {
      // For first login, logout and go to login page
      logout();
      navigate('/business-login');
    } else {
      // For regular password change, go back
      navigate(-1);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4,
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 60,
                height: 60,
                borderRadius: 2,
                bgcolor: 'primary.main',
                mb: 2,
              }}
            >
              <SecurityOutlined sx={{ fontSize: 30, color: 'white' }} />
            </Box>
            <Typography variant="h5" component="h1" fontWeight={600}>
              {isFirstLogin ? 'Set Your New Password' : 'Change Password'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {isFirstLogin ? `Welcome to ${businessName}` : 'Update your account password'}
            </Typography>
          </Box>

          {isFirstLogin && (
            <Alert 
              severity="info" 
              sx={{ 
                mb: 3, 
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'info.light',
              }}
            >
              <Typography variant="body2">
                <strong>Security Requirement:</strong> You must change your default password on first login.
              </Typography>
            </Alert>
          )}

          {!tempToken && isFirstLogin && (
            <Alert severity="warning" sx={{ mb: 3 }}>
              <Typography variant="body2">
                Session token missing. You may need to login again.
              </Typography>
            </Alert>
          )}

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: 2,
              }}
            >
              {error}
            </Alert>
          )}

          {success && (
            <Alert 
              severity="success" 
              sx={{ 
                mb: 3,
                borderRadius: 2,
              }}
            >
              Password changed successfully! Redirecting to dashboard...
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            {!isFirstLogin && (
              <TextField
                fullWidth
                label="Current Password"
                name="oldPassword"
                type="password"
                value={formData.oldPassword}
                onChange={handleChange}
                margin="normal"
                required
                disabled={loading || success}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            )}

            <TextField
              fullWidth
              label="New Password"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              margin="normal"
              required
              disabled={loading || success}
              helperText="Must be at least 6 characters and not '123456'"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockResetOutlined color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />

            <TextField
              fullWidth
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              required
              disabled={loading || success}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />

            <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading || success || (isFirstLogin && !tempToken)}
                size="large"
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                  '&:hover': {
                    boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)',
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Update Password'
                )}
              </Button>

              <Button
                fullWidth
                variant="outlined"
                onClick={handleCancel}
                disabled={loading || success}
                size="large"
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: 'none',
                }}
              >
                Cancel
              </Button>
            </Box>

            <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                <strong>Security Tips:</strong>
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                • Use a strong password with letters, numbers, and symbols
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                • Do not use common passwords or personal information
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                • Store your password securely
              </Typography>
            </Box>

            {isFirstLogin && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                <strong>Note:</strong> Your new password will be emailed to you for security.
              </Typography>
            )}
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default ChangePassword;