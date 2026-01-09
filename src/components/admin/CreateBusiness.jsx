// // // // import React, { useState } from 'react';
// // // // import {
// // // //   Box,
// // // //   Paper,
// // // //   Typography,
// // // //   TextField,
// // // //   Button,
// // // //   Grid,
// // // //   MenuItem,
// // // //   Alert,
// // // //   CircularProgress,
// // // // } from '@mui/material';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { useFormik } from 'formik';
// // // // import * as Yup from 'yup';
// // // // import { adminService } from '../../services/admin';
// // // // import { BUSINESS_STATUS } from '../../utils/constants';

// // // // const validationSchema = Yup.object({
// // // //   businessName: Yup.string()
// // // //     .required('Business name is required')
// // // //     .min(2, 'Business name must be at least 2 characters')
// // // //     .max(100, 'Business name must be less than 100 characters'),
// // // //   industry: Yup.string()
// // // //     .required('Industry is required')
// // // //     .min(2, 'Industry must be at least 2 characters')
// // // //     .max(50, 'Industry must be less than 50 characters'),
// // // //   contactEmail: Yup.string()
// // // //     .required('Contact email is required')
// // // //     .email('Invalid email format'),
// // // //   accountStatus: Yup.string()
// // // //     .required('accountStatus is required')
// // // //     .oneOf(Object.values(BUSINESS_STATUS)),
// // // // });

// // // // const CreateBusiness = () => {
// // // //   const navigate = useNavigate();
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [error, setError] = useState('');

// // // //   const formik = useFormik({
// // // //     initialValues: {
// // // //       businessName: '',
// // // //       industry: '',
// // // //       contactEmail: '',
// // // //       accountStatus: BUSINESS_STATUS.ACTIVE,
// // // //     },
// // // //     validationSchema,
// // // //     onSubmit: async (values) => {
// // // //       try {
// // // //         setLoading(true);
// // // //         setError('');
// // // //         await adminService.createBusiness(values);
// // // //         navigate('/admin/businesses');
// // // //       } catch (err) {
// // // //         setError(err.response?.data?.error || err.message || 'Failed to create business');
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     },
// // // //   });

// // // //   const industries = [
// // // //     'Technology',
// // // //     'Finance',
// // // //     'Healthcare',
// // // //     'Retail',
// // // //     'Education',
// // // //     'Manufacturing',
// // // //     'Real Estate',
// // // //     'Hospitality',
// // // //     'Transportation',
// // // //     'Other',
// // // //   ];

// // // //   return (
// // // //     <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
// // // //       <Paper sx={{ p: 4 }}>
// // // //         <Typography variant="h4" gutterBottom>
// // // //           Create New Business
// // // //         </Typography>

// // // //         <Typography variant="body2" color="textSecondary" paragraph>
// // // //           Fill in the details below to onboard a new business (tenant) to the platform.
// // // //         </Typography>

// // // //         {error && (
// // // //           <Alert severity="error" sx={{ mb: 3 }}>
// // // //             {error}
// // // //           </Alert>
// // // //         )}

// // // //         <form onSubmit={formik.handleSubmit}>
// // // //           <Grid container spacing={3}>
// // // //             <Grid item xs={12}>
// // // //               <TextField
// // // //                 fullWidth
// // // //                 id="businessName"
// // // //                 name="businessName"
// // // //                 label="Business Name"
// // // //                 value={formik.values.businessName}
// // // //                 onChange={formik.handleChange}
// // // //                 onBlur={formik.handleBlur}
// // // //                 error={formik.touched.businessName && Boolean(formik.errors.businessName)}
// // // //                 helperText={formik.touched.businessName && formik.errors.businessName}
// // // //                 disabled={loading}
// // // //               />
// // // //             </Grid>

// // // //             <Grid item xs={12}>
// // // //               <TextField
// // // //                 fullWidth
// // // //                 select
// // // //                 id="industry"
// // // //                 name="industry"
// // // //                 label="Industry"
// // // //                 value={formik.values.industry}
// // // //                 onChange={formik.handleChange}
// // // //                 onBlur={formik.handleBlur}
// // // //                 error={formik.touched.industry && Boolean(formik.errors.industry)}
// // // //                 helperText={formik.touched.industry && formik.errors.industry}
// // // //                 disabled={loading}
// // // //               >
// // // //                 <MenuItem value="">
// // // //                   <em>Select Industry</em>
// // // //                 </MenuItem>
// // // //                 {industries.map((industry) => (
// // // //                   <MenuItem key={industry} value={industry}>
// // // //                     {industry}
// // // //                   </MenuItem>
// // // //                 ))}
// // // //               </TextField>
// // // //             </Grid>

// // // //             <Grid item xs={12}>
// // // //               <TextField
// // // //                 fullWidth
// // // //                 id="contactEmail"
// // // //                 name="contactEmail"
// // // //                 label="Contact Email"
// // // //                 type="email"
// // // //                 value={formik.values.contactEmail}
// // // //                 onChange={formik.handleChange}
// // // //                 onBlur={formik.handleBlur}
// // // //                 error={formik.touched.contactEmail && Boolean(formik.errors.contactEmail)}
// // // //                 helperText={formik.touched.contactEmail && formik.errors.contactEmail}
// // // //                 disabled={loading}
// // // //               />
// // // //             </Grid>

// // // //             <Grid item xs={12}>
// // // //               <TextField
// // // //                 fullWidth
// // // //                 select
// // // //                 id="accountStatus"
// // // //                 name="accountStatus"
// // // //                 label="accountStatus"
// // // //                 value={formik.values.accountStatus}
// // // //                 onChange={formik.handleChange}
// // // //                 onBlur={formik.handleBlur}
// // // //                 error={formik.touched.accountStatus && Boolean(formik.errors.accountStatus)}
// // // //                 helperText={formik.touched.accountStatus && formik.errors.accountStatus}
// // // //                 disabled={loading}
// // // //               >
// // // //                 {Object.values(BUSINESS_STATUS).map((accountStatus) => (
// // // //                   <MenuItem key={accountStatus} value={accountStatus}>
// // // //                     {accountStatus}
// // // //                   </MenuItem>
// // // //                 ))}
// // // //               </TextField>
// // // //             </Grid>

// // // //             <Grid item xs={12}>
// // // //               <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
// // // //                 <Button
// // // //                   variant="outlined"
// // // //                   onClick={() => navigate('/admin/businesses')}
// // // //                   disabled={loading}
// // // //                 >
// // // //                   Cancel
// // // //                 </Button>
// // // //                 <Button
// // // //                   type="submit"
// // // //                   variant="contained"
// // // //                   disabled={loading || !formik.isValid}
// // // //                   startIcon={loading && <CircularProgress size={20} />}
// // // //                 >
// // // //                   {loading ? 'Creating...' : 'Create Business'}
// // // //                 </Button>
// // // //               </Box>
// // // //             </Grid>
// // // //           </Grid>
// // // //         </form>
// // // //       </Paper>
// // // //     </Box>
// // // //   );
// // // // };

// // // // export default CreateBusiness;

// // // // import React, { useState } from 'react';
// // // // import {
// // // //   Box,
// // // //   Paper,
// // // //   Typography,
// // // //   TextField,
// // // //   Button,
// // // //   Grid,
// // // //   MenuItem,
// // // //   Alert,
// // // //   CircularProgress,
// // // //   Divider,
// // // //   Container,
// // // //   Fade,
// // // // } from '@mui/material';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { useFormik } from 'formik';
// // // // import * as Yup from 'yup';
// // // // import { adminService } from '../../services/admin';
// // // // import { BUSINESS_STATUS } from '../../utils/constants';
// // // // import BusinessIcon from '@mui/icons-material/Business';
// // // // import EmailIcon from '@mui/icons-material/Email';
// // // // import CategoryIcon from '@mui/icons-material/Category';
// // // // import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// // // // const validationSchema = Yup.object({
// // // //   businessName: Yup.string()
// // // //     .required('Business name is required')
// // // //     .min(2, 'Business name must be at least 2 characters')
// // // //     .max(100, 'Business name must be less than 100 characters'),
// // // //   industry: Yup.string()
// // // //     .required('Industry is required')
// // // //     .min(2, 'Industry must be at least 2 characters')
// // // //     .max(50, 'Industry must be less than 50 characters'),
// // // //   contactEmail: Yup.string()
// // // //     .required('Contact email is required')
// // // //     .email('Invalid email format'),
// // // //   accountStatus: Yup.string()
// // // //     .required('accountStatus is required')
// // // //     .oneOf(Object.values(BUSINESS_STATUS)),
// // // // });

// // // // const CreateBusiness = () => {
// // // //   const navigate = useNavigate();
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [error, setError] = useState('');

// // // //   const formik = useFormik({
// // // //     initialValues: {
// // // //       businessName: '',
// // // //       industry: '',
// // // //       contactEmail: '',
// // // //       accountStatus: BUSINESS_STATUS.ACTIVE,
// // // //     },
// // // //     validationSchema,
// // // //     onSubmit: async (values) => {
// // // //       try {
// // // //         setLoading(true);
// // // //         setError('');
// // // //         await adminService.createBusiness(values);
// // // //         navigate('/admin/businesses');
// // // //       } catch (err) {
// // // //         setError(err.response?.data?.error || err.message || 'Failed to create business');
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     },
// // // //   });

// // // //   const industries = [
// // // //     'Technology',
// // // //     'Finance',
// // // //     'Healthcare',
// // // //     'Retail',
// // // //     'Education',
// // // //     'Manufacturing',
// // // //     'Real Estate',
// // // //     'Hospitality',
// // // //     'Transportation',
// // // //     'Other',
// // // //   ];

// // // //   return (
// // // //     <Box
// // // //       sx={{
// // // //         minHeight: '100vh',
// // // //         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// // // //         py: 6,
// // // //       }}
// // // //     >
// // // //       <Container maxWidth="md">
// // // //         <Fade in timeout={600}>
// // // //           <Paper
// // // //             elevation={8}
// // // //             sx={{
// // // //               borderRadius: 4,
// // // //               overflow: 'hidden',
// // // //               background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)',
// // // //             }}
// // // //           >
// // // //             {/* Header Section */}
// // // //             <Box
// // // //               sx={{
// // // //                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// // // //                 p: 4,
// // // //                 color: 'white',
// // // //                 textAlign: 'center',
// // // //               }}
// // // //             >
// // // //               <BusinessIcon sx={{ fontSize: 48, mb: 1, opacity: 0.9 }} />
// // // //               <Typography variant="h4" fontWeight={600} gutterBottom>
// // // //                 Create New Business
// // // //               </Typography>
// // // //               <Typography variant="body1" sx={{ opacity: 0.95, maxWidth: 500, mx: 'auto' }}>
// // // //                 Onboard a new business tenant to the platform by providing the essential details below
// // // //               </Typography>
// // // //             </Box>

// // // //             {/* Form Section */}
// // // //             <Box sx={{ p: 5 }}>
// // // //               {error && (
// // // //                 <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
// // // //                   {error}
// // // //                 </Alert>
// // // //               )}

// // // //               <form onSubmit={formik.handleSubmit}>
// // // //                 <Grid container spacing={4}>
// // // //                   {/* Business Name */}
// // // //                   <Grid item xs={12}>
// // // //                     <Typography
// // // //                       variant="subtitle2"
// // // //                       color="text.secondary"
// // // //                       sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
// // // //                     >
// // // //                       <BusinessIcon fontSize="small" />
// // // //                       Business Information
// // // //                     </Typography>
// // // //                     <TextField
// // // //                       fullWidth
// // // //                       id="businessName"
// // // //                       name="businessName"
// // // //                       label="Business Name"
// // // //                       placeholder="Enter the official business name"
// // // //                       value={formik.values.businessName}
// // // //                       onChange={formik.handleChange}
// // // //                       onBlur={formik.handleBlur}
// // // //                       error={formik.touched.businessName && Boolean(formik.errors.businessName)}
// // // //                       helperText={formik.touched.businessName && formik.errors.businessName}
// // // //                       disabled={loading}
// // // //                       sx={{
// // // //                         '& .MuiOutlinedInput-root': {
// // // //                           borderRadius: 2,
// // // //                           backgroundColor: 'white',
// // // //                         },
// // // //                       }}
// // // //                     />
// // // //                   </Grid>

// // // //                   {/* Industry */}
// // // //                   <Grid item xs={12} md={6}>
// // // //                     <Typography
// // // //                       variant="subtitle2"
// // // //                       color="text.secondary"
// // // //                       sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
// // // //                     >
// // // //                       <CategoryIcon fontSize="small" />
// // // //                       Industry
// // // //                     </Typography>
// // // //                     <TextField
// // // //                       fullWidth
// // // //                       select
// // // //                       id="industry"
// // // //                       name="industry"
// // // //                       label="Select Industry"
// // // //                       value={formik.values.industry}
// // // //                       onChange={formik.handleChange}
// // // //                       onBlur={formik.handleBlur}
// // // //                       error={formik.touched.industry && Boolean(formik.errors.industry)}
// // // //                       helperText={formik.touched.industry && formik.errors.industry}
// // // //                       disabled={loading}
// // // //                       sx={{
// // // //                         '& .MuiOutlinedInput-root': {
// // // //                           borderRadius: 2,
// // // //                           backgroundColor: 'white',
// // // //                         },
// // // //                       }}
// // // //                     >
// // // //                       <MenuItem value="">
// // // //                         <em>Choose an industry</em>
// // // //                       </MenuItem>
// // // //                       {industries.map((industry) => (
// // // //                         <MenuItem key={industry} value={industry}>
// // // //                           {industry}
// // // //                         </MenuItem>
// // // //                       ))}
// // // //                     </TextField>
// // // //                   </Grid>

// // // //                   {/* accountStatus */}
// // // //                   <Grid item xs={12} md={6}>
// // // //                     <Typography
// // // //                       variant="subtitle2"
// // // //                       color="text.secondary"
// // // //                       sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
// // // //                     >
// // // //                       <CheckCircleIcon fontSize="small" />
// // // //                       accountStatus
// // // //                     </Typography>
// // // //                     <TextField
// // // //                       fullWidth
// // // //                       select
// // // //                       id="accountStatus"
// // // //                       name="accountStatus"
// // // //                       label="Account accountStatus"
// // // //                       value={formik.values.accountStatus}
// // // //                       onChange={formik.handleChange}
// // // //                       onBlur={formik.handleBlur}
// // // //                       error={formik.touched.accountStatus && Boolean(formik.errors.accountStatus)}
// // // //                       helperText={formik.touched.accountStatus && formik.errors.accountStatus}
// // // //                       disabled={loading}
// // // //                       sx={{
// // // //                         '& .MuiOutlinedInput-root': {
// // // //                           borderRadius: 2,
// // // //                           backgroundColor: 'white',
// // // //                         },
// // // //                       }}
// // // //                     >
// // // //                       {Object.values(BUSINESS_STATUS).map((accountStatus) => (
// // // //                         <MenuItem key={accountStatus} value={accountStatus}>
// // // //                           {accountStatus}
// // // //                         </MenuItem>
// // // //                       ))}
// // // //                     </TextField>
// // // //                   </Grid>

// // // //                   {/* Contact Email */}
// // // //                   <Grid item xs={12}>
// // // //                     <Typography
// // // //                       variant="subtitle2"
// // // //                       color="text.secondary"
// // // //                       sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
// // // //                     >
// // // //                       <EmailIcon fontSize="small" />
// // // //                       Contact Information
// // // //                     </Typography>
// // // //                     <TextField
// // // //                       fullWidth
// // // //                       id="contactEmail"
// // // //                       name="contactEmail"
// // // //                       label="Contact Email"
// // // //                       type="email"
// // // //                       placeholder="business@example.com"
// // // //                       value={formik.values.contactEmail}
// // // //                       onChange={formik.handleChange}
// // // //                       onBlur={formik.handleBlur}
// // // //                       error={formik.touched.contactEmail && Boolean(formik.errors.contactEmail)}
// // // //                       helperText={formik.touched.contactEmail && formik.errors.contactEmail}
// // // //                       disabled={loading}
// // // //                       sx={{
// // // //                         '& .MuiOutlinedInput-root': {
// // // //                           borderRadius: 2,
// // // //                           backgroundColor: 'white',
// // // //                         },
// // // //                       }}
// // // //                     />
// // // //                   </Grid>

// // // //                   <Grid item xs={12}>
// // // //                     <Divider sx={{ my: 2 }} />
// // // //                   </Grid>

// // // //                   {/* Action Buttons */}
// // // //                   <Grid item xs={12}>
// // // //                     <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
// // // //                       <Button
// // // //                         variant="outlined"
// // // //                         onClick={() => navigate('/admin/businesses')}
// // // //                         disabled={loading}
// // // //                         size="large"
// // // //                         sx={{
// // // //                           borderRadius: 2,
// // // //                           px: 4,
// // // //                           textTransform: 'none',
// // // //                           fontWeight: 600,
// // // //                           borderColor: '#667eea',
// // // //                           color: '#667eea',
// // // //                           '&:hover': {
// // // //                             borderColor: '#764ba2',
// // // //                             backgroundColor: 'rgba(102, 126, 234, 0.04)',
// // // //                           },
// // // //                         }}
// // // //                       >
// // // //                         Cancel
// // // //                       </Button>
// // // //                       <Button
// // // //                         type="submit"
// // // //                         variant="contained"
// // // //                         disabled={loading || !formik.isValid}
// // // //                         startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
// // // //                         size="large"
// // // //                         sx={{
// // // //                           borderRadius: 2,
// // // //                           px: 4,
// // // //                           textTransform: 'none',
// // // //                           fontWeight: 600,
// // // //                           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// // // //                           boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
// // // //                           '&:hover': {
// // // //                             boxShadow: '0 6px 16px rgba(102, 126, 234, 0.5)',
// // // //                             background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
// // // //                           },
// // // //                           '&:disabled': {
// // // //                             background: 'rgba(0, 0, 0, 0.12)',
// // // //                           },
// // // //                         }}
// // // //                       >
// // // //                         {loading ? 'Creating Business...' : 'Create Business'}
// // // //                       </Button>
// // // //                     </Box>
// // // //                   </Grid>
// // // //                 </Grid>
// // // //               </form>
// // // //             </Box>
// // // //           </Paper>
// // // //         </Fade>
// // // //       </Container>
// // // //     </Box>
// // // //   );
// // // // };

// // // // export default CreateBusiness;

// // // // import React, { useState } from 'react';
// // // // import {
// // // //   Box,
// // // //   Paper,
// // // //   Typography,
// // // //   TextField,
// // // //   Button,
// // // //   MenuItem,
// // // //   Alert,
// // // //   CircularProgress,
// // // //   Divider,
// // // //   Container,
// // // //   Fade,
// // // // } from '@mui/material';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { useFormik } from 'formik';
// // // // import * as Yup from 'yup';
// // // // import { adminService } from '../../services/admin';
// // // // import { BUSINESS_STATUS } from '../../utils/constants';
// // // // import BusinessIcon from '@mui/icons-material/Business';
// // // // import EmailIcon from '@mui/icons-material/Email';
// // // // import CategoryIcon from '@mui/icons-material/Category';
// // // // import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// // // // const validationSchema = Yup.object({
// // // //   businessName: Yup.string()
// // // //     .required('Business name is required')
// // // //     .min(2, 'Business name must be at least 2 characters')
// // // //     .max(100, 'Business name must be less than 100 characters'),
// // // //   industry: Yup.string()
// // // //     .required('Industry is required')
// // // //     .min(2, 'Industry must be at least 2 characters')
// // // //     .max(50, 'Industry must be less than 50 characters'),
// // // //   contactEmail: Yup.string()
// // // //     .required('Contact email is required')
// // // //     .email('Invalid email format'),
// // // //   accountStatus: Yup.string()
// // // //     .required('accountStatus is required')
// // // //     .oneOf(Object.values(BUSINESS_STATUS)),
// // // // });

// // // // const CreateBusiness = () => {
// // // //   const navigate = useNavigate();
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [error, setError] = useState('');

// // // //   const formik = useFormik({
// // // //     initialValues: {
// // // //       businessName: '',
// // // //       industry: '',
// // // //       contactEmail: '',
// // // //       accountStatus: BUSINESS_STATUS.ACTIVE,
// // // //     },
// // // //     validationSchema,
// // // //     onSubmit: async (values) => {
// // // //       try {
// // // //         setLoading(true);
// // // //         setError('');
// // // //         await adminService.createBusiness(values);
// // // //         navigate('/admin/businesses');
// // // //       } catch (err) {
// // // //         setError(err.response?.data?.error || err.message || 'Failed to create business');
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     },
// // // //   });

// // // //   const industries = [
// // // //     'Technology',
// // // //     'Finance',
// // // //     'Healthcare',
// // // //     'Retail',
// // // //     'Education',
// // // //     'Manufacturing',
// // // //     'Real Estate',
// // // //     'Hospitality',
// // // //     'Transportation',
// // // //     'Other',
// // // //   ];

// // // //   return (
// // // //     <Box
// // // //       sx={{
// // // //         minHeight: '100vh',
// // // //         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// // // //         py: 6,
// // // //       }}
// // // //     >
// // // //       <Container maxWidth="md">
// // // //         <Fade in timeout={600}>
// // // //           <Paper
// // // //             elevation={8}
// // // //             sx={{
// // // //               borderRadius: 4,
// // // //               overflow: 'hidden',
// // // //               background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)',
// // // //             }}
// // // //           >
// // // //             {/* Header Section */}
// // // //             <Box
// // // //               sx={{
// // // //                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// // // //                 p: 4,
// // // //                 color: 'white',
// // // //                 textAlign: 'center',
// // // //               }}
// // // //             >
// // // //               <BusinessIcon sx={{ fontSize: 48, mb: 1, opacity: 0.9 }} />
// // // //               <Typography variant="h4" fontWeight={600} gutterBottom>
// // // //                 Create New Business
// // // //               </Typography>
// // // //               <Typography variant="body1" sx={{ opacity: 0.95, maxWidth: 500, mx: 'auto' }}>
// // // //                 Onboard a new business tenant to the platform by providing the essential details below
// // // //               </Typography>
// // // //             </Box>

// // // //             {/* Form Section */}
// // // //             <Box sx={{ p: 5 }}>
// // // //               {error && (
// // // //                 <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
// // // //                   {error}
// // // //                 </Alert>
// // // //               )}

// // // //               <Box sx={{ maxWidth: 600, mx: 'auto' }}>
// // // //                 <form onSubmit={formik.handleSubmit}>
// // // //                   <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
// // // //                     {/* Business Name */}
// // // //                     <Box>
// // // //                       <Typography
// // // //                         variant="subtitle2"
// // // //                         color="text.secondary"
// // // //                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
// // // //                       >
// // // //                         <BusinessIcon fontSize="small" />
// // // //                         Business Information
// // // //                       </Typography>
// // // //                       <TextField
// // // //                         fullWidth
// // // //                         id="businessName"
// // // //                         name="businessName"
// // // //                         label="Business Name"
// // // //                         placeholder="Enter the official business name"
// // // //                         value={formik.values.businessName}
// // // //                         onChange={formik.handleChange}
// // // //                         onBlur={formik.handleBlur}
// // // //                         error={formik.touched.businessName && Boolean(formik.errors.businessName)}
// // // //                         helperText={formik.touched.businessName && formik.errors.businessName}
// // // //                         disabled={loading}
// // // //                         sx={{
// // // //                           '& .MuiOutlinedInput-root': {
// // // //                             borderRadius: 2,
// // // //                             backgroundColor: 'white',
// // // //                           },
// // // //                         }}
// // // //                       />
// // // //                     </Box>

// // // //                     {/* Industry */}
// // // //                     <Box>
// // // //                       <Typography
// // // //                         variant="subtitle2"
// // // //                         color="text.secondary"
// // // //                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
// // // //                       >
// // // //                         <CategoryIcon fontSize="small" />
// // // //                         Industry
// // // //                       </Typography>
// // // //                       <TextField
// // // //                         fullWidth
// // // //                         select
// // // //                         id="industry"
// // // //                         name="industry"
// // // //                         label="Select Industry"
// // // //                         value={formik.values.industry}
// // // //                         onChange={formik.handleChange}
// // // //                         onBlur={formik.handleBlur}
// // // //                         error={formik.touched.industry && Boolean(formik.errors.industry)}
// // // //                         helperText={formik.touched.industry && formik.errors.industry}
// // // //                         disabled={loading}
// // // //                         sx={{
// // // //                           '& .MuiOutlinedInput-root': {
// // // //                             borderRadius: 2,
// // // //                             backgroundColor: 'white',
// // // //                           },
// // // //                         }}
// // // //                       >
// // // //                         <MenuItem value="">
// // // //                           <em>Choose an industry</em>
// // // //                         </MenuItem>
// // // //                         {industries.map((industry) => (
// // // //                           <MenuItem key={industry} value={industry}>
// // // //                             {industry}
// // // //                           </MenuItem>
// // // //                         ))}
// // // //                       </TextField>
// // // //                     </Box>

// // // //                     {/* accountStatus */}
// // // //                     <Box>
// // // //                       <Typography
// // // //                         variant="subtitle2"
// // // //                         color="text.secondary"
// // // //                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
// // // //                       >
// // // //                         <CheckCircleIcon fontSize="small" />
// // // //                         accountStatus
// // // //                       </Typography>
// // // //                       <TextField
// // // //                         fullWidth
// // // //                         select
// // // //                         id="accountStatus"
// // // //                         name="accountStatus"
// // // //                         label="Account accountStatus"
// // // //                         value={formik.values.accountStatus}
// // // //                         onChange={formik.handleChange}
// // // //                         onBlur={formik.handleBlur}
// // // //                         error={formik.touched.accountStatus && Boolean(formik.errors.accountStatus)}
// // // //                         helperText={formik.touched.accountStatus && formik.errors.accountStatus}
// // // //                         disabled={loading}
// // // //                         sx={{
// // // //                           '& .MuiOutlinedInput-root': {
// // // //                             borderRadius: 2,
// // // //                             backgroundColor: 'white',
// // // //                           },
// // // //                         }}
// // // //                       >
// // // //                         {Object.values(BUSINESS_STATUS).map((accountStatus) => (
// // // //                           <MenuItem key={accountStatus} value={accountStatus}>
// // // //                             {accountStatus}
// // // //                           </MenuItem>
// // // //                         ))}
// // // //                       </TextField>
// // // //                     </Box>

// // // //                     {/* Contact Email */}
// // // //                     <Box>
// // // //                       <Typography
// // // //                         variant="subtitle2"
// // // //                         color="text.secondary"
// // // //                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
// // // //                       >
// // // //                         <EmailIcon fontSize="small" />
// // // //                         Contact Information
// // // //                       </Typography>
// // // //                       <TextField
// // // //                         fullWidth
// // // //                         id="contactEmail"
// // // //                         name="contactEmail"
// // // //                         label="Contact Email"
// // // //                         type="email"
// // // //                         placeholder="business@example.com"
// // // //                         value={formik.values.contactEmail}
// // // //                         onChange={formik.handleChange}
// // // //                         onBlur={formik.handleBlur}
// // // //                         error={formik.touched.contactEmail && Boolean(formik.errors.contactEmail)}
// // // //                         helperText={formik.touched.contactEmail && formik.errors.contactEmail}
// // // //                         disabled={loading}
// // // //                         sx={{
// // // //                           '& .MuiOutlinedInput-root': {
// // // //                             borderRadius: 2,
// // // //                             backgroundColor: 'white',
// // // //                           },
// // // //                         }}
// // // //                       />
// // // //                     </Box>

// // // //                     <Divider sx={{ my: 2 }} />

// // // //                     {/* Action Buttons */}
// // // //                     <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
// // // //                       <Button
// // // //                         variant="outlined"
// // // //                         onClick={() => navigate('/admin/businesses')}
// // // //                         disabled={loading}
// // // //                         size="large"
// // // //                         sx={{
// // // //                           borderRadius: 2,
// // // //                           px: 4,
// // // //                           textTransform: 'none',
// // // //                           fontWeight: 600,
// // // //                           borderColor: '#667eea',
// // // //                           color: '#667eea',
// // // //                           '&:hover': {
// // // //                             borderColor: '#764ba2',
// // // //                             backgroundColor: 'rgba(207, 211, 231, 0.04)',
// // // //                           },
// // // //                         }}
// // // //                       >
// // // //                         Cancel
// // // //                       </Button>
// // // //                       <Button
// // // //                         type="submit"
// // // //                         variant="contained"
// // // //                         disabled={loading || !formik.isValid}
// // // //                         startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
// // // //                         size="large"
// // // //                         sx={{
// // // //                           borderRadius: 2,
// // // //                           px: 4,
// // // //                           textTransform: 'none',
// // // //                           fontWeight: 600,
// // // //                           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// // // //                           boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
// // // //                           '&:hover': {
// // // //                             boxShadow: '0 6px 16px rgba(102, 126, 234, 0.5)',
// // // //                             background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
// // // //                           },
// // // //                           '&:disabled': {
// // // //                             background: 'rgba(0, 0, 0, 0.12)',
// // // //                           },
// // // //                         }}
// // // //                       >
// // // //                         {loading ? 'Creating Business...' : 'Create Business'}
// // // //                       </Button>
// // // //                     </Box>
// // // //                   </Box>
// // // //                 </form>
// // // //               </Box>
// // // //             </Box>
// // // //           </Paper>
// // // //         </Fade>
// // // //       </Container>
// // // //     </Box>
// // // //   );
// // // // };

// // // // export default CreateBusiness;
// // // // import React, { useState } from 'react';
// // // // import {
// // // //   Box,
// // // //   Paper,
// // // //   Typography,
// // // //   TextField,
// // // //   Button,
// // // //   MenuItem,
// // // //   Alert,
// // // //   CircularProgress,
// // // //   Divider,
// // // //   Container,
// // // //   Fade,
// // // // } from '@mui/material';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { useFormik } from 'formik';
// // // // import * as Yup from 'yup';
// // // // import { adminService } from '../../services/admin';
// // // // import { BUSINESS_STATUS } from '../../utils/constants';
// // // // import BusinessIcon from '@mui/icons-material/Business';
// // // // import EmailIcon from '@mui/icons-material/Email';
// // // // import CategoryIcon from '@mui/icons-material/Category';
// // // // import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// // // // const validationSchema = Yup.object({
// // // //   businessName: Yup.string()
// // // //     .required('Business name is required')
// // // //     .min(2, 'Business name must be at least 2 characters')
// // // //     .max(100, 'Business name must be less than 100 characters'),
// // // //   industry: Yup.string()
// // // //     .required('Industry is required')
// // // //     .min(2, 'Industry must be at least 2 characters')
// // // //     .max(50, 'Industry must be less than 50 characters'),
// // // //   contactEmail: Yup.string()
// // // //     .required('Contact email is required')
// // // //     .email('Invalid email format'),
// // // //   accountStatus: Yup.string()
// // // //     .required('accountStatus is required')
// // // //     .oneOf(Object.values(BUSINESS_STATUS)),
// // // // });

// // // // const CreateBusiness = () => {
// // // //   const navigate = useNavigate();
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [error, setError] = useState('');

// // // //   const formik = useFormik({
// // // //     initialValues: {
// // // //       businessName: '',
// // // //       industry: '',
// // // //       contactEmail: '',
// // // //       accountStatus: BUSINESS_STATUS.ACTIVE,
// // // //     },
// // // //     validationSchema,
// // // //     onSubmit: async (values) => {
// // // //       try {
// // // //         setLoading(true);
// // // //         setError('');
// // // //         await adminService.createBusiness(values);
// // // //         navigate('/admin/businesses');
// // // //       } catch (err) {
// // // //         setError(err.response?.data?.error || err.message || 'Failed to create business');
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     },
// // // //   });

// // // //   const industries = [
// // // //     'Technology',
// // // //     'Finance',
// // // //     'Healthcare',
// // // //     'Retail',
// // // //     'Education',
// // // //     'Manufacturing',
// // // //     'Real Estate',
// // // //     'Hospitality',
// // // //     'Transportation',
// // // //     'Other',
// // // //   ];

// // // //   return (
// // // //     <Box
// // // //       sx={{
// // // //         minHeight: '100vh',
// // // //         backgroundColor: '#f8fafc',
// // // //         py: 6,
// // // //       }}
// // // //     >
// // // //       <Container maxWidth="md">
// // // //         <Fade in timeout={600}>
// // // //           <Paper
// // // //             elevation={2}
// // // //             sx={{
// // // //               borderRadius: 3,
// // // //               overflow: 'hidden',
// // // //               backgroundColor: 'white',
// // // //               border: '1px solid rgba(59, 130, 246, 0.1)',
// // // //               boxShadow: '0 4px 20px rgba(59, 130, 246, 0.08)',
// // // //             }}
// // // //           >
// // // //             {/* Header Section - Light Blue */}
// // // //             <Box
// // // //               sx={{
// // // //                 background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
// // // //                 p: 4,
// // // //                 color: 'white',
// // // //                 textAlign: 'center',
// // // //               }}
// // // //             >
// // // //               <BusinessIcon sx={{ fontSize: 48, mb: 1, opacity: 0.9 }} />
// // // //               <Typography variant="h4" fontWeight={600} gutterBottom>
// // // //                 Create New Business
// // // //               </Typography>
// // // //               <Typography variant="body1" sx={{ opacity: 0.95, maxWidth: 500, mx: 'auto' }}>
// // // //                 Onboard a new business tenant to the platform by providing the essential details below
// // // //               </Typography>
// // // //             </Box>

// // // //             {/* Form Section */}
// // // //             <Box sx={{ p: 5 }}>
// // // //               {error && (
// // // //                 <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
// // // //                   {error}
// // // //                 </Alert>
// // // //               )}

// // // //               <Box sx={{ maxWidth: 600, mx: 'auto' }}>
// // // //                 <form onSubmit={formik.handleSubmit}>
// // // //                   <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
// // // //                     {/* Business Name */}
// // // //                     <Box>
// // // //                       <Typography
// // // //                         variant="subtitle2"
// // // //                         color="text.secondary"
// // // //                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
// // // //                       >
// // // //                         <BusinessIcon fontSize="small" sx={{ color: '#3b82f6' }} />
// // // //                         Business Information
// // // //                       </Typography>
// // // //                       <TextField
// // // //                         fullWidth
// // // //                         id="businessName"
// // // //                         name="businessName"
// // // //                         label="Business Name"
// // // //                         placeholder="Enter the official business name"
// // // //                         value={formik.values.businessName}
// // // //                         onChange={formik.handleChange}
// // // //                         onBlur={formik.handleBlur}
// // // //                         error={formik.touched.businessName && Boolean(formik.errors.businessName)}
// // // //                         helperText={formik.touched.businessName && formik.errors.businessName}
// // // //                         disabled={loading}
// // // //                         sx={{
// // // //                           '& .MuiOutlinedInput-root': {
// // // //                             borderRadius: 2,
// // // //                             backgroundColor: 'white',
// // // //                           },
// // // //                           '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
// // // //                             borderColor: '#3b82f6',
// // // //                           },
// // // //                           '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
// // // //                             borderColor: '#3b82f6',
// // // //                           },
// // // //                         }}
// // // //                       />
// // // //                     </Box>

// // // //                     {/* Industry */}
// // // //                     <Box>
// // // //                       <Typography
// // // //                         variant="subtitle2"
// // // //                         color="text.secondary"
// // // //                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
// // // //                       >
// // // //                         <CategoryIcon fontSize="small" sx={{ color: '#3b82f6' }} />
// // // //                         Industry
// // // //                       </Typography>
// // // //                       <TextField
// // // //                         fullWidth
// // // //                         select
// // // //                         id="industry"
// // // //                         name="industry"
// // // //                         label="Select Industry"
// // // //                         value={formik.values.industry}
// // // //                         onChange={formik.handleChange}
// // // //                         onBlur={formik.handleBlur}
// // // //                         error={formik.touched.industry && Boolean(formik.errors.industry)}
// // // //                         helperText={formik.touched.industry && formik.errors.industry}
// // // //                         disabled={loading}
// // // //                         sx={{
// // // //                           '& .MuiOutlinedInput-root': {
// // // //                             borderRadius: 2,
// // // //                             backgroundColor: 'white',
// // // //                           },
// // // //                           '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
// // // //                             borderColor: '#3b82f6',
// // // //                           },
// // // //                           '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
// // // //                             borderColor: '#3b82f6',
// // // //                           },
// // // //                         }}
// // // //                       >
// // // //                         <MenuItem value="">
// // // //                           <em>Choose an industry</em>
// // // //                         </MenuItem>
// // // //                         {industries.map((industry) => (
// // // //                           <MenuItem key={industry} value={industry}>
// // // //                             {industry}
// // // //                           </MenuItem>
// // // //                         ))}
// // // //                       </TextField>
// // // //                     </Box>

// // // //                     {/* accountStatus */}
// // // //                     <Box>
// // // //                       <Typography
// // // //                         variant="subtitle2"
// // // //                         color="text.secondary"
// // // //                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
// // // //                       >
// // // //                         <CheckCircleIcon fontSize="small" sx={{ color: '#3b82f6' }} />
// // // //                         accountStatus
// // // //                       </Typography>
// // // //                       <TextField
// // // //                         fullWidth
// // // //                         select
// // // //                         id="accountStatus"
// // // //                         name="accountStatus"
// // // //                         label="Account accountStatus"
// // // //                         value={formik.values.accountStatus}
// // // //                         onChange={formik.handleChange}
// // // //                         onBlur={formik.handleBlur}
// // // //                         error={formik.touched.accountStatus && Boolean(formik.errors.accountStatus)}
// // // //                         helperText={formik.touched.accountStatus && formik.errors.accountStatus}
// // // //                         disabled={loading}
// // // //                         sx={{
// // // //                           '& .MuiOutlinedInput-root': {
// // // //                             borderRadius: 2,
// // // //                             backgroundColor: 'white',
// // // //                           },
// // // //                           '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
// // // //                             borderColor: '#3b82f6',
// // // //                           },
// // // //                           '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
// // // //                             borderColor: '#3b82f6',
// // // //                           },
// // // //                         }}
// // // //                       >
// // // //                         {Object.values(BUSINESS_STATUS).map((accountStatus) => (
// // // //                           <MenuItem key={accountStatus} value={accountStatus}>
// // // //                             {accountStatus}
// // // //                           </MenuItem>
// // // //                         ))}
// // // //                       </TextField>
// // // //                     </Box>

// // // //                     {/* Contact Email */}
// // // //                     <Box>
// // // //                       <Typography
// // // //                         variant="subtitle2"
// // // //                         color="text.secondary"
// // // //                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
// // // //                       >
// // // //                         <EmailIcon fontSize="small" sx={{ color: '#3b82f6' }} />
// // // //                         Contact Information
// // // //                       </Typography>
// // // //                       <TextField
// // // //                         fullWidth
// // // //                         id="contactEmail"
// // // //                         name="contactEmail"
// // // //                         label="Contact Email"
// // // //                         type="email"
// // // //                         placeholder="business@example.com"
// // // //                         value={formik.values.contactEmail}
// // // //                         onChange={formik.handleChange}
// // // //                         onBlur={formik.handleBlur}
// // // //                         error={formik.touched.contactEmail && Boolean(formik.errors.contactEmail)}
// // // //                         helperText={formik.touched.contactEmail && formik.errors.contactEmail}
// // // //                         disabled={loading}
// // // //                         sx={{
// // // //                           '& .MuiOutlinedInput-root': {
// // // //                             borderRadius: 2,
// // // //                             backgroundColor: 'white',
// // // //                           },
// // // //                           '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
// // // //                             borderColor: '#3b82f6',
// // // //                           },
// // // //                           '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
// // // //                             borderColor: '#3b82f6',
// // // //                           },
// // // //                         }}
// // // //                       />
// // // //                     </Box>

// // // //                     <Divider sx={{ my: 2 }} />

// // // //                     {/* Action Buttons */}
// // // //                     <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
// // // //                       <Button
// // // //                         variant="outlined"
// // // //                         onClick={() => navigate('/admin/businesses')}
// // // //                         disabled={loading}
// // // //                         size="large"
// // // //                         sx={{
// // // //                           borderRadius: 2,
// // // //                           px: 4,
// // // //                           textTransform: 'none',
// // // //                           fontWeight: 600,
// // // //                           borderColor: '#3b82f6',
// // // //                           color: '#3b82f6',
// // // //                           '&:hover': {
// // // //                             borderColor: '#1d4ed8',
// // // //                             backgroundColor: 'rgba(59, 130, 246, 0.04)',
// // // //                           },
// // // //                         }}
// // // //                       >
// // // //                         Cancel
// // // //                       </Button>
// // // //                       <Button
// // // //                         type="submit"
// // // //                         variant="contained"
// // // //                         disabled={loading || !formik.isValid}
// // // //                         startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
// // // //                         size="large"
// // // //                         sx={{
// // // //                           borderRadius: 2,
// // // //                           px: 4,
// // // //                           textTransform: 'none',
// // // //                           fontWeight: 600,
// // // //                           background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
// // // //                           boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
// // // //                           '&:hover': {
// // // //                             boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)',
// // // //                             background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
// // // //                           },
// // // //                           '&:disabled': {
// // // //                             background: 'rgba(0, 0, 0, 0.12)',
// // // //                           },
// // // //                         }}
// // // //                       >
// // // //                         {loading ? 'Creating Business...' : 'Create Business'}
// // // //                       </Button>
// // // //                     </Box>
// // // //                   </Box>
// // // //                 </form>
// // // //               </Box>
// // // //             </Box>
// // // //           </Paper>
// // // //         </Fade>
// // // //       </Container>
// // // //     </Box>
// // // //   );
// // // // };

// // // // export default CreateBusiness;



// // // // import React, { useState, useEffect } from 'react';
// // // // import {
// // // //   Box,
// // // //   Paper,
// // // //   Typography,
// // // //   TextField,
// // // //   Button,
// // // //   MenuItem,
// // // //   Alert,
// // // //   CircularProgress,
// // // //   Divider,
// // // //   Container,
// // // //   Fade,
// // // // } from '@mui/material';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { useFormik } from 'formik';
// // // // import * as Yup from 'yup';
// // // // import { adminService } from '../../services/admin';
// // // // import { BUSINESS_STATUS } from '../../utils/constants';
// // // // import BusinessIcon from '@mui/icons-material/Business';
// // // // import EmailIcon from '@mui/icons-material/Email';
// // // // import CategoryIcon from '@mui/icons-material/Category';
// // // // import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// // // // const validationSchema = Yup.object({
// // // //   businessName: Yup.string()
// // // //     .required('Business name is required')
// // // //     .min(2, 'Business name must be at least 2 characters')
// // // //     .max(100, 'Business name must be less than 100 characters'),
// // // //   industry: Yup.string()
// // // //     .required('Industry is required')
// // // //     .min(2, 'Industry must be at least 2 characters')
// // // //     .max(50, 'Industry must be less than 50 characters'),
// // // //   contactEmail: Yup.string()
// // // //     .required('Contact email is required')
// // // //     .email('Invalid email format'),
// // // //   accountStatus: Yup.string()
// // // //     .required('accountStatus is required')
// // // //     .oneOf(Object.values(BUSINESS_STATUS)),
// // // // });

// // // // const CreateBusiness = ({ business, isEditMode = false, onSuccess }) => {
// // // //   const navigate = useNavigate();
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [error, setError] = useState('');

// // // //   const formik = useFormik({
// // // //     initialValues: {
// // // //       businessName: business?.businessName || '',
// // // //       industry: business?.industry || '',
// // // //       contactEmail: business?.contactEmail || '',
// // // //       accountStatus: business?.accountStatus || BUSINESS_STATUS.ACTIVE,
// // // //     },
// // // //     validationSchema,
// // // //     onSubmit: async (values) => {
// // // //       try {
// // // //         setLoading(true);
// // // //         setError('');

// // // //         if (isEditMode && business) {
// // // //           await adminService.updateBusiness(business.tenantId, values);
// // // //         } else {
// // // //           await adminService.createBusiness(values);
// // // //         }

// // // //         if (onSuccess) {
// // // //           onSuccess();
// // // //         } else {
// // // //           navigate('/admin/businesses');
// // // //         }
// // // //       } catch (err) {
// // // //         setError(err.response?.data?.error || err.message || 
// // // //           `Failed to ${isEditMode ? 'update' : 'create'} business`);
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     },
// // // //     enableReinitialize: true,
// // // //   });

// // // //   const industries = [
// // // //     'Technology',
// // // //     'Finance',
// // // //     'Healthcare',
// // // //     'Retail',
// // // //     'Education',
// // // //     'Manufacturing',
// // // //     'Real Estate',
// // // //     'Hospitality',
// // // //     'Transportation',
// // // //     'Other',
// // // //   ];

// // // //   // Header content based on mode
// // // //   const headerTitle = isEditMode ? 'Edit Business' : 'Create New Business';
// // // //   const headerDescription = isEditMode 
// // // //     ? 'Update business information and accountStatus'
// // // //     : 'Onboard a new business tenant to the platform by providing the essential details below';
// // // //   const headerGradient = isEditMode 
// // // //     ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
// // // //     : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';

// // // //   return (
// // // //     <Box
// // // //       sx={{
// // // //         minHeight: '100vh',
// // // //         backgroundColor: '#f8fafc',
// // // //         py: 6,
// // // //       }}
// // // //     >
// // // //       <Container maxWidth="md">
// // // //         <Fade in timeout={600}>
// // // //           <Paper
// // // //             elevation={2}
// // // //             sx={{
// // // //               borderRadius: 3,
// // // //               overflow: 'hidden',
// // // //               backgroundColor: 'white',
// // // //               border: `1px solid ${isEditMode ? 'rgba(245, 158, 11, 0.1)' : 'rgba(59, 130, 246, 0.1)'}`,
// // // //               boxShadow: `0 4px 20px ${isEditMode ? 'rgba(245, 158, 11, 0.08)' : 'rgba(59, 130, 246, 0.08)'}`,
// // // //             }}
// // // //           >
// // // //             {/* Header Section */}
// // // //             <Box
// // // //               sx={{
// // // //                 background: headerGradient,
// // // //                 p: 4,
// // // //                 color: 'white',
// // // //                 textAlign: 'center',
// // // //               }}
// // // //             >
// // // //               <BusinessIcon sx={{ fontSize: 48, mb: 1, opacity: 0.9 }} />
// // // //               <Typography variant="h4" fontWeight={600} gutterBottom>
// // // //                 {headerTitle}
// // // //               </Typography>
// // // //               <Typography variant="body1" sx={{ opacity: 0.95, maxWidth: 500, mx: 'auto' }}>
// // // //                 {headerDescription}
// // // //               </Typography>
// // // //             </Box>

// // // //             {/* Form Section */}
// // // //             <Box sx={{ p: 5 }}>
// // // //               {error && (
// // // //                 <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
// // // //                   {error}
// // // //                 </Alert>
// // // //               )}

// // // //               <Box sx={{ maxWidth: 600, mx: 'auto' }}>
// // // //                 <form onSubmit={formik.handleSubmit}>
// // // //                   <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
// // // //                     {/* Business Name */}
// // // //                     <Box>
// // // //                       <Typography
// // // //                         variant="subtitle2"
// // // //                         color="text.secondary"
// // // //                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
// // // //                       >
// // // //                         <BusinessIcon fontSize="small" sx={{ color: isEditMode ? '#f59e0b' : '#3b82f6' }} />
// // // //                         Business Information
// // // //                       </Typography>
// // // //                       <TextField
// // // //                         fullWidth
// // // //                         id="businessName"
// // // //                         name="businessName"
// // // //                         label="Business Name"
// // // //                         placeholder="Enter the official business name"
// // // //                         value={formik.values.businessName}
// // // //                         onChange={formik.handleChange}
// // // //                         onBlur={formik.handleBlur}
// // // //                         error={formik.touched.businessName && Boolean(formik.errors.businessName)}
// // // //                         helperText={formik.touched.businessName && formik.errors.businessName}
// // // //                         disabled={loading}
// // // //                         sx={{
// // // //                           '& .MuiOutlinedInput-root': {
// // // //                             borderRadius: 2,
// // // //                             backgroundColor: 'white',
// // // //                           },
// // // //                           '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
// // // //                             borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
// // // //                           },
// // // //                           '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
// // // //                             borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
// // // //                           },
// // // //                         }}
// // // //                       />
// // // //                     </Box>

// // // //                     {/* Industry */}
// // // //                     <Box>
// // // //                       <Typography
// // // //                         variant="subtitle2"
// // // //                         color="text.secondary"
// // // //                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
// // // //                       >
// // // //                         <CategoryIcon fontSize="small" sx={{ color: isEditMode ? '#f59e0b' : '#3b82f6' }} />
// // // //                         Industry
// // // //                       </Typography>
// // // //                       <TextField
// // // //                         fullWidth
// // // //                         select
// // // //                         id="industry"
// // // //                         name="industry"
// // // //                         label="Select Industry"
// // // //                         value={formik.values.industry}
// // // //                         onChange={formik.handleChange}
// // // //                         onBlur={formik.handleBlur}
// // // //                         error={formik.touched.industry && Boolean(formik.errors.industry)}
// // // //                         helperText={formik.touched.industry && formik.errors.industry}
// // // //                         disabled={loading}
// // // //                         sx={{
// // // //                           '& .MuiOutlinedInput-root': {
// // // //                             borderRadius: 2,
// // // //                             backgroundColor: 'white',
// // // //                           },
// // // //                           '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
// // // //                             borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
// // // //                           },
// // // //                           '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
// // // //                             borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
// // // //                           },
// // // //                         }}
// // // //                       >
// // // //                         <MenuItem value="">
// // // //                           <em>Choose an industry</em>
// // // //                         </MenuItem>
// // // //                         {industries.map((industry) => (
// // // //                           <MenuItem key={industry} value={industry}>
// // // //                             {industry}
// // // //                           </MenuItem>
// // // //                         ))}
// // // //                       </TextField>
// // // //                     </Box>

// // // //                     {/* accountStatus */}
// // // //                     <Box>
// // // //                       <Typography
// // // //                         variant="subtitle2"
// // // //                         color="text.secondary"
// // // //                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
// // // //                       >
// // // //                         <CheckCircleIcon fontSize="small" sx={{ color: isEditMode ? '#f59e0b' : '#3b82f6' }} />
// // // //                         accountStatus
// // // //                       </Typography>
// // // //                       <TextField
// // // //                         fullWidth
// // // //                         select
// // // //                         id="accountStatus"
// // // //                         name="accountStatus"
// // // //                         label="Account accountStatus"
// // // //                         value={formik.values.accountStatus}
// // // //                         onChange={formik.handleChange}
// // // //                         onBlur={formik.handleBlur}
// // // //                         error={formik.touched.accountStatus && Boolean(formik.errors.accountStatus)}
// // // //                         helperText={formik.touched.accountStatus && formik.errors.accountStatus}
// // // //                         disabled={loading}
// // // //                         sx={{
// // // //                           '& .MuiOutlinedInput-root': {
// // // //                             borderRadius: 2,
// // // //                             backgroundColor: 'white',
// // // //                           },
// // // //                           '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
// // // //                             borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
// // // //                           },
// // // //                           '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
// // // //                             borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
// // // //                           },
// // // //                         }}
// // // //                       >
// // // //                         {Object.values(BUSINESS_STATUS).map((accountStatus) => (
// // // //                           <MenuItem key={accountStatus} value={accountStatus}>
// // // //                             {accountStatus}
// // // //                           </MenuItem>
// // // //                         ))}
// // // //                       </TextField>
// // // //                     </Box>

// // // //                     {/* Contact Email */}
// // // //                     <Box>
// // // //                       <Typography
// // // //                         variant="subtitle2"
// // // //                         color="text.secondary"
// // // //                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
// // // //                       >
// // // //                         <EmailIcon fontSize="small" sx={{ color: isEditMode ? '#f59e0b' : '#3b82f6' }} />
// // // //                         Contact Information
// // // //                       </Typography>
// // // //                       <TextField
// // // //                         fullWidth
// // // //                         id="contactEmail"
// // // //                         name="contactEmail"
// // // //                         label="Contact Email"
// // // //                         type="email"
// // // //                         placeholder="business@example.com"
// // // //                         value={formik.values.contactEmail}
// // // //                         onChange={formik.handleChange}
// // // //                         onBlur={formik.handleBlur}
// // // //                         error={formik.touched.contactEmail && Boolean(formik.errors.contactEmail)}
// // // //                         helperText={formik.touched.contactEmail && formik.errors.contactEmail}
// // // //                         disabled={loading}
// // // //                         sx={{
// // // //                           '& .MuiOutlinedInput-root': {
// // // //                             borderRadius: 2,
// // // //                             backgroundColor: 'white',
// // // //                           },
// // // //                           '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
// // // //                             borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
// // // //                           },
// // // //                           '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
// // // //                             borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
// // // //                           },
// // // //                         }}
// // // //                       />
// // // //                     </Box>

// // // //                     <Divider sx={{ my: 2 }} />

// // // //                     {/* Action Buttons */}
// // // //                     <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
// // // //                       <Button
// // // //                         variant="outlined"
// // // //                         onClick={() => navigate('/admin/businesses')}
// // // //                         disabled={loading}
// // // //                         size="large"
// // // //                         sx={{
// // // //                           borderRadius: 2,
// // // //                           px: 4,
// // // //                           textTransform: 'none',
// // // //                           fontWeight: 600,
// // // //                           borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
// // // //                           color: isEditMode ? '#f59e0b' : '#3b82f6',
// // // //                           '&:hover': {
// // // //                             borderColor: isEditMode ? '#d97706' : '#1d4ed8',
// // // //                             backgroundColor: isEditMode ? 'rgba(245, 158, 11, 0.04)' : 'rgba(59, 130, 246, 0.04)',
// // // //                           },
// // // //                         }}
// // // //                       >
// // // //                         Cancel
// // // //                       </Button>
// // // //                       <Button
// // // //                         type="submit"
// // // //                         variant="contained"
// // // //                         disabled={loading || !formik.isValid}
// // // //                         startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
// // // //                         size="large"
// // // //                         sx={{
// // // //                           borderRadius: 2,
// // // //                           px: 4,
// // // //                           textTransform: 'none',
// // // //                           fontWeight: 600,
// // // //                           background: isEditMode 
// // // //                             ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
// // // //                             : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
// // // //                           boxShadow: isEditMode 
// // // //                             ? '0 4px 12px rgba(245, 158, 11, 0.3)'
// // // //                             : '0 4px 12px rgba(59, 130, 246, 0.3)',
// // // //                           '&:hover': {
// // // //                             boxShadow: isEditMode 
// // // //                               ? '0 6px 16px rgba(245, 158, 11, 0.4)'
// // // //                               : '0 6px 16px rgba(59, 130, 246, 0.4)',
// // // //                             background: isEditMode 
// // // //                               ? 'linear-gradient(135deg, #eab308 0%, #b45309 100%)'
// // // //                               : 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
// // // //                           },
// // // //                           '&:disabled': {
// // // //                             background: 'rgba(0, 0, 0, 0.12)',
// // // //                           },
// // // //                         }}
// // // //                       >
// // // //                         {loading 
// // // //                           ? (isEditMode ? 'Updating Business...' : 'Creating Business...')
// // // //                           : (isEditMode ? 'Update Business' : 'Create Business')
// // // //                         }
// // // //                       </Button>
// // // //                     </Box>
// // // //                   </Box>
// // // //                 </form>
// // // //               </Box>
// // // //             </Box>
// // // //           </Paper>
// // // //         </Fade>
// // // //       </Container>
// // // //     </Box>
// // // //   );
// // // // };

// // // // export default CreateBusiness;
// // // src/components/admin/CreateBusiness.jsx
// // // import React, { useState, useEffect } from 'react';
// // // import {
// // //   Box,
// // //   Paper,
// // //   Typography,
// // //   TextField,
// // //   Button,
// // //   MenuItem,
// // //   Alert,
// // //   CircularProgress,
// // //   Divider,
// // //   Container,
// // //   Fade,
// // //   FormControl,
// // //   InputLabel,
// // //   Select,
// // //   FormHelperText,
// // // } from '@mui/material';
// // // import { useNavigate } from 'react-router-dom';
// // // import { useFormik } from 'formik';
// // // import * as Yup from 'yup';
// // // import { adminService } from '../../services/admin';
// // // import { BUSINESS_STATUS } from '../../utils/constants';
// // // import BusinessIcon from '@mui/icons-material/Business';
// // // import EmailIcon from '@mui/icons-material/Email';
// // // import CategoryIcon from '@mui/icons-material/Category';
// // // import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// // // import SaveIcon from '@mui/icons-material/Save';

// // // const validationSchema = Yup.object({
// // //   businessName: Yup.string()
// // //     .required('Business name is required')
// // //     .min(2, 'Business name must be at least 2 characters')
// // //     .max(100, 'Business name must be less than 100 characters'),
// // //   industry: Yup.string()
// // //     .required('Industry is required')
// // //     .min(2, 'Industry must be at least 2 characters')
// // //     .max(50, 'Industry must be less than 50 characters'),
// // //   contactEmail: Yup.string()
// // //     .required('Contact email is required')
// // //     .email('Invalid email format'),
// // //   accountStatus: Yup.string()
// // //     .required('accountStatus is required')
// // //     .oneOf(Object.values(BUSINESS_STATUS)),
// // // });

// // // const CreateBusiness = ({ business, isEditMode = false, onSuccess }) => {
// // //   const navigate = useNavigate();
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState('');
// // //   const [initialValues, setInitialValues] = useState({
// // //     businessName: '',
// // //     industry: '',
// // //     contactEmail: '',
// // //     accountStatus: BUSINESS_STATUS.ACTIVE,
// // //   });

// // //   // Load business data if in edit mode
// // //   useEffect(() => {
// // //     if (business && isEditMode) {
// // //       setInitialValues({
// // //         businessName: business.businessName || '',
// // //         industry: business.industry || '',
// // //         contactEmail: business.contactEmail || '',
// // //         accountStatus: business.accountStatus || BUSINESS_STATUS.ACTIVE,
// // //       });
// // //     }
// // //   }, [business, isEditMode]);

// // //   const formik = useFormik({
// // //     initialValues,
// // //     enableReinitialize: true,
// // //     validationSchema,
// // //     onSubmit: async (values) => {
// // //       try {
// // //         setLoading(true);
// // //         setError('');

// // //         if (isEditMode && business) {
// // //           // Update existing business
// // //           await adminService.updateBusiness(business.tenantId, values);
// // //         } else {
// // //           // Create new business
// // //           await adminService.createBusiness(values);
// // //         }

// // //         if (onSuccess) {
// // //           onSuccess();
// // //         } else {
// // //           navigate('/admin/businesses');
// // //         }
// // //       } catch (err) {
// // //         setError(err.response?.data?.error || err.message || 
// // //           `Failed to ${isEditMode ? 'update' : 'create'} business`);
// // //         console.error('Error saving business:', err);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     },
// // //   });

// // //   const industries = [
// // //     'Technology',
// // //     'Finance',
// // //     'Healthcare',
// // //     'Retail',
// // //     'Education',
// // //     'Manufacturing',
// // //     'Real Estate',
// // //     'Hospitality',
// // //     'Transportation',
// // //     'Other',
// // //   ];

// // //   const headerTitle = isEditMode ? 'Edit Business' : 'Create New Business';
// // //   const headerDescription = isEditMode 
// // //     ? 'Update business information and accountStatus'
// // //     : 'Onboard a new business tenant to the platform by providing the essential details below';
// // //   const headerGradient = isEditMode 
// // //     ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
// // //     : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';

// // //   return (
// // //     <Box
// // //       sx={{
// // //         minHeight: '100vh',
// // //         backgroundColor: '#f8fafc',
// // //         py: 6,
// // //       }}
// // //     >
// // //       <Container maxWidth="md">
// // //         <Fade in timeout={600}>
// // //           <Paper
// // //             elevation={2}
// // //             sx={{
// // //               borderRadius: 3,
// // //               overflow: 'hidden',
// // //               backgroundColor: 'white',
// // //               border: '1px solid rgba(59, 130, 246, 0.1)',
// // //               boxShadow: '0 4px 20px rgba(59, 130, 246, 0.08)',
// // //             }}
// // //           >CreateBusiness.jsx
// // //             {/* Header Section */}
// // //             <Box
// // //               sx={{
// // //                 background: headerGradient,
// // //                 p: 4,
// // //                 color: 'white',
// // //                 textAlign: 'center',
// // //               }}
// // //             >
// // //               <BusinessIcon sx={{ fontSize: 48, mb: 1, opacity: 0.9 }} />
// // //               <Typography variant="h4" fontWeight={600} gutterBottom>
// // //                 {headerTitle}
// // //               </Typography>
// // //               <Typography variant="body1" sx={{ opacity: 0.95, maxWidth: 500, mx: 'auto' }}>
// // //                 {headerDescription}
// // //               </Typography>
// // //             </Box>

// // //             {/* Form Section */}
// // //             <Box sx={{ p: 5 }}>
// // //               {error && (
// // //                 <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
// // //                   {error}
// // //                 </Alert>
// // //               )}

// // //               <Box sx={{ maxWidth: 600, mx: 'auto' }}>
// // //                 <form onSubmit={formik.handleSubmit}>
// // //                   <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
// // //                     {/* Business Name */}
// // //                     <Box>
// // //                       <Typography
// // //                         variant="subtitle2"
// // //                         color="text.secondary"
// // //                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
// // //                       >
// // //                         <BusinessIcon fontSize="small" sx={{ color: isEditMode ? '#f59e0b' : '#3b82f6' }} />
// // //                         Business Information
// // //                       </Typography>
// // //                       <TextField
// // //                         fullWidth
// // //                         id="businessName"
// // //                         name="businessName"
// // //                         label="Business Name"
// // //                         placeholder="Enter the official business name"
// // //                         value={formik.values.businessName}
// // //                         onChange={formik.handleChange}
// // //                         onBlur={formik.handleBlur}
// // //                         error={formik.touched.businessName && Boolean(formik.errors.businessName)}
// // //                         helperText={formik.touched.businessName && formik.errors.businessName}
// // //                         disabled={loading}
// // //                         sx={{
// // //                           '& .MuiOutlinedInput-root': {
// // //                             borderRadius: 2,
// // //                             backgroundColor: 'white',
// // //                           },
// // //                           '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
// // //                             borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
// // //                           },
// // //                           '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
// // //                             borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
// // //                           },
// // //                         }}
// // //                       />
// // //                     </Box>

// // //                     {/* Industry */}
// // //                     <Box>
// // //                       <Typography
// // //                         variant="subtitle2"
// // //                         color="text.secondary"
// // //                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
// // //                       >
// // //                         <CategoryIcon fontSize="small" sx={{ color: isEditMode ? '#f59e0b' : '#3b82f6' }} />
// // //                         Industry
// // //                       </Typography>
// // //                       <TextField
// // //                         fullWidth
// // //                         select
// // //                         id="industry"
// // //                         name="industry"
// // //                         label="Select Industry"
// // //                         value={formik.values.industry}
// // //                         onChange={formik.handleChange}
// // //                         onBlur={formik.handleBlur}
// // //                         error={formik.touched.industry && Boolean(formik.errors.industry)}
// // //                         helperText={formik.touched.industry && formik.errors.industry}
// // //                         disabled={loading}
// // //                         sx={{
// // //                           '& .MuiOutlinedInput-root': {
// // //                             borderRadius: 2,
// // //                             backgroundColor: 'white',
// // //                           },
// // //                           '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
// // //                             borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
// // //                           },
// // //                           '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
// // //                             borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
// // //                           },
// // //                         }}
// // //                       >
// // //                         <MenuItem value="">
// // //                           <em>Choose an industry</em>
// // //                         </MenuItem>
// // //                         {industries.map((industry) => (
// // //                           <MenuItem key={industry} value={industry}>
// // //                             {industry}
// // //                           </MenuItem>
// // //                         ))}
// // //                       </TextField>
// // //                     </Box>

// // //                     {/* accountStatus - Show in both create and edit, but with different default */}
// // //                     <Box>
// // //                       <Typography
// // //                         variant="subtitle2"
// // //                         color="text.secondary"
// // //                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
// // //                       >
// // //                         <CheckCircleIcon fontSize="small" sx={{ color: isEditMode ? '#f59e0b' : '#3b82f6' }} />
// // //                         accountStatus
// // //                       </Typography>
// // //                       <FormControl fullWidth error={formik.touched.accountStatus && Boolean(formik.errors.accountStatus)}>
// // //                         <InputLabel>Account accountStatus</InputLabel>
// // //                         <Select
// // //                           name="accountStatus"
// // //                           value={formik.values.accountStatus}
// // //                           onChange={formik.handleChange}
// // //                           onBlur={formik.handleBlur}
// // //                           label="Account accountStatus"
// // //                           disabled={loading}
// // //                         >
// // //                           {Object.values(BUSINESS_STATUS).map((accountStatus) => (
// // //                             <MenuItem key={accountStatus} value={accountStatus}>
// // //                               {accountStatus}
// // //                             </MenuItem>
// // //                           ))}
// // //                         </Select>
// // //                         {formik.touched.accountStatus && formik.errors.accountStatus ? (
// // //                           <FormHelperText error>{formik.errors.accountStatus}</FormHelperText>
// // //                         ) : (
// // //                           <FormHelperText>
// // //                             {isEditMode ? 'Change business accountStatus to activate/deactivate' : 'Set initial business accountStatus'}
// // //                           </FormHelperText>
// // //                         )}
// // //                       </FormControl>
// // //                     </Box>

// // //                     {/* Contact Email */}
// // //                     <Box>
// // //                       <Typography
// // //                         variant="subtitle2"
// // //                         color="text.secondary"
// // //                         sx={{ mb: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
// // //                       >
// // //                         <EmailIcon fontSize="small" sx={{ color: isEditMode ? '#f59e0b' : '#3b82f6' }} />
// // //                         Contact Information
// // //                       </Typography>
// // //                       <TextField
// // //                         fullWidth
// // //                         id="contactEmail"
// // //                         name="contactEmail"
// // //                         label="Contact Email"
// // //                         type="email"
// // //                         placeholder="business@example.com"
// // //                         value={formik.values.contactEmail}
// // //                         onChange={formik.handleChange}
// // //                         onBlur={formik.handleBlur}
// // //                         error={formik.touched.contactEmail && Boolean(formik.errors.contactEmail)}
// // //                         helperText={formik.touched.contactEmail && formik.errors.contactEmail}
// // //                         disabled={loading}
// // //                         sx={{
// // //                           '& .MuiOutlinedInput-root': {
// // //                             borderRadius: 2,
// // //                             backgroundColor: 'white',
// // //                           },
// // //                           '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
// // //                             borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
// // //                           },
// // //                           '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
// // //                             borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
// // //                           },
// // //                         }}
// // //                       />
// // //                     </Box>

// // //                     <Divider sx={{ my: 2 }} />

// // //                     {/* Action Buttons */}
// // //                     <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
// // //                       <Button
// // //                         variant="outlined"
// // //                         onClick={() => navigate('/admin/businesses')}
// // //                         disabled={loading}
// // //                         size="large"
// // //                         sx={{
// // //                           borderRadius: 2,
// // //                           px: 4,
// // //                           textTransform: 'none',
// // //                           fontWeight: 600,
// // //                           borderColor: isEditMode ? '#f59e0b' : '#3b82f6',
// // //                           color: isEditMode ? '#f59e0b' : '#3b82f6',
// // //                           '&:hover': {
// // //                             borderColor: isEditMode ? '#d97706' : '#1d4ed8',
// // //                             backgroundColor: isEditMode ? 'rgba(245, 158, 11, 0.04)' : 'rgba(59, 130, 246, 0.04)',
// // //                           },
// // //                         }}
// // //                       >
// // //                         Cancel
// // //                       </Button>
// // //                       <Button
// // //                         type="submit"
// // //                         variant="contained"
// // //                         disabled={loading || !formik.isValid}
// // //                         startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
// // //                         size="large"
// // //                         sx={{
// // //                           borderRadius: 2,
// // //                           px: 4,
// // //                           textTransform: 'none',
// // //                           fontWeight: 600,
// // //                           background: isEditMode 
// // //                             ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
// // //                             : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
// // //                           boxShadow: isEditMode 
// // //                             ? '0 4px 12px rgba(245, 158, 11, 0.3)'
// // //                             : '0 4px 12px rgba(59, 130, 246, 0.3)',
// // //                           '&:hover': {
// // //                             boxShadow: isEditMode 
// // //                               ? '0 6px 16px rgba(245, 158, 11, 0.4)'
// // //                               : '0 6px 16px rgba(59, 130, 246, 0.4)',
// // //                             background: isEditMode 
// // //                               ? 'linear-gradient(135deg, #e78b0b 0%, #b45309 100%)'
// // //                               : 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
// // //                           },
// // //                           '&:disabled': {
// // //                             background: 'rgba(0, 0, 0, 0.12)',
// // //                           },
// // //                         }}
// // //                       >
// // //                         {loading 
// // //                           ? (isEditMode ? 'Updating...' : 'Creating...')
// // //                           : (isEditMode ? 'Update Business' : 'Create Business')
// // //                         }
// // //                       </Button>
// // //                     </Box>
// // //                   </Box>
// // //                 </form>
// // //               </Box>
// // //             </Box>
// // //           </Paper>
// // //         </Fade>
// // //       </Container>
// // //     </Box>
// // //   );
// // // };

// // // // export default CreateBusiness;
// // // import React, { useState, useEffect } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { useFormik } from 'formik';
// // // import * as Yup from 'yup';
// // // import { adminService } from '../../services/admin';
// // // import { BUSINESS_STATUS } from '../../utils/constants';

// // // const validationSchema = Yup.object({
// // //   businessName: Yup.string()
// // //     .required('Business name is required')
// // //     .min(2, 'Business name must be at least 2 characters')
// // //     .max(100, 'Business name must be less than 100 characters'),

// // //   industry: Yup.string()
// // //     .required('Industry is required')
// // //     .min(2, 'Industry must be at least 2 characters')
// // //     .max(50, 'Industry must be less than 50 characters'),

// // //   contactEmail: Yup.string()
// // //     .required('Contact email is required')
// // //     .email('Invalid email format'),

// // //   emergencyContactNo: Yup.string()
// // //     .required('Emergency contact number is required')
// // //     .matches(/^[0-9]+$/, 'Only digits allowed')
// // //     .min(7, 'Must be at least 7 digits')
// // //     .max(15, 'Must be at most 15 digits'),

// // //   websiteUrl: Yup.string()
// // //     .required('Website URL is required')
// // //     .url('Invalid website URL'),

// // //   accountStatus: Yup.string()
// // //     .required('accountStatus is required')
// // //     .oneOf(Object.values(BUSINESS_STATUS)),
// // // });

// // // const CreateBusiness = ({ business, isEditMode = false, onSuccess }) => {
// // //   const navigate = useNavigate();
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState('');
// // //   const [success, setSuccess] = useState('');

// // //   const formik = useFormik({
// // //     initialValues: {
// // //       businessName: business?.businessName || '',
// // //       industry: business?.industry || '',
// // //       contactEmail: business?.contactEmail || '',
// // //       emergencyContactNo: business?.emergencyContactNo || '',
// // //       websiteUrl: business?.websiteUrl || '',
// // //       accountStatus: business?.accountStatus || BUSINESS_STATUS.ACTIVE,
// // //     },
// // //     enableReinitialize: true,
// // //     validationSchema,
// // //     onSubmit: async (values) => {
// // //       try {
// // //         setLoading(true);
// // //         setError('');
// // //         setSuccess('');

// // //         if (isEditMode && business) {
// // //           await adminService.updateBusiness(business.tenantId, values);
// // //           setSuccess('Business updated successfully!');
// // //         } else {
// // //           await adminService.createBusiness(values);
// // //           setSuccess('Business created successfully!');
// // //         }

// // //         setTimeout(() => {
// // //           onSuccess ? onSuccess() : navigate('/admin/businesses');
// // //         }, 1500);
// // //       } catch (err) {
// // //         setError(
// // //           err.response?.data?.error ||
// // //           err.message ||
// // //           `Failed to ${isEditMode ? 'update' : 'create'} business`
// // //         );
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     },
// // //   });

// // //   const industries = [
// // //     'Technology',
// // //     'Finance',
// // //     'Healthcare',
// // //     'Retail',
// // //     'Education',
// // //     'Manufacturing',
// // //     'Real Estate',
// // //     'Hospitality',
// // //     'Transportation',
// // //     'Other',
// // //   ];

// // //   return (
// // //     <div style={{ 
// // //       minHeight: '100vh', 
// // //       backgroundColor: '#f8f9fa', 
// // //       padding: '20px',
// // //       display: 'flex',
// // //       alignItems: 'center',
// // //       justifyContent: 'center'
// // //     }}>
// // //       <div style={{ 
// // //         width: '100%',
// // //         maxWidth: '800px', // Reduced from 900px
// // //         backgroundColor: '#ffffff', 
// // //         borderRadius: '8px', 
// // //         border: '1px solid #e5e7eb', 
// // //         padding: '30px',
// // //         boxSizing: 'border-box'
// // //       }}>
// // //         <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
// // //           {isEditMode ? 'Edit Business' : 'Create Business'}
// // //         </h1>

// // //         <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
// // //           {isEditMode ? 'Update business information and accountStatus' : 'Onboard a new business tenant to the platform'}
// // //         </p>

// // //         {error && (
// // //           <div style={{ padding: '12px 16px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', color: '#991b1b', fontSize: '14px', marginBottom: '20px' }}>
// // //             {error}
// // //           </div>
// // //         )}

// // //         {success && (
// // //           <div style={{ padding: '12px 16px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', color: '#166534', fontSize: '14px', marginBottom: '20px' }}>
// // //             {success}
// // //           </div>
// // //         )}

// // //         <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(); }} style={{ maxHeight: '70vh', overflowY: 'auto' }}>
// // //           <div style={{ 
// // //             display: 'flex', 
// // //             flexDirection: 'row',
// // //             flexWrap: 'wrap',
// // //             gap: '20px',
// // //             marginBottom: '24px'
// // //           }}>
// // //             {/* Left Column */}
// // //             <div style={{ 
// // //               flex: '1',
// // //               minWidth: '250px',
// // //               display: 'flex',
// // //               flexDirection: 'column',
// // //               gap: '16px'
// // //             }}>
// // //               {/* Business Name */}
// // //               <div>
// // //                 <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
// // //                   Business Name *
// // //                 </label>
// // //                 <input
// // //                   name="businessName"
// // //                   value={formik.values.businessName}
// // //                   onChange={formik.handleChange}
// // //                   onBlur={formik.handleBlur}
// // //                   disabled={loading}
// // //                   style={{
// // //                     width: '100%',
// // //                     padding: '8px 12px',
// // //                     border: `1px solid ${formik.touched.businessName && formik.errors.businessName ? '#ef4444' : '#d1d5db'}`,
// // //                     borderRadius: '6px',
// // //                     fontSize: '14px',
// // //                     boxSizing: 'border-box'
// // //                   }}
// // //                 />
// // //                 {formik.touched.businessName && formik.errors.businessName && (
// // //                   <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
// // //                     {formik.errors.businessName}
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               {/* Industry */}
// // //               <div>
// // //                 <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
// // //                   Industry *
// // //                 </label>
// // //                 <select
// // //                   name="industry"
// // //                   value={formik.values.industry}
// // //                   onChange={formik.handleChange}
// // //                   onBlur={formik.handleBlur}
// // //                   disabled={loading}
// // //                   style={{
// // //                     width: '100%',
// // //                     padding: '8px 12px',
// // //                     border: `1px solid ${formik.touched.industry && formik.errors.industry ? '#ef4444' : '#d1d5db'}`,
// // //                     borderRadius: '6px',
// // //                     fontSize: '14px',
// // //                     backgroundColor: 'white',
// // //                     boxSizing: 'border-box'
// // //                   }}
// // //                 >
// // //                   <option value="">Choose an industry</option>
// // //                   {industries.map((industry) => (
// // //                     <option key={industry} value={industry}>{industry}</option>
// // //                   ))}
// // //                 </select>
// // //                 {formik.touched.industry && formik.errors.industry && (
// // //                   <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
// // //                     {formik.errors.industry}
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               {/* Contact Email */}
// // //               <div>
// // //                 <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
// // //                   Contact Email *
// // //                 </label>
// // //                 <input
// // //                   type="email"
// // //                   name="contactEmail"
// // //                   value={formik.values.contactEmail}
// // //                   onChange={formik.handleChange}
// // //                   onBlur={formik.handleBlur}
// // //                   disabled={loading}
// // //                   style={{
// // //                     width: '100%',
// // //                     padding: '8px 12px',
// // //                     border: `1px solid ${formik.touched.contactEmail && formik.errors.contactEmail ? '#ef4444' : '#d1d5db'}`,
// // //                     borderRadius: '6px',
// // //                     fontSize: '14px',
// // //                     boxSizing: 'border-box'
// // //                   }}
// // //                 />
// // //                 {formik.touched.contactEmail && formik.errors.contactEmail && (
// // //                   <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
// // //                     {formik.errors.contactEmail}
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </div>

// // //             {/* Right Column */}
// // //             <div style={{ 
// // //               flex: '1',
// // //               minWidth: '250px',
// // //               display: 'flex',
// // //               flexDirection: 'column',
// // //               gap: '16px'
// // //             }}>
// // //               {/* Emergency Contact No */}
// // //               <div>
// // //                 <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
// // //                   Emergency Contact No *
// // //                 </label>
// // //                 <input
// // //                   type="text"
// // //                   name="emergencyContactNo"
// // //                   placeholder="Enter emergency contact number"
// // //                   value={formik.values.emergencyContactNo}
// // //                   onChange={formik.handleChange}
// // //                   onBlur={formik.handleBlur}
// // //                   disabled={loading}
// // //                   style={{
// // //                     width: '100%',
// // //                     padding: '8px 12px',
// // //                     border: `1px solid ${formik.touched.emergencyContactNo && formik.errors.emergencyContactNo ? '#ef4444' : '#d1d5db'}`,
// // //                     borderRadius: '6px',
// // //                     fontSize: '14px',
// // //                     boxSizing: 'border-box'
// // //                   }}
// // //                 />
// // //                 {formik.touched.emergencyContactNo && formik.errors.emergencyContactNo && (
// // //                   <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
// // //                     {formik.errors.emergencyContactNo}
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               {/* Website URL */}
// // //               <div>
// // //                 <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
// // //                   Website URL *
// // //                 </label>
// // //                 <input
// // //                   type="url"
// // //                   name="websiteUrl"
// // //                   placeholder="https://example.com"
// // //                   value={formik.values.websiteUrl}
// // //                   onChange={formik.handleChange}
// // //                   onBlur={formik.handleBlur}
// // //                   disabled={loading}
// // //                   style={{
// // //                     width: '100%',
// // //                     padding: '8px 12px',
// // //                     border: `1px solid ${formik.touched.websiteUrl && formik.errors.websiteUrl ? '#ef4444' : '#d1d5db'}`,
// // //                     borderRadius: '6px',
// // //                     fontSize: '14px',
// // //                     boxSizing: 'border-box'
// // //                   }}
// // //                 />
// // //                 {formik.touched.websiteUrl && formik.errors.websiteUrl && (
// // //                   <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
// // //                     {formik.errors.websiteUrl}
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               {/* Account Status */}
// // //               <div>
// // //                 <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
// // //                   Account Status *
// // //                 </label>
// // //                 <select
// // //                   name="accountStatus"
// // //                   value={formik.values.accountStatus}
// // //                   onChange={formik.handleChange}
// // //                   onBlur={formik.handleBlur}
// // //                   disabled={loading}
// // //                   style={{
// // //                     width: '100%',
// // //                     padding: '8px 12px',
// // //                     border: `1px solid ${formik.touched.accountStatus && formik.errors.accountStatus ? '#ef4444' : '#d1d5db'}`,
// // //                     borderRadius: '6px',
// // //                     fontSize: '14px',
// // //                     backgroundColor: 'white',
// // //                     boxSizing: 'border-box'
// // //                   }}
// // //                 >
// // //                   {Object.values(BUSINESS_STATUS).map((status) => (
// // //                     <option key={status} value={status}>{status}</option>
// // //                   ))}
// // //                 </select>
// // //                 {formik.touched.accountStatus && formik.errors.accountStatus && (
// // //                   <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
// // //                     {formik.errors.accountStatus}
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Buttons - Full width below the columns */}
// // //           <div style={{ 
// // //             display: 'flex', 
// // //             gap: '12px', 
// // //             justifyContent: 'flex-end', 
// // //             borderTop: '1px solid #e5e7eb', 
// // //             paddingTop: '24px',
// // //             marginTop: '8px'
// // //           }}>
// // //             <button 
// // //               type="button" 
// // //               onClick={() => navigate('/admin/businesses')} 
// // //               disabled={loading}
// // //               style={{
// // //                 padding: '8px 16px',
// // //                 backgroundColor: 'white',
// // //                 border: '1px solid #d1d5db',
// // //                 borderRadius: '6px',
// // //                 color: '#374151',
// // //                 cursor: 'pointer',
// // //                 fontSize: '14px',
// // //                 fontWeight: '500'
// // //               }}
// // //             >
// // //               Cancel
// // //             </button>
// // //             <button 
// // //               type="submit" 
// // //               disabled={loading || !formik.isValid}
// // //               style={{
// // //                 padding: '8px 16px',
// // //                 backgroundColor: loading || !formik.isValid ? '#9ca3af' : '#3b82f6',
// // //                 border: 'none',
// // //                 borderRadius: '6px',
// // //                 color: 'white',
// // //                 cursor: loading || !formik.isValid ? 'not-allowed' : 'pointer',
// // //                 fontSize: '14px',
// // //                 fontWeight: '500'
// // //               }}
// // //             >
// // //               {loading ? 'Processing...' : (isEditMode ? 'Update Business' : 'Create Business')}
// // //             </button>
// // //           </div>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default CreateBusiness;


// // // import React, { useState, useEffect } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { useFormik } from 'formik';
// // // import * as Yup from 'yup';
// // // import { adminService } from '../../services/admin';
// // // import { BUSINESS_STATUS } from '../../utils/constants';

// // // const validationSchema = Yup.object({
// // //   businessName: Yup.string()
// // //     .required('Business name is required')
// // //     .min(2, 'Business name must be at least 2 characters')
// // //     .max(100, 'Business name must be less than 100 characters'),

// // //   industry: Yup.string()
// // //     .required('Industry is required')
// // //     .min(2, 'Industry must be at least 2 characters')
// // //     .max(50, 'Industry must be less than 50 characters'),

// // //   contactEmail: Yup.string()
// // //     .required('Contact email is required')
// // //     .email('Invalid email format'),

// // //   emergencyContactNo: Yup.string()
// // //     .required('Emergency contact number is required')
// // //     .matches(/^[0-9]+$/, 'Only digits allowed')
// // //     .min(7, 'Must be at least 7 digits')
// // //     .max(15, 'Must be at most 15 digits'),

// // //   websiteUrl: Yup.string()
// // //     .required('Website URL is required')
// // //     .url('Invalid website URL'),

// // //   accountStatus: Yup.string()
// // //     .required('accountStatus is required')
// // //     .oneOf(Object.values(BUSINESS_STATUS)),
// // // });

// // // const CreateBusiness = ({ business, isEditMode = false, onSuccess }) => {
// // //   const navigate = useNavigate();
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState('');
// // //   const [success, setSuccess] = useState('');

// // //   const formik = useFormik({
// // //     initialValues: {
// // //       businessName: business?.businessName || '',
// // //       industry: business?.industry || '',
// // //       contactEmail: business?.contactEmail || '',
// // //       emergencyContactNo: business?.emergencyContactNo || '',
// // //       websiteUrl: business?.websiteUrl || '',
// // //       accountStatus: business?.accountStatus || BUSINESS_STATUS.ACTIVE,
// // //     },
// // //     enableReinitialize: true,
// // //     validationSchema,
// // //     onSubmit: async (values) => {
// // //       try {
// // //         setLoading(true);
// // //         setError('');
// // //         setSuccess('');

// // //         if (isEditMode && business) {
// // //           await adminService.updateBusiness(business.tenantId, values);
// // //           setSuccess('Business updated successfully!');
// // //         } else {
// // //           await adminService.createBusiness(values);
// // //           setSuccess('Business created successfully!');
// // //         }

// // //         setTimeout(() => {
// // //           onSuccess ? onSuccess() : navigate('/admin/businesses');
// // //         }, 1500);
// // //       } catch (err) {
// // //         setError(
// // //           err.response?.data?.error ||
// // //           err.message ||
// // //           `Failed to ${isEditMode ? 'update' : 'create'} business`
// // //         );
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     },
// // //   });

// // //   const industries = [
// // //     'Technology',
// // //     'Finance',
// // //     'Healthcare',
// // //     'Retail',
// // //     'Education',
// // //     'Manufacturing',
// // //     'Real Estate',
// // //     'Hospitality',
// // //     'Transportation',
// // //     'Other',
// // //   ];

// // //   return (
// // //     <div style={{ 
// // //       minHeight: '0vh', 
// // //       backgroundColor: '#f8f9fa',
// // //       display: 'flex',
// // //       alignItems: 'flex-start', // Changed from center to flex-start
// // //       justifyContent: 'center',
// // //       // padding: '20px'
// // //     }}>
// // //       <div style={{ 
// // //         width: '100%',
// // //         maxWidth: '800px',
// // //         backgroundColor: '#ffffff', 
// // //         borderRadius: '8px', 
// // //         border: '1px solid #e5e7eb', 
// // //         // padding: '24px',
// // //         boxSizing: 'border-box',
// // //         marginTop: '20px',
// // //         marginBottom: '20px'
// // //       }}>
// // //         <h1 style={{ 
// // //           fontSize: '20px', // Reduced from 24px
// // //           fontWeight: '600', 
// // //           color: '#111827', 
// // //           marginBottom: '6px' 
// // //         }}>
// // //           {isEditMode ? 'Edit Business' : 'Create Business'}
// // //         </h1>

// // //         <p style={{ 
// // //           fontSize: '13px', // Reduced from 14px
// // //           color: '#6b7280', 
// // //           marginBottom: '20px' // Reduced from 24px
// // //         }}>
// // //           {isEditMode ? 'Update business information and accountStatus' : 'Onboard a new business tenant to the platform'}
// // //         </p>

// // //         {error && (
// // //           <div style={{ 
// // //             padding: '10px 14px', // Reduced padding
// // //             backgroundColor: '#fef2f2', 
// // //             border: '1px solid #fecaca', 
// // //             borderRadius: '6px', 
// // //             color: '#991b1b', 
// // //             fontSize: '13px', 
// // //             marginBottom: '16px' // Reduced from 20px
// // //           }}>
// // //             {error}
// // //           </div>
// // //         )}

// // //         {success && (
// // //           <div style={{ 
// // //             padding: '10px 14px', // Reduced padding
// // //             backgroundColor: '#f0fdf4', 
// // //             border: '1px solid #bbf7d0', 
// // //             borderRadius: '6px', 
// // //             color: '#166534', 
// // //             fontSize: '13px', 
// // //             marginBottom: '16px' // Reduced from 20px
// // //           }}>
// // //             {success}
// // //           </div>
// // //         )}

// // //         <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(); }}>
// // //           <div style={{ 
// // //             display: 'grid',
// // //             gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
// // //             gap: '16px',
// // //             marginBottom: '20px'
// // //           }}>
// // //             {/* Business Name */}
// // //             <div>
// // //               <label style={{ 
// // //                 display: 'block', 
// // //                 marginBottom: '4px', // Reduced from 6px
// // //                 fontSize: '13px', // Reduced from 14px
// // //                 fontWeight: '500', 
// // //                 color: '#374151' 
// // //               }}>
// // //                 Business Name *
// // //               </label>
// // //               <input
// // //                 name="businessName"
// // //                 value={formik.values.businessName}
// // //                 onChange={formik.handleChange}
// // //                 onBlur={formik.handleBlur}
// // //                 disabled={loading}
// // //                 style={{
// // //                   width: '100%',
// // //                   padding: '8px 10px', // Reduced from 10px 12px
// // //                   border: `1px solid ${formik.touched.businessName && formik.errors.businessName ? '#ef4444' : '#d1d5db'}`,
// // //                   borderRadius: '6px',
// // //                   fontSize: '14px',
// // //                   boxSizing: 'border-box'
// // //                 }}
// // //               />
// // //               {formik.touched.businessName && formik.errors.businessName && (
// // //                 <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
// // //                   {formik.errors.businessName}
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* Industry */}
// // //             <div>
// // //               <label style={{ 
// // //                 display: 'block', 
// // //                 marginBottom: '4px', // Reduced from 6px
// // //                 fontSize: '13px', // Reduced from 14px
// // //                 fontWeight: '500', 
// // //                 color: '#374151' 
// // //               }}>
// // //                 Industry *
// // //               </label>
// // //               <select
// // //                 name="industry"
// // //                 value={formik.values.industry}
// // //                 onChange={formik.handleChange}
// // //                 onBlur={formik.handleBlur}
// // //                 disabled={loading}
// // //                 style={{
// // //                   width: '100%',
// // //                   padding: '8px 10px', // Reduced from 10px 12px
// // //                   border: `1px solid ${formik.touched.industry && formik.errors.industry ? '#ef4444' : '#d1d5db'}`,
// // //                   borderRadius: '6px',
// // //                   fontSize: '14px',
// // //                   backgroundColor: 'white',
// // //                   boxSizing: 'border-box'
// // //                 }}
// // //               >
// // //                 <option value="">Choose an industry</option>
// // //                 {industries.map((industry) => (
// // //                   <option key={industry} value={industry}>{industry}</option>
// // //                 ))}
// // //               </select>
// // //               {formik.touched.industry && formik.errors.industry && (
// // //                 <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
// // //                   {formik.errors.industry}
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* Contact Email */}
// // //             <div>
// // //               <label style={{ 
// // //                 display: 'block', 
// // //                 marginBottom: '4px', // Reduced from 6px
// // //                 fontSize: '13px', // Reduced from 14px
// // //                 fontWeight: '500', 
// // //                 color: '#374151' 
// // //               }}>
// // //                 Contact Email *
// // //               </label>
// // //               <input
// // //                 type="email"
// // //                 name="contactEmail"
// // //                 value={formik.values.contactEmail}
// // //                 onChange={formik.handleChange}
// // //                 onBlur={formik.handleBlur}
// // //                 disabled={loading}
// // //                 style={{
// // //                   width: '100%',
// // //                   padding: '8px 10px', // Reduced from 10px 12px
// // //                   border: `1px solid ${formik.touched.contactEmail && formik.errors.contactEmail ? '#ef4444' : '#d1d5db'}`,
// // //                   borderRadius: '6px',
// // //                   fontSize: '14px',
// // //                   boxSizing: 'border-box'
// // //                 }}
// // //               />
// // //               {formik.touched.contactEmail && formik.errors.contactEmail && (
// // //                 <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
// // //                   {formik.errors.contactEmail}
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* Emergency Contact No */}
// // //             <div>
// // //               <label style={{ 
// // //                 display: 'block', 
// // //                 marginBottom: '4px', // Reduced from 6px
// // //                 fontSize: '13px', // Reduced from 14px
// // //                 fontWeight: '500', 
// // //                 color: '#374151' 
// // //               }}>
// // //                 Emergency Contact No *
// // //               </label>
// // //               <input
// // //                 type="text"
// // //                 name="emergencyContactNo"
// // //                 placeholder="Enter emergency contact number"
// // //                 value={formik.values.emergencyContactNo}
// // //                 onChange={formik.handleChange}
// // //                 onBlur={formik.handleBlur}
// // //                 disabled={loading}
// // //                 style={{
// // //                   width: '100%',
// // //                   padding: '8px 10px', // Reduced from 10px 12px
// // //                   border: `1px solid ${formik.touched.emergencyContactNo && formik.errors.emergencyContactNo ? '#ef4444' : '#d1d5db'}`,
// // //                   borderRadius: '6px',
// // //                   fontSize: '14px',
// // //                   boxSizing: 'border-box'
// // //                 }}
// // //               />
// // //               {formik.touched.emergencyContactNo && formik.errors.emergencyContactNo && (
// // //                 <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
// // //                   {formik.errors.emergencyContactNo}
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* Website URL */}
// // //             <div>
// // //               <label style={{ 
// // //                 display: 'block', 
// // //                 marginBottom: '4px', // Reduced from 6px
// // //                 fontSize: '13px', // Reduced from 14px
// // //                 fontWeight: '500', 
// // //                 color: '#374151' 
// // //               }}>
// // //                 Website URL *
// // //               </label>
// // //               <input
// // //                 type="url"
// // //                 name="websiteUrl"
// // //                 placeholder="https://example.com"
// // //                 value={formik.values.websiteUrl}
// // //                 onChange={formik.handleChange}
// // //                 onBlur={formik.handleBlur}
// // //                 disabled={loading}
// // //                 style={{
// // //                   width: '100%',
// // //                   padding: '8px 10px', // Reduced from 10px 12px
// // //                   border: `1px solid ${formik.touched.websiteUrl && formik.errors.websiteUrl ? '#ef4444' : '#d1d5db'}`,
// // //                   borderRadius: '6px',
// // //                   fontSize: '14px',
// // //                   boxSizing: 'border-box'
// // //                 }}
// // //               />
// // //               {formik.touched.websiteUrl && formik.errors.websiteUrl && (
// // //                 <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
// // //                   {formik.errors.websiteUrl}
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* Account Status */}
// // //             <div>
// // //               <label style={{ 
// // //                 display: 'block', 
// // //                 marginBottom: '4px', // Reduced from 6px
// // //                 fontSize: '13px', // Reduced from 14px
// // //                 fontWeight: '500', 
// // //                 color: '#374151' 
// // //               }}>
// // //                 Account Status *
// // //               </label>
// // //               <select
// // //                 name="accountStatus"
// // //                 value={formik.values.accountStatus}
// // //                 onChange={formik.handleChange}
// // //                 onBlur={formik.handleBlur}
// // //                 disabled={loading}
// // //                 style={{
// // //                   width: '100%',
// // //                   padding: '8px 10px', // Reduced from 10px 12px
// // //                   border: `1px solid ${formik.touched.accountStatus && formik.errors.accountStatus ? '#ef4444' : '#d1d5db'}`,
// // //                   borderRadius: '6px',
// // //                   fontSize: '14px',
// // //                   backgroundColor: 'white',
// // //                   boxSizing: 'border-box'
// // //                 }}
// // //               >
// // //                 {Object.values(BUSINESS_STATUS).map((status) => (
// // //                   <option key={status} value={status}>{status}</option>
// // //                 ))}
// // //               </select>
// // //               {formik.touched.accountStatus && formik.errors.accountStatus && (
// // //                 <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
// // //                   {formik.errors.accountStatus}
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>

// // //           {/* Buttons */}
// // //           <div style={{ 
// // //             display: 'flex', 
// // //             gap: '10px', // Reduced from 12px
// // //             justifyContent: 'flex-end', 
// // //             borderTop: '1px solid #e5e7eb', 
// // //             paddingTop: '20px', // Reduced from 24px
// // //             marginTop: '0' // Removed margin
// // //           }}>
// // //             <button 
// // //               type="button" 
// // //               onClick={() => navigate('/admin/businesses')} 
// // //               disabled={loading}
// // //               style={{
// // //                 padding: '8px 16px',
// // //                 backgroundColor: 'white',
// // //                 border: '1px solid #d1d5db',
// // //                 borderRadius: '6px',
// // //                 color: '#374151',
// // //                 cursor: 'pointer',
// // //                 fontSize: '13px', // Reduced from 14px
// // //                 fontWeight: '500',
// // //                 minWidth: '80px'
// // //               }}
// // //             >
// // //               Cancel
// // //             </button>
// // //             <button 
// // //               type="submit" 
// // //               disabled={loading || !formik.isValid}
// // //               style={{
// // //                 padding: '8px 16px',
// // //                 backgroundColor: loading || !formik.isValid ? '#9ca3af' : '#3b82f6',
// // //                 border: 'none',
// // //                 borderRadius: '6px',
// // //                 color: 'white',
// // //                 cursor: loading || !formik.isValid ? 'not-allowed' : 'pointer',
// // //                 fontSize: '13px', // Reduced from 14px
// // //                 fontWeight: '500',
// // //                 minWidth: '140px'
// // //               }}
// // //             >
// // //               {loading ? 'Processing...' : (isEditMode ? 'Update Business' : 'Create Business')}
// // //             </button>
// // //           </div>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default CreateBusiness;





// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useFormik } from 'formik';
// // import * as Yup from 'yup';
// // import { adminService } from '../../services/admin';
// // import { BUSINESS_STATUS } from '../../utils/constants';

// // const validationSchema = Yup.object({
// //   businessName: Yup.string()
// //     .required('Business name is required')
// //     .min(2, 'Business name must be at least 2 characters')
// //     .max(100, 'Business name must be less than 100 characters'),

// //   industry: Yup.string()
// //     .required('Industry is required')
// //     .min(2, 'Industry must be at least 2 characters')
// //     .max(50, 'Industry must be less than 50 characters'),

// //   contactEmail: Yup.string()
// //     .required('Contact email is required')
// //     .email('Invalid email format'),

// //   emergencyContactNo: Yup.string()
// //     .required('Emergency contact number is required')
// //     .matches(/^[0-9]+$/, 'Only digits allowed')
// //     .min(7, 'Must be at least 7 digits')
// //     .max(15, 'Must be at most 15 digits'),

// //   websiteUrl: Yup.string()
// //     .required('Website URL is required')
// //     .url('Invalid website URL'),

// //   accountStatus: Yup.string()
// //     .required('accountStatus is required')
// //     .oneOf(Object.values(BUSINESS_STATUS)),
// // });

// // const CreateBusiness = ({ business, isEditMode = false, onSuccess }) => {
// //   const navigate = useNavigate();
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [success, setSuccess] = useState('');

// //   const formik = useFormik({
// //     initialValues: {
// //       businessName: business?.businessName || '',
// //       industry: business?.industry || '',
// //       contactEmail: business?.contactEmail || '',
// //       emergencyContactNo: business?.emergencyContactNo || '',
// //       websiteUrl: business?.websiteUrl || '',
// //       accountStatus: business?.accountStatus || BUSINESS_STATUS.ACTIVE,
// //     },
// //     enableReinitialize: true,
// //     validationSchema,
// //     onSubmit: async (values) => {
// //       try {
// //         setLoading(true);
// //         setError('');
// //         setSuccess('');

// //         if (isEditMode && business) {
// //           await adminService.updateBusiness(business.tenantId, values);
// //           setSuccess('Business updated successfully!');
// //         } else {
// //           await adminService.createBusiness(values);
// //           setSuccess('Business created successfully!');
// //         }

// //         setTimeout(() => {
// //           onSuccess ? onSuccess() : navigate('/admin/businesses');
// //         }, 1500);
// //         } catch (err) {
// //           // Just show the error message directly
// //           setError(err.message);
// //         } finally {
// //           setLoading(false);
// //         }
// //     },
// //   });

// //   const industries = [
// //     'Technology',
// //     'Finance',
// //     'Healthcare',
// //     'Retail',
// //     'Education',
// //     'Manufacturing',
// //     'Real Estate',
// //     'Hospitality',
// //     'Transportation',
// //     'Other',
// //   ];

// //   return (
// //     <div style={{ 
// //       // height: '100vh', // Changed from minHeight to height
// //       overflow: 'hidden', // Prevent scrolling
// //       backgroundColor: '#f8f9fa',
// //       display: 'flex',
// //       alignItems: 'center', // Changed back to center
// //       justifyContent: 'center',
// //       // padding: '10px',
// //       paddingTop: '10px',
// //       paddingBottom: '10px',
// //       // boxSizing: 'border-box',
// //       // backgroundColor:"#cd6719ff",
// //     }}>
// //       <div style={{ 
// //         width: '100%',
// //         maxWidth: '800px',
// //         maxHeight: '95vh', // Limit maximum height
// //         backgroundColor: '#ffffff', 
// //         borderRadius: '8px', 
// //         border: '1px solid #e5e7eb', 
// //         padding: '18px',
// //         boxSizing: 'border-box',
// //         overflow: 'hidden', // Prevent content overflow
// //         display: 'flex',
// //         flexDirection: 'column',
// //         // backgroundColor:"#2679ccff",
// //       }}>
// //         <div style={{ flexShrink: 0 }}> {/* Fixed header section */}
// //           <h1 style={{ 
// //             fontSize: '20px',
// //             fontWeight: '600', 
// //             color: '#111827', 
// //             marginBottom: '6px',
// //             lineHeight: '1.2'
// //           }}>
// //             {isEditMode ? 'Edit Business' : 'Create Business'}
// //           </h1>

// //           <p style={{ 
// //             fontSize: '13px', 
// //             color: '#6b7280', 
// //             marginBottom: '20px',
// //             lineHeight: '1.4'
// //           }}>
// //             {isEditMode ? 'Update business information and accountStatus' : 'Onboard a new business tenant to the platform'}
// //           </p>
// //         </div>

// //         {error && (
// //           <div style={{ 
// //             padding: '10px 14px',
// //             backgroundColor: '#fef2f2', 
// //             border: '1px solid #fecaca', 
// //             borderRadius: '6px', 
// //             color: '#991b1b', 
// //             fontSize: '13px', 
// //             marginBottom: '16px',
// //             flexShrink: 0
// //           }}>
// //             {error}
// //           </div>
// //         )}

// //         {success && (
// //           <div style={{ 
// //             padding: '10px 14px',
// //             backgroundColor: '#f0fdf4', 
// //             border: '1px solid #bbf7d0', 
// //             borderRadius: '6px', 
// //             color: '#166534', 
// //             fontSize: '13px', 
// //             marginBottom: '16px',
// //             flexShrink: 0
// //           }}>
// //             {success}
// //           </div>
// //         )}

// //         <div style={{ 
// //           flex: 1,
// //           overflow: 'auto', // Allow only form content to scroll if needed
// //           minHeight: 0 // Important for flex child scrolling
// //         }}>
// //           <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(); }}>
// //             <div style={{ 
// //               display: 'grid',
// //               gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
// //               gap: '16px',
// //               marginBottom: '20px'
// //             }}>
// //               {/* Business Name */}
// //               <div>
// //                 <label style={{ 
// //                   display: 'block', 
// //                   marginBottom: '4px',
// //                   fontSize: '13px',
// //                   fontWeight: '500', 
// //                   color: '#374151' 
// //                 }}>
// //                   Business Name *
// //                 </label>
// //                 <input
// //                   name="businessName"
// //                   value={formik.values.businessName}
// //                   onChange={formik.handleChange}
// //                   onBlur={formik.handleBlur}
// //                   disabled={loading}
// //                   style={{
// //                     width: '100%',
// //                     padding: '8px 10px',
// //                     border: `1px solid ${formik.touched.businessName && formik.errors.businessName ? '#ef4444' : '#d1d5db'}`,
// //                     borderRadius: '6px',
// //                     fontSize: '14px',
// //                     boxSizing: 'border-box',
// //                     outline: 'none'
// //                   }}
// //                 />
// //                 {formik.touched.businessName && formik.errors.businessName && (
// //                   <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
// //                     {formik.errors.businessName}
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Industry */}
// //               <div>
// //                 <label style={{ 
// //                   display: 'block', 
// //                   marginBottom: '4px',
// //                   fontSize: '13px',
// //                   fontWeight: '500', 
// //                   color: '#374151' 
// //                 }}>
// //                   Industry *
// //                 </label>
// //                 <select
// //                   name="industry"
// //                   value={formik.values.industry}
// //                   onChange={formik.handleChange}
// //                   onBlur={formik.handleBlur}
// //                   disabled={loading}
// //                   style={{
// //                     width: '100%',
// //                     padding: '8px 10px',
// //                     border: `1px solid ${formik.touched.industry && formik.errors.industry ? '#ef4444' : '#d1d5db'}`,
// //                     borderRadius: '6px',
// //                     fontSize: '14px',
// //                     backgroundColor: 'white',
// //                     boxSizing: 'border-box',
// //                     outline: 'none',
// //                     cursor: 'pointer'
// //                   }}
// //                 >
// //                   <option value="">Choose an industry</option>
// //                   {industries.map((industry) => (
// //                     <option key={industry} value={industry}>{industry}</option>
// //                   ))}
// //                 </select>
// //                 {formik.touched.industry && formik.errors.industry && (
// //                   <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
// //                     {formik.errors.industry}
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Contact Email */}
// //               <div>
// //                 <label style={{ 
// //                   display: 'block', 
// //                   marginBottom: '4px',
// //                   fontSize: '13px',
// //                   fontWeight: '500', 
// //                   color: '#374151' 
// //                 }}>
// //                   Contact Email *
// //                 </label>
// //                 <input
// //                   type="email"
// //                   name="contactEmail"
// //                   value={formik.values.contactEmail}
// //                   onChange={formik.handleChange}
// //                   onBlur={formik.handleBlur}
// //                   disabled={loading}
// //                   style={{
// //                     width: '100%',
// //                     padding: '8px 10px',
// //                     border: `1px solid ${formik.touched.contactEmail && formik.errors.contactEmail ? '#ef4444' : '#d1d5db'}`,
// //                     borderRadius: '6px',
// //                     fontSize: '14px',
// //                     boxSizing: 'border-box',
// //                     outline: 'none'
// //                   }}
// //                 />
// //                 {formik.touched.contactEmail && formik.errors.contactEmail && (
// //                   <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
// //                     {formik.errors.contactEmail}
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Emergency Contact No */}
// //               <div>
// //                 <label style={{ 
// //                   display: 'block', 
// //                   marginBottom: '4px',
// //                   fontSize: '13px',
// //                   fontWeight: '500', 
// //                   color: '#374151' 
// //                 }}>
// //                   Emergency Contact No *
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="emergencyContactNo"
// //                   placeholder="Enter emergency contact number"
// //                   value={formik.values.emergencyContactNo}
// //                   onChange={formik.handleChange}
// //                   onBlur={formik.handleBlur}
// //                   disabled={loading}
// //                   style={{
// //                     width: '100%',
// //                     padding: '8px 10px',
// //                     border: `1px solid ${formik.touched.emergencyContactNo && formik.errors.emergencyContactNo ? '#ef4444' : '#d1d5db'}`,
// //                     borderRadius: '6px',
// //                     fontSize: '14px',
// //                     boxSizing: 'border-box',
// //                     outline: 'none'
// //                   }}
// //                 />
// //                 {formik.touched.emergencyContactNo && formik.errors.emergencyContactNo && (
// //                   <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
// //                     {formik.errors.emergencyContactNo}
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Website URL */}
// //               <div>
// //                 <label style={{ 
// //                   display: 'block', 
// //                   marginBottom: '4px',
// //                   fontSize: '13px',
// //                   fontWeight: '500', 
// //                   color: '#374151' 
// //                 }}>
// //                   Website URL *
// //                 </label>
// //                 <input
// //                   type="url"
// //                   name="websiteUrl"
// //                   placeholder="https://example.com"
// //                   value={formik.values.websiteUrl}
// //                   onChange={formik.handleChange}
// //                   onBlur={formik.handleBlur}
// //                   disabled={loading}
// //                   style={{
// //                     width: '100%',
// //                     padding: '8px 10px',
// //                     border: `1px solid ${formik.touched.websiteUrl && formik.errors.websiteUrl ? '#ef4444' : '#d1d5db'}`,
// //                     borderRadius: '6px',
// //                     fontSize: '14px',
// //                     boxSizing: 'border-box',
// //                     outline: 'none'
// //                   }}
// //                 />
// //                 {formik.touched.websiteUrl && formik.errors.websiteUrl && (
// //                   <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
// //                     {formik.errors.websiteUrl}
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Account Status */}
// //               <div>
// //                 <label style={{ 
// //                   display: 'block', 
// //                   marginBottom: '4px',
// //                   fontSize: '13px',
// //                   fontWeight: '500', 
// //                   color: '#374151' 
// //                 }}>
// //                   Account Status *
// //                 </label>
// //                 <select
// //                   name="accountStatus"
// //                   value={formik.values.accountStatus}
// //                   onChange={formik.handleChange}
// //                   onBlur={formik.handleBlur}
// //                   disabled={loading}
// //                   style={{
// //                     width: '100%',
// //                     padding: '8px 10px',
// //                     border: `1px solid ${formik.touched.accountStatus && formik.errors.accountStatus ? '#ef4444' : '#d1d5db'}`,
// //                     borderRadius: '6px',
// //                     fontSize: '14px',
// //                     backgroundColor: 'white',
// //                     boxSizing: 'border-box',
// //                     outline: 'none',
// //                     cursor: 'pointer'
// //                   }}
// //                 >
// //                   {Object.values(BUSINESS_STATUS).map((status) => (
// //                     <option key={status} value={status}>{status}</option>
// //                   ))}
// //                 </select>
// //                 {formik.touched.accountStatus && formik.errors.accountStatus && (
// //                   <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
// //                     {formik.errors.accountStatus}
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </form>
// //         </div>

// //         {/* Buttons - Fixed at bottom */}
// //         <div style={{ 
// //           display: 'flex', 
// //           gap: '10px',
// //           justifyContent: 'flex-end', 
// //           borderTop: '1px solid #e5e7eb', 
// //           paddingTop: '20px',
// //           paddingBottom: '8px',
// //           flexShrink: 0,
// //           marginTop: 'auto' // Pushes buttons to bottom
// //         }}>
// //           <button 
// //             type="button" 
// //             onClick={() => navigate('/admin/businesses')} 
// //             disabled={loading}
// //             style={{
// //               padding: '8px 16px',
// //               backgroundColor: 'white',
// //               border: '1px solid #d1d5db',
// //               borderRadius: '6px',
// //               color: '#374151',
// //               cursor: 'pointer',
// //               fontSize: '13px',
// //               fontWeight: '500',
// //               minWidth: '80px'
// //             }}
// //           >
// //             Cancel
// //           </button>
// //           <button 
// //             type="submit" 
// //             disabled={loading || !formik.isValid}
// //             onClick={(e) => { e.preventDefault(); formik.handleSubmit(); }}
// //             style={{
// //               padding: '8px 16px',
// //               backgroundColor: loading || !formik.isValid ? '#9ca3af' : '#3b82f6',
// //               border: 'none',
// //               borderRadius: '6px',
// //               color: 'white',
// //               cursor: loading || !formik.isValid ? 'not-allowed' : 'pointer',
// //               fontSize: '13px',
// //               fontWeight: '500',
// //               minWidth: '140px'
// //             }}
// //           >
// //             {loading ? 'Processing...' : (isEditMode ? 'Update Business' : 'Create Business')}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CreateBusiness;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { adminService } from '../../services/admin';
// import { BUSINESS_STATUS } from '../../utils/constants';

// /* ---------------- VALIDATION ---------------- */
// const validationSchema = Yup.object({
//   businessName: Yup.string().required().min(2).max(100),
//   industry: Yup.string().required(),
//   contactEmail: Yup.string().email().required(),
//   emergencyContactNo: Yup.string().matches(/^[0-9]+$/).min(7).max(15).required(),
//   websiteUrl: Yup.string().url().required(),
//   accountStatus: Yup.string().required(),
// });

// const CreateBusiness = ({ business, isEditMode = false, onSuccess }) => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const formik = useFormik({
//     initialValues: {
//       businessName: business?.businessName || '',
//       industry: business?.industry || '',
//       contactEmail: business?.contactEmail || '',
//       emergencyContactNo: business?.emergencyContactNo || '',
//       websiteUrl: business?.websiteUrl || '',
//       accountStatus: business?.accountStatus || BUSINESS_STATUS.ACTIVE,
//     },
//     enableReinitialize: true,
//     validationSchema,
//     onSubmit: async (values) => {
//       try {
//         setLoading(true);
//         setError('');
//         setSuccess('');

//         isEditMode
//           ? await adminService.updateBusiness(business.tenantId, values)
//           : await adminService.createBusiness(values);

//         setSuccess(isEditMode ? 'Business updated successfully!' : 'Business created successfully!');
//         setTimeout(() => onSuccess?.(), 1200);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   const industries = [
//     'Technology', 'Finance', 'Healthcare', 'Retail',
//     'Education', 'Manufacturing', 'Real Estate',
//     'Hospitality', 'Transportation', 'Other',
//   ];

//   return (
//     <div
//       style={{
//         backgroundColor: '#f0f7ff',
//         fontFamily: "'Segoe UI','Inter',sans-serif",
//         height: '100%',
//       }}
//     >
//       {/* MAIN CONTENT */}
//       <div
//         style={{
//           marginLeft: '240px',
//           padding: '20px 28px',
//           height: '100%',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'flex-start', // ⬅ keeps card slightly left
//         }}
//       >
//         {/* HEADER */}
//         <div style={{ marginBottom: '16px' }}>
//           <h1 style={{ fontSize: '22px', fontWeight: 700, margin: 0, color: '#1a365d' }}>
//             {isEditMode ? 'Edit Business' : 'Create New Business'}
//           </h1>
//           <p style={{ fontSize: '13px', marginTop: 4, color: '#4a5568' }}>
//             {isEditMode ? 'Update business information' : 'Add a new business'}
//           </p>
//         </div>

//         {/* CARD */}
//         <div
//           style={{
//             flex: 1,
//             background: '#fff',
//             borderRadius: '12px',
//             border: '1px solid #e2e8f0',
//             display: 'flex',
//             flexDirection: 'column',
//             overflow: 'hidden',
//           }}
//         >
//           {/* STATUS */}
//           {(error || success) && (
//             <div style={{ padding: '12px 24px' }}>
//               {error && <div style={{ color: '#c53030', fontSize: 13 }}>{error}</div>}
//               {success && <div style={{ color: '#276749', fontSize: 13 }}>{success}</div>}
//             </div>
//           )}

//           {/* FORM SCROLL AREA */}
//           <div
//             style={{
//               flex: 1,
//               overflowY: 'auto',
//               padding: '16px 24px',
//             }}
//           >
//             <form onSubmit={formik.handleSubmit}>
//               <div
//                 style={{
//                   display: 'grid',
//                   gridTemplateColumns: '1fr 1fr',
//                   gap: '18px 24px',
//                 }}
//               >
//                 {/* INPUT TEMPLATE USED INLINE TO AVOID STYLE CHANGES */}
//                 {[
//                   ['Business Name', 'businessName', 'text'],
//                   ['Contact Email', 'contactEmail', 'email'],
//                   ['Emergency Contact', 'emergencyContactNo', 'text'],
//                   ['Website URL', 'websiteUrl', 'url'],
//                 ].map(([label, name, type]) => (
//                   <div key={name}>
//                     <label style={{ fontSize: 13, fontWeight: 600 }}>{label}</label>
//                     <input
//                       type={type}
//                       name={name}
//                       value={formik.values[name]}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       style={{
//                         width: '100%',
//                         marginTop: 6,
//                         padding: '9px 12px',
//                         fontSize: 14,
//                         borderRadius: 6,
//                         border: '1px solid #e2e8f0',
//                         background: '#f8fafc',
//                       }}
//                     />
//                     {formik.touched[name] && formik.errors[name] && (
//                       <div style={{ fontSize: 12, color: '#e53e3e', marginTop: 4 }}>
//                         {formik.errors[name]}
//                       </div>
//                     )}
//                   </div>
//                 ))}

//                 {/* INDUSTRY */}
//                 <div>
//                   <label style={{ fontSize: 13, fontWeight: 600 }}>Industry</label>
//                   <select
//                     name="industry"
//                     value={formik.values.industry}
//                     onChange={formik.handleChange}
//                     style={{
//                       width: '100%',
//                       marginTop: 6,
//                       padding: '9px 12px',
//                       fontSize: 14,
//                       borderRadius: 6,
//                       border: '1px solid #e2e8f0',
//                       background: '#f8fafc',
//                     }}
//                   >
//                     <option value="">Select</option>
//                     {industries.map((i) => (
//                       <option key={i}>{i}</option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* STATUS */}
//                 <div>
//                   <label style={{ fontSize: 13, fontWeight: 600 }}>Account Status</label>
//                   <select
//                     name="accountStatus"
//                     value={formik.values.accountStatus}
//                     onChange={formik.handleChange}
//                     style={{
//                       width: '100%',
//                       marginTop: 6,
//                       padding: '9px 12px',
//                       fontSize: 14,
//                       borderRadius: 6,
//                       border: '1px solid #e2e8f0',
//                       background: '#f8fafc',
//                     }}
//                   >
//                     {Object.values(BUSINESS_STATUS).map((s) => (
//                       <option key={s}>{s}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </form>
//           </div>

//           {/* FOOTER */}
//             <div
//   style={{
//     padding: '24px 30px',
//     borderTop: '1px solid #e2e8f0',
//     backgroundColor: '#f8fafc',
//     flexShrink: 0,
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   }}
// >
//   <div style={{ fontSize: '14px', color: '#718096' }}>
//     {isEditMode ? 'Update business details' : 'Create a new business account'}
//   </div>

//   <div style={{ display: 'flex', gap: '16px' }}>
//     {/* Cancel */}
//     <button
//       type="button"
//       onClick={() => navigate('/admin/businesses')}
//       disabled={loading}
//       style={{
//         padding: '12px 28px',
//         backgroundColor: 'white',
//         border: '1px solid #cbd5e0',
//         borderRadius: '8px',
//         color: '#4a5568',
//         cursor: 'pointer',
//         fontSize: '15px',
//         fontWeight: '600',
//         minWidth: '120px',
//       }}
//       onMouseEnter={(e) => {
//         e.target.style.backgroundColor = '#f7fafc';
//         e.target.style.borderColor = '#a0aec0';
//       }}
//       onMouseLeave={(e) => {
//         e.target.style.backgroundColor = 'white';
//         e.target.style.borderColor = '#cbd5e0';
//       }}
//     >
//       Cancel
//     </button>

//     {/* Submit */}
//     <button
//       type="button"
//       onClick={formik.handleSubmit}
//       disabled={loading || !formik.isValid}
//       style={{
//         padding: '12px 28px',
//         backgroundColor:
//           loading || !formik.isValid ? '#a0aec0' : '#3182ce',
//         border: 'none',
//         borderRadius: '8px',
//         color: 'white',
//         cursor:
//           loading || !formik.isValid ? 'not-allowed' : 'pointer',
//         fontSize: '15px',
//         fontWeight: '600',
//         minWidth: '180px',
//       }}
//       onMouseEnter={(e) => {
//         if (!loading && formik.isValid) {
//           e.target.style.backgroundColor = '#2c5282';
//         }
//       }}
//       onMouseLeave={(e) => {
//         if (!loading && formik.isValid) {
//           e.target.style.backgroundColor = '#3182ce';
//         }
//       }}
//     >
//       {loading
//         ? 'Processing...'
//         : isEditMode
//         ? 'Update Business'
//         : 'Create Business'}
//     </button>
//   </div>
// </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateBusiness;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { adminService } from '../../services/admin';
import { BUSINESS_STATUS } from '../../utils/constants';

/* ---------------- VALIDATION ---------------- */
const validationSchema = Yup.object({
  businessName: Yup.string().required().min(2).max(100),
  industry: Yup.string().required(),
  contactEmail: Yup.string().email().required(),
  emergencyContactNo: Yup.string().matches(/^[0-9]+$/).min(7).max(15).required(),
  websiteUrl: Yup.string().url().required(),
  accountStatus: Yup.string().required(),
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
      accountStatus: business?.accountStatus || BUSINESS_STATUS.ACTIVE,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError('');
        setSuccess('');

        isEditMode
          ? await adminService.updateBusiness(business.tenantId, values)
          : await adminService.createBusiness(values);

        setSuccess(isEditMode ? 'Business updated successfully!' : 'Business created successfully!');
        setTimeout(() => onSuccess?.(), 1200);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    },
  });

  const industries = [
    'Technology', 'Finance', 'Healthcare', 'Retail',
    'Education', 'Manufacturing', 'Real Estate',
    'Hospitality', 'Transportation', 'Other',
  ];

  const inputStyle = {
    width: '100%',
    marginTop: 6,
    padding: '9px 12px',
    fontSize: 14,
    borderRadius: 6,
    border: '1px solid #e2e8f0',
    background: '#f8fafc',
    transition: 'all 0.2s ease',
  };

  return (
    <div
      style={{
        minHeight: '100%',
        background: 'linear-gradient(135deg, #f8fbff 0%, #eef5ff 45%, #e6f0ff 100%)',
        fontFamily: "'Inter','Segoe UI',sans-serif",
      }}
    >
      <div
        style={{
          marginLeft: '120px',
          padding: '20px 28px',
          display: 'flex-start',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        {/* HEADER */}
        <div style={{ marginBottom: 16 }}>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              margin: 0,
              background: 'linear-gradient(90deg, #1a365d, #3182ce)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {isEditMode ? 'Edit Business' : 'Create New Business'}
          </h1>
          <p style={{ fontSize: 13, marginTop: 4, color: '#4a5568' }}>
            {isEditMode ? 'Update business information' : 'Add a new business'}
          </p>
        </div>

        {/* CARD */}
        <div
          style={{
            width: '100%',
            background: 'linear-gradient(180deg, #ffffff 0%, #f9fbff 100%)',
            borderRadius: 14,
            border: '1px solid rgba(49,130,206,0.15)',
            boxShadow: `
              0 10px 25px rgba(49,130,206,0.08),
              0 4px 10px rgba(0,0,0,0.04)
            `,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {(error || success) && (
            <div style={{ padding: '12px 24px' }}>
              {error && <div style={{ color: '#c53030', fontSize: 13 }}>{error}</div>}
              {success && <div style={{ color: '#276749', fontSize: 13 }}>{success}</div>}
            </div>
          )}

          {/* FORM */}
          <div style={{ padding: '16px 24px' }}>
            <form onSubmit={formik.handleSubmit}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '18px 24px',
                }}
              >
                {[
                  ['Business Name', 'businessName', 'text'],
                  ['Contact Email', 'contactEmail', 'email'],
                  ['Emergency Contact', 'emergencyContactNo', 'text'],
                  ['Website URL', 'websiteUrl', 'url'],
                ].map(([label, name, type]) => (
                  <div key={name}>
                    <label style={{ fontSize: 13, fontWeight: 600 }}>{label}</label>
                    <input
                      type={type}
                      name={name}
                      value={formik.values[name]}
                      onChange={formik.handleChange}
                      onBlur={(e) => {
                        e.target.style.boxShadow = 'none';
                        formik.handleBlur(e);
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#3182ce';
                        e.target.style.boxShadow = '0 0 0 2px rgba(49,130,206,0.15)';
                      }}
                      style={inputStyle}
                    />
                    {formik.touched[name] && formik.errors[name] && (
                      <div style={{ fontSize: 12, color: '#e53e3e', marginTop: 4 }}>
                        {formik.errors[name]}
                      </div>
                    )}
                  </div>
                ))}

                {/* INDUSTRY */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600 }}>Industry</label>
                  <select
                    name="industry"
                    value={formik.values.industry}
                    onChange={formik.handleChange}
                    style={inputStyle}
                  >
                    <option value="">Select</option>
                    {industries.map((i) => (
                      <option key={i}>{i}</option>
                    ))}
                  </select>
                </div>

                {/* STATUS */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600 }}>Account Status</label>
                  <select
                    name="accountStatus"
                    value={formik.values.accountStatus}
                    onChange={formik.handleChange}
                    style={inputStyle}
                  >
                    {Object.values(BUSINESS_STATUS).map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </form>
          </div>

          {/* FOOTER */}
          <div
            style={{
              padding: '22px 30px',
              borderTop: '1px solid #e2e8f0',
              background: 'linear-gradient(90deg, #f8fafc, #edf2f7)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: 14, color: '#718096' }}>
              {isEditMode ? 'Update business details' : 'Create a new business account'}
            </div>

            <div style={{ display: 'flex', gap: 16 }}>
              <button
                type="button"
                onClick={() => navigate('/admin/businesses')}
                disabled={loading}
                style={{
                  padding: '12px 28px',
                  background: '#fff',
                  border: '1px solid #cbd5e0',
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={formik.handleSubmit}
                disabled={loading || !formik.isValid}
                style={{
                  padding: '12px 32px',
                  background: 'linear-gradient(135deg, #3182ce, #2b6cb0)',
                  border: 'none',
                  borderRadius: 8,
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 6px 14px rgba(49,130,206,0.3)',
                }}
              >
                {loading ? 'Processing...' : isEditMode ? 'Update Business' : 'Create Business'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBusiness;
