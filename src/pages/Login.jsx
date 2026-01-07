// import React, { useState } from 'react';
// import { useNavigate, Link as RouterLink } from 'react-router-dom';
// import {
//   Container,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Box,
//   Alert,
//   Link,
//   InputAdornment,
//   IconButton,
//   CircularProgress,
// } from '@mui/material';
// import {
//   Email as EmailIcon,
//   Lock as LockIcon,
//   Visibility as VisibilityIcon,
//   VisibilityOff as VisibilityOffIcon,
// } from '@mui/icons-material';
// import { useAuth } from '../context/AuthContext';
// import { ROUTES } from '../utils/constants';

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [loginError, setLoginError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//     // Clear error for this field
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: '',
//       }));
//     }
//     setLoginError('');
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }
    
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }
    
//     try {
//       setLoading(true);
//       setLoginError('');
      
//       const result = await login(formData.email, formData.password);
      
//       if (result.success) {
//         // Navigate based on role
//         const user = JSON.parse(localStorage.getItem('user'));
//         if (user.role === 'ADMIN') {
//           navigate(ROUTES.ADMIN_DASHBOARD);
//         } else {
//           navigate(ROUTES.BUSINESS_DASHBOARD);
//         }
//       } else {
//         setLoginError(result.error || 'Login failed');
//       }
//     } catch (error) {
//       setLoginError(error.message || 'An unexpected error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Box
//         sx={{
//           marginTop: 8,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         <Paper
//           elevation={3}
//           sx={{
//             padding: 4,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             width: '100%',
//           }}
//         >
//           <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
//              CDP Platform
//           </Typography>
          
//           <Typography component="h2" variant="h5" sx={{ mb: 3 }}>
//             Sign In
//           </Typography>
          
//           <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 3 }}>
//             Enter your credentials to access your dashboard
//           </Typography>

//           {loginError && (
//             <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
//               {loginError}
//             </Alert>
//           )}

//           <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//               value={formData.email}
//               onChange={handleChange}
//               error={!!errors.email}
//               helperText={errors.email}
//               disabled={loading}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <EmailIcon color="action" />
//                   </InputAdornment>
//                 ),
//               }}
//             />
            
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type={showPassword ? 'text' : 'password'}
//               id="password"
//               autoComplete="current-password"
//               value={formData.password}
//               onChange={handleChange}
//               error={!!errors.password}
//               helperText={errors.password}
//               disabled={loading}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <LockIcon color="action" />
//                   </InputAdornment>
//                 ),
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={handleClickShowPassword}
//                       onMouseDown={handleMouseDownPassword}
//                       edge="end"
//                     >
//                       {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />
            
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2, py: 1.5 }}
//               disabled={loading}
//             >
//               {loading ? (
//                 <CircularProgress size={24} />
//               ) : (
//                 'Sign In'
//               )}
//             </Button>
            
//             <Box sx={{ mt: 2, textAlign: 'center' }}>
//               <Typography variant="body2" color="textSecondary">
//                 Forgot your password?{' '}
//                 <Link component={RouterLink} to="/forgot-password" underline="hover">
//                   Reset it here
//                 </Link>
//               </Typography>
              
//               <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
//                 Don't have an account?{' '}
//                 <Link component={RouterLink} to="/contact-admin" underline="hover">
//                   Contact your administrator
//                 </Link>
//               </Typography>
//             </Box>
//           </Box>
//         </Paper>
        
//         <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 4 }}>
//           © {new Date().getFullYear()} CDP Platform. All rights reserved.
//         </Typography>
//       </Box>
//     </Container>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Logo from '../assets/pinnale.jpg';

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Link,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../utils/constants';

const Login = () => {
  const navigate = useNavigate();
  const { login, error: authError } = useAuth(); // Get error from auth context too
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
    setLoginError('');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      setLoginError('');
      
      console.log('Attempting login with:', formData.email); // Debug
      
      // Call the login function from useAuth
      const result = await login(formData.email, formData.password);
      
      console.log('Login result:', result); // Debug
      
      if (result.success) {
        console.log('Login successful!'); // Debug
        
        // Get user from localStorage (it should be set by AuthContext)
        const userStr = localStorage.getItem('user');
        console.log('User from localStorage:', userStr); // Debug
        
        if (userStr) {
          const user = JSON.parse(userStr);
          console.log('Parsed user:', user); // Debug
          
          // Navigate based on role
          if (user.role === 'ADMIN') {
            console.log('Navigating to admin dashboard'); // Debug
            navigate(ROUTES.ADMIN_DASHBOARD);
          } else {
            console.log('Navigating to business dashboard'); // Debug
            navigate(ROUTES.BUSINESS_DASHBOARD);
          }
        } else {
          setLoginError('User information not found after login');
        }
      } else {
        console.log('Login failed with error:', result.error); // Debug
        // Show error message from the login function
        setLoginError(result.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login catch block error:', error); // Debug
      // Fallback error handling
      setLoginError(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Also show authError from context if it exists
  const displayError = loginError || authError;

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            borderRadius: 2,
          }}
        >


          <Box
  sx={{
    mb: 3,
    width: 96,
    height: 96,
    borderRadius: 3,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
  }}
>
  <Box
    component="img"
    src={Logo}
    alt="CDP Platform Logo"
    sx={{
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      p: 1.5,
    }}
  />
</Box>

          <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
            CDP Platform
          </Typography>
          
          <Typography component="h2" variant="h5" sx={{ mb: 3 }}>
            Sign In
          </Typography>
          
          <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 3 }}>
            Enter your credentials to access your dashboard
          </Typography>

          {/* Error Alert - Show both loginError and authError */}
          {displayError && (
            <Alert 
              severity="error" 
              sx={{ 
                width: '100%', 
                mb: 3,
                '& .MuiAlert-icon': {
                  alignItems: 'center',
                }
              }}
              onClose={() => {
                setLoginError('');
                // If you have a way to clear authError from context, call it here
              }}
            >
              {displayError}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      disabled={loading}
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2, 
                py: 1.5,
                fontWeight: 600,
                fontSize: '1rem',
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Sign In'
              )}
            </Button>
            
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="textSecondary">
                Forgot your password?{' '}
                <Link 
                  component={RouterLink} 
                  to="/forgot-password" 
                  underline="hover"
                  sx={{ fontWeight: 500 }}
                >
                  Reset it here
                </Link>
              </Typography>
              
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Don't have an account?{' '}
                <Link 
                  component={RouterLink} 
                  to="/contact-admin" 
                  underline="hover"
                  sx={{ fontWeight: 500 }}
                >
                  Contact your administrator
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
        
        <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 4, opacity: 0.8 }}>
          © {new Date().getFullYear()} CDP Platform. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;