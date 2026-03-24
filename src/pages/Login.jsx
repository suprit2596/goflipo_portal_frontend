// // // // // import React, { useState } from 'react';
// // // // // import { useNavigate, Link as RouterLink } from 'react-router-dom';
// // // // // import Logo from '../assets/pinnale.jpg';

// // // // // import {
// // // // //   Box,
// // // // //   Paper,
// // // // //   Typography,
// // // // //   TextField,
// // // // //   Button,
// // // // //   Alert,
// // // // //   Link,
// // // // //   InputAdornment,
// // // // //   IconButton,
// // // // //   CircularProgress,
// // // // // } from '@mui/material';

// // // // // import {
// // // // //   EmailOutlined,
// // // // //   LockOutlined,
// // // // //   Visibility,
// // // // //   VisibilityOff,
// // // // // } from '@mui/icons-material';

// // // // // import { useAuth } from '../context/AuthContext';
// // // // // import { USER_ROLES , ROUTES } from '../utils/constants';
// // // // // import { validateEmail } from '../utils/validators';

// // // // // const Login = () => {
// // // // //   const navigate = useNavigate();
// // // // //   const { login, loading: authLoading, error: authError } = useAuth();

// // // // //   const [formData, setFormData] = useState({ email: '', password: '' });
// // // // //   const [errors, setErrors] = useState({});
// // // // //   const [showPassword, setShowPassword] = useState(false);
// // // // //   const [submitting, setSubmitting] = useState(false);
// // // // //   const [loginError, setLoginError] = useState('');

// // // // //   const loading = authLoading || submitting;
// // // // //   const displayError = loginError || authError;

// // // // //   const handleChange = (e) => {
// // // // //     const { name, value } = e.target;
// // // // //     setFormData(prev => ({ ...prev, [name]: value }));
// // // // //     setErrors(prev => ({ ...prev, [name]: '' }));
// // // // //     setLoginError('');
// // // // //   };

// // // // //   const validateForm = () => {
// // // // //     const err = {};
// // // // //     if (!formData.email) err.email = 'Email is required';
// // // // //     else if (!validateEmail(formData.email)) err.email = 'Invalid email address';
// // // // //     if (!formData.password) err.password = 'Password is required';
// // // // //     setErrors(err);
// // // // //     return Object.keys(err).length === 0;
// // // // //   };

// // // // //   const handleSubmit = async (e) => {
// // // // //     e.preventDefault();
// // // // //     if (!validateForm()) return;

// // // // //     try {
// // // // //       setSubmitting(true);
// // // // //       const res = await login(formData.email, formData.password);
// // // // //       if (res.success) {
// // // // //         navigate(
// // // // //           res.user?.role === USER_ROLES.ADMIN
// // // // //           ? ROUTES.ADMIN_DASHBOARD
// // // // //           : ROUTES.BUSINESS_DASHBOARD

// // // // //         );
// // // // //       } else {
// // // // //         setLoginError(res.error || 'Login failed');
// // // // //       }
// // // // //     } catch {
// // // // //       setLoginError('Something went wrong. Please try again.');
// // // // //     } finally {
// // // // //       setSubmitting(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <Box
// // // // //       sx={{
// // // // //         height: '100vh',
// // // // //         width: '100vw',
// // // // //         display: 'grid',
// // // // //         placeItems: 'center',
// // // // //         overflow: 'hidden',
// // // // //         background: `
// // // // //           radial-gradient(1200px 600px at top, #eef4ff 0%, #f7faff 60%)
// // // // //         `,
// // // // //       }}
// // // // //     >
// // // // //       <Paper
// // // // //         elevation={24}
// // // // //         sx={{
// // // // //           width: '100%',
// // // // //           maxWidth: 420,
// // // // //           height: 'clamp(520px, 90vh, 620px)',
// // // // //           px: 4,
// // // // //           py: 5,
// // // // //           borderRadius: 4,
// // // // //           display: 'grid',
// // // // //           gridTemplateRows: 'auto auto 1fr auto',
// // // // //           backgroundColor: '#ffffff',
// // // // //           boxShadow: `
// // // // //             0 24px 48px rgba(30, 102, 245, 0.18),
// // // // //             inset 0 1px 0 rgba(255,255,255,0.7)
// // // // //           `,
// // // // //         }}
// // // // //       >
// // // // //         {/* changes logo  */}
// // // // //         {/* ===== Brand ===== */}
// // // // //       <Box textAlign="center">
// // // // //         <Box
// // // // //           component="img"
// // // // //           src={Logo}
// // // // //           alt="GoFlipo"
// // // // //           sx={{
// // // // //             height: 30, // Reduced from 68
// // // // //             width: 'auto', // Changed from fixed 68 to auto
// // // // //             maxWidth: '180px', // Added to control max width
// // // // //             mb: 1.5,
// // // // //             objectFit: 'contain',
// // // // //           }}
// // // // //         />
// // // // //         <Typography
// // // // //           variant="h5"
// // // // //           fontWeight={700}
// // // // //           sx={{ color: '#1E66F5', letterSpacing: 0.4 }}
// // // // //         >
// // // // //           GoFlipo
// // // // //         </Typography>
// // // // //         <Typography
// // // // //           fontSize={14}
// // // // //           sx={{ color: '#6b7895', mt: 0.5 }}
// // // // //         >
// // // // //           Sign in to continue
// // // // //         </Typography>
// // // // //       </Box>

// // // // //         {/* ===== Error ===== */}
// // // // //         {displayError && (
// // // // //           <Alert
// // // // //             severity="error"
// // // // //             sx={{
// // // // //               borderRadius: 2,
// // // // //               mt: 2,
// // // // //               fontSize: 14,
// // // // //             }}
// // // // //           >
// // // // //             {displayError}
// // // // //           </Alert>
// // // // //         )}

// // // // //         {/* ===== Form ===== */}
// // // // //         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
// // // // //           <TextField
// // // // //             fullWidth
// // // // //             label="Email address"
// // // // //             name="email"
// // // // //             value={formData.email}
// // // // //             onChange={handleChange}
// // // // //             error={!!errors.email}
// // // // //             helperText={errors.email}
// // // // //             disabled={loading}
// // // // //             margin="normal"
// // // // //             InputProps={{
// // // // //               startAdornment: (
// // // // //                 <InputAdornment position="start">
// // // // //                   <EmailOutlined sx={{ color: '#1E66F5' }} />
// // // // //                 </InputAdornment>
// // // // //               ),
// // // // //             }}
// // // // //             sx={{
// // // // //               '& .MuiOutlinedInput-root': {
// // // // //                 borderRadius: 2,
// // // // //                 backgroundColor: '#f8faff',
// // // // //               },
// // // // //             }}
// // // // //           />

// // // // //           <TextField
// // // // //             fullWidth
// // // // //             label="Password"
// // // // //             name="password"
// // // // //             type={showPassword ? 'text' : 'password'}
// // // // //             value={formData.password}
// // // // //             onChange={handleChange}
// // // // //             error={!!errors.password}
// // // // //             helperText={errors.password}
// // // // //             disabled={loading}
// // // // //             margin="normal"
// // // // //             InputProps={{
// // // // //               startAdornment: (
// // // // //                 <InputAdornment position="start">
// // // // //                   <LockOutlined sx={{ color: '#1E66F5' }} />
// // // // //                 </InputAdornment>
// // // // //               ),
// // // // //               endAdornment: (
// // // // //                 <InputAdornment position="end">
// // // // //                   <IconButton
// // // // //                     size="small"
// // // // //                     onClick={() => setShowPassword(v => !v)}
// // // // //                   >
// // // // //                     {showPassword ? <VisibilityOff /> : <Visibility />}
// // // // //                   </IconButton>
// // // // //                 </InputAdornment>
// // // // //               ),
// // // // //             }}
// // // // //             sx={{
// // // // //               '& .MuiOutlinedInput-root': {
// // // // //                 borderRadius: 2,
// // // // //                 backgroundColor: '#f8faff',
// // // // //               },
// // // // //             }}
// // // // //           />

// // // // //           <Button
// // // // //             type="submit"
// // // // //             fullWidth
// // // // //             disabled={loading}
// // // // //             sx={{
// // // // //               mt: 3,
// // // // //               py: 1.4,
// // // // //               borderRadius: 2,
// // // // //               textTransform: 'none',
// // // // //               fontSize: 16,
// // // // //               fontWeight: 600,
// // // // //               color: '#fff',
// // // // //               background: 'linear-gradient(90deg, #1E66F5, #4C8DFF)',
// // // // //               boxShadow: '0 12px 28px rgba(30,102,245,0.35)',
// // // // //               '&:hover': {
// // // // //                 background: 'linear-gradient(90deg, #1a5be0, #3f7df0)',
// // // // //               },
// // // // //             }}
// // // // //           >
// // // // //             {loading ? (
// // // // //               <CircularProgress size={22} sx={{ color: '#fff' }} />
// // // // //             ) : (
// // // // //               'Sign In'
// // // // //             )}
// // // // //           </Button>
// // // // //         </Box>

// // // // //         {/* ===== Footer ===== */}
// // // // //         <Box textAlign="center" sx={{ mt: 2 }}>
// // // // //           <Link
// // // // //             component={RouterLink}
// // // // //             to="/forgot-password"
// // // // //             underline="hover"
// // // // //             sx={{
// // // // //               fontSize: 13,
// // // // //               color: '#1E66F5',
// // // // //               fontWeight: 500,
// // // // //             }}
// // // // //           >
// // // // //             Forgot password?
// // // // //           </Link>

// // // // //           <Typography fontSize={12.5} color="#7a879f" mt={3}>
// // // // //             Don’t have access?{' '}
// // // // //             <Link component={RouterLink} to="/contact-admin">
// // // // //               Contact admin
// // // // //             </Link>
// // // // //           </Typography>
// // // // //         </Box>
// // // // //       </Paper>
// // // // //     </Box>
// // // // //   );
// // // // // };

// // // // // export default Login;

// // // // import React, { useState } from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import {
// // // //   Box,
// // // //   Button,
// // // //   Container,
// // // //   Paper,
// // // //   TextField,
// // // //   Typography,
// // // //   Alert,
// // // //   CircularProgress,
// // // //   Link,
// // // //   ToggleButton,
// // // //   ToggleButtonGroup,
// // // // } from '@mui/material';
// // // // import { authService } from '../services/auth';
// // // // import { useAuth } from '../context/AuthContext';
// // // // import { USER_ROLES } from '../utils/constants';

// // // // const Login = () => {
// // // //   const navigate = useNavigate();
// // // //   const { login } = useAuth();
  
// // // //   const [loginType, setLoginType] = useState('admin'); // 'admin' or 'business'
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [error, setError] = useState('');
  
// // // //   const [formData, setFormData] = useState({
// // // //     email: '',
// // // //     username: '',
// // // //     password: '',
// // // //   });

// // // //   const handleLoginTypeChange = (event, newType) => {
// // // //     if (newType !== null) {
// // // //       setLoginType(newType);
// // // //       setError('');
// // // //       setFormData({
// // // //         email: '',
// // // //         username: '',
// // // //         password: '',
// // // //       });
// // // //     }
// // // //   };

// // // //   const handleChange = (e) => {
// // // //     const { name, value } = e.target;
// // // //     setFormData((prev) => ({
// // // //       ...prev,
// // // //       [name]: value,
// // // //     }));
// // // //   };

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     setError('');
// // // //     setLoading(true);

// // // //     try {
// // // //       if (loginType === 'admin') {
// // // //         // Admin login
// // // //         const result = await authService.login(formData.email, formData.password);
        
// // // //         if (result.success) {
// // // //           const { user } = result;
          
// // // //           // Store token and user data
// // // //           localStorage.setItem('token', user.token);
// // // //           localStorage.setItem('user', JSON.stringify(user));
          
// // // //           // Navigate based on role
// // // //           if (user.role === USER_ROLES.ADMIN) {
// // // //             navigate('/admin/dashboard');
// // // //           } else {
// // // //             navigate('/business/dashboard');
// // // //           }
// // // //         } else {
// // // //           setError(result.error);
// // // //         }
// // // //       } else {
// // // //         // Business login
// // // //         const loginIdentifier = formData.username || formData.email;
// // // //         const result = await authService.businessLogin(loginIdentifier, formData.password);
        
// // // //         if (result.success) {
// // // //           if (result.requiresPasswordChange) {
// // // //             // Redirect to password change page for first login
// // // //             navigate('/change-password', {
// // // //               state: {
// // // //                 isFirstLogin: true,
// // // //                 businessName: result.business?.businessName,
// // // //                 tempToken: result.token,
// // // //               }
// // // //             });
// // // //           } else {
// // // //             // Store business token and data
// // // //             localStorage.setItem('token', result.token);
// // // //             localStorage.setItem('user', JSON.stringify(result.business));
// // // //             localStorage.setItem('userRole', USER_ROLES.BUSINESS_USER);
            
// // // //             // Redirect to business dashboard
// // // //             navigate('/business/dashboard');
// // // //           }
// // // //         } else {
// // // //           setError(result.error);
// // // //         }
// // // //       }
// // // //     } catch (err) {
// // // //       setError('Login failed. Please check your credentials.');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <Container maxWidth="sm">
// // // //       <Box
// // // //         sx={{
// // // //           minHeight: '100vh',
// // // //           display: 'flex',
// // // //           alignItems: 'center',
// // // //           justifyContent: 'center',
// // // //           py: 4,
// // // //         }}
// // // //       >
// // // //         <Paper
// // // //           elevation={3}
// // // //           sx={{
// // // //             p: 4,
// // // //             width: '100%',
// // // //             borderRadius: 2,
// // // //           }}
// // // //         >
// // // //           <Typography variant="h5" component="h1" gutterBottom align="center">
// // // //             GoFlipo Portal Login
// // // //           </Typography>

// // // //           <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
// // // //             <ToggleButtonGroup
// // // //               value={loginType}
// // // //               exclusive
// // // //               onChange={handleLoginTypeChange}
// // // //               aria-label="login type"
// // // //             >
// // // //               <ToggleButton value="admin" aria-label="admin login">
// // // //                 Admin Login
// // // //               </ToggleButton>
// // // //               <ToggleButton value="business" aria-label="business login">
// // // //                 Business Login
// // // //               </ToggleButton>
// // // //             </ToggleButtonGroup>
// // // //           </Box>

// // // //           {error && (
// // // //             <Alert severity="error" sx={{ mb: 3 }}>
// // // //               {error}
// // // //             </Alert>
// // // //           )}

// // // //           <form onSubmit={handleSubmit}>
// // // //             {loginType === 'admin' ? (
// // // //               <TextField
// // // //                 fullWidth
// // // //                 label="Email Address"
// // // //                 name="email"
// // // //                 type="email"
// // // //                 value={formData.email}
// // // //                 onChange={handleChange}
// // // //                 margin="normal"
// // // //                 required
// // // //                 disabled={loading}
// // // //               />
// // // //             ) : (
// // // //               <TextField
// // // //                 fullWidth
// // // //                 label="Username or Email"
// // // //                 name="username"
// // // //                 value={formData.username}
// // // //                 onChange={handleChange}
// // // //                 margin="normal"
// // // //                 required
// // // //                 disabled={loading}
// // // //                 helperText="Enter your business username or email"
// // // //               />
// // // //             )}

// // // //             <TextField
// // // //               fullWidth
// // // //               label="Password"
// // // //               name="password"
// // // //               type="password"
// // // //               value={formData.password}
// // // //               onChange={handleChange}
// // // //               margin="normal"
// // // //               required
// // // //               disabled={loading}
// // // //             />

// // // //             <Button
// // // //               fullWidth
// // // //               variant="contained"
// // // //               color="primary"
// // // //               type="submit"
// // // //               disabled={loading}
// // // //               sx={{ mt: 3 }}
// // // //             >
// // // //               {loading ? (
// // // //                 <CircularProgress size={24} color="inherit" />
// // // //               ) : (
// // // //                 `Login as ${loginType === 'admin' ? 'Admin' : 'Business'}`
// // // //               )}
// // // //             </Button>

// // // //             <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
// // // //               {loginType === 'business' && (
// // // //                 <>
// // // //                   First time logging in? Use the credentials sent to your email.
// // // //                   <br />
// // // //                   You'll be prompted to change your password.
// // // //                 </>
// // // //               )}
// // // //             </Typography>
// // // //           </form>
// // // //         </Paper>
// // // //       </Box>
// // // //     </Container>
// // // //   );
// // // // };

// // // // export default Login;


// // // import React, { useState } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import {
// // //   Box,
// // //   Button,
// // //   Container,
// // //   Paper,
// // //   TextField,
// // //   Typography,
// // //   Alert,
// // //   CircularProgress,
// // //   ToggleButton,
// // //   ToggleButtonGroup,
// // // } from '@mui/material';
// // // import { authService } from '../services/auth';
// // // import { useAuth } from '../context/AuthContext';
// // // import { USER_ROLES } from '../utils/constants';

// // // const Login = () => {
// // //   const navigate = useNavigate();
// // //   const { login, businessLogin } = useAuth();
  
// // //   const [loginType, setLoginType] = useState('admin'); // 'admin' or 'business'
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState('');
  
// // //   const [formData, setFormData] = useState({
// // //     email: '',
// // //     username: '',
// // //     password: '',
// // //   });

// // //   const handleLoginTypeChange = (event, newType) => {
// // //     if (newType !== null) {
// // //       setLoginType(newType);
// // //       setError('');
// // //       setFormData({
// // //         email: '',
// // //         username: '',
// // //         password: '',
// // //       });
// // //     }
// // //   };

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData((prev) => ({
// // //       ...prev,
// // //       [name]: value,
// // //     }));
// // //   };

// // //   const handleAdminLogin = async (email, password) => {
// // //     const result = await login(email, password);
    
// // //     if (result.success) {
// // //       const { user } = result;
      
// // //       // Store token and user data
// // //       localStorage.setItem('token', user.token);
// // //       localStorage.setItem('user', JSON.stringify(user));
      
// // //       // Navigate based on role
// // //       if (user.role === USER_ROLES.ADMIN) {
// // //         navigate('/admin/dashboard');
// // //       } else {
// // //         navigate('/business/dashboard');
// // //       }
// // //     } else {
// // //       setError(result.error);
// // //     }
// // //   };

// // //   const handleBusinessLogin = async (loginIdentifier, password) => {
// // //     const result = await businessLogin(loginIdentifier, password);
    
// // //     if (!result.success) {
// // //       setError(result.error);
// // //       return;
// // //     }

// // //     if (result.requiresPasswordChange) {
// // //       // Redirect to password change page for first login
// // //       navigate('/change-password', {
// // //         state: {
// // //           isFirstLogin: true,
// // //           businessName: result.business?.businessName,
// // //           tempToken: result.token, // This is the temp token
// // //         }
// // //       });
// // //       return;
// // //     }

// // //     // Store business token and data
// // //     localStorage.setItem('token', result.token);
// // //     localStorage.setItem('user', JSON.stringify(result.user));
// // //     localStorage.setItem('userRole', USER_ROLES.BUSINESS_USER);
    
// // //     // Redirect to business dashboard
// // //     navigate('/business/dashboard');
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setError('');
// // //     setLoading(true);

// // //     try {
// // //       if (loginType === 'admin') {
// // //         // Admin login
// // //         await handleAdminLogin(formData.email, formData.password);
// // //       } else {
// // //         // Business login
// // //         const loginIdentifier = formData.username || formData.email;
// // //         await handleBusinessLogin(loginIdentifier, formData.password);
// // //       }
// // //     } catch (err) {
// // //       setError('Login failed. Please check your credentials.');
// // //       console.error('Login error:', err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <Container maxWidth="sm">
// // //       <Box
// // //         sx={{
// // //           minHeight: '100vh',
// // //           display: 'flex',
// // //           alignItems: 'center',
// // //           justifyContent: 'center',
// // //           py: 4,
// // //         }}
// // //       >
// // //         <Paper
// // //           elevation={3}
// // //           sx={{
// // //             p: 4,
// // //             width: '100%',
// // //             borderRadius: 2,
// // //           }}
// // //         >
// // //           <Typography variant="h5" component="h1" gutterBottom align="center">
// // //             GoFlipo Portal Login
// // //           </Typography>

// // //           <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
// // //             <ToggleButtonGroup
// // //               value={loginType}
// // //               exclusive
// // //               onChange={handleLoginTypeChange}
// // //               aria-label="login type"
// // //               size="small"
// // //             >
// // //               <ToggleButton value="admin" aria-label="admin login">
// // //                 Admin Login
// // //               </ToggleButton>
// // //               <ToggleButton value="business" aria-label="business login">
// // //                 Business Login
// // //               </ToggleButton>
// // //             </ToggleButtonGroup>
// // //           </Box>

// // //           {error && (
// // //             <Alert severity="error" sx={{ mb: 3 }}>
// // //               {error}
// // //             </Alert>
// // //           )}

// // //           <form onSubmit={handleSubmit}>
// // //             {loginType === 'admin' ? (
// // //               <TextField
// // //                 fullWidth
// // //                 label="Email Address"
// // //                 name="email"
// // //                 type="email"
// // //                 value={formData.email}
// // //                 onChange={handleChange}
// // //                 margin="normal"
// // //                 required
// // //                 disabled={loading}
// // //                 autoComplete="email"
// // //               />
// // //             ) : (
// // //               <TextField
// // //                 fullWidth
// // //                 label="Username or Email"
// // //                 name="username"
// // //                 value={formData.username}
// // //                 onChange={handleChange}
// // //                 margin="normal"
// // //                 required
// // //                 disabled={loading}
// // //                 helperText="Enter your business username or email"
// // //                 autoComplete="username"
// // //               />
// // //             )}

// // //             <TextField
// // //               fullWidth
// // //               label="Password"
// // //               name="password"
// // //               type="password"
// // //               value={formData.password}
// // //               onChange={handleChange}
// // //               margin="normal"
// // //               required
// // //               disabled={loading}
// // //               autoComplete="current-password"
// // //             />

// // //             <Button
// // //               fullWidth
// // //               variant="contained"
// // //               color="primary"
// // //               type="submit"
// // //               disabled={loading}
// // //               sx={{ mt: 3 }}
// // //             >
// // //               {loading ? (
// // //                 <CircularProgress size={24} color="inherit" />
// // //               ) : (
// // //                 `Login as ${loginType === 'admin' ? 'Admin' : 'Business'}`
// // //               )}
// // //             </Button>

// // //             <Box sx={{ mt: 2 }}>
// // //               <Typography variant="body2" color="text.secondary" align="center">
// // //                 {loginType === 'business' && (
// // //                   <>
// // //                     <strong>First time login?</strong> Use credentials from your welcome email.
// // //                     <br />
// // //                     Default password: <code>123456</code>
// // //                   </>
// // //                 )}
// // //               </Typography>
// // //             </Box>

// // //             <Box sx={{ mt: 1 }}>
// // //               <Typography variant="caption" color="text.secondary" align="center" display="block">
// // //                 {loginType === 'admin'
// // //                   ? 'For admin users only'
// // //                   : 'For business account access'}
// // //               </Typography>
// // //             </Box>
// // //           </form>
// // //         </Paper>
// // //       </Box>
// // //     </Container>
// // //   );
// // // };

// // // export default Login;

// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import {
// //   Box,
// //   Button,
// //   Container,
// //   Paper,
// //   TextField,
// //   Typography,
// //   Alert,
// //   CircularProgress,
// //   ToggleButton,
// //   ToggleButtonGroup,
// //   Snackbar,
// // } from '@mui/material';
// // import { authService } from '../services/auth';
// // import { useAuth } from '../context/AuthContext';
// // import { USER_ROLES } from '../utils/constants';

// // const Login = () => {
// //   const navigate = useNavigate();
// //   const { login, businessLogin, authError, clearAuthError } = useAuth();
  
// //   const [loginType, setLoginType] = useState('admin');
// //   const [loading, setLoading] = useState(false);
// //   const [localError, setLocalError] = useState('');
// //   const [showSnackbar, setShowSnackbar] = useState(false);

// //   // Show auth errors from context
// //   useEffect(() => {
// //     if (authError) {
// //       setLocalError(authError);
// //       setShowSnackbar(true);
// //     }
// //   }, [authError]);

// //   const [formData, setFormData] = useState({
// //     email: '',
// //     username: '',
// //     password: '',
// //   });

// //   const handleLoginTypeChange = (event, newType) => {
// //     if (newType !== null) {
// //       setLoginType(newType);
// //       setLocalError('');
// //       clearAuthError();
// //       setFormData({
// //         email: '',
// //         username: '',
// //         password: '',
// //       });
// //     }
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   const handleAdminLogin = async (email, password) => {
// //     console.log('👑 Admin login handler');
// //     const result = await login(email, password);
    
// //     if (result.success) {
// //       const { user } = result;
      
// //       console.log('✅ Admin login successful, navigating...');
      
// //       // Store token and user data
// //       localStorage.setItem('token', user.token);
// //       localStorage.setItem('user', JSON.stringify(user));
      
// //       // Navigate based on role
// //       if (user.role === USER_ROLES.ADMIN) {
// //         navigate('/admin/dashboard');
// //       } else {
// //         navigate('/business/dashboard');
// //       }
// //     } else {
// //       setLocalError(result.error);
// //     }
// //   };

// //   const handleBusinessLogin = async (loginIdentifier, password) => {
// //     console.log('🏢 Business login handler');
// //     const result = await businessLogin(loginIdentifier, password);
    
// //     if (!result.success) {
// //       setLocalError(result.error);
// //       return;
// //     }

// //     if (result.requiresPasswordChange) {
// //       console.log('🔄 Redirecting to password change');
// //       // Redirect to password change page for first login
// //       navigate('/change-password', {
// //         state: {
// //           isFirstLogin: true,
// //           businessName: result.business?.businessName,
// //           tempToken: result.token,
// //         }
// //       });
// //       return;
// //     }

// //     console.log('✅ Business login successful, storing token...');
    
// //     // Store business token and data
// //     if (result.token && result.user) {
// //       localStorage.setItem('token', result.token);
// //       localStorage.setItem('user', JSON.stringify(result.user));
// //       localStorage.setItem('userRole', USER_ROLES.BUSINESS_USER);
// //     }
    
// //     // Redirect to business dashboard
// //     navigate('/business/dashboard');
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLocalError('');
// //     clearAuthError();
// //     setLoading(true);

// //     console.log('🚀 Form submitted, login type:', loginType);

// //     try {
// //       if (loginType === 'admin') {
// //         // Admin login
// //         await handleAdminLogin(formData.email, formData.password);
// //       } else {
// //         // Business login
// //         const loginIdentifier = formData.username || formData.email;
// //         await handleBusinessLogin(loginIdentifier, formData.password);
// //       }
// //     } catch (err) {
// //       console.error('💥 Unexpected login error:', err);
// //       setLocalError('Login failed. Please check your credentials.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleCloseSnackbar = () => {
// //     setShowSnackbar(false);
// //     clearAuthError();
// //   };

// //   return (
// //     <Container maxWidth="sm">
// //       <Snackbar
// //         open={showSnackbar}
// //         autoHideDuration={6000}
// //         onClose={handleCloseSnackbar}
// //         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
// //       >
// //         <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
// //           {authError}
// //         </Alert>
// //       </Snackbar>

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
// //             GoFlipo Portal Login
// //           </Typography>

// //           <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
// //             <ToggleButtonGroup
// //               value={loginType}
// //               exclusive
// //               onChange={handleLoginTypeChange}
// //               aria-label="login type"
// //               size="small"
// //             >
// //               <ToggleButton value="admin" aria-label="admin login">
// //                 Admin Login
// //               </ToggleButton>
// //               <ToggleButton value="business" aria-label="business login">
// //                 Business Login
// //               </ToggleButton>
// //             </ToggleButtonGroup>
// //           </Box>

// //           {localError && (
// //             <Alert severity="error" sx={{ mb: 3 }}>
// //               {localError}
// //             </Alert>
// //           )}

// //           <form onSubmit={handleSubmit}>
// //             {loginType === 'admin' ? (
// //               <TextField
// //                 fullWidth
// //                 label="Email Address"
// //                 name="email"
// //                 type="email"
// //                 value={formData.email}
// //                 onChange={handleChange}
// //                 margin="normal"
// //                 required
// //                 disabled={loading}
// //                 autoComplete="email"
// //               />
// //             ) : (
// //               <TextField
// //                 fullWidth
// //                 label="Username or Email"
// //                 name="username"
// //                 value={formData.username}
// //                 onChange={handleChange}
// //                 margin="normal"
// //                 required
// //                 disabled={loading}
// //                 helperText="Enter your business username or email"
// //                 autoComplete="username"
// //               />
// //             )}

// //             <TextField
// //               fullWidth
// //               label="Password"
// //               name="password"
// //               type="password"
// //               value={formData.password}
// //               onChange={handleChange}
// //               margin="normal"
// //               required
// //               disabled={loading}
// //               autoComplete="current-password"
// //             />

// //             <Button
// //               fullWidth
// //               variant="contained"
// //               color="primary"
// //               type="submit"
// //               disabled={loading}
// //               sx={{ mt: 3 }}
// //             >
// //               {loading ? (
// //                 <CircularProgress size={24} color="inherit" />
// //               ) : (
// //                 `Login as ${loginType === 'admin' ? 'Admin' : 'Business'}`
// //               )}
// //             </Button>

// //             <Box sx={{ mt: 2 }}>
// //               <Typography variant="body2" color="text.secondary" align="center">
// //                 {loginType === 'business' && (
// //                   <>
// //                     <strong>First time login?</strong> Use credentials from your welcome email.
// //                     <br />
// //                     Default password: <code>123456</code>
// //                   </>
// //                 )}
// //               </Typography>
// //             </Box>

// //             <Box sx={{ mt: 1 }}>
// //               <Typography variant="caption" color="text.secondary" align="center" display="block">
// //                 {loginType === 'admin'
// //                   ? 'For admin users only'
// //                   : 'For business account access'}
// //               </Typography>
// //             </Box>
// //           </form>
// //         </Paper>
// //       </Box>
// //     </Container>
// //   );
// // };

// // export default Login;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Button,
//   Container,
//   Paper,
//   TextField,
//   Typography,
//   Alert,
//   CircularProgress,
//   ToggleButton,
//   ToggleButtonGroup,
//   Snackbar,
// } from '@mui/material';
// import { authService } from '../services/auth';
// import { useAuth } from '../context/AuthContext';
// import { USER_ROLES } from '../utils/constants';
// import { isValidTokenFormat } from '../utils/auth';

// const Login = () => {
//   const navigate = useNavigate();
//   const { login, businessLogin, authError, clearAuthError } = useAuth();
  
//   const [loginType, setLoginType] = useState('admin');
//   const [loading, setLoading] = useState(false);
//   const [localError, setLocalError] = useState('');
//   const [showSnackbar, setShowSnackbar] = useState(false);

//   useEffect(() => {
//     if (authError) {
//       setLocalError(authError);
//       setShowSnackbar(true);
//     }
//   }, [authError]);

//   const [formData, setFormData] = useState({
//     email: '',
//     username: '',
//     password: '',
//   });

//   const handleLoginTypeChange = (event, newType) => {
//     if (newType !== null) {
//       setLoginType(newType);
//       setLocalError('');
//       clearAuthError();
//       setFormData({
//         email: '',
//         username: '',
//         password: '',
//       });
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const validateAndStoreToken = (token, userData) => {
//     console.log('🔍 Validating token before storage:');
//     console.log('   Token:', token);
//     console.log('   Token length:', token?.length);
//     console.log('   Token type:', typeof token);
    
//     if (!token) {
//       throw new Error('No token received');
//     }
    
//     if (token === 'undefined') {
//       throw new Error('Server returned invalid token (string "undefined")');
//     }
    
//     if (!isValidTokenFormat(token)) {
//       throw new Error('Token has invalid format');
//     }
    
//     // Store in localStorage
//     localStorage.setItem('token', token);
//     localStorage.setItem('user', JSON.stringify(userData));
//     console.log('✅ Token stored successfully');
//   };

//   const handleAdminLogin = async (email, password) => {
//     console.log('👑 Admin login handler');
//     const result = await login(email, password);
    
//     if (result.success) {
//       const { user } = result;
      
//       console.log('✅ Admin login successful');
      
//       try {
//         validateAndStoreToken(user.token, user);
        
//         // Navigate based on role
//         if (user.role === USER_ROLES.ADMIN) {
//           navigate('/admin/dashboard');
//         } else {
//           navigate('/business/dashboard');
//         }
//       } catch (error) {
//         console.error('❌ Token validation failed:', error);
//         setLocalError(error.message);
//         localStorage.clear();
//       }
//     } else {
//       setLocalError(result.error);
//     }
//   };

//   const handleBusinessLogin = async (loginIdentifier, password) => {
//     console.log('🏢 Business login handler');
//     const result = await businessLogin(loginIdentifier, password);
    
//     if (!result.success) {
//       setLocalError(result.error);
//       return;
//     }

//     if (result.requiresPasswordChange) {
//       console.log('🔄 Redirecting to password change');
      
//       if (!result.token || result.token === 'undefined') {
//         setLocalError('No temporary token received for password change');
//         return;
//       }
      
//       navigate('/change-password', {
//         state: {
//           isFirstLogin: true,
//           businessName: result.business?.businessName,
//           tempToken: result.token,
//         }
//       });
//       return;
//     }

//     console.log('✅ Business login successful');
    
//     try {
//       validateAndStoreToken(result.token, result.user);
//       localStorage.setItem('userRole', USER_ROLES.BUSINESS_USER);
//       navigate('/business/dashboard');
//     } catch (error) {
//       console.error('❌ Business token validation failed:', error);
//       setLocalError(error.message);
//       localStorage.clear();
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLocalError('');
//     clearAuthError();
//     setLoading(true);

//     console.log('🚀 Form submitted, login type:', loginType);

//     // Clear any existing corrupted data
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');

//     try {
//       if (loginType === 'admin') {
//         await handleAdminLogin(formData.email, formData.password);
//       } else {
//         const loginIdentifier = formData.username || formData.email;
//         await handleBusinessLogin(loginIdentifier, formData.password);
//       }
//     } catch (err) {
//       console.error('💥 Unexpected login error:', err);
//       setLocalError('Login failed. Please check your credentials.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setShowSnackbar(false);
//     clearAuthError();
//   };

//   return (
//     <Container maxWidth="sm">
//       <Snackbar
//         open={showSnackbar}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
//           {authError}
//         </Alert>
//       </Snackbar>

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
//             GoFlipo Portal Login
//           </Typography>

//           <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
//             <ToggleButtonGroup
//               value={loginType}
//               exclusive
//               onChange={handleLoginTypeChange}
//               aria-label="login type"
//               size="small"
//             >
//               <ToggleButton value="admin" aria-label="admin login">
//                 Admin Login
//               </ToggleButton>
//               <ToggleButton value="business" aria-label="business login">
//                 Business Login
//               </ToggleButton>
//             </ToggleButtonGroup>
//           </Box>

//           {localError && (
//             <Alert severity="error" sx={{ mb: 3 }}>
//               {localError}
//             </Alert>
//           )}

//           <form onSubmit={handleSubmit}>
//             {loginType === 'admin' ? (
//               <TextField
//                 fullWidth
//                 label="Email Address"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 margin="normal"
//                 required
//                 disabled={loading}
//                 autoComplete="email"
//               />
//             ) : (
//               <TextField
//                 fullWidth
//                 label="Username or Email"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 margin="normal"
//                 required
//                 disabled={loading}
//                 helperText="Enter your business username or email"
//                 autoComplete="username"
//               />
//             )}

//             <TextField
//               fullWidth
//               label="Password"
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               margin="normal"
//               required
//               disabled={loading}
//               autoComplete="current-password"
//             />

//             <Button
//               fullWidth
//               variant="contained"
//               color="primary"
//               type="submit"
//               disabled={loading}
//               sx={{ mt: 3 }}
//             >
//               {loading ? (
//                 <CircularProgress size={24} color="inherit" />
//               ) : (
//                 `Login as ${loginType === 'admin' ? 'Admin' : 'Business'}`
//               )}
//             </Button>

//             <Box sx={{ mt: 2 }}>
//               <Typography variant="body2" color="text.secondary" align="center">
//                 {loginType === 'business' && (
//                   <>
//                     <strong>First time login?</strong> Use credentials from your welcome email.
//                     <br />
//                     Default password: <code>123456</code>
//                   </>
//                 )}
//               </Typography>
//             </Box>

//             <Box sx={{ mt: 1 }}>
//               <Typography variant="caption" color="text.secondary" align="center" display="block">
//                 {loginType === 'admin'
//                   ? 'For admin users only'
//                   : 'For business account access'}
//               </Typography>
//             </Box>
//           </form>
//         </Paper>
//       </Box>
//     </Container>
//   );
// };

// export default Login;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Button,
//   Container,
//   Paper,
//   TextField,
//   Typography,
//   Alert,
//   CircularProgress,
//   ToggleButton,
//   ToggleButtonGroup,
//   Snackbar,
// } from '@mui/material';
// import { useAuth } from '../context/AuthContext';
// import { USER_ROLES } from '../utils/constants';

// const Login = () => {
//   const navigate = useNavigate();
//   const { login, businessLogin, authError, clearAuthError } = useAuth();
  
//   const [loginType, setLoginType] = useState('admin');
//   const [loading, setLoading] = useState(false);
//   const [localError, setLocalError] = useState('');
//   const [showSnackbar, setShowSnackbar] = useState(false);

//   useEffect(() => {
//     if (authError) {
//       setLocalError(authError);
//       setShowSnackbar(true);
//     }
//   }, [authError]);

//   const [formData, setFormData] = useState({
//     email: '',
//     username: '',
//     password: '',
//   });

//   const handleLoginTypeChange = (event, newType) => {
//     if (newType !== null) {
//       setLoginType(newType);
//       setLocalError('');
//       clearAuthError();
//       setFormData({
//         email: '',
//         username: '',
//         password: '',
//       });
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleAdminLogin = async (email, password) => {
//     console.log('👑 Admin login handler');
//     const result = await login(email, password);
    
//     if (result.success) {
//       console.log('✅ Admin login successful');
      
//       // AuthContext already stored the token, just navigate
//       if (result.user.role === USER_ROLES.ADMIN) {
//         navigate('/admin/dashboard');
//       } else {
//         navigate('/business/dashboard');
//       }
//     } else {
//       setLocalError(result.error);
//     }
//   };

//   const handleBusinessLogin = async (loginIdentifier, password) => {
//     console.log('🏢 Business login handler');
//     const result = await businessLogin(loginIdentifier, password);
    
//     if (!result.success) {
//       setLocalError(result.error);
//       return;
//     }

//     if (result.requiresPasswordChange) {
//       console.log('🔄 Redirecting to password change');
      
//       if (!result.token || result.token === 'undefined') {
//         setLocalError('No temporary token received for password change');
//         return;
//       }
      
//       navigate('/change-password', {
//         state: {
//           isFirstLogin: true,
//           businessName: result.business?.businessName,
//           tempToken: result.token,
//         }
//       });
//       return;
//     }

//     console.log('✅ Business login successful');
    
//     // AuthContext already stored the token, just navigate
//     navigate('/business/dashboard');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLocalError('');
//     clearAuthError();
//     setLoading(true);

//     console.log('🚀 Form submitted, login type:', loginType);

//     try {
//       if (loginType === 'admin') {
//         await handleAdminLogin(formData.email, formData.password);
//       } else {
//         const loginIdentifier = formData.username || formData.email;
//         await handleBusinessLogin(loginIdentifier, formData.password);
//       }
//     } catch (err) {
//       console.error('💥 Unexpected login error:', err);
//       setLocalError('Login failed. Please check your credentials.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setShowSnackbar(false);
//     clearAuthError();
//   };

//   return (
//     <Container maxWidth="sm">
//       <Snackbar
//         open={showSnackbar}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
//           {authError}
//         </Alert>
//       </Snackbar>

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
//             GoFlipo Portal Login
//           </Typography>

//           <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
//             <ToggleButtonGroup
//               value={loginType}
//               exclusive
//               onChange={handleLoginTypeChange}
//               aria-label="login type"
//               size="small"
//             >
//               <ToggleButton value="admin" aria-label="admin login">
//                 Admin Login
//               </ToggleButton>
//               <ToggleButton value="business" aria-label="business login">
//                 Business Login
//               </ToggleButton>
//             </ToggleButtonGroup>
//           </Box>

//           {localError && (
//             <Alert severity="error" sx={{ mb: 3 }}>
//               {localError}
//             </Alert>
//           )}

//           <form onSubmit={handleSubmit}>
//             {loginType === 'admin' ? (
//               <TextField
//                 fullWidth
//                 label="Email Address"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 margin="normal"
//                 required
//                 disabled={loading}
//                 autoComplete="email"
//               />
//             ) : (
//               <TextField
//                 fullWidth
//                 label="Username or Email"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 margin="normal"
//                 required
//                 disabled={loading}
//                 helperText="Enter your business username or email"
//                 autoComplete="username"
//               />
//             )}

//             <TextField
//               fullWidth
//               label="Password"
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               margin="normal"
//               required
//               disabled={loading}
//               autoComplete="current-password"
//             />

//             <Button
//               fullWidth
//               variant="contained"
//               color="primary"
//               type="submit"
//               disabled={loading}
//               sx={{ mt: 3 }}
//             >
//               {loading ? (
//                 <CircularProgress size={24} color="inherit" />
//               ) : (
//                 `Login as ${loginType === 'admin' ? 'Admin' : 'Business'}`
//               )}
//             </Button>

//             <Box sx={{ mt: 2 }}>
//               <Typography variant="body2" color="text.secondary" align="center">
//                 {loginType === 'business' && (
//                   <>
//                     <strong>First time login?</strong> Use credentials from your welcome email.
//                     <br />
//                     Default password: <code>123456</code>
//                   </>
//                 )}
//               </Typography>
//             </Box>

//             <Box sx={{ mt: 1 }}>
//               <Typography variant="caption" color="text.secondary" align="center" display="block">
//                 {loginType === 'admin'
//                   ? 'For admin users only'
//                   : 'For business account access'}
//               </Typography>
//             </Box>
//           </form>
//         </Paper>
//       </Box>
//     </Container>
//   );
// };

// export default Login;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pinnacleLogo from '../assets/pinnale2.jpg';

import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  Snackbar,
  InputAdornment,
  Divider,
} from '@mui/material';
import {
  EmailOutlined,
  PersonOutlined,
  LockOutlined,
  BusinessOutlined,
  AdminPanelSettingsOutlined,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { USER_ROLES, APP_CONFIG } from '../utils/constants';

const Login = ({ user }) => {
  const isAdmin = user === 'ADMIN';

  const navigate = useNavigate();
  const { login, businessLogin, authError, clearAuthError } = useAuth();

  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (authError) {
      setLocalError(authError);
      setShowSnackbar(true);
    }
  }, [authError]);

  // Reset form + errors when route (user prop) changes
  useEffect(() => {
    setLocalError('');
    clearAuthError();
    setFormData({ email: '', password: '' });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdminLogin = async (email, password) => {
    const result = await login(email, password);
    if (result.success) {
      navigate(result.user.role === USER_ROLES.ADMIN ? '/admin/dashboard' : '/business/dashboard');
    } else {
      setLocalError(result.error);
    }
  };

  const handleBusinessLogin = async (email, password) => {
    const result = await businessLogin(email, password);
    if (!result.success) {
      setLocalError(result.error);
      return;
    }
    if (result.requiresPasswordChange) {
      if (!result.token || result.token === 'undefined') {
        setLocalError('No temporary token received for password change');
        return;
      }
      navigate('/change-password', {
        state: {
          isFirstLogin: true,
          businessName: result.business?.businessName,
          tempToken: result.token,
        },
      });
      return;
    }
    navigate('/business/dashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    clearAuthError();
    setLoading(true);
    try {
      if (isAdmin) {
        await handleAdminLogin(formData.email, formData.password);
      } else {
        await handleBusinessLogin(formData.email, formData.password);
      }
    } catch (err) {
      console.error('Unexpected login error:', err);
      setLocalError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
    clearAuthError();
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
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {authError}
        </Alert>
      </Snackbar>

      <Container maxWidth="xs">
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
          {/* Logo / Header */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 'auto',
                height: 'auto',
                maxWidth: '200px',
                p: 2,
                mb: 2,
                position: 'relative',
                overflow: 'visible',
              }}
            >
              <Box
                component="img"
                src={pinnacleLogo}
                alt="App Logo"
                sx={{
                  width: 'auto',
                  height: '60px',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  position: 'relative',
                  zIndex: 2,
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
                }}
              />
            </Box>

            <Typography variant="h5" component="h1" fontWeight={700} sx={{ mb: 0.5 }}>
              {APP_CONFIG.APP_NAME} Portal
            </Typography>

            {/* Role badge — replaces the toggle */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                mt: 1,
                px: 1.5,
                py: 0.5,
                borderRadius: 99,
                bgcolor: isAdmin ? 'primary.main' : 'success.main',
                color: 'white',
              }}
            >
              {isAdmin
                ? <AdminPanelSettingsOutlined sx={{ fontSize: 16 }} />
                : <BusinessOutlined sx={{ fontSize: 16 }} />}
              <Typography variant="caption" fontWeight={600}>
                {isAdmin ? 'Admin Login' : 'Business Login'}
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Sign in to your account
            </Typography>
          </Box>

          {localError && (
            <Alert
              severity="error"
              sx={{ mb: 3, borderRadius: 2, border: '1px solid', borderColor: 'error.light' }}
            >
              {localError}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              disabled={loading}
              autoComplete="email"
              helperText={!isAdmin ? 'Enter your registered business email' : undefined}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': { borderColor: 'primary.main' },
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              disabled={loading}
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                mt: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': { borderColor: 'primary.main' },
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              color={isAdmin ? 'primary' : 'success'}
              type="submit"
              disabled={loading}
              size="large"
              sx={{
                mt: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                fontSize: '1rem',
                textTransform: 'none',
                boxShadow: isAdmin
                  ? '0 4px 12px rgba(102, 126, 234, 0.3)'
                  : '0 4px 12px rgba(17, 153, 142, 0.3)',
                '&:hover': {
                  boxShadow: isAdmin
                    ? '0 6px 16px rgba(102, 126, 234, 0.4)'
                    : '0 6px 16px rgba(17, 153, 142, 0.4)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                `Sign In as ${isAdmin ? 'Admin' : 'Business User'}`
              )}
            </Button>

            <Typography
              variant="caption"
              color="text.secondary"
              align="center"
              display="block"
              sx={{ mt: 3, opacity: 0.7 }}
            >
              © {new Date().getFullYear()} {APP_CONFIG.APP_NAME} Portal. All rights reserved.
            </Typography>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;