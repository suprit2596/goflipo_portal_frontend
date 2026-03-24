// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import {
// // // // // //   Box,
// // // // // //   Typography,
// // // // // //   Button,
// // // // // //   TextField,
// // // // // //   Grid,
// // // // // //   Chip,
// // // // // //   IconButton,
// // // // // //   Dialog,
// // // // // //   DialogTitle,
// // // // // //   DialogContent,
// // // // // //   DialogActions,
// // // // // // } from '@mui/material';
// // // // // // import {
// // // // // //   Add as AddIcon,
// // // // // //   Search as SearchIcon,
// // // // // //   FilterList as FilterIcon,
// // // // // //   Edit as EditIcon,
// // // // // //   Delete as DeleteIcon,
// // // // // //   Visibility as ViewIcon,
// // // // // // } from '@mui/icons-material';
// // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // import DataTable from '../common/DataTable';
// // // // // // import LoadingSpinner from '../common/LoadingSpinner';
// // // // // // import { adminService } from '../../services/admin';
// // // // // // import { formatDate } from '../../utils/formatters';
// // // // // // import { BUSINESS_STATUS, BUSINESS_STATUS_COLORS } from '../../utils/constants';

// // // // // // const BusinessList = () => {
// // // // // //   const navigate = useNavigate();
// // // // // //   const [businesses, setBusinesses] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [error, setError] = useState(null);
// // // // // //   const [search, setSearch] = useState('');
// // // // // //   const [filterStatus, setFilterStatus] = useState('ALL');
// // // // // //   const [page, setPage] = useState(0);
// // // // // //   const [rowsPerPage, setRowsPerPage] = useState(10);
// // // // // //   const [deleteDialog, setDeleteDialog] = useState(null);

// // // // // //   useEffect(() => {
// // // // // //     fetchBusinesses();
// // // // // //   }, []);

// // // // // //   const fetchBusinesses = async () => {
// // // // // //     try {
// // // // // //       setLoading(true);
// // // // // //       const data = await adminService.getAllBusinesses();
// // // // // //       setBusinesses(data);
// // // // // //     } catch (err) {
// // // // // //       setError(err.message || 'Failed to load businesses');
// // // // // //       console.error('Error fetching businesses:', err);
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleSearch = (event) => {
// // // // // //     setSearch(event.target.value);
// // // // // //   };

// // // // // //   const handleView = (business) => {
// // // // // //     navigate(`/admin/businesses/${business.tenantId}`);
// // // // // //   };

// // // // // //   const handleEdit = (business) => {
// // // // // //     navigate(`/admin/businesses/${business.tenantId}/edit`);
// // // // // //   };

// // // // // //   const handleDelete = (business) => {
// // // // // //     setDeleteDialog(business);
// // // // // //   };

// // // // // //   const confirmDelete = async () => {
// // // // // //     if (!deleteDialog) return;
    
// // // // // //     try {
// // // // // //       await adminService.deleteBusiness(deleteDialog.tenantId);
// // // // // //       fetchBusinesses();
// // // // // //       setDeleteDialog(null);
// // // // // //     } catch (err) {
// // // // // //       console.error('Error deleting business:', err);
// // // // // //     }
// // // // // //   };

// // // // // //   const filteredBusinesses = businesses.filter((business) => {
// // // // // //     const matchesSearch = 
// // // // // //       business.businessName?.toLowerCase().includes(search.toLowerCase()) ||
// // // // // //       business.industry?.toLowerCase().includes(search.toLowerCase()) ||
// // // // // //       business.contactEmail?.toLowerCase().includes(search.toLowerCase());
    
// // // // // //     const matchesStatus = 
// // // // // //       filterStatus === 'ALL' || 
// // // // // //       business.status === filterStatus;
    
// // // // // //     return matchesSearch && matchesStatus;
// // // // // //   });

// // // // // //   const columns = [
// // // // // //     {
// // // // // //       field: 'businessName',
// // // // // //       headerName: 'Business Name',
// // // // // //       sortable: true,
// // // // // //     },
// // // // // //     {
// // // // // //       field: 'industry',
// // // // // //       headerName: 'Industry',
// // // // // //       sortable: true,
// // // // // //     },
// // // // // //     {
// // // // // //       field: 'contactEmail',
// // // // // //       headerName: 'Contact Email',
// // // // // //       sortable: true,
// // // // // //     },
// // // // // //     {
// // // // // //       field: 'status',
// // // // // //       headerName: 'Status',
// // // // // //       sortable: true,
// // // // // //       render: (value) => (
// // // // // //         <Chip 
// // // // // //           label={value} 
// // // // // //           color={BUSINESS_STATUS_COLORS[value] || 'default'} 
// // // // // //           size="small" 
// // // // // //         />
// // // // // //       ),
// // // // // //     },
// // // // // //     {
// // // // // //       field: 'createdAt',
// // // // // //       headerName: 'Created',
// // // // // //       sortable: true,
// // // // // //       render: (value) => formatDate(value),
// // // // // //     },
// // // // // //     {
// // // // // //   field: 'appCount',
// // // // // //   headerName: 'Apps',
// // // // // //   sortable: true,
// // // // // //   align: 'right',
// // // // // //   render: (value) => Array.isArray(value) ? value.length : 0,
// // // // // // }
// // // // // // ,
// // // // // //   ];

// // // // // //   if (loading) {
// // // // // //     return <LoadingSpinner />;
// // // // // //   }

// // // // // //   return (
// // // // // //     <Box sx={{ p: 3 }}>
// // // // // //       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
// // // // // //         <Typography variant="h4">Businesses</Typography>
// // // // // //         <Button
// // // // // //           variant="contained"
// // // // // //           startIcon={<AddIcon />}
// // // // // //           onClick={() => navigate('/admin/businesses/create')}
// // // // // //         >
// // // // // //           Add Business
// // // // // //         </Button>
// // // // // //       </Box>

// // // // // //       <Grid container spacing={2} sx={{ mb: 3 }}>
// // // // // //         <Grid item xs={12} md={6}>
// // // // // //           <TextField
// // // // // //             fullWidth
// // // // // //             placeholder="Search businesses..."
// // // // // //             value={search}
// // // // // //             onChange={handleSearch}
// // // // // //             InputProps={{
// // // // // //               startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
// // // // // //             }}
// // // // // //           />
// // // // // //         </Grid>
// // // // // //         <Grid item xs={12} md={6}>
// // // // // //           <Box sx={{ display: 'flex', gap: 1 }}>
// // // // // //             <Chip
// // // // // //               label="All"
// // // // // //               onClick={() => setFilterStatus('ALL')}
// // // // // //               color={filterStatus === 'ALL' ? 'primary' : 'default'}
// // // // // //               variant={filterStatus === 'ALL' ? 'filled' : 'outlined'}
// // // // // //             />
// // // // // //             {Object.values(BUSINESS_STATUS).map((status) => (
// // // // // //               <Chip
// // // // // //                 key={status}
// // // // // //                 label={status}
// // // // // //                 onClick={() => setFilterStatus(status)}
// // // // // //                 color={filterStatus === status ? 'primary' : 'default'}
// // // // // //                 variant={filterStatus === status ? 'filled' : 'outlined'}
// // // // // //               />
// // // // // //             ))}
// // // // // //           </Box>
// // // // // //         </Grid>
// // // // // //       </Grid>

// // // // // //       {error ? (
// // // // // //         <Typography color="error" sx={{ mb: 2 }}>
// // // // // //           {error}
// // // // // //         </Typography>
// // // // // //       ) : null}

// // // // // //       <DataTable
// // // // // //         columns={columns}
// // // // // //         data={filteredBusinesses}
// // // // // //         page={page}
// // // // // //         rowsPerPage={rowsPerPage}
// // // // // //         totalRows={filteredBusinesses.length}
// // // // // //         onPageChange={setPage}
// // // // // //         onRowsPerPageChange={setRowsPerPage}
// // // // // //         onView={handleView}
// // // // // //         onEdit={handleEdit}
// // // // // //         onDelete={handleDelete}
// // // // // //       />

// // // // // //       <Dialog open={!!deleteDialog} onClose={() => setDeleteDialog(null)}>
// // // // // //         <DialogTitle>Delete Business</DialogTitle>
// // // // // //         <DialogContent>
// // // // // //           Are you sure you want to delete "{deleteDialog?.businessName}"? 
// // // // // //           This action cannot be undone.
// // // // // //         </DialogContent>
// // // // // //         <DialogActions>
// // // // // //           <Button onClick={() => setDeleteDialog(null)}>Cancel</Button>
// // // // // //           <Button onClick={confirmDelete} color="error">
// // // // // //             Delete
// // // // // //           </Button>
// // // // // //         </DialogActions>
// // // // // //       </Dialog>
// // // // // //     </Box>
// // // // // //   );
// // // // // // };

// // // // // // export default BusinessList;


// // // // // import React, { useState, useEffect ,useCallback} from 'react';
// // // // // import { debounce } from 'lodash';
// // // // // import {
// // // // //   Box,
// // // // //   Typography,
// // // // //   Button,
// // // // //   TextField,
// // // // //   Grid,
// // // // //   Chip,
// // // // //   IconButton,
// // // // //   Dialog,
// // // // //   DialogTitle,
// // // // //   DialogContent,
// // // // //   DialogActions,
// // // // //   Card,
// // // // //   CardContent,
// // // // //   CardActions,
// // // // //   Avatar,
// // // // //   Divider,
// // // // //   Paper,
// // // // //   Fab,
// // // // //   Tooltip,
// // // // // } from '@mui/material';
// // // // // import {
// // // // //   Add as AddIcon,
// // // // //   Search as SearchIcon,
// // // // //   FilterList as FilterIcon,
// // // // //   Edit as EditIcon,
// // // // //   Delete as DeleteIcon,
// // // // //   Visibility as ViewIcon,
// // // // //   Apps as AppsIcon,
// // // // //   VpnKey as KeyIcon,
// // // // //   AccessTime,
// // // // //   Settings,
// // // // //   CheckCircle,
// // // // //   Lock,
// // // // //    LockOpen,
// // // // //   Close as CloseIcon,
// // // // //    ContentCopy as CopyIcon,
// // // // //    PersonAdd as PersonAddIcon,
// // // // //    Groups as GroupsIcon,
// // // // // } from '@mui/icons-material';
// // // // // import { useNavigate } from 'react-router-dom';
// // // // // import DataTable from '../common/DataTable';
// // // // // import LoadingSpinner from '../common/LoadingSpinner';
// // // // // import MaskedText from '../common/MaskedText';
// // // // // import { adminService } from '../../services/admin';
// // // // // import { formatDate } from '../../utils/formatters';
// // // // // import { BUSINESS_STATUS, BUSINESS_STATUS_COLORS } from '../../utils/constants';

// // // // // const BusinessList = () => {
// // // // //   const navigate = useNavigate();
// // // // //   const [businesses, setBusinesses] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState(null);
// // // // //   const [search, setSearch] = useState('');
// // // // //   const [searchInput, setSearchInput] = useState(''); // ADD THIS: for immediate input update
// // // // //   const [filterStatus, setFilterStatus] = useState('ALL');
// // // // //   const [page, setPage] = useState(0);
// // // // //   const [rowsPerPage, setRowsPerPage] = useState(10);
// // // // //   const [deleteDialog, setDeleteDialog] = useState(null);
// // // // //   const [applicationsDialog, setApplicationsDialog] = useState(null);
// // // // //   const [businessApplications, setBusinessApplications] = useState([]);
// // // // //   const [loadingApplications, setLoadingApplications] = useState(false);
// // // // //   const [selectedApp, setSelectedApp] = useState(null);
// // // // //   const [tokenDialog, setTokenDialog] = useState(null);
// // // // //   const [generatedToken, setGeneratedToken] = useState('');
// // // // //   const [copied, setCopied] = useState(false);
// // // // //   const [totalRows, setTotalRows] = useState(0);
// // // // //   const [deleteAppDialog, setDeleteAppDialog] = useState(null);

// // // // //   // Add debounced search function
// // // // //   const debouncedSearch = useCallback(
// // // // //     debounce((value) => {
// // // // //       setSearch(value);
// // // // //       setPage(0); // Reset to first page when searching
// // // // //     }, 500), // 500ms delay
// // // // //     []
// // // // //   );
// // // // //     useEffect(() => {
// // // // //     return () => {
// // // // //       debouncedSearch.cancel();
// // // // //     };
// // // // //   }, [debouncedSearch]);

// // // // //   useEffect(() => {
// // // // //     fetchBusinesses();
// // // // //   }, [page, rowsPerPage, search, filterStatus]);

// // // // //  const fetchBusinesses = async () => {
// // // // //     try {
// // // // //       setLoading(true);
// // // // //       setError(null);

// // // // //       const response = await adminService.getAllBusinesses(
// // // // //         page, 
// // // // //         rowsPerPage,
// // // // //         search,
// // // // //         filterStatus !== 'ALL' ? filterStatus : ''
// // // // //       );

// // // // //       setBusinesses(response.data || []);
// // // // //       setTotalRows(response.total || 0);
      
// // // // //     } catch (err) {
// // // // //       setError(err.message || "Failed to load businesses");
// // // // //       console.error("Error fetching businesses:", err);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   // Update handleSearch function
// // // // //     // Update handleSearch function
// // // // // const handleSearch = (event) => {
// // // // //     const value = event.target.value;
// // // // //     setSearchInput(value);
// // // // //     debouncedSearch(value);
// // // // //   };

// // // // //    // You already have this, but make sure it looks like this:
// // // // //   const handleStatusFilter = (status) => {
// // // // //     setFilterStatus(status);
// // // // //     setPage(0);
// // // // //   };

// // // // // // Add this function
// // // // // const handleDeleteApp = (app) => {
// // // // //   //console.log('Delete button clicked for app:', app.appId, app.name);
// // // // //   setDeleteAppDialog(app);
// // // // // };

// // // // // const handleDeleteAppConfirm = async () => {
// // // // //   if (!deleteAppDialog) return;
  
// // // // //   try {
// // // // //     await adminService.deleteApplication(deleteAppDialog.appId);
// // // // //     // Refresh applications list
// // // // //     if (applicationsDialog) {
// // // // //       const apps = await adminService.getBusinessApplications(applicationsDialog.tenantId);
// // // // //       setBusinessApplications(apps || []);
// // // // //     }
// // // // //     setDeleteAppDialog(null);
// // // // //   } catch (err) {
// // // // //     console.error('Error deleting application:', err);
// // // // //   }
// // // // // };
// // // // //    const handleView = (business) => {
// // // // //     navigate(`/admin/businesses/${business.tenantId}`);
// // // // //   };

// // // // //   const handleEdit = (business) => {
// // // // //     navigate(`/admin/businesses/${business.tenantId}/edit`);
// // // // //   };

// // // // //   const handleDelete = (business) => {
// // // // //     setDeleteDialog(business);
// // // // //   };

// // // // //   const handleViewApplications = async (business) => {
// // // // //     try {
// // // // //       setLoadingApplications(true);
// // // // //       setApplicationsDialog(business);
// // // // //       // Fetch applications for this business
// // // // //       const applications = await adminService.getBusinessApplications(business.tenantId);
// // // // //       setBusinessApplications(applications || []);
// // // // //     } catch (err) {
// // // // //       console.error('Error fetching business applications:', err);
// // // // //       setBusinessApplications([]);
// // // // //     } finally {
// // // // //       setLoadingApplications(false);
// // // // //     }
// // // // //   };

// // // // //   const handleCloseApplicationsDialog = () => {
// // // // //     setApplicationsDialog(null);
// // // // //     setBusinessApplications([]);
// // // // //     setSelectedApp(null);
// // // // //   };

// // // // //   const handleAppView = (app) => {
// // // // //     setSelectedApp(app);
// // // // //   };

// // // // //   const handleGenerateToken = async (app) => {
// // // // //     try {
// // // // //       const response = await adminService.getApplicationToken(app.appId);
// // // // //       setGeneratedToken(response.token);
// // // // //       setTokenDialog(app);
// // // // //     } catch (err) {
// // // // //       console.error('Error generating token:', err);
// // // // //     }
// // // // //   };

// // // // //   const handleCopyToken = () => {
// // // // //     if (generatedToken) {
// // // // //       navigator.clipboard.writeText(generatedToken);
// // // // //       setCopied(true);
// // // // //       setTimeout(() => setCopied(false), 2000);
// // // // //     }
// // // // //   };


// // // // //   // Add these functions in BusinessList.jsx
// // // // // const handleToggleBusinessStatus = async (business, newStatus) => {
// // // // //   try {
// // // // //     await adminService.updateBusiness(business.tenantId, {
// // // // //       ...business,
// // // // //       status: newStatus,
// // // // //     });
// // // // //     fetchBusinesses(); // Refresh the list
// // // // //   } catch (err) {
// // // // //     console.error('Error updating business status:', err);
// // // // //   }
// // // // // };

// // // // // const handleToggleAppStatus = async (app, newStatus) => {
// // // // //   try {
// // // // //     await adminService.updateApplication(app.appId, {
// // // // //       ...app,
// // // // //       status: newStatus,
// // // // //     });
// // // // //     // Refresh applications list
// // // // //     if (applicationsDialog) {
// // // // //       const apps = await adminService.getBusinessApplications(applicationsDialog.tenantId);
// // // // //       setBusinessApplications(apps || []);
// // // // //     }
// // // // //   } catch (err) {
// // // // //     console.error('Error updating application status:', err);
// // // // //   }
// // // // // };
// // // // //   const handleCloseTokenDialog = () => {
// // // // //     setTokenDialog(null);
// // // // //     setGeneratedToken('');
// // // // //     setCopied(false);
// // // // //   };

// // // // //   const handleCloseAppDialog = () => {
// // // // //     setSelectedApp(null);
// // // // //   };

// // // // //   const confirmDelete = async () => {
// // // // //     if (!deleteDialog) return;
    
// // // // //     try {
// // // // //       await adminService.deleteBusiness(deleteDialog.tenantId);
// // // // //       fetchBusinesses();
// // // // //       setDeleteDialog(null);
// // // // //     } catch (err) {
// // // // //       console.error('Error deleting business:', err);
// // // // //     }
// // // // //   };

// // // // //   const getStatusColor = (status) => {
// // // // //     switch (status) {
// // // // //       case 'ACTIVE':
// // // // //         return { bg: '#ecfdf5', text: '#10b981', border: '#d1fae5' };
// // // // //       case 'PENDING':
// // // // //         return { bg: '#fef3c7', text: '#0f0681ff', border: '#fde68a' };
// // // // //       case 'INACTIVE':
// // // // //         return { bg: '#fee2e2', text: '#ff0000ff', border: '#fecaca' };
// // // // //       default:
// // // // //         return { bg: '#f1f5f9', text: '#64748b', border: '#cbd5e1' };
// // // // //     }
// // // // //   };

// // // // //   const getCredentialFields = (app) => {
// // // // //     if (!app.credentials) return [];
    
// // // // //     return Object.entries(app.credentials || {}).map(([key, value]) => ({
// // // // //       key,
// // // // //       value,
// // // // //       type: key.toLowerCase().includes('secret') || 
// // // // //             key.toLowerCase().includes('password') || 
// // // // //             key.toLowerCase().includes('token') ? 'secret' : 'apiKey',
// // // // //     }));
// // // // //   };

// // // // //   const filteredBusinesses = businesses.filter((business) => {
// // // // //     const matchesSearch = 
// // // // //       business.businessName?.toLowerCase().includes(search.toLowerCase()) ||
// // // // //       business.industry?.toLowerCase().includes(search.toLowerCase()) ||
// // // // //       business.contactEmail?.toLowerCase().includes(search.toLowerCase());
    
// // // // //     const matchesStatus = 
// // // // //       filterStatus === 'ALL' || 
// // // // //       business.status === filterStatus;
    
// // // // //     return matchesSearch && matchesStatus;
// // // // //   });

// // // // //   const columns = [
// // // // //     {
// // // // //       field: 'businessName',
// // // // //       headerName: 'Business Name',
// // // // //       sortable: true,
// // // // //     },
// // // // //     {
// // // // //       field: 'industry',
// // // // //       headerName: 'Industry',
// // // // //       sortable: true,
// // // // //     },
// // // // //     {
// // // // //       field: 'contactEmail',
// // // // //       headerName: 'Contact Email',
// // // // //       sortable: true,
// // // // //     },
// // // // //     {
// // // // //       field: 'status',
// // // // //       headerName: 'Status',
// // // // //       sortable: true,
// // // // //       render: (value) => (
// // // // //         <Chip 
// // // // //           label={value} 
// // // // //           color={BUSINESS_STATUS_COLORS[value] || 'default'} 
// // // // //           size="small" 
// // // // //         />
// // // // //       ),
// // // // //     },
// // // // //     {
// // // // //       field: 'createdAt',
// // // // //       headerName: 'Created',
// // // // //       sortable: true,
// // // // //       render: (value) => formatDate(value),
// // // // //     },
// // // // //     // {
// // // // //     //   field: 'appCount',
// // // // //     //   headerName: 'Apps',
// // // // //     //   sortable: true,
// // // // //     //   align: 'right',
// // // // //     //   render: (value) => Array.isArray(value) ? value.length : 0,
// // // // //     // },
// // // // //     {
// // // // //   field: 'appCount',
// // // // //   headerName: 'Apps',
// // // // //   sortable: true,
// // // // //   align: 'right',
// // // // //   render: (value) => value ?? 0,
// // // // // }
// // // // // ,
// // // // // {
// // // // //   field: 'actions',
// // // // //   headerName: 'Actions',
// // // // //   align: 'right',
// // // // //   render: (_, business) => (
// // // // //     <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
// // // // //       {/* View Applications */}
// // // // //       <Tooltip title="View Applications">
// // // // //         <IconButton
// // // // //           size="small"
// // // // //           onClick={() => handleViewApplications(business)}
// // // // //           sx={{ color: '#667eea' }}
// // // // //         >
// // // // //           <AppsIcon fontSize="small" />
// // // // //         </IconButton>
// // // // //       </Tooltip>
// // // // //   {/* Add this button */}
// // // // //       <Tooltip title="Create User">
// // // // //         <IconButton
// // // // //           size="small"
// // // // //           onClick={() => navigate(`/admin/businesses/${business.tenantId}/create-user`)}
// // // // //           sx={{ color: '#8b5cf6' }}
// // // // //         >
// // // // //           <PersonAddIcon fontSize="small" />
// // // // //         </IconButton>
// // // // //       </Tooltip>

// // // // //         {/* Add this button */}
// // // // //       <Tooltip title="View Users">
// // // // //         <IconButton
// // // // //           size="small"
// // // // //           onClick={() => navigate(`/admin/businesses/${business.tenantId}/users`)}
// // // // //           sx={{ color: '#8b5cf6' }}
// // // // //         >
// // // // //           <GroupsIcon fontSize="small" />
// // // // //         </IconButton>
// // // // //       </Tooltip>
// // // // //       {/* View Business */}
// // // // //       <Tooltip title="View Business">
// // // // //         <IconButton
// // // // //           size="small"
// // // // //           onClick={() => handleView(business)}
// // // // //           sx={{ color: '#666' }}
// // // // //         >
// // // // //           <ViewIcon fontSize="small" />
// // // // //         </IconButton>
// // // // //       </Tooltip>

// // // // //       {/* Edit Business */}
// // // // //       <Tooltip title="Edit Business">
// // // // //         <IconButton
// // // // //           size="small"
// // // // //           onClick={() => handleEdit(business)}
// // // // //           sx={{ color: '#f59e0b' }}
// // // // //         >
// // // // //           <EditIcon fontSize="small" />
// // // // //         </IconButton>
// // // // //       </Tooltip>

// // // // //       {/* Delete Business */}
// // // // //       <Tooltip title="Delete Business">
// // // // //         <IconButton
// // // // //           size="small"
// // // // //           onClick={() => handleDelete(business)}
// // // // //           sx={{ color: '#ef4444' }}
// // // // //         >
// // // // //           <DeleteIcon fontSize="small" />
// // // // //         </IconButton>
// // // // //       </Tooltip>

// // // // //       {/* Status Toggle */}
// // // // //       <Tooltip
// // // // //         title={business.status === 'ACTIVE' ? 'INACTIVE' : 'Activate'}
// // // // //       >
  

// // // // //         <IconButton
// // // // //           size="small"
// // // // //           onClick={() =>
// // // // //             handleToggleBusinessStatus(
// // // // //               business,
// // // // //               business.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
// // // // //             )
// // // // //           }
// // // // //           sx={{
// // // // //             color: business.status === 'ACTIVE' ? '#ff0000ff' : '#10b981',
// // // // //           }}
// // // // //         >
// // // // //           {business.status === 'ACTIVE' ? (
// // // // //             <Lock fontSize="small" />
// // // // //           ) : (
// // // // //             <LockOpen fontSize="small" />
// // // // //           )}
// // // // //         </IconButton>
// // // // //       </Tooltip>
// // // // //       {/* <Fab
// // // // //   color="primary"
// // // // //   aria-label="create user"
// // // // //   sx={{
// // // // //     position: 'fixed',
// // // // //     bottom: 16,
// // // // //     right: 16,
// // // // //   }}
// // // // //   onClick={() => {
// // // // //     // You might need to select a business first
// // // // //     alert('Select a business first, then click its Create User button');
// // // // //   }}
// // // // // >
// // // // //   <PersonAddIcon />
// // // // // </Fab> */}
// // // // //     </Box>
// // // // //   ),
// // // // // },

// // // // //   ];

// // // // //   if (loading) {
// // // // //     return <LoadingSpinner />;
// // // // //   }

// // // // //   return (
// // // // //     <Box sx={{ p: 3 }}>
// // // // //       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
// // // // //         <Typography variant="h4">Businesses</Typography>
// // // // //         <Button
// // // // //           variant="contained"
// // // // //           startIcon={<AddIcon />}
// // // // //           onClick={() => navigate('/admin/businesses/create')}
// // // // //         >
// // // // //           Add Business
// // // // //         </Button>
// // // // //       </Box>

// // // // //       <Grid container spacing={2} sx={{ mb: 3 }}>
// // // // //         <Grid item xs={12} md={6}>
// // // // //           <TextField
// // // // //             fullWidth
// // // // //             placeholder="Search businesses..."
// // // // //             value={searchInput} // Use searchInput instead of search
// // // // //             onChange={handleSearch}
// // // // //             InputProps={{
// // // // //               startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
// // // // //             }}
// // // // //           />
// // // // //         </Grid>
// // // // //         <Grid item xs={12} md={6}>
// // // // //           <Box sx={{ display: 'flex', gap: 1 }}>
// // // // //             <Chip
// // // // //               label="All"
// // // // //               onClick={() => handleStatusFilter('ALL')}
// // // // //               color={filterStatus === 'ALL' ? 'primary' : 'default'}
// // // // //               variant={filterStatus === 'ALL' ? 'filled' : 'outlined'}
// // // // //             />
// // // // //             {Object.values(BUSINESS_STATUS).map((status) => (
// // // // //               <Chip
// // // // //                 key={status}
// // // // //                 label={status}
// // // // //                 onClick={() => handleStatusFilter(status)}
// // // // //                 color={filterStatus === status ? 'primary' : 'default'}
// // // // //                 variant={filterStatus === status ? 'filled' : 'outlined'}
// // // // //               />
// // // // //             ))}
// // // // //           </Box>
// // // // //         </Grid>
// // // // //       </Grid>

// // // // //       {/* Add filter summary */}
// // // // //       {(search || filterStatus !== 'ALL') && (
// // // // //         <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
// // // // //           <Typography variant="body2" color="textSecondary">
// // // // //             Active filters:
// // // // //           </Typography>
// // // // //           {search && (
// // // // //             <Chip
// // // // //               label={`Search: "${search}"`}
// // // // //               size="small"
// // // // //               onDelete={() => {
// // // // //                 setSearch('');
// // // // //                 setSearchInput('');
// // // // //                 setPage(0);
// // // // //               }}
// // // // //             />
// // // // //           )}
// // // // //           {filterStatus !== 'ALL' && (
// // // // //             <Chip
// // // // //               label={`Status: ${filterStatus}`}
// // // // //               size="small"
// // // // //               onDelete={() => {
// // // // //                 setFilterStatus('ALL');
// // // // //                 setPage(0);
// // // // //               }}
// // // // //             />
// // // // //           )}
// // // // //           <Button 
// // // // //             size="small" 
// // // // //             onClick={() => {
// // // // //               setSearch('');
// // // // //               setSearchInput('');
// // // // //               setFilterStatus('ALL');
// // // // //               setPage(0);
// // // // //             }}
// // // // //           >
// // // // //             Clear all
// // // // //           </Button>
// // // // //         </Box>
// // // // //       )}

// // // // //       {error ? (
// // // // //         <Typography color="error" sx={{ mb: 2 }}>
// // // // //           {error}
// // // // //         </Typography>
// // // // //       ) : null}

// // // // //         <DataTable
// // // // //         columns={columns}
// // // // //         data={businesses}
// // // // //         page={page}
// // // // //         rowsPerPage={rowsPerPage}
// // // // //         totalRows={totalRows}
// // // // //         onPageChange={setPage}
// // // // //         onRowsPerPageChange={setRowsPerPage}
// // // // //         // REMOVE THESE 3 LINES if they exist:
// // // // //         // onView={handleView}
// // // // //         // onEdit={handleEdit}
// // // // //         // onDelete={handleDelete}
// // // // //       />


// // // // //       {/* Delete Business Dialog */}
// // // // //       <Dialog open={!!deleteDialog} onClose={() => setDeleteDialog(null)}>
// // // // //         <DialogTitle>Delete Business</DialogTitle>
// // // // //         <DialogContent>
// // // // //           Are you sure you want to delete "{deleteDialog?.businessName}"? 
// // // // //           This action cannot be undone.
// // // // //         </DialogContent>
// // // // //         <DialogActions>
// // // // //           <Button onClick={() => setDeleteDialog(null)}>Cancel</Button>
// // // // //           <Button onClick={confirmDelete} color="error">
// // // // //             Delete
// // // // //           </Button>
// // // // //         </DialogActions>
// // // // //       </Dialog>


// // // // // {/* Delete Business Dialog */}
// // // // // <Dialog open={!!deleteDialog} onClose={() => setDeleteDialog(null)}>
// // // // //   <DialogTitle>Delete Business</DialogTitle>
// // // // //   <DialogContent>
// // // // //     Are you sure you want to delete "{deleteDialog?.businessName}"? 
// // // // //     This action cannot be undone.
// // // // //   </DialogContent>
// // // // //   <DialogActions>
// // // // //     <Button onClick={() => setDeleteDialog(null)}>Cancel</Button>
// // // // //     <Button onClick={confirmDelete} color="error">
// // // // //       Delete
// // // // //     </Button>
// // // // //   </DialogActions>
// // // // // </Dialog>

// // // // // {/* ======== ADD THIS DELETE APPLICATION DIALOG ======== */}
// // // // // {/* Delete Application Dialog */}
// // // // // <Dialog open={!!deleteAppDialog} onClose={() => setDeleteAppDialog(null)}>
// // // // //   <DialogTitle>Delete Application</DialogTitle>
// // // // //   <DialogContent>
// // // // //     Are you sure you want to delete "{deleteAppDialog?.name}"? 
// // // // //     This action cannot be undone.
// // // // //   </DialogContent>
// // // // //   <DialogActions>
// // // // //     <Button onClick={() => setDeleteAppDialog(null)}>Cancel</Button>
// // // // //     <Button onClick={handleDeleteAppConfirm} color="error">
// // // // //       Delete
// // // // //     </Button>
// // // // //   </DialogActions>
// // // // // </Dialog>


// // // // // {/* Business Applications Dialog */}
// // // // // <Dialog 
// // // // //   open={!!applicationsDialog} 
// // // // //   onClose={handleCloseApplicationsDialog}
// // // // //   maxWidth="md"
// // // // //   fullWidth
// // // // //   PaperProps={{
// // // // //     sx: {
// // // // //       borderRadius: 3,
// // // // //       maxHeight: '90vh',
// // // // //     }
// // // // //   }}
// // // // // >
// // // // //   {applicationsDialog && (
// // // // //     <>
// // // // //       <DialogTitle sx={{ pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// // // // //         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
// // // // //           <Avatar sx={{ background: '#ede9fe', color: '#667eea' }}>
// // // // //             <AppsIcon />
// // // // //           </Avatar>
// // // // //           <Box>
// // // // //             <Typography variant="h6" fontWeight={700}>
// // // // //               {applicationsDialog.businessName} - Applications
// // // // //             </Typography>
// // // // //             <Typography variant="caption" sx={{ color: '#64748b' }}>
// // // // //               {applicationsDialog.industry} • {applicationsDialog.contactEmail}
// // // // //             </Typography>
// // // // //           </Box>
// // // // //         </Box>
// // // // //         <IconButton onClick={handleCloseApplicationsDialog} size="small">
// // // // //           <CloseIcon />
// // // // //         </IconButton>
// // // // //       </DialogTitle>
      
// // // // //       <DialogContent dividers sx={{ p: 3, background: '#f8fafc' }}>
// // // // //         {loadingApplications ? (
// // // // //           <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
// // // // //             <LoadingSpinner />
// // // // //           </Box>
// // // // //         ) : businessApplications.length === 0 ? (
// // // // //           <Paper
// // // // //             elevation={0}
// // // // //             sx={{
// // // // //               borderRadius: 3,
// // // // //               border: '1px solid #e2e8f0',
// // // // //               background: 'white',
// // // // //               p: 6,
// // // // //               textAlign: 'center',
// // // // //             }}
// // // // //           >
// // // // //             <Avatar
// // // // //               sx={{
// // // // //                 width: 80,
// // // // //                 height: 80,
// // // // //                 background: '#f1f5f9',
// // // // //                 color: '#94a3b8',
// // // // //                 mx: 'auto',
// // // // //                 mb: 2,
// // // // //               }}
// // // // //             >
// // // // //               <AppsIcon sx={{ fontSize: 40 }} />
// // // // //             </Avatar>
// // // // //             <Typography variant="h6" fontWeight={600} sx={{ color: '#0f172a', mb: 1 }}>
// // // // //               No Applications
// // // // //             </Typography>
// // // // //             <Typography variant="body2" sx={{ color: '#64748b' }}>
// // // // //               This business doesn't have any applications yet.
// // // // //             </Typography>
// // // // //           </Paper>
// // // // //         ) : (
// // // // //           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
// // // // //             {businessApplications.map((app, index) => {
// // // // //               const statusColor = getStatusColor(app.status);
// // // // //               return (
// // // // //                 <Paper
// // // // //                   key={app.appId || index}
// // // // //                   elevation={0}
// // // // //                   sx={{
// // // // //                     borderRadius: 2,
// // // // //                     border: '1px solid #e2e8f0',
// // // // //                     background: 'white',
// // // // //                     transition: 'all 0.3s ease',
// // // // //                     '&:hover': {
// // // // //                       boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
// // // // //                       borderColor: '#cbd5e1',
// // // // //                     },
// // // // //                   }}
// // // // //                 >
// // // // //                   <CardContent sx={{ p: 2 }}>
// // // // //                     <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
// // // // //                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
// // // // //                         <Avatar
// // // // //                           sx={{
// // // // //                             width: 40,
// // // // //                             height: 40,
// // // // //                             background: '#ede9fe',
// // // // //                             color: '#667eea',
// // // // //                           }}
// // // // //                         >
// // // // //                           <AppsIcon fontSize="small" />
// // // // //                         </Avatar>
// // // // //                         <Box>
// // // // //                           <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#0f172a' }}>
// // // // //                             {app.name}
// // // // //                           </Typography>
// // // // //                           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
// // // // //                             <Chip
// // // // //                               label={app.type}
// // // // //                               size="small"
// // // // //                               sx={{
// // // // //                                 backgroundColor: '#f1f5f9',
// // // // //                                 color: '#64748b',
// // // // //                                 fontWeight: 600,
// // // // //                                 fontSize: '0.65rem',
// // // // //                                 height: 20,
// // // // //                               }}
// // // // //                             />
// // // // //                             <Chip
// // // // //                               label={app.status}
// // // // //                               size="small"
// // // // //                               sx={{
// // // // //                                 backgroundColor: statusColor.bg,
// // // // //                                 color: statusColor.text,
// // // // //                                 border: `1px solid ${statusColor.border}`,
// // // // //                                 fontWeight: 600,
// // // // //                                 fontSize: '0.65rem',
// // // // //                                 height: 20,
// // // // //                               }}
// // // // //                             />
// // // // //                           </Box>
// // // // //                         </Box>
// // // // //                       </Box>
                      
// // // // //                       <Box sx={{ display: 'flex', gap: 1 }}>
// // // // //                         {/* Status Toggle Button */}
// // // // //   <Tooltip title={app.status === 'ACTIVE' ? 'INACTIVE' : 'Activate'}>
// // // // //     <IconButton
// // // // //       size="small"
// // // // //       onClick={() => handleToggleAppStatus(
// // // // //         app,
// // // // //         app.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
// // // // //       )}
// // // // //       sx={{
// // // // //         color: app.status === 'ACTIVE' ? '#ef4444' : '#10b981',
// // // // //         '&:hover': {
// // // // //           backgroundColor: app.status === 'ACTIVE' ? '#fee2e2' : '#ecfdf5',
// // // // //         },
// // // // //       }}
// // // // //     >
// // // // //       {app.status === 'ACTIVE' ? (
// // // // //         <Lock fontSize="small" />
// // // // //       ) : (
// // // // //         <LockOpen fontSize="small" />
// // // // //       )}
// // // // //     </IconButton>
// // // // //   </Tooltip>
// // // // //                         <Tooltip title="View Details">
// // // // //                           <IconButton
// // // // //                             size="small"
// // // // //                             onClick={() => handleAppView(app)}
// // // // //                             sx={{ color: '#667eea', '&:hover': { backgroundColor: '#ede9fe' } }}
// // // // //                           >
// // // // //                             <ViewIcon fontSize="small" />
// // // // //                           </IconButton>
// // // // //                         </Tooltip>
// // // // //                         <Tooltip title="Edit Application">
// // // // //                           <IconButton
// // // // //                             size="small"
// // // // //                             onClick={() => navigate(`/admin/applications/${app.appId}/edit`)}
// // // // //                             sx={{ color: '#f59e0b', '&:hover': { backgroundColor: '#fef3c7' } }}
// // // // //                           >
// // // // //                             <EditIcon fontSize="small" />
// // // // //                           </IconButton>
// // // // //                         </Tooltip>
// // // // //                         <Tooltip title="Generate Token">
// // // // //                           <IconButton
// // // // //                             size="small"
// // // // //                             onClick={() => handleGenerateToken(app)}
// // // // //                             sx={{ color: '#10b981', '&:hover': { backgroundColor: '#ecfdf5' } }}
// // // // //                           >
// // // // //                             <KeyIcon fontSize="small" />
// // // // //                           </IconButton>
// // // // //                         </Tooltip>
// // // // //                         <Tooltip title="Delete Application">
// // // // //                           <IconButton
// // // // //                             size="small"
// // // // //                             onClick={() => handleDeleteApp(app)}
// // // // //                             sx={{ color: '#ef4444', '&:hover': { backgroundColor: '#fee2e2' } }}
// // // // //                           >
// // // // //                             <DeleteIcon fontSize="small" />
// // // // //                           </IconButton>
// // // // //                         </Tooltip>
// // // // //                       </Box>
// // // // //                     </Box>

// // // // //                     {app.description && (
// // // // //                       <Typography
// // // // //                         variant="body2"
// // // // //                         sx={{
// // // // //                           color: '#64748b',
// // // // //                           fontSize: '0.875rem',
// // // // //                           mb: 1,
// // // // //                           ml: 6, // Align with the avatar
// // // // //                         }}
// // // // //                       >
// // // // //                         {app.description}
// // // // //                       </Typography>
// // // // //                     )}

// // // // //                     <Box
// // // // //                       sx={{
// // // // //                         display: 'flex',
// // // // //                         alignItems: 'center',
// // // // //                         gap: 1,
// // // // //                         mt: 1,
// // // // //                         pt: 1,
// // // // //                         borderTop: '1px solid #f1f5f9',
// // // // //                         ml: 6, // Align with the avatar
// // // // //                       }}
// // // // //                     >
// // // // //                       <AccessTime sx={{ fontSize: 14, color: '#94a3b8' }} />
// // // // //                       <Typography variant="caption" sx={{ color: '#64748b' }}>
// // // // //                         Created {formatDate(app.createdAt)}
// // // // //                       </Typography>
// // // // //                       {app.updatedAt && (
// // // // //                         <>
// // // // //                           <Typography variant="caption" sx={{ color: '#cbd5e1' }}>•</Typography>
// // // // //                           <Typography variant="caption" sx={{ color: '#64748b' }}>
// // // // //                             Updated {formatDate(app.updatedAt)}
// // // // //                           </Typography>
// // // // //                         </>
// // // // //                       )}
// // // // //                     </Box>

// // // // //                     {/* Show masked credentials preview */}
// // // // //                     {app.credentials && Object.keys(app.credentials).length > 0 && (
// // // // //                       <Box
// // // // //                         sx={{
// // // // //                           mt: 1,
// // // // //                           pt: 1,
// // // // //                           borderTop: '1px dashed #e2e8f0',
// // // // //                           ml: 6,
// // // // //                         }}
// // // // //                       >
// // // // //                         <Typography variant="caption" fontWeight={600} sx={{ color: '#64748b', display: 'block', mb: 0.5 }}>
// // // // //                           Credentials:
// // // // //                         </Typography>
// // // // //                         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
// // // // //                           {Object.keys(app.credentials).map((key) => (
// // // // //                             <Chip
// // // // //                               key={key}
// // // // //                               label={`${key}: ••••••••`}
// // // // //                               size="small"
// // // // //                               sx={{
// // // // //                                 backgroundColor: '#fef3c7',
// // // // //                                 color: '#92400e',
// // // // //                                 fontSize: '0.7rem',
// // // // //                                 height: 20,
// // // // //                               }}
// // // // //                             />
// // // // //                           ))}
// // // // //                         </Box>
// // // // //                       </Box>
// // // // //                     )}
// // // // //                   </CardContent>
// // // // //                 </Paper>
// // // // //               );
// // // // //             })}
// // // // //           </Box>
// // // // //         )}
// // // // //       </DialogContent>
      
// // // // //       <DialogActions sx={{ p: 2, gap: 1 }}>
// // // // //         <Button
// // // // //           variant="outlined"
// // // // //           startIcon={<AddIcon />}
// // // // //           onClick={() => navigate(`/admin/business/${applicationsDialog.tenantId}/applications/create`)}
// // // // //           sx={{
// // // // //             textTransform: 'none',
// // // // //             fontWeight: 600,
// // // // //           }}
// // // // //         >
// // // // //           Add New Application
// // // // //         </Button>
// // // // //         <Button 
// // // // //           onClick={handleCloseApplicationsDialog}
// // // // //           sx={{
// // // // //             textTransform: 'none',
// // // // //             fontWeight: 600,
// // // // //             color: '#64748b',
// // // // //           }}
// // // // //         >
// // // // //           Close
// // // // //         </Button>
// // // // //       </DialogActions>
// // // // //     </>
// // // // //   )}
// // // // // </Dialog>



// // // // //       {/* Application Details Dialog */}
// // // // //       <Dialog 
// // // // //         open={!!selectedApp} 
// // // // //         onClose={handleCloseAppDialog}
// // // // //         maxWidth="md"
// // // // //         fullWidth
// // // // //         PaperProps={{
// // // // //           sx: {
// // // // //             borderRadius: 3,
// // // // //             boxShadow: '0 24px 48px rgba(0, 0, 0, 0.12)',
// // // // //           }
// // // // //         }}
// // // // //       >
// // // // //         {selectedApp && (
// // // // //           <>
// // // // //             <DialogTitle sx={{ pb: 1 }}>
// // // // //               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
// // // // //                 <Avatar sx={{ background: '#ede9fe', color: '#667eea' }}>
// // // // //                   <AppsIcon />
// // // // //                 </Avatar>
// // // // //                 <Box sx={{ flex: 1 }}>
// // // // //                   <Typography variant="h6" fontWeight={700}>
// // // // //                     {selectedApp.name}
// // // // //                   </Typography>
// // // // //                 </Box>
// // // // //                 <Chip
// // // // //                   label={selectedApp.status}
// // // // //                   size="small"
// // // // //                   sx={{
// // // // //                     backgroundColor: getStatusColor(selectedApp.status).bg,
// // // // //                     color: getStatusColor(selectedApp.status).text,
// // // // //                     border: `1px solid ${getStatusColor(selectedApp.status).border}`,
// // // // //                     fontWeight: 600,
// // // // //                   }}
// // // // //                 />
// // // // //               </Box>
// // // // //             </DialogTitle>
            
// // // // //             <DialogContent dividers sx={{ p: 3, background: '#f8fafc' }}>
// // // // //               <Grid container spacing={3}>
// // // // //                 {/* Basic Information */}
// // // // //                 <Grid item xs={12}>
// // // // //                   <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid #e2e8f0' }}>
// // // // //                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
// // // // //                       <Settings sx={{ color: '#667eea', fontSize: 20 }} />
// // // // //                       <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#0f172a' }}>
// // // // //                         Basic Information
// // // // //                       </Typography>
// // // // //                     </Box>
// // // // //                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
// // // // //                       <Box sx={{ display: 'flex', gap: 2 }}>
// // // // //                         <Typography variant="body2" fontWeight={600} sx={{ color: '#64748b', minWidth: 100 }}>
// // // // //                           Type:
// // // // //                         </Typography>
// // // // //                         <Typography variant="body2" sx={{ color: '#0f172a' }}>
// // // // //                           {selectedApp.type}
// // // // //                         </Typography>
// // // // //                       </Box>
// // // // //                       <Box sx={{ display: 'flex', gap: 2 }}>
// // // // //                         <Typography variant="body2" fontWeight={600} sx={{ color: '#64748b', minWidth: 100 }}>
// // // // //                           Created:
// // // // //                         </Typography>
// // // // //                         <Typography variant="body2" sx={{ color: '#0f172a' }}>
// // // // //                           {formatDate(selectedApp.createdAt)}
// // // // //                         </Typography>
// // // // //                       </Box>
// // // // //                       {selectedApp.updatedAt && (
// // // // //                         <Box sx={{ display: 'flex', gap: 2 }}>
// // // // //                           <Typography variant="body2" fontWeight={600} sx={{ color: '#64748b', minWidth: 100 }}>
// // // // //                             Updated:
// // // // //                           </Typography>
// // // // //                           <Typography variant="body2" sx={{ color: '#0f172a' }}>
// // // // //                             {formatDate(selectedApp.updatedAt)}
// // // // //                           </Typography>
// // // // //                         </Box>
// // // // //                       )}
// // // // //                     </Box>
// // // // //                   </Paper>
// // // // //                 </Grid>

// // // // //                 {/* Configuration */}
// // // // //                 {selectedApp.configuration && Object.keys(selectedApp.configuration).length > 0 && (
// // // // //                   <Grid item xs={12}>
// // // // //                     <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid #e2e8f0' }}>
// // // // //                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
// // // // //                         <Settings sx={{ color: '#667eea', fontSize: 20 }} />
// // // // //                         <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#0f172a' }}>
// // // // //                           Configuration
// // // // //                         </Typography>
// // // // //                       </Box>
// // // // //                       <Grid container spacing={2}>
// // // // //                         {Object.entries(selectedApp.configuration).map(([key, value]) => (
// // // // //                           <Grid item xs={12} sm={6} key={key}>
// // // // //                             <Box
// // // // //                               sx={{
// // // // //                                 p: 2,
// // // // //                                 borderRadius: 2,
// // // // //                                 background: '#f8fafc',
// // // // //                                 border: '1px solid #e2e8f0',
// // // // //                               }}
// // // // //                             >
// // // // //                               <Typography variant="caption" fontWeight={600} sx={{ color: '#64748b', display: 'block', mb: 0.5 }}>
// // // // //                                 {key}
// // // // //                               </Typography>
// // // // //                               <Typography variant="body2" sx={{ color: '#0f172a' }}>
// // // // //                                 {value}
// // // // //                               </Typography>
// // // // //                             </Box>
// // // // //                           </Grid>
// // // // //                         ))}
// // // // //                       </Grid>
// // // // //                     </Paper>
// // // // //                   </Grid>
// // // // //                 )}

// // // // //                 {/* Credentials */}
// // // // //                 {selectedApp.credentials && Object.keys(selectedApp.credentials).length > 0 && (
// // // // //                   <Grid item xs={12}>
// // // // //                     <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid #fde68a', background: '#fefce8' }}>
// // // // //                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
// // // // //                         <Lock sx={{ color: '#f59e0b', fontSize: 20 }} />
// // // // //                         <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#0f172a' }}>
// // // // //                           Credentials (Masked)
// // // // //                         </Typography>
// // // // //                       </Box>
// // // // //                       <Typography variant="caption" sx={{ color: '#92400e', display: 'block', mb: 2 }}>
// // // // //                         Sensitive information is encrypted and masked for security
// // // // //                       </Typography>
// // // // //                       <Grid container spacing={2}>
// // // // //                         {getCredentialFields(selectedApp).map((field) => (
// // // // //                           <Grid item xs={12} sm={6} key={field.key}>
// // // // //                             <MaskedText
// // // // //                               label={field.key}
// // // // //                               value={field.value}
// // // // //                               type={field.type}
// // // // //                               showCopy={true}
// // // // //                               showToggle={true}
// // // // //                               fullWidth
// // // // //                             />
// // // // //                           </Grid>
// // // // //                         ))}
// // // // //                       </Grid>
// // // // //                     </Paper>
// // // // //                   </Grid>
// // // // //                 )}
// // // // //               </Grid>
// // // // //             </DialogContent>
            
// // // // //             <DialogActions sx={{ p: 3, gap: 1 }}>
// // // // //               <Button 
// // // // //                 onClick={handleCloseAppDialog}
// // // // //                 sx={{
// // // // //                   textTransform: 'none',
// // // // //                   fontWeight: 600,
// // // // //                   color: '#64748b',
// // // // //                 }}
// // // // //               >
// // // // //                 Close
// // // // //               </Button>
// // // // //               <Button 
// // // // //                 variant="contained"
// // // // //                 onClick={() => handleGenerateToken(selectedApp)}
// // // // //                 startIcon={<KeyIcon />}
// // // // //                 sx={{
// // // // //                   textTransform: 'none',
// // // // //                   fontWeight: 600,
// // // // //                   background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// // // // //                   boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
// // // // //                   '&:hover': {
// // // // //                     boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)',
// // // // //                   },
// // // // //                 }}
// // // // //               >
// // // // //                 Generate Token
// // // // //               </Button>
// // // // //             </DialogActions>
// // // // //           </>
// // // // //         )}
// // // // //       </Dialog>

// // // // //       {/* Token Dialog */}
// // // // //       <Dialog 
// // // // //         open={!!tokenDialog} 
// // // // //         onClose={handleCloseTokenDialog}
// // // // //         maxWidth="sm"
// // // // //         fullWidth
// // // // //         PaperProps={{
// // // // //           sx: {
// // // // //             borderRadius: 3,
// // // // //             boxShadow: '0 24px 48px rgba(0, 0, 0, 0.12)',
// // // // //           }
// // // // //         }}
// // // // //       >
// // // // //         {tokenDialog && (
// // // // //           <>
// // // // //             <DialogTitle sx={{ pb: 1 }}>
// // // // //               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
// // // // //                 <Avatar sx={{ background: '#ecfdf5', color: '#10b981' }}>
// // // // //                   <KeyIcon />
// // // // //                 </Avatar>
// // // // //                 <Box>
// // // // //                   <Typography variant="h6" fontWeight={700}>
// // // // //                     Application Token
// // // // //                   </Typography>
// // // // //                   <Typography variant="caption" sx={{ color: '#64748b' }}>
// // // // //                     {tokenDialog.name}
// // // // //                   </Typography>
// // // // //                 </Box>
// // // // //               </Box>
// // // // //             </DialogTitle>
            
// // // // //             <DialogContent sx={{ p: 3 }}>
// // // // //               <Paper
// // // // //                 elevation={0}
// // // // //                 sx={{
// // // // //                   p: 2,
// // // // //                   mb: 2,
// // // // //                   borderRadius: 2,
// // // // //                   background: '#fef3c7',
// // // // //                   border: '1px solid #fde68a',
// // // // //                 }}
// // // // //               >
// // // // //                 <Typography variant="body2" sx={{ color: '#92400e' }}>
// // // // //                   ⚠️ Keep this token secure and do not share it publicly. It provides access to your application.
// // // // //                 </Typography>
// // // // //               </Paper>

// // // // //               {generatedToken ? (
// // // // //                 <Paper
// // // // //                   elevation={0}
// // // // //                   sx={{
// // // // //                     p: 2,
// // // // //                     borderRadius: 2,
// // // // //                     background: '#f1f5f9',
// // // // //                     border: '1px solid #cbd5e1',
// // // // //                     position: 'relative',
// // // // //                     fontFamily: 'monospace',
// // // // //                     wordBreak: 'break-all',
// // // // //                     fontSize: '0.875rem',
// // // // //                     color: '#0f172a',
// // // // //                   }}
// // // // //                 >
// // // // //                   {generatedToken}
// // // // //                   <Tooltip title={copied ? "Copied!" : "Copy token"}>
// // // // //                     <IconButton
// // // // //                       size="small"
// // // // //                       onClick={handleCopyToken}
// // // // //                       sx={{
// // // // //                         position: 'absolute',
// // // // //                         top: 8,
// // // // //                         right: 8,
// // // // //                         background: 'white',
// // // // //                         boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
// // // // //                         '&:hover': {
// // // // //                           background: '#667eea',
// // // // //                           color: 'white',
// // // // //                         },
// // // // //                       }}
// // // // //                     >
// // // // //                       {copied ? <CheckCircle fontSize="small" /> : <CopyIcon fontSize="small" />}
// // // // //                     </IconButton>
// // // // //                   </Tooltip>
// // // // //                 </Paper>
// // // // //               ) : (
// // // // //                 <Box sx={{ textAlign: 'center', py: 3 }}>
// // // // //                   <Typography variant="body2" sx={{ color: '#64748b' }}>
// // // // //                     Generating token...
// // // // //                   </Typography>
// // // // //                 </Box>
// // // // //               )}
// // // // //             </DialogContent>
            
// // // // //             <DialogActions sx={{ p: 3 }}>
// // // // //               <Button 
// // // // //                 onClick={handleCloseTokenDialog}
// // // // //                 variant="contained"
// // // // //                 fullWidth
// // // // //                 sx={{
// // // // //                   textTransform: 'none',
// // // // //                   fontWeight: 600,
// // // // //                   background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// // // // //                 }}
// // // // //               >
// // // // //                 Done
// // // // //               </Button>
// // // // //             </DialogActions>
// // // // //           </>
// // // // //         )}
// // // // //       </Dialog>
// // // // //     </Box>
// // // // //   );
// // // // // };

// // // // // export default BusinessList;



// // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // import { debounce } from 'lodash';
// // // // import {
// // // //   Box,
// // // //   Typography,
// // // //   Button,
// // // //   TextField,
// // // //   Grid,
// // // //   Chip,
// // // //   IconButton,
// // // //   Dialog,
// // // //   DialogTitle,
// // // //   DialogContent,
// // // //   DialogActions,
// // // //   Avatar,
// // // //   Paper,
// // // //   Tooltip,
// // // // } from '@mui/material';
// // // // import {
// // // //   Add as AddIcon,
// // // //   Search as SearchIcon,
// // // //   Apps as AppsIcon,
// // // //   Edit as EditIcon,
// // // //   Delete as DeleteIcon,
// // // //   Visibility as ViewIcon,
// // // //   Lock,
// // // //   LockOpen,
// // // //   Close as CloseIcon,
// // // //   PersonAdd as PersonAddIcon,
// // // //   Groups as GroupsIcon,
// // // // } from '@mui/icons-material';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import DataTable from '../common/DataTable';
// // // // import LoadingSpinner from '../common/LoadingSpinner';
// // // // import { adminService } from '../../services/admin';
// // // // import { BUSINESS_STATUS, BUSINESS_STATUS_COLORS } from '../../utils/constants';

// // // // const BusinessList = () => {
// // // //   const navigate = useNavigate();
// // // //   const [businesses, setBusinesses] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);
// // // //   const [search, setSearch] = useState('');
// // // //   const [searchInput, setSearchInput] = useState('');
// // // //   const [filterStatus, setFilterStatus] = useState('ALL');
// // // //   const [page, setPage] = useState(0);
// // // //   const [rowsPerPage, setRowsPerPage] = useState(10);
// // // //   const [deleteDialog, setDeleteDialog] = useState(null);
// // // //   const [totalRows, setTotalRows] = useState(0);

// // // //   const debouncedSearch = useCallback(
// // // //     debounce((value) => {
// // // //       setSearch(value);
// // // //       setPage(0);
// // // //     }, 500),
// // // //     []
// // // //   );

// // // //   useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

// // // //   useEffect(() => {
// // // //     fetchBusinesses();
// // // //   }, [page, rowsPerPage, search, filterStatus]);

// // // //   const fetchBusinesses = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const res = await adminService.getAllBusinesses(
// // // //         page,
// // // //         rowsPerPage,
// // // //         search,
// // // //         filterStatus !== 'ALL' ? filterStatus : ''
// // // //       );
// // // //       setBusinesses(res.data || []);
// // // //       setTotalRows(res.total || 0);
// // // //     } catch (err) {
// // // //       setError('Failed to load businesses');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const columns = [
// // // //     { field: 'businessName', headerName: 'Business Name', sortable: true },
// // // //     { field: 'industry', headerName: 'Industry', sortable: true },
// // // //     { field: 'email', headerName: 'Contact Email', sortable: true },
// // // //     {
// // // //       field: 'status',
// // // //       headerName: 'Status',
// // // //       sortable: true,
// // // //       render: (value) => (
// // // //         <Chip
// // // //           label={value}
// // // //           size="small"
// // // //           color={BUSINESS_STATUS_COLORS[value] || 'default'}
// // // //         />
// // // //       ),
// // // //     },
// // // //     {
// // // //       field: 'appCount',
// // // //       headerName: 'Apps',
// // // //       align: 'right',
// // // //       render: (v) => v ?? 0,
// // // //     },
// // // //     {
// // // //   field: 'actions',
// // // //   headerName: 'Actions',
// // // //   align: 'center',
// // // //   render: (_, business) => (
// // // //     <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
// // // //       {/* View Applications */}
// // // //       <Tooltip title="View Applications">
// // // //         <IconButton
// // // //           size="small"
// // // //           onClick={() =>
// // // //             navigate(`/admin/businesses/${business.tenantId}`)
// // // //           }
// // // //           sx={{
// // // //             color: '#667eea',
// // // //             '&:hover': { backgroundColor: '#ede9fe' },
// // // //           }}
// // // //         >
// // // //           <AppsIcon fontSize="small" />
// // // //         </IconButton>
// // // //       </Tooltip>

// // // //       {/* Create User */}
// // // //       <Tooltip title="Create User">
// // // //         <IconButton
// // // //           size="small"
// // // //           onClick={() =>
// // // //             navigate(`/admin/businesses/${business.tenantId}/create-user`)
// // // //           }
// // // //           sx={{
// // // //             color: '#8b5cf6',
// // // //             '&:hover': { backgroundColor: '#f3e8ff' },
// // // //           }}
// // // //         >
// // // //           <PersonAddIcon fontSize="small" />
// // // //         </IconButton>
// // // //       </Tooltip>

// // // //       {/* View Users */}
// // // //       <Tooltip title="View Users">
// // // //         <IconButton
// // // //           size="small"
// // // //           onClick={() =>
// // // //             navigate(`/admin/businesses/${business.tenantId}/users`)
// // // //           }
// // // //           sx={{
// // // //             color: '#7c3aed',
// // // //             '&:hover': { backgroundColor: '#ede9fe' },
// // // //           }}
// // // //         >
// // // //           <GroupsIcon fontSize="small" />
// // // //         </IconButton>
// // // //       </Tooltip>

// // // //       {/* View Business */}
// // // //       <Tooltip title="View Business">
// // // //         <IconButton
// // // //           size="small"
// // // //           sx={{
// // // //             color: '#64748b',
// // // //             '&:hover': { backgroundColor: '#f1f5f9' },
// // // //           }}
// // // //         >
// // // //           <ViewIcon fontSize="small" />
// // // //         </IconButton>
// // // //       </Tooltip>

// // // //       {/* Edit Business */}
// // // //       <Tooltip title="Edit Business">
// // // //         <IconButton
// // // //           size="small"
// // // //           sx={{
// // // //             color: '#f59e0b',
// // // //             '&:hover': { backgroundColor: '#fef3c7' },
// // // //           }}
// // // //         >
// // // //           <EditIcon fontSize="small" />
// // // //         </IconButton>
// // // //       </Tooltip>

// // // //       {/* Delete Business */}
// // // //       <Tooltip title="Delete Business">
// // // //         <IconButton
// // // //           size="small"
// // // //           onClick={() => setDeleteDialog(business)}
// // // //           sx={{
// // // //             color: '#ef4444',
// // // //             '&:hover': { backgroundColor: '#fee2e2' },
// // // //           }}
// // // //         >
// // // //           <DeleteIcon fontSize="small" />
// // // //         </IconButton>
// // // //       </Tooltip>

// // // //       {/* Status Toggle */}
// // // //       <Tooltip
// // // //         title={business.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
// // // //       >
// // // //         <IconButton
// // // //           size="small"
// // // //           sx={{
// // // //             color:
// // // //               business.status === 'ACTIVE'
// // // //                 ? '#ef4444'
// // // //                 : '#10b981',
// // // //             '&:hover': {
// // // //               backgroundColor:
// // // //                 business.status === 'ACTIVE'
// // // //                   ? '#fee2e2'
// // // //                   : '#ecfdf5',
// // // //             },
// // // //           }}
// // // //         >
// // // //           {business.status === 'ACTIVE' ? (
// // // //             <Lock fontSize="small" />
// // // //           ) : (
// // // //             <LockOpen fontSize="small" />
// // // //           )}
// // // //         </IconButton>
// // // //       </Tooltip>
// // // //     </Box>
// // // //   ),
// // // // },
// // // //   ];

// // // //   if (loading) return <LoadingSpinner />;

// // // //   return (
// // // //     <Box
// // // //       sx={{
// // // //         minHeight: '100%',
// // // //         background:
// // // //           'linear-gradient(135deg, #f8fbff 0%, #eef5ff 45%, #e6f0ff 100%)',
// // // //         p: 3,
// // // //       }}
// // // //     >
// // // //       {/* HEADER */}
// // // //       <Box sx={{ mb: 2 }}>
// // // //         <Typography
// // // //           variant="h5"
// // // //           sx={{
// // // //             fontWeight: 700,
// // // //             background: 'linear-gradient(90deg,#1a365d,#3182ce)',
// // // //             WebkitBackgroundClip: 'text',
// // // //             WebkitTextFillColor: 'transparent',
// // // //           }}
// // // //         >
// // // //           Businesses
// // // //         </Typography>
// // // //         <Typography variant="body2" sx={{ color: '#64748b' }}>
// // // //           Manage registered businesses and applications
// // // //         </Typography>
// // // //       </Box>

// // // //       {/* MAIN CARD */}
// // // //       <Paper
// // // //         elevation={0}
// // // //         sx={{
// // // //           borderRadius: 3,
// // // //           border: '1px solid rgba(49,130,206,0.2)',
// // // //           background: 'linear-gradient(180deg,#ffffff,#f9fbff)',
// // // //           boxShadow:
// // // //             '0 10px 25px rgba(49,130,206,0.08),0 4px 10px rgba(0,0,0,0.04)',
// // // //           p: 3,
// // // //         }}
// // // //       >
// // // //         {/* ACTION BAR */}
// // // //         <Grid container spacing={2} sx={{ mb: 2 }}>
// // // //           <Grid item xs={12} md={6}>
// // // //             <TextField
// // // //               fullWidth
// // // //               placeholder="Search businesses..."
// // // //               value={searchInput}
// // // //               onChange={(e) => {
// // // //                 setSearchInput(e.target.value);
// // // //                 debouncedSearch(e.target.value);
// // // //               }}
// // // //               InputProps={{
// // // //                 startAdornment: <SearchIcon sx={{ mr: 1 }} />,
// // // //               }}
// // // //             />
// // // //           </Grid>

// // // //           <Grid
// // // //             item
// // // //             xs={12}
// // // //             md={6}
// // // //             sx={{ display: 'flex', justifyContent: 'flex-end' }}
// // // //           >
// // // //             <Button
// // // //               variant="contained"
// // // //               startIcon={<AddIcon />}
// // // //               onClick={() => navigate('/admin/businesses/create')}
// // // //               sx={{
// // // //                 background:
// // // //                   'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
// // // //                 fontWeight: 600,
// // // //                 textTransform: 'none',
// // // //                 boxShadow: '0 6px 16px rgba(102,126,234,0.35)',
// // // //               }}
// // // //             >
// // // //               Add Business
// // // //             </Button>
// // // //           </Grid>
// // // //         </Grid>

// // // //         {/* STATUS FILTERS */}
// // // //        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
// // // //   <Chip
// // // //     label="ALL"
// // // //     clickable
// // // //     onClick={() => setFilterStatus('ALL')}
// // // //     sx={{
// // // //       fontWeight: 600,
// // // //       backgroundColor:
// // // //         filterStatus === 'ALL' ? '#e0e7ff' : 'transparent',
// // // //       color: filterStatus === 'ALL' ? '#3730a3' : '#64748b',
// // // //       border:
// // // //         filterStatus === 'ALL'
// // // //           ? '1px solid #6366f1'
// // // //           : '1px solid #cbd5f5',
// // // //     }}
// // // //   />

// // // //   {Object.values(BUSINESS_STATUS).map((status) => {
// // // //     const isActive = filterStatus === status;

// // // //     return (
// // // //       <Chip
// // // //         key={status}
// // // //         label={status}
// // // //         clickable
// // // //         onClick={() => setFilterStatus(status)}
// // // //         sx={{
// // // //           fontWeight: 600,
// // // //           backgroundColor: isActive
// // // //             ? BUSINESS_STATUS_COLORS[status] === 'success'
// // // //               ? '#ecfdf5'
// // // //               : BUSINESS_STATUS_COLORS[status] === 'warning'
// // // //               ? '#fef3c7'
// // // //               : '#fee2e2'
// // // //             : 'transparent',
// // // //           color: isActive
// // // //             ? BUSINESS_STATUS_COLORS[status] === 'success'
// // // //               ? '#10b981'
// // // //               : BUSINESS_STATUS_COLORS[status] === 'warning'
// // // //               ? '#92400e'
// // // //               : '#ef4444'
// // // //             : '#64748b',
// // // //           border: isActive
// // // //             ? '1px solid currentColor'
// // // //             : '1px solid #e2e8f0',
// // // //         }}
// // // //       />
// // // //     );
// // // //   })}
// // // // </Box>


// // // //         {/* TABLE */}
// // // //         <DataTable
// // // //           columns={columns}
// // // //           data={businesses}
// // // //           page={page}
// // // //           rowsPerPage={rowsPerPage}
// // // //           totalRows={totalRows}
// // // //           onPageChange={setPage}
// // // //           onRowsPerPageChange={setRowsPerPage}
// // // //         />
// // // //       </Paper>

// // // //       {/* DELETE DIALOG */}
// // // //       <Dialog open={!!deleteDialog} onClose={() => setDeleteDialog(null)}>
// // // //         <DialogTitle>Delete Business</DialogTitle>
// // // //         <DialogContent>
// // // //           Are you sure you want to delete{' '}
// // // //           <strong>{deleteDialog?.businessName}</strong>?
// // // //         </DialogContent>
// // // //         <DialogActions>
// // // //           <Button onClick={() => setDeleteDialog(null)}>Cancel</Button>
// // // //           <Button color="error">Delete</Button>
// // // //         </DialogActions>
// // // //       </Dialog>
// // // //     </Box>
// // // //   );
// // // // };

// // // // export default BusinessList;


// // // import React, { useState, useEffect, useCallback } from 'react';
// // // import { debounce } from 'lodash';
// // // import {
// // //   Box,
// // //   Typography,
// // //   Button,
// // //   TextField,
// // //   Grid,
// // //   Chip,
// // //   IconButton,
// // //   Dialog,
// // //   DialogTitle,
// // //   DialogContent,
// // //   DialogActions,
// // //   Paper,
// // //   Tooltip,
// // // } from '@mui/material';
// // // import {
// // //   Add as AddIcon,
// // //   Search as SearchIcon,
// // //   Apps as AppsIcon,
// // //   Edit as EditIcon,
// // //   Delete as DeleteIcon,
// // //   Visibility as ViewIcon,
// // //   Lock,
// // //   LockOpen,
// // //   PersonAdd as PersonAddIcon,
// // //   Groups as GroupsIcon,
// // // } from '@mui/icons-material';
// // // import { useNavigate } from 'react-router-dom';
// // // import DataTable from '../common/DataTable';
// // // import LoadingSpinner from '../common/LoadingSpinner';
// // // import { adminService } from '../../services/admin';
// // // import { BUSINESS_STATUS, BUSINESS_STATUS_COLORS } from '../../utils/constants';

// // // const BusinessList = () => {
// // //   const navigate = useNavigate();
// // //   const [businesses, setBusinesses] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [search, setSearch] = useState('');
// // //   const [searchInput, setSearchInput] = useState('');
// // //   const [filterStatus, setFilterStatus] = useState('ALL');
// // //   const [page, setPage] = useState(0);
// // //   const [rowsPerPage, setRowsPerPage] = useState(10);
// // //   const [deleteDialog, setDeleteDialog] = useState(null);
// // //   const [totalRows, setTotalRows] = useState(0);

// // //   const debouncedSearch = useCallback(
// // //     debounce((value) => {
// // //       setSearch(value);
// // //       setPage(0);
// // //     }, 500),
// // //     []
// // //   );

// // //   useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

// // //   useEffect(() => {
// // //     fetchBusinesses();
// // //   }, [page, rowsPerPage, search, filterStatus]);

// // //   const fetchBusinesses = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const res = await adminService.getAllBusinesses(
// // //         page,
// // //         rowsPerPage,
// // //         search,
// // //         filterStatus !== 'ALL' ? filterStatus : ''
// // //       );
// // //       setBusinesses(res.data || []);
// // //       setTotalRows(res.total || 0);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const columns = [
// // //     { field: 'businessName', headerName: 'Business Name', sortable: true },
// // //     { field: 'industry', headerName: 'Industry', sortable: true },
// // //     { field: 'email', headerName: 'Contact Email', sortable: true },

// // //     // 🔐 Secret Key Column (masked only)
// // //     {
// // //       field: 'secretKey',
// // //       headerName: 'Secret Key',
// // //       render: (_, business) => (
// // //         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// // //           <Typography sx={{ fontFamily: 'monospace' }}>
// // //             ***************
// // //           </Typography>

// // //           <Tooltip title="View Secret">
// // //             <IconButton
// // //               size="small"
// // //               onClick={async () => {
// // //                 const res = await adminService.getBusinessSecret(business.tenantId);
// // //                 alert(`Secret Key:\n\n${res.secretKey}`);
// // //               }}
// // //             >
// // //               <ViewIcon fontSize="small" />
// // //             </IconButton>
// // //           </Tooltip>
// // //         </Box>
// // //       ),
// // //     },

// // //     {
// // //       field: 'status',
// // //       headerName: 'Status',
// // //       sortable: true,
// // //       render: (value) => (
// // //         <Chip
// // //           label={value}
// // //           size="small"
// // //           color={BUSINESS_STATUS_COLORS[value] || 'default'}
// // //         />
// // //       ),
// // //     },

// // //     {
// // //       field: 'appCount',
// // //       headerName: 'Apps',
// // //       align: 'right',
// // //       render: (v) => v ?? 0,
// // //     },

// // //     {
// // //       field: 'actions',
// // //       headerName: 'Actions',
// // //       align: 'center',
// // //       render: (_, business) => (
// // //         <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
// // //           {/* View Applications */}
// // //           <Tooltip title="View Applications">
// // //             <IconButton
// // //               size="small"
// // //               onClick={() => navigate(`/admin/businesses/${business.tenantId}`)}
// // //               sx={{ color: '#667eea', '&:hover': { backgroundColor: '#ede9fe' } }}
// // //             >
// // //               <AppsIcon fontSize="small" />
// // //             </IconButton>
// // //           </Tooltip>

// // //           {/* Create User */}
// // //           <Tooltip title="Create User">
// // //             <IconButton
// // //               size="small"
// // //               onClick={() =>
// // //                 navigate(`/admin/businesses/${business.tenantId}/create-user`)
// // //               }
// // //               sx={{ color: '#8b5cf6', '&:hover': { backgroundColor: '#f3e8ff' } }}
// // //             >
// // //               <PersonAddIcon fontSize="small" />
// // //             </IconButton>
// // //           </Tooltip>

// // //           {/* View Users */}
// // //           <Tooltip title="View Users">
// // //             <IconButton
// // //               size="small"
// // //               onClick={() =>
// // //                 navigate(`/admin/businesses/${business.tenantId}/users`)
// // //               }
// // //               sx={{ color: '#7c3aed', '&:hover': { backgroundColor: '#ede9fe' } }}
// // //             >
// // //               <GroupsIcon fontSize="small" />
// // //             </IconButton>
// // //           </Tooltip>

// // //           {/* View Business */}
// // //           <Tooltip title="View Business">
// // //             <IconButton
// // //               size="small"
// // //               sx={{ color: '#64748b', '&:hover': { backgroundColor: '#f1f5f9' } }}
// // //             >
// // //               <ViewIcon fontSize="small" />
// // //             </IconButton>
// // //           </Tooltip>

// // //           {/* Edit Business */}
// // //           <Tooltip title="Edit Business">
// // //             <IconButton
// // //               size="small"
// // //               sx={{ color: '#f59e0b', '&:hover': { backgroundColor: '#fef3c7' } }}
// // //             >
// // //               <EditIcon fontSize="small" />
// // //             </IconButton>
// // //           </Tooltip>

// // //           {/* Delete Business */}
// // //           <Tooltip title="Delete Business">
// // //             <IconButton
// // //               size="small"
// // //               onClick={() => setDeleteDialog(business)}
// // //               sx={{ color: '#ef4444', '&:hover': { backgroundColor: '#fee2e2' } }}
// // //             >
// // //               <DeleteIcon fontSize="small" />
// // //             </IconButton>
// // //           </Tooltip>

// // //           {/* Status Toggle */}
// // //           <Tooltip
// // //             title={business.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
// // //           >
// // //             <IconButton
// // //               size="small"
// // //               sx={{
// // //                 color: business.status === 'ACTIVE' ? '#ef4444' : '#10b981',
// // //                 '&:hover': {
// // //                   backgroundColor:
// // //                     business.status === 'ACTIVE' ? '#fee2e2' : '#ecfdf5',
// // //                 },
// // //               }}
// // //             >
// // //               {business.status === 'ACTIVE' ? (
// // //                 <Lock fontSize="small" />
// // //               ) : (
// // //                 <LockOpen fontSize="small" />
// // //               )}
// // //             </IconButton>
// // //           </Tooltip>
// // //         </Box>
// // //       ),
// // //     },
// // //   ];

// // //   if (loading) return <LoadingSpinner />;

// // //   return (
// // //     <Box
// // //       sx={{
// // //         minHeight: '100%',
// // //         background:
// // //           'linear-gradient(135deg, #f8fbff 0%, #eef5ff 45%, #e6f0ff 100%)',
// // //         p: 3,
// // //       }}
// // //     >
// // //       {/* HEADER */}
// // //       <Box sx={{ mb: 2 }}>
// // //         <Typography
// // //           variant="h5"
// // //           sx={{
// // //             fontWeight: 700,
// // //             background: 'linear-gradient(90deg,#1a365d,#3182ce)',
// // //             WebkitBackgroundClip: 'text',
// // //             WebkitTextFillColor: 'transparent',
// // //           }}
// // //         >
// // //           Businesses
// // //         </Typography>
// // //         <Typography variant="body2" sx={{ color: '#64748b' }}>
// // //           Manage registered businesses and applications
// // //         </Typography>
// // //       </Box>

// // //       {/* MAIN CARD */}
// // //       <Paper
// // //         elevation={0}
// // //         sx={{
// // //           borderRadius: 3,
// // //           border: '1px solid rgba(49,130,206,0.2)',
// // //           background: 'linear-gradient(180deg,#ffffff,#f9fbff)',
// // //           boxShadow:
// // //             '0 10px 25px rgba(49,130,206,0.08),0 4px 10px rgba(0,0,0,0.04)',
// // //           p: 3,
// // //         }}
// // //       >
// // //         {/* ACTION BAR */}
// // //         <Grid container spacing={2} sx={{ mb: 2 }}>
// // //           <Grid item xs={12} md={6}>
// // //             <TextField
// // //               fullWidth
// // //               placeholder="Search businesses..."
// // //               value={searchInput}
// // //               onChange={(e) => {
// // //                 setSearchInput(e.target.value);
// // //                 debouncedSearch(e.target.value);
// // //               }}
// // //               InputProps={{
// // //                 startAdornment: <SearchIcon sx={{ mr: 1 }} />,
// // //               }}
// // //             />
// // //           </Grid>

// // //           <Grid
// // //             item
// // //             xs={12}
// // //             md={6}
// // //             sx={{ display: 'flex', justifyContent: 'flex-end' }}
// // //           >
// // //             <Button
// // //               variant="contained"
// // //               startIcon={<AddIcon />}
// // //               onClick={() => navigate('/admin/businesses/create')}
// // //               sx={{
// // //                 background:
// // //                   'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
// // //                 fontWeight: 600,
// // //                 textTransform: 'none',
// // //                 boxShadow: '0 6px 16px rgba(102,126,234,0.35)',
// // //               }}
// // //             >
// // //               Add Business
// // //             </Button>
// // //           </Grid>
// // //         </Grid>

// // //         {/* STATUS FILTERS */}
// // //         <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
// // //           <Chip
// // //             label="ALL"
// // //             clickable
// // //             onClick={() => setFilterStatus('ALL')}
// // //             sx={{
// // //               fontWeight: 600,
// // //               backgroundColor:
// // //                 filterStatus === 'ALL' ? '#e0e7ff' : 'transparent',
// // //               color: filterStatus === 'ALL' ? '#3730a3' : '#64748b',
// // //               border:
// // //                 filterStatus === 'ALL'
// // //                   ? '1px solid #6366f1'
// // //                   : '1px solid #cbd5f5',
// // //             }}
// // //           />

// // //           {Object.values(BUSINESS_STATUS).map((status) => {
// // //             const isActive = filterStatus === status;

// // //             return (
// // //               <Chip
// // //                 key={status}
// // //                 label={status}
// // //                 clickable
// // //                 onClick={() => setFilterStatus(status)}
// // //                 sx={{
// // //                   fontWeight: 600,
// // //                   backgroundColor: isActive
// // //                     ? BUSINESS_STATUS_COLORS[status] === 'success'
// // //                       ? '#ecfdf5'
// // //                       : BUSINESS_STATUS_COLORS[status] === 'warning'
// // //                       ? '#fef3c7'
// // //                       : '#fee2e2'
// // //                     : 'transparent',
// // //                   color: isActive
// // //                     ? BUSINESS_STATUS_COLORS[status] === 'success'
// // //                       ? '#10b981'
// // //                       : BUSINESS_STATUS_COLORS[status] === 'warning'
// // //                       ? '#92400e'
// // //                       : '#ef4444'
// // //                     : '#64748b',
// // //                   border: isActive
// // //                     ? '1px solid currentColor'
// // //                     : '1px solid #e2e8f0',
// // //                 }}
// // //               />
// // //             );
// // //           })}
// // //         </Box>

// // //         {/* TABLE */}
// // //         <DataTable
// // //           columns={columns}
// // //           data={businesses}
// // //           page={page}
// // //           rowsPerPage={rowsPerPage}
// // //           totalRows={totalRows}
// // //           onPageChange={setPage}
// // //           onRowsPerPageChange={setRowsPerPage}
// // //         />
// // //       </Paper>

// // //       {/* DELETE DIALOG */}
// // //       <Dialog open={!!deleteDialog} onClose={() => setDeleteDialog(null)}>
// // //         <DialogTitle>Delete Business</DialogTitle>
// // //         <DialogContent>
// // //           Are you sure you want to delete{' '}
// // //           <strong>{deleteDialog?.businessName}</strong>?
// // //         </DialogContent>
// // //         <DialogActions>
// // //           <Button onClick={() => setDeleteDialog(null)}>Cancel</Button>
// // //           <Button color="error">Delete</Button>
// // //         </DialogActions>
// // //       </Dialog>
// // //     </Box>
// // //   );
// // // };

// // // export default BusinessList;


// // import React, { useState, useEffect, useCallback } from 'react';
// // import { debounce } from 'lodash';
// // import {
// //   Box,
// //   Typography,
// //   Button,
// //   TextField,
// //   Grid,
// //   Chip,
// //   IconButton,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   Paper,
// //   Tooltip,
 
// // } from '@mui/material';
// // import {
// //   Add as AddIcon,
// //   Search as SearchIcon,
// //   Apps as AppsIcon,
// //   Edit as EditIcon,
// //   Delete as DeleteIcon,
// //   Visibility as ViewIcon,
// //   Lock,
// //   LockOpen,
// //   PersonAdd as PersonAddIcon,
// //   Groups as GroupsIcon,
// //   Block as BlockIcon,
// //   CheckCircle 
// // } from '@mui/icons-material';
// // import { useNavigate } from 'react-router-dom';
// // import DataTable from '../common/DataTable';
// // import LoadingSpinner from '../common/LoadingSpinner';
// // import { adminService } from '../../services/admin';
// // import { BUSINESS_STATUS, BUSINESS_STATUS_COLORS } from '../../utils/constants';

// // const BusinessList = () => {
// //   const navigate = useNavigate();
// //   const [businesses, setBusinesses] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [search, setSearch] = useState('');
// //   const [searchInput, setSearchInput] = useState('');
// //   const [filterStatus, setFilterStatus] = useState('ALL');
// //   const [page, setPage] = useState(0);
// //   const [rowsPerPage, setRowsPerPage] = useState(10);
// //   const [deleteDialog, setDeleteDialog] = useState(null);
// //   const [totalRows, setTotalRows] = useState(0);

// //   const [blockDialog, setBlockDialog] = useState(null); // For block confirmation
// //   const [blockReason, setBlockReason] = useState(''); // For block reason input
// //   const [actionLoading, setActionLoading] = useState(false);

// //   // 🔐 Store revealed secrets per business
// //   const [revealedSecrets, setRevealedSecrets] = useState({});

// //   const debouncedSearch = useCallback(
// //     debounce((value) => {
// //       setSearch(value);
// //       setPage(0);
// //     }, 500),
// //     []
// //   );

// //   useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

// //   useEffect(() => {
// //     fetchBusinesses();
// //   }, [page, rowsPerPage, search, filterStatus]);


// //   const fetchBusinesses = async () => {
// //   try {
// //     setLoading(true);
// //     const res = await adminService.getAllBusinesses(
// //       page,
// //       rowsPerPage,
// //       search,
// //       filterStatus !== 'ALL' ? filterStatus : ''
// //     );
    
// //     // Transform the data to ensure blocked status is properly reflected
// //     const transformedData = (res.data || []).map(business => ({
// //       ...business,
// //       // If your backend returns isBlocked, override the status
// //       status: business.isBlocked ? 'BLOCKED' : (business.status || 'ACTIVE')
// //     }));
    
// //     setBusinesses(transformedData);
// //     setTotalRows(res.total || 0);
// //   } finally {
// //     setLoading(false);
// //   }
// // };

// //   // const fetchBusinesses = async () => {
// //   //   try {
// //   //     setLoading(true);
// //   //     const res = await adminService.getAllBusinesses(
// //   //       page,
// //   //       rowsPerPage,
// //   //       search,
// //   //       filterStatus !== 'ALL' ? filterStatus : ''
// //   //     );
// //   //     setBusinesses(res.data || []);
// //   //     setTotalRows(res.total || 0);
// //   //   } finally {
// //   //     setLoading(false);
// //   //   }
// //   // };

// //   // 🔐 Toggle secret reveal
// //   const handleToggleSecret = async (business) => {
// //     const id = business.tenantId;

// //     // If already revealed → hide it
// //     if (revealedSecrets[id]) {
// //       setRevealedSecrets(prev => {
// //         const copy = { ...prev };
// //         delete copy[id];
// //         return copy;
// //       });
// //       return;
// //     }

// //     // Else fetch and reveal
// //     const res = await adminService.getBusinessSecret(id);

// //     setRevealedSecrets(prev => ({
// //       ...prev,
// //       [id]: res.secretKey
// //     }));
// //   };

// //   // Handle block action
// // const handleBlockClick = (business) => {
// //   setBlockDialog({
// //     business,
// //     action: 'block'
// //   });
// //   setBlockReason('');
// // };

// // // Handle unblock action
// // const handleUnblockClick = (business) => {
// //   setBlockDialog({
// //     business,
// //     action: 'unblock'
// //   });
// // };

// // // Handle block/unblock confirmation
// // const handleBlockUnblockConfirm = async () => {
// //   const { business, action } = blockDialog;
  
// //   try {
// //     setActionLoading(true);
    
// //     if (action === 'block') {
// //       if (!blockReason.trim()) {
// //         alert('Please provide a reason for blocking');
// //         return;
// //       }
// //       await adminService.blockBusiness(business.tenantId, blockReason);
// //     } else {
// //       await adminService.unblockBusiness(business.tenantId);
// //     }
    
// //     // Refresh the list
// //     await fetchBusinesses();
// //     setBlockDialog(null);
// //     setBlockReason('');
    
// //   } catch (error) {
// //     console.error(`Failed to ${action} business:`, error);
// //     alert(error.response?.data?.message || `Failed to ${action} business`);
// //   } finally {
// //     setActionLoading(false);
// //   }
// // };

// //   const columns = [
// //     { field: 'businessName', headerName: 'Business Name', sortable: true },
// //     { field: 'industry', headerName: 'Industry', sortable: true },
// //     { field: 'email', headerName: 'Contact Email', sortable: true },

// //     // 🔐 Secret Key Column (inline reveal)
// //     {
// //       field: 'secretKey',
// //       headerName: 'Secret Key',
// //       render: (_, business) => {
// //         const secret = revealedSecrets[business.tenantId];

// //         return (
// //           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //             <Typography sx={{ fontFamily: 'monospace' }}>
// //               {secret ? secret : '***************'}
// //             </Typography>

// //             <Tooltip title={secret ? "Hide Secret" : "View Secret"}>
// //               <IconButton
// //                 size="small"
// //                 onClick={() => handleToggleSecret(business)}
// //               >
// //                 <ViewIcon fontSize="small" />
// //               </IconButton>
// //             </Tooltip>
// //           </Box>
// //         );
// //       },
// //     },

// //     {
// //       field: 'status',
// //       headerName: 'Status',
// //       sortable: true,
// //       render: (value) => (
// //         <Chip
// //           label={value}
// //           size="small"
// //           color={BUSINESS_STATUS_COLORS[value] || 'default'}
// //         />
// //       ),
// //     },

// //     {
// //       field: 'appCount',
// //       headerName: 'Apps',
// //       align: 'right',
// //       render: (v) => v ?? 0,
// //     },

// //     {
// //       field: 'actions',
// //       headerName: 'Actions',
// //       align: 'center',
// //       render: (_, business) => (
// //         <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
// //           {/* <Tooltip title="View Applications">
// //             <IconButton
// //               size="small"
// //               onClick={() => navigate(`/admin/businesses/${business.tenantId}`)}
// //               sx={{ color: '#667eea', '&:hover': { backgroundColor: '#ede9fe' } }}
// //             >
// //               <AppsIcon fontSize="small" />
// //             </IconButton>
// //           </Tooltip> */}

// //           <Tooltip title="Create User">
// //             <IconButton
// //               size="small"
// //               onClick={() =>
// //                 navigate(`/admin/businesses/${business.tenantId}/create-user`)
// //               }
// //               sx={{ color: '#8b5cf6', '&:hover': { backgroundColor: '#f3e8ff' } }}
// //             >
// //               <PersonAddIcon fontSize="small" />
// //             </IconButton>
// //           </Tooltip>

// //           <Tooltip title="View Users">
// //             <IconButton
// //               size="small"
// //               onClick={() =>
// //                 navigate(`/admin/businesses/${business.tenantId}/users`)
// //               }
// //               sx={{ color: '#7c3aed', '&:hover': { backgroundColor: '#ede9fe' } }}
// //             >
// //               <GroupsIcon fontSize="small" />
// //             </IconButton>
// //           </Tooltip>

// //           <Tooltip title="View Business">
// //             <IconButton
// //               size="small"
// //               sx={{ color: '#64748b', '&:hover': { backgroundColor: '#f1f5f9' } }}
// //             >
// //               <ViewIcon fontSize="small" />
// //             </IconButton>
// //           </Tooltip>

// //           <Tooltip title="Edit Business">
// //             <IconButton
// //               size="small"
// //               sx={{ color: '#f59e0b', '&:hover': { backgroundColor: '#fef3c7' } }}
// //             >
// //               <EditIcon fontSize="small" />
// //             </IconButton>
// //           </Tooltip>

// //           <Tooltip title="Delete Business">
// //             <IconButton
// //               size="small"
// //               onClick={() => setDeleteDialog(business)}
// //               sx={{ color: '#ef4444', '&:hover': { backgroundColor: '#fee2e2' } }}
// //             >
// //               <DeleteIcon fontSize="small" />
// //             </IconButton>
// //           </Tooltip>

// //           <Tooltip
// //             title={business.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
// //           >
// //             <IconButton
// //               size="small"
// //               sx={{
// //                 color: business.status === 'ACTIVE' ? '#ef4444' : '#10b981',
// //                 '&:hover': {
// //                   backgroundColor:
// //                     business.status === 'ACTIVE' ? '#fee2e2' : '#ecfdf5',
// //                 },
// //               }}
// //             >
// //               {business.status === 'ACTIVE' ? (
// //                 <Lock fontSize="small" />
// //               ) : (
// //                 <LockOpen fontSize="small" />
// //               )}
// //             </IconButton>
// //           </Tooltip>
// //            {business.status === 'BLOCKED' ? (
// //         <Tooltip title="Unblock Business">
// //           <IconButton
// //             size="small"
// //             onClick={() => handleUnblockClick(business)}
// //             sx={{ 
// //               color: '#10b981',
// //               '&:hover': { backgroundColor: '#ecfdf5' } 
// //             }}
// //           >
// //             <CheckCircle fontSize="small" />
// //           </IconButton>
// //         </Tooltip>
// //       ) : (
// //         <Tooltip title="Block Business">
// //           <IconButton
// //             size="small"
// //             onClick={() => handleBlockClick(business)}
// //             sx={{ 
// //               color: '#ef4444',
// //               '&:hover': { backgroundColor: '#fee2e2' } 
// //             }}
// //           >
// //            <BlockIcon fontSize="small" />
// //           </IconButton>
// //         </Tooltip>
// //       )}
// //         </Box>
// //       ),
// //     },
// //   ];

// //   if (loading) return <LoadingSpinner />;

// //   return (
// //     <Box
// //       sx={{
// //         minHeight: '100%',
// //         background:
// //           'linear-gradient(135deg, #f8fbff 0%, #eef5ff 45%, #e6f0ff 100%)',
// //         p: 3,
// //       }}
// //     >
// //       <Box sx={{ mb: 2 }}>
// //         <Typography
// //           variant="h5"
// //           sx={{
// //             fontWeight: 700,
// //             background: 'linear-gradient(90deg,#1a365d,#3182ce)',
// //             WebkitBackgroundClip: 'text',
// //             WebkitTextFillColor: 'transparent',
// //           }}
// //         >
// //           Businesses
// //         </Typography>
// //         <Typography variant="body2" sx={{ color: '#64748b' }}>
// //           Manage registered businesses and applications
// //         </Typography>
// //       </Box>

// //       <Paper
// //         elevation={0}
// //         sx={{
// //           borderRadius: 3,
// //           border: '1px solid rgba(49,130,206,0.2)',
// //           background: 'linear-gradient(180deg,#ffffff,#f9fbff)',
// //           boxShadow:
// //             '0 10px 25px rgba(49,130,206,0.08),0 4px 10px rgba(0,0,0,0.04)',
// //           p: 3,
// //         }}
// //       >
// //         <Grid container spacing={2} sx={{ mb: 2 }}>
// //           <Grid item xs={12} md={6}>
// //             <TextField
// //               fullWidth
// //               placeholder="Search businesses..."
// //               value={searchInput}
// //               onChange={(e) => {
// //                 setSearchInput(e.target.value);
// //                 debouncedSearch(e.target.value);
// //               }}
// //               InputProps={{
// //                 startAdornment: <SearchIcon sx={{ mr: 1 }} />,
// //               }}
// //             />
// //           </Grid>

// //           <Grid
// //             item
// //             xs={12}
// //             md={6}
// //             sx={{ display: 'flex', justifyContent: 'flex-end' }}
// //           >
// //             <Button
// //               variant="contained"
// //               startIcon={<AddIcon />}
// //               onClick={() => navigate('/admin/businesses/create')}
// //               sx={{
// //                 background:
// //                   'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
// //                 fontWeight: 600,
// //                 textTransform: 'none',
// //                 boxShadow: '0 6px 16px rgba(102,126,234,0.35)',
// //               }}
// //             >
// //               Add Business
// //             </Button>
// //           </Grid>
// //         </Grid>

// //         {/* <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
// //           <Chip
// //             label="ALL"
// //             clickable
// //             onClick={() => setFilterStatus('ALL')}
// //             sx={{
// //               fontWeight: 600,
// //               backgroundColor:
// //                 filterStatus === 'ALL' ? '#e0e7ff' : 'transparent',
// //               color: filterStatus === 'ALL' ? '#3730a3' : '#64748b',
// //               border:
// //                 filterStatus === 'ALL'
// //                   ? '1px solid #6366f1'
// //                   : '1px solid #cbd5f5',
// //             }}
// //           />

// //           {Object.values(BUSINESS_STATUS).map((status) => {
// //             const isActive = filterStatus === status;

// //             return (
// //               <Chip
// //                 key={status}
// //                 label={status}
// //                 clickable
// //                 onClick={() => setFilterStatus(status)}
// //                 sx={{
// //                   fontWeight: 600,
// //                   backgroundColor: isActive
// //                     ? BUSINESS_STATUS_COLORS[status] === 'success'
// //                       ? '#ecfdf5'
// //                       : BUSINESS_STATUS_COLORS[status] === 'warning'
// //                       ? '#fef3c7'
// //                       : '#fee2e2'
// //                     : 'transparent',
// //                   color: isActive
// //                     ? BUSINESS_STATUS_COLORS[status] === 'success'
// //                       ? '#10b981'
// //                       : BUSINESS_STATUS_COLORS[status] === 'warning'
// //                       ? '#92400e'
// //                       : '#ef4444'
// //                     : '#64748b',
// //                   border: isActive
// //                     ? '1px solid currentColor'
// //                     : '1px solid #e2e8f0',
// //                 }}
// //               />
// //             );
// //           })}
// //         </Box> */}

// //         <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
// //   <Chip
// //     label="ALL"
// //     clickable
// //     onClick={() => setFilterStatus('ALL')}
// //     sx={{
// //       fontWeight: 600,
// //       backgroundColor: filterStatus === 'ALL' ? '#e0e7ff' : 'transparent',
// //       color: filterStatus === 'ALL' ? '#3730a3' : '#64748b',
// //       border: filterStatus === 'ALL' ? '1px solid #6366f1' : '1px solid #cbd5f5',
// //     }}
// //   />

// //   {/* ACTIVE Chip */}
// //   <Chip
// //     label="ACTIVE"
// //     clickable
// //     onClick={() => setFilterStatus('ACTIVE')}
// //     sx={{
// //       fontWeight: 600,
// //       backgroundColor: filterStatus === 'ACTIVE' ? '#ecfdf5' : 'transparent',
// //       color: filterStatus === 'ACTIVE' ? '#10b981' : '#64748b',
// //       border: filterStatus === 'ACTIVE' ? '1px solid #10b981' : '1px solid #e2e8f0',
// //     }}
// //   />

// //   {/* INACTIVE Chip */}
// //   <Chip
// //     label="INACTIVE"
// //     clickable
// //     onClick={() => setFilterStatus('INACTIVE')}
// //     sx={{
// //       fontWeight: 600,
// //       backgroundColor: filterStatus === 'INACTIVE' ? '#fef3c7' : 'transparent',
// //       color: filterStatus === 'INACTIVE' ? '#92400e' : '#64748b',
// //       border: filterStatus === 'INACTIVE' ? '1px solid #f59e0b' : '1px solid #e2e8f0',
// //     }}
// //   />

// //   {/* BLOCKED Chip - ADD THIS */}
// //   <Chip
// //     label="BLOCKED"
// //     clickable
// //     onClick={() => setFilterStatus('BLOCKED')}
// //     sx={{
// //       fontWeight: 600,
// //       backgroundColor: filterStatus === 'BLOCKED' ? '#fee2e2' : 'transparent',
// //       color: filterStatus === 'BLOCKED' ? '#ef4444' : '#64748b',
// //       border: filterStatus === 'BLOCKED' ? '1px solid #ef4444' : '1px solid #e2e8f0',
// //     }}
// //   />
// // </Box>

// //         <DataTable
// //           columns={columns}
// //           data={businesses}
// //           page={page}
// //           rowsPerPage={rowsPerPage}
// //           totalRows={totalRows}
// //           onPageChange={setPage}
// //           onRowsPerPageChange={setRowsPerPage}
// //         />
// //       </Paper>

// //       <Dialog open={!!deleteDialog} onClose={() => setDeleteDialog(null)}>
// //         <DialogTitle>Delete Business</DialogTitle>
// //         <DialogContent>
// //           Are you sure you want to delete{' '}
// //           <strong>{deleteDialog?.businessName}</strong>?
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={() => setDeleteDialog(null)}>Cancel</Button>
// //           <Button color="error">Delete</Button>
// //         </DialogActions>
// //       </Dialog>

// //       {/* Block/Unblock Dialog */}
// // <Dialog 
// //   open={!!blockDialog} 
// //   onClose={() => !actionLoading && setBlockDialog(null)}
// //   maxWidth="sm"
// //   fullWidth
// // >
// //   <DialogTitle>
// //     {blockDialog?.action === 'block' ? 'Block Business' : 'Unblock Business'}
// //   </DialogTitle>
// //   <DialogContent>
// //     {blockDialog?.action === 'block' ? (
// //       <>
// //         <Typography variant="body2" sx={{ mb: 2, mt: 1 }}>
// //           Are you sure you want to block <strong>{blockDialog?.business?.businessName}</strong>?
// //         </Typography>
// //         <TextField
// //           autoFocus
// //           label="Block Reason"
// //           fullWidth
// //           multiline
// //           rows={3}
// //           value={blockReason}
// //           onChange={(e) => setBlockReason(e.target.value)}
// //           placeholder="Please provide a reason for blocking this business..."
// //           disabled={actionLoading}
// //           required
// //           error={blockReason.trim() === ''}
// //           helperText={blockReason.trim() === '' ? 'Block reason is required' : ''}
// //         />
// //       </>
// //     ) : (
// //       <Typography variant="body2" sx={{ py: 2 }}>
// //         Are you sure you want to unblock <strong>{blockDialog?.business?.businessName}</strong>?
// //       </Typography>
// //     )}
// //   </DialogContent>
// //   <DialogActions>
// //     <Button 
// //       onClick={() => setBlockDialog(null)} 
// //       disabled={actionLoading}
// //     >
// //       Cancel
// //     </Button>
// //     <Button
// //       onClick={handleBlockUnblockConfirm}
// //       color={blockDialog?.action === 'block' ? 'error' : 'primary'}
// //       variant="contained"
// //       disabled={
// //         actionLoading || 
// //         (blockDialog?.action === 'block' && !blockReason.trim())
// //       }
// //     >
// //       {actionLoading ? 'Processing...' : blockDialog?.action === 'block' ? 'Block' : 'Unblock'}
// //     </Button>
// //   </DialogActions>
// // </Dialog>
// //     </Box>
// //   );
// // };

// // export default BusinessList;


// import React, { useState, useEffect, useCallback } from 'react';
// import { debounce } from 'lodash';
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
//   Paper,
//   Tooltip,
//   Alert,
//   Snackbar
// } from '@mui/material';
// import {
//   Add as AddIcon,
//   Search as SearchIcon,
//   Apps as AppsIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Visibility as ViewIcon,
//   Lock,
//   LockOpen,
//   PersonAdd as PersonAddIcon,
//   Groups as GroupsIcon,
//   Block as BlockIcon,
//   CheckCircle,
//   Refresh as RefreshIcon
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import DataTable from '../common/DataTable';
// import LoadingSpinner from '../common/LoadingSpinner';
// import { adminService } from '../../services/admin';
// import { BUSINESS_STATUS, BUSINESS_STATUS_COLORS } from '../../utils/constants';

// const BusinessList = () => {
//   const navigate = useNavigate();
//   const [businesses, setBusinesses] = useState([]);
//   const [tableLoading, setTableLoading] = useState(true); // Renamed for table-specific loading
//   const [initialLoading, setInitialLoading] = useState(true); // For initial page load
//   const [search, setSearch] = useState('');
//   const [searchInput, setSearchInput] = useState('');
//   const [filterStatus, setFilterStatus] = useState('ALL');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [deleteDialog, setDeleteDialog] = useState(null);
//   const [totalRows, setTotalRows] = useState(0);
//   const [blockDialog, setBlockDialog] = useState(null);
//   const [blockReason, setBlockReason] = useState('');
//   const [actionLoading, setActionLoading] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

//   // 🔐 Store revealed secrets per business
//   const [revealedSecrets, setRevealedSecrets] = useState({});

//   const debouncedSearch = useCallback(
//     debounce((value) => {
//       setSearch(value);
//       setPage(0);
//     }, 500),
//     []
//   );

//   useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

//   // Separate useEffect for initial load
//   useEffect(() => {
//     fetchBusinesses(true);
//   }, []); // Empty dependency array for initial load only

//   // Effect for filter/pagination changes
//   useEffect(() => {
//     if (!initialLoading) {
//       fetchBusinesses(false);
//     }
//   }, [page, rowsPerPage, search, filterStatus]);

//   const fetchBusinesses = async (isInitial = false) => {
//     try {
//       if (isInitial) {
//         setInitialLoading(true);
//       } else {
//         setTableLoading(true);
//       }
      
//       const res = await adminService.getAllBusinesses(
//         page,
//         rowsPerPage,
//         search,
//         filterStatus !== 'ALL' ? filterStatus : ''
//       );
      
//       // Transform the data to ensure blocked status is properly reflected
//       const transformedData = (res.data || []).map(business => ({
//         ...business,
//         status: business.isBlocked ? 'BLOCKED' : (business.status || 'ACTIVE')
//       }));
      
//       setBusinesses(transformedData);
//       setTotalRows(res.total || 0);
//     } catch (error) {
//       console.error('Error fetching businesses:', error);
//       setSnackbar({
//         open: true,
//         message: 'Failed to fetch businesses',
//         severity: 'error'
//       });
//     } finally {
//       if (isInitial) {
//         setInitialLoading(false);
//       } else {
//         setTableLoading(false);
//       }
//     }
//   };

//   const handleRefresh = () => {
//     fetchBusinesses(false);
//     setSnackbar({
//       open: true,
//       message: 'Business list refreshed',
//       severity: 'success'
//     });
//   };

//   // 🔐 Toggle secret reveal
//   const handleToggleSecret = async (business) => {
//     const id = business.tenantId;

//     // If already revealed → hide it
//     if (revealedSecrets[id]) {
//       setRevealedSecrets(prev => {
//         const copy = { ...prev };
//         delete copy[id];
//         return copy;
//       });
//       return;
//     }

//     try {
//       const res = await adminService.getBusinessSecret(id);
//       setRevealedSecrets(prev => ({
//         ...prev,
//         [id]: res.secretKey
//       }));
//     } catch (error) {
//       setSnackbar({
//         open: true,
//         message: 'Failed to fetch secret key',
//         severity: 'error'
//       });
//     }
//   };

//   // Handle block action
//   const handleBlockClick = (business) => {
//     setBlockDialog({
//       business,
//       action: 'block'
//     });
//     setBlockReason('');
//   };

//   // Handle unblock action
//   const handleUnblockClick = (business) => {
//     setBlockDialog({
//       business,
//       action: 'unblock'
//     });
//   };

//   // Handle block/unblock confirmation
//   const handleBlockUnblockConfirm = async () => {
//     const { business, action } = blockDialog;
    
//     try {
//       setActionLoading(true);
      
//       if (action === 'block') {
//         if (!blockReason.trim()) {
//           setSnackbar({
//             open: true,
//             message: 'Please provide a reason for blocking',
//             severity: 'error'
//           });
//           return;
//         }
//         await adminService.blockBusiness(business.tenantId, blockReason);
//         setSnackbar({
//           open: true,
//           message: 'Business blocked successfully',
//           severity: 'success'
//         });
//       } else {
//         await adminService.unblockBusiness(business.tenantId);
//         setSnackbar({
//           open: true,
//           message: 'Business unblocked successfully',
//           severity: 'success'
//         });
//       }
      
//       // Refresh only the table data
//       await fetchBusinesses(false);
//       setBlockDialog(null);
//       setBlockReason('');
      
//     } catch (error) {
//       console.error(`Failed to ${action} business:`, error);
//       setSnackbar({
//         open: true,
//         message: error.response?.data?.message || `Failed to ${action} business`,
//         severity: 'error'
//       });
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Handle delete
//   const handleDelete = async () => {
//     if (!deleteDialog) return;
    
//     try {
//       setActionLoading(true);
//       await adminService.deleteBusiness(deleteDialog.tenantId);
//       setSnackbar({
//         open: true,
//         message: 'Business deleted successfully',
//         severity: 'success'
//       });
//       setDeleteDialog(null);
//       await fetchBusinesses(false);
//     } catch (error) {
//       setSnackbar({
//         open: true,
//         message: 'Failed to delete business',
//         severity: 'error'
//       });
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const columns = [
//     { field: 'businessName', headerName: 'Business Name', sortable: true },
//     { field: 'industry', headerName: 'Industry', sortable: true },
//     { field: 'email', headerName: 'Contact Email', sortable: true },

//     // 🔐 Secret Key Column (inline reveal)
//     {
//       field: 'secretKey',
//       headerName: 'Secret Key',
//       render: (_, business) => {
//         const secret = revealedSecrets[business.tenantId];

//         return (
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <Typography sx={{ fontFamily: 'monospace' }}>
//               {secret ? secret : '***************'}
//             </Typography>

//             <Tooltip title={secret ? "Hide Secret" : "View Secret"}>
//               <IconButton
//                 size="small"
//                 onClick={() => handleToggleSecret(business)}
//               >
//                 <ViewIcon fontSize="small" />
//               </IconButton>
//             </Tooltip>
//           </Box>
//         );
//       },
//     },

//     {
//       field: 'status',
//       headerName: 'Status',
//       sortable: true,
//       render: (value) => (
//         <Chip
//           label={value}
//           size="small"
//           color={BUSINESS_STATUS_COLORS[value] || 'default'}
//         />
//       ),
//     },

//     {
//       field: 'appCount',
//       headerName: 'Apps',
//       align: 'right',
//       render: (v) => v ?? 0,
//     },

//     {
//       field: 'actions',
//       headerName: 'Actions',
//       align: 'center',
//       render: (_, business) => (
//         <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
//           <Tooltip title="Create User">
//             <IconButton
//               size="small"
//               onClick={() =>
//                 navigate(`/admin/businesses/${business.tenantId}/create-user`)
//               }
//               sx={{ color: '#8b5cf6', '&:hover': { backgroundColor: '#f3e8ff' } }}
//             >
//               <PersonAddIcon fontSize="small" />
//             </IconButton>
//           </Tooltip>

//           <Tooltip title="View Users">
//             <IconButton
//               size="small"
//               onClick={() =>
//                 navigate(`/admin/businesses/${business.tenantId}/users`)
//               }
//               sx={{ color: '#7c3aed', '&:hover': { backgroundColor: '#ede9fe' } }}
//             >
//               <GroupsIcon fontSize="small" />
//             </IconButton>
//           </Tooltip>

//           <Tooltip title="View Business">
//             <IconButton
//               size="small"
//               sx={{ color: '#64748b', '&:hover': { backgroundColor: '#f1f5f9' } }}
//             >
//               <ViewIcon fontSize="small" />
//             </IconButton>
//           </Tooltip>

//           <Tooltip title="Edit Business">
//             <IconButton
//               size="small"
//               sx={{ color: '#f59e0b', '&:hover': { backgroundColor: '#fef3c7' } }}
//             >
//               <EditIcon fontSize="small" />
//             </IconButton>
//           </Tooltip>

//           <Tooltip title="Delete Business">
//             <IconButton
//               size="small"
//               onClick={() => setDeleteDialog(business)}
//               sx={{ color: '#ef4444', '&:hover': { backgroundColor: '#fee2e2' } }}
//             >
//               <DeleteIcon fontSize="small" />
//             </IconButton>
//           </Tooltip>

//           <Tooltip
//             title={business.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
//           >
//             <IconButton
//               size="small"
//               sx={{
//                 color: business.status === 'ACTIVE' ? '#ef4444' : '#10b981',
//                 '&:hover': {
//                   backgroundColor:
//                     business.status === 'ACTIVE' ? '#fee2e2' : '#ecfdf5',
//                 },
//               }}
//             >
//               {business.status === 'ACTIVE' ? (
//                 <Lock fontSize="small" />
//               ) : (
//                 <LockOpen fontSize="small" />
//               )}
//             </IconButton>
//           </Tooltip>
          
//           {business.status === 'BLOCKED' ? (
//             <Tooltip title="Unblock Business">
//               <IconButton
//                 size="small"
//                 onClick={() => handleUnblockClick(business)}
//                 sx={{ 
//                   color: '#10b981',
//                   '&:hover': { backgroundColor: '#ecfdf5' } 
//                 }}
//               >
//                 <CheckCircle fontSize="small" />
//               </IconButton>
//             </Tooltip>
//           ) : (
//             <Tooltip title="Block Business">
//               <IconButton
//                 size="small"
//                 onClick={() => handleBlockClick(business)}
//                 sx={{ 
//                   color: '#ef4444',
//                   '&:hover': { backgroundColor: '#fee2e2' } 
//                 }}
//               >
//                 <BlockIcon fontSize="small" />
//               </IconButton>
//             </Tooltip>
//           )}
//         </Box>
//       ),
//     },
//   ];

//   // Show initial loading spinner only for first load
//   if (initialLoading) return <LoadingSpinner />;

//   return (
//     <Box
//       sx={{
//         minHeight: '100%',
//         background:
//           'linear-gradient(135deg, #f8fbff 0%, #eef5ff 45%, #e6f0ff 100%)',
//         p: 3,
//       }}
//     >
//       <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <Box>
//           <Typography
//             variant="h5"
//             sx={{
//               fontWeight: 700,
//               background: 'linear-gradient(90deg,#1a365d,#3182ce)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//             }}
//           >
//             Businesses
//           </Typography>
//           <Typography variant="body2" sx={{ color: '#64748b' }}>
//             Manage registered businesses and applications
//           </Typography>
//         </Box>
        
//         {/* Refresh Icon */}
//         <Tooltip title="Refresh Table">
//           <IconButton 
//             onClick={handleRefresh} 
//             disabled={tableLoading}
//             sx={{
//               backgroundColor: '#fff',
//               boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//               '&:hover': {
//                 backgroundColor: '#f5f5f5',
//               },
//               animation: tableLoading ? 'spin 1s linear infinite' : 'none',
//               '@keyframes spin': {
//                 '0%': {
//                   transform: 'rotate(0deg)',
//                 },
//                 '100%': {
//                   transform: 'rotate(360deg)',
//                 },
//               },
//             }}
//           >
//             <RefreshIcon />
//           </IconButton>
//         </Tooltip>
//       </Box>

//       <Paper
//         elevation={0}
//         sx={{
//           borderRadius: 3,
//           border: '1px solid rgba(49,130,206,0.2)',
//           background: 'linear-gradient(180deg,#ffffff,#f9fbff)',
//           boxShadow:
//             '0 10px 25px rgba(49,130,206,0.08),0 4px 10px rgba(0,0,0,0.04)',
//           p: 3,
//         }}
//       >
//         <Grid container spacing={2} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={6}>
//             <TextField
//               fullWidth
//               placeholder="Search businesses..."
//               value={searchInput}
//               onChange={(e) => {
//                 setSearchInput(e.target.value);
//                 debouncedSearch(e.target.value);
//               }}
//               InputProps={{
//                 startAdornment: <SearchIcon sx={{ mr: 1 }} />,
//               }}
//             />
//           </Grid>

//           <Grid
//             item
//             xs={12}
//             md={6}
//             sx={{ display: 'flex', justifyContent: 'flex-end' }}
//           >
//             <Button
//               variant="contained"
//               startIcon={<AddIcon />}
//               onClick={() => navigate('/admin/businesses/create')}
//               sx={{
//                 background:
//                   'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
//                 fontWeight: 600,
//                 textTransform: 'none',
//                 boxShadow: '0 6px 16px rgba(102,126,234,0.35)',
//               }}
//             >
//               Add Business
//             </Button>
//           </Grid>
//         </Grid>

//         <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
//           <Chip
//             label="ALL"
//             clickable
//             onClick={() => setFilterStatus('ALL')}
//             sx={{
//               fontWeight: 600,
//               backgroundColor: filterStatus === 'ALL' ? '#e0e7ff' : 'transparent',
//               color: filterStatus === 'ALL' ? '#3730a3' : '#64748b',
//               border: filterStatus === 'ALL' ? '1px solid #6366f1' : '1px solid #cbd5f5',
//             }}
//           />

//           <Chip
//             label="ACTIVE"
//             clickable
//             onClick={() => setFilterStatus('ACTIVE')}
//             sx={{
//               fontWeight: 600,
//               backgroundColor: filterStatus === 'ACTIVE' ? '#ecfdf5' : 'transparent',
//               color: filterStatus === 'ACTIVE' ? '#10b981' : '#64748b',
//               border: filterStatus === 'ACTIVE' ? '1px solid #10b981' : '1px solid #e2e8f0',
//             }}
//           />

//           <Chip
//             label="INACTIVE"
//             clickable
//             onClick={() => setFilterStatus('INACTIVE')}
//             sx={{
//               fontWeight: 600,
//               backgroundColor: filterStatus === 'INACTIVE' ? '#fef3c7' : 'transparent',
//               color: filterStatus === 'INACTIVE' ? '#92400e' : '#64748b',
//               border: filterStatus === 'INACTIVE' ? '1px solid #f59e0b' : '1px solid #e2e8f0',
//             }}
//           />

//           <Chip
//             label="BLOCKED"
//             clickable
//             onClick={() => setFilterStatus('BLOCKED')}
//             sx={{
//               fontWeight: 600,
//               backgroundColor: filterStatus === 'BLOCKED' ? '#fee2e2' : 'transparent',
//               color: filterStatus === 'BLOCKED' ? '#ef4444' : '#64748b',
//               border: filterStatus === 'BLOCKED' ? '1px solid #ef4444' : '1px solid #e2e8f0',
//             }}
//           />
//         </Box>

//         {/* Table with its own loading state */}
//         <Box sx={{ position: 'relative' }}>
//           {tableLoading && (
//             <Box
//               sx={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 backgroundColor: 'rgba(255, 255, 255, 0.7)',
//                 zIndex: 1,
//                 borderRadius: 1,
//               }}
//             >
//               <LoadingSpinner size={40} />
//             </Box>
//           )}
          
//           <DataTable
//             columns={columns}
//             data={businesses}
//             page={page}
//             rowsPerPage={rowsPerPage}
//             totalRows={totalRows}
//             onPageChange={setPage}
//             onRowsPerPageChange={setRowsPerPage}
//           />
//         </Box>
//       </Paper>

//       {/* Delete Dialog */}
//       <Dialog open={!!deleteDialog} onClose={() => !actionLoading && setDeleteDialog(null)}>
//         <DialogTitle>Delete Business</DialogTitle>
//         <DialogContent>
//           Are you sure you want to delete{' '}
//           <strong>{deleteDialog?.businessName}</strong>? This action cannot be undone.
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDeleteDialog(null)} disabled={actionLoading}>
//             Cancel
//           </Button>
//           <Button 
//             color="error" 
//             onClick={handleDelete}
//             disabled={actionLoading}
//           >
//             {actionLoading ? 'Deleting...' : 'Delete'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Block/Unblock Dialog */}
//       <Dialog 
//         open={!!blockDialog} 
//         onClose={() => !actionLoading && setBlockDialog(null)}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>
//           {blockDialog?.action === 'block' ? 'Block Business' : 'Unblock Business'}
//         </DialogTitle>
//         <DialogContent>
//           {blockDialog?.action === 'block' ? (
//             <>
//               <Typography variant="body2" sx={{ mb: 2, mt: 1 }}>
//                 Are you sure you want to block <strong>{blockDialog?.business?.businessName}</strong>?
//               </Typography>
//               <TextField
//                 autoFocus
//                 label="Block Reason"
//                 fullWidth
//                 multiline
//                 rows={3}
//                 value={blockReason}
//                 onChange={(e) => setBlockReason(e.target.value)}
//                 placeholder="Please provide a reason for blocking this business..."
//                 disabled={actionLoading}
//                 required
//                 error={blockReason.trim() === ''}
//                 helperText={blockReason.trim() === '' ? 'Block reason is required' : ''}
//               />
//             </>
//           ) : (
//             <Typography variant="body2" sx={{ py: 2 }}>
//               Are you sure you want to unblock <strong>{blockDialog?.business?.businessName}</strong>?
//             </Typography>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button 
//             onClick={() => setBlockDialog(null)} 
//             disabled={actionLoading}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleBlockUnblockConfirm}
//             color={blockDialog?.action === 'block' ? 'error' : 'primary'}
//             variant="contained"
//             disabled={
//               actionLoading || 
//               (blockDialog?.action === 'block' && !blockReason.trim())
//             }
//           >
//             {actionLoading ? 'Processing...' : blockDialog?.action === 'block' ? 'Block' : 'Unblock'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar for notifications */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//       >
//         <Alert 
//           onClose={() => setSnackbar({ ...snackbar, open: false })} 
//           severity={snackbar.severity}
//           sx={{ width: '100%' }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default BusinessList;

import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
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
  Paper,
  Tooltip,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Apps as AppsIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Lock,
  LockOpen,
  PersonAdd as PersonAddIcon,
  Groups as GroupsIcon,
  Block as BlockIcon,
  CheckCircle,
  Refresh as RefreshIcon,
  
} from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';
import StorageIcon from '@mui/icons-material/Storage';
import { useNavigate } from 'react-router-dom';
import DataTable from '../common/DataTable';
import LoadingSpinner from '../common/LoadingSpinner';
import { adminService } from '../../services/admin';
import { BUSINESS_STATUS, BUSINESS_STATUS_COLORS } from '../../utils/constants';

const BusinessList = () => {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteDialog, setDeleteDialog] = useState(null);
  const [totalRows, setTotalRows] = useState(0);
  const [blockDialog, setBlockDialog] = useState(null);
  const [blockReason, setBlockReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // 🔐 Store revealed secrets per business
  const [revealedSecrets, setRevealedSecrets] = useState({});

  const [metadataDialog, setMetadataDialog] = useState(null); // holds the business object
  const [metadataInput, setMetadataInput] = useState('');
  const [metadataLoading, setMetadataLoading] = useState(false);

  // const [merchantKey, setMerchantKey] = useState('');
  const [merchantName, setMerchantName] = useState('');
  const [merchantLogo, setMerchantLogo] = useState('');
  const [merchantPrimaryColor, setMerchantPrimaryColor] = useState('');
  const [merchantTheme, setMerchantTheme] = useState('');
  const [merchantPublicKey, setMerchantPublicKey] = useState('');
  const [merchantRedirectUrl, setMerchantRedirectUrl] = useState('');

  const [viewMetadataDialog, setViewMetadataDialog] = useState(null);
  const [viewMetadataData, setViewMetadataData] = useState(null);

 

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearch(value);
      setPage(0);
    }, 500),
    []
  );

  useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

  // Initial load only
  useEffect(() => {
    fetchBusinesses(true);
  }, []);

  // Effect for filter/pagination changes - FIXED: removed initialLoading from dependencies
  useEffect(() => {
    // Only fetch if not in initial loading state
    if (!initialLoading) {
      fetchBusinesses(false);
    }
  }, [page, rowsPerPage, search, filterStatus]); // Removed initialLoading from here

  const fetchBusinesses = async (isInitial = false) => {
    try {
      if (isInitial) {
        setInitialLoading(true);
      } else {
        setTableLoading(true);
      }
      
      const res = await adminService.getAllBusinesses(
        page,
        rowsPerPage,
        search,
        filterStatus !== 'ALL' ? filterStatus : ''
      );
      
      // Transform the data to ensure blocked status is properly reflected
      const transformedData = (res.data || []).map(business => ({
        ...business,
        status: business.isBlocked ? 'BLOCKED' : (business.status || 'ACTIVE')
      }));
      
      setBusinesses(transformedData);
      setTotalRows(res.total || 0);
    } catch (error) {
      console.error('Error fetching businesses:', error);
      setSnackbar({
        open: true,
        message: 'Failed to fetch businesses',
        severity: 'error'
      });
    } finally {
      if (isInitial) {
        setInitialLoading(false);
      }
      setTableLoading(false); // Always set table loading to false
    }
  };

  const handleRefresh = () => {
    fetchBusinesses(false);
    setSnackbar({
      open: true,
      message: 'Business list refreshed',
      severity: 'success'
    });
  };

  // 🔐 Toggle secret reveal
  const handleToggleSecret = async (business) => {
    const id = business.tenantId;

    // If already revealed → hide it
    if (revealedSecrets[id]) {
      setRevealedSecrets(prev => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      return;
    }

    try {
      const res = await adminService.getBusinessSecret(id);
      setRevealedSecrets(prev => ({
        ...prev,
        [id]: res.secretKey
      }));
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to fetch secret key',
        severity: 'error'
      });
    }
  };

  // Handle block action
  const handleBlockClick = (business) => {
    setBlockDialog({
      business,
      action: 'block'
    });
    setBlockReason('');
  };

  // Handle unblock action
  const handleUnblockClick = (business) => {
    setBlockDialog({
      business,
      action: 'unblock'
    });
    setBlockReason(''); // Clear previous reason 
  };
  // Metadata handlers

const handleMetadataClick = (business) => {
  setMetadataDialog(business);
  

  setMerchantName('');
  setMerchantLogo('');
  setMerchantPrimaryColor('');
  setMerchantTheme('');
  setMerchantPublicKey('');
  setMerchantRedirectUrl('');

  // Pre-fill if metadata exists
  if (business.metadata && Object.keys(business.metadata).length > 0) {
    const firstKey = Object.keys(business.metadata)[0];
    const data = business.metadata[firstKey];
    setMerchantName(data.name || '');
    setMerchantLogo(data.logo || '');
    setMerchantPrimaryColor(data.primaryColor || '');
    setMerchantTheme(data.theme || '');
    setMerchantPublicKey(data.publicKey || '');
    setMerchantRedirectUrl(data.redirectUrl ? data.redirectUrl.join(', ') : '');
  }
};

const handleMetadataSubmit = async () => {
  if (!metadataDialog) return;

  // Validation
  
  if (!merchantName.trim()) {
    setSnackbar({ open: true, message: 'Merchant Name is required', severity: 'error' });
    return;
  }

  
  // Build metadata object (flat)
  const metadata = {
    name: merchantName,
    logo: merchantLogo,
    primaryColor: merchantPrimaryColor,
    theme: merchantTheme,
    publicKey: merchantPublicKey,
    redirectUrl: merchantRedirectUrl.split(',').map(s => s.trim()).filter(s => s),
  };

  try {
    setMetadataLoading(true);
    // Use tenantId (custom businessId) – this should be correct
    await adminService.updateBusinessMetadata(metadataDialog.tenantId, metadata);
    setSnackbar({ open: true, message: 'Metadata updated successfully', severity: 'success' });
    setMetadataDialog(null);
    await fetchBusinesses(false);
  } catch (error) {
    setSnackbar({
      open: true,
      message: error.response?.data?.message || 'Failed to update metadata',
      severity: 'error'
    });
  } finally {
    setMetadataLoading(false);
  }
};

const handleViewMetadataClick = (business) => {
  setViewMetadataDialog(business);
  setViewMetadataData(business.metadata || {});
};

  const handleBlockUnblockConfirm = async () => {
  const { business, action } = blockDialog;
  
  try {
    setActionLoading(true);
    
    if (action === 'block') {
      await adminService.blockBusiness(business._id, blockReason);
      setSnackbar({
        open: true,
        message: 'Business blocked successfully',
        severity: 'success'
      });
    } else {
      // Pass reason for unblock as well
      await adminService.unblockBusiness(business._id, blockReason);
      setSnackbar({
        open: true,
        message: 'Business unblocked successfully',
        severity: 'success'
      });
    }
    
    // Refresh only the table data
    await fetchBusinesses(false);
    setBlockDialog(null);
    setBlockReason('');
    
  } catch (error) {
    console.error(`Failed to ${action} business:`, error);
    setSnackbar({
      open: true,
      message: error.response?.data?.message || `Failed to ${action} business`,
      severity: 'error'
    });
  } finally {
    setActionLoading(false);
  }
};
  // Handle delete
const handleDelete = async () => {
  if (!deleteDialog) return;
  try {
    setActionLoading(true);
    await adminService.deleteBusiness(deleteDialog.tenantId);
    setSnackbar({
      open: true,
      message: 'Business deleted successfully',
      severity: 'success'
    });
    setDeleteDialog(null);
    await fetchBusinesses(false);
  } catch (error) {
    setSnackbar({
      open: true,
      message: 'Failed to delete business',
      severity: 'error'
    });
  } finally {
    setActionLoading(false);
  }
};

  const columns = [
    { field: 'businessName', headerName: 'Business Name', sortable: true },
    { field: 'industry', headerName: 'Industry', sortable: true },
    { field: 'contactEmail', headerName: 'Contact Email', sortable: true },
    {
  field: 'hasMetadata',
  headerName: 'Metadata',
  width: 200,
  render: (_, business) => {
    const hasData = business.metadata && Object.keys(business.metadata).length > 0;

    if (!hasData) return <Chip label="None" size="small" variant="outlined" />;

    return (
      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', alignItems: 'center' }}>
        {/* View button */}
        <Tooltip
          arrow
          title={
            <pre style={{ margin: 0, fontSize: 11, maxWidth: 320, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {JSON.stringify(business.metadata, null, 2)}
            </pre>
          }
        >
          <Chip
            label="View"
            size="small"
            icon={<InfoIcon sx={{ fontSize: '13px !important' }} />}
            sx={{
              height: 22, fontSize: '0.7rem', fontWeight: 600,
              bgcolor: '#f0f9ff', color: '#0369a1', border: '1px solid #bae6fd',
              cursor: 'default',
            }}
          />
        </Tooltip>

        {/* Edit button */}
        <Chip
          label="Edit"
          size="small"
          icon={<StorageIcon sx={{ fontSize: '13px !important' }} />}
          onClick={() => handleMetadataClick(business)}
          sx={{
            height: 22, fontSize: '0.7rem', fontWeight: 600,
            bgcolor: '#f5f3ff', color: '#7c3aed', border: '1px solid #ddd6fe',
            cursor: 'pointer', '&:hover': { bgcolor: '#ede9fe' },
          }}
        />
      </Box>
    );
  },
},

    // 🔐 Secret Key Column (inline reveal)
    {
      field: 'secretKey',
      headerName: 'Secret Key',
      render: (_, business) => {
        const secret = revealedSecrets[business.tenantId];

        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontFamily: 'monospace' }}>
              {secret ? secret : '***************'}
            </Typography>

            <Tooltip title={secret ? "Hide Secret" : "View Secret"}>
              <IconButton
                size="small"
                onClick={() => handleToggleSecret(business)}
              >
                <ViewIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },

    {
      field: 'status',
      headerName: 'Status',
      sortable: true,
      render: (value) => (
        <Chip
          label={value}
          size="small"
          color={BUSINESS_STATUS_COLORS[value] || 'default'}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      align: 'center',
      render: (_, business) => (
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        

          <Tooltip title="View Users">
            <IconButton
              size="small"
              onClick={() =>
                navigate(`/admin/businesses/${business.businessId}/users`)
              }
              sx={{ color: '#7c3aed', '&:hover': { backgroundColor: '#ede9fe' } }}
            >
              <GroupsIcon fontSize="small" />
            </IconButton>
          </Tooltip>

       
         <Tooltip title="Edit Business">
          <IconButton
            size="small"
            onClick={() => navigate(`/admin/businesses/${business.tenantId}/edit`)}
            sx={{ color: '#f59e0b', '&:hover': { backgroundColor: '#fef3c7' } }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>

          <Tooltip title="Delete Business">
            <IconButton
              size="small"
              onClick={() => setDeleteDialog(business)}
              sx={{ color: '#ef4444', '&:hover': { backgroundColor: '#fee2e2' } }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={business.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
          >
            <IconButton
              size="small"
              sx={{
                color: business.status === 'ACTIVE' ? '#ef4444' : '#10b981',
                '&:hover': {
                  backgroundColor:
                    business.status === 'ACTIVE' ? '#fee2e2' : '#ecfdf5',
                },
              }}
            >
              {business.status === 'ACTIVE' ? (
                <Lock fontSize="small" />
              ) : (
                <LockOpen fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
          
          {business.status === 'BLOCKED' ? (
            <Tooltip title="Unblock Business">
              <IconButton
                size="small"
                onClick={() => handleUnblockClick(business)}
                sx={{ 
                  color: '#10b981',
                  '&:hover': { backgroundColor: '#ecfdf5' } 
                }}
              >
                <CheckCircle fontSize="small" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Block Business">
              <IconButton
                size="small"
                onClick={() => handleBlockClick(business)}
                sx={{ 
                  color: '#ef4444',
                  '&:hover': { backgroundColor: '#fee2e2' } 
                }}
              >
                <BlockIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      ),
    },
  ];

  // Show initial loading spinner only for first load
  if (initialLoading) return <LoadingSpinner />;

  return (
    <Box
      sx={{
        minHeight: '100%',
        background:
          'linear-gradient(135deg, #f8fbff 0%, #eef5ff 45%, #e6f0ff 100%)',
        p: 3,
      }}
    >
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(90deg,#1a365d,#3182ce)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Businesses
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            Manage registered businesses and applications
          </Typography>
        </Box>
        
        {/* Refresh Icon */}
        <Tooltip title="Refresh Table">
          <IconButton 
            onClick={handleRefresh} 
            disabled={tableLoading}
            sx={{
              backgroundColor: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
              animation: tableLoading ? 'spin 1s linear infinite' : 'none',
              '@keyframes spin': {
                '0%': {
                  transform: 'rotate(0deg)',
                },
                '100%': {
                  transform: 'rotate(360deg)',
                },
              },
            }}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: '1px solid rgba(49,130,206,0.2)',
          background: 'linear-gradient(180deg,#ffffff,#f9fbff)',
          boxShadow:
            '0 10px 25px rgba(49,130,206,0.08),0 4px 10px rgba(0,0,0,0.04)',
          p: 3,
        }}
      >
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search businesses..."
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                debouncedSearch(e.target.value);
              }}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/admin/businesses/create')}
              sx={{
                background:
                  'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 6px 16px rgba(102,126,234,0.35)',
              }}
            >
              Add Business
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Chip
            label="ALL"
            clickable
            onClick={() => setFilterStatus('ALL')}
            sx={{
              fontWeight: 600,
              backgroundColor: filterStatus === 'ALL' ? '#e0e7ff' : 'transparent',
              color: filterStatus === 'ALL' ? '#3730a3' : '#64748b',
              border: filterStatus === 'ALL' ? '1px solid #6366f1' : '1px solid #cbd5f5',
            }}
          />

          <Chip
            label="ACTIVE"
            clickable
            onClick={() => setFilterStatus('ACTIVE')}
            sx={{
              fontWeight: 600,
              backgroundColor: filterStatus === 'ACTIVE' ? '#ecfdf5' : 'transparent',
              color: filterStatus === 'ACTIVE' ? '#10b981' : '#64748b',
              border: filterStatus === 'ACTIVE' ? '1px solid #10b981' : '1px solid #e2e8f0',
            }}
          />

          <Chip
            label="INACTIVE"
            clickable
            onClick={() => setFilterStatus('INACTIVE')}
            sx={{
              fontWeight: 600,
              backgroundColor: filterStatus === 'INACTIVE' ? '#fef3c7' : 'transparent',
              color: filterStatus === 'INACTIVE' ? '#92400e' : '#64748b',
              border: filterStatus === 'INACTIVE' ? '1px solid #f59e0b' : '1px solid #e2e8f0',
            }}
          />

          <Chip
            label="BLOCKED"
            clickable
            onClick={() => setFilterStatus('BLOCKED')}
            sx={{
              fontWeight: 600,
              backgroundColor: filterStatus === 'BLOCKED' ? '#fee2e2' : 'transparent',
              color: filterStatus === 'BLOCKED' ? '#ef4444' : '#64748b',
              border: filterStatus === 'BLOCKED' ? '1px solid #ef4444' : '1px solid #e2e8f0',
            }}
          />
        </Box>

        {/* Table with its own loading state */}
        <Box sx={{ position: 'relative' }}>
          {tableLoading && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                zIndex: 1,
                borderRadius: 1,
              }}
            >
              <LoadingSpinner size={40} />
            </Box>
          )}
          
          <DataTable
            columns={columns}
            data={businesses}
            page={page}
            rowsPerPage={rowsPerPage}
            totalRows={totalRows}
            onPageChange={setPage}
            onRowsPerPageChange={setRowsPerPage}
          />
        </Box>
      </Paper>

      {/* Delete Dialog */}
      <Dialog open={!!deleteDialog} onClose={() => !actionLoading && setDeleteDialog(null)}>
        <DialogTitle>Delete Business</DialogTitle>
        <DialogContent>
          Are you sure you want to delete{' '}
          <strong>{deleteDialog?.businessName}</strong>? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(null)} disabled={actionLoading}>
            Cancel
          </Button>
          <Button 
            color="error" 
            onClick={handleDelete}
            disabled={actionLoading}
          >
            {actionLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

          {/* Metadata Dialog */}
<Dialog
  open={!!metadataDialog}
  onClose={() => !metadataLoading && setMetadataDialog(null)}
  maxWidth="md"
  fullWidth
>
  <DialogTitle>
    Manage Metadata for {metadataDialog?.businessName}
  </DialogTitle>
 <DialogContent>
  <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
    Enter merchant details. The metadata will be stored under the provided Merchant Key.
  </Typography>

  <Grid container spacing={2}>
   
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Merchant Name"
        value={merchantName}
        onChange={(e) => setMerchantName(e.target.value)}
        placeholder="Pinnacle Test Merchant"
        disabled={metadataLoading}
        required
      />
    </Grid>

    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Logo URL"
        value={merchantLogo}
        onChange={(e) => setMerchantLogo(e.target.value)}
        placeholder="https://example.com/logo.png"
        disabled={metadataLoading}
      />
    </Grid>

    <Grid item xs={6}>
      <TextField
        fullWidth
        label="Primary Color"
        value={merchantPrimaryColor}
        onChange={(e) => setMerchantPrimaryColor(e.target.value)}
        placeholder="#00e676"
        disabled={metadataLoading}
      />
    </Grid>

    <Grid item xs={6}>
      <TextField
        fullWidth
        label="Theme"
        value={merchantTheme}
        onChange={(e) => setMerchantTheme(e.target.value)}
        placeholder="dark"
        disabled={metadataLoading}
      />
    </Grid>

    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Public Key"
        value={merchantPublicKey}
        onChange={(e) => setMerchantPublicKey(e.target.value)}
        placeholder="-----BEGIN PUBLIC KEY-----\nMIIBIj...\n-----END PUBLIC KEY-----"
        disabled={metadataLoading}
        multiline
        rows={4}
      />
    </Grid>

    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Redirect URLs"
        value={merchantRedirectUrl}
        onChange={(e) => setMerchantRedirectUrl(e.target.value)}
        placeholder="http://localhost:3000/auth/callback, https://example.com/callback"
        disabled={metadataLoading}
        helperText="Comma-separated list of URLs"
      />
    </Grid>
  </Grid>
</DialogContent>
  <DialogActions>
    <Button onClick={() => setMetadataDialog(null)} disabled={metadataLoading}>
      Cancel
    </Button>
    <Button
      onClick={handleMetadataSubmit}
      variant="contained"
      disabled={metadataLoading}
      sx={{
        background: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
      }}
    >
      {metadataLoading ? 'Saving...' : 'Save Metadata'}
    </Button>
  </DialogActions>
</Dialog>
    {/* View Metadata Dialog */}
<Dialog
  open={!!viewMetadataDialog}
  onClose={() => setViewMetadataDialog(null)}
  maxWidth="md"
  fullWidth
>
  <DialogTitle>
    Metadata for {viewMetadataDialog?.businessName}
  </DialogTitle>
  <DialogContent dividers>
    {viewMetadataData && Object.keys(viewMetadataData).length > 0 ? (
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          bgcolor: '#f5f5f5',
          maxHeight: '400px',
          overflow: 'auto',
          fontFamily: 'monospace',
          fontSize: '0.85rem'
        }}
      >
        <pre style={{ margin: 0 }}>
          {JSON.stringify(viewMetadataData, null, 2)}
        </pre>
      </Paper>
    ) : (
      <Alert severity="info">No metadata available for this business.</Alert>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setViewMetadataDialog(null)}>Close</Button>
  </DialogActions>
</Dialog>
<Dialog 
  open={!!blockDialog} 
  onClose={() => !actionLoading && setBlockDialog(null)}
  maxWidth="sm"
  fullWidth
>
  <DialogTitle>
    {blockDialog?.action === 'block' ? 'Block Business' : 'Unblock Business'}
  </DialogTitle>
  <DialogContent>
    <Typography variant="body2" sx={{ mb: 2, mt: 1 }}>
      Are you sure you want to {blockDialog?.action} <strong>{blockDialog?.business?.businessName}</strong>?
    </Typography>
    
    <TextField
      autoFocus
      label={blockDialog?.action === 'block' ? 'Block Reason' : 'Unblock Reason'}
      fullWidth
      multiline
      rows={3}
      value={blockReason}
      onChange={(e) => setBlockReason(e.target.value)}
      placeholder={
        blockDialog?.action === 'block'
          ? 'Please provide a reason for blocking...'
          : 'Please provide a reason for unblocking...'
      }
      disabled={actionLoading}
      required
      error={blockReason.trim() === ''}
      helperText={blockReason.trim() === '' ? 'Reason is required' : ''}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setBlockDialog(null)} disabled={actionLoading}>
      Cancel
    </Button>
    <Button
      onClick={handleBlockUnblockConfirm}
      color={blockDialog?.action === 'block' ? 'error' : 'primary'}
      variant="contained"
      disabled={actionLoading || !blockReason.trim()}
    >
      {actionLoading ? 'Processing...' : blockDialog?.action === 'block' ? 'Block' : 'Unblock'}
    </Button>
  </DialogActions>
</Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BusinessList;