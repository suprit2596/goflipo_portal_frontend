// import React, { useState, useEffect } from 'react';
// import {
//   Grid,
//   Typography,
//   Box,
//   Paper,
//   Card,
//   CardContent,
// } from '@mui/material';
// import {
//   Business as BusinessIcon,
//   Apps as AppsIcon,
//   TrendingUp,
//   People as PeopleIcon,
// } from '@mui/icons-material';
// import DashboardCard from '../common/DashboardCard';
// import DataTable from '../common/DataTable';
// import LoadingSpinner from '../common/LoadingSpinner';
// import { adminService } from '../../services/admin';
// import { formatDate } from '../../utils/formatters';
// import { BUSINESS_STATUS_COLORS } from '../../utils/constants';

// const AdminDashboard = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const data = await adminService.getDashboard();
//       setDashboardData(data);
//     } catch (err) {
//       setError(err.message || 'Failed to load dashboard data');
//       console.error('Error fetching dashboard:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const businessColumns = [
//     {
//       field: 'businessName',
//       headerName: 'Business Name',
//       sortable: true,
//     },
//     {
//       field: 'industry',
//       headerName: 'Industry',
//       sortable: true,
//     },
//     {
//       field: 'email',
//       headerName: 'Contact Email',
//       sortable: true,
//     },
//     {
//       field: 'applicationCount',
//       headerName: 'Applications',
//       sortable: true,
//       align: 'right',
//     },
//     {
//       field: 'status',
//       headerName: 'Status',
//       sortable: true,
//       type: 'status',
//       statusColors: BUSINESS_STATUS_COLORS,
//     },
//   ];

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
//         Admin Dashboard
//       </Typography>
      
//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         <Grid item xs={12} sm={6} md={3}>
//           <DashboardCard
//             title="Total Businesses"
//             value={dashboardData.totalBusinesses}
//             icon={<BusinessIcon fontSize="large" />}
//             trend="up"
//             trendValue="12%"
//           />
//         </Grid>
        
//         <Grid item xs={12} sm={6} md={3}>
//           <DashboardCard
//             title="Active Businesses"
//             value={dashboardData.activeBusinesses}
//             icon={<TrendingUp fontSize="large" />}
//             trend="up"
//             trendValue="8%"
//           />
//         </Grid>
        
//         {Object.entries(dashboardData.applicationsByType || {}).map(([type, count], index) => (
//           <Grid item xs={12} sm={6} md={3} key={type}>
//             <DashboardCard
//               title={`${type} Apps`}
//               value={count}
//               icon={<AppsIcon fontSize="large" />}
//             />
//           </Grid>
//         ))}
//       </Grid>
      
//       <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
//         Recent Businesses
//       </Typography>
      
//       <Paper sx={{ p: 2, mb: 3 }}>
//         <DataTable
//           columns={businessColumns}
//           data={dashboardData.recentBusinesses || []}
//           page={page}
//           rowsPerPage={rowsPerPage}
//           totalRows={dashboardData.recentBusinesses?.length || 0}
//           onPageChange={setPage}
//           onRowsPerPageChange={setRowsPerPage}
//         />
//       </Paper>
      
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Applications by Type
//               </Typography>
//               {dashboardData.applicationsByType && Object.entries(dashboardData.applicationsByType).map(([type, count]) => (
//                 <Box key={type} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//                   <Typography variant="body2">{type}</Typography>
//                   <Typography variant="body2" fontWeight="bold">{count}</Typography>
//                 </Box>
//               ))}
//             </CardContent>
//           </Card>
//         </Grid>
        
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Quick Stats
//               </Typography>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//                 <Typography variant="body2">Total Applications</Typography>
//                 <Typography variant="body2" fontWeight="bold">
//                   {Object.values(dashboardData.applicationsByType || {}).reduce((a, b) => a + b, 0)}
//                 </Typography>
//               </Box>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//                 <Typography variant="body2">Avg Apps per Business</Typography>
//                 <Typography variant="body2" fontWeight="bold">
//                   {dashboardData.totalBusinesses > 0 
//                     ? (Object.values(dashboardData.applicationsByType || {}).reduce((a, b) => a + b, 0) / dashboardData.totalBusinesses).toFixed(1)
//                     : 0}
//                 </Typography>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default AdminDashboard;

// import React, { useState, useEffect } from 'react';
// import {
//   Grid,
//   Typography,
//   Box,
//   Paper,
//   Card,
//   CardContent,
//   Container,
//   Fade,
//   LinearProgress,
//   Chip,
  

// } from '@mui/material';
// import {
//   Business as BusinessIcon,
//   Apps as AppsIcon,
//   TrendingUp,
//   People as PeopleIcon,
//   CheckCircle,
//   Whatshot,
//   Category as CategoryIcon,
// } from '@mui/icons-material';
// import DashboardCard from '../common/DashboardCard';
// import DataTable from '../common/DataTable';
// import LoadingSpinner from '../common/LoadingSpinner';
// import { adminService } from '../../services/admin';
// import { formatDate } from '../../utils/formatters';
// import { BUSINESS_STATUS_COLORS } from '../../utils/constants';

// const AdminDashboard = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const data = await adminService.getDashboard();
//       setDashboardData(data);
//     } catch (err) {
//       setError(err.message || 'Failed to load dashboard data');
//       console.error('Error fetching dashboard:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const businessColumns = [
//     {
//       field: 'businessName',
//       headerName: 'Business Name',
//       sortable: true,
//     },
//     {
//       field: 'industry',
//       headerName: 'Industry',
//       sortable: true,
//     },
//     {
//       field: 'email',
//       headerName: 'Contact Email',
//       sortable: true,
//     },
//     {
//       field: 'applicationCount',
//       headerName: 'Applications',
//       sortable: true,
//       align: 'right',
//     },
//     {
//       field: 'status',
//       headerName: 'Status',
//       sortable: true,
//       type: 'status',
//       statusColors: BUSINESS_STATUS_COLORS,
//     },
//   ];

//   if (loading) {
//     return <LoadingSpinner fullScreen />;
//   }

//   if (error) {
//     return (
//       <Container maxWidth="xl" sx={{ py: 4 }}>
//         <Paper
//           sx={{
//             p: 4,
//             textAlign: 'center',
//             borderRadius: 3,
//             background: 'linear-gradient(135deg, #fff5f5 0%, #ffe5e5 100%)',
//           }}
//         >
//           <Typography color="error" variant="h6">
//             {error}
//           </Typography>
//         </Paper>
//       </Container>
//     );
//   }

//   if (!dashboardData) {
//     return (
//       <Container maxWidth="xl" sx={{ py: 4 }}>
//         <Typography>No dashboard data available</Typography>
//       </Container>
//     );
//   }

//   const totalApps = Object.values(dashboardData.applicationsByType || {}).reduce((a, b) => a + b, 0);
//   const avgAppsPerBusiness = dashboardData.totalBusinesses > 0 
//     ? (totalApps / dashboardData.totalBusinesses).toFixed(1)
//     : 0;

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//         py: 4,
//       }}
//     >
//       <Container maxWidth="xl">
//         <Fade in timeout={600}>
//           <Box>
//             {/* Header */}
//             <Box sx={{ mb: 4, color: 'white' }}>
//               <Typography variant="h3" fontWeight={700} gutterBottom>
//                 Admin Dashboard
//               </Typography>
             
//             </Box>

//             {/* Stats Cards */}
//             <Grid container spacing={3} sx={{ mb: 4 }}>
//               <Grid item xs={12} sm={6} md={3}>
//                 <Fade in timeout={700}>
//                   <Card
//                     sx={{
//                       borderRadius: 3,
//                       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                       color: 'white',
//                       height: '100%',
//                       position: 'relative',
//                       overflow: 'hidden',
//                       boxShadow: '0 8px 24px rgba(102, 126, 234, 0.35)',
//                       transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                       '&:hover': {
//                         transform: 'translateY(-8px)',
//                         boxShadow: '0 12px 32px rgba(102, 126, 234, 0.45)',
//                       },
//                     }}
//                   >
//                     <CardContent sx={{ p: 3 }}>
//                       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//                         <Box>
//                           <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
//                             Total Businesses
//                           </Typography>
//                           <Typography variant="h3" fontWeight={700}>
//                             {dashboardData.totalBusinesses}
//                           </Typography>
//                           <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            
                            
//                           </Box>
//                         </Box>
//                         <Box
//                           sx={{
//                             backgroundColor: 'rgba(255, 255, 255, 0.2)',
//                             borderRadius: 2,
//                             p: 1.5,
//                           }}
//                         >
//                           <BusinessIcon sx={{ fontSize: 40 }} />
//                         </Box>
//                       </Box>
//                     </CardContent>
//                     <Box
//                       sx={{
//                         position: 'absolute',
//                         bottom: 0,
//                         left: 0,
//                         right: 0,
//                         height: 4,
//                         background: 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.6) 100%)',
//                       }}
//                     />
//                   </Card>
//                 </Fade>
//               </Grid>

//               <Grid item xs={12} sm={6} md={3}>
//                 <Fade in timeout={800}>
//                   <Card
//                     sx={{
//                       borderRadius: 3,
//                       background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
//                       color: 'white',
//                       height: '100%',
//                       position: 'relative',
//                       overflow: 'hidden',
//                       boxShadow: '0 8px 24px rgba(245, 87, 108, 0.35)',
//                       transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                       '&:hover': {
//                         transform: 'translateY(-8px)',
//                         boxShadow: '0 12px 32px rgba(245, 87, 108, 0.45)',
//                       },
//                     }}
//                   >
//                     <CardContent sx={{ p: 3 }}>
//                       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//                         <Box>
//                           <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
//                             Active Businesses
//                           </Typography>
//                           <Typography variant="h3" fontWeight={700}>
//                             {dashboardData.activeBusinesses}
//                           </Typography>
//                           <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                           
                           
//                           </Box>
//                         </Box>
//                         <Box
//                           sx={{
//                             backgroundColor: 'rgba(255, 255, 255, 0.2)',
//                             borderRadius: 2,
//                             p: 1.5,
//                           }}
//                         >
//                           <Whatshot sx={{ fontSize: 40 }} />
//                         </Box>
//                       </Box>
//                     </CardContent>
//                     <Box
//                       sx={{
//                         position: 'absolute',
//                         bottom: 0,
//                         left: 0,
//                         right: 0,
//                         height: 4,
//                         background: 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.6) 100%)',
//                       }}
//                     />
//                   </Card>
//                 </Fade>
//               </Grid>

//               <Grid item xs={12} sm={6} md={3}>
//                 <Fade in timeout={900}>
//                   <Card
//                     sx={{
//                       borderRadius: 3,
//                       background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
//                       color: 'white',
//                       height: '100%',
//                       position: 'relative',
//                       overflow: 'hidden',
//                       boxShadow: '0 8px 24px rgba(0, 242, 254, 0.35)',
//                       transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                       '&:hover': {
//                         transform: 'translateY(-8px)',
//                         boxShadow: '0 12px 32px rgba(0, 242, 254, 0.45)',
//                       },
//                     }}
//                   >
//                     <CardContent sx={{ p: 3 }}>
//                       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//                         <Box>
//                           <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
//                             Total Applications
//                           </Typography>
//                           <Typography variant="h3" fontWeight={700}>
//                             {totalApps}
//                           </Typography>
//                           <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
//                             <AppsIcon fontSize="small" sx={{ mr: 0.5 }} />
//                             <Typography variant="caption">Across all businesses</Typography>
//                           </Box>
//                         </Box>
//                         <Box
//                           sx={{
//                             backgroundColor: 'rgba(255, 255, 255, 0.2)',
//                             borderRadius: 2,
//                             p: 1.5,
//                           }}
//                         >
//                           <AppsIcon sx={{ fontSize: 40 }} />
//                         </Box>
//                       </Box>
//                     </CardContent>
//                     <Box
//                       sx={{
//                         position: 'absolute',
//                         bottom: 0,
//                         left: 0,
//                         right: 0,
//                         height: 4,
//                         background: 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.6) 100%)',
//                       }}
//                     />
//                   </Card>
//                 </Fade>
//               </Grid>

//               <Grid item xs={12} sm={6} md={3}>
//                 <Fade in timeout={1000}>
//                   <Card
//                     sx={{
//                       borderRadius: 3,
//                       background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
//                       color: 'white',
//                       height: '100%',
//                       position: 'relative',
//                       overflow: 'hidden',
//                       boxShadow: '0 8px 24px rgba(56, 249, 215, 0.35)',
//                       transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                       '&:hover': {
//                         transform: 'translateY(-8px)',
//                         boxShadow: '0 12px 32px rgba(56, 249, 215, 0.45)',
//                       },
//                     }}
//                   >
//                     <CardContent sx={{ p: 3 }}>
//                       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//                         <Box>
//                           <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
//                             Avg Apps/Business
//                           </Typography>
//                           <Typography variant="h3" fontWeight={700}>
//                             {avgAppsPerBusiness}
//                           </Typography>
//                           <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
//                             <PeopleIcon fontSize="small" sx={{ mr: 0.5 }} />
//                             <Typography variant="caption">Per tenant</Typography>
//                           </Box>
//                         </Box>
//                         <Box
//                           sx={{
//                             backgroundColor: 'rgba(255, 255, 255, 0.2)',
//                             borderRadius: 2,
//                             p: 1.5,
//                           }}
//                         >
//                           <TrendingUp sx={{ fontSize: 40 }} />
//                         </Box>
//                       </Box>
//                     </CardContent>
//                     <Box
//                       sx={{
//                         position: 'absolute',
//                         bottom: 0,
//                         left: 0,
//                         right: 0,
//                         height: 4,
//                         background: 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.6) 100%)',
//                       }}
//                     />
//                   </Card>
//                 </Fade>
//               </Grid>
//             </Grid>

//             {/* Recent Businesses Table */}
//             <Fade in timeout={1100}>
//               <Paper
//                 sx={{
//                   borderRadius: 3,
//                   overflow: 'hidden',
//                   mb: 3,
//                   boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
//                 }}
//               >
//                 <Box
//                   sx={{
//                     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                     p: 3,
//                     color: 'white',
//                   }}
//                 >
//                   <Typography variant="h5" fontWeight={600}>
//                     Recent Businesses
//                   </Typography>
//                   <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
//                     Latest onboarded tenants on your platform
//                   </Typography>
//                 </Box>
//                 <Box sx={{ p: 3 }}>
//                   <DataTable
//                     columns={businessColumns}
//                     data={dashboardData.recentBusinesses || []}
//                     page={page}
//                     rowsPerPage={rowsPerPage}
//                     totalRows={dashboardData.recentBusinesses?.length || 0}
//                     onPageChange={setPage}
//                     onRowsPerPageChange={setRowsPerPage}
//                   />
//                 </Box>
//               </Paper>
//             </Fade>

          
//           </Box>
//         </Fade>
//       </Container>
//     </Box>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Box,
  Paper,
  Card,
  CardContent,
  Container,
  Fade,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Business as BusinessIcon,
  Apps as AppsIcon,
  TrendingUp,
  People as PeopleIcon,
  CheckCircle,
  Whatshot,
} from '@mui/icons-material';
import DashboardCard from '../common/DashboardCard';
import DataTable from '../common/DataTable';
import LoadingSpinner from '../common/LoadingSpinner';
import { adminService } from '../../services/admin';
import { formatDate } from '../../utils/formatters';
import { BUSINESS_STATUS_COLORS } from '../../utils/constants';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await adminService.getDashboard();
      setDashboardData(data);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data');
      console.error('Error fetching dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const businessColumns = [
    {
      field: 'businessName',
      headerName: 'Business Name',
      sortable: true,
    },
    {
      field: 'industry',
      headerName: 'Industry',
      sortable: true,
    },
    {
      field: 'email',
      headerName: 'Contact Email',
      sortable: true,
    },
    {
      field: 'applicationCount',
      headerName: 'Applications',
      sortable: true,
      align: 'right',
    },
    {
      field: 'status',
      headerName: 'Status',
      sortable: true,
      type: 'status',
      statusColors: BUSINESS_STATUS_COLORS,
    },
  ];

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

  const totalApps = Object.values(dashboardData.applicationsByType || {}).reduce((a, b) => a + b, 0);
  const avgAppsPerBusiness = dashboardData.totalBusinesses > 0 
    ? (totalApps / dashboardData.totalBusinesses).toFixed(1)
    : 0;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#f8fafc',
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        <Fade in timeout={600}>
          <Box>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h3" fontWeight={700} sx={{ color: '#0f172a', mb: 1 }}>
                Admin Dashboard
              </Typography>
              <Typography variant="body1" sx={{ color: '#64748b' }}>
                Monitor and manage your platform's businesses and applications
              </Typography>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {/* Total Businesses */}
              <Grid item xs={12} sm={6} md={3}>
                <Fade in timeout={700}>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      p: 3,
                      border: '1px solid #e0e7ff',
                      background: '#f0f4ff',
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 24px rgba(99, 102, 241, 0.12)',
                        borderColor: '#c7d2fe',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="body2" sx={{ color: '#6366f1', fontWeight: 600, mb: 1 }}>
                          Total Businesses
                        </Typography>
                        <Typography variant="h3" fontWeight={700} sx={{ color: '#4338ca' }}>
                          {dashboardData.totalBusinesses}
                        </Typography>
                      </Box>
                      <Avatar sx={{ background: '#e0e7ff', color: '#6366f1', width: 48, height: 48 }}>
                        <BusinessIcon />
                      </Avatar>
                    </Box>
                    <Typography variant="caption" sx={{ color: '#6366f1', fontWeight: 600 }}>
                      All registered tenants
                    </Typography>
                  </Paper>
                </Fade>
              </Grid>

              {/* Active Businesses */}
              <Grid item xs={12} sm={6} md={3}>
                <Fade in timeout={800}>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      p: 3,
                      border: '1px solid #d1fae5',
                      background: '#ecfdf5',
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 24px rgba(16, 185, 129, 0.12)',
                        borderColor: '#a7f3d0',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="body2" sx={{ color: '#10b981', fontWeight: 600, mb: 1 }}>
                          Active Businesses
                        </Typography>
                        <Typography variant="h3" fontWeight={700} sx={{ color: '#047857' }}>
                          {dashboardData.activeBusinesses}
                        </Typography>
                      </Box>
                      <Avatar sx={{ background: '#d1fae5', color: '#10b981', width: 48, height: 48 }}>
                        <CheckCircle />
                      </Avatar>
                    </Box>
                    <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 600 }}>
                      Currently operational
                    </Typography>
                  </Paper>
                </Fade>
              </Grid>

              {/* Total Applications */}
              <Grid item xs={12} sm={6} md={3}>
                <Fade in timeout={900}>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      p: 3,
                      border: '1px solid #e0f2fe',
                      background: '#f0f9ff',
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 24px rgba(14, 165, 233, 0.12)',
                        borderColor: '#bae6fd',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="body2" sx={{ color: '#0ea5e9', fontWeight: 600, mb: 1 }}>
                          Total Applications
                        </Typography>
                        <Typography variant="h3" fontWeight={700} sx={{ color: '#0369a1' }}>
                          {totalApps}
                        </Typography>
                      </Box>
                      <Avatar sx={{ background: '#e0f2fe', color: '#0ea5e9', width: 48, height: 48 }}>
                        <AppsIcon />
                      </Avatar>
                    </Box>
                    <Typography variant="caption" sx={{ color: '#0ea5e9', fontWeight: 600 }}>
                      Across all businesses
                    </Typography>
                  </Paper>
                </Fade>
              </Grid>

              {/* Avg Apps/Business */}
              {/* <Grid item xs={12} sm={6} md={3}>
                <Fade in timeout={1000}>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      p: 3,
                      border: '1px solid #fce7f3',
                      background: '#fdf2f8',
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 24px rgba(236, 72, 153, 0.12)',
                        borderColor: '#fbcfe8',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="body2" sx={{ color: '#ec4899', fontWeight: 600, mb: 1 }}>
                          Avg Apps/Business
                        </Typography>
                        <Typography variant="h3" fontWeight={700} sx={{ color: '#be185d' }}>
                          {avgAppsPerBusiness}
                        </Typography>
                      </Box>
                      <Avatar sx={{ background: '#fce7f3', color: '#ec4899', width: 48, height: 48 }}>
                        <TrendingUp />
                      </Avatar>
                    </Box>
                    <Typography variant="caption" sx={{ color: '#ec4899', fontWeight: 600 }}>
                      Per tenant average
                    </Typography>
                  </Paper>
                </Fade>
              </Grid> */}
            </Grid>

            {/* Recent Businesses Table */}
            <Fade in timeout={1100}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: '1px solid #e2e8f0',
                  background: 'white',
                }}
              >
                <Box
                  sx={{
                    background: 'linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)',
                    p: 3,
                    borderBottom: '1px solid #e2e8f0',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ background: '#6366f1', width: 40, height: 40 }}>
                      <BusinessIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={700} sx={{ color: '#0f172a' }}>
                        Recent Businesses
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#64748b' }}>
                        Latest onboarded tenants on your platform
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ p: 3, background: '#fafafa' }}>
                  <DataTable
                    columns={businessColumns}
                    data={dashboardData.recentBusinesses || []}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    totalRows={dashboardData.recentBusinesses?.length || 0}
                    onPageChange={setPage}
                    onRowsPerPageChange={setRowsPerPage}
                  />
                </Box>
              </Paper>
            </Fade>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default AdminDashboard;