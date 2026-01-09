import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Logo from '../assets/pinnale.jpg';

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Link,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';

import {
  EmailOutlined,
  LockOutlined,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

import { useAuth } from '../context/AuthContext';
import { USER_ROLES , ROUTES } from '../utils/constants';
import { validateEmail } from '../utils/validators';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading: authLoading, error: authError } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');

  const loading = authLoading || submitting;
  const displayError = loginError || authError;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setLoginError('');
  };

  const validateForm = () => {
    const err = {};
    if (!formData.email) err.email = 'Email is required';
    else if (!validateEmail(formData.email)) err.email = 'Invalid email address';
    if (!formData.password) err.password = 'Password is required';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      const res = await login(formData.email, formData.password);
      if (res.success) {
        navigate(
          res.user?.role === USER_ROLES.ADMIN
          ? ROUTES.ADMIN_DASHBOARD
          : ROUTES.BUSINESS_DASHBOARD

        );
      } else {
        setLoginError(res.error || 'Login failed');
      }
    } catch {
      setLoginError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'grid',
        placeItems: 'center',
        overflow: 'hidden',
        background: `
          radial-gradient(1200px 600px at top, #eef4ff 0%, #f7faff 60%)
        `,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 420,
          height: 'clamp(520px, 90vh, 620px)',
          px: 4,
          py: 3.5,
          borderRadius: 4,
          display: 'grid',
          gridTemplateRows: 'auto auto 1fr auto',
          backgroundColor: '#ffffff',
          boxShadow: `
            0 24px 48px rgba(30, 102, 245, 0.18),
            inset 0 1px 0 rgba(255,255,255,0.7)
          `,
        }}
      >
        {/* ===== Brand ===== */}
        <Box textAlign="center">
          <Box
            component="img"
            src={Logo}
            alt="GoFlipo"
            sx={{
              height: 68,
              width: 68,
              mb: 1.5,
              objectFit: 'contain',
            }}
          />
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ color: '#1E66F5', letterSpacing: 0.4 }}
          >
            GoFlipo
          </Typography>
          <Typography
            fontSize={14}
            sx={{ color: '#6b7895', mt: 0.5 }}
          >
            Sign in to continue
          </Typography>
        </Box>

        {/* ===== Error ===== */}
        {displayError && (
          <Alert
            severity="error"
            sx={{
              borderRadius: 2,
              mt: 2,
              fontSize: 14,
            }}
          >
            {displayError}
          </Alert>
        )}

        {/* ===== Form ===== */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Email address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            disabled={loading}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined sx={{ color: '#1E66F5' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#f8faff',
              },
            }}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            disabled={loading}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined sx={{ color: '#1E66F5' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setShowPassword(v => !v)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#f8faff',
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              mt: 3,
              py: 1.4,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: 16,
              fontWeight: 600,
              color: '#fff',
              background: 'linear-gradient(90deg, #1E66F5, #4C8DFF)',
              boxShadow: '0 12px 28px rgba(30,102,245,0.35)',
              '&:hover': {
                background: 'linear-gradient(90deg, #1a5be0, #3f7df0)',
              },
            }}
          >
            {loading ? (
              <CircularProgress size={22} sx={{ color: '#fff' }} />
            ) : (
              'Sign In'
            )}
          </Button>
        </Box>

        {/* ===== Footer ===== */}
        <Box textAlign="center" sx={{ mt: 2 }}>
          <Link
            component={RouterLink}
            to="/forgot-password"
            underline="hover"
            sx={{
              fontSize: 13,
              color: '#1E66F5',
              fontWeight: 500,
            }}
          >
            Forgot password?
          </Link>

          <Typography fontSize={12.5} color="#7a879f" mt={3}>
            Don’t have access?{' '}
            <Link component={RouterLink} to="/contact-admin">
              Contact admin
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
