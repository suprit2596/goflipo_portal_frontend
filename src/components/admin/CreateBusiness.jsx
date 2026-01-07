// import React, { useState } from 'react';
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   MenuItem,
//   Alert,
//   CircularProgress,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { adminService } from '../../services/admin';
// import { BUSINESS_STATUS } from '../../utils/constants';

// const validationSchema = Yup.object({
//   businessName: Yup.string()
//     .required('Business name is required')
//     .min(2, 'Business name must be at least 2 characters')
//     .max(100, 'Business name must be less than 100 characters'),
//   industry: Yup.string()
//     .required('Industry is required')
//     .min(2, 'Industry must be at least 2 characters')
//     .max(50, 'Industry must be less than 50 characters'),
//   contactEmail: Yup.string()
//     .required('Contact email is required')
//     .email('Invalid email format'),
//   status: Yup.string()
//     .required('Status is required')
//     .oneOf(Object.values(BUSINESS_STATUS)),
// });

// const CreateBusiness = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const formik = useFormik({
//     initialValues: {
//       businessName: '',
//       industry: '',
//       contactEmail: '',
//       status: BUSINESS_STATUS.ACTIVE,
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       try {
//         setLoading(true);
//         setError('');
//         await adminService.createBusiness(values);
//         navigate('/admin/businesses');
//       } catch (err) {
//         setError(err.response?.data?.error || err.message || 'Failed to create business');
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   const industries = [
//     'Technology',
//     'Finance',
//     'Healthcare',
//     'Retail',
//     'Education',
//     'Manufacturing',
//     'Real Estate',
//     'Hospitality',
//     'Transportation',
//     'Other',
//   ];

//   return (
//     <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
//       <Paper sx={{ p: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           Create New Business
//         </Typography>

//         <Typography variant="body2" color="textSecondary" paragraph>
//           Fill in the details below to onboard a new business (tenant) to the platform.
//         </Typography>

//         {error && (
//           <Alert severity="error" sx={{ mb: 3 }}>
//             {error}
//           </Alert>
//         )}

//         <form onSubmit={formik.handleSubmit}>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 id="businessName"
//                 name="businessName"
//                 label="Business Name"
//                 value={formik.values.businessName}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 error={formik.touched.businessName && Boolean(formik.errors.businessName)}
//                 helperText={formik.touched.businessName && formik.errors.businessName}
//                 disabled={loading}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 select
//                 id="industry"
//                 name="industry"
//                 label="Industry"
//                 value={formik.values.industry}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 error={formik.touched.industry && Boolean(formik.errors.industry)}
//                 helperText={formik.touched.industry && formik.errors.industry}
//                 disabled={loading}
//               >
//                 <MenuItem value="">
//                   <em>Select Industry</em>
//                 </MenuItem>
//                 {industries.map((industry) => (
//                   <MenuItem key={industry} value={industry}>
//                     {industry}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 id="contactEmail"
//                 name="contactEmail"
//                 label="Contact Email"
//                 type="email"
//                 value={formik.values.contactEmail}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 error={formik.touched.contactEmail && Boolean(formik.errors.contactEmail)}
//                 helperText={formik.touched.contactEmail && formik.errors.contactEmail}
//                 disabled={loading}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 select
//                 id="status"
//                 name="status"
//                 label="Status"
//                 value={formik.values.status}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 error={formik.touched.status && Boolean(formik.errors.status)}
//                 helperText={formik.touched.status && formik.errors.status}
//                 disabled={loading}
//               >
//                 {Object.values(BUSINESS_STATUS).map((status) => (
//                   <MenuItem key={status} value={status}>
//                     {status}
//                   </MenuItem>
//                 ))}
//               </TextField>
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
//                   disabled={loading || !formik.isValid}
//                   startIcon={loading && <CircularProgress size={20} />}
//                 >
//                   {loading ? 'Creating...' : 'Create Business'}
//                 </Button>
//               </Box>
//             </Grid>
//           </Grid>
//         </form>
//       </Paper>
//     </Box>
//   );
// };

// export default CreateBusiness;

// import React, { useState } from 'react';
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   MenuItem,
//   Alert,
//   CircularProgress,
//   Divider,
//   Container,
//   Fade,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { adminService } from '../../services/admin';
// import { BUSINESS_STATUS } from '../../utils/constants';
// import BusinessIcon from '@mui/icons-material/Business';
// import EmailIcon from '@mui/icons-material/Email';
// import CategoryIcon from '@mui/icons-material/Category';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// const validationSchema = Yup.object({
//   businessName: Yup.string()
//     .required('Business name is required')
//     .min(2, 'Business name must be at least 2 characters')
//     .max(100, 'Business name must be less than 100 characters'),
//   industry: Yup.string()
//     .required('Industry is required')
//     .min(2, 'Industry must be at least 2 characters')
//     .max(50, 'Industry must be less than 50 characters'),
//   contactEmail: Yup.string()
//     .required('Contact email is required')
//     .email('Invalid email format'),
//   status: Yup.string()
//     .required('Status is required')
//     .oneOf(Object.values(BUSINESS_STATUS)),
// });

// const CreateBusiness = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const formik = useFormik({
//     initialValues: {
//       businessName: '',
//       industry: '',
//       contactEmail: '',
//       status: BUSINESS_STATUS.ACTIVE,
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       try {
//         setLoading(true);
//         setError('');
//         await adminService.createBusiness(values);
//         navigate('/admin/businesses');
//       } catch (err) {
//         setError(err.response?.data?.error || err.message || 'Failed to create business');
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   const industries = [
//     'Technology',
//     'Finance',
//     'Healthcare',
//     'Retail',
//     'Education',
//     'Manufacturing',
//     'Real Estate',
//     'Hospitality',
//     'Transportation',
//     'Other',
//   ];

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//         py: 6,
//       }}
//     >
//       <Container maxWidth="md">
//         <Fade in timeout={600}>
//           <Paper
//             elevation={8}
//             sx={{
//               borderRadius: 4,
//               overflow: 'hidden',
//               background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)',
//             }}
//           >
//             {/* Header Section */}
//             <Box
//               sx={{
//                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                 p: 4,
//                 color: 'white',
//                 textAlign: 'center',
//               }}
//             >
//               <BusinessIcon sx={{ fontSize: 48, mb: 1, opacity: 0.9 }} />
//               <Typography variant="h4" fontWeight={600} gutterBottom>
//                 Create New Business
//               </Typography>
//               <Typography variant="body1" sx={{ opacity: 0.95, maxWidth: 500, mx: 'auto' }}>
//                 Onboard a new business tenant to the platform by providing the essential details below
//               </Typography>
//             </Box>

//             {/* Form Section */}
//             <Box sx={{ p: 5 }}>
//               {error && (
//                 <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
//                   {error}
//                 </Alert>
//               )}

//               <form onSubmit={formik.handleSubmit}>
//                 <Grid container spacing={4}>
//                   {/* Business Name */}
//                   <Grid item xs={12}>
//                     <Typography
//                       variant="subtitle2"
//                       color="text.secondary"
//                       sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
//                     >
//                       <BusinessIcon fontSize="small" />
//                       Business Information
//                     </Typography>
//                     <TextField
//                       fullWidth
//                       id="businessName"
//                       name="businessName"
//                       label="Business Name"
//                       placeholder="Enter the official business name"
//                       value={formik.values.businessName}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       error={formik.touched.businessName && Boolean(formik.errors.businessName)}
//                       helperText={formik.touched.businessName && formik.errors.businessName}
//                       disabled={loading}
//                       sx={{
//                         '& .MuiOutlinedInput-root': {
//                           borderRadius: 2,
//                           backgroundColor: 'white',
//                         },
//                       }}
//                     />
//                   </Grid>

//                   {/* Industry */}
//                   <Grid item xs={12} md={6}>
//                     <Typography
//                       variant="subtitle2"
//                       color="text.secondary"
//                       sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
//                     >
//                       <CategoryIcon fontSize="small" />
//                       Industry
//                     </Typography>
//                     <TextField
//                       fullWidth
//                       select
//                       id="industry"
//                       name="industry"
//                       label="Select Industry"
//                       value={formik.values.industry}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       error={formik.touched.industry && Boolean(formik.errors.industry)}
//                       helperText={formik.touched.industry && formik.errors.industry}
//                       disabled={loading}
//                       sx={{
//                         '& .MuiOutlinedInput-root': {
//                           borderRadius: 2,
//                           backgroundColor: 'white',
//                         },
//                       }}
//                     >
//                       <MenuItem value="">
//                         <em>Choose an industry</em>
//                       </MenuItem>
//                       {industries.map((industry) => (
//                         <MenuItem key={industry} value={industry}>
//                           {industry}
//                         </MenuItem>
//                       ))}
//                     </TextField>
//                   </Grid>

//                   {/* Status */}
//                   <Grid item xs={12} md={6}>
//                     <Typography
//                       variant="subtitle2"
//                       color="text.secondary"
//                       sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
//                     >
//                       <CheckCircleIcon fontSize="small" />
//                       Status
//                     </Typography>
//                     <TextField
//                       fullWidth
//                       select
//                       id="status"
//                       name="status"
//                       label="Account Status"
//                       value={formik.values.status}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       error={formik.touched.status && Boolean(formik.errors.status)}
//                       helperText={formik.touched.status && formik.errors.status}
//                       disabled={loading}
//                       sx={{
//                         '& .MuiOutlinedInput-root': {
//                           borderRadius: 2,
//                           backgroundColor: 'white',
//                         },
//                       }}
//                     >
//                       {Object.values(BUSINESS_STATUS).map((status) => (
//                         <MenuItem key={status} value={status}>
//                           {status}
//                         </MenuItem>
//                       ))}
//                     </TextField>
//                   </Grid>

//                   {/* Contact Email */}
//                   <Grid item xs={12}>
//                     <Typography
//                       variant="subtitle2"
//                       color="text.secondary"
//                       sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
//                     >
//                       <EmailIcon fontSize="small" />
//                       Contact Information
//                     </Typography>
//                     <TextField
//                       fullWidth
//                       id="contactEmail"
//                       name="contactEmail"
//                       label="Contact Email"
//                       type="email"
//                       placeholder="business@example.com"
//                       value={formik.values.contactEmail}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       error={formik.touched.contactEmail && Boolean(formik.errors.contactEmail)}
//                       helperText={formik.touched.contactEmail && formik.errors.contactEmail}
//                       disabled={loading}
//                       sx={{
//                         '& .MuiOutlinedInput-root': {
//                           borderRadius: 2,
//                           backgroundColor: 'white',
//                         },
//                       }}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <Divider sx={{ my: 2 }} />
//                   </Grid>

//                   {/* Action Buttons */}
//                   <Grid item xs={12}>
//                     <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
//                       <Button
//                         variant="outlined"
//                         onClick={() => navigate('/admin/businesses')}
//                         disabled={loading}
//                         size="large"
//                         sx={{
//                           borderRadius: 2,
//                           px: 4,
//                           textTransform: 'none',
//                           fontWeight: 600,
//                           borderColor: '#667eea',
//                           color: '#667eea',
//                           '&:hover': {
//                             borderColor: '#764ba2',
//                             backgroundColor: 'rgba(102, 126, 234, 0.04)',
//                           },
//                         }}
//                       >
//                         Cancel
//                       </Button>
//                       <Button
//                         type="submit"
//                         variant="contained"
//                         disabled={loading || !formik.isValid}
//                         startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
//                         size="large"
//                         sx={{
//                           borderRadius: 2,
//                           px: 4,
//                           textTransform: 'none',
//                           fontWeight: 600,
//                           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                           boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
//                           '&:hover': {
//                             boxShadow: '0 6px 16px rgba(102, 126, 234, 0.5)',
//                             background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
//                           },
//                           '&:disabled': {
//                             background: 'rgba(0, 0, 0, 0.12)',
//                           },
//                         }}
//                       >
//                         {loading ? 'Creating Business...' : 'Create Business'}
//                       </Button>
//                     </Box>
//                   </Grid>
//                 </Grid>
//               </form>
//             </Box>
//           </Paper>
//         </Fade>
//       </Container>
//     </Box>
//   );
// };

// export default CreateBusiness;

// import React, { useState } from 'react';
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   MenuItem,
//   Alert,
//   CircularProgress,
//   Divider,
//   Container,
//   Fade,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { adminService } from '../../services/admin';
// import { BUSINESS_STATUS } from '../../utils/constants';
// import BusinessIcon from '@mui/icons-material/Business';
// import EmailIcon from '@mui/icons-material/Email';
// import CategoryIcon from '@mui/icons-material/Category';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// const validationSchema = Yup.object({
//   businessName: Yup.string()
//     .required('Business name is required')
//     .min(2, 'Business name must be at least 2 characters')
//     .max(100, 'Business name must be less than 100 characters'),
//   industry: Yup.string()
//     .required('Industry is required')
//     .min(2, 'Industry must be at least 2 characters')
//     .max(50, 'Industry must be less than 50 characters'),
//   contactEmail: Yup.string()
//     .required('Contact email is required')
//     .email('Invalid email format'),
//   status: Yup.string()
//     .required('Status is required')
//     .oneOf(Object.values(BUSINESS_STATUS)),
// });

// const CreateBusiness = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const formik = useFormik({
//     initialValues: {
//       businessName: '',
//       industry: '',
//       contactEmail: '',
//       status: BUSINESS_STATUS.ACTIVE,
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       try {
//         setLoading(true);
//         setError('');
//         await adminService.createBusiness(values);
//         navigate('/admin/businesses');
//       } catch (err) {
//         setError(err.response?.data?.error || err.message || 'Failed to create business');
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   const industries = [
//     'Technology',
//     'Finance',
//     'Healthcare',
//     'Retail',
//     'Education',
//     'Manufacturing',
//     'Real Estate',
//     'Hospitality',
//     'Transportation',
//     'Other',
//   ];

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//         py: 6,
//       }}
//     >
//       <Container maxWidth="md">
//         <Fade in timeout={600}>
//           <Paper
//             elevation={8}
//             sx={{
//               borderRadius: 4,
//               overflow: 'hidden',
//               background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)',
//             }}
//           >
//             {/* Header Section */}
//             <Box
//               sx={{
//                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                 p: 4,
//                 color: 'white',
//                 textAlign: 'center',
//               }}
//             >
//               <BusinessIcon sx={{ fontSize: 48, mb: 1, opacity: 0.9 }} />
//               <Typography variant="h4" fontWeight={600} gutterBottom>
//                 Create New Business
//               </Typography>
//               <Typography variant="body1" sx={{ opacity: 0.95, maxWidth: 500, mx: 'auto' }}>
//                 Onboard a new business tenant to the platform by providing the essential details below
//               </Typography>
//             </Box>

//             {/* Form Section */}
//             <Box sx={{ p: 5 }}>
//               {error && (
//                 <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
//                   {error}
//                 </Alert>
//               )}

//               <Box sx={{ maxWidth: 600, mx: 'auto' }}>
//                 <form onSubmit={formik.handleSubmit}>
//                   <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
//                     {/* Business Name */}
//                     <Box>
//                       <Typography
//                         variant="subtitle2"
//                         color="text.secondary"
//                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
//                       >
//                         <BusinessIcon fontSize="small" />
//                         Business Information
//                       </Typography>
//                       <TextField
//                         fullWidth
//                         id="businessName"
//                         name="businessName"
//                         label="Business Name"
//                         placeholder="Enter the official business name"
//                         value={formik.values.businessName}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         error={formik.touched.businessName && Boolean(formik.errors.businessName)}
//                         helperText={formik.touched.businessName && formik.errors.businessName}
//                         disabled={loading}
//                         sx={{
//                           '& .MuiOutlinedInput-root': {
//                             borderRadius: 2,
//                             backgroundColor: 'white',
//                           },
//                         }}
//                       />
//                     </Box>

//                     {/* Industry */}
//                     <Box>
//                       <Typography
//                         variant="subtitle2"
//                         color="text.secondary"
//                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
//                       >
//                         <CategoryIcon fontSize="small" />
//                         Industry
//                       </Typography>
//                       <TextField
//                         fullWidth
//                         select
//                         id="industry"
//                         name="industry"
//                         label="Select Industry"
//                         value={formik.values.industry}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         error={formik.touched.industry && Boolean(formik.errors.industry)}
//                         helperText={formik.touched.industry && formik.errors.industry}
//                         disabled={loading}
//                         sx={{
//                           '& .MuiOutlinedInput-root': {
//                             borderRadius: 2,
//                             backgroundColor: 'white',
//                           },
//                         }}
//                       >
//                         <MenuItem value="">
//                           <em>Choose an industry</em>
//                         </MenuItem>
//                         {industries.map((industry) => (
//                           <MenuItem key={industry} value={industry}>
//                             {industry}
//                           </MenuItem>
//                         ))}
//                       </TextField>
//                     </Box>

//                     {/* Status */}
//                     <Box>
//                       <Typography
//                         variant="subtitle2"
//                         color="text.secondary"
//                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
//                       >
//                         <CheckCircleIcon fontSize="small" />
//                         Status
//                       </Typography>
//                       <TextField
//                         fullWidth
//                         select
//                         id="status"
//                         name="status"
//                         label="Account Status"
//                         value={formik.values.status}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         error={formik.touched.status && Boolean(formik.errors.status)}
//                         helperText={formik.touched.status && formik.errors.status}
//                         disabled={loading}
//                         sx={{
//                           '& .MuiOutlinedInput-root': {
//                             borderRadius: 2,
//                             backgroundColor: 'white',
//                           },
//                         }}
//                       >
//                         {Object.values(BUSINESS_STATUS).map((status) => (
//                           <MenuItem key={status} value={status}>
//                             {status}
//                           </MenuItem>
//                         ))}
//                       </TextField>
//                     </Box>

//                     {/* Contact Email */}
//                     <Box>
//                       <Typography
//                         variant="subtitle2"
//                         color="text.secondary"
//                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
//                       >
//                         <EmailIcon fontSize="small" />
//                         Contact Information
//                       </Typography>
//                       <TextField
//                         fullWidth
//                         id="contactEmail"
//                         name="contactEmail"
//                         label="Contact Email"
//                         type="email"
//                         placeholder="business@example.com"
//                         value={formik.values.contactEmail}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         error={formik.touched.contactEmail && Boolean(formik.errors.contactEmail)}
//                         helperText={formik.touched.contactEmail && formik.errors.contactEmail}
//                         disabled={loading}
//                         sx={{
//                           '& .MuiOutlinedInput-root': {
//                             borderRadius: 2,
//                             backgroundColor: 'white',
//                           },
//                         }}
//                       />
//                     </Box>

//                     <Divider sx={{ my: 2 }} />

//                     {/* Action Buttons */}
//                     <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
//                       <Button
//                         variant="outlined"
//                         onClick={() => navigate('/admin/businesses')}
//                         disabled={loading}
//                         size="large"
//                         sx={{
//                           borderRadius: 2,
//                           px: 4,
//                           textTransform: 'none',
//                           fontWeight: 600,
//                           borderColor: '#667eea',
//                           color: '#667eea',
//                           '&:hover': {
//                             borderColor: '#764ba2',
//                             backgroundColor: 'rgba(207, 211, 231, 0.04)',
//                           },
//                         }}
//                       >
//                         Cancel
//                       </Button>
//                       <Button
//                         type="submit"
//                         variant="contained"
//                         disabled={loading || !formik.isValid}
//                         startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
//                         size="large"
//                         sx={{
//                           borderRadius: 2,
//                           px: 4,
//                           textTransform: 'none',
//                           fontWeight: 600,
//                           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                           boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
//                           '&:hover': {
//                             boxShadow: '0 6px 16px rgba(102, 126, 234, 0.5)',
//                             background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
//                           },
//                           '&:disabled': {
//                             background: 'rgba(0, 0, 0, 0.12)',
//                           },
//                         }}
//                       >
//                         {loading ? 'Creating Business...' : 'Create Business'}
//                       </Button>
//                     </Box>
//                   </Box>
//                 </form>
//               </Box>
//             </Box>
//           </Paper>
//         </Fade>
//       </Container>
//     </Box>
//   );
// };

// export default CreateBusiness;
// import React, { useState } from 'react';
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   MenuItem,
//   Alert,
//   CircularProgress,
//   Divider,
//   Container,
//   Fade,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { adminService } from '../../services/admin';
// import { BUSINESS_STATUS } from '../../utils/constants';
// import BusinessIcon from '@mui/icons-material/Business';
// import EmailIcon from '@mui/icons-material/Email';
// import CategoryIcon from '@mui/icons-material/Category';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// const validationSchema = Yup.object({
//   businessName: Yup.string()
//     .required('Business name is required')
//     .min(2, 'Business name must be at least 2 characters')
//     .max(100, 'Business name must be less than 100 characters'),
//   industry: Yup.string()
//     .required('Industry is required')
//     .min(2, 'Industry must be at least 2 characters')
//     .max(50, 'Industry must be less than 50 characters'),
//   contactEmail: Yup.string()
//     .required('Contact email is required')
//     .email('Invalid email format'),
//   status: Yup.string()
//     .required('Status is required')
//     .oneOf(Object.values(BUSINESS_STATUS)),
// });

// const CreateBusiness = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const formik = useFormik({
//     initialValues: {
//       businessName: '',
//       industry: '',
//       contactEmail: '',
//       status: BUSINESS_STATUS.ACTIVE,
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       try {
//         setLoading(true);
//         setError('');
//         await adminService.createBusiness(values);
//         navigate('/admin/businesses');
//       } catch (err) {
//         setError(err.response?.data?.error || err.message || 'Failed to create business');
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   const industries = [
//     'Technology',
//     'Finance',
//     'Healthcare',
//     'Retail',
//     'Education',
//     'Manufacturing',
//     'Real Estate',
//     'Hospitality',
//     'Transportation',
//     'Other',
//   ];

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         backgroundColor: '#f8fafc',
//         py: 6,
//       }}
//     >
//       <Container maxWidth="md">
//         <Fade in timeout={600}>
//           <Paper
//             elevation={2}
//             sx={{
//               borderRadius: 3,
//               overflow: 'hidden',
//               backgroundColor: 'white',
//               border: '1px solid rgba(59, 130, 246, 0.1)',
//               boxShadow: '0 4px 20px rgba(59, 130, 246, 0.08)',
//             }}
//           >
//             {/* Header Section - Light Blue */}
//             <Box
//               sx={{
//                 background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
//                 p: 4,
//                 color: 'white',
//                 textAlign: 'center',
//               }}
//             >
//               <BusinessIcon sx={{ fontSize: 48, mb: 1, opacity: 0.9 }} />
//               <Typography variant="h4" fontWeight={600} gutterBottom>
//                 Create New Business
//               </Typography>
//               <Typography variant="body1" sx={{ opacity: 0.95, maxWidth: 500, mx: 'auto' }}>
//                 Onboard a new business tenant to the platform by providing the essential details below
//               </Typography>
//             </Box>

//             {/* Form Section */}
//             <Box sx={{ p: 5 }}>
//               {error && (
//                 <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
//                   {error}
//                 </Alert>
//               )}

//               <Box sx={{ maxWidth: 600, mx: 'auto' }}>
//                 <form onSubmit={formik.handleSubmit}>
//                   <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
//                     {/* Business Name */}
//                     <Box>
//                       <Typography
//                         variant="subtitle2"
//                         color="text.secondary"
//                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
//                       >
//                         <BusinessIcon fontSize="small" sx={{ color: '#3b82f6' }} />
//                         Business Information
//                       </Typography>
//                       <TextField
//                         fullWidth
//                         id="businessName"
//                         name="businessName"
//                         label="Business Name"
//                         placeholder="Enter the official business name"
//                         value={formik.values.businessName}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         error={formik.touched.businessName && Boolean(formik.errors.businessName)}
//                         helperText={formik.touched.businessName && formik.errors.businessName}
//                         disabled={loading}
//                         sx={{
//                           '& .MuiOutlinedInput-root': {
//                             borderRadius: 2,
//                             backgroundColor: 'white',
//                           },
//                           '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
//                             borderColor: '#3b82f6',
//                           },
//                           '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
//                             borderColor: '#3b82f6',
//                           },
//                         }}
//                       />
//                     </Box>

//                     {/* Industry */}
//                     <Box>
//                       <Typography
//                         variant="subtitle2"
//                         color="text.secondary"
//                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
//                       >
//                         <CategoryIcon fontSize="small" sx={{ color: '#3b82f6' }} />
//                         Industry
//                       </Typography>
//                       <TextField
//                         fullWidth
//                         select
//                         id="industry"
//                         name="industry"
//                         label="Select Industry"
//                         value={formik.values.industry}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         error={formik.touched.industry && Boolean(formik.errors.industry)}
//                         helperText={formik.touched.industry && formik.errors.industry}
//                         disabled={loading}
//                         sx={{
//                           '& .MuiOutlinedInput-root': {
//                             borderRadius: 2,
//                             backgroundColor: 'white',
//                           },
//                           '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
//                             borderColor: '#3b82f6',
//                           },
//                           '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
//                             borderColor: '#3b82f6',
//                           },
//                         }}
//                       >
//                         <MenuItem value="">
//                           <em>Choose an industry</em>
//                         </MenuItem>
//                         {industries.map((industry) => (
//                           <MenuItem key={industry} value={industry}>
//                             {industry}
//                           </MenuItem>
//                         ))}
//                       </TextField>
//                     </Box>

//                     {/* Status */}
//                     <Box>
//                       <Typography
//                         variant="subtitle2"
//                         color="text.secondary"
//                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
//                       >
//                         <CheckCircleIcon fontSize="small" sx={{ color: '#3b82f6' }} />
//                         Status
//                       </Typography>
//                       <TextField
//                         fullWidth
//                         select
//                         id="status"
//                         name="status"
//                         label="Account Status"
//                         value={formik.values.status}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         error={formik.touched.status && Boolean(formik.errors.status)}
//                         helperText={formik.touched.status && formik.errors.status}
//                         disabled={loading}
//                         sx={{
//                           '& .MuiOutlinedInput-root': {
//                             borderRadius: 2,
//                             backgroundColor: 'white',
//                           },
//                           '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
//                             borderColor: '#3b82f6',
//                           },
//                           '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
//                             borderColor: '#3b82f6',
//                           },
//                         }}
//                       >
//                         {Object.values(BUSINESS_STATUS).map((status) => (
//                           <MenuItem key={status} value={status}>
//                             {status}
//                           </MenuItem>
//                         ))}
//                       </TextField>
//                     </Box>

//                     {/* Contact Email */}
//                     <Box>
//                       <Typography
//                         variant="subtitle2"
//                         color="text.secondary"
//                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
//                       >
//                         <EmailIcon fontSize="small" sx={{ color: '#3b82f6' }} />
//                         Contact Information
//                       </Typography>
//                       <TextField
//                         fullWidth
//                         id="contactEmail"
//                         name="contactEmail"
//                         label="Contact Email"
//                         type="email"
//                         placeholder="business@example.com"
//                         value={formik.values.contactEmail}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         error={formik.touched.contactEmail && Boolean(formik.errors.contactEmail)}
//                         helperText={formik.touched.contactEmail && formik.errors.contactEmail}
//                         disabled={loading}
//                         sx={{
//                           '& .MuiOutlinedInput-root': {
//                             borderRadius: 2,
//                             backgroundColor: 'white',
//                           },
//                           '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
//                             borderColor: '#3b82f6',
//                           },
//                           '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
//                             borderColor: '#3b82f6',
//                           },
//                         }}
//                       />
//                     </Box>

//                     <Divider sx={{ my: 2 }} />

//                     {/* Action Buttons */}
//                     <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
//                       <Button
//                         variant="outlined"
//                         onClick={() => navigate('/admin/businesses')}
//                         disabled={loading}
//                         size="large"
//                         sx={{
//                           borderRadius: 2,
//                           px: 4,
//                           textTransform: 'none',
//                           fontWeight: 600,
//                           borderColor: '#3b82f6',
//                           color: '#3b82f6',
//                           '&:hover': {
//                             borderColor: '#1d4ed8',
//                             backgroundColor: 'rgba(59, 130, 246, 0.04)',
//                           },
//                         }}
//                       >
//                         Cancel
//                       </Button>
//                       <Button
//                         type="submit"
//                         variant="contained"
//                         disabled={loading || !formik.isValid}
//                         startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
//                         size="large"
//                         sx={{
//                           borderRadius: 2,
//                           px: 4,
//                           textTransform: 'none',
//                           fontWeight: 600,
//                           background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
//                           boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
//                           '&:hover': {
//                             boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)',
//                             background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
//                           },
//                           '&:disabled': {
//                             background: 'rgba(0, 0, 0, 0.12)',
//                           },
//                         }}
//                       >
//                         {loading ? 'Creating Business...' : 'Create Business'}
//                       </Button>
//                     </Box>
//                   </Box>
//                 </form>
//               </Box>
//             </Box>
//           </Paper>
//         </Fade>
//       </Container>
//     </Box>
//   );
// };

// export default CreateBusiness;



// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   MenuItem,
//   Alert,
//   CircularProgress,
//   Divider,
//   Container,
//   Fade,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { adminService } from '../../services/admin';
// import { BUSINESS_STATUS } from '../../utils/constants';
// import BusinessIcon from '@mui/icons-material/Business';
// import EmailIcon from '@mui/icons-material/Email';
// import CategoryIcon from '@mui/icons-material/Category';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// const validationSchema = Yup.object({
//   businessName: Yup.string()
//     .required('Business name is required')
//     .min(2, 'Business name must be at least 2 characters')
//     .max(100, 'Business name must be less than 100 characters'),
//   industry: Yup.string()
//     .required('Industry is required')
//     .min(2, 'Industry must be at least 2 characters')
//     .max(50, 'Industry must be less than 50 characters'),
//   contactEmail: Yup.string()
//     .required('Contact email is required')
//     .email('Invalid email format'),
//   status: Yup.string()
//     .required('Status is required')
//     .oneOf(Object.values(BUSINESS_STATUS)),
// });

// const CreateBusiness = ({ business, isEditMode = false, onSuccess }) => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const formik = useFormik({
//     initialValues: {
//       businessName: business?.businessName || '',
//       industry: business?.industry || '',
//       contactEmail: business?.contactEmail || '',
//       status: business?.status || BUSINESS_STATUS.ACTIVE,
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       try {
//         setLoading(true);
//         setError('');

//         if (isEditMode && business) {
//           await adminService.updateBusiness(business.tenantId, values);
//         } else {
//           await adminService.createBusiness(values);
//         }

//         if (onSuccess) {
//           onSuccess();
//         } else {
//           navigate('/admin/businesses');
//         }
//       } catch (err) {
//         setError(err.response?.data?.error || err.message || 
//           `Failed to ${isEditMode ? 'update' : 'create'} business`);
//       } finally {
//         setLoading(false);
//       }
//     },
//     enableReinitialize: true,
//   });

//   const industries = [
//     'Technology',
//     'Finance',
//     'Healthcare',
//     'Retail',
//     'Education',
//     'Manufacturing',
//     'Real Estate',
//     'Hospitality',
//     'Transportation',
//     'Other',
//   ];

//   // Header content based on mode
//   const headerTitle = isEditMode ? 'Edit Business' : 'Create New Business';
//   const headerDescription = isEditMode 
//     ? 'Update business information and status'
//     : 'Onboard a new business tenant to the platform by providing the essential details below';
//   const headerGradient = isEditMode 
//     ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
//     : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         backgroundColor: '#f8fafc',
//         py: 6,
//       }}
//     >
//       <Container maxWidth="md">
//         <Fade in timeout={600}>
//           <Paper
//             elevation={2}
//             sx={{
//               borderRadius: 3,
//               overflow: 'hidden',
//               backgroundColor: 'white',
//               border: `1px solid ${isEditMode ? 'rgba(245, 158, 11, 0.1)' : 'rgba(59, 130, 246, 0.1)'}`,
//               boxShadow: `0 4px 20px ${isEditMode ? 'rgba(245, 158, 11, 0.08)' : 'rgba(59, 130, 246, 0.08)'}`,
//             }}
//           >
//             {/* Header Section */}
//             <Box
//               sx={{
//                 background: headerGradient,
//                 p: 4,
//                 color: 'white',
//                 textAlign: 'center',
//               }}
//             >
//               <BusinessIcon sx={{ fontSize: 48, mb: 1, opacity: 0.9 }} />
//               <Typography variant="h4" fontWeight={600} gutterBottom>
//                 {headerTitle}
//               </Typography>
//               <Typography variant="body1" sx={{ opacity: 0.95, maxWidth: 500, mx: 'auto' }}>
//                 {headerDescription}
//               </Typography>
//             </Box>

//             {/* Form Section */}
//             <Box sx={{ p: 5 }}>
//               {error && (
//                 <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
//                   {error}
//                 </Alert>
//               )}

//               <Box sx={{ maxWidth: 600, mx: 'auto' }}>
//                 <form onSubmit={formik.handleSubmit}>
//                   <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
//                     {/* Business Name */}
//                     <Box>
//                       <Typography
//                         variant="subtitle2"
//                         color="text.secondary"
//                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
//                       >
//                         <BusinessIcon fontSize="small" sx={{ color: isEditMode ? '#f59e0b' : '#3b82f6' }} />
//                         Business Information
//                       </Typography>
//                       <TextField
//                         fullWidth
//                         id="businessName"
//                         name="businessName"
//                         label="Business Name"
//                         placeholder="Enter the official business name"
//                         value={formik.values.businessName}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         error={formik.touched.businessName && Boolean(formik.errors.businessName)}
//                         helperText={formik.touched.businessName && formik.errors.businessName}
//                         disabled={loading}
//                         sx={{
//                           '& .MuiOutlinedInput-root': {
//                             borderRadius: 2,
//                             backgroundColor: 'white',
//                           },
//                           '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
//                             borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
//                           },
//                           '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
//                             borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
//                           },
//                         }}
//                       />
//                     </Box>

//                     {/* Industry */}
//                     <Box>
//                       <Typography
//                         variant="subtitle2"
//                         color="text.secondary"
//                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
//                       >
//                         <CategoryIcon fontSize="small" sx={{ color: isEditMode ? '#f59e0b' : '#3b82f6' }} />
//                         Industry
//                       </Typography>
//                       <TextField
//                         fullWidth
//                         select
//                         id="industry"
//                         name="industry"
//                         label="Select Industry"
//                         value={formik.values.industry}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         error={formik.touched.industry && Boolean(formik.errors.industry)}
//                         helperText={formik.touched.industry && formik.errors.industry}
//                         disabled={loading}
//                         sx={{
//                           '& .MuiOutlinedInput-root': {
//                             borderRadius: 2,
//                             backgroundColor: 'white',
//                           },
//                           '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
//                             borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
//                           },
//                           '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
//                             borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
//                           },
//                         }}
//                       >
//                         <MenuItem value="">
//                           <em>Choose an industry</em>
//                         </MenuItem>
//                         {industries.map((industry) => (
//                           <MenuItem key={industry} value={industry}>
//                             {industry}
//                           </MenuItem>
//                         ))}
//                       </TextField>
//                     </Box>

//                     {/* Status */}
//                     <Box>
//                       <Typography
//                         variant="subtitle2"
//                         color="text.secondary"
//                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
//                       >
//                         <CheckCircleIcon fontSize="small" sx={{ color: isEditMode ? '#f59e0b' : '#3b82f6' }} />
//                         Status
//                       </Typography>
//                       <TextField
//                         fullWidth
//                         select
//                         id="status"
//                         name="status"
//                         label="Account Status"
//                         value={formik.values.status}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         error={formik.touched.status && Boolean(formik.errors.status)}
//                         helperText={formik.touched.status && formik.errors.status}
//                         disabled={loading}
//                         sx={{
//                           '& .MuiOutlinedInput-root': {
//                             borderRadius: 2,
//                             backgroundColor: 'white',
//                           },
//                           '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
//                             borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
//                           },
//                           '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
//                             borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
//                           },
//                         }}
//                       >
//                         {Object.values(BUSINESS_STATUS).map((status) => (
//                           <MenuItem key={status} value={status}>
//                             {status}
//                           </MenuItem>
//                         ))}
//                       </TextField>
//                     </Box>

//                     {/* Contact Email */}
//                     <Box>
//                       <Typography
//                         variant="subtitle2"
//                         color="text.secondary"
//                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
//                       >
//                         <EmailIcon fontSize="small" sx={{ color: isEditMode ? '#f59e0b' : '#3b82f6' }} />
//                         Contact Information
//                       </Typography>
//                       <TextField
//                         fullWidth
//                         id="contactEmail"
//                         name="contactEmail"
//                         label="Contact Email"
//                         type="email"
//                         placeholder="business@example.com"
//                         value={formik.values.contactEmail}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         error={formik.touched.contactEmail && Boolean(formik.errors.contactEmail)}
//                         helperText={formik.touched.contactEmail && formik.errors.contactEmail}
//                         disabled={loading}
//                         sx={{
//                           '& .MuiOutlinedInput-root': {
//                             borderRadius: 2,
//                             backgroundColor: 'white',
//                           },
//                           '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
//                             borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
//                           },
//                           '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
//                             borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
//                           },
//                         }}
//                       />
//                     </Box>

//                     <Divider sx={{ my: 2 }} />

//                     {/* Action Buttons */}
//                     <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
//                       <Button
//                         variant="outlined"
//                         onClick={() => navigate('/admin/businesses')}
//                         disabled={loading}
//                         size="large"
//                         sx={{
//                           borderRadius: 2,
//                           px: 4,
//                           textTransform: 'none',
//                           fontWeight: 600,
//                           borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
//                           color: isEditMode ? '#f59e0b' : '#3b82f6',
//                           '&:hover': {
//                             borderColor: isEditMode ? '#d97706' : '#1d4ed8',
//                             backgroundColor: isEditMode ? 'rgba(245, 158, 11, 0.04)' : 'rgba(59, 130, 246, 0.04)',
//                           },
//                         }}
//                       >
//                         Cancel
//                       </Button>
//                       <Button
//                         type="submit"
//                         variant="contained"
//                         disabled={loading || !formik.isValid}
//                         startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
//                         size="large"
//                         sx={{
//                           borderRadius: 2,
//                           px: 4,
//                           textTransform: 'none',
//                           fontWeight: 600,
//                           background: isEditMode 
//                             ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
//                             : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
//                           boxShadow: isEditMode 
//                             ? '0 4px 12px rgba(245, 158, 11, 0.3)'
//                             : '0 4px 12px rgba(59, 130, 246, 0.3)',
//                           '&:hover': {
//                             boxShadow: isEditMode 
//                               ? '0 6px 16px rgba(245, 158, 11, 0.4)'
//                               : '0 6px 16px rgba(59, 130, 246, 0.4)',
//                             background: isEditMode 
//                               ? 'linear-gradient(135deg, #eab308 0%, #b45309 100%)'
//                               : 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
//                           },
//                           '&:disabled': {
//                             background: 'rgba(0, 0, 0, 0.12)',
//                           },
//                         }}
//                       >
//                         {loading 
//                           ? (isEditMode ? 'Updating Business...' : 'Creating Business...')
//                           : (isEditMode ? 'Update Business' : 'Create Business')
//                         }
//                       </Button>
//                     </Box>
//                   </Box>
//                 </form>
//               </Box>
//             </Box>
//           </Paper>
//         </Fade>
//       </Container>
//     </Box>
//   );
// };

// export default CreateBusiness;
// src/components/admin/CreateBusiness.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   MenuItem,
//   Alert,
//   CircularProgress,
//   Divider,
//   Container,
//   Fade,
//   FormControl,
//   InputLabel,
//   Select,
//   FormHelperText,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { adminService } from '../../services/admin';
// import { BUSINESS_STATUS } from '../../utils/constants';
// import BusinessIcon from '@mui/icons-material/Business';
// import EmailIcon from '@mui/icons-material/Email';
// import CategoryIcon from '@mui/icons-material/Category';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import SaveIcon from '@mui/icons-material/Save';

// const validationSchema = Yup.object({
//   businessName: Yup.string()
//     .required('Business name is required')
//     .min(2, 'Business name must be at least 2 characters')
//     .max(100, 'Business name must be less than 100 characters'),
//   industry: Yup.string()
//     .required('Industry is required')
//     .min(2, 'Industry must be at least 2 characters')
//     .max(50, 'Industry must be less than 50 characters'),
//   contactEmail: Yup.string()
//     .required('Contact email is required')
//     .email('Invalid email format'),
//   status: Yup.string()
//     .required('Status is required')
//     .oneOf(Object.values(BUSINESS_STATUS)),
// });

// const CreateBusiness = ({ business, isEditMode = false, onSuccess }) => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [initialValues, setInitialValues] = useState({
//     businessName: '',
//     industry: '',
//     contactEmail: '',
//     status: BUSINESS_STATUS.ACTIVE,
//   });

//   // Load business data if in edit mode
//   useEffect(() => {
//     if (business && isEditMode) {
//       setInitialValues({
//         businessName: business.businessName || '',
//         industry: business.industry || '',
//         contactEmail: business.contactEmail || '',
//         status: business.status || BUSINESS_STATUS.ACTIVE,
//       });
//     }
//   }, [business, isEditMode]);

//   const formik = useFormik({
//     initialValues,
//     enableReinitialize: true,
//     validationSchema,
//     onSubmit: async (values) => {
//       try {
//         setLoading(true);
//         setError('');

//         if (isEditMode && business) {
//           // Update existing business
//           await adminService.updateBusiness(business.tenantId, values);
//         } else {
//           // Create new business
//           await adminService.createBusiness(values);
//         }

//         if (onSuccess) {
//           onSuccess();
//         } else {
//           navigate('/admin/businesses');
//         }
//       } catch (err) {
//         setError(err.response?.data?.error || err.message || 
//           `Failed to ${isEditMode ? 'update' : 'create'} business`);
//         console.error('Error saving business:', err);
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   const industries = [
//     'Technology',
//     'Finance',
//     'Healthcare',
//     'Retail',
//     'Education',
//     'Manufacturing',
//     'Real Estate',
//     'Hospitality',
//     'Transportation',
//     'Other',
//   ];

//   const headerTitle = isEditMode ? 'Edit Business' : 'Create New Business';
//   const headerDescription = isEditMode 
//     ? 'Update business information and status'
//     : 'Onboard a new business tenant to the platform by providing the essential details below';
//   const headerGradient = isEditMode 
//     ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
//     : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         backgroundColor: '#f8fafc',
//         py: 6,
//       }}
//     >
//       <Container maxWidth="md">
//         <Fade in timeout={600}>
//           <Paper
//             elevation={2}
//             sx={{
//               borderRadius: 3,
//               overflow: 'hidden',
//               backgroundColor: 'white',
//               border: '1px solid rgba(59, 130, 246, 0.1)',
//               boxShadow: '0 4px 20px rgba(59, 130, 246, 0.08)',
//             }}
//           >
//             {/* Header Section */}
//             <Box
//               sx={{
//                 background: headerGradient,
//                 p: 4,
//                 color: 'white',
//                 textAlign: 'center',
//               }}
//             >
//               <BusinessIcon sx={{ fontSize: 48, mb: 1, opacity: 0.9 }} />
//               <Typography variant="h4" fontWeight={600} gutterBottom>
//                 {headerTitle}
//               </Typography>
//               <Typography variant="body1" sx={{ opacity: 0.95, maxWidth: 500, mx: 'auto' }}>
//                 {headerDescription}
//               </Typography>
//             </Box>

//             {/* Form Section */}
//             <Box sx={{ p: 5 }}>
//               {error && (
//                 <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
//                   {error}
//                 </Alert>
//               )}

//               <Box sx={{ maxWidth: 600, mx: 'auto' }}>
//                 <form onSubmit={formik.handleSubmit}>
//                   <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
//                     {/* Business Name */}
//                     <Box>
//                       <Typography
//                         variant="subtitle2"
//                         color="text.secondary"
//                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
//                       >
//                         <BusinessIcon fontSize="small" sx={{ color: isEditMode ? '#f59e0b' : '#3b82f6' }} />
//                         Business Information
//                       </Typography>
//                       <TextField
//                         fullWidth
//                         id="businessName"
//                         name="businessName"
//                         label="Business Name"
//                         placeholder="Enter the official business name"
//                         value={formik.values.businessName}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         error={formik.touched.businessName && Boolean(formik.errors.businessName)}
//                         helperText={formik.touched.businessName && formik.errors.businessName}
//                         disabled={loading}
//                         sx={{
//                           '& .MuiOutlinedInput-root': {
//                             borderRadius: 2,
//                             backgroundColor: 'white',
//                           },
//                           '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
//                             borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
//                           },
//                           '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
//                             borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
//                           },
//                         }}
//                       />
//                     </Box>

//                     {/* Industry */}
//                     <Box>
//                       <Typography
//                         variant="subtitle2"
//                         color="text.secondary"
//                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
//                       >
//                         <CategoryIcon fontSize="small" sx={{ color: isEditMode ? '#f59e0b' : '#3b82f6' }} />
//                         Industry
//                       </Typography>
//                       <TextField
//                         fullWidth
//                         select
//                         id="industry"
//                         name="industry"
//                         label="Select Industry"
//                         value={formik.values.industry}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         error={formik.touched.industry && Boolean(formik.errors.industry)}
//                         helperText={formik.touched.industry && formik.errors.industry}
//                         disabled={loading}
//                         sx={{
//                           '& .MuiOutlinedInput-root': {
//                             borderRadius: 2,
//                             backgroundColor: 'white',
//                           },
//                           '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
//                             borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
//                           },
//                           '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
//                             borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
//                           },
//                         }}
//                       >
//                         <MenuItem value="">
//                           <em>Choose an industry</em>
//                         </MenuItem>
//                         {industries.map((industry) => (
//                           <MenuItem key={industry} value={industry}>
//                             {industry}
//                           </MenuItem>
//                         ))}
//                       </TextField>
//                     </Box>

//                     {/* Status - Show in both create and edit, but with different default */}
//                     <Box>
//                       <Typography
//                         variant="subtitle2"
//                         color="text.secondary"
//                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
//                       >
//                         <CheckCircleIcon fontSize="small" sx={{ color: isEditMode ? '#f59e0b' : '#3b82f6' }} />
//                         Status
//                       </Typography>
//                       <FormControl fullWidth error={formik.touched.status && Boolean(formik.errors.status)}>
//                         <InputLabel>Account Status</InputLabel>
//                         <Select
//                           name="status"
//                           value={formik.values.status}
//                           onChange={formik.handleChange}
//                           onBlur={formik.handleBlur}
//                           label="Account Status"
//                           disabled={loading}
//                         >
//                           {Object.values(BUSINESS_STATUS).map((status) => (
//                             <MenuItem key={status} value={status}>
//                               {status}
//                             </MenuItem>
//                           ))}
//                         </Select>
//                         {formik.touched.status && formik.errors.status ? (
//                           <FormHelperText error>{formik.errors.status}</FormHelperText>
//                         ) : (
//                           <FormHelperText>
//                             {isEditMode ? 'Change business status to activate/deactivate' : 'Set initial business status'}
//                           </FormHelperText>
//                         )}
//                       </FormControl>
//                     </Box>

//                     {/* Contact Email */}
//                     <Box>
//                       <Typography
//                         variant="subtitle2"
//                         color="text.secondary"
//                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
//                       >
//                         <EmailIcon fontSize="small" sx={{ color: isEditMode ? '#f59e0b' : '#3b82f6' }} />
//                         Contact Information
//                       </Typography>
//                       <TextField
//                         fullWidth
//                         id="contactEmail"
//                         name="contactEmail"
//                         label="Contact Email"
//                         type="email"
//                         placeholder="business@example.com"
//                         value={formik.values.contactEmail}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         error={formik.touched.contactEmail && Boolean(formik.errors.contactEmail)}
//                         helperText={formik.touched.contactEmail && formik.errors.contactEmail}
//                         disabled={loading}
//                         sx={{
//                           '& .MuiOutlinedInput-root': {
//                             borderRadius: 2,
//                             backgroundColor: 'white',
//                           },
//                           '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
//                             borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
//                           },
//                           '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
//                             borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
//                           },
//                         }}
//                       />
//                     </Box>

//                     <Divider sx={{ my: 2 }} />

//                     {/* Action Buttons */}
//                     <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
//                       <Button
//                         variant="outlined"
//                         onClick={() => navigate('/admin/businesses')}
//                         disabled={loading}
//                         size="large"
//                         sx={{
//                           borderRadius: 2,
//                           px: 4,
//                           textTransform: 'none',
//                           fontWeight: 600,
//                           borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
//                           color: isEditMode ? '#f59e0b' : '#3b82f6',
//                           '&:hover': {
//                             borderColor: isEditMode ? '#d97706' : '#1d4ed8',
//                             backgroundColor: isEditMode ? 'rgba(245, 158, 11, 0.04)' : 'rgba(59, 130, 246, 0.04)',
//                           },
//                         }}
//                       >
//                         Cancel
//                       </Button>
//                       <Button
//                         type="submit"
//                         variant="contained"
//                         disabled={loading || !formik.isValid}
//                         startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
//                         size="large"
//                         sx={{
//                           borderRadius: 2,
//                           px: 4,
//                           textTransform: 'none',
//                           fontWeight: 600,
//                           background: isEditMode 
//                             ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
//                             : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
//                           boxShadow: isEditMode 
//                             ? '0 4px 12px rgba(245, 158, 11, 0.3)'
//                             : '0 4px 12px rgba(59, 130, 246, 0.3)',
//                           '&:hover': {
//                             boxShadow: isEditMode 
//                               ? '0 6px 16px rgba(245, 158, 11, 0.4)'
//                               : '0 6px 16px rgba(59, 130, 246, 0.4)',
//                             background: isEditMode 
//                               ? 'linear-gradient(135deg, #e78b0b 0%, #b45309 100%)'
//                               : 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
//                           },
//                           '&:disabled': {
//                             background: 'rgba(0, 0, 0, 0.12)',
//                           },
//                         }}
//                       >
//                         {loading 
//                           ? (isEditMode ? 'Updating...' : 'Creating...')
//                           : (isEditMode ? 'Update Business' : 'Create Business')
//                         }
//                       </Button>
//                     </Box>
//                   </Box>
//                 </form>
//               </Box>
//             </Box>
//           </Paper>
//         </Fade>
//       </Container>
//     </Box>
//   );
// };

// export default CreateBusiness;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { adminService } from '../../services/admin';
import { BUSINESS_STATUS } from '../../utils/constants';

const validationSchema = Yup.object({
  businessName: Yup.string()
    .required('Business name is required')
    .min(2, 'Business name must be at least 2 characters')
    .max(100, 'Business name must be less than 100 characters'),

  industry: Yup.string()
    .required('Industry is required')
    .min(2, 'Industry must be at least 2 characters')
    .max(50, 'Industry must be less than 50 characters'),

  contactEmail: Yup.string()
    .required('Contact email is required')
    .email('Invalid email format'),

  emergencyContactNo: Yup.string()
    .required('Emergency contact number is required')
    .matches(/^[0-9]+$/, 'Only digits allowed')
    .min(7, 'Must be at least 7 digits')
    .max(15, 'Must be at most 15 digits'),

  websiteUrl: Yup.string()
    .required('Website URL is required')
    .url('Invalid website URL'),

  status: Yup.string()
    .required('Status is required')
    .oneOf(Object.values(BUSINESS_STATUS)),
});

const CreateBusiness = ({ business, isEditMode = false, onSuccess }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const formik = useFormik({
    initialValues: {
      businessName: business?.businessName || '',
      industry: business?.industry || '',
      contactEmail: business?.contactEmail || '',
      emergencyContactNo: business?.emergencyContactNo || '',
      websiteUrl: business?.websiteUrl || '',
      status: business?.status || BUSINESS_STATUS.ACTIVE,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError('');
        setSuccess('');

        if (isEditMode && business) {
          await adminService.updateBusiness(business.tenantId, values);
          setSuccess('Business updated successfully!');
        } else {
          await adminService.createBusiness(values);
          setSuccess('Business created successfully!');
        }

        setTimeout(() => {
          onSuccess ? onSuccess() : navigate('/admin/businesses');
        }, 1500);
      } catch (err) {
        setError(
          err.response?.data?.error ||
          err.message ||
          `Failed to ${isEditMode ? 'update' : 'create'} business`
        );
      } finally {
        setLoading(false);
      }
    },
  });

  const industries = [
    'Technology',
    'Finance',
    'Healthcare',
    'Retail',
    'Education',
    'Manufacturing',
    'Real Estate',
    'Hospitality',
    'Transportation',
    'Other',
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '40px 20px' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '40px' }}>

        <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
          {isEditMode ? 'Edit Business' : 'Create Business'}
        </h1>

        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '32px' }}>
          {isEditMode ? 'Update business information and status' : 'Onboard a new business tenant to the platform'}
        </p>

        {error && (
          <div style={{ padding: '12px 16px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', color: '#991b1b', fontSize: '14px', marginBottom: '24px' }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ padding: '12px 16px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', color: '#166534', fontSize: '14px', marginBottom: '24px' }}>
            {success}
          </div>
        )}

        <div onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(); }}>

          {/* Business Name */}
          <div style={{ marginBottom: '20px' }}>
            <label>Business Name *</label>
            <input
              name="businessName"
              value={formik.values.businessName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${formik.touched.businessName && formik.errors.businessName ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '6px'
              }}
            />
          </div>

          {/* Industry */}
          <div style={{ marginBottom: '20px' }}>
            <label>Industry *</label>
            <select
              name="industry"
              value={formik.values.industry}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${formik.touched.industry && formik.errors.industry ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '6px'
              }}
            >
              <option value="">Choose an industry</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>

          {/* Contact Email */}
          <div style={{ marginBottom: '20px' }}>
            <label>Contact Email *</label>
            <input
              type="email"
              name="contactEmail"
              value={formik.values.contactEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${formik.touched.contactEmail && formik.errors.contactEmail ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '6px'
              }}
            />
          </div>

          {/* 🆕 Emergency Contact No */}
          <div style={{ marginBottom: '20px' }}>
            <label>Emergency Contact No *</label>
            <input
              type="text"
              name="emergencyContactNo"
              placeholder="Enter emergency contact number"
              value={formik.values.emergencyContactNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${formik.touched.emergencyContactNo && formik.errors.emergencyContactNo ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '6px'
              }}
            />
          </div>

          {/* 🆕 Website URL */}
          <div style={{ marginBottom: '20px' }}>
            <label>Website URL *</label>
            <input
              type="url"
              name="websiteUrl"
              placeholder="https://example.com"
              value={formik.values.websiteUrl}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${formik.touched.websiteUrl && formik.errors.websiteUrl ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '6px'
              }}
            />
          </div>

          {/* Status */}
          <div style={{ marginBottom: '32px' }}>
            <label>Account Status *</label>
            <select
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              disabled={loading}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${formik.touched.status && formik.errors.status ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '6px'
              }}
            >
              {Object.values(BUSINESS_STATUS).map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => navigate('/admin/businesses')} disabled={loading}>
              Cancel
            </button>
            <button type="button" onClick={formik.handleSubmit} disabled={loading || !formik.isValid}>
              {isEditMode ? 'Update Business' : 'Create Business'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateBusiness;
