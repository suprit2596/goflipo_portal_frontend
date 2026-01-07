// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   Alert,
//   CircularProgress,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   FormHelperText,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { adminService } from '../../services/admin';

// const validationSchema = Yup.object({
//   tenantId: Yup.string()
//     .required('Business is required'),
//   email: Yup.string()
//     .required('Email is required')
//     .email('Invalid email format'),
//   password: Yup.string()
//     .required('Password is required')
//     .min(8, 'Password must be at least 8 characters')
//     .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
//       'Password must contain at least one uppercase letter, one lowercase letter, and one number'
//     ),
//   fullName: Yup.string()
//     .required('Full name is required')
//     .min(2, 'Full name must be at least 2 characters'),
// });

// const CreateBusinessUser = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [loadingBusinesses, setLoadingBusinesses] = useState(true);
//   const [businesses, setBusinesses] = useState([]);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   // Fetch businesses on component mount
//   useEffect(() => {
//     fetchBusinesses();
//   }, []);

//   const fetchBusinesses = async () => {
//     try {
//       setLoadingBusinesses(true);
//       const data = await adminService.getAllBusinesses();
//       setBusinesses(data || []);
//     } catch (err) {
//       console.error('Error fetching businesses:', err);
//       setError('Failed to load businesses');
//     } finally {
//       setLoadingBusinesses(false);
//     }
//   };

//   const formik = useFormik({
//     initialValues: {
//       tenantId: '',
//       email: '',
//       password: '',
//       fullName: '',
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       try {
//         setLoading(true);
//         setError('');
//         setSuccess('');
        
//         await adminService.createBusinessUser(values.tenantId, {
//           email: values.email,
//           password: values.password,
//           fullName: values.fullName,
//         });
        
//         setSuccess('Business user created successfully!');
//         formik.resetForm();
        
//         // Optionally navigate or show success message
//         setTimeout(() => {
//           navigate(`/admin/businesses/${values.tenantId}`);
//         }, 2000);
//       } catch (err) {
//         setError(err.response?.data?.error || err.message || 'Failed to create user');
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   return (
//     <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
//       <Paper sx={{ p: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           Create Business User
//         </Typography>
        
//         <Typography variant="body2" color="textSecondary" paragraph>
//           Create a new user account for a business. Select the business first, then provide user details.
//         </Typography>

//         {error && (
//           <Alert severity="error" sx={{ mb: 3 }}>
//             {error}
//           </Alert>
//         )}

//         {success && (
//           <Alert severity="success" sx={{ mb: 3 }}>
//             {success}
//           </Alert>
//         )}

//         <form onSubmit={formik.handleSubmit}>
//           <Grid container spacing={3}>
//             {/* Business Selection Dropdown */}
//             <Grid item xs={12}>
//               <FormControl 
//                 fullWidth 
//                 error={formik.touched.tenantId && Boolean(formik.errors.tenantId)}
//                 disabled={loading || loadingBusinesses}
//               >
//                 <InputLabel>Select Business *</InputLabel>
//                 <Select
//                   name="tenantId"
//                   value={formik.values.tenantId}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   label="Select Business *"
//                 >
//                   <MenuItem value="">
//                     <em>Choose a business</em>
//                   </MenuItem>
//                   {loadingBusinesses ? (
//                     <MenuItem disabled>
//                       <CircularProgress size={20} sx={{ mr: 1 }} />
//                       Loading businesses...
//                     </MenuItem>
//                   ) : businesses.length === 0 ? (
//                     <MenuItem disabled>No businesses available</MenuItem>
//                   ) : (
//                     businesses.map((business) => (
//                       <MenuItem key={business.tenantId} value={business.tenantId}>
//                         {business.businessName} ({business.industry})
//                       </MenuItem>
//                     ))
//                   )}
//                 </Select>
//                 {formik.touched.tenantId && formik.errors.tenantId && (
//                   <FormHelperText error>{formik.errors.tenantId}</FormHelperText>
//                 )}
//               </FormControl>
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 name="fullName"
//                 label="Full Name *"
//                 value={formik.values.fullName}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 error={formik.touched.fullName && Boolean(formik.errors.fullName)}
//                 helperText={formik.touched.fullName && formik.errors.fullName}
//                 disabled={loading || !formik.values.tenantId}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 name="email"
//                 label="Email Address *"
//                 type="email"
//                 value={formik.values.email}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 error={formik.touched.email && Boolean(formik.errors.email)}
//                 helperText={formik.touched.email && formik.errors.email}
//                 disabled={loading || !formik.values.tenantId}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 name="password"
//                 label="Password *"
//                 type="password"
//                 value={formik.values.password}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 error={formik.touched.password && Boolean(formik.errors.password)}
//                 helperText={formik.touched.password && formik.errors.password}
//                 disabled={loading || !formik.values.tenantId}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
//                 <Button
//                   variant="outlined"
//                   onClick={() => navigate('/admin/businesses')}
//                   disabled={loading}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   disabled={loading || !formik.isValid || !formik.values.tenantId}
//                   startIcon={loading && <CircularProgress size={20} />}
//                 >
//                   {loading ? 'Creating...' : 'Create User'}
//                 </Button>
//               </Box>
//             </Grid>
//           </Grid>
//         </form>
//       </Paper>
//     </Box>
//   );
// };

// export default CreateBusinessUser;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { adminService } from '../../services/admin';

const validationSchema = Yup.object({
  tenantId: Yup.string()
    .required('Business is required'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  fullName: Yup.string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters'),
});

const CreateBusinessUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingBusinesses, setLoadingBusinesses] = useState(true);
  const [businesses, setBusinesses] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      setLoadingBusinesses(true);
      const data = await adminService.getAllBusinesses();
      setBusinesses(data || []);
    } catch (err) {
      console.error('Error fetching businesses:', err);
      setError('Failed to load businesses');
    } finally {
      setLoadingBusinesses(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      tenantId: '',
      email: '',
      password: '',
      fullName: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError('');
        setSuccess('');
        
        await adminService.createBusinessUser(values.tenantId, {
          email: values.email,
          password: values.password,
          fullName: values.fullName,
        });
        
        setSuccess('Business user created successfully!');
        formik.resetForm();
        
        setTimeout(() => {
          navigate(`/admin/businesses/${values.tenantId}`);
        }, 2000);
      } catch (err) {
        setError(err.response?.data?.error || err.message || 'Failed to create user');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '480px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        padding: '40px'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#111827',
          marginBottom: '8px',
          marginTop: 0
        }}>
          Create Business User
        </h1>
        
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          marginBottom: '32px',
          marginTop: 0
        }}>
          Create a new user account for a business
        </p>

        {error && (
          <div style={{
            padding: '12px 16px',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '6px',
            color: '#991b1b',
            fontSize: '14px',
            marginBottom: '24px'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{
            padding: '12px 16px',
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '6px',
            color: '#166534',
            fontSize: '14px',
            marginBottom: '24px'
          }}>
            {success}
          </div>
        )}

        <form onSubmit={formik.handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Business *
            </label>
            <select
              name="tenantId"
              value={formik.values.tenantId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading || loadingBusinesses}
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: '14px',
                border: `1px solid ${formik.touched.tenantId && formik.errors.tenantId ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '6px',
                backgroundColor: '#ffffff',
                color: '#111827',
                outline: 'none',
                cursor: loading || loadingBusinesses ? 'not-allowed' : 'pointer'
              }}
            >
              <option value="">Choose a business</option>
              {loadingBusinesses ? (
                <option disabled>Loading businesses...</option>
              ) : businesses.length === 0 ? (
                <option disabled>No businesses available</option>
              ) : (
                businesses.map((business) => (
                  <option key={business.tenantId} value={business.tenantId}>
                    {business.businessName} ({business.industry})
                  </option>
                ))
              )}
            </select>
            {formik.touched.tenantId && formik.errors.tenantId && (
              <p style={{
                fontSize: '12px',
                color: '#ef4444',
                marginTop: '4px',
                marginBottom: 0
              }}>
                {formik.errors.tenantId}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading || !formik.values.tenantId}
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: '14px',
                border: `1px solid ${formik.touched.fullName && formik.errors.fullName ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '6px',
                backgroundColor: loading || !formik.values.tenantId ? '#f9fafb' : '#ffffff',
                color: '#111827',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p style={{
                fontSize: '12px',
                color: '#ef4444',
                marginTop: '4px',
                marginBottom: 0
              }}>
                {formik.errors.fullName}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading || !formik.values.tenantId}
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: '14px',
                border: `1px solid ${formik.touched.email && formik.errors.email ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '6px',
                backgroundColor: loading || !formik.values.tenantId ? '#f9fafb' : '#ffffff',
                color: '#111827',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            {formik.touched.email && formik.errors.email && (
              <p style={{
                fontSize: '12px',
                color: '#ef4444',
                marginTop: '4px',
                marginBottom: 0
              }}>
                {formik.errors.email}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading || !formik.values.tenantId}
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: '14px',
                border: `1px solid ${formik.touched.password && formik.errors.password ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '6px',
                backgroundColor: loading || !formik.values.tenantId ? '#f9fafb' : '#ffffff',
                color: '#111827',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            {formik.touched.password && formik.errors.password && (
              <p style={{
                fontSize: '12px',
                color: '#ef4444',
                marginTop: '4px',
                marginBottom: 0
              }}>
                {formik.errors.password}
              </p>
            )}
          </div>

          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-end'
          }}>
            <button
              type="button"
              onClick={() => navigate('/admin/businesses')}
              disabled={loading}
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                backgroundColor: '#ffffff',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !formik.isValid || !formik.values.tenantId}
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#ffffff',
                backgroundColor: loading || !formik.isValid || !formik.values.tenantId ? '#9ca3af' : '#2563eb',
                border: 'none',
                borderRadius: '6px',
                cursor: loading || !formik.isValid || !formik.values.tenantId ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Creating...' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBusinessUser;