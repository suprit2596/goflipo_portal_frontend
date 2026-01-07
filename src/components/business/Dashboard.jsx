// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Grid,
//   Typography,
//   Card,
//   CardContent,
//   Chip,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Divider,
// } from '@mui/material';
// import {
//   Business as BusinessIcon,
//   Apps as AppsIcon,
//   Email as EmailIcon,
//   Category as CategoryIcon,
//   CheckCircle as CheckCircleIcon,
//   Pending as PendingIcon,
//   Error as ErrorIcon,
// } from '@mui/icons-material';
// import DashboardCard from '../common/DashboardCard';
// import LoadingSpinner from '../common/LoadingSpinner';
// import { businessService } from '../../services/business';
// import { formatDate } from '../../utils/formatters';
// import { APPLICATION_STATUS, APPLICATION_STATUS_COLORS } from '../../utils/constants';

// const BusinessDashboard = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const data = await businessService.getDashboard();
//       setDashboardData(data);
//     } catch (err) {
//       setError(err.message || 'Failed to load dashboard data');
//       console.error('Error fetching business dashboard:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case APPLICATION_STATUS.ACTIVE:
//         return <CheckCircleIcon color="success" />;
//       case APPLICATION_STATUS.PENDING:
//         return <PendingIcon color="warning" />;
//       case APPLICATION_STATUS.INACTIVE:
//         return <ErrorIcon color="error" />;
//       default:
//         return <PendingIcon />;
//     }
//   };

//   if (loading) {
//     return <LoadingSpinner fullScreen />;
//   }

//   if (error) {
//     return (
//       <Box sx={{ p: 3 }}>
//         <Typography color="error">{error}</Typography>
//       </Box>
//     );
//   }

//   if (!dashboardData) {
//     return (
//       <Box sx={{ p: 3 }}>
//         <Typography>No dashboard data available</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Business Dashboard
//       </Typography>
      
//       <Typography variant="h5" gutterBottom sx={{ mt: 3, mb: 2 }}>
//         {dashboardData.businessName}
//       </Typography>
      
//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card>
//             <CardContent>
//               <BusinessIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
//               <Typography variant="h6" gutterBottom>
//                 Business Details
//               </Typography>
//               <List dense>
//                 <ListItem disablePadding sx={{ mb: 1 }}>
//                   <ListItemIcon sx={{ minWidth: 36 }}>
//                     <CategoryIcon fontSize="small" />
//                   </ListItemIcon>
//                   <ListItemText 
//                     primary="Industry" 
//                     secondary={dashboardData.industry || 'N/A'} 
//                   />
//                 </ListItem>
//                 <ListItem disablePadding>
//                   <ListItemIcon sx={{ minWidth: 36 }}>
//                     <EmailIcon fontSize="small" />
//                   </ListItemIcon>
//                   <ListItemText 
//                     primary="Contact Email" 
//                     secondary={dashboardData.contactEmail || 'N/A'} 
//                   />
//                 </ListItem>
//               </List>
//             </CardContent>
//           </Card>
//         </Grid>
        
//         <Grid item xs={12} sm={6} md={3}>
//           <DashboardCard
//             title="Total Applications"
//             value={dashboardData.totalApplications}
//             icon={<AppsIcon fontSize="large" />}
//           />
//         </Grid>
        
//         <Grid item xs={12} md={6}>
//           <Card sx={{ height: '100%' }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Application Status
//               </Typography>
//               <Grid container spacing={2}>
//                 {Object.values(APPLICATION_STATUS).map((status) => {
//                   const count = dashboardData.applications?.filter(
//                     app => app.status === status
//                   ).length || 0;
                  
//                   return (
//                     <Grid item xs={4} key={status}>
//                       <Box sx={{ textAlign: 'center' }}>
//                         {getStatusIcon(status)}
//                         <Typography variant="h4" sx={{ mt: 1 }}>
//                           {count}
//                         </Typography>
//                         <Typography variant="body2" color="textSecondary">
//                           {status}
//                         </Typography>
//                       </Box>
//                     </Grid>
//                   );
//                 })}
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
      
//       <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
//         Applications
//       </Typography>
      
//       {dashboardData.applications?.length > 0 ? (
//         <Grid container spacing={3}>
//           {dashboardData.applications.map((app) => (
//             <Grid item xs={12} sm={6} md={4} key={app.appId}>
//               <Card>
//                 <CardContent>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//                     <Typography variant="h6" gutterBottom>
//                       {app.name}
//                     </Typography>
//                     <Chip
//                       label={app.status}
//                       color={APPLICATION_STATUS_COLORS[app.status] || 'default'}
//                       size="small"
//                     />
//                   </Box>
                  
//                   <Typography variant="body2" color="textSecondary" paragraph>
//                     Type: {app.type}
//                   </Typography>
                  
//                   {app.description && (
//                     <Typography variant="body2" paragraph>
//                       {app.description}
//                     </Typography>
//                   )}
                  
//                   <Box sx={{ mt: 2 }}>
//                     <Typography variant="caption" color="textSecondary">
//                       Created: {formatDate(app.createdAt)}
//                     </Typography>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         <Card>
//           <CardContent>
//             <Typography align="center" color="textSecondary">
//               No applications found. Contact your administrator to add applications.
//             </Typography>
//           </CardContent>
//         </Card>
//       )}
//     </Box>
//   );
// };

// export default BusinessDashboard;

import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Fade,
  Paper,
  Avatar,
} from '@mui/material';
import {
  Business as BusinessIcon,
  Apps as AppsIcon,
  Email as EmailIcon,
  Category as CategoryIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Error as ErrorIcon,
  TrendingUp,
  AccessTime,
} from '@mui/icons-material';
import DashboardCard from '../common/DashboardCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { businessService } from '../../services/business';
import { formatDate } from '../../utils/formatters';
import { APPLICATION_STATUS, APPLICATION_STATUS_COLORS } from '../../utils/constants';

const BusinessDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await businessService.getDashboard();
      setDashboardData(data);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data');
      console.error('Error fetching business dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case APPLICATION_STATUS.ACTIVE:
        return <CheckCircleIcon sx={{ color: '#10b981' }} />;
      case APPLICATION_STATUS.PENDING:
        return <PendingIcon sx={{ color: '#f59e0b' }} />;
      case APPLICATION_STATUS.INACTIVE:
        return <ErrorIcon sx={{ color: '#ef4444' }} />;
      default:
        return <PendingIcon sx={{ color: '#94a3b8' }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case APPLICATION_STATUS.ACTIVE:
        return { bg: '#ecfdf5', text: '#10b981', border: '#a7f3d0' };
      case APPLICATION_STATUS.PENDING:
        return { bg: '#fef3c7', text: '#f59e0b', border: '#fcd34d' };
      case APPLICATION_STATUS.INACTIVE:
        return { bg: '#fee2e2', text: '#ef4444', border: '#fca5a5' };
      default:
        return { bg: '#f1f5f9', text: '#64748b', border: '#cbd5e1' };
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', background: '#f8fafc', py: 4 }}>
        <Container maxWidth="xl">
          <Paper
            sx={{
              p: 4,
              textAlign: 'center',
              borderRadius: 3,
              background: '#fef2f2',
              border: '1px solid #fecaca',
            }}
          >
            <Typography color="error" variant="h6">
              {error}
            </Typography>
          </Paper>
        </Container>
      </Box>
    );
  }

  if (!dashboardData) {
    return (
      <Box sx={{ minHeight: '100vh', background: '#f8fafc', py: 4 }}>
        <Container maxWidth="xl">
          <Typography>No dashboard data available</Typography>
        </Container>
      </Box>
    );
  }

  const statusCounts = {
    ACTIVE: dashboardData.applications?.filter(app => app.status === APPLICATION_STATUS.ACTIVE).length || 0,
    PENDING: dashboardData.applications?.filter(app => app.status === APPLICATION_STATUS.PENDING).length || 0,
    INACTIVE: dashboardData.applications?.filter(app => app.status === APPLICATION_STATUS.INACTIVE).length || 0,
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f8fafc', py: 4 }}>
      <Container maxWidth="xl">
        <Fade in timeout={600}>
          <Box>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h3" fontWeight={700} sx={{ color: '#0f172a', mb: 1 }}>
                Business Dashboard
              </Typography>
              <Typography variant="body1" sx={{ color: '#64748b' }}>
                Overview of your business and applications
              </Typography>
            </Box>

            {/* Business Info Card */}
            <Fade in timeout={700}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  mb: 4,
                  border: '1px solid #e2e8f0',
                  background: 'white',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    p: 3,
                    color: 'white',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      sx={{
                        width: 56,
                        height: 56,
                        background: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                      }}
                    >
                      <BusinessIcon sx={{ fontSize: 32 }} />
                    </Avatar>
                    <Box>
                      <Typography variant="h5" fontWeight={700}>
                        {dashboardData.businessName}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                        Your business profile and applications
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                
                <Box sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ background: '#f1f5f9', color: '#667eea' }}>
                          <CategoryIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="caption" color="text.secondary" fontWeight={600}>
                            Industry
                          </Typography>
                          <Typography variant="body1" fontWeight={600}>
                            {dashboardData.industry || 'N/A'}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ background: '#f1f5f9', color: '#667eea' }}>
                          <EmailIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="caption" color="text.secondary" fontWeight={600}>
                            Contact Email
                          </Typography>
                          <Typography variant="body1" fontWeight={600}>
                            {dashboardData.contactEmail || 'N/A'}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Fade>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Fade in timeout={800}>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      p: 3,
                      border: '1px solid #e2e8f0',
                      background: 'white',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary" fontWeight={600}>
                          Total Applications
                        </Typography>
                        <Typography variant="h3" fontWeight={700} sx={{ color: '#0f172a', mt: 1 }}>
                          {dashboardData.totalApplications}
                        </Typography>
                      </Box>
                      <Avatar sx={{ background: '#ede9fe', color: '#7c3aed' }}>
                        <AppsIcon />
                      </Avatar>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#10b981' }}>
                      {/* <TrendingUp fontSize="small" /> */}
                      {/* <Typography variant="caption" fontWeight={600}>
                        All integrations
                      </Typography> */}
                    </Box>
                  </Paper>
                </Fade>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Fade in timeout={900}>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      p: 3,
                      border: '1px solid #d1fae5',
                      background: '#ecfdf5',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 24px rgba(16, 185, 129, 0.15)',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="body2" sx={{ color: '#059669', fontWeight: 600 }}>
                          Active
                        </Typography>
                        <Typography variant="h3" fontWeight={700} sx={{ color: '#047857', mt: 1 }}>
                          {statusCounts.ACTIVE}
                        </Typography>
                      </Box>
                      <Avatar sx={{ background: '#d1fae5', color: '#10b981' }}>
                        <CheckCircleIcon />
                      </Avatar>
                    </Box>
                    {/* <Typography variant="caption" sx={{ color: '#059669', fontWeight: 600 }}>
                      Running smoothly
                    </Typography> */}
                  </Paper>
                </Fade>
              </Grid>

              {/* <Grid item xs={12} sm={6} md={3}>
                <Fade in timeout={1000}>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      p: 3,
                      border: '1px solid #fde68a',
                      background: '#fef3c7',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 24px rgba(245, 158, 11, 0.15)',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="body2" sx={{ color: '#d97706', fontWeight: 600 }}>
                          Pending
                        </Typography>
                        <Typography variant="h3" fontWeight={700} sx={{ color: '#b45309', mt: 1 }}>
                          {statusCounts.PENDING}
                        </Typography>
                      </Box>
                      <Avatar sx={{ background: '#fde68a', color: '#f59e0b' }}>
                        <PendingIcon />
                      </Avatar>
                    </Box>
                    <Typography variant="caption" sx={{ color: '#d97706', fontWeight: 600 }}>
                      In configuration
                    </Typography>
                  </Paper>
                </Fade>
              </Grid> */}

              <Grid item xs={12} sm={6} md={3}>
                <Fade in timeout={1100}>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      p: 3,
                      border: '1px solid #fecaca',
                      background: '#fee2e2',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 24px rgba(239, 68, 68, 0.15)',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="body2" sx={{ color: '#dc2626', fontWeight: 600 }}>
                          Inactive
                        </Typography>
                        <Typography variant="h3" fontWeight={700} sx={{ color: '#b91c1c', mt: 1 }}>
                          {statusCounts.INACTIVE}
                        </Typography>
                      </Box>
                      <Avatar sx={{ background: '#fecaca', color: '#ef4444' }}>
                        <ErrorIcon />
                      </Avatar>
                    </Box>
                    {/* <Typography variant="caption" sx={{ color: '#dc2626', fontWeight: 600 }}>
                      Needs attention
                    </Typography> */}
                  </Paper>
                </Fade>
              </Grid>
            </Grid>

            {/* Applications Section */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" fontWeight={700} sx={{ color: '#0f172a', mb: 1 }}>
                Your Applications
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Manage and monitor your integrated applications
              </Typography>
            </Box>

            {dashboardData.applications?.length > 0 ? (
              <Grid container spacing={3}>
                {dashboardData.applications.map((app, index) => {
                  const statusColor = getStatusColor(app.status);
                  return (
                    <Grid item xs={12} sm={6} md={4} key={app.appId}>
                      <Fade in timeout={1200 + index * 100}>
                        <Paper
                          elevation={0}
                          sx={{
                            borderRadius: 3,
                            border: '1px solid #e2e8f0',
                            background: 'white',
                            height: '100%',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)',
                              borderColor: '#cbd5e1',
                            },
                          }}
                        >
                          <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                              <Typography variant="h6" fontWeight={700} sx={{ color: '#0f172a' }}>
                                {app.name}
                              </Typography>
                              <Chip
                                label={app.status}
                                size="small"
                                sx={{
                                  backgroundColor: statusColor.bg,
                                  color: statusColor.text,
                                  border: `1px solid ${statusColor.border}`,
                                  fontWeight: 600,
                                  fontSize: '0.7rem',
                                }}
                              />
                            </Box>

                            <Box
                              sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                px: 1.5,
                                py: 0.5,
                                borderRadius: 1.5,
                                background: '#f1f5f9',
                                mb: 2,
                              }}
                            >
                              <Typography variant="caption" fontWeight={600} sx={{ color: '#64748b' }}>
                                {app.type}
                              </Typography>
                            </Box>

                            {app.description && (
                              <Typography
                                variant="body2"
                                sx={{
                                  color: '#64748b',
                                  mb: 2,
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                }}
                              >
                                {app.description}
                              </Typography>
                            )}

                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                mt: 3,
                                pt: 2,
                                borderTop: '1px solid #f1f5f9',
                              }}
                            >
                              <AccessTime sx={{ fontSize: 16, color: '#94a3b8' }} />
                              <Typography variant="caption" sx={{ color: '#64748b' }}>
                                Created {formatDate(app.createdAt)}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Paper>
                      </Fade>
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <Fade in timeout={1200}>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    border: '1px solid #e2e8f0',
                    background: 'white',
                    p: 6,
                    textAlign: 'center',
                  }}
                >
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      background: '#f1f5f9',
                      color: '#94a3b8',
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    <AppsIcon sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Typography variant="h6" fontWeight={600} sx={{ color: '#0f172a', mb: 1 }}>
                    No Applications Yet
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    Contact your administrator to add applications to your business.
                  </Typography>
                </Paper>
              </Fade>
            )}
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default BusinessDashboard;