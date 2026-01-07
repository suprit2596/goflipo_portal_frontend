// import React, { useState, useEffect } from 'react';
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
//   FormControl,
//   InputLabel,
//   Select,
//   Card,
//   CardContent,
//   Stepper,
//   Step,
//   StepLabel,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { adminService } from '../../services/admin';
// import { applicationsService, APPLICATION_TYPES, APPLICATION_TYPE_LABELS, APPLICATION_FIELDS } from '../../services/applications';

// const steps = ['Select Tenant', 'Application Details', 'Configuration'];

// const CreateApplication = () => {
//   const navigate = useNavigate();
//   const [activeStep, setActiveStep] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [businesses, setBusinesses] = useState([]);
//   const [selectedFields, setSelectedFields] = useState([]);

//   useEffect(() => {
//     fetchBusinesses();
//   }, []);

//   useEffect(() => {
//     if (formik.values.type) {
//       const fields = APPLICATION_FIELDS[formik.values.type] || [];
//       setSelectedFields(fields);
      
//       // Initialize configuration fields
//       const config = {};
//       const credentials = {};
//       fields.forEach(field => {
//         config[field.name] = '';
//         credentials[field.name] = '';
//       });
//       formik.setFieldValue('configuration', config);
//       formik.setFieldValue('credentials', credentials);
//     }
//   }, [formik.values.type]);

//   const fetchBusinesses = async () => {
//     try {
//       const data = await adminService.getAllBusinesses();
//       setBusinesses(data);
//     } catch (err) {
//       console.error('Error fetching businesses:', err);
//     }
//   };

//   const validationSchema = Yup.object({
//     tenantId: Yup.string().required('Tenant is required'),
//     name: Yup.string()
//       .required('Application name is required')
//       .min(2, 'Application name must be at least 2 characters'),
//     type: Yup.string()
//       .required('Application type is required')
//       .oneOf(Object.values(APPLICATION_TYPES)),
//     configuration: Yup.object().when('type', {
//       is: (type) => !!type,
//       then: (schema) => {
//         const objSchema = {};
//         selectedFields.forEach(field => {
//           if (field.required) {
//             objSchema[field.name] = Yup.string().required(`${field.label} is required`);
//           }
//         });
//         return Yup.object(objSchema);
//       },
//     }),
//     credentials: Yup.object(),
//   });

//   const formik = useFormik({
//     initialValues: {
//       tenantId: '',
//       name: '',
//       type: '',
//       configuration: {},
//       credentials: {},
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       try {
//         setLoading(true);
//         setError('');
//         await adminService.createApplication(values.tenantId, values);
//         navigate('/admin/businesses');
//       } catch (err) {
//         setError(err.response?.data?.error || err.message || 'Failed to create application');
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   const handleNext = () => {
//     setActiveStep((prevStep) => prevStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevStep) => prevStep - 1);
//   };

//   const handleTenantChange = (event) => {
//     formik.handleChange(event);
//   };

//   const renderStepContent = (step) => {
//     switch (step) {
//       case 0:
//         return (
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <FormControl fullWidth error={formik.touched.tenantId && Boolean(formik.errors.tenantId)}>
//                 <InputLabel>Select Tenant *</InputLabel>
//                 <Select
//                   name="tenantId"
//                   value={formik.values.tenantId}
//                   onChange={handleTenantChange}
//                   onBlur={formik.handleBlur}
//                   label="Select Tenant *"
//                 >
//                   <MenuItem value="">
//                     <em>Select a business</em>
//                   </MenuItem>
//                   {businesses.map((business) => (
//                     <MenuItem key={business.tenantId} value={business.tenantId}>
//                       {business.businessName} ({business.industry})
//                     </MenuItem>
//                   ))}
//                 </Select>
//                 {formik.touched.tenantId && formik.errors.tenantId && (
//                   <Typography variant="caption" color="error">
//                     {formik.errors.tenantId}
//                   </Typography>
//                 )}
//               </FormControl>
//             </Grid>
//           </Grid>
//         );

//       case 1:
//         return (
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 name="name"
//                 label="Application Name *"
//                 value={formik.values.name}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 error={formik.touched.name && Boolean(formik.errors.name)}
//                 helperText={formik.touched.name && formik.errors.name}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <FormControl fullWidth error={formik.touched.type && Boolean(formik.errors.type)}>
//                 <InputLabel>Application Type *</InputLabel>
//                 <Select
//                   name="type"
//                   value={formik.values.type}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   label="Application Type *"
//                 >
//                   <MenuItem value="">
//                     <em>Select type</em>
//                   </MenuItem>
//                   {Object.entries(APPLICATION_TYPE_LABELS).map(([value, label]) => (
//                     <MenuItem key={value} value={value}>
//                       {label}
//                     </MenuItem>
//                   ))}
//                 </Select>
//                 {formik.touched.type && formik.errors.type && (
//                   <Typography variant="caption" color="error">
//                     {formik.errors.type}
//                   </Typography>
//                 )}
//               </FormControl>
//             </Grid>
//           </Grid>
//         );

//       case 2:
//         return (
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom>
//                 Configuration
//               </Typography>
//               <Typography variant="body2" color="textSecondary" paragraph>
//                 Fill in the configuration details for the {APPLICATION_TYPE_LABELS[formik.values.type]}.
//               </Typography>
//             </Grid>
            
//             {selectedFields.map((field) => (
//               <Grid item xs={12} sm={6} key={field.name}>
//                 <TextField
//                   fullWidth
//                   name={`configuration.${field.name}`}
//                   label={`${field.label}${field.required ? ' *' : ''}`}
//                   type={field.type === 'password' ? 'password' : field.type === 'select' ? 'text' : 'text'}
//                   select={field.type === 'select'}
//                   value={formik.values.configuration?.[field.name] || ''}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={
//                     formik.touched.configuration?.[field.name] && 
//                     Boolean(formik.errors.configuration?.[field.name])
//                   }
//                   helperText={
//                     formik.touched.configuration?.[field.name] && 
//                     formik.errors.configuration?.[field.name]
//                   }
//                 >
//                   {field.options?.map((option) => (
//                     <MenuItem key={option} value={option}>
//                       {option}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//             ))}

//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
//                 Credentials (Encrypted)
//               </Typography>
//               <Typography variant="body2" color="textSecondary" paragraph>
//                 These credentials will be encrypted and stored securely.
//               </Typography>
//             </Grid>

//             {selectedFields.map((field) => (
//               <Grid item xs={12} sm={6} key={`cred-${field.name}`}>
//                 <TextField
//                   fullWidth
//                   name={`credentials.${field.name}`}
//                   label={`${field.label} (Credential)`}
//                   type="password"
//                   value={formik.values.credentials?.[field.name] || ''}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                 />
//               </Grid>
//             ))}
//           </Grid>
//         );

//       default:
//         return 'Unknown step';
//     }
//   };

//   const isStepValid = () => {
//     switch (activeStep) {
//       case 0:
//         return formik.values.tenantId && !formik.errors.tenantId;
//       case 1:
//         return formik.values.name && formik.values.type && 
//                !formik.errors.name && !formik.errors.type;
//       case 2:
//         return formik.isValid;
//       default:
//         return false;
//     }
//   };

//   return (
//     <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
//       <Paper sx={{ p: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           Create New Application
//         </Typography>

//         <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
//           {steps.map((label) => (
//             <Step key={label}>
//               <StepLabel>{label}</StepLabel>
//             </Step>
//           ))}
//         </Stepper>

//         {error && (
//           <Alert severity="error" sx={{ mb: 3 }}>
//             {error}
//           </Alert>
//         )}

//         <Box sx={{ mt: 2 }}>
//           {renderStepContent(activeStep)}
//         </Box>

//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
//           <Button
//             onClick={activeStep === 0 ? () => navigate('/admin/businesses') : handleBack}
//             disabled={loading}
//           >
//             {activeStep === 0 ? 'Cancel' : 'Back'}
//           </Button>

//           <Box sx={{ display: 'flex', gap: 2 }}>
//             {activeStep < steps.length - 1 ? (
//               <Button
//                 variant="contained"
//                 onClick={handleNext}
//                 disabled={!isStepValid() || loading}
//               >
//                 Next
//               </Button>
//             ) : (
//               <Button
//                 variant="contained"
//                 onClick={formik.handleSubmit}
//                 disabled={loading || !formik.isValid}
//                 startIcon={loading && <CircularProgress size={20} />}
//               >
//                 {loading ? 'Creating...' : 'Create Application'}
//               </Button>
//             )}
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default CreateApplication;


// import React, { useState, useEffect } from 'react';
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
//   FormControl,
//   InputLabel,
//   Select,
//   Stepper,
//   Step,
//   StepLabel,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { adminService } from '../../services/admin';
// import { applicationsService, APPLICATION_TYPES, APPLICATION_TYPE_LABELS, APPLICATION_FIELDS } from '../../services/applications';

// const steps = ['Select Tenant', 'Application Details', 'Configuration'];

// const CreateApplication = () => {
//   const navigate = useNavigate();
//   const [activeStep, setActiveStep] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [businesses, setBusinesses] = useState([]);
//   const [selectedFields, setSelectedFields] = useState([]);

//   // Fetch businesses on component mount
//   useEffect(() => {
//     fetchBusinesses();
//   }, []);

//   const fetchBusinesses = async () => {
//     try {
//       const data = await adminService.getAllBusinesses();
//       setBusinesses(data);
//     } catch (err) {
//       console.error('Error fetching businesses:', err);
//     }
//   };

//   // Initialize formik with validation schema
//   const formik = useFormik({
//     initialValues: {
//       tenantId: '',
//       name: '',
//       type: '',
//       configuration: {},
//       credentials: {},
//     },
//     validationSchema: Yup.object({
//       tenantId: Yup.string().required('Tenant is required'),
//       name: Yup.string()
//         .required('Application name is required')
//         .min(2, 'Application name must be at least 2 characters'),
//       type: Yup.string()
//         .required('Application type is required')
//         .oneOf(Object.values(APPLICATION_TYPES)),
//       configuration: Yup.object(),
//       credentials: Yup.object(),
//     }),
//     onSubmit: async (values) => {
//       try {
//         setLoading(true);
//         setError('');
//         await adminService.createApplication(values.tenantId, values);
//         navigate('/admin/businesses');
//       } catch (err) {
//         setError(err.response?.data?.error || err.message || 'Failed to create application');
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   // Update selected fields when type changes
//   useEffect(() => {
//     if (formik.values.type) {
//       const fields = APPLICATION_FIELDS[formik.values.type] || [];
//       setSelectedFields(fields);
      
//       // Initialize configuration and credentials objects
//       const config = {};
//       const credentials = {};
//       fields.forEach(field => {
//         config[field.name] = '';
//         credentials[field.name] = '';
//       });
      
//       // Only update if values are different to avoid infinite loop
//       if (JSON.stringify(config) !== JSON.stringify(formik.values.configuration)) {
//         formik.setFieldValue('configuration', config);
//       }
//       if (JSON.stringify(credentials) !== JSON.stringify(formik.values.credentials)) {
//         formik.setFieldValue('credentials', credentials);
//       }
//     }
//   }, [formik.values.type]);

//   const handleNext = () => {
//     setActiveStep((prevStep) => prevStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevStep) => prevStep - 1);
//   };

//   const handleTenantChange = (event) => {
//     formik.handleChange(event);
//   };

//   const renderStepContent = (step) => {
//     switch (step) {
//       case 0:
//         return (
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <FormControl fullWidth error={formik.touched.tenantId && Boolean(formik.errors.tenantId)}>
//                 <InputLabel>Select Tenant *</InputLabel>
//                 <Select
//                   name="tenantId"
//                   value={formik.values.tenantId}
//                   onChange={handleTenantChange}
//                   onBlur={formik.handleBlur}
//                   label="Select Tenant *"
//                 >
//                   <MenuItem value="">
//                     <em>Select a business</em>
//                   </MenuItem>
//                   {businesses.map((business) => (
//                     <MenuItem key={business.tenantId} value={business.tenantId}>
//                       {business.businessName} ({business.industry})
//                     </MenuItem>
//                   ))}
//                 </Select>
//                 {formik.touched.tenantId && formik.errors.tenantId && (
//                   <Typography variant="caption" color="error">
//                     {formik.errors.tenantId}
//                   </Typography>
//                 )}
//               </FormControl>
//             </Grid>
//           </Grid>
//         );

//       case 1:
//         return (
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 name="name"
//                 label="Application Name *"
//                 value={formik.values.name}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 error={formik.touched.name && Boolean(formik.errors.name)}
//                 helperText={formik.touched.name && formik.errors.name}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <FormControl fullWidth error={formik.touched.type && Boolean(formik.errors.type)}>
//                 <InputLabel>Application Type *</InputLabel>
//                 <Select
//                   name="type"
//                   value={formik.values.type}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   label="Application Type *"
//                 >
//                   <MenuItem value="">
//                     <em>Select type</em>
//                   </MenuItem>
//                   {Object.entries(APPLICATION_TYPE_LABELS).map(([value, label]) => (
//                     <MenuItem key={value} value={value}>
//                       {label}
//                     </MenuItem>
//                   ))}
//                 </Select>
//                 {formik.touched.type && formik.errors.type && (
//                   <Typography variant="caption" color="error">
//                     {formik.errors.type}
//                   </Typography>
//                 )}
//               </FormControl>
//             </Grid>
//           </Grid>
//         );

//       case 2:
//         // Create dynamic validation for configuration fields
//         const getConfigurationValidation = () => {
//           const validation = {};
//           selectedFields.forEach(field => {
//             if (field.required) {
//               validation[field.name] = Yup.string().required(`${field.label} is required`);
//             }
//           });
//           return Yup.object(validation);
//         };

//         return (
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom>
//                 Configuration
//               </Typography>
//               <Typography variant="body2" color="textSecondary" paragraph>
//                 Fill in the configuration details for the {APPLICATION_TYPE_LABELS[formik.values.type] || 'selected application'}.
//               </Typography>
//             </Grid>
            
//             {selectedFields.map((field) => (
//               <Grid item xs={12} sm={6} key={field.name}>
//                 <TextField
//                   fullWidth
//                   name={`configuration.${field.name}`}
//                   label={`${field.label}${field.required ? ' *' : ''}`}
//                   type={field.type === 'password' ? 'password' : 'text'}
//                   select={field.type === 'select'}
//                   value={formik.values.configuration?.[field.name] || ''}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={
//                     formik.touched.configuration && 
//                     formik.touched.configuration[field.name] && 
//                     Boolean(formik.errors.configuration?.[field.name])
//                   }
//                   helperText={
//                     formik.touched.configuration && 
//                     formik.touched.configuration[field.name] && 
//                     formik.errors.configuration?.[field.name]
//                   }
//                 >
//                   {field.options?.map((option) => (
//                     <MenuItem key={option} value={option}>
//                       {option}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//             ))}

//             {selectedFields.length > 0 && (
//               <>
//                 <Grid item xs={12}>
//                   <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
//                     Credentials (Encrypted)
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary" paragraph>
//                     These credentials will be encrypted and stored securely.
//                   </Typography>
//                 </Grid>

//                 {selectedFields.map((field) => (
//                   <Grid item xs={12} sm={6} key={`cred-${field.name}`}>
//                     <TextField
//                       fullWidth
//                       name={`credentials.${field.name}`}
//                       label={`${field.label} (Credential)`}
//                       type="password"
//                       value={formik.values.credentials?.[field.name] || ''}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                     />
//                   </Grid>
//                 ))}
//               </>
//             )}
//           </Grid>
//         );

//       default:
//         return 'Unknown step';
//     }
//   };

//   const isStepValid = () => {
//     switch (activeStep) {
//       case 0:
//         return formik.values.tenantId && !formik.errors.tenantId;
//       case 1:
//         return formik.values.name && formik.values.type && 
//                !formik.errors.name && !formik.errors.type;
//       case 2:
//         // Check if all required configuration fields are filled
//         const requiredFields = selectedFields.filter(field => field.required);
//         const allRequiredFilled = requiredFields.every(field => 
//           formik.values.configuration?.[field.name]?.trim()
//         );
//         return allRequiredFilled;
//       default:
//         return false;
//     }
//   };

//   return (
//     <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
//       <Paper sx={{ p: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           Create New Application
//         </Typography>

//         <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
//           {steps.map((label) => (
//             <Step key={label}>
//               <StepLabel>{label}</StepLabel>
//             </Step>
//           ))}
//         </Stepper>

//         {error && (
//           <Alert severity="error" sx={{ mb: 3 }}>
//             {error}
//           </Alert>
//         )}

//         <Box sx={{ mt: 2 }}>
//           {renderStepContent(activeStep)}
//         </Box>

//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
//           <Button
//             onClick={activeStep === 0 ? () => navigate('/admin/businesses') : handleBack}
//             disabled={loading}
//           >
//             {activeStep === 0 ? 'Cancel' : 'Back'}
//           </Button>

//           <Box sx={{ display: 'flex', gap: 2 }}>
//             {activeStep < steps.length - 1 ? (
//               <Button
//                 variant="contained"
//                 onClick={handleNext}
//                 disabled={!isStepValid() || loading}
//               >
//                 Next
//               </Button>
//             ) : (
//               <Button
//                 variant="contained"
//                 onClick={formik.handleSubmit}
//                 disabled={loading || !isStepValid()}
//                 startIcon={loading && <CircularProgress size={20} />}
//               >
//                 {loading ? 'Creating...' : 'Create Application'}
//               </Button>
//             )}
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default CreateApplication;
// import React, { useState, useEffect } from 'react';
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
//   FormControl,
//   InputLabel,
//   Select,
//   Stepper,
//   Step,
//   StepLabel,
//   Container,
//   Fade,
//   Divider,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { adminService } from '../../services/admin';
// import { applicationsService, APPLICATION_TYPES, APPLICATION_TYPE_LABELS, APPLICATION_FIELDS } from '../../services/applications';
// import AppsIcon from '@mui/icons-material/Apps';
// import BusinessIcon from '@mui/icons-material/Business';
// import SettingsIcon from '@mui/icons-material/Settings';
// import LockIcon from '@mui/icons-material/Lock';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// const steps = ['Select Tenant', 'Application Details', 'Configuration'];

// const CreateApplication = () => {
//   const navigate = useNavigate();
//   const [activeStep, setActiveStep] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [businesses, setBusinesses] = useState([]);
//   const [selectedFields, setSelectedFields] = useState([]);

//   useEffect(() => {
//     fetchBusinesses();
//   }, []);

//   const fetchBusinesses = async () => {
//     try {
//       const data = await adminService.getAllBusinesses();
//       setBusinesses(data);
//     } catch (err) {
//       console.error('Error fetching businesses:', err);
//     }
//   };

//   const formik = useFormik({
//     initialValues: {
//       tenantId: '',
//       name: '',
//       type: '',
//       configuration: {},
//       credentials: {},
//     },
//     validationSchema: Yup.object({
//       tenantId: Yup.string().required('Tenant is required'),
//       name: Yup.string()
//         .required('Application name is required')
//         .min(2, 'Application name must be at least 2 characters'),
//       type: Yup.string()
//         .required('Application type is required')
//         .oneOf(Object.values(APPLICATION_TYPES)),
//       configuration: Yup.object(),
//       credentials: Yup.object(),
//     }),
//     onSubmit: async (values) => {
//       try {
//         setLoading(true);
//         setError('');
//         await adminService.createApplication(values.tenantId, values);
//         navigate('/admin/businesses');
//       } catch (err) {
//         setError(err.response?.data?.error || err.message || 'Failed to create application');
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   useEffect(() => {
//     if (formik.values.type) {
//       const fields = APPLICATION_FIELDS[formik.values.type] || [];
//       setSelectedFields(fields);
      
//       const config = {};
//       const credentials = {};
//       fields.forEach(field => {
//         config[field.name] = '';
//         credentials[field.name] = '';
//       });
      
//       if (JSON.stringify(config) !== JSON.stringify(formik.values.configuration)) {
//         formik.setFieldValue('configuration', config);
//       }
//       if (JSON.stringify(credentials) !== JSON.stringify(formik.values.credentials)) {
//         formik.setFieldValue('credentials', credentials);
//       }
//     }
//   }, [formik.values.type]);

//   const handleNext = () => {
//     setActiveStep((prevStep) => prevStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevStep) => prevStep - 1);
//   };

//   const handleTenantChange = (event) => {
//     formik.handleChange(event);
//   };

//   const renderStepContent = (step) => {
//     switch (step) {
//       case 0:
//         return (
//           <Box sx={{ maxWidth: 600, mx: 'auto' }}>
//             <Box sx={{ textAlign: 'center', mb: 4 }}>
//               <BusinessIcon sx={{ fontSize: 56, color: '#667eea', mb: 2 }} />
//               <Typography variant="h5" fontWeight={600} gutterBottom>
//                 Select Business Tenant
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Choose the business that will use this application
//               </Typography>
//             </Box>

//             <FormControl 
//               fullWidth 
//               error={formik.touched.tenantId && Boolean(formik.errors.tenantId)}
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   borderRadius: 2,
//                   backgroundColor: 'white',
//                 },
//               }}
//             >
//               <InputLabel>Select Tenant *</InputLabel>
//               <Select
//                 name="tenantId"
//                 value={formik.values.tenantId}
//                 onChange={handleTenantChange}
//                 onBlur={formik.handleBlur}
//                 label="Select Tenant *"
//               >
//                 <MenuItem value="">
//                   <em>Select a business</em>
//                 </MenuItem>
//                 {businesses.map((business) => (
//                   <MenuItem key={business.tenantId} value={business.tenantId}>
//                     {business.businessName} ({business.industry})
//                   </MenuItem>
//                 ))}
//               </Select>
//               {formik.touched.tenantId && formik.errors.tenantId && (
//                 <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
//                   {formik.errors.tenantId}
//                 </Typography>
//               )}
//             </FormControl>
//           </Box>
//         );

//       case 1:
//         return (
//           <Box sx={{ maxWidth: 600, mx: 'auto' }}>
//             <Box sx={{ textAlign: 'center', mb: 4 }}>
//               <AppsIcon sx={{ fontSize: 56, color: '#667eea', mb: 2 }} />
//               <Typography variant="h5" fontWeight={600} gutterBottom>
//                 Application Details
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Provide basic information about the application
//               </Typography>
//             </Box>

//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
//               <TextField
//                 fullWidth
//                 name="name"
//                 label="Application Name *"
//                 placeholder="Enter a descriptive name"
//                 value={formik.values.name}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 error={formik.touched.name && Boolean(formik.errors.name)}
//                 helperText={formik.touched.name && formik.errors.name}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: 2,
//                     backgroundColor: 'white',
//                   },
//                 }}
//               />

//               <FormControl 
//                 fullWidth 
//                 error={formik.touched.type && Boolean(formik.errors.type)}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: 2,
//                     backgroundColor: 'white',
//                   },
//                 }}
//               >
//                 <InputLabel>Application Type *</InputLabel>
//                 <Select
//                   name="type"
//                   value={formik.values.type}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   label="Application Type *"
//                 >
//                   <MenuItem value="">
//                     <em>Select type</em>
//                   </MenuItem>
//                   {Object.entries(APPLICATION_TYPE_LABELS).map(([value, label]) => (
//                     <MenuItem key={value} value={value}>
//                       {label}
//                     </MenuItem>
//                   ))}
//                 </Select>
//                 {formik.touched.type && formik.errors.type && (
//                   <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
//                     {formik.errors.type}
//                   </Typography>
//                 )}
//               </FormControl>
//             </Box>
//           </Box>
//         );

//       case 2:
//         return (
//           <Box sx={{ maxWidth: 600, mx: 'auto' }}>
//             <Box sx={{ textAlign: 'center', mb: 4 }}>
//               <SettingsIcon sx={{ fontSize: 56, color: '#667eea', mb: 2 }} />
//               <Typography variant="h5" fontWeight={600} gutterBottom>
//                 Configuration & Credentials
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Configure {APPLICATION_TYPE_LABELS[formik.values.type] || 'the application'} settings
//               </Typography>
//             </Box>

//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
//               {/* Configuration Section */}
//               {selectedFields.length > 0 && (
//                 <>
//                   <Box>
//                     <Typography 
//                       variant="subtitle1" 
//                       fontWeight={600} 
//                       sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
//                     >
//                       <SettingsIcon fontSize="small" />
//                       Configuration Settings
//                     </Typography>
//                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
//                       {selectedFields.map((field) => (
//                         <TextField
//                           key={field.name}
//                           fullWidth
//                           name={`configuration.${field.name}`}
//                           label={`${field.label}${field.required ? ' *' : ''}`}
//                           type={field.type === 'password' ? 'password' : 'text'}
//                           select={field.type === 'select'}
//                           value={formik.values.configuration?.[field.name] || ''}
//                           onChange={formik.handleChange}
//                           onBlur={formik.handleBlur}
//                           error={
//                             formik.touched.configuration && 
//                             formik.touched.configuration[field.name] && 
//                             Boolean(formik.errors.configuration?.[field.name])
//                           }
//                           helperText={
//                             formik.touched.configuration && 
//                             formik.touched.configuration[field.name] && 
//                             formik.errors.configuration?.[field.name]
//                           }
//                           sx={{
//                             '& .MuiOutlinedInput-root': {
//                               borderRadius: 2,
//                               backgroundColor: 'white',
//                             },
//                           }}
//                         >
//                           {field.options?.map((option) => (
//                             <MenuItem key={option} value={option}>
//                               {option}
//                             </MenuItem>
//                           ))}
//                         </TextField>
//                       ))}
//                     </Box>
//                   </Box>

//                   <Divider sx={{ my: 2 }} />

//                   {/* Credentials Section */}
//                   <Box>
//                     <Typography 
//                       variant="subtitle1" 
//                       fontWeight={600} 
//                       sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}
//                     >
//                       <LockIcon fontSize="small" />
//                       Secure Credentials
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                       These credentials will be encrypted and stored securely
//                     </Typography>
//                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
//                       {selectedFields.map((field) => (
//                         <TextField
//                           key={`cred-${field.name}`}
//                           fullWidth
//                           name={`credentials.${field.name}`}
//                           label={`${field.label} (Credential)`}
//                           type="password"
//                           value={formik.values.credentials?.[field.name] || ''}
//                           onChange={formik.handleChange}
//                           onBlur={formik.handleBlur}
//                           sx={{
//                             '& .MuiOutlinedInput-root': {
//                               borderRadius: 2,
//                               backgroundColor: 'white',
//                             },
//                           }}
//                         />
//                       ))}
//                     </Box>
//                   </Box>
//                 </>
//               )}
//             </Box>
//           </Box>
//         );

//       default:
//         return 'Unknown step';
//     }
//   };

//   const isStepValid = () => {
//     switch (activeStep) {
//       case 0:
//         return formik.values.tenantId && !formik.errors.tenantId;
//       case 1:
//         return formik.values.name && formik.values.type && 
//                !formik.errors.name && !formik.errors.type;
//       case 2:
//         const requiredFields = selectedFields.filter(field => field.required);
//         const allRequiredFilled = requiredFields.every(field => 
//           formik.values.configuration?.[field.name]?.trim()
//         );
//         return allRequiredFilled;
//       default:
//         return false;
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//         py: 6,
//       }}
//     >
//       <Container maxWidth="lg">
//         <Fade in timeout={600}>
//           <Paper
//             elevation={8}
//             sx={{
//               borderRadius: 4,
//               overflow: 'hidden',
//               background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)',
//             }}
//           >
//             {/* Header */}
//             <Box
//               sx={{
//                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                 p: 4,
//                 color: 'white',
//                 textAlign: 'center',
//               }}
//             >
//               <AppsIcon sx={{ fontSize: 48, mb: 1, opacity: 0.9 }} />
//               <Typography variant="h4" fontWeight={600} gutterBottom>
//                 Create New Application
//               </Typography>
//               <Typography variant="body1" sx={{ opacity: 0.95, maxWidth: 600, mx: 'auto' }}>
//                 Set up a new application for your business in three simple steps
//               </Typography>
//             </Box>

//             {/* Stepper */}
//             <Box sx={{ px: 4, pt: 4 }}>
//               <Stepper 
//                 activeStep={activeStep} 
//                 sx={{ 
//                   mb: 4,
//                   '& .MuiStepLabel-root .Mui-completed': {
//                     color: '#667eea',
//                   },
//                   '& .MuiStepLabel-root .Mui-active': {
//                     color: '#764ba2',
//                   },
//                 }}
//               >
//                 {steps.map((label) => (
//                   <Step key={label}>
//                     <StepLabel>{label}</StepLabel>
//                   </Step>
//                 ))}
//               </Stepper>
//             </Box>

//             {/* Content */}
//             <Box sx={{ px: 4, pb: 4 }}>
//               {error && (
//                 <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
//                   {error}
//                 </Alert>
//               )}

//               <Box sx={{ minHeight: 400 }}>
//                 {renderStepContent(activeStep)}
//               </Box>

//               <Divider sx={{ my: 4 }} />

//               {/* Navigation Buttons */}
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <Button
//                   onClick={activeStep === 0 ? () => navigate('/admin/businesses') : handleBack}
//                   disabled={loading}
//                   startIcon={activeStep !== 0 && <ArrowBackIcon />}
//                   size="large"
//                   sx={{
//                     borderRadius: 2,
//                     px: 3,
//                     textTransform: 'none',
//                     fontWeight: 600,
//                     color: '#667eea',
//                   }}
//                 >
//                   {activeStep === 0 ? 'Cancel' : 'Back'}
//                 </Button>

//                 <Box sx={{ display: 'flex', gap: 2 }}>
//                   {activeStep < steps.length - 1 ? (
//                     <Button
//                       variant="contained"
//                       onClick={handleNext}
//                       disabled={!isStepValid() || loading}
//                       endIcon={<ArrowForwardIcon />}
//                       size="large"
//                       sx={{
//                         borderRadius: 2,
//                         px: 4,
//                         textTransform: 'none',
//                         fontWeight: 600,
//                         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                         boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
//                         '&:hover': {
//                           boxShadow: '0 6px 16px rgba(102, 126, 234, 0.5)',
//                           background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
//                         },
//                         '&:disabled': {
//                           background: 'rgba(0, 0, 0, 0.12)',
//                         },
//                       }}
//                     >
//                       Next Step
//                     </Button>
//                   ) : (
//                     <Button
//                       variant="contained"
//                       onClick={formik.handleSubmit}
//                       disabled={loading || !isStepValid()}
//                       startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
//                       size="large"
//                       sx={{
//                         borderRadius: 2,
//                         px: 4,
//                         textTransform: 'none',
//                         fontWeight: 600,
//                         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                         boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
//                         '&:hover': {
//                           boxShadow: '0 6px 16px rgba(102, 126, 234, 0.5)',
//                           background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
//                         },
//                         '&:disabled': {
//                           background: 'rgba(0, 0, 0, 0.12)',
//                         },
//                       }}
//                     >
//                       {loading ? 'Creating Application...' : 'Create Application'}
//                     </Button>
//                   )}
//                 </Box>
//               </Box>
//             </Box>
//           </Paper>
//         </Fade>
//       </Container>
//     </Box>
//   );
// };

// export default CreateApplication;

// export default CreateApplication;
// import React, { useState, useEffect } from 'react';
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
//   FormControl,
//   InputLabel,
//   Select,
//   Stepper,
//   Step,
//   StepLabel,
//   Container,
//   Fade,
//   Divider,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { adminService } from '../../services/admin';
// import { applicationsService, APPLICATION_TYPES, APPLICATION_TYPE_LABELS, APPLICATION_FIELDS } from '../../services/applications';
// import AppsIcon from '@mui/icons-material/Apps';
// import BusinessIcon from '@mui/icons-material/Business';
// import SettingsIcon from '@mui/icons-material/Settings';
// import LockIcon from '@mui/icons-material/Lock';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// const steps = ['Select Tenant', 'Application Details', 'Configuration'];

// const CreateApplication = () => {
//   const navigate = useNavigate();
//   const [activeStep, setActiveStep] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [businesses, setBusinesses] = useState([]);
//   const [selectedFields, setSelectedFields] = useState([]);

//   useEffect(() => {
//     fetchBusinesses();
//   }, []);

//   const fetchBusinesses = async () => {
//     try {
//       const data = await adminService.getAllBusinesses();
//       setBusinesses(data);
//     } catch (err) {
//       console.error('Error fetching businesses:', err);
//     }
//   };

//   const formik = useFormik({
//     initialValues: {
//       tenantId: '',
//       name: '',
//       type: '',
//       configuration: {},
//       credentials: {},
//     },
//     validationSchema: Yup.object({
//       tenantId: Yup.string().required('Tenant is required'),
//       name: Yup.string()
//         .required('Application name is required')
//         .min(2, 'Application name must be at least 2 characters'),
//       type: Yup.string()
//         .required('Application type is required')
//         .oneOf(Object.values(APPLICATION_TYPES)),
//       configuration: Yup.object(),
//       credentials: Yup.object(),
//     }),
//     onSubmit: async (values) => {
//       try {
//         setLoading(true);
//         setError('');
//         await adminService.createApplication(values.tenantId, values);
//         navigate('/admin/businesses');
//       } catch (err) {
//         setError(err.response?.data?.error || err.message || 'Failed to create application');
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   useEffect(() => {
//     if (formik.values.type) {
//       const fields = APPLICATION_FIELDS[formik.values.type] || [];
//       setSelectedFields(fields);
      
//       const config = {};
//       const credentials = {};
//       fields.forEach(field => {
//         config[field.name] = '';
//         credentials[field.name] = '';
//       });
      
//       if (JSON.stringify(config) !== JSON.stringify(formik.values.configuration)) {
//         formik.setFieldValue('configuration', config);
//       }
//       if (JSON.stringify(credentials) !== JSON.stringify(formik.values.credentials)) {
//         formik.setFieldValue('credentials', credentials);
//       }
//     }
//   }, [formik.values.type]);

//   const handleNext = () => {
//     setActiveStep((prevStep) => prevStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevStep) => prevStep - 1);
//   };

//   const handleTenantChange = (event) => {
//     formik.handleChange(event);
//   };

//   const renderStepContent = (step) => {
//     switch (step) {
//       case 0:
//         return (
//           <Box sx={{ maxWidth: 600, mx: 'auto' }}>
//             <Box sx={{ textAlign: 'center', mb: 4 }}>
//               <BusinessIcon sx={{ fontSize: 56, color: '#3b82f6', mb: 2 }} />
//               <Typography variant="h5" fontWeight={600} gutterBottom>
//                 Select Business Tenant
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Choose the business that will use this application
//               </Typography>
//             </Box>

//             <FormControl 
//               fullWidth 
//               error={formik.touched.tenantId && Boolean(formik.errors.tenantId)}
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   borderRadius: 2,
//                   backgroundColor: 'white',
//                 },
//                 '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
//                   borderColor: '#3b82f6',
//                 },
//                 '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
//                   borderColor: '#3b82f6',
//                 },
//               }}
//             >
//               <InputLabel>Select Tenant *</InputLabel>
//               <Select
//                 name="tenantId"
//                 value={formik.values.tenantId}
//                 onChange={handleTenantChange}
//                 onBlur={formik.handleBlur}
//                 label="Select Tenant *"
//               >
//                 <MenuItem value="">
//                   <em>Select a business</em>
//                 </MenuItem>
//                 {businesses.map((business) => (
//                   <MenuItem key={business.tenantId} value={business.tenantId}>
//                     {business.businessName} ({business.industry})
//                   </MenuItem>
//                 ))}
//               </Select>
//               {formik.touched.tenantId && formik.errors.tenantId && (
//                 <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
//                   {formik.errors.tenantId}
//                 </Typography>
//               )}
//             </FormControl>
//           </Box>
//         );

//       case 1:
//         return (
//           <Box sx={{ maxWidth: 600, mx: 'auto' }}>
//             <Box sx={{ textAlign: 'center', mb: 4 }}>
//               <AppsIcon sx={{ fontSize: 56, color: '#3b82f6', mb: 2 }} />
//               <Typography variant="h5" fontWeight={600} gutterBottom>
//                 Application Details
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Provide basic information about the application
//               </Typography>
//             </Box>

//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
//               <TextField
//                 fullWidth
//                 name="name"
//                 label="Application Name *"
//                 placeholder="Enter a descriptive name"
//                 value={formik.values.name}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 error={formik.touched.name && Boolean(formik.errors.name)}
//                 helperText={formik.touched.name && formik.errors.name}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: 2,
//                     backgroundColor: 'white',
//                   },
//                   '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
//                     borderColor: '#3b82f6',
//                   },
//                   '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
//                     borderColor: '#3b82f6',
//                   },
//                 }}
//               />

//               <FormControl 
//                 fullWidth 
//                 error={formik.touched.type && Boolean(formik.errors.type)}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: 2,
//                     backgroundColor: 'white',
//                   },
//                   '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
//                     borderColor: '#3b82f6',
//                   },
//                   '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
//                     borderColor: '#3b82f6',
//                   },
//                 }}
//               >
//                 <InputLabel>Application Type *</InputLabel>
//                 <Select
//                   name="type"
//                   value={formik.values.type}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   label="Application Type *"
//                 >
//                   <MenuItem value="">
//                     <em>Select type</em>
//                   </MenuItem>
//                   {Object.entries(APPLICATION_TYPE_LABELS).map(([value, label]) => (
//                     <MenuItem key={value} value={value}>
//                       {label}
//                     </MenuItem>
//                   ))}
//                 </Select>
//                 {formik.touched.type && formik.errors.type && (
//                   <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
//                     {formik.errors.type}
//                   </Typography>
//                 )}
//               </FormControl>
//             </Box>
//           </Box>
//         );

//       case 2:
//         return (
//           <Box sx={{ maxWidth: 600, mx: 'auto' }}>
//             <Box sx={{ textAlign: 'center', mb: 4 }}>
//               <SettingsIcon sx={{ fontSize: 56, color: '#3b82f6', mb: 2 }} />
//               <Typography variant="h5" fontWeight={600} gutterBottom>
//                 Configuration & Credentials
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Configure {APPLICATION_TYPE_LABELS[formik.values.type] || 'the application'} settings
//               </Typography>
//             </Box>

//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
//               {/* Configuration Section */}
//               {selectedFields.length > 0 && (
//                 <>
//                   <Box>
//                     <Typography 
//                       variant="subtitle1" 
//                       fontWeight={600} 
//                       sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
//                     >
//                       <SettingsIcon fontSize="small" sx={{ color: '#3b82f6' }} />
//                       Configuration Settings
//                     </Typography>
//                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
//                       {selectedFields.map((field) => (
//                         <TextField
//                           key={field.name}
//                           fullWidth
//                           name={`configuration.${field.name}`}
//                           label={`${field.label}${field.required ? ' *' : ''}`}
//                           type={field.type === 'password' ? 'password' : 'text'}
//                           select={field.type === 'select'}
//                           value={formik.values.configuration?.[field.name] || ''}
//                           onChange={formik.handleChange}
//                           onBlur={formik.handleBlur}
//                           error={
//                             formik.touched.configuration && 
//                             formik.touched.configuration[field.name] && 
//                             Boolean(formik.errors.configuration?.[field.name])
//                           }
//                           helperText={
//                             formik.touched.configuration && 
//                             formik.touched.configuration[field.name] && 
//                             formik.errors.configuration?.[field.name]
//                           }
//                           sx={{
//                             '& .MuiOutlinedInput-root': {
//                               borderRadius: 2,
//                               backgroundColor: 'white',
//                             },
//                             '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
//                               borderColor: '#3b82f6',
//                             },
//                             '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
//                               borderColor: '#3b82f6',
//                             },
//                           }}
//                         >
//                           {field.options?.map((option) => (
//                             <MenuItem key={option} value={option}>
//                               {option}
//                             </MenuItem>
//                           ))}
//                         </TextField>
//                       ))}
//                     </Box>
//                   </Box>

//                   <Divider sx={{ my: 2 }} />

//                   {/* Credentials Section */}
//                   <Box>
//                     <Typography 
//                       variant="subtitle1" 
//                       fontWeight={600} 
//                       sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}
//                     >
//                       <LockIcon fontSize="small" sx={{ color: '#3b82f6' }} />
//                       Secure Credentials
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                       These credentials will be encrypted and stored securely
//                     </Typography>
//                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
//                       {selectedFields.map((field) => (
//                         <TextField
//                           key={`cred-${field.name}`}
//                           fullWidth
//                           name={`credentials.${field.name}`}
//                           label={`${field.label} (Credential)`}
//                           type="password"
//                           value={formik.values.credentials?.[field.name] || ''}
//                           onChange={formik.handleChange}
//                           onBlur={formik.handleBlur}
//                           sx={{
//                             '& .MuiOutlinedInput-root': {
//                               borderRadius: 2,
//                               backgroundColor: 'white',
//                             },
//                             '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
//                               borderColor: '#3b82f6',
//                             },
//                             '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
//                               borderColor: '#3b82f6',
//                             },
//                           }}
//                         />
//                       ))}
//                     </Box>
//                   </Box>
//                 </>
//               )}
//             </Box>
//           </Box>
//         );

//       default:
//         return 'Unknown step';
//     }
//   };

//   const isStepValid = () => {
//     switch (activeStep) {
//       case 0:
//         return formik.values.tenantId && !formik.errors.tenantId;
//       case 1:
//         return formik.values.name && formik.values.type && 
//                !formik.errors.name && !formik.errors.type;
//       case 2:
//         const requiredFields = selectedFields.filter(field => field.required);
//         const allRequiredFilled = requiredFields.every(field => 
//           formik.values.configuration?.[field.name]?.trim()
//         );
//         return allRequiredFilled;
//       default:
//         return false;
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         backgroundColor: '#f8fafc',
//         py: 6,
//       }}
//     >
//       <Container maxWidth="lg">
//         <Fade in timeout={600}>
//           <Paper
//             elevation={2}
//             sx={{
//               borderRadius: 3,
//               overflow: 'hidden',
//               backgroundColor: 'white',
//               border: '1px solid rgba(59, 130, 246, 0.1)',
//               boxShadow: '0 8px 32px rgba(59, 130, 246, 0.08)',
//             }}
//           >
//             {/* Header */}
//             <Box
//               sx={{
//                 background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
//                 p: 4,
//                 color: 'white',
//                 textAlign: 'center',
//               }}
//             >
//               <AppsIcon sx={{ fontSize: 48, mb: 1, opacity: 0.9 }} />
//               <Typography variant="h4" fontWeight={600} gutterBottom>
//                 Create New Application
//               </Typography>
//               <Typography variant="body1" sx={{ opacity: 0.95, maxWidth: 600, mx: 'auto' }}>
//                 Set up a new application for your business in three simple steps
//               </Typography>
//             </Box>

//             {/* Stepper */}
//             <Box sx={{ px: 4, pt: 4 }}>
//               <Stepper 
//                 activeStep={activeStep} 
//                 sx={{ 
//                   mb: 4,
//                   '& .MuiStepLabel-root .Mui-completed': {
//                     color: '#3b82f6',
//                   },
//                   '& .MuiStepLabel-root .Mui-active': {
//                     color: '#1d4ed8',
//                   },
//                   '& .MuiStepLabel-label': {
//                     fontWeight: 600,
//                   },
//                 }}
//               >
//                 {steps.map((label) => (
//                   <Step key={label}>
//                     <StepLabel>{label}</StepLabel>
//                   </Step>
//                 ))}
//               </Stepper>
//             </Box>

//             {/* Content */}
//             <Box sx={{ px: 4, pb: 4 }}>
//               {error && (
//                 <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
//                   {error}
//                 </Alert>
//               )}

//               <Box sx={{ minHeight: 400 }}>
//                 {renderStepContent(activeStep)}
//               </Box>

//               <Divider sx={{ my: 4 }} />

//               {/* Navigation Buttons */}
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <Button
//                   onClick={activeStep === 0 ? () => navigate('/admin/businesses') : handleBack}
//                   disabled={loading}
//                   startIcon={activeStep !== 0 && <ArrowBackIcon />}
//                   size="large"
//                   sx={{
//                     borderRadius: 2,
//                     px: 3,
//                     textTransform: 'none',
//                     fontWeight: 600,
//                     color: '#3b82f6',
//                     '&:hover': {
//                       backgroundColor: 'rgba(59, 130, 246, 0.04)',
//                     },
//                   }}
//                 >
//                   {activeStep === 0 ? 'Cancel' : 'Back'}
//                 </Button>

//                 <Box sx={{ display: 'flex', gap: 2 }}>
//                   {activeStep < steps.length - 1 ? (
//                     <Button
//                       variant="contained"
//                       onClick={handleNext}
//                       disabled={!isStepValid() || loading}
//                       endIcon={<ArrowForwardIcon />}
//                       size="large"
//                       sx={{
//                         borderRadius: 2,
//                         px: 4,
//                         textTransform: 'none',
//                         fontWeight: 600,
//                         background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
//                         boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
//                         '&:hover': {
//                           boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)',
//                           background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
//                         },
//                         '&:disabled': {
//                           background: 'rgba(0, 0, 0, 0.12)',
//                         },
//                       }}
//                     >
//                       Next Step
//                     </Button>
//                   ) : (
//                     <Button
//                       variant="contained"
//                       onClick={formik.handleSubmit}
//                       disabled={loading || !isStepValid()}
//                       startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
//                       size="large"
//                       sx={{
//                         borderRadius: 2,
//                         px: 4,
//                         textTransform: 'none',
//                         fontWeight: 600,
//                         background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
//                         boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
//                         '&:hover': {
//                           boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)',
//                           background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
//                         },
//                         '&:disabled': {
//                           background: 'rgba(0, 0, 0, 0.12)',
//                         },
//                       }}
//                     >
//                       {loading ? 'Creating Application...' : 'Create Application'}
//                     </Button>
//                   )}
//                 </Box>
//               </Box>
//             </Box>
//           </Paper>
//         </Fade>
//       </Container>
//     </Box>
//   );
// };

// export default CreateApplication;

// import React, { useState, useEffect } from 'react';
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
//   FormControl,
//   InputLabel,
//   Select,
//   Stepper,
//   Step,
//   StepLabel,
//   Container,
//   Fade,
//   Divider,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { adminService } from '../../services/admin';
// import { applicationsService, APPLICATION_TYPES, APPLICATION_TYPE_LABELS, APPLICATION_FIELDS } from '../../services/applications';
// import AppsIcon from '@mui/icons-material/Apps';
// import BusinessIcon from '@mui/icons-material/Business';
// import SettingsIcon from '@mui/icons-material/Settings';
// import LockIcon from '@mui/icons-material/Lock';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// const steps = ['Select Tenant', 'Application Details', 'Configuration'];

// const CreateApplication = ({ application, tenantId, isEditMode = false, onSuccess }) => {
//   const navigate = useNavigate();
//   const [activeStep, setActiveStep] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [businesses, setBusinesses] = useState([]);
//   const [selectedFields, setSelectedFields] = useState([]);




  
//   // Initialize formik with conditional initial values
//   const formik = useFormik({
//     initialValues: {
//       tenantId: tenantId || '',
//       name: application?.name || '',
//       type: application?.type || '',
//       configuration: application?.configuration || {},
//       credentials: application?.credentials || {},
//     },
//     validationSchema: Yup.object({
//       tenantId: Yup.string().required('Tenant is required'),
//       name: Yup.string()
//         .required('Application name is required')
//         .min(2, 'Application name must be at least 2 characters'),
//       type: Yup.string()
//         .required('Application type is required')
//         .oneOf(Object.values(APPLICATION_TYPES)),
//       configuration: Yup.object(),
//       credentials: Yup.object(),
//     }),
//     onSubmit: async (values) => {
//       try {
//         setLoading(true);
//         setError('');
        
//         if (isEditMode && application) {
//           await adminService.updateApplication(application.appId, values);
//         } else {
//           await adminService.createApplication(values.tenantId, values);
//         }
        
//         if (onSuccess) {
//           onSuccess();
//         } else {
//           navigate('/admin/businesses');
//         }
//       } catch (err) {
//         setError(err.response?.data?.error || err.message || 
//           `Failed to ${isEditMode ? 'update' : 'create'} application`);
//       } finally {
//         setLoading(false);
//       }
//     },
//     enableReinitialize: true,
//   });

//   useEffect(() => {
//     fetchBusinesses();
    
//     // If in edit mode and application exists, set initial values
//     if (isEditMode && application) {
//       // Set fields based on application type
//       if (application.type) {
//         const fields = APPLICATION_FIELDS[application.type] || [];
//         setSelectedFields(fields);
        
//         // Initialize configuration if not present
//         const config = { ...application.configuration };
//         const credentials = { ...application.credentials };
        
//         fields.forEach(field => {
//           if (config[field.name] === undefined) {
//             config[field.name] = '';
//           }
//           if (credentials[field.name] === undefined) {
//             credentials[field.name] = '';
//           }
//         });
        
//         formik.setValues({
//           tenantId: application.tenantId || '',
//           name: application.name || '',
//           type: application.type || '',
//           configuration: config,
//           credentials: credentials,
//         });
//       }
//     }
//   }, [application, isEditMode]);

//   useEffect(() => {
//     if (formik.values.type && !isEditMode) {
//       const fields = APPLICATION_FIELDS[formik.values.type] || [];
//       setSelectedFields(fields);
      
//       const config = {};
//       const credentials = {};
//       fields.forEach(field => {
//         config[field.name] = formik.values.configuration?.[field.name] || '';
//         credentials[field.name] = formik.values.credentials?.[field.name] || '';
//       });
      
//       if (JSON.stringify(config) !== JSON.stringify(formik.values.configuration)) {
//         formik.setFieldValue('configuration', config);
//       }
//       if (JSON.stringify(credentials) !== JSON.stringify(formik.values.credentials)) {
//         formik.setFieldValue('credentials', credentials);
//       }
//     }
//   }, [formik.values.type, isEditMode]);

//   const fetchBusinesses = async () => {
//     try {
//       const data = await adminService.getAllBusinesses();
//       setBusinesses(data);
//     } catch (err) {
//       console.error('Error fetching businesses:', err);
//     }
//   };

//   const handleNext = () => {
//     setActiveStep((prevStep) => prevStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevStep) => prevStep - 1);
//   };

//   const handleTenantChange = (event) => {
//     formik.handleChange(event);
//   };

//   const renderStepContent = (step) => {
//     switch (step) {
//       case 0:
//         return (
//           <Box sx={{ maxWidth: 600, mx: 'auto' }}>
//             <Box sx={{ textAlign: 'center', mb: 4 }}>
//               <BusinessIcon sx={{ fontSize: 56, color: '#3b82f6', mb: 2 }} />
//               <Typography variant="h5" fontWeight={600} gutterBottom>
//                 {isEditMode ? 'Application Tenant' : 'Select Business Tenant'}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {isEditMode 
//                   ? 'The business tenant associated with this application'
//                   : 'Choose the business that will use this application'
//                 }
//               </Typography>
//             </Box>

//             <FormControl 
//               fullWidth 
//               error={formik.touched.tenantId && Boolean(formik.errors.tenantId)}
//               disabled={isEditMode}
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   borderRadius: 2,
//                   backgroundColor: isEditMode ? '#f5f5f5' : 'white',
//                 },
//                 '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
//                   borderColor: '#3b82f6',
//                 },
//                 '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
//                   borderColor: '#3b82f6',
//                 },
//               }}
//             >
//               <InputLabel>Select Tenant *</InputLabel>
//               <Select
//                 name="tenantId"
//                 value={formik.values.tenantId}
//                 onChange={handleTenantChange}
//                 onBlur={formik.handleBlur}
//                 label="Select Tenant *"
//               >
//                 <MenuItem value="">
//                   <em>Select a business</em>
//                 </MenuItem>
//                 {businesses.map((business) => (
//                   <MenuItem key={business.tenantId} value={business.tenantId}>
//                     {business.businessName} ({business.industry})
//                   </MenuItem>
//                 ))}
//               </Select>
//               {formik.touched.tenantId && formik.errors.tenantId && (
//                 <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
//                   {formik.errors.tenantId}
//                 </Typography>
//               )}
//               {isEditMode && (
//                 <Typography variant="caption" color="text.secondary" sx={{ mt: 1, ml: 2 }}>
//                   Tenant cannot be changed in edit mode
//                 </Typography>
//               )}
//             </FormControl>
//           </Box>
//         );

//       case 1:
//         return (
//           <Box sx={{ maxWidth: 600, mx: 'auto' }}>
//             <Box sx={{ textAlign: 'center', mb: 4 }}>
//               <AppsIcon sx={{ fontSize: 56, color: '#3b82f6', mb: 2 }} />
//               <Typography variant="h5" fontWeight={600} gutterBottom>
//                 Application Details
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {isEditMode 
//                   ? 'Update basic information about the application'
//                   : 'Provide basic information about the application'
//                 }
//               </Typography>
//             </Box>

//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
//               <TextField
//                 fullWidth
//                 name="name"
//                 label="Application Name *"
//                 placeholder="Enter a descriptive name"
//                 value={formik.values.name}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 error={formik.touched.name && Boolean(formik.errors.name)}
//                 helperText={formik.touched.name && formik.errors.name}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: 2,
//                     backgroundColor: 'white',
//                   },
//                   '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
//                     borderColor: '#3b82f6',
//                   },
//                   '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
//                     borderColor: '#3b82f6',
//                   },
//                 }}
//               />

//               <FormControl 
//                 fullWidth 
//                 error={formik.touched.type && Boolean(formik.errors.type)}
//                 disabled={isEditMode}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: 2,
//                     backgroundColor: isEditMode ? '#f5f5f5' : 'white',
//                   },
//                   '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
//                     borderColor: '#3b82f6',
//                   },
//                   '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
//                     borderColor: '#3b82f6',
//                   },
//                 }}
//               >
//                 <InputLabel>Application Type *</InputLabel>
//                 <Select
//                   name="type"
//                   value={formik.values.type}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   label="Application Type *"
//                 >
//                   <MenuItem value="">
//                     <em>Select type</em>
//                   </MenuItem>
//                   {Object.entries(APPLICATION_TYPE_LABELS).map(([value, label]) => (
//                     <MenuItem key={value} value={value}>
//                       {label}
//                     </MenuItem>
//                   ))}
//                 </Select>
//                 {formik.touched.type && formik.errors.type && (
//                   <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
//                     {formik.errors.type}
//                   </Typography>
//                 )}
//                 {isEditMode && (
//                   <Typography variant="caption" color="text.secondary" sx={{ mt: 1, ml: 2 }}>
//                     Application type cannot be changed in edit mode
//                   </Typography>
//                 )}
//               </FormControl>
//             </Box>
//           </Box>
//         );

//       case 2:
//         return (
//           <Box sx={{ maxWidth: 600, mx: 'auto' }}>
//             <Box sx={{ textAlign: 'center', mb: 4 }}>
//               <SettingsIcon sx={{ fontSize: 56, color: '#3b82f6', mb: 2 }} />
//               <Typography variant="h5" fontWeight={600} gutterBottom>
//                 Configuration & Credentials
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {isEditMode 
//                   ? `Update ${APPLICATION_TYPE_LABELS[formik.values.type] || 'the application'} settings`
//                   : `Configure ${APPLICATION_TYPE_LABELS[formik.values.type] || 'the application'} settings`
//                 }
//               </Typography>
//             </Box>

//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
//               {/* Configuration Section */}
//               {selectedFields.length > 0 && (
//                 <>
//                   <Box>
//                     <Typography 
//                       variant="subtitle1" 
//                       fontWeight={600} 
//                       sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
//                     >
//                       <SettingsIcon fontSize="small" sx={{ color: '#3b82f6' }} />
//                       Configuration Settings
//                     </Typography>
//                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
//                       {selectedFields.map((field) => (
//                         <TextField
//                           key={field.name}
//                           fullWidth
//                           name={`configuration.${field.name}`}
//                           label={`${field.label}${field.required ? ' *' : ''}`}
//                           type={field.type === 'password' ? 'password' : 'text'}
//                           select={field.type === 'select'}
//                           value={formik.values.configuration?.[field.name] || ''}
//                           onChange={formik.handleChange}
//                           onBlur={formik.handleBlur}
//                           error={
//                             formik.touched.configuration && 
//                             formik.touched.configuration[field.name] && 
//                             Boolean(formik.errors.configuration?.[field.name])
//                           }
//                           helperText={
//                             formik.touched.configuration && 
//                             formik.touched.configuration[field.name] && 
//                             formik.errors.configuration?.[field.name]
//                           }
//                           disabled={isEditMode && field.readOnly}
//                           sx={{
//                             '& .MuiOutlinedInput-root': {
//                               borderRadius: 2,
//                               backgroundColor: isEditMode && field.readOnly ? '#f5f5f5' : 'white',
//                             },
//                             '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
//                               borderColor: '#3b82f6',
//                             },
//                             '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
//                               borderColor: '#3b82f6',
//                             },
//                           }}
//                         >
//                           {field.options?.map((option) => (
//                             <MenuItem key={option} value={option}>
//                               {option}
//                             </MenuItem>
//                           ))}
//                         </TextField>
//                       ))}
//                     </Box>
//                   </Box>

//                   <Divider sx={{ my: 2 }} />

//                   {/* Credentials Section */}
//                   <Box>
//                     <Typography 
//                       variant="subtitle1" 
//                       fontWeight={600} 
//                       sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}
//                     >
//                       <LockIcon fontSize="small" sx={{ color: '#3b82f6' }} />
//                       Secure Credentials
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                       {isEditMode 
//                         ? 'Update credentials if needed (leave blank to keep current)'
//                         : 'These credentials will be encrypted and stored securely'
//                       }
//                     </Typography>
//                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
//                       {selectedFields.map((field) => (
//                         <TextField
//                           key={`cred-${field.name}`}
//                           fullWidth
//                           name={`credentials.${field.name}`}
//                           label={`${field.label} (Credential)`}
//                           type="password"
//                           placeholder={isEditMode ? "Leave blank to keep current" : ""}
//                           value={formik.values.credentials?.[field.name] || ''}
//                           onChange={formik.handleChange}
//                           onBlur={formik.handleBlur}
//                           sx={{
//                             '& .MuiOutlinedInput-root': {
//                               borderRadius: 2,
//                               backgroundColor: 'white',
//                             },
//                             '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
//                               borderColor: '#3b82f6',
//                             },
//                             '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
//                               borderColor: '#3b82f6',
//                             },
//                           }}
//                         />
//                       ))}
//                     </Box>
//                   </Box>
//                 </>
//               )}
//             </Box>
//           </Box>
//         );

//       default:
//         return 'Unknown step';
//     }
//   };

//   const isStepValid = () => {
//     switch (activeStep) {
//       case 0:
//         return formik.values.tenantId && !formik.errors.tenantId;
//       case 1:
//         return formik.values.name && formik.values.type && 
//                !formik.errors.name && !formik.errors.type;
//       case 2:
//         const requiredFields = selectedFields.filter(field => field.required);
//         const allRequiredFilled = requiredFields.every(field => 
//           formik.values.configuration?.[field.name]?.trim()
//         );
//         return allRequiredFilled;
//       default:
//         return false;
//     }
//   };

//   // Header content based on mode
//   const headerTitle = isEditMode ? 'Edit Application' : 'Create New Application';
//   const headerDescription = isEditMode 
//     ? 'Update application details and configuration'
//     : 'Set up a new application for your business in three simple steps';
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
//       <Container maxWidth="lg">
//         <Fade in timeout={600}>
//           <Paper
//             elevation={2}
//             sx={{
//               borderRadius: 3,
//               overflow: 'hidden',
//               backgroundColor: 'white',
//               border: `1px solid ${isEditMode ? 'rgba(245, 158, 11, 0.1)' : 'rgba(59, 130, 246, 0.1)'}`,
//               boxShadow: `0 8px 32px ${isEditMode ? 'rgba(245, 158, 11, 0.08)' : 'rgba(59, 130, 246, 0.08)'}`,
//             }}
//           >
//             {/* Header */}
//             <Box
//               sx={{
//                 background: headerGradient,
//                 p: 4,
//                 color: 'white',
//                 textAlign: 'center',
//               }}
//             >
//               <AppsIcon sx={{ fontSize: 48, mb: 1, opacity: 0.9 }} />
//               <Typography variant="h4" fontWeight={600} gutterBottom>
//                 {headerTitle}
//               </Typography>
//               <Typography variant="body1" sx={{ opacity: 0.95, maxWidth: 600, mx: 'auto' }}>
//                 {headerDescription}
//               </Typography>
//             </Box>

//             {/* Stepper */}
//             <Box sx={{ px: 4, pt: 4 }}>
//               <Stepper 
//                 activeStep={activeStep} 
//                 sx={{ 
//                   mb: 4,
//                   '& .MuiStepLabel-root .Mui-completed': {
//                     color: isEditMode ? '#f59e0b' : '#3b82f6',
//                   },
//                   '& .MuiStepLabel-root .Mui-active': {
//                     color: isEditMode ? '#d97706' : '#1d4ed8',
//                   },
//                   '& .MuiStepLabel-label': {
//                     fontWeight: 600,
//                   },
//                 }}
//               >
//                 {steps.map((label) => (
//                   <Step key={label}>
//                     <StepLabel>{label}</StepLabel>
//                   </Step>
//                 ))}
//               </Stepper>
//             </Box>

//             {/* Content */}
//             <Box sx={{ px: 4, pb: 4 }}>
//               {error && (
//                 <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
//                   {error}
//                 </Alert>
//               )}

//               <Box sx={{ minHeight: 400 }}>
//                 {renderStepContent(activeStep)}
//               </Box>

//               <Divider sx={{ my: 4 }} />

//               {/* Navigation Buttons */}
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <Button
//                   onClick={activeStep === 0 ? () => navigate('/admin/businesses') : handleBack}
//                   disabled={loading}
//                   startIcon={activeStep !== 0 && <ArrowBackIcon />}
//                   size="large"
//                   sx={{
//                     borderRadius: 2,
//                     px: 3,
//                     textTransform: 'none',
//                     fontWeight: 600,
//                     color: isEditMode ? '#f59e0b' : '#3b82f6',
//                     '&:hover': {
//                       backgroundColor: isEditMode ? 'rgba(245, 158, 11, 0.04)' : 'rgba(59, 130, 246, 0.04)',
//                     },
//                   }}
//                 >
//                   {activeStep === 0 ? 'Cancel' : 'Back'}
//                 </Button>

//                 <Box sx={{ display: 'flex', gap: 2 }}>
//                   {activeStep < steps.length - 1 ? (
//                     <Button
//                       variant="contained"
//                       onClick={handleNext}
//                       disabled={!isStepValid() || loading}
//                       endIcon={<ArrowForwardIcon />}
//                       size="large"
//                       sx={{
//                         borderRadius: 2,
//                         px: 4,
//                         textTransform: 'none',
//                         fontWeight: 600,
//                         background: isEditMode 
//                           ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
//                           : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
//                         boxShadow: isEditMode 
//                           ? '0 4px 12px rgba(245, 158, 11, 0.3)'
//                           : '0 4px 12px rgba(59, 130, 246, 0.3)',
//                         '&:hover': {
//                           boxShadow: isEditMode 
//                             ? '0 6px 16px rgba(245, 158, 11, 0.4)'
//                             : '0 6px 16px rgba(59, 130, 246, 0.4)',
//                           background: isEditMode 
//                             ? 'linear-gradient(135deg, #eab308 0%, #b45309 100%)'
//                             : 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
//                         },
//                         '&:disabled': {
//                           background: 'rgba(0, 0, 0, 0.12)',
//                         },
//                       }}
//                     >
//                       Next Step
//                     </Button>
//                   ) : (
//                     <Button
//                       variant="contained"
//                       onClick={formik.handleSubmit}
//                       disabled={loading || !isStepValid()}
//                       startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
//                       size="large"
//                       sx={{
//                         borderRadius: 2,
//                         px: 4,
//                         textTransform: 'none',
//                         fontWeight: 600,
//                         background: isEditMode 
//                           ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
//                           : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
//                         boxShadow: isEditMode 
//                           ? '0 4px 12px rgba(245, 158, 11, 0.3)'
//                           : '0 4px 12px rgba(59, 130, 246, 0.3)',
//                         '&:hover': {
//                           boxShadow: isEditMode 
//                             ? '0 6px 16px rgba(245, 158, 11, 0.4)'
//                             : '0 6px 16px rgba(59, 130, 246, 0.4)',
//                           background: isEditMode 
//                             ? 'linear-gradient(135deg, #eab308 0%, #b45309 100%)'
//                             : 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
//                         },
//                         '&:disabled': {
//                           background: 'rgba(0, 0, 0, 0.12)',
//                         },
//                       }}
//                     >
//                       {loading 
//                         ? (isEditMode ? 'Updating Application...' : 'Creating Application...')
//                         : (isEditMode ? 'Update Application' : 'Create Application')
//                       }
//                     </Button>
//                   )}
//                 </Box>
//               </Box>
//             </Box>
//           </Paper>
//         </Fade>
//       </Container>
//     </Box>
//   );
// };

// export default CreateApplication;

import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { adminService } from '../../services/admin';
import { APPLICATION_TYPES, APPLICATION_TYPE_LABELS, APPLICATION_FIELDS } from '../../services/applications';
import { useNavigate } from 'react-router-dom';

const CreateApplication = ({ application, tenantId, isEditMode = false, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [businesses, setBusinesses] = useState([]);
  const [loadingBusinesses, setLoadingBusinesses] = useState(true);
  const [selectedFields, setSelectedFields] = useState([]);
const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      tenantId: tenantId || application?.tenantId || '',
      name: application?.name || '',
      type: application?.type || '',
      configuration: application?.configuration || {},
      credentials: application?.credentials || {},
    },
    validationSchema: Yup.object({
      tenantId: Yup.string().required('Tenant is required'),
      name: Yup.string()
        .required('Application name is required')
        .min(2, 'Application name must be at least 2 characters'),
      type: Yup.string()
        .required('Application type is required')
        .oneOf(Object.values(APPLICATION_TYPES)),
      configuration: Yup.object(),
      credentials: Yup.object(),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError('');
        setSuccess('');
        
        if (isEditMode && application) {
          await adminService.updateApplication(application.appId, values);
          setSuccess('Application updated successfully!');
        } else {
          await adminService.createApplication(values.tenantId, values);
          setSuccess('Application created successfully!');
        }
        
        setTimeout(() => {
          if (onSuccess) {
            onSuccess();
          }
         navigate('/admin/businesses');
        }, 1500);
      } catch (err) {
        setError(err.response?.data?.error || err.message || 
          `Failed to ${isEditMode ? 'update' : 'create'} application`);
      } finally {
        setLoading(false);
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    fetchBusinesses();
    
    if (isEditMode && application && application.type) {
      const fields = APPLICATION_FIELDS[application.type] || [];
      setSelectedFields(fields);
      
      const config = { ...application.configuration };
      const credentials = { ...application.credentials };
      
      fields.forEach(field => {
        if (config[field.name] === undefined) {
          config[field.name] = '';
        }
        if (credentials[field.name] === undefined) {
          credentials[field.name] = '';
        }
      });
      
      formik.setValues({
        tenantId: application.tenantId || '',
        name: application.name || '',
        type: application.type || '',
        configuration: config,
        credentials: credentials,
      });
    }
  }, [application, isEditMode]);

  useEffect(() => {
    if (formik.values.type && !isEditMode) {
      const fields = APPLICATION_FIELDS[formik.values.type] || [];
      setSelectedFields(fields);
      
      const config = {};
      const credentials = {};
      fields.forEach(field => {
        config[field.name] = formik.values.configuration?.[field.name] || '';
        credentials[field.name] = formik.values.credentials?.[field.name] || '';
      });
      
      if (JSON.stringify(config) !== JSON.stringify(formik.values.configuration)) {
        formik.setFieldValue('configuration', config);
      }
      if (JSON.stringify(credentials) !== JSON.stringify(formik.values.credentials)) {
        formik.setFieldValue('credentials', credentials);
      }
    }
  }, [formik.values.type, isEditMode]);

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
          {isEditMode ? 'Edit Application' : 'Create Application'}
        </h1>
        
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          marginBottom: '32px',
          marginTop: 0
        }}>
          {isEditMode ? 'Update application details and configuration' : 'Set up a new application for your business'}
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

        <div onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(); }}>
          {/* Tenant Selection */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Business Tenant *
            </label>
            <select
              name="tenantId"
              value={formik.values.tenantId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading || loadingBusinesses || isEditMode}
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: '14px',
                border: `1px solid ${formik.touched.tenantId && formik.errors.tenantId ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '6px',
                backgroundColor: isEditMode ? '#f9fafb' : '#ffffff',
                color: '#111827',
                outline: 'none',
                cursor: loading || loadingBusinesses || isEditMode ? 'not-allowed' : 'pointer'
              }}
            >
              <option value="">Select a business</option>
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
            {isEditMode && (
              <p style={{
                fontSize: '12px',
                color: '#6b7280',
                marginTop: '4px',
                marginBottom: 0
              }}>
                Tenant cannot be changed in edit mode
              </p>
            )}
          </div>

          {/* Application Name */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Application Name *
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter a descriptive name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading || !formik.values.tenantId}
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: '14px',
                border: `1px solid ${formik.touched.name && formik.errors.name ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '6px',
                backgroundColor: loading || !formik.values.tenantId ? '#f9fafb' : '#ffffff',
                color: '#111827',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            {formik.touched.name && formik.errors.name && (
              <p style={{
                fontSize: '12px',
                color: '#ef4444',
                marginTop: '4px',
                marginBottom: 0
              }}>
                {formik.errors.name}
              </p>
            )}
          </div>

          {/* Application Type */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Application Type *
            </label>
            <select
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading || !formik.values.tenantId || isEditMode}
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: '14px',
                border: `1px solid ${formik.touched.type && formik.errors.type ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '6px',
                backgroundColor: isEditMode ? '#f9fafb' : '#ffffff',
                color: '#111827',
                outline: 'none',
                cursor: loading || !formik.values.tenantId || isEditMode ? 'not-allowed' : 'pointer'
              }}
            >
              <option value="">Select type</option>
              {Object.entries(APPLICATION_TYPE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {formik.touched.type && formik.errors.type && (
              <p style={{
                fontSize: '12px',
                color: '#ef4444',
                marginTop: '4px',
                marginBottom: 0
              }}>
                {formik.errors.type}
              </p>
            )}
            {isEditMode && (
              <p style={{
                fontSize: '12px',
                color: '#6b7280',
                marginTop: '4px',
                marginBottom: 0
              }}>
                Application type cannot be changed in edit mode
              </p>
            )}
          </div>

          {/* Configuration Fields */}
          {selectedFields.length > 0 && (
            <>
              <div style={{
                borderTop: '1px solid #e5e7eb',
                marginTop: '24px',
                marginBottom: '24px'
              }}></div>

              <h2 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '16px',
                marginTop: 0
              }}>
                Configuration Settings
              </h2>

              {selectedFields.map((field) => (
                <div key={field.name} style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    {field.label}{field.required ? ' *' : ''}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      name={`configuration.${field.name}`}
                      value={formik.values.configuration?.[field.name] || ''}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={loading || (isEditMode && field.readOnly)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        fontSize: '14px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        backgroundColor: isEditMode && field.readOnly ? '#f9fafb' : '#ffffff',
                        color: '#111827',
                        outline: 'none',
                        cursor: loading || (isEditMode && field.readOnly) ? 'not-allowed' : 'pointer'
                      }}
                    >
                      <option value="">Select {field.label}</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type === 'password' ? 'password' : 'text'}
                      name={`configuration.${field.name}`}
                      value={formik.values.configuration?.[field.name] || ''}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={loading || (isEditMode && field.readOnly)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        fontSize: '14px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        backgroundColor: isEditMode && field.readOnly ? '#f9fafb' : '#ffffff',
                        color: '#111827',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  )}
                </div>
              ))}

              <div style={{
                borderTop: '1px solid #e5e7eb',
                marginTop: '24px',
                marginBottom: '24px'
              }}></div>

              {/* <h2 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '8px',
                marginTop: 0
              }}>
                Secure Credentials
              </h2>
              <p style={{
                fontSize: '13px',
                color: '#6b7280',
                marginBottom: '16px',
                marginTop: 0
              }}>
                {isEditMode 
                  ? 'Update credentials if needed (leave blank to keep current)'
                  : 'These credentials will be encrypted and stored securely'
                }
              </p>

              {selectedFields.map((field) => (
                <div key={`cred-${field.name}`} style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    {field.label} (Credential)
                  </label>
                  <input
                    type="password"
                    name={`credentials.${field.name}`}
                    placeholder={isEditMode ? "Leave blank to keep current" : ""}
                    value={formik.values.credentials?.[field.name] || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      fontSize: '14px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      backgroundColor: '#ffffff',
                      color: '#111827',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              ))} */}
            </>
          )}

          {/* Submit Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-end',
            marginTop: '32px'
          }}>
            <button
              type="button"
              onClick={() => onSuccess ? onSuccess() : null}
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
              type="button"
              onClick={() => formik.handleSubmit()}
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
              {loading 
                ? (isEditMode ? 'Updating...' : 'Creating...')
                : (isEditMode ? 'Update Application' : 'Create Application')
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateApplication;