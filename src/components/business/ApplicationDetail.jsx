// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Paper,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   Tabs,
//   Tab,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Chip,
//   IconButton,
//   Button,
// } from '@mui/material';
// import { useParams, useNavigate } from 'react-router-dom';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { adminService } from '../../services/admin';

// const ApplicationDetail = () => {
//   const { appId } = useParams();
//   const navigate = useNavigate();
//   const [application, setApplication] = useState(null);
//   const [tabValue, setTabValue] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchApplicationDetails();
//   }, [appId]);

//   const fetchApplicationDetails = async () => {
//     try {
//       setLoading(true);
//       const data = await adminService.getApplication(appId);
//       setApplication(data);
//     } catch (error) {
//       console.error('Failed to fetch application details:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const handleDelete = async () => {
//     if (window.confirm('Are you sure you want to delete this application?')) {
//       try {
//         await adminService.deleteApplication(appId);
//         navigate('/admin/applications');
//       } catch (error) {
//         console.error('Failed to delete application:', error);
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <Box sx={{ p: 3, textAlign: 'center' }}>
//         <Typography>Loading application details...</Typography>
//       </Box>
//     );
//   }

//   if (!application) {
//     return (
//       <Box sx={{ p: 3, textAlign: 'center' }}>
//         <Typography>Application not found</Typography>
//         <Button onClick={() => navigate('/admin/applications')}>
//           Back to Applications
//         </Button>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       {/* Header */}
//       <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//         <IconButton onClick={() => navigate('/admin/applications')} sx={{ mr: 2 }}>
//           <ArrowBackIcon />
//         </IconButton>
//         <Typography variant="h4">{application.name}</Typography>
//         <Chip 
//           label={application.type} 
//           color="primary" 
//           sx={{ ml: 2 }}
//         />
//         <Box sx={{ flexGrow: 1 }} />
//         <IconButton onClick={() => navigate(`/admin/applications/${appId}/edit`)}>
//           <EditIcon />
//         </IconButton>
//         <IconButton onClick={handleDelete} color="error">
//           <DeleteIcon />
//         </IconButton>
//       </Box>

//       {/* Main Content */}
//       <Grid container spacing={3}>
//         {/* Application Info */}
//         <Grid item xs={12} md={8}>
//           <Paper sx={{ p: 3 }}>
//             <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
//               <Tab label="Overview" />
//               <Tab label="Settings" />
//               <Tab label="Logs" />
//               <Tab label="Users" />
//             </Tabs>

//             {tabValue === 0 && (
//               <Box>
//                 <Typography variant="h6" gutterBottom>
//                   Application Information
//                 </Typography>
//                 <Grid container spacing={2}>
//                   <Grid item xs={6}>
//                     <Typography variant="body2" color="textSecondary">
//                       Application ID
//                     </Typography>
//                     <Typography variant="body1">{application.id}</Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body2" color="textSecondary">
//                       Business
//                     </Typography>
//                     <Typography variant="body1">
//                       {application.businessName}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body2" color="textSecondary">
//                       Status
//                     </Typography>
//                     <Chip 
//                       label={application.active ? 'Active' : 'Inactive'} 
//                       color={application.active ? 'success' : 'default'}
//                       size="small"
//                     />
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body2" color="textSecondary">
//                       Created Date
//                     </Typography>
//                     <Typography variant="body1">
//                       {new Date(application.createdAt).toLocaleDateString()}
//                     </Typography>
//                   </Grid>
//                 </Grid>

//                 {application.description && (
//                   <Box sx={{ mt: 3 }}>
//                     <Typography variant="h6" gutterBottom>
//                       Description
//                     </Typography>
//                     <Typography variant="body1">
//                       {application.description}
//                     </Typography>
//                   </Box>
//                 )}
//               </Box>
//             )}

//             {tabValue === 1 && (
//               <Box>
//                 <Typography variant="h6" gutterBottom>
//                   Application Settings
//                 </Typography>
//                 <Typography>
//                   Settings configuration will appear here...
//                 </Typography>
//               </Box>
//             )}

//             {tabValue === 2 && (
//               <Box>
//                 <Typography variant="h6" gutterBottom>
//                   Application Logs
//                 </Typography>
//                 <Typography>
//                   Recent activity logs will appear here...
//                 </Typography>
//               </Box>
//             )}

//             {tabValue === 3 && (
//               <Box>
//                 <Typography variant="h6" gutterBottom>
//                   Application Users
//                 </Typography>
//                 <TableContainer>
//                   <Table size="small">
//                     <TableHead>
//                       <TableRow>
//                         <TableCell>User</TableCell>
//                         <TableCell>Role</TableCell>
//                         <TableCell>Last Active</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       <TableRow>
//                         <TableCell colSpan={3} align="center">
//                           No users found
//                         </TableCell>
//                       </TableRow>
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               </Box>
//             )}
//           </Paper>
//         </Grid>

//         {/* Sidebar Stats */}
//         <Grid item xs={12} md={4}>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom>
//                     Quick Stats
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     API Calls Today
//                   </Typography>
//                   <Typography variant="h5">0</Typography>
                  
//                   <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
//                     Storage Used
//                   </Typography>
//                   <Typography variant="h5">0 MB</Typography>
                  
//                   <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
//                     Monthly Active Users
//                   </Typography>
//                   <Typography variant="h5">0</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>

//             <Grid item xs={12}>
//               <Paper sx={{ p: 3 }}>
//                 <Typography variant="h6" gutterBottom>
//                   Quick Actions
//                 </Typography>
//                 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//                   <Button variant="outlined" size="small">
//                     Generate API Key
//                   </Button>
//                   <Button variant="outlined" size="small">
//                     View Documentation
//                   </Button>
//                   <Button variant="outlined" size="small">
//                     Test Endpoints
//                   </Button>
//                 </Box>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default ApplicationDetail;

import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Button,
  Divider,
  LinearProgress,
  Avatar,
  Stack,
  Tooltip,
  Breadcrumbs,
  Link,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowBack,
  Edit,
  Delete,
  Settings,
  Assessment,
  People,
  History,
  Key,
  Description,
  Api,
  Storage,
  Person,
  CalendarToday,
  Business,
  CheckCircle,
  Cancel,
  MoreVert,
} from '@mui/icons-material';
import { adminService } from '../../services/admin';
import { styled } from '@mui/material/styles';

// Styled Components
const StatusChip = styled(Chip)(({ theme, status }) => ({
  fontWeight: 600,
  backgroundColor: status === 'active' 
    ? 'rgba(76, 175, 80, 0.1)'
    : 'rgba(158, 158, 158, 0.1)',
  color: status === 'active' 
    ? theme.palette.success.main
    : theme.palette.text.secondary,
  border: `1px solid ${status === 'active' 
    ? theme.palette.success.light
    : theme.palette.divider}`,
}));

const StatCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const PremiumTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTab-root': {
    textTransform: 'none',
    fontSize: '0.95rem',
    fontWeight: 500,
    minHeight: 48,
    '&.Mui-selected': {
      color: theme.palette.primary.main,
    },
  },
  '& .MuiTabs-indicator': {
    height: 3,
    borderRadius: '3px 3px 0 0',
  },
}));

const ApplicationDetail = () => {
  const { appId } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplicationDetails();
  }, [appId]);

  const fetchApplicationDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminService.getApplication(appId);
      setApplication(data);
    } catch (error) {
      console.error('Failed to fetch application details:', error);
      setError('Failed to load application details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this application? This action cannot be undone.')) {
      try {
        await adminService.deleteApplication(appId);
        navigate('/admin/applications');
      } catch (error) {
        console.error('Failed to delete application:', error);
      }
    }
  };

  const getApplicationTypeColor = (type) => {
    const colors = {
      web: '#2196F3',
      mobile: '#4CAF50',
      api: '#9C27B0',
      desktop: '#FF9800',
    };
    return colors[type?.toLowerCase()] || '#757575';
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '60vh',
        gap: 2
      }}>
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" color="text.secondary">
          Loading application details...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small" onClick={fetchApplicationDetails}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
        <Button 
          startIcon={<ArrowBack />}
          onClick={() => navigate('/admin/applications')}
        >
          Back to Applications
        </Button>
      </Box>
    );
  }

  if (!application) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          Application not found
        </Alert>
        <Button 
          variant="contained"
          onClick={() => navigate('/admin/applications')}
        >
          Back to Applications
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1400, margin: '0 auto' }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link 
          underline="hover" 
          color="inherit" 
          onClick={() => navigate('/admin/applications')}
          sx={{ cursor: 'pointer' }}
        >
          Applications
        </Link>
        <Typography color="text.primary">{application.name}</Typography>
      </Breadcrumbs>

      {/* Header Section */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          mb: 3, 
          borderRadius: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              sx={{ 
                width: 60, 
                height: 60, 
                bgcolor: 'rgba(255,255,255,0.2)',
                fontSize: '1.5rem',
                fontWeight: 'bold',
              }}
            >
              {application.name.charAt(0)}
            </Avatar>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  {application.name}
                </Typography>
                <Chip
                  label={application.type?.toUpperCase()}
                  sx={{
                    bgcolor: getApplicationTypeColor(application.type),
                    color: 'white',
                    fontWeight: 600,
                  }}
                  size="small"
                />
                <StatusChip
                  status={application.active ? 'active' : 'inactive'}
                  icon={application.active ? <CheckCircle /> : <Cancel />}
                  label={application.active ? 'Active' : 'Inactive'}
                />
              </Box>
              {application.description && (
                <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 600 }}>
                  {application.description}
                </Typography>
              )}
            </Box>
          </Box>
          
          <Stack direction="row" spacing={1}>
            <Tooltip title="Edit Application">
              <IconButton 
                onClick={() => navigate(`/admin/applications/${appId}/edit`)}
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
                }}
              >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Application">
              <IconButton 
                onClick={handleDelete}
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
                }}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} lg={8}>
          <Paper 
            elevation={0}
            sx={{ 
              borderRadius: 3,
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ px: 3, pt: 2, borderBottom: 1, borderColor: 'divider' }}>
              <PremiumTabs value={tabValue} onChange={handleTabChange}>
                <Tab icon={<Assessment />} iconPosition="start" label="Overview" />
                <Tab icon={<Settings />} iconPosition="start" label="Settings" />
                <Tab icon={<History />} iconPosition="start" label="Activity Logs" />
                <Tab icon={<People />} iconPosition="start" label="Users" />
              </PremiumTabs>
            </Box>

            <Box sx={{ p: 3 }}>
              {tabValue === 0 && (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      Application Details
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                  </Grid>
                  
                  {[
                    { 
                      label: 'Application ID', 
                      value: application.id, 
                      icon: <Key fontSize="small" /> 
                    },
                    { 
                      label: 'Business', 
                      value: application.businessName, 
                      icon: <Business fontSize="small" /> 
                    },
                    { 
                      label: 'Created Date', 
                      value: new Date(application.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }), 
                      icon: <CalendarToday fontSize="small" /> 
                    },
                    { 
                      label: 'Last Updated', 
                      value: new Date(application.updatedAt || application.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }), 
                      icon: <CalendarToday fontSize="small" /> 
                    },
                  ].map((item, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Card 
                        variant="outlined"
                        sx={{ 
                          height: '100%',
                          borderRadius: 2,
                          borderColor: 'divider',
                        }}
                      >
                        <CardContent>
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                            <Box sx={{ color: 'primary.main' }}>
                              {item.icon}
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {item.label}
                            </Typography>
                          </Stack>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {item.value}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}

              {tabValue === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Application Configuration
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  <Typography color="text.secondary">
                    Settings configuration panel will appear here...
                  </Typography>
                </Box>
              )}

              {tabValue === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Recent Activity
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Timestamp</TableCell>
                          <TableCell>Event</TableCell>
                          <TableCell>User</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                            <Assessment sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.5, mb: 1 }} />
                            <Typography color="text.secondary">
                              No activity logs available
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}

              {tabValue === 3 && (
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    User Management
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>User</TableCell>
                          <TableCell>Role</TableCell>
                          <TableCell>Last Active</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell align="right">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                            <People sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.5, mb: 1 }} />
                            <Typography color="text.secondary" gutterBottom>
                              No users assigned to this application
                            </Typography>
                            <Button variant="contained" startIcon={<Person />}>
                              Add User
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Sidebar Stats & Actions */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={3}>
            {/* Stats Cards */}
            <StatCard>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  <Assessment sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Usage Statistics
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                {[
                  { 
                    label: 'API Calls Today', 
                    value: '1,245', 
                    icon: <Api />,
                    progress: 75,
                    color: 'primary'
                  },
                  { 
                    label: 'Storage Used', 
                    value: '245 MB / 1 GB', 
                    icon: <Storage />,
                    progress: 25,
                    color: 'success'
                  },
                  { 
                    label: 'Active Users', 
                    value: '89', 
                    icon: <Person />,
                    progress: 89,
                    color: 'warning'
                  },
                ].map((stat, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" color="text.secondary">
                        <Box component="span" sx={{ mr: 1, verticalAlign: 'middle' }}>
                          {stat.icon}
                        </Box>
                        {stat.label}
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {stat.value}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={stat.progress} 
                      color={stat.color}
                      sx={{ 
                        height: 6, 
                        borderRadius: 3,
                        bgcolor: 'rgba(0,0,0,0.05)'
                      }}
                    />
                  </Box>
                ))}
              </CardContent>
            </StatCard>

            {/* Quick Actions */}
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                <Settings sx={{ verticalAlign: 'middle', mr: 1 }} />
                Quick Actions
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Stack spacing={1.5}>
                <Button
                  variant="contained"
                  startIcon={<Key />}
                  fullWidth
                  size="large"
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Generate New API Key
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Description />}
                  fullWidth
                  size="large"
                  sx={{ justifyContent: 'flex-start' }}
                >
                  View Documentation
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Api />}
                  fullWidth
                  size="large"
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Test API Endpoints
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Assessment />}
                  fullWidth
                  size="large"
                  sx={{ justifyContent: 'flex-start' }}
                >
                  View Analytics Dashboard
                </Button>
              </Stack>
            </Paper>

            {/* Quick Info */}
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Quick Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Stack spacing={1.5}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Environment
                  </Typography>
                  <Chip label="Production" size="small" color="success" variant="outlined" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Version
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    v2.1.4
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Support Contact
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    support@example.com
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ApplicationDetail;