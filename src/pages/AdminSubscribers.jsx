// // // C:\goflipo-frontend\goflipo_portal_frontend\src\pages\AdminSubscribers.jsx
// // // Create this new file

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
// //   Avatar,
// //   Stack,
// //   MenuItem,
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   Alert,
// //   Snackbar,
// // } from '@mui/material';
// // import {
// //   Search as SearchIcon,
// //   Block as BlockIcon,
// //   CheckCircle as UnblockIcon,
// //   Phone as PhoneIcon,
// //   DeviceUnknown as DeviceIcon,
// //   Verified as VerifiedIcon,
// //   Unpublished as UnverifiedIcon,
// //   CalendarToday as CalendarIcon,
// //   Person as PersonIcon,
// // } from '@mui/icons-material';
// // import { format } from 'date-fns';
// // import DataTable from '../components/common/DataTable';
// // import LoadingSpinner from '../components/common/LoadingSpinner';
// // import { adminSubscriberService } from '../services/adminSubscriber';

// // // Status chip colors
// // const STATUS_COLORS = {
// //   '🔴 Blocked': 'error',
// //   '🟢 Active': 'success'
// // };

// // const SMS_STATUS_COLORS = {
// //   '✅ Verified': 'success',
// //   '❌ Not Verified': 'warning'
// // };

// // const AdminSubscribers = () => {
// //   const [subscribers, setSubscribers] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [search, setSearch] = useState('');
// //   const [searchInput, setSearchInput] = useState('');
// //   const [filterBlocked, setFilterBlocked] = useState('');
// //   const [page, setPage] = useState(0);
// //   const [rowsPerPage, setRowsPerPage] = useState(10);
// //   const [totalRows, setTotalRows] = useState(0);
// //   const [stats, setStats] = useState({ total: 0, blocked: 0, active: 0, verified: 0 });

// //   // Block dialog state
// //   const [blockDialog, setBlockDialog] = useState(null);
// //   const [blockReason, setBlockReason] = useState('');
// //   const [blocking, setBlocking] = useState(false);

// //   // Unblock dialog state
// //   const [unblockDialog, setUnblockDialog] = useState(null);
// //   const [unblocking, setUnblocking] = useState(false);

// //   // Snackbar for notifications
// //   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

// //   // Debounced search
// //   const debouncedSearch = useCallback(
// //     debounce((value) => {
// //       setSearch(value);
// //       setPage(0);
// //     }, 500),
// //     []
// //   );

// //   useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

// //   // Fetch subscribers
// //   const fetchSubscribers = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await adminSubscriberService.getAllSubscribers(
// //         page + 1,
// //         rowsPerPage,
// //         filterBlocked,
// //         search
// //       );
// //       setSubscribers(response.data || []);
// //       setTotalRows(response.pagination?.total || 0);
// //       setStats(response.stats || { total: 0, blocked: 0, active: 0, verified: 0 });
// //     } catch (error) {
// //       showSnackbar('Failed to fetch subscribers', 'error');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchSubscribers();
// //   }, [page, rowsPerPage, search, filterBlocked]);

// //   // Handle block subscriber
// //   const handleBlock = async () => {
// //     if (!blockReason.trim()) {
// //       showSnackbar('Blocking reason is required', 'error');
// //       return;
// //     }

// //     try {
// //       setBlocking(true);
// //       await adminSubscriberService.blockSubscriber(blockDialog._id, blockReason);
// //       showSnackbar(`Subscriber ${blockDialog.phoneNumber} blocked successfully`, 'success');
// //       setBlockDialog(null);
// //       setBlockReason('');
// //       fetchSubscribers();
// //     } catch (error) {
// //       showSnackbar(error.response?.data?.message || 'Failed to block subscriber', 'error');
// //     } finally {
// //       setBlocking(false);
// //     }
// //   };

// //   // Handle unblock subscriber
// //   const handleUnblock = async () => {
// //     try {
// //       setUnblocking(true);
// //       await adminSubscriberService.unblockSubscriber(unblockDialog._id);
// //       showSnackbar(`Subscriber ${unblockDialog.phoneNumber} unblocked successfully`, 'success');
// //       setUnblockDialog(null);
// //       fetchSubscribers();
// //     } catch (error) {
// //       showSnackbar(error.response?.data?.message || 'Failed to unblock subscriber', 'error');
// //     } finally {
// //       setUnblocking(false);
// //     }
// //   };

// //   const showSnackbar = (message, severity = 'success') => {
// //     setSnackbar({ open: true, message, severity });
// //   };

// //   // Table columns
// //   const columns = [
// //     { 
// //       field: 'srNo', 
// //       headerName: 'Sr No', 
// //       width: 70,
// //       align: 'center' 
// //     },
// //     { 
// //       field: 'phoneNumber', 
// //       headerName: 'Phone Number', 
// //       width: 150,
// //       render: (value) => (
// //         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //           <PhoneIcon sx={{ fontSize: 16, color: '#4a5568' }} />
// //           <Typography sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
// //             {value}
// //           </Typography>
// //         </Box>
// //       )
// //     },
// //     { 
// //       field: 'deviceId', 
// //       headerName: 'Device ID', 
// //       width: 120,
// //       render: (value) => (
// //         <Tooltip title={value}>
// //           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //             <DeviceIcon sx={{ fontSize: 16, color: '#64748b' }} />
// //             <Typography sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
// //               {value?.substring(0, 8)}...
// //             </Typography>
// //           </Box>
// //         </Tooltip>
// //       )
// //     },
// //     { 
// //       field: 'smsVerification', 
// //       headerName: 'SMS Verification', 
// //       width: 140,
// //       render: (value) => (
// //         <Chip
// //           icon={value === '✅ Verified' ? <VerifiedIcon /> : <UnverifiedIcon />}
// //           label={value}
// //           size="small"
// //           color={SMS_STATUS_COLORS[value] || 'default'}
// //           sx={{ fontWeight: 500 }}
// //         />
// //       )
// //     },
// //     { 
// //       field: 'onboardedOn', 
// //       headerName: 'Onboarded On', 
// //       width: 120,
// //       render: (value) => (
// //         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //           <CalendarIcon sx={{ fontSize: 16, color: '#64748b' }} />
// //           <Typography variant="body2">{value}</Typography>
// //         </Box>
// //       )
// //     },
// //     { 
// //       field: 'status', 
// //       headerName: 'Status', 
// //       width: 120,
// //       render: (value) => {
// //         const isBlocked = value.includes('Blocked');
// //         return (
// //           <Chip
// //             icon={isBlocked ? <BlockIcon /> : <UnblockIcon />}
// //             label={value}
// //             size="small"
// //             color={isBlocked ? 'error' : 'success'}
// //             sx={{ fontWeight: 600 }}
// //           />
// //         );
// //       }
// //     },
// //     { 
// //       field: 'blockReason', 
// //       headerName: 'Block Reason', 
// //       width: 200,
// //       render: (value, row) => {
// //         if (!row.isBlocked || !value) return '—';
// //         return (
// //           <Tooltip title={`Blocked by: ${row.blockedBy?.email || 'Admin'}`}>
// //             <Typography 
// //               variant="body2" 
// //               sx={{ 
// //                 color: '#ef4444', 
// //                 backgroundColor: '#fee2e2', 
// //                 px: 1, 
// //                 py: 0.5, 
// //                 borderRadius: 1,
// //                 fontSize: '0.75rem',
// //                 display: 'inline-block'
// //               }}
// //             >
// //               {value.length > 30 ? `${value.substring(0, 30)}...` : value}
// //             </Typography>
// //           </Tooltip>
// //         );
// //       }
// //     },
// //     { 
// //       field: 'actions', 
// //       headerName: 'Actions', 
// //       width: 150,
// //       align: 'center',
// //       render: (_, row) => (
// //         <Stack direction="row" spacing={1} justifyContent="center">
// //           {row.isBlocked ? (
// //             <Tooltip title="Unblock Subscriber">
// //               <IconButton
// //                 size="small"
// //                 onClick={() => setUnblockDialog(row)}
// //                 sx={{
// //                   color: '#10b981',
// //                   backgroundColor: '#ecfdf5',
// //                   '&:hover': { backgroundColor: '#d1fae5' },
// //                   width: 32,
// //                   height: 32
// //                 }}
// //               >
// //                 <UnblockIcon fontSize="small" />
// //               </IconButton>
// //             </Tooltip>
// //           ) : (
// //             <Tooltip title="Block Subscriber">
// //               <IconButton
// //                 size="small"
// //                 onClick={() => setBlockDialog(row)}
// //                 sx={{
// //                   color: '#ef4444',
// //                   backgroundColor: '#fee2e2',
// //                   '&:hover': { backgroundColor: '#fecaca' },
// //                   width: 32,
// //                   height: 32
// //                 }}
// //               >
// //                 <BlockIcon fontSize="small" />
// //               </IconButton>
// //             </Tooltip>
// //           )}
        
// //         </Stack>
// //       )
// //     }
// //   ];

// //   // Stats cards data
// //   const statsCards = [
// //     { 
// //       label: 'Total Subscribers', 
// //       value: stats.total, 
// //       color: '#3182ce', 
// //       bgColor: '#e6f0ff',
// //       icon: <PhoneIcon />
// //     },
// //     { 
// //       label: 'Active', 
// //       value: stats.active, 
// //       color: '#10b981', 
// //       bgColor: '#ecfdf5',
// //       icon: <UnblockIcon />
// //     },
// //     { 
// //       label: 'Blocked', 
// //       value: stats.blocked, 
// //       color: '#ef4444', 
// //       bgColor: '#fee2e2',
// //       icon: <BlockIcon />
// //     },
// //     { 
// //       label: 'Verified', 
// //       value: stats.verified, 
// //       color: '#8b5cf6', 
// //       bgColor: '#f3e8ff',
// //       icon: <VerifiedIcon />
// //     }
// //   ];

// //   if (loading && page === 0) return <LoadingSpinner />;

// //   return (
// //     <Box
// //       sx={{
// //         minHeight: '100%',
// //         background: 'linear-gradient(135deg, #f8fbff 0%, #eef5ff 45%, #e6f0ff 100%)',
// //         p: 3,
// //       }}
// //     >
// //       {/* Header */}
// //       <Box sx={{ mb: 3 }}>
// //         <Typography
// //           variant="h5"
// //           sx={{
// //             fontWeight: 700,
// //             background: 'linear-gradient(90deg, #1a365d, #3182ce)',
// //             WebkitBackgroundClip: 'text',
// //             WebkitTextFillColor: 'transparent',
// //             mb: 1
// //           }}
// //         >
// //           Subscribers Management
// //         </Typography>
// //         <Typography variant="body2" sx={{ color: '#64748b' }}>
// //           Manage authenticator app users, block/unblock devices, and view verification status
// //         </Typography>
// //       </Box>

// //       {/* Stats Cards */}
// //       <Grid container spacing={2} sx={{ mb: 3 }}>
// //         {statsCards.map((stat) => (
// //           <Grid item xs={12} sm={6} md={3} key={stat.label}>
// //             <Paper
// //               elevation={0}
// //               sx={{
// //                 p: 2,
// //                 borderRadius: 2,
// //                 border: '1px solid rgba(49,130,206,0.1)',
// //                 background: 'linear-gradient(135deg, #ffffff, #f9fcff)',
// //                 display: 'flex',
// //                 alignItems: 'center',
// //                 justifyContent: 'space-between'
// //               }}
// //             >
// //               <Box>
// //                 <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
// //                   {stat.value}
// //                 </Typography>
// //                 <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
// //                   {stat.label}
// //                 </Typography>
// //               </Box>
// //               <Avatar
// //                 sx={{
// //                   bgcolor: stat.bgColor,
// //                   color: stat.color,
// //                   width: 48,
// //                   height: 48
// //                 }}
// //               >
// //                 {stat.icon}
// //               </Avatar>
// //             </Paper>
// //           </Grid>
// //         ))}
// //       </Grid>

// //       {/* Main Table Card */}
// //       <Paper
// //         elevation={0}
// //         sx={{
// //           borderRadius: 3,
// //           border: '1px solid rgba(49,130,206,0.2)',
// //           background: 'linear-gradient(180deg, #ffffff, #f9fbff)',
// //           boxShadow: '0 10px 25px rgba(49,130,206,0.08)',
// //           p: 3,
// //         }}
// //       >
// //         {/* Filters */}
// //         <Grid container spacing={2} sx={{ mb: 2 }}>
// //           <Grid item xs={12} md={6}>
// //             <TextField
// //               fullWidth
// //               placeholder="Search by phone number or device ID..."
// //               value={searchInput}
// //               onChange={(e) => {
// //                 setSearchInput(e.target.value);
// //                 debouncedSearch(e.target.value);
// //               }}
// //               InputProps={{
// //                 startAdornment: <SearchIcon sx={{ mr: 1, color: '#64748b' }} />,
// //                 sx: {
// //                   backgroundColor: '#ffffff',
// //                   '&:hover': {
// //                     backgroundColor: '#ffffff',
// //                   }
// //                 }
// //               }}
// //               size="small"
// //             />
// //           </Grid>
// //           <Grid item xs={12} md={6}>
// //             <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
// //               <FormControl size="small" sx={{ minWidth: 150 }}>
// //                 <InputLabel>Filter by Status</InputLabel>
// //                 <Select
// //                   value={filterBlocked}
// //                   label="Filter by Status"
// //                   onChange={(e) => {
// //                     setFilterBlocked(e.target.value);
// //                     setPage(0);
// //                   }}
// //                 >
// //                   <MenuItem value="">All</MenuItem>
// //                   <MenuItem value="false">Active Only</MenuItem>
// //                   <MenuItem value="true">Blocked Only</MenuItem>
// //                 </Select>
// //               </FormControl>
// //             </Box>
// //           </Grid>
// //         </Grid>

// //         {/* Data Table */}
// //         <DataTable
// //           columns={columns}
// //           data={subscribers}
// //           page={page}
// //           rowsPerPage={rowsPerPage}
// //           totalRows={totalRows}
// //           onPageChange={setPage}
// //           onRowsPerPageChange={setRowsPerPage}
// //           loading={loading}
// //         />
// //       </Paper>

// //       {/* BLOCK DIALOG - With reason prompt */}
// //       <Dialog 
// //         open={!!blockDialog} 
// //         onClose={() => {
// //           setBlockDialog(null);
// //           setBlockReason('');
// //         }}
// //         maxWidth="sm"
// //         fullWidth
// //       >
// //         <DialogTitle sx={{ 
// //           background: 'linear-gradient(135deg, #ef4444, #dc2626)',
// //           color: 'white',
// //           fontWeight: 600
// //         }}>
// //           Block Subscriber
// //         </DialogTitle>
// //         <DialogContent sx={{ pt: 3, mt: 2 }}>
// //           <Typography variant="body2" sx={{ mb: 2 }}>
// //             Are you sure you want to block this subscriber?
// //           </Typography>
          
// //           <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: '#f9fafb' }}>
// //             <Typography variant="body2">
// //               <strong>Phone:</strong> {blockDialog?.phoneNumber}
// //             </Typography>
// //             <Typography variant="body2">
// //               <strong>Device ID:</strong> {blockDialog?.deviceId}
// //             </Typography>
// //           </Paper>

// //           <TextField
// //             autoFocus
// //             fullWidth
// //             label="Blocking Reason"
// //             placeholder="Enter reason for blocking (e.g., Stolen device, Suspicious activity)"
// //             value={blockReason}
// //             onChange={(e) => setBlockReason(e.target.value)}
// //             multiline
// //             rows={3}
// //             required
// //             error={blockReason.trim() === ''}
// //             helperText={blockReason.trim() === '' ? 'Reason is required' : ''}
// //           />
// //         </DialogContent>
// //         <DialogActions sx={{ px: 3, pb: 3 }}>
// //           <Button 
// //             onClick={() => {
// //               setBlockDialog(null);
// //               setBlockReason('');
// //             }}
// //             variant="outlined"
// //           >
// //             Cancel
// //           </Button>
// //           <Button
// //             onClick={handleBlock}
// //             variant="contained"
// //             color="error"
// //             disabled={!blockReason.trim() || blocking}
// //             sx={{
// //               background: 'linear-gradient(135deg, #ef4444, #dc2626)',
// //               '&:hover': {
// //                 background: 'linear-gradient(135deg, #dc2626, #b91c1c)'
// //               }
// //             }}
// //           >
// //             {blocking ? 'Blocking...' : 'Block Subscriber'}
// //           </Button>
// //         </DialogActions>
// //       </Dialog>

// //       {/* UNBLOCK DIALOG - Simple confirmation */}
// //       <Dialog 
// //         open={!!unblockDialog} 
// //         onClose={() => setUnblockDialog(null)}
// //         maxWidth="sm"
// //         fullWidth
// //       >
// //         <DialogTitle sx={{ 
// //           background: 'linear-gradient(135deg, #10b981, #059669)',
// //           color: 'white',
// //           fontWeight: 600
// //         }}>
// //           Unblock Subscriber
// //         </DialogTitle>
// //         <DialogContent sx={{ pt: 3 }}>
// //           <Typography variant="body1" sx={{ mb: 2 }}>
// //             Are you sure you want to unblock this subscriber?
// //           </Typography>
          
// //           <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f9fafb' }}>
// //             <Typography variant="body2">
// //               <strong>Phone:</strong> {unblockDialog?.phoneNumber}
// //             </Typography>
// //             <Typography variant="body2">
// //               <strong>Device ID:</strong> {unblockDialog?.deviceId}
// //             </Typography>
// //             {unblockDialog?.blockReason && (
// //               <Typography variant="body2" sx={{ mt: 1, color: '#ef4444' }}>
// //                 <strong>Block Reason:</strong> {unblockDialog.blockReason}
// //               </Typography>
// //             )}
// //           </Paper>
// //         </DialogContent>
// //         <DialogActions sx={{ px: 3, pb: 3 }}>
// //           <Button onClick={() => setUnblockDialog(null)} variant="outlined">
// //             Cancel
// //           </Button>
// //           <Button
// //             onClick={handleUnblock}
// //             variant="contained"
// //             color="success"
// //             disabled={unblocking}
// //             sx={{
// //               background: 'linear-gradient(135deg, #10b981, #059669)',
// //               '&:hover': {
// //                 background: 'linear-gradient(135deg, #059669, #047857)'
// //               }
// //             }}
// //           >
// //             {unblocking ? 'Unblocking...' : 'Unblock Subscriber'}
// //           </Button>
// //         </DialogActions>
// //       </Dialog>

// //       {/* Snackbar for notifications */}
// //       <Snackbar
// //         open={snackbar.open}
// //         autoHideDuration={4000}
// //         onClose={() => setSnackbar({ ...snackbar, open: false })}
// //         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
// //       >
// //         <Alert 
// //           severity={snackbar.severity} 
// //           variant="filled"
// //           sx={{ width: '100%' }}
// //         >
// //           {snackbar.message}
// //         </Alert>
// //       </Snackbar>
// //     </Box>
// //   );
// // };

// // export default AdminSubscribers;


// // C:\goflipo-frontend\goflipo_portal_frontend\src\pages\AdminSubscribers.jsx
// // Create this new file

// import React, { useState, useEffect, useCallback,useRef  } from 'react';
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
//   Avatar,
//   Stack,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Select,
//   Alert,
//   Snackbar,
// } from '@mui/material';
// import {
//   Search as SearchIcon,
//   Block as BlockIcon,
//   CheckCircle as UnblockIcon,
//   Phone as PhoneIcon,
//   DeviceUnknown as DeviceIcon,
//   Verified as VerifiedIcon,
//   Unpublished as UnverifiedIcon,
//   CalendarToday as CalendarIcon,
//   Person as PersonIcon,
// } from '@mui/icons-material';
// import { format } from 'date-fns';
// import DataTable from '../components/common/DataTable';
// import LoadingSpinner from '../components/common/LoadingSpinner';
// import { adminSubscriberService } from '../services/adminSubscriber';

// // Status chip colors
// const STATUS_COLORS = {
//   '🔴 Blocked': 'error',
//   '🟢 Active': 'success'
// };

// const SMS_STATUS_COLORS = {
//   '✅ Verified': 'success',
//   '❌ Not Verified': 'warning'
// };

// const AdminSubscribers = () => {
//   const [subscribers, setSubscribers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
//   const [searchInput, setSearchInput] = useState('');
//   const [filterBlocked, setFilterBlocked] = useState('');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [totalRows, setTotalRows] = useState(0);
//   const [stats, setStats] = useState({ total: 0, blocked: 0, active: 0, verified: 0 });

//   // Block dialog state
//   const [blockDialog, setBlockDialog] = useState(null);
//   const [blockReason, setBlockReason] = useState('');
//   const [blocking, setBlocking] = useState(false);

//   // Unblock dialog state
//   const [unblockDialog, setUnblockDialog] = useState(null);
//   const [unblocking, setUnblocking] = useState(false);

//   // Snackbar for notifications
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
//      const searchInputRef = useRef(null);
    

// const [localSearchInput, setLocalSearchInput] = useState('');
//   const searchTimeoutRef = useRef(null);

//   // Handle search input change with debounce
//   const handleSearchInputChange = (e) => {
//     const value = e.target.value;
//     setLocalSearchInput(value); // Update local state immediately for UI
    
//     // Clear previous timeout
//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current);
//     }
    
//     // Set new timeout to update actual search after user stops typing
//     searchTimeoutRef.current = setTimeout(() => {
//       setSearch(value); // This will trigger the API call
//       setPage(0);
//     }, 500); // Wait 500ms after user stops typing
//   };

//   // Update local input when search prop changes externally (like clear)
//   useEffect(() => {
//     setLocalSearchInput(search);
//   }, [search]);

//   // Cleanup timeout on unmount
//   useEffect(() => {
//     return () => {
//       if (searchTimeoutRef.current) {
//         clearTimeout(searchTimeoutRef.current);
//       }
//     };
//   }, []);

//   // Fetch subscribers
// //   const fetchSubscribers = async () => {
// //     try {
// //       setLoading(true);
      
// //       // Convert filter values to match API expectations
// //       let statusFilter = '';
// //       if (filterBlocked === 'active') {
// //         statusFilter = 'false'; // API expects 'false' for active
// //       } else if (filterBlocked === 'blocked') {
// //         statusFilter = 'true'; // API expects 'true' for blocked
// //       } else {
// //         statusFilter = ''; // All
// //       }
      
// //       const response = await adminSubscriberService.getAllSubscribers(
// //         page + 1,
// //         rowsPerPage,
// //         statusFilter,
// //         search
// //       );
// //       setSubscribers(response.data || []);
// //       setTotalRows(response.pagination?.total || 0);
// //       setStats(response.stats || { total: 0, blocked: 0, active: 0, verified: 0 });
// //     } catch (error) {
// //       showSnackbar('Failed to fetch subscribers', 'error');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
//     // Inside AdminSubscribers.jsx, replace the fetchSubscribers function

// const fetchSubscribers = async () => {
//   try {
//     setLoading(true);
    
//     // Convert filter values to match what the service expects
//     // Service expects: 'blocked' for blocked users, 'active' for active users, '' for all
//     let statusFilter = filterBlocked; // This is already 'active', 'blocked', or ''
    
//     const response = await adminSubscriberService.getAllSubscribers(
//       page + 1,
//       rowsPerPage,
//       statusFilter,  // Pass 'active', 'blocked', or '' directly
//       search
//     );
    
//     setSubscribers(response.data || []);
//     setTotalRows(response.pagination?.total || 0);
//     setStats(response.stats || { total: 0, blocked: 0, active: 0, verified: 0 });
//   } catch (error) {
//     console.error('Fetch error:', error);
//     showSnackbar('Failed to fetch subscribers', 'error');
//   } finally {
//     setLoading(false);
//   }
// };
//   useEffect(() => {
//     fetchSubscribers();
//   }, [page, rowsPerPage, search, filterBlocked]);

//   // Handle block subscriber
//   const handleBlock = async () => {
//     if (!blockReason.trim()) {
//       showSnackbar('Blocking reason is required', 'error');
//       return;
//     }

//     try {
//       setBlocking(true);
//       await adminSubscriberService.blockSubscriber(blockDialog._id, blockReason);
//       showSnackbar(`Subscriber ${blockDialog.phoneNumber} blocked successfully`, 'success');
//       setBlockDialog(null);
//       setBlockReason('');
//       fetchSubscribers();
//     } catch (error) {
//       showSnackbar(error.response?.data?.message || 'Failed to block subscriber', 'error');
//     } finally {
//       setBlocking(false);
//     }
//   };

//   // Handle unblock subscriber
//   const handleUnblock = async () => {
//     try {
//       setUnblocking(true);
//       await adminSubscriberService.unblockSubscriber(unblockDialog._id);
//       showSnackbar(`Subscriber ${unblockDialog.phoneNumber} unblocked successfully`, 'success');
//       setUnblockDialog(null);
//       fetchSubscribers();
//     } catch (error) {
//       showSnackbar(error.response?.data?.message || 'Failed to unblock subscriber', 'error');
//     } finally {
//       setUnblocking(false);
//     }
//   };

//   const showSnackbar = (message, severity = 'success') => {
//     setSnackbar({ open: true, message, severity });
//   };

//   // Table columns
//   const columns = [
//     { 
//       field: 'srNo', 
//       headerName: 'Sr No', 
//       width: 70,
//       align: 'center' 
//     },
//     { 
//       field: 'phoneNumber', 
//       headerName: 'Phone Number', 
//       width: 150,
//       render: (value) => (
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           <PhoneIcon sx={{ fontSize: 16, color: '#4a5568' }} />
//           <Typography sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
//             {value}
//           </Typography>
//         </Box>
//       )
//     },
//     { 
//       field: 'deviceId', 
//       headerName: 'Device ID', 
//       width: 120,
//       render: (value) => (
//         <Tooltip title={value}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <DeviceIcon sx={{ fontSize: 16, color: '#64748b' }} />
//             <Typography sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
//               {value?.substring(0, 8)}...
//             </Typography>
//           </Box>
//         </Tooltip>
//       )
//     },
//     { 
//       field: 'smsVerification', 
//       headerName: 'SMS Verification', 
//       width: 140,
//       render: (value) => (
//         <Chip
//           icon={value === '✅ Verified' ? <VerifiedIcon /> : <UnverifiedIcon />}
//           label={value}
//           size="small"
//           color={SMS_STATUS_COLORS[value] || 'default'}
//           sx={{ fontWeight: 500 }}
//         />
//       )
//     },
//     { 
//       field: 'onboardedOn', 
//       headerName: 'Onboarded On', 
//       width: 120,
//       render: (value) => (
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           <CalendarIcon sx={{ fontSize: 16, color: '#64748b' }} />
//           <Typography variant="body2">{value}</Typography>
//         </Box>
//       )
//     },
//     { 
//       field: 'status', 
//       headerName: 'Status', 
//       width: 120,
//       render: (value) => {
//         const isBlocked = value.includes('Blocked');
//         return (
//           <Chip
//             icon={isBlocked ? <BlockIcon /> : <UnblockIcon />}
//             label={value}
//             size="small"
//             color={isBlocked ? 'error' : 'success'}
//             sx={{ fontWeight: 600 }}
//           />
//         );
//       }
//     },
//     { 
//       field: 'blockReason', 
//       headerName: 'Block Reason', 
//       width: 200,
//       render: (value, row) => {
//         if (!row.isBlocked || !value) return '—';
//         return (
//           <Tooltip title={`Blocked by: ${row.blockedBy?.email || 'Admin'}`}>
//             <Typography 
//               variant="body2" 
//               sx={{ 
//                 color: '#ef4444', 
//                 backgroundColor: '#fee2e2', 
//                 px: 1, 
//                 py: 0.5, 
//                 borderRadius: 1,
//                 fontSize: '0.75rem',
//                 display: 'inline-block'
//               }}
//             >
//               {value.length > 30 ? `${value.substring(0, 30)}...` : value}
//             </Typography>
//           </Tooltip>
//         );
//       }
//     },
//     { 
//       field: 'actions', 
//       headerName: 'Actions', 
//       width: 200,
//       align: 'center',
//       render: (_, row) => (
//         <Stack direction="row" spacing={1} justifyContent="center">
//           {row.isBlocked ? (
//             <Button
//               size="small"
//               variant="contained"
//               onClick={() => setUnblockDialog(row)}
//               startIcon={<UnblockIcon />}
//               sx={{
//                 backgroundColor: '#10b981',
//                 color: 'white',
//                 textTransform: 'none',
//                 fontWeight: 500,
//                 fontSize: '0.75rem',
//                 py: 0.5,
//                 px: 1.5,
//                 minWidth: '80px',
//                 boxShadow: 'none',
//                 '&:hover': { 
//                   backgroundColor: '#059669',
//                   boxShadow: 'none'
//                 }
//               }}
//             >
//               Unblock
//             </Button>
//           ) : (
//             <Button
//               size="small"
//               variant="contained"
//               onClick={() => setBlockDialog(row)}
//               startIcon={<BlockIcon />}
//               sx={{
//                 backgroundColor: '#ef4444',
//                 color: 'white',
//                 textTransform: 'none',
//                 fontWeight: 500,
//                 fontSize: '0.75rem',
//                 py: 0.5,
//                 px: 1.5,
//                 minWidth: '80px',
//                 boxShadow: 'none',
//                 '&:hover': { 
//                   backgroundColor: '#dc2626',
//                   boxShadow: 'none'
//                 }
//               }}
//             >
//               Block
//             </Button>
//           )}
//         </Stack>
//       )
//     }
//   ];

//   // Stats cards data
//   const statsCards = [
//     { 
//       label: 'Total Subscribers', 
//       value: stats.total, 
//       color: '#3182ce', 
//       bgColor: '#e6f0ff',
//       icon: <PhoneIcon />
//     },
//     { 
//       label: 'Active', 
//       value: stats.active, 
//       color: '#10b981', 
//       bgColor: '#ecfdf5',
//       icon: <UnblockIcon />
//     },
//     { 
//       label: 'Blocked', 
//       value: stats.blocked, 
//       color: '#ef4444', 
//       bgColor: '#fee2e2',
//       icon: <BlockIcon />
//     },
//     { 
//       label: 'Verified', 
//       value: stats.verified, 
//       color: '#8b5cf6', 
//       bgColor: '#f3e8ff',
//       icon: <VerifiedIcon />
//     }
//   ];

//   if (loading && page === 0) return <LoadingSpinner />;

//   return (
//     <Box
//       sx={{
//         minHeight: '100%',
//         background: 'linear-gradient(135deg, #f8fbff 0%, #eef5ff 45%, #e6f0ff 100%)',
//         p: 3,
//       }}
//     >
//       {/* Header */}
//       <Box sx={{ mb: 3 }}>
//         <Typography
//           variant="h5"
//           sx={{
//             fontWeight: 700,
//             background: 'linear-gradient(90deg, #1a365d, #3182ce)',
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//             mb: 1
//           }}
//         >
//           Subscribers Management
//         </Typography>
//         <Typography variant="body2" sx={{ color: '#64748b' }}>
//           Manage authenticator app users, block/unblock devices, and view verification status
//         </Typography>
//       </Box>

//       {/* Stats Cards */}
//       <Grid container spacing={2} sx={{ mb: 3 }}>
//         {statsCards.map((stat) => (
//           <Grid item xs={12} sm={6} md={3} key={stat.label}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 2,
//                 borderRadius: 2,
//                 border: '1px solid rgba(49,130,206,0.1)',
//                 background: 'linear-gradient(135deg, #ffffff, #f9fcff)',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'space-between'
//               }}
//             >
//               <Box>
//                 <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
//                   {stat.value}
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
//                   {stat.label}
//                 </Typography>
//               </Box>
//               <Avatar
//                 sx={{
//                   bgcolor: stat.bgColor,
//                   color: stat.color,
//                   width: 48,
//                   height: 48
//                 }}
//               >
//                 {stat.icon}
//               </Avatar>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Main Table Card */}
//       <Paper
//         elevation={0}
//         sx={{
//           borderRadius: 3,
//           border: '1px solid rgba(49,130,206,0.2)',
//           background: 'linear-gradient(180deg, #ffffff, #f9fbff)',
//           boxShadow: '0 10px 25px rgba(49,130,206,0.08)',
//           p: 3,
//         }}
//       >
//         {/* Filters */}
//         {/* Filters */}
// {/* Filters */}
// <Grid container spacing={2} sx={{ mb: 2 }}>
//   <Grid item xs={12} md={6}>
//     <TextField
//       fullWidth
//       placeholder="Search by phone number or device ID..."
//       value={localSearchInput}
//       onChange={handleSearchInputChange}
//       InputProps={{
//         startAdornment: <SearchIcon sx={{ mr: 1, color: '#64748b' }} />,
//         sx: {
//           backgroundColor: '#ffffff',
//           '&:hover': {
//             backgroundColor: '#ffffff',
//           }
//         }
//       }}
//       size="small"
//     />
//   </Grid>
//   <Grid item xs={12} md={6}>
//     <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
//       <FormControl size="small" sx={{ minWidth: 150 }}>
//         <InputLabel>Filter by Status</InputLabel>
//         <Select
//           value={filterBlocked}
//           label="Filter by Status"
//           onChange={(e) => {
//             setFilterBlocked(e.target.value);
//             setPage(0);
//           }}
//         >
//           <MenuItem value="">All</MenuItem>
//           <MenuItem value="active">Active Only</MenuItem>
//           <MenuItem value="blocked">Blocked Only</MenuItem>
//         </Select>
//       </FormControl>
//     </Box>
//   </Grid>
// </Grid>

//         {/* Data Table */}
//         <DataTable
//           columns={columns}
//           data={subscribers}
//           page={page}
//           rowsPerPage={rowsPerPage}
//           totalRows={totalRows}
//           onPageChange={setPage}
//           onRowsPerPageChange={setRowsPerPage}
//           loading={loading}
//         />
//       </Paper>

//       {/* BLOCK DIALOG - With reason prompt */}
//       <Dialog 
//         open={!!blockDialog} 
//         onClose={() => {
//           setBlockDialog(null);
//           setBlockReason('');
//         }}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle sx={{ 
//           background: 'linear-gradient(135deg, #ef4444, #dc2626)',
//           color: 'white',
//           fontWeight: 600
//         }}>
//           Block Subscriber
//         </DialogTitle>
//         <DialogContent sx={{ pt: 3, mt: 2 }}>
//           <Typography variant="body2" sx={{ mb: 2 }}>
//             Are you sure you want to block this subscriber?
//           </Typography>
          
//           <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: '#f9fafb' }}>
//             <Typography variant="body2">
//               <strong>Phone:</strong> {blockDialog?.phoneNumber}
//             </Typography>
//             <Typography variant="body2">
//               <strong>Device ID:</strong> {blockDialog?.deviceId}
//             </Typography>
//           </Paper>

//           <TextField
//             autoFocus
//             fullWidth
//             label="Blocking Reason"
//             placeholder="Enter reason for blocking (e.g., Stolen device, Suspicious activity)"
//             value={blockReason}
//             onChange={(e) => setBlockReason(e.target.value)}
//             multiline
//             rows={3}
//             required
//             error={blockReason.trim() === ''}
//             helperText={blockReason.trim() === '' ? 'Reason is required' : ''}
//           />
//         </DialogContent>
//         <DialogActions sx={{ px: 3, pb: 3 }}>
//           <Button 
//             onClick={() => {
//               setBlockDialog(null);
//               setBlockReason('');
//             }}
//             variant="outlined"
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleBlock}
//             variant="contained"
//             color="error"
//             disabled={!blockReason.trim() || blocking}
//             sx={{
//               background: 'linear-gradient(135deg, #ef4444, #dc2626)',
//               '&:hover': {
//                 background: 'linear-gradient(135deg, #dc2626, #b91c1c)'
//               }
//             }}
//           >
//             {blocking ? 'Blocking...' : 'Block Subscriber'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* UNBLOCK DIALOG - Simple confirmation */}
//       <Dialog 
//         open={!!unblockDialog} 
//         onClose={() => setUnblockDialog(null)}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle sx={{ 
//           background: 'linear-gradient(135deg, #10b981, #059669)',
//           color: 'white',
//           fontWeight: 600
//         }}>
//           Unblock Subscriber
//         </DialogTitle>
//         <DialogContent sx={{ pt: 3 }}>
//           <Typography variant="body1" sx={{ mb: 2 }}>
//             Are you sure you want to unblock this subscriber?
//           </Typography>
          
//           <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f9fafb' }}>
//             <Typography variant="body2">
//               <strong>Phone:</strong> {unblockDialog?.phoneNumber}
//             </Typography>
//             <Typography variant="body2">
//               <strong>Device ID:</strong> {unblockDialog?.deviceId}
//             </Typography>
//             {unblockDialog?.blockReason && (
//               <Typography variant="body2" sx={{ mt: 1, color: '#ef4444' }}>
//                 <strong>Block Reason:</strong> {unblockDialog.blockReason}
//               </Typography>
//             )}
//           </Paper>
//         </DialogContent>
//         <DialogActions sx={{ px: 3, pb: 3 }}>
//           <Button onClick={() => setUnblockDialog(null)} variant="outlined">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleUnblock}
//             variant="contained"
//             color="success"
//             disabled={unblocking}
//             sx={{
//               background: 'linear-gradient(135deg, #10b981, #059669)',
//               '&:hover': {
//                 background: 'linear-gradient(135deg, #059669, #047857)'
//               }
//             }}
//           >
//             {unblocking ? 'Unblocking...' : 'Unblock Subscriber'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar for notifications */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={4000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Alert 
//           severity={snackbar.severity} 
//           variant="filled"
//           sx={{ width: '100%' }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default AdminSubscribers;


import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  Avatar,
  Stack,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
  Snackbar,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
  Block as BlockIcon,
  CheckCircle as UnblockIcon,
  Phone as PhoneIcon,
  DeviceUnknown as DeviceIcon,
  Verified as VerifiedIcon,
  Unpublished as UnverifiedIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Clear as ClearIcon,
  
} from '@mui/icons-material';
import { format } from 'date-fns';
import DataTable from '../components/common/DataTable';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { adminSubscriberService } from '../services/adminSubscriber';
import { useAuth } from '../context/AuthContext';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
// Status chip colors
const STATUS_COLORS = {
  '🔴 Blocked': 'error',
  '🟢 Active': 'success'
};

const SMS_STATUS_COLORS = {
  '✅ Verified': 'success',
  '❌ Not Verified': 'warning'
};

const AdminSubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // Actual search term used for API
  const [searchInput, setSearchInput] = useState(''); // Local input state
  const [filterBlocked, setFilterBlocked] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [stats, setStats] = useState({ total: 0, blocked: 0, active: 0, verified: 0 });

  // Block dialog state
  const [blockDialog, setBlockDialog] = useState(null);
  const [blockReason, setBlockReason] = useState('');
  const [blocking, setBlocking] = useState(false);

  // Unblock dialog state
  const [unblockDialog, setUnblockDialog] = useState(null);
  const [unblocking, setUnblocking] = useState(false);

  // Snackbar for notifications
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  const searchInputRef = useRef(null);

  const [unblockReason, setUnblockReason] = useState('');

  const { isAdmin, isBusiness, user } = useAuth();

  const [businessIdFilter, setBusinessIdFilter] = useState('');
  const [businessIdInput, setBusinessIdInput] = useState('');

const handleBusinessIdSearch = () => {
  setBusinessIdFilter(businessIdInput.trim());
  setPage(0);
};

const handleClearBusinessId = () => {
  setBusinessIdInput('');
  setBusinessIdFilter('');
  setPage(0);
};

  // Handle search button click
  const handleSearchClick = () => {
    setSearchTerm(searchInput);
    setPage(0); // Reset to first page on new search
  };

  // Handle enter key press in search field
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchInput('');
    setSearchTerm('');
    setPage(0);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Fetch subscribers
  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      
      const response = await adminSubscriberService.getAllSubscribers(
        page + 1,
        rowsPerPage,
        filterBlocked,
        searchTerm,
        businessIdFilter  // Use searchTerm instead of search
      );
      
      setSubscribers(response.data || []);
      setTotalRows(response.pagination?.total || 0);
      setStats(response.stats || { total: 0, blocked: 0, active: 0, verified: 0 });
    } catch (error) {
      console.error('Fetch error:', error);
      showSnackbar('Failed to fetch subscribers', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, [page, rowsPerPage, searchTerm, filterBlocked,businessIdFilter]); // Depend on searchTerm instead of search

  // Handle block subscriber
  const handleBlock = async () => {
    if (!blockReason.trim()) {
      showSnackbar('Blocking reason is required', 'error');
      return;
    }

    try {
      setBlocking(true);
      await adminSubscriberService.blockSubscriber(blockDialog._id, blockReason);
      showSnackbar(`Subscriber ${blockDialog.phoneNumber} blocked successfully`, 'success');
      setBlockDialog(null);
      setBlockReason('');
      fetchSubscribers();
    } catch (error) {
      showSnackbar(error.response?.data?.message || 'Failed to block subscriber', 'error');
    } finally {
      setBlocking(false);
    }
  };

  // Handle unblock subscriber
  const handleUnblock = async () => {
      if (!unblockReason.trim()) {
    showSnackbar('Unblocking reason is required', 'error');
    return;
    }
    try {
      setUnblocking(true);
      // await adminSubscriberService.unblockSubscriber(unblockDialog._id);
       await adminSubscriberService.unblockSubscriber(unblockDialog._id, unblockReason);
      showSnackbar(`Subscriber ${unblockDialog.phoneNumber} unblocked successfully`, 'success');
      setUnblockDialog(null);
      fetchSubscribers();
    } catch (error) {
      showSnackbar(error.response?.data?.message || 'Failed to unblock subscriber', 'error');
    } finally {
      setUnblocking(false);
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

const columns = isAdmin
  ? [
      { field: 'srNo', headerName: 'Sr No', width: 70, align: 'center' },
      { 
        field: 'phoneNumber', headerName: 'Phone Number', width: 150,
        render: (value) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PhoneIcon sx={{ fontSize: 16, color: '#4a5568' }} />
            <Typography sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
              {value}
            </Typography>
          </Box>
        )
      },
      { 
        field: 'deviceId', headerName: 'Device ID', width: 120,
        render: (value) => (
          <Tooltip title={value}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DeviceIcon sx={{ fontSize: 16, color: '#64748b' }} />
              <Typography sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                {value?.substring(0, 8)}...
              </Typography>
            </Box>
          </Tooltip>
        )
      },
      { 
        field: 'smsVerification', headerName: 'SMS Verification', width: 140,
        render: (value) => (
          <Chip
            icon={value === '✅ Verified' ? <VerifiedIcon /> : <UnverifiedIcon />}
            label={value}
            size="small"
            color={SMS_STATUS_COLORS[value] || 'default'}
            sx={{ fontWeight: 500 }}
          />
        )
      },
      { 
        field: 'onboardedOn', headerName: 'Onboarded On', width: 120,
        render: (value) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarIcon sx={{ fontSize: 16, color: '#64748b' }} />
            <Typography variant="body2">{value}</Typography>
          </Box>
        )
      },
      { 
        field: 'status', headerName: 'Status', width: 120,
        render: (value) => {
          const isBlocked = (value ?? '').includes('Blocked');
          return (
            <Chip
              icon={isBlocked ? <BlockIcon /> : <UnblockIcon />}
              label={value}
              size="small"
              color={isBlocked ? 'error' : 'success'}
              sx={{ fontWeight: 600 }}
            />
          );
        }
      },
      { 
        field: 'blockReason', headerName: 'Block Reason', width: 200,
        render: (value, row) => {
          if (!row.isBlocked || !value) return '—';
          return (
            <Tooltip title={`Blocked by: ${row.blockedBy?.email || 'Admin'}`}>
              <Typography variant="body2" sx={{ color: '#ef4444', backgroundColor: '#fee2e2', px: 1, py: 0.5, borderRadius: 1, fontSize: '0.75rem', display: 'inline-block' }}>
                {value.length > 30 ? `${value.substring(0, 30)}...` : value}
              </Typography>
            </Tooltip>
          );
        }
      },
      { 
        field: 'actions', headerName: 'Actions', width: 200, align: 'center',
        render: (_, row) => (
          <Stack direction="row" spacing={1} justifyContent="center">
            {row.isBlocked ? (
              <Button size="small" variant="contained" onClick={() => setUnblockDialog(row)} startIcon={<UnblockIcon />} sx={{ backgroundColor: '#10b981', color: 'white', textTransform: 'none', fontWeight: 500, fontSize: '0.75rem', py: 0.5, px: 1.5, minWidth: '80px', boxShadow: 'none', '&:hover': { backgroundColor: '#059669' } }}>
                Unblock
              </Button>
            ) : (
              <Button size="small" variant="contained" onClick={() => setBlockDialog(row)} startIcon={<BlockIcon />} sx={{ backgroundColor: '#ef4444', color: 'white', textTransform: 'none', fontWeight: 500, fontSize: '0.75rem', py: 0.5, px: 1.5, minWidth: '80px', boxShadow: 'none', '&:hover': { backgroundColor: '#dc2626' } }}>
                Block
              </Button>
            )}
          </Stack>
        )
      }
    ]
  : isBusiness
    ? [
        { field: 'srNo', headerName: 'Sr No', width: 70, align: 'center' },
        { field: 'phoneNumber', headerName: 'Phone Number', width: 150,
          render: (value) => (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneIcon sx={{ fontSize: 16, color: '#4a5568' }} />
              <Typography sx={{ fontFamily: 'monospace', fontWeight: 500 }}>{value}</Typography>
            </Box>
          )
        },
        { field: 'deviceId', headerName: 'Device ID', width: 120,
          render: (value) => (
            <Tooltip title={value}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DeviceIcon sx={{ fontSize: 16, color: '#64748b' }} />
                <Typography sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                  {value?.substring(0, 8)}...
                </Typography>
              </Box>
            </Tooltip>
          )
        },
        { field: 'smsVerification', headerName: 'SMS Verification', width: 140,
          render: (value) => (
            <Chip icon={value === '✅ Verified' ? <VerifiedIcon /> : <UnverifiedIcon />} label={value} size="small" color={SMS_STATUS_COLORS[value] || 'default'} sx={{ fontWeight: 500 }} />
          )
        },
        { field: 'onboardedOn', headerName: 'Onboarded On', width: 120,
          render: (value) => (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarIcon sx={{ fontSize: 16, color: '#64748b' }} />
              <Typography variant="body2">{value}</Typography>
            </Box>
          )
        },
        { field: 'businessStatus', headerName: 'Business Status', width: 140,
          render: (value) => {
            const isBlocked = (value ?? '').includes('Blocked');
            return (
              <Chip icon={isBlocked ? <BlockIcon /> : <UnblockIcon />} label={value} size="small" color={isBlocked ? 'error' : 'success'} sx={{ fontWeight: 600 }} />
            );
          }
        },
        { field: 'globalStatus', headerName: 'Global Status', width: 140,
          render: (value) => {
            const isBlocked = (value ?? '').includes('Blocked');
            return (
              <Chip icon={isBlocked ? <BlockIcon /> : <UnblockIcon />} label={value} size="small" color={isBlocked ? 'error' : 'success'} sx={{ fontWeight: 600 }} />
            );
          }
        },
        { field: 'blockReason', headerName: 'Block Reason', width: 200,
          render: (value, row) => {
            if (!row.isBlockedForBusiness || !value) return '—';
            return (
              <Tooltip title={`Blocked for your business`}>
                <Typography variant="body2" sx={{ color: '#ef4444', backgroundColor: '#fee2e2', px: 1, py: 0.5, borderRadius: 1, fontSize: '0.75rem', display: 'inline-block' }}>
                  {value.length > 30 ? `${value.substring(0, 30)}...` : value}
                </Typography>
              </Tooltip>
            );
          }
        },
        { field: 'actions', headerName: 'Actions', width: 200, align: 'center',
          render: (_, row) => (
            <Stack direction="row" spacing={1} justifyContent="center">
              {row.isBlockedForBusiness ? (
                <Button size="small" variant="contained" onClick={() => setUnblockDialog(row)} startIcon={<UnblockIcon />} sx={{ backgroundColor: '#10b981', color: 'white', textTransform: 'none', fontWeight: 500, fontSize: '0.75rem', py: 0.5, px: 1.5, minWidth: '80px', boxShadow: 'none', '&:hover': { backgroundColor: '#059669' } }}>
                  Unblock
                </Button>
              ) : (
                <Button size="small" variant="contained" onClick={() => setBlockDialog(row)} startIcon={<BlockIcon />} sx={{ backgroundColor: '#ef4444', color: 'white', textTransform: 'none', fontWeight: 500, fontSize: '0.75rem', py: 0.5, px: 1.5, minWidth: '80px', boxShadow: 'none', '&:hover': { backgroundColor: '#dc2626' } }}>
                  Block
                </Button>
              )}
            </Stack>
          )
        }
      ]
    : [];


  // // Stats cards data
  // const statsCards = [
  //   { 
  //     label: 'Total Subscribers', 
  //     value: stats.total, 
  //     color: '#3182ce', 
  //     bgColor: '#e6f0ff',
  //     icon: <PhoneIcon />
  //   },
  //   { 
  //     label: 'Active', 
  //     value: stats.active, 
  //     color: '#10b981', 
  //     bgColor: '#ecfdf5',
  //     icon: <UnblockIcon />
  //   },
  //   { 
  //     label: 'Blocked', 
  //     value: stats.blocked, 
  //     color: '#ef4444', 
  //     bgColor: '#fee2e2',
  //     icon: <BlockIcon />
  //   },
  //   { 
  //     label: 'Verified', 
  //     value: stats.verified, 
  //     color: '#8b5cf6', 
  //     bgColor: '#f3e8ff',
  //     icon: <VerifiedIcon />
  //   }
  // ];

  // Stats cards data - role based
const statsCards = isAdmin 
  ? [
      { label: 'Total Subscribers', value: stats.total, color: '#3182ce', bgColor: '#e6f0ff', icon: <PhoneIcon /> },
      { label: 'Active', value: stats.active, color: '#10b981', bgColor: '#ecfdf5', icon: <UnblockIcon /> },
      { label: 'Blocked', value: stats.blocked, color: '#ef4444', bgColor: '#fee2e2', icon: <BlockIcon /> },
      { label: 'Verified', value: stats.verified, color: '#8b5cf6', bgColor: '#f3e8ff', icon: <VerifiedIcon /> }
    ]
  : isBusiness
    ? [
        { label: 'Total Linked', value: stats.totalLinked, color: '#3182ce', bgColor: '#e6f0ff', icon: <PhoneIcon /> },
        { label: 'Active for Business', value: stats.activeForBusiness, color: '#10b981', bgColor: '#ecfdf5', icon: <UnblockIcon /> },
        { label: 'Blocked for Business', value: stats.blockedForBusiness, color: '#ef4444', bgColor: '#fee2e2', icon: <BlockIcon /> }
      ]
    : [];

  if (loading && page === 0 && subscribers.length === 0) return <LoadingSpinner />;

  return (
    <Box
      sx={{
        minHeight: '100%',
        background: 'linear-gradient(135deg, #f8fbff 0%, #eef5ff 45%, #e6f0ff 100%)',
        p: 3,
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        {/* <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(90deg, #1a365d, #3182ce)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1
          }}
        >
          Subscribers Management
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b' }}>
          Manage authenticator app users, block/unblock devices, and view verification status
        </Typography> */}
        <Typography variant="h5" sx={{ fontWeight: 700, background: 'linear-gradient(90deg, #1a365d, #3182ce)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: 1 }}>
          {isAdmin ? 'Subscribers Management' : 'My Business Subscribers'}
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b' }}>
          {isAdmin 
            ? 'Manage authenticator app users, block/unblock devices, and view verification status'
            : 'View and manage subscribers linked to your business'}
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {statsCards.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                border: '1px solid rgba(49,130,206,0.1)',
                background: 'linear-gradient(135deg, #ffffff, #f9fcff)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
                  {stat.label}
                </Typography>
              </Box>
              <Avatar
                sx={{
                  bgcolor: stat.bgColor,
                  color: stat.color,
                  width: 48,
                  height: 48
                }}
              >
                {stat.icon}
              </Avatar>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Main Table Card */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: '1px solid rgba(49,130,206,0.2)',
          background: 'linear-gradient(180deg, #ffffff, #f9fbff)',
          boxShadow: '0 10px 25px rgba(49,130,206,0.08)',
          p: 3,
        }}
      >
        {/* Filters with Search Button */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={7}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                placeholder="Search by phone number or device ID..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
                inputRef={searchInputRef}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#64748b' }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchInput && (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={handleClearSearch}
                        edge="end"
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    backgroundColor: '#ffffff',
                    '&:hover': {
                      backgroundColor: '#ffffff',
                    },
                    pr: 0.5
                  }
                }}
                size="small"
              />
              <Button
                variant="contained"
                onClick={handleSearchClick}
                startIcon={<SearchIcon />}
                sx={{
                  background: 'linear-gradient(135deg, #3182ce, #2c5282)',
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 600,
                  minWidth: '100px',
                  boxShadow: 'none',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #2c5282, #1a365d)',
                    boxShadow: 'none'
                  }
                }}
              >
                Search
              </Button>
            </Box>
          </Grid>
         <Grid item xs={12} md={5}>
  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
    
    {/* ✅ Business ID Filter — compact, admin only */}
    {isAdmin && (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          placeholder="Filter by Business ID..."
          value={businessIdInput}
          onChange={(e) => setBusinessIdInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleBusinessIdSearch()}
          size="small"
          sx={{ width: 220 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BusinessCenterIcon sx={{ color: '#64748b', fontSize: 16 }} />
              </InputAdornment>
            ),
            endAdornment: businessIdInput && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={handleClearBusinessId} edge="end">
                  <ClearIcon sx={{ fontSize: 14 }} />
                </IconButton>
              </InputAdornment>
            ),
            sx: { backgroundColor: '#ffffff', pr: 0.5, fontSize: '0.85rem' }
          }}
        />
        <Button
          variant="outlined"
          onClick={handleBusinessIdSearch}
          size="small"
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            borderColor: '#3182ce',
            color: '#3182ce',
            '&:hover': { borderColor: '#2c5282', color: '#2c5282' }
          }}
        >
          Apply
        </Button>
      </Box>
    )}

    <FormControl size="small" sx={{ minWidth: 150 }}>
      <InputLabel>Filter by Status</InputLabel>
      <Select
        value={filterBlocked}
        label="Filter by Status"
        onChange={(e) => { setFilterBlocked(e.target.value); setPage(0); }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="active">Active Only</MenuItem>
        <MenuItem value="blocked">Blocked Only</MenuItem>
      </Select>
    </FormControl>

  </Box>

  {/* Active business filter chip */}
  {businessIdFilter && (
    <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
      <Chip
        label={`Business: ${businessIdFilter}`}
        size="small"
        onDelete={handleClearBusinessId}
        deleteIcon={<ClearIcon />}
        sx={{ backgroundColor: '#fef3c7', color: '#92400e', fontWeight: 500 }}
      />
    </Box>
  )}
</Grid>
</Grid>

          
       
        {/* Active search indicator */}
        {searchTerm && (
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              label={`Search: "${searchTerm}"`}
              size="small"
              onDelete={handleClearSearch}
              deleteIcon={<ClearIcon />}
              sx={{
                backgroundColor: '#e6f0ff',
                color: '#3182ce',
                fontWeight: 500
              }}
            />
          </Box>
        )}

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={subscribers}
          page={page}
          rowsPerPage={rowsPerPage}
          totalRows={totalRows}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
          loading={loading}
        />
      </Paper>

      {/* BLOCK DIALOG - With reason prompt */}
      <Dialog 
        open={!!blockDialog} 
        onClose={() => {
          setBlockDialog(null);
          setBlockReason('');
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
          color: 'white',
          fontWeight: 600
        }}>
          Block Subscriber
        </DialogTitle>
        <DialogContent sx={{ pt: 3, mt: 2 }}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Are you sure you want to block this subscriber?
          </Typography>
          
          <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: '#f9fafb' }}>
            <Typography variant="body2">
              <strong>Phone:</strong> {blockDialog?.phoneNumber}
            </Typography>
            <Typography variant="body2">
              <strong>Device ID:</strong> {blockDialog?.deviceId}
            </Typography>
          </Paper>

          <TextField
            autoFocus
            fullWidth
            label="Blocking Reason"
            placeholder="Enter reason for blocking (e.g., Stolen device, Suspicious activity)"
            value={blockReason}
            onChange={(e) => setBlockReason(e.target.value)}
            multiline
            rows={3}
            required
            error={blockReason.trim() === ''}
            helperText={blockReason.trim() === '' ? 'Reason is required' : ''}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={() => {
              setBlockDialog(null);
              setBlockReason('');
            }}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={handleBlock}
            variant="contained"
            color="error"
            disabled={!blockReason.trim() || blocking}
            sx={{
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              '&:hover': {
                background: 'linear-gradient(135deg, #dc2626, #b91c1c)'
              }
            }}
          >
            {blocking ? 'Blocking...' : 'Block Subscriber'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* UNBLOCK DIALOG - With reason prompt */}
<Dialog 
  open={!!unblockDialog} 
  onClose={() => {
    setUnblockDialog(null);
    setUnblockReason('');   // Clear reason on close
  }}
  maxWidth="sm"
  fullWidth
>
  <DialogTitle sx={{ 
    background: 'linear-gradient(135deg, #10b981, #059669)',
    color: 'white',
    fontWeight: 600
  }}>
    Unblock Subscriber
  </DialogTitle>
  <DialogContent sx={{ pt: 3, mt: 2 }}>
    <Typography variant="body2" sx={{ mb: 2 }}>
      Are you sure you want to unblock this subscriber?
    </Typography>
    
    <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: '#f9fafb' }}>
      <Typography variant="body2">
        <strong>Phone:</strong> {unblockDialog?.phoneNumber}
      </Typography>
      <Typography variant="body2">
        <strong>Device ID:</strong> {unblockDialog?.deviceId}
      </Typography>
      {unblockDialog?.blockReason && (
        <Typography variant="body2" sx={{ mt: 1, color: '#ef4444' }}>
          <strong>Block Reason:</strong> {unblockDialog.blockReason}
        </Typography>
      )}
    </Paper>

    <TextField
      autoFocus
      fullWidth
      label="Unblocking Reason"
      placeholder="Enter reason for unblocking (e.g., Device recovered, False positive)"
      value={unblockReason}
      onChange={(e) => setUnblockReason(e.target.value)}
      multiline
      rows={3}
      required
      error={unblockReason.trim() === ''}
      helperText={unblockReason.trim() === '' ? 'Reason is required' : ''}
    />
  </DialogContent>
  <DialogActions sx={{ px: 3, pb: 3 }}>
    <Button 
      onClick={() => {
        setUnblockDialog(null);
        setUnblockReason('');
      }}
      variant="outlined"
    >
      Cancel
    </Button>
    <Button
      onClick={handleUnblock}
      variant="contained"
      color="success"
      disabled={!unblockReason.trim() || unblocking}
      sx={{
        background: 'linear-gradient(135deg, #10b981, #059669)',
        '&:hover': {
          background: 'linear-gradient(135deg, #059669, #047857)'
        }
      }}
    >
      {unblocking ? 'Unblocking...' : 'Unblock Subscriber'}
    </Button>
  </DialogActions>
</Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminSubscribers;