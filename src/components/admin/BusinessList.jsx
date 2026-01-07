// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   TextField,
//   Grid,
//   Chip,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from '@mui/material';
// import {
//   Add as AddIcon,
//   Search as SearchIcon,
//   FilterList as FilterIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Visibility as ViewIcon,
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import DataTable from '../common/DataTable';
// import LoadingSpinner from '../common/LoadingSpinner';
// import { adminService } from '../../services/admin';
// import { formatDate } from '../../utils/formatters';
// import { BUSINESS_STATUS, BUSINESS_STATUS_COLORS } from '../../utils/constants';

// const BusinessList = () => {
//   const navigate = useNavigate();
//   const [businesses, setBusinesses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [search, setSearch] = useState('');
//   const [filterStatus, setFilterStatus] = useState('ALL');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [deleteDialog, setDeleteDialog] = useState(null);

//   useEffect(() => {
//     fetchBusinesses();
//   }, []);

//   const fetchBusinesses = async () => {
//     try {
//       setLoading(true);
//       const data = await adminService.getAllBusinesses();
//       setBusinesses(data);
//     } catch (err) {
//       setError(err.message || 'Failed to load businesses');
//       console.error('Error fetching businesses:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (event) => {
//     setSearch(event.target.value);
//   };

//   const handleView = (business) => {
//     navigate(`/admin/businesses/${business.tenantId}`);
//   };

//   const handleEdit = (business) => {
//     navigate(`/admin/businesses/${business.tenantId}/edit`);
//   };

//   const handleDelete = (business) => {
//     setDeleteDialog(business);
//   };

//   const confirmDelete = async () => {
//     if (!deleteDialog) return;
    
//     try {
//       await adminService.deleteBusiness(deleteDialog.tenantId);
//       fetchBusinesses();
//       setDeleteDialog(null);
//     } catch (err) {
//       console.error('Error deleting business:', err);
//     }
//   };

//   const filteredBusinesses = businesses.filter((business) => {
//     const matchesSearch = 
//       business.businessName?.toLowerCase().includes(search.toLowerCase()) ||
//       business.industry?.toLowerCase().includes(search.toLowerCase()) ||
//       business.contactEmail?.toLowerCase().includes(search.toLowerCase());
    
//     const matchesStatus = 
//       filterStatus === 'ALL' || 
//       business.status === filterStatus;
    
//     return matchesSearch && matchesStatus;
//   });

//   const columns = [
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
//       field: 'contactEmail',
//       headerName: 'Contact Email',
//       sortable: true,
//     },
//     {
//       field: 'status',
//       headerName: 'Status',
//       sortable: true,
//       render: (value) => (
//         <Chip 
//           label={value} 
//           color={BUSINESS_STATUS_COLORS[value] || 'default'} 
//           size="small" 
//         />
//       ),
//     },
//     {
//       field: 'createdAt',
//       headerName: 'Created',
//       sortable: true,
//       render: (value) => formatDate(value),
//     },
//     {
//   field: 'appCount',
//   headerName: 'Apps',
//   sortable: true,
//   align: 'right',
//   render: (value) => Array.isArray(value) ? value.length : 0,
// }
// ,
//   ];

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//         <Typography variant="h4">Businesses</Typography>
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={() => navigate('/admin/businesses/create')}
//         >
//           Add Business
//         </Button>
//       </Box>

//       <Grid container spacing={2} sx={{ mb: 3 }}>
//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             placeholder="Search businesses..."
//             value={search}
//             onChange={handleSearch}
//             InputProps={{
//               startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
//             }}
//           />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Box sx={{ display: 'flex', gap: 1 }}>
//             <Chip
//               label="All"
//               onClick={() => setFilterStatus('ALL')}
//               color={filterStatus === 'ALL' ? 'primary' : 'default'}
//               variant={filterStatus === 'ALL' ? 'filled' : 'outlined'}
//             />
//             {Object.values(BUSINESS_STATUS).map((status) => (
//               <Chip
//                 key={status}
//                 label={status}
//                 onClick={() => setFilterStatus(status)}
//                 color={filterStatus === status ? 'primary' : 'default'}
//                 variant={filterStatus === status ? 'filled' : 'outlined'}
//               />
//             ))}
//           </Box>
//         </Grid>
//       </Grid>

//       {error ? (
//         <Typography color="error" sx={{ mb: 2 }}>
//           {error}
//         </Typography>
//       ) : null}

//       <DataTable
//         columns={columns}
//         data={filteredBusinesses}
//         page={page}
//         rowsPerPage={rowsPerPage}
//         totalRows={filteredBusinesses.length}
//         onPageChange={setPage}
//         onRowsPerPageChange={setRowsPerPage}
//         onView={handleView}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//       />

//       <Dialog open={!!deleteDialog} onClose={() => setDeleteDialog(null)}>
//         <DialogTitle>Delete Business</DialogTitle>
//         <DialogContent>
//           Are you sure you want to delete "{deleteDialog?.businessName}"? 
//           This action cannot be undone.
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDeleteDialog(null)}>Cancel</Button>
//           <Button onClick={confirmDelete} color="error">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default BusinessList;


import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Divider,
  Paper,
  Fab,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Apps as AppsIcon,
  VpnKey as KeyIcon,
  AccessTime,
  Settings,
  CheckCircle,
  Lock,
   LockOpen,
  Close as CloseIcon,
   ContentCopy as CopyIcon,
   PersonAdd as PersonAddIcon,
   Groups as GroupsIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import DataTable from '../common/DataTable';
import LoadingSpinner from '../common/LoadingSpinner';
import MaskedText from '../common/MaskedText';
import { adminService } from '../../services/admin';
import { formatDate } from '../../utils/formatters';
import { BUSINESS_STATUS, BUSINESS_STATUS_COLORS } from '../../utils/constants';

const BusinessList = () => {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteDialog, setDeleteDialog] = useState(null);
  const [applicationsDialog, setApplicationsDialog] = useState(null);
  const [businessApplications, setBusinessApplications] = useState([]);
  const [loadingApplications, setLoadingApplications] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [tokenDialog, setTokenDialog] = useState(null);
  const [generatedToken, setGeneratedToken] = useState('');
  const [copied, setCopied] = useState(false);

const [deleteAppDialog, setDeleteAppDialog] = useState(null);
  useEffect(() => {
    fetchBusinesses();
  }, []);

  
  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllBusinesses();
      setBusinesses(data);
    } catch (err) {
      setError(err.message || 'Failed to load businesses');
      console.error('Error fetching businesses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleView = (business) => {
    navigate(`/admin/businesses/${business.tenantId}`);
  };

  const handleEdit = (business) => {
    navigate(`/admin/businesses/${business.tenantId}/edit`);
  };

  const handleDelete = (business) => {
    setDeleteDialog(business);
  };


// Add this function
const handleDeleteApp = (app) => {
  //console.log('Delete button clicked for app:', app.appId, app.name);
  setDeleteAppDialog(app);
};

const handleDeleteAppConfirm = async () => {
  if (!deleteAppDialog) return;
  
  try {
    await adminService.deleteApplication(deleteAppDialog.appId);
    // Refresh applications list
    if (applicationsDialog) {
      const apps = await adminService.getBusinessApplications(applicationsDialog.tenantId);
      setBusinessApplications(apps || []);
    }
    setDeleteAppDialog(null);
  } catch (err) {
    console.error('Error deleting application:', err);
  }
};
  const handleViewApplications = async (business) => {
    try {
      setLoadingApplications(true);
      setApplicationsDialog(business);
      // Fetch applications for this business
      const applications = await adminService.getBusinessApplications(business.tenantId);
      setBusinessApplications(applications || []);
    } catch (err) {
      console.error('Error fetching business applications:', err);
      setBusinessApplications([]);
    } finally {
      setLoadingApplications(false);
    }
  };

  const handleCloseApplicationsDialog = () => {
    setApplicationsDialog(null);
    setBusinessApplications([]);
    setSelectedApp(null);
  };

  const handleAppView = (app) => {
    setSelectedApp(app);
  };

  const handleGenerateToken = async (app) => {
    try {
      const response = await adminService.getApplicationToken(app.appId);
      setGeneratedToken(response.token);
      setTokenDialog(app);
    } catch (err) {
      console.error('Error generating token:', err);
    }
  };

  const handleCopyToken = () => {
    if (generatedToken) {
      navigator.clipboard.writeText(generatedToken);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };


  // Add these functions in BusinessList.jsx
const handleToggleBusinessStatus = async (business, newStatus) => {
  try {
    await adminService.updateBusiness(business.tenantId, {
      ...business,
      status: newStatus,
    });
    fetchBusinesses(); // Refresh the list
  } catch (err) {
    console.error('Error updating business status:', err);
  }
};

const handleToggleAppStatus = async (app, newStatus) => {
  try {
    await adminService.updateApplication(app.appId, {
      ...app,
      status: newStatus,
    });
    // Refresh applications list
    if (applicationsDialog) {
      const apps = await adminService.getBusinessApplications(applicationsDialog.tenantId);
      setBusinessApplications(apps || []);
    }
  } catch (err) {
    console.error('Error updating application status:', err);
  }
};
  const handleCloseTokenDialog = () => {
    setTokenDialog(null);
    setGeneratedToken('');
    setCopied(false);
  };

  const handleCloseAppDialog = () => {
    setSelectedApp(null);
  };

  const confirmDelete = async () => {
    if (!deleteDialog) return;
    
    try {
      await adminService.deleteBusiness(deleteDialog.tenantId);
      fetchBusinesses();
      setDeleteDialog(null);
    } catch (err) {
      console.error('Error deleting business:', err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE':
        return { bg: '#ecfdf5', text: '#10b981', border: '#d1fae5' };
      case 'PENDING':
        return { bg: '#fef3c7', text: '#f59e0b', border: '#fde68a' };
      case 'INACTIVE':
        return { bg: '#fee2e2', text: '#ef4444', border: '#fecaca' };
      default:
        return { bg: '#f1f5f9', text: '#64748b', border: '#cbd5e1' };
    }
  };

  const getCredentialFields = (app) => {
    if (!app.credentials) return [];
    
    return Object.entries(app.credentials || {}).map(([key, value]) => ({
      key,
      value,
      type: key.toLowerCase().includes('secret') || 
            key.toLowerCase().includes('password') || 
            key.toLowerCase().includes('token') ? 'secret' : 'apiKey',
    }));
  };

  const filteredBusinesses = businesses.filter((business) => {
    const matchesSearch = 
      business.businessName?.toLowerCase().includes(search.toLowerCase()) ||
      business.industry?.toLowerCase().includes(search.toLowerCase()) ||
      business.contactEmail?.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = 
      filterStatus === 'ALL' || 
      business.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const columns = [
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
      field: 'contactEmail',
      headerName: 'Contact Email',
      sortable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      sortable: true,
      render: (value) => (
        <Chip 
          label={value} 
          color={BUSINESS_STATUS_COLORS[value] || 'default'} 
          size="small" 
        />
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Created',
      sortable: true,
      render: (value) => formatDate(value),
    },
    // {
    //   field: 'appCount',
    //   headerName: 'Apps',
    //   sortable: true,
    //   align: 'right',
    //   render: (value) => Array.isArray(value) ? value.length : 0,
    // },
    {
  field: 'appCount',
  headerName: 'Apps',
  sortable: true,
  align: 'right',
  render: (value) => value ?? 0,
}
,
    // {
    //   field: 'actions',
    //   headerName: 'Actions',
    //   align: 'right',
    //   render: (_, business) => (
    //     <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
    //       <Tooltip title="View Applications">
    //         <IconButton
    //           size="small"
    //           onClick={() => handleViewApplications(business)}
    //           sx={{ color: '#667eea' }}
    //         >
    //           <AppsIcon fontSize="small" />
    //         </IconButton>
    //       </Tooltip>
    //       <Tooltip title="View Business">
    //         <IconButton
    //           size="small"
    //           onClick={() => handleView(business)}
    //           sx={{ color: '#666' }}
    //         >
    //           <ViewIcon fontSize="small" />
    //         </IconButton>
    //       </Tooltip>
    //       <Tooltip title="Edit Business">
    //         <IconButton
    //           size="small"
    //           onClick={() => handleEdit(business)}
    //           sx={{ color: '#f59e0b' }}
    //         >
    //           <EditIcon fontSize="small" />
    //         </IconButton>
    //       </Tooltip>
    //       <Tooltip title="Delete Business">
    //         <IconButton
    //           size="small"
    //           onClick={() => handleDelete(business)}
    //           sx={{ color: '#ef4444' }}
    //         >
    //           <DeleteIcon fontSize="small" />
    //         </IconButton>
    //       </Tooltip>
    //     </Box>
    //   ),
    // },
    // In the business actions column, add status toggle:
// {
//   field: 'actions',
//   headerName: 'Actions',
//   align: 'right',
//   render: (_, business) => (
//     <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
//       {/* ... existing buttons */}
      
//       {/* Status Toggle */}
//       <Tooltip title={business.status === 'ACTIVE' ? "Deactivate" : "Activate"}>
//         <IconButton
//           size="small"
//           onClick={() => handleToggleBusinessStatus(
//             business, 
//             business.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
//           )}
//           sx={{ 
//             color: business.status === 'ACTIVE' ? '#ef4444' : '#10b981' 
//           }}
//         >
//           {business.status === 'ACTIVE' ? (
//             <Lock fontSize="small" />
//           ) : (
//             <LockOpen fontSize="small" />
//           )}
//         </IconButton>
//       </Tooltip>
      
//       {/* ... rest of the buttons */}
//     </Box>
//   ),
// },



{
  field: 'actions',
  headerName: 'Actions',
  align: 'right',
  render: (_, business) => (
    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
      {/* View Applications */}
      <Tooltip title="View Applications">
        <IconButton
          size="small"
          onClick={() => handleViewApplications(business)}
          sx={{ color: '#667eea' }}
        >
          <AppsIcon fontSize="small" />
        </IconButton>
      </Tooltip>
  {/* Add this button */}
      <Tooltip title="Create User">
        <IconButton
          size="small"
          onClick={() => navigate(`/admin/businesses/${business.tenantId}/create-user`)}
          sx={{ color: '#8b5cf6' }}
        >
          <PersonAddIcon fontSize="small" />
        </IconButton>
      </Tooltip>

        {/* Add this button */}
      <Tooltip title="View Users">
        <IconButton
          size="small"
          onClick={() => navigate(`/admin/businesses/${business.tenantId}/users`)}
          sx={{ color: '#8b5cf6' }}
        >
          <GroupsIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      {/* View Business */}
      <Tooltip title="View Business">
        <IconButton
          size="small"
          onClick={() => handleView(business)}
          sx={{ color: '#666' }}
        >
          <ViewIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      {/* Edit Business */}
      <Tooltip title="Edit Business">
        <IconButton
          size="small"
          onClick={() => handleEdit(business)}
          sx={{ color: '#f59e0b' }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      {/* Delete Business */}
      <Tooltip title="Delete Business">
        <IconButton
          size="small"
          onClick={() => handleDelete(business)}
          sx={{ color: '#ef4444' }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      {/* Status Toggle */}
      <Tooltip
        title={business.status === 'ACTIVE' ? 'INACTIVE' : 'Activate'}
      >
  

        <IconButton
          size="small"
          onClick={() =>
            handleToggleBusinessStatus(
              business,
              business.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
            )
          }
          sx={{
            color: business.status === 'ACTIVE' ? '#ef4444' : '#10b981',
          }}
        >
          {business.status === 'ACTIVE' ? (
            <Lock fontSize="small" />
          ) : (
            <LockOpen fontSize="small" />
          )}
        </IconButton>
      </Tooltip>
      {/* <Fab
  color="primary"
  aria-label="create user"
  sx={{
    position: 'fixed',
    bottom: 16,
    right: 16,
  }}
  onClick={() => {
    // You might need to select a business first
    alert('Select a business first, then click its Create User button');
  }}
>
  <PersonAddIcon />
</Fab> */}
    </Box>
  ),
},

  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Businesses</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/admin/businesses/create')}
        >
          Add Business
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Search businesses..."
            value={search}
            onChange={handleSearch}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip
              label="All"
              onClick={() => setFilterStatus('ALL')}
              color={filterStatus === 'ALL' ? 'primary' : 'default'}
              variant={filterStatus === 'ALL' ? 'filled' : 'outlined'}
            />
            {Object.values(BUSINESS_STATUS).map((status) => (
              <Chip
                key={status}
                label={status}
                onClick={() => setFilterStatus(status)}
                color={filterStatus === status ? 'primary' : 'default'}
                variant={filterStatus === status ? 'filled' : 'outlined'}
              />
            ))}
          </Box>
        </Grid>
      </Grid>

      {error ? (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      ) : null}

      <DataTable
        columns={columns}
        data={filteredBusinesses}
        page={page}
        rowsPerPage={rowsPerPage}
        totalRows={filteredBusinesses.length}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
        // onView={handleView}
        // onEdit={handleEdit}
        // onDelete={handleDelete}
      />

      {/* Delete Business Dialog */}
      <Dialog open={!!deleteDialog} onClose={() => setDeleteDialog(null)}>
        <DialogTitle>Delete Business</DialogTitle>
        <DialogContent>
          Are you sure you want to delete "{deleteDialog?.businessName}"? 
          This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(null)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Business Applications Dialog */}
      {/* <Dialog 
        open={!!applicationsDialog} 
        onClose={handleCloseApplicationsDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: '90vh',
          }
        }}
      >
        {applicationsDialog && (
          <>
            <DialogTitle sx={{ pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ background: '#ede9fe', color: '#667eea' }}>
                  <AppsIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    {applicationsDialog.businessName} - Applications
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    {applicationsDialog.industry} • {applicationsDialog.contactEmail}
                  </Typography>
                </Box>
              </Box>
              <IconButton onClick={handleCloseApplicationsDialog} size="small">
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            
            <DialogContent dividers sx={{ p: 3, background: '#f8fafc' }}>
              {loadingApplications ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <LoadingSpinner />
                </Box>
              ) : businessApplications.length === 0 ? (
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
                    No Applications
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    This business doesn't have any applications yet.
                  </Typography>
                </Paper>
              ) : (
                <Grid container spacing={2}>
                  {businessApplications.map((app, index) => {
                    const statusColor = getStatusColor(app.status);
                    return (
                      <Grid item xs={12} sm={6} md={4} key={app.appId || index}>
                        <Paper
                          elevation={0}
                          sx={{
                            borderRadius: 3,
                            border: '1px solid #e2e8f0',
                            background: 'white',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)',
                              borderColor: '#cbd5e1',
                            },
                          }}
                        >
                          <CardContent sx={{ flexGrow: 1, p: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                              <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#0f172a' }}>
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
                                  fontSize: '0.65rem',
                                }}
                              />
                            </Box>

                            <Box
                              sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                px: 1,
                                py: 0.25,
                                borderRadius: 1,
                                background: '#f1f5f9',
                                mb: 1.5,
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
                                  fontSize: '0.875rem',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                  minHeight: 40,
                                }}
                              >
                                {app.description}
                              </Typography>
                            )}

                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                mt: 2,
                                pt: 1.5,
                                borderTop: '1px solid #f1f5f9',
                              }}
                            >
                              <AccessTime sx={{ fontSize: 14, color: '#94a3b8' }} />
                              <Typography variant="caption" sx={{ color: '#64748b' }}>
                                Created {formatDate(app.createdAt)}
                              </Typography>
                            </Box>
                          </CardContent>

                          <Divider />

                          <CardActions sx={{ p: 1.5, gap: 1 }}>
                            <Button
                              size="small"
                              startIcon={<ViewIcon />}
                              onClick={() => handleAppView(app)}
                              sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '0.75rem',
                                color: '#667eea',
                                '&:hover': {
                                  backgroundColor: '#ede9fe',
                                },
                              }}
                            >
                              View
                            </Button>
                            <Button
                              size="small"
                              startIcon={<KeyIcon />}
                              onClick={() => handleGenerateToken(app)}
                              sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '0.75rem',
                                color: '#10b981',
                                '&:hover': {
                                  backgroundColor: '#ecfdf5',
                                },
                              }}
                            >
                              Token
                            </Button>
                          </CardActions>
                        </Paper>
                      </Grid>
                    );
                  })}
                </Grid>
              )}
            </DialogContent>
          </>
        )}
      </Dialog> */}

{/* Add this after the Delete Business Dialog in your BusinessList.jsx */}

{/* Delete Business Dialog */}
<Dialog open={!!deleteDialog} onClose={() => setDeleteDialog(null)}>
  <DialogTitle>Delete Business</DialogTitle>
  <DialogContent>
    Are you sure you want to delete "{deleteDialog?.businessName}"? 
    This action cannot be undone.
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setDeleteDialog(null)}>Cancel</Button>
    <Button onClick={confirmDelete} color="error">
      Delete
    </Button>
  </DialogActions>
</Dialog>

{/* ======== ADD THIS DELETE APPLICATION DIALOG ======== */}
{/* Delete Application Dialog */}
<Dialog open={!!deleteAppDialog} onClose={() => setDeleteAppDialog(null)}>
  <DialogTitle>Delete Application</DialogTitle>
  <DialogContent>
    Are you sure you want to delete "{deleteAppDialog?.name}"? 
    This action cannot be undone.
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setDeleteAppDialog(null)}>Cancel</Button>
    <Button onClick={handleDeleteAppConfirm} color="error">
      Delete
    </Button>
  </DialogActions>
</Dialog>


{/* Business Applications Dialog */}
<Dialog 
  open={!!applicationsDialog} 
  onClose={handleCloseApplicationsDialog}
  maxWidth="md"
  fullWidth
  PaperProps={{
    sx: {
      borderRadius: 3,
      maxHeight: '90vh',
    }
  }}
>
  {applicationsDialog && (
    <>
      <DialogTitle sx={{ pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ background: '#ede9fe', color: '#667eea' }}>
            <AppsIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={700}>
              {applicationsDialog.businessName} - Applications
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b' }}>
              {applicationsDialog.industry} • {applicationsDialog.contactEmail}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={handleCloseApplicationsDialog} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers sx={{ p: 3, background: '#f8fafc' }}>
        {loadingApplications ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <LoadingSpinner />
          </Box>
        ) : businessApplications.length === 0 ? (
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
              No Applications
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              This business doesn't have any applications yet.
            </Typography>
          </Paper>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {businessApplications.map((app, index) => {
              const statusColor = getStatusColor(app.status);
              return (
                <Paper
                  key={app.appId || index}
                  elevation={0}
                  sx={{
                    borderRadius: 2,
                    border: '1px solid #e2e8f0',
                    background: 'white',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                      borderColor: '#cbd5e1',
                    },
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            background: '#ede9fe',
                            color: '#667eea',
                          }}
                        >
                          <AppsIcon fontSize="small" />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#0f172a' }}>
                            {app.name}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                            <Chip
                              label={app.type}
                              size="small"
                              sx={{
                                backgroundColor: '#f1f5f9',
                                color: '#64748b',
                                fontWeight: 600,
                                fontSize: '0.65rem',
                                height: 20,
                              }}
                            />
                            <Chip
                              label={app.status}
                              size="small"
                              sx={{
                                backgroundColor: statusColor.bg,
                                color: statusColor.text,
                                border: `1px solid ${statusColor.border}`,
                                fontWeight: 600,
                                fontSize: '0.65rem',
                                height: 20,
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {/* Status Toggle Button */}
  <Tooltip title={app.status === 'ACTIVE' ? 'INACTIVE' : 'Activate'}>
    <IconButton
      size="small"
      onClick={() => handleToggleAppStatus(
        app,
        app.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
      )}
      sx={{
        color: app.status === 'ACTIVE' ? '#ef4444' : '#10b981',
        '&:hover': {
          backgroundColor: app.status === 'ACTIVE' ? '#fee2e2' : '#ecfdf5',
        },
      }}
    >
      {app.status === 'ACTIVE' ? (
        <Lock fontSize="small" />
      ) : (
        <LockOpen fontSize="small" />
      )}
    </IconButton>
  </Tooltip>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => handleAppView(app)}
                            sx={{ color: '#667eea', '&:hover': { backgroundColor: '#ede9fe' } }}
                          >
                            <ViewIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Application">
                          <IconButton
                            size="small"
                            onClick={() => navigate(`/admin/applications/${app.appId}/edit`)}
                            sx={{ color: '#f59e0b', '&:hover': { backgroundColor: '#fef3c7' } }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Generate Token">
                          <IconButton
                            size="small"
                            onClick={() => handleGenerateToken(app)}
                            sx={{ color: '#10b981', '&:hover': { backgroundColor: '#ecfdf5' } }}
                          >
                            <KeyIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Application">
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteApp(app)}
                            sx={{ color: '#ef4444', '&:hover': { backgroundColor: '#fee2e2' } }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>

                    {app.description && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#64748b',
                          fontSize: '0.875rem',
                          mb: 1,
                          ml: 6, // Align with the avatar
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
                        mt: 1,
                        pt: 1,
                        borderTop: '1px solid #f1f5f9',
                        ml: 6, // Align with the avatar
                      }}
                    >
                      <AccessTime sx={{ fontSize: 14, color: '#94a3b8' }} />
                      <Typography variant="caption" sx={{ color: '#64748b' }}>
                        Created {formatDate(app.createdAt)}
                      </Typography>
                      {app.updatedAt && (
                        <>
                          <Typography variant="caption" sx={{ color: '#cbd5e1' }}>•</Typography>
                          <Typography variant="caption" sx={{ color: '#64748b' }}>
                            Updated {formatDate(app.updatedAt)}
                          </Typography>
                        </>
                      )}
                    </Box>

                    {/* Show masked credentials preview */}
                    {app.credentials && Object.keys(app.credentials).length > 0 && (
                      <Box
                        sx={{
                          mt: 1,
                          pt: 1,
                          borderTop: '1px dashed #e2e8f0',
                          ml: 6,
                        }}
                      >
                        <Typography variant="caption" fontWeight={600} sx={{ color: '#64748b', display: 'block', mb: 0.5 }}>
                          Credentials:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {Object.keys(app.credentials).map((key) => (
                            <Chip
                              key={key}
                              label={`${key}: ••••••••`}
                              size="small"
                              sx={{
                                backgroundColor: '#fef3c7',
                                color: '#92400e',
                                fontSize: '0.7rem',
                                height: 20,
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    )}
                  </CardContent>
                </Paper>
              );
            })}
          </Box>
        )}
      </DialogContent>
      
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => navigate(`/admin/business/${applicationsDialog.tenantId}/applications/create`)}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          Add New Application
        </Button>
        <Button 
          onClick={handleCloseApplicationsDialog}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            color: '#64748b',
          }}
        >
          Close
        </Button>
      </DialogActions>
    </>
  )}
</Dialog>



      {/* Application Details Dialog */}
      <Dialog 
        open={!!selectedApp} 
        onClose={handleCloseAppDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.12)',
          }
        }}
      >
        {selectedApp && (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ background: '#ede9fe', color: '#667eea' }}>
                  <AppsIcon />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight={700}>
                    {selectedApp.name}
                  </Typography>
                </Box>
                <Chip
                  label={selectedApp.status}
                  size="small"
                  sx={{
                    backgroundColor: getStatusColor(selectedApp.status).bg,
                    color: getStatusColor(selectedApp.status).text,
                    border: `1px solid ${getStatusColor(selectedApp.status).border}`,
                    fontWeight: 600,
                  }}
                />
              </Box>
            </DialogTitle>
            
            <DialogContent dividers sx={{ p: 3, background: '#f8fafc' }}>
              <Grid container spacing={3}>
                {/* Basic Information */}
                <Grid item xs={12}>
                  <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid #e2e8f0' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Settings sx={{ color: '#667eea', fontSize: 20 }} />
                      <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#0f172a' }}>
                        Basic Information
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Typography variant="body2" fontWeight={600} sx={{ color: '#64748b', minWidth: 100 }}>
                          Type:
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#0f172a' }}>
                          {selectedApp.type}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Typography variant="body2" fontWeight={600} sx={{ color: '#64748b', minWidth: 100 }}>
                          Created:
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#0f172a' }}>
                          {formatDate(selectedApp.createdAt)}
                        </Typography>
                      </Box>
                      {selectedApp.updatedAt && (
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Typography variant="body2" fontWeight={600} sx={{ color: '#64748b', minWidth: 100 }}>
                            Updated:
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#0f172a' }}>
                            {formatDate(selectedApp.updatedAt)}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Paper>
                </Grid>

                {/* Configuration */}
                {selectedApp.configuration && Object.keys(selectedApp.configuration).length > 0 && (
                  <Grid item xs={12}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid #e2e8f0' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Settings sx={{ color: '#667eea', fontSize: 20 }} />
                        <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#0f172a' }}>
                          Configuration
                        </Typography>
                      </Box>
                      <Grid container spacing={2}>
                        {Object.entries(selectedApp.configuration).map(([key, value]) => (
                          <Grid item xs={12} sm={6} key={key}>
                            <Box
                              sx={{
                                p: 2,
                                borderRadius: 2,
                                background: '#f8fafc',
                                border: '1px solid #e2e8f0',
                              }}
                            >
                              <Typography variant="caption" fontWeight={600} sx={{ color: '#64748b', display: 'block', mb: 0.5 }}>
                                {key}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#0f172a' }}>
                                {value}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Paper>
                  </Grid>
                )}

                {/* Credentials */}
                {selectedApp.credentials && Object.keys(selectedApp.credentials).length > 0 && (
                  <Grid item xs={12}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid #fde68a', background: '#fefce8' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Lock sx={{ color: '#f59e0b', fontSize: 20 }} />
                        <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#0f172a' }}>
                          Credentials (Masked)
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: '#92400e', display: 'block', mb: 2 }}>
                        Sensitive information is encrypted and masked for security
                      </Typography>
                      <Grid container spacing={2}>
                        {getCredentialFields(selectedApp).map((field) => (
                          <Grid item xs={12} sm={6} key={field.key}>
                            <MaskedText
                              label={field.key}
                              value={field.value}
                              type={field.type}
                              showCopy={true}
                              showToggle={true}
                              fullWidth
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Paper>
                  </Grid>
                )}
              </Grid>
            </DialogContent>
            
            <DialogActions sx={{ p: 3, gap: 1 }}>
              <Button 
                onClick={handleCloseAppDialog}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  color: '#64748b',
                }}
              >
                Close
              </Button>
              <Button 
                variant="contained"
                onClick={() => handleGenerateToken(selectedApp)}
                startIcon={<KeyIcon />}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                  '&:hover': {
                    boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)',
                  },
                }}
              >
                Generate Token
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Token Dialog */}
      <Dialog 
        open={!!tokenDialog} 
        onClose={handleCloseTokenDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.12)',
          }
        }}
      >
        {tokenDialog && (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ background: '#ecfdf5', color: '#10b981' }}>
                  <KeyIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    Application Token
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    {tokenDialog.name}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            
            <DialogContent sx={{ p: 3 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  mb: 2,
                  borderRadius: 2,
                  background: '#fef3c7',
                  border: '1px solid #fde68a',
                }}
              >
                <Typography variant="body2" sx={{ color: '#92400e' }}>
                  ⚠️ Keep this token secure and do not share it publicly. It provides access to your application.
                </Typography>
              </Paper>

              {generatedToken ? (
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    background: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    position: 'relative',
                    fontFamily: 'monospace',
                    wordBreak: 'break-all',
                    fontSize: '0.875rem',
                    color: '#0f172a',
                  }}
                >
                  {generatedToken}
                  <Tooltip title={copied ? "Copied!" : "Copy token"}>
                    <IconButton
                      size="small"
                      onClick={handleCopyToken}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        background: 'white',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        '&:hover': {
                          background: '#667eea',
                          color: 'white',
                        },
                      }}
                    >
                      {copied ? <CheckCircle fontSize="small" /> : <CopyIcon fontSize="small" />}
                    </IconButton>
                  </Tooltip>
                </Paper>
              ) : (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    Generating token...
                  </Typography>
                </Box>
              )}
            </DialogContent>
            
            <DialogActions sx={{ p: 3 }}>
              <Button 
                onClick={handleCloseTokenDialog}
                variant="contained"
                fullWidth
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
              >
                Done
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default BusinessList;