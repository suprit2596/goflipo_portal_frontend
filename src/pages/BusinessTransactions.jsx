// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import {
// // // // // //   Box,
// // // // // //   Container,
// // // // // //   Paper,
// // // // // //   Typography,
// // // // // //   Table,
// // // // // //   TableBody,
// // // // // //   TableCell,
// // // // // //   TableContainer,
// // // // // //   TableHead,
// // // // // //   TableRow,
// // // // // //   TablePagination,
// // // // // //   Chip,
// // // // // //   Card,
// // // // // //   CardContent,
// // // // // //   CircularProgress,
// // // // // //   Alert,
// // // // // //   Button,
// // // // // //   Stack,
// // // // // //   ToggleButton,
// // // // // //   ToggleButtonGroup,
// // // // // //   Grid
// // // // // // } from '@mui/material';
// // // // // // import {
// // // // // //   Payment as PaymentIcon,
// // // // // //   Login as LoginIcon,
// // // // // //   Refresh as RefreshIcon,
// // // // // //   AllInclusive as AllIcon,
// // // // // //   AttachMoney,
// // // // // //   Person,
// // // // // //   TrendingUp
// // // // // // } from '@mui/icons-material';
// // // // // // import { businessAuthService } from '../services/businessAuth';
// // // // // // import { formatDate } from '../utils/formatters';

// // // // // // const BusinessTransactions = () => {
// // // // // //   const [transactions, setTransactions] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [error, setError] = useState(null);
// // // // // //   const [eventType, setEventType] = useState('ALL'); // 'ALL', 'PAYMENT', 'LOGIN'
// // // // // //   const [businessId, setBusinessId] = useState('');
// // // // // //   const [pagination, setPagination] = useState({
// // // // // //     page: 0,
// // // // // //     limit: 10,
// // // // // //     total: 0
// // // // // //   });

// // // // // //   // Get businessId from localStorage on component mount
// // // // // //   useEffect(() => {
// // // // // //     const userStr = localStorage.getItem('user');
// // // // // //     if (userStr) {
// // // // // //       try {
// // // // // //         const user = JSON.parse(userStr);
// // // // // //         console.log('👤 User from localStorage:', user);
// // // // // //         // Try different possible fields for businessId
// // // // // //         const bid = user.businessId || user.businessID || user.id;
// // // // // //         if (bid) {
// // // // // //           setBusinessId(bid);
// // // // // //         } else {
// // // // // //           console.error('❌ No businessId found in user object:', user);
// // // // // //           setError('Business ID not found in user profile');
// // // // // //           setLoading(false);
// // // // // //         }
// // // // // //       } catch (error) {
// // // // // //         console.error('❌ Error parsing user:', error);
// // // // // //         setError('Failed to load user data');
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     } else {
// // // // // //       setError('User not found. Please login again.');
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   }, []);

// // // // // //   const fetchTransactions = async () => {
// // // // // //     if (!businessId) {
// // // // // //       console.error('❌ No businessId available');
// // // // // //       setError('Business ID is required');
// // // // // //       return;
// // // // // //     }
    
// // // // // //     setLoading(true);
// // // // // //     setError(null);
    
// // // // // //     try {
// // // // // //       console.log('📊 Fetching transactions with params:', {
// // // // // //         businessId,
// // // // // //         event: eventType === 'ALL' ? undefined : eventType,
// // // // // //         page: pagination.page + 1,
// // // // // //         limit: pagination.limit
// // // // // //       });
      
// // // // // //       const result = await businessAuthService.getBusinessTransactions(
// // // // // //         businessId,
// // // // // //         eventType === 'ALL' ? undefined : eventType,
// // // // // //         pagination.page + 1, 
// // // // // //         pagination.limit
// // // // // //       );
      
// // // // // //       console.log('📊 Transaction fetch result:', result);
      
// // // // // //       if (result.success) {
// // // // // //         setTransactions(result.data || []);
// // // // // //         setPagination(prev => ({
// // // // // //           ...prev,
// // // // // //           total: result.pagination?.total || 0
// // // // // //         }));
// // // // // //       } else {
// // // // // //         setError(result.error || 'Failed to fetch transactions');
// // // // // //       }
// // // // // //     } catch (err) {
// // // // // //       console.error('❌ Fetch error:', err);
// // // // // //       setError(err.message || 'An error occurred while fetching transactions');
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     if (businessId) {
// // // // // //       fetchTransactions();
// // // // // //     }
// // // // // //   }, [businessId, eventType, pagination.page, pagination.limit]);

// // // // // //   const handlePageChange = (event, newPage) => {
// // // // // //     setPagination(prev => ({ ...prev, page: newPage }));
// // // // // //   };

// // // // // //   const handleLimitChange = (event) => {
// // // // // //     setPagination(prev => ({ 
// // // // // //       ...prev, 
// // // // // //       limit: parseInt(event.target.value, 10),
// // // // // //       page: 0
// // // // // //     }));
// // // // // //   };

// // // // // //   const handleEventTypeChange = (event, newEventType) => {
// // // // // //     if (newEventType !== null) {
// // // // // //       setEventType(newEventType);
// // // // // //       setPagination(prev => ({ ...prev, page: 0 })); // Reset to first page
// // // // // //     }
// // // // // //   };

// // // // // //   const handleRefresh = () => {
// // // // // //     fetchTransactions();
// // // // // //   };

// // // // // //   const getEventIcon = (type) => {
// // // // // //     switch (type) {
// // // // // //       case 'PAYMENT': return <PaymentIcon fontSize="small" />;
// // // // // //       case 'LOGIN': return <LoginIcon fontSize="small" />;
// // // // // //       default: return null;
// // // // // //     }
// // // // // //   };

// // // // // //   const getStatusColor = (status) => {
// // // // // //     switch (status) {
// // // // // //       case 'SUCCESS':
// // // // // //       case 'APPROVED':
// // // // // //         return 'success';
// // // // // //       case 'FAILED':
// // // // // //       case 'REJECTED':
// // // // // //         return 'error';
// // // // // //       case 'PENDING':
// // // // // //         return 'warning';
// // // // // //       default:
// // // // // //         return 'default';
// // // // // //     }
// // // // // //   };

// // // // // //   const formatAmount = (amount, currency) => {
// // // // // //     if (!amount && amount !== 0) return '-';
// // // // // //     try {
// // // // // //       return new Intl.NumberFormat('en-US', {
// // // // // //         style: 'currency',
// // // // // //         currency: currency || 'USD'
// // // // // //       }).format(amount);
// // // // // //     } catch (error) {
// // // // // //       return `$${amount.toFixed(2)}`;
// // // // // //     }
// // // // // //   };

// // // // // //   // Calculate statistics
// // // // // //   const paymentTransactions = transactions.filter(t => t.eventType === 'PAYMENT');
// // // // // //   const loginTransactions = transactions.filter(t => t.eventType === 'LOGIN');
  
// // // // // //   const successfulPayments = paymentTransactions.filter(t => t.status === 'SUCCESS');
// // // // // //   const totalPaymentAmount = successfulPayments.reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
// // // // // //   const averagePayment = successfulPayments.length > 0 ? totalPaymentAmount / successfulPayments.length : 0;

// // // // // //   return (
// // // // // //     <Container maxWidth="xl" sx={{ py: 4 }}>
// // // // // //       {/* Header */}
// // // // // //       <Box sx={{ mb: 4 }}>
// // // // // //         <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
// // // // // //           Transaction History
// // // // // //         </Typography>
// // // // // //         <Typography variant="body1" color="text.secondary" gutterBottom>
// // // // // //           Monitor all payment and authentication activities for your business
// // // // // //         </Typography>
// // // // // //       </Box>

// // // // // //       {/* Filters Section */}
// // // // // //       <Card sx={{ mb: 4 }}>
// // // // // //         <CardContent>
// // // // // //           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
// // // // // //             <Box>
// // // // // //               <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
// // // // // //                 Filter by Event Type
// // // // // //               </Typography>
// // // // // //               <ToggleButtonGroup
// // // // // //                 value={eventType}
// // // // // //                 exclusive
// // // // // //                 onChange={handleEventTypeChange}
// // // // // //                 aria-label="event type"
// // // // // //                 size="medium"
// // // // // //                 color="primary"
// // // // // //               >
// // // // // //                 <ToggleButton value="ALL">
// // // // // //                   <AllIcon sx={{ mr: 1 }} />
// // // // // //                   All Events
// // // // // //                 </ToggleButton>
// // // // // //                 <ToggleButton value="PAYMENT">
// // // // // //                   <PaymentIcon sx={{ mr: 1 }} />
// // // // // //                   Payments
// // // // // //                 </ToggleButton>
// // // // // //                 <ToggleButton value="LOGIN">
// // // // // //                   <LoginIcon sx={{ mr: 1 }} />
// // // // // //                   Logins
// // // // // //                 </ToggleButton>
// // // // // //               </ToggleButtonGroup>
// // // // // //             </Box>
            
// // // // // //             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
// // // // // //               <Typography variant="body2" color="text.secondary">
// // // // // //                 Page {pagination.page + 1} of {Math.ceil(pagination.total / pagination.limit) || 1}
// // // // // //               </Typography>
// // // // // //               <Button
// // // // // //                 variant="contained"
// // // // // //                 startIcon={<RefreshIcon />}
// // // // // //                 onClick={handleRefresh}
// // // // // //                 disabled={loading}
// // // // // //               >
// // // // // //                 Refresh
// // // // // //               </Button>
// // // // // //             </Box>
// // // // // //           </Box>
// // // // // //         </CardContent>
// // // // // //       </Card>

// // // // // //       {/* Error Alert */}
// // // // // //       {error && (
// // // // // //         <Alert 
// // // // // //           severity="error" 
// // // // // //           sx={{ mb: 3 }} 
// // // // // //           onClose={() => setError(null)}
// // // // // //           action={
// // // // // //             <Button color="inherit" size="small" onClick={handleRefresh}>
// // // // // //               Retry
// // // // // //             </Button>
// // // // // //           }
// // // // // //         >
// // // // // //           {error}
// // // // // //         </Alert>
// // // // // //       )}

// // // // // //       {/* Transactions Table */}
// // // // // //       <Card>
// // // // // //         <CardContent sx={{ p: 0 }}>
// // // // // //           {loading && transactions.length === 0 ? (
// // // // // //             <Box sx={{ p: 6, textAlign: 'center' }}>
// // // // // //               <CircularProgress size={60} />
// // // // // //               <Typography variant="h6" sx={{ mt: 3 }} color="text.secondary">
// // // // // //                 Loading transactions...
// // // // // //               </Typography>
// // // // // //             </Box>
// // // // // //           ) : (
// // // // // //             <>
// // // // // //               <TableContainer component={Paper} elevation={0}>
// // // // // //                 <Table sx={{ minWidth: 650 }}>
// // // // // //                   <TableHead sx={{ bgcolor: 'primary.light' }}>
// // // // // //                     <TableRow>
// // // // // //                       <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Event Type</TableCell>
// // // // // //                       <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Transaction ID</TableCell>
// // // // // //                       <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>User ID</TableCell>
// // // // // //                       <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Amount</TableCell>
// // // // // //                       <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
// // // // // //                       <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date & Time</TableCell>
// // // // // //                     </TableRow>
// // // // // //                   </TableHead>
// // // // // //                   <TableBody>
// // // // // //                     {transactions.length === 0 ? (
// // // // // //                       <TableRow>
// // // // // //                         <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
// // // // // //                           <Typography variant="h6" color="text.secondary" gutterBottom>
// // // // // //                             No transactions found
// // // // // //                           </Typography>
// // // // // //                           <Typography variant="body2" color="text.secondary">
// // // // // //                             {eventType !== 'ALL' 
// // // // // //                               ? `No ${eventType.toLowerCase()} transactions for this filter`
// // // // // //                               : 'No transactions recorded yet'}
// // // // // //                           </Typography>
// // // // // //                         </TableCell>
// // // // // //                       </TableRow>
// // // // // //                     ) : (
// // // // // //                       transactions.map((transaction, index) => (
// // // // // //                         <TableRow 
// // // // // //                           key={transaction._id || transaction.transactionId || index}
// // // // // //                           hover
// // // // // //                           sx={{ 
// // // // // //                             '&:last-child td, &:last-child th': { border: 0 },
// // // // // //                             '&:nth-of-type(odd)': { bgcolor: 'action.hover' }
// // // // // //                           }}
// // // // // //                         >
// // // // // //                           <TableCell>
// // // // // //                             <Stack direction="row" alignItems="center" spacing={1}>
// // // // // //                               <Box sx={{ 
// // // // // //                                 p: 0.5, 
// // // // // //                                 borderRadius: 1,
// // // // // //                                 bgcolor: transaction.eventType === 'PAYMENT' ? 'success.light' : 'info.light'
// // // // // //                               }}>
// // // // // //                                 {getEventIcon(transaction.eventType)}
// // // // // //                               </Box>
// // // // // //                               <Typography variant="body2" fontWeight="medium">
// // // // // //                                 {transaction.eventType}
// // // // // //                               </Typography>
// // // // // //                             </Stack>
// // // // // //                           </TableCell>
// // // // // //                           <TableCell>
// // // // // //                             <Typography 
// // // // // //                               variant="body2" 
// // // // // //                               sx={{ 
// // // // // //                                 fontFamily: 'monospace',
// // // // // //                                 fontSize: '0.75rem',
// // // // // //                                 color: 'text.secondary'
// // // // // //                               }}
// // // // // //                             >
// // // // // //                               {transaction.transactionId || 'N/A'}
// // // // // //                             </Typography>
// // // // // //                           </TableCell>
// // // // // //                           <TableCell>
// // // // // //                             <Typography 
// // // // // //                               variant="body2"
// // // // // //                               sx={{
// // // // // //                                 fontFamily: 'monospace',
// // // // // //                                 fontSize: '0.75rem'
// // // // // //                               }}
// // // // // //                             >
// // // // // //                               {transaction.userId}
// // // // // //                             </Typography>
// // // // // //                           </TableCell>
// // // // // //                           <TableCell>
// // // // // //                             <Typography 
// // // // // //                               variant="body2" 
// // // // // //                               fontWeight="bold"
// // // // // //                               color={transaction.amount > 0 ? 'success.main' : 'text.primary'}
// // // // // //                             >
// // // // // //                               {formatAmount(transaction.amount, transaction.currency)}
// // // // // //                             </Typography>
// // // // // //                           </TableCell>
// // // // // //                           <TableCell>
// // // // // //                             <Chip
// // // // // //                               label={transaction.status}
// // // // // //                               color={getStatusColor(transaction.status)}
// // // // // //                               size="small"
// // // // // //                               variant="filled"
// // // // // //                               sx={{ fontWeight: 'medium', minWidth: 80 }}
// // // // // //                             />
// // // // // //                           </TableCell>
// // // // // //                           <TableCell>
// // // // // //                             <Typography variant="body2">
// // // // // //                               {formatDate(transaction.createdAt, 'MMM D, YYYY')}
// // // // // //                             </Typography>
// // // // // //                             <Typography variant="caption" color="text.secondary">
// // // // // //                               {formatDate(transaction.createdAt, 'h:mm A')}
// // // // // //                             </Typography>
// // // // // //                           </TableCell>
// // // // // //                         </TableRow>
// // // // // //                       ))
// // // // // //                     )}
// // // // // //                   </TableBody>
// // // // // //                 </Table>
// // // // // //               </TableContainer>
              
// // // // // //               {/* Pagination */}
// // // // // //               {transactions.length > 0 && (
// // // // // //                 <TablePagination
// // // // // //                   component="div"
// // // // // //                   count={pagination.total}
// // // // // //                   page={pagination.page}
// // // // // //                   onPageChange={handlePageChange}
// // // // // //                   rowsPerPage={pagination.limit}
// // // // // //                   onRowsPerPageChange={handleLimitChange}
// // // // // //                   rowsPerPageOptions={[5, 10, 25, 50]}
// // // // // //                   sx={{ 
// // // // // //                     borderTop: '1px solid',
// // // // // //                     borderColor: 'divider',
// // // // // //                     px: 3,
// // // // // //                     py: 2
// // // // // //                   }}
// // // // // //                 />
// // // // // //               )}
// // // // // //             </>
// // // // // //           )}
// // // // // //         </CardContent>
// // // // // //       </Card>

// // // // // //       {/* Footer Info */}
// // // // // //       <Box sx={{ mt: 3, textAlign: 'center' }}>
// // // // // //         <Typography variant="caption" color="text.secondary">
// // // // // //           Business ID: {businessId} • Data updates in real-time • 
// // // // // //           Contact support for transaction disputes
// // // // // //         </Typography>
// // // // // //       </Box>
// // // // // //     </Container>
// // // // // //   );
// // // // // // };


// // // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // // import {
// // // // // //   Box,
// // // // // //   Container,
// // // // // //   Typography,
// // // // // //   Table,
// // // // // //   TableBody,
// // // // // //   TableCell,
// // // // // //   TableContainer,
// // // // // //   TableHead,
// // // // // //   TableRow,
// // // // // //   TablePagination,
// // // // // //   Chip,
// // // // // //   Card,
// // // // // //   CardContent,
// // // // // //   CircularProgress,
// // // // // //   Alert,
// // // // // //   IconButton,
// // // // // //   Stack,
// // // // // //   Select,
// // // // // //   MenuItem,
// // // // // //   FormControl,
// // // // // //   InputLabel,
// // // // // //   TextField,
// // // // // //   InputAdornment,
// // // // // //   Grid,
// // // // // //   LinearProgress,
// // // // // //   Tooltip,
// // // // // //   alpha
// // // // // // } from '@mui/material';
// // // // // // import {
// // // // // //   Refresh as RefreshIcon,
// // // // // //   Search as SearchIcon,
// // // // // //   FilterList as FilterIcon,
// // // // // //   Download as DownloadIcon,
// // // // // //   Payment as PaymentIcon,
// // // // // //   Login as LoginIcon,
// // // // // //   AccountCircle as UserIcon,
// // // // // //   Security as SecurityIcon,
// // // // // //   Settings as SettingsIcon,
// // // // // //   ShoppingCart as CartIcon,
// // // // // //   ArrowUpward,
// // // // // //   ArrowDownward,
// // // // // //   MoreVert as MoreIcon,
// // // // // //   CheckCircle,
// // // // // //   Error as ErrorIcon,
// // // // // //   Pending as PendingIcon,
// // // // // //   Info as InfoIcon,
// // // // // //   TrendingUp
// // // // // // } from '@mui/icons-material';

// // // // // // import { businessAuthService } from '../services/businessAuth';
// // // // // // import { formatDate } from '../utils/formatters';

// // // // // // const BusinessTransactions = () => {
// // // // // //   const [transactions, setTransactions] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [error, setError] = useState(null);
// // // // // //   const [filters, setFilters] = useState({
// // // // // //     eventType: 'ALL',
// // // // // //     status: 'ALL',
// // // // // //     search: '',
// // // // // //     dateRange: 'ALL'
// // // // // //   });
// // // // // //   const [businessId, setBusinessId] = useState('');
// // // // // //   const [pagination, setPagination] = useState({
// // // // // //     page: 0,
// // // // // //     limit: 10,
// // // // // //     total: 0
// // // // // //   });
// // // // // //   const [sortConfig, setSortConfig] = useState({
// // // // // //     field: 'createdAt',
// // // // // //     direction: 'desc'
// // // // // //   });

// // // // // //   // Event types configuration - EXTENDED for multiple event types
// // // // // //   const EVENT_TYPES = {
// // // // // //     PAYMENT: {
// // // // // //       label: 'Payment',
// // // // // //       icon: <`Payment`Icon fontSize="small" />,
// // // // // //       color: '#10B981',
// // // // // //       bgColor: '#D1FAE5'
// // // // // //     },
// // // // // //     LOGIN: {
// // // // // //       label: 'Login',
// // // // // //       icon: <LoginIcon fontSize="small" />,
// // // // // //       color: '#3B82F6',
// // // // // //       bgColor: '#DBEAFE'
// // // // // //     },
// // // // // //     USER_CREATED: {
// // // // // //       label: 'User Created',
// // // // // //       icon: <UserIcon fontSize="small" />,
// // // // // //       color: '#8B5CF6',
// // // // // //       bgColor: '#EDE9FE'
// // // // // //     },
// // // // // //     SECURITY_ALERT: {
// // // // // //       label: 'Security Alert',
// // // // // //       icon: <SecurityIcon fontSize="small" />,
// // // // // //       color: '#EF4444',
// // // // // //       bgColor: '#FEE2E2'
// // // // // //     },
// // // // // //     SETTINGS_CHANGE: {
// // // // // //       label: 'Settings Change',
// // // // // //       icon: <SettingsIcon fontSize="small" />,
// // // // // //       color: '#F59E0B',
// // // // // //       bgColor: '#FEF3C7'
// // // // // //     },
// // // // // //     SUBSCRIPTION: {
// // // // // //       label: 'Subscription',
// // // // // //       icon: <CartIcon fontSize="small" />,
// // // // // //       color: '#EC4899',
// // // // // //       bgColor: '#FCE7F3'
// // // // // //     },
// // // // // //     API_CALL: {
// // // // // //       label: 'API Call',
// // // // // //       icon: <SettingsIcon fontSize="small" />,
// // // // // //       color: '#6366F1',
// // // // // //       bgColor: '#E0E7FF'
// // // // // //     },
// // // // // //     DATA_EXPORT: {
// // // // // //       label: 'Data Export',
// // // // // //       icon: <DownloadIcon fontSize="small" />,
// // // // // //       color: '#14B8A6',
// // // // // //       bgColor: '#CCFBF1'
// // // // // //     }
// // // // // //   };

// // // // // //   const STATUS_TYPES = {
// // // // // //     SUCCESS: {
// // // // // //       label: 'Success',
// // // // // //       icon: <CheckCircle fontSize="small" />,
// // // // // //       color: '#10B981'
// // // // // //     },
// // // // // //     PENDING: {
// // // // // //       label: 'Pending',
// // // // // //       icon: <PendingIcon fontSize="small" />,
// // // // // //       color: '#F59E0B'
// // // // // //     },
// // // // // //     FAILED: {
// // // // // //       label: 'Failed',
// // // // // //       icon: <ErrorIcon fontSize="small" />,
// // // // // //       color: '#EF4444'
// // // // // //     },
// // // // // //     APPROVED: {
// // // // // //       label: 'Approved',
// // // // // //       icon: <CheckCircle fontSize="small" />,
// // // // // //       color: '#10B981'
// // // // // //     },
// // // // // //     REJECTED: {
// // // // // //       label: 'Rejected',
// // // // // //       icon: <ErrorIcon fontSize="small" />,
// // // // // //       color: '#EF4444'
// // // // // //     },
// // // // // //     PROCESSING: {
// // // // // //       label: 'Processing',
// // // // // //       icon: <PendingIcon fontSize="small" />,
// // // // // //       color: '#6366F1'
// // // // // //     }
// // // // // //   };

// // // // // //   // Get businessId from localStorage on component mount
// // // // // //   useEffect(() => {
// // // // // //     const userStr = localStorage.getItem('user');
// // // // // //     if (userStr) {
// // // // // //       try {
// // // // // //         const user = JSON.parse(userStr);
// // // // // //         const bid = user.businessId || user.businessID || user.id;
// // // // // //         if (bid) {
// // // // // //           setBusinessId(bid);
// // // // // //         } else {
// // // // // //           setError('Business ID not found in user profile');
// // // // // //           setLoading(false);
// // // // // //         }
// // // // // //       } catch (error) {
// // // // // //         setError('Failed to load user data');
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     } else {
// // // // // //       setError('User not found. Please login again.');
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   }, []);

// // // // // //   const fetchTransactions = async () => {
// // // // // //     if (!businessId) {
// // // // // //       setError('Business ID is required');
// // // // // //       return;
// // // // // //     }
    
// // // // // //     setLoading(true);
// // // // // //     setError(null);
    
// // // // // //     try {
// // // // // //       const result = await businessAuthService.getBusinessTransactions(
// // // // // //         businessId,
// // // // // //         filters.eventType === 'ALL' ? undefined : filters.eventType,
// // // // // //         pagination.page + 1, 
// // // // // //         pagination.limit,
// // // // // //         filters.status === 'ALL' ? undefined : filters.status,
// // // // // //         filters.search || undefined
// // // // // //       );
      
// // // // // //       if (result.success) {
// // // // // //         // Sort transactions based on sortConfig
// // // // // //         let sortedTransactions = result.data || [];
// // // // // //         if (sortConfig.field) {
// // // // // //           sortedTransactions.sort((a, b) => {
// // // // // //             let aVal = a[sortConfig.field];
// // // // // //             let bVal = b[sortConfig.field];
            
// // // // // //             if (sortConfig.field === 'createdAt') {
// // // // // //               aVal = new Date(aVal);
// // // // // //               bVal = new Date(bVal);
// // // // // //             }
            
// // // // // //             if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
// // // // // //             if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
// // // // // //             return 0;
// // // // // //           });
// // // // // //         }
        
// // // // // //         setTransactions(sortedTransactions);
// // // // // //         setPagination(prev => ({
// // // // // //           ...prev,
// // // // // //           total: result.pagination?.total || 0
// // // // // //         }));
// // // // // //       } else {
// // // // // //         setError(result.error || 'Failed to fetch transactions');
// // // // // //       }
// // // // // //     } catch (err) {
// // // // // //       setError(err.message || 'An error occurred while fetching transactions');
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     if (businessId) {
// // // // // //       fetchTransactions();
// // // // // //     }
// // // // // //   }, [businessId, filters, pagination.page, pagination.limit, sortConfig]);

// // // // // //   const handlePageChange = (event, newPage) => {
// // // // // //     setPagination(prev => ({ ...prev, page: newPage }));
// // // // // //   };

// // // // // //   const handleLimitChange = (event) => {
// // // // // //     setPagination(prev => ({ 
// // // // // //       ...prev, 
// // // // // //       limit: parseInt(event.target.value, 10),
// // // // // //       page: 0
// // // // // //     }));
// // // // // //   };

// // // // // //   const handleFilterChange = (filterName, value) => {
// // // // // //     setFilters(prev => ({ ...prev, [filterName]: value }));
// // // // // //     setPagination(prev => ({ ...prev, page: 0 }));
// // // // // //   };

// // // // // //   const handleSort = (field) => {
// // // // // //     setSortConfig(prev => ({
// // // // // //       field,
// // // // // //       direction: prev.field === field && prev.direction === 'desc' ? 'asc' : 'desc'
// // // // // //     }));
// // // // // //   };

// // // // // //   const handleRefresh = () => {
// // // // // //     fetchTransactions();
// // // // // //   };

// // // // // //   const getEventConfig = (eventType) => {
// // // // // //     return EVENT_TYPES[eventType] || {
// // // // // //       label: eventType,
// // // // // //       icon: <InfoIcon fontSize="small" />,
// // // // // //       color: '#6B7280',
// // // // // //       bgColor: '#F3F4F6'
// // // // // //     };
// // // // // //   };

// // // // // //   const getStatusConfig = (status) => {
// // // // // //     const statusUpper = status?.toUpperCase();
// // // // // //     return STATUS_TYPES[statusUpper] || {
// // // // // //       label: status,
// // // // // //       icon: <InfoIcon fontSize="small" />,
// // // // // //       color: '#6B7280'
// // // // // //     };
// // // // // //   };

// // // // // //   const formatAmount = (amount, currency) => {
// // // // // //     if (!amount && amount !== 0) return '-';
// // // // // //     try {
// // // // // //       return new Intl.NumberFormat('en-US', {
// // // // // //         style: 'currency',
// // // // // //         currency: currency || 'USD'
// // // // // //       }).format(amount);
// // // // // //     } catch (error) {
// // // // // //       return `$${parseFloat(amount).toFixed(2)}`;
// // // // // //     }
// // // // // //   };

// // // // // //   // Calculate statistics
// // // // // //   const getStatistics = () => {
// // // // // //     const totalTransactions = transactions.length;
// // // // // //     const successfulTransactions = transactions.filter(t => 
// // // // // //       ['SUCCESS', 'APPROVED'].includes(t.status?.toUpperCase())
// // // // // //     ).length;
// // // // // //     const failedTransactions = transactions.filter(t => 
// // // // // //       ['FAILED', 'REJECTED'].includes(t.status?.toUpperCase())
// // // // // //     ).length;
    
// // // // // //     const paymentAmount = transactions
// // // // // //       .filter(t => t.eventType === 'PAYMENT' && ['SUCCESS', 'APPROVED'].includes(t.status?.toUpperCase()))
// // // // // //       .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
    
// // // // // //     const eventTypeCounts = transactions.reduce((acc, t) => {
// // // // // //       acc[t.eventType] = (acc[t.eventType] || 0) + 1;
// // // // // //       return acc;
// // // // // //     }, {});

// // // // // //     return {
// // // // // //       totalTransactions,
// // // // // //       successRate: totalTransactions > 0 ? (successfulTransactions / totalTransactions * 100).toFixed(1) : 0,
// // // // // //       failedTransactions,
// // // // // //       paymentAmount,
// // // // // //       eventTypeCounts
// // // // // //     };
// // // // // //   };

// // // // // //   const stats = getStatistics();

// // // // // //   return (
// // // // // //     <Container maxWidth="xl" sx={{ py: 3 }}>
// // // // // //       {/* Header */}
// // // // // //       <Box sx={{ mb: 4 }}>
// // // // // //         <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
// // // // // //           <Box>
// // // // // //             <Typography variant="h5" fontWeight={600} color="text.primary">
// // // // // //               Transaction History
// // // // // //             </Typography>
// // // // // //             <Typography variant="body2" color="text.secondary">
// // // // // //               Monitor all business activities and transactions
// // // // // //             </Typography>
// // // // // //           </Box>
// // // // // //           <Stack direction="row" spacing={1}>
// // // // // //             <IconButton onClick={handleRefresh} disabled={loading} size="small">
// // // // // //               <RefreshIcon />
// // // // // //             </IconButton>
// // // // // //             <Tooltip title="Export">
// // // // // //               <IconButton size="small">
// // // // // //                 <DownloadIcon />
// // // // // //               </IconButton>
// // // // // //             </Tooltip>
// // // // // //           </Stack>
// // // // // //         </Stack>
// // // // // //       </Box>

     

// // // // // //       {/* Filters Card */}
// // // // // //       <Card sx={{ mb: 3 }}>
// // // // // //         <CardContent>
// // // // // //           <Grid container spacing={2} alignItems="center">
// // // // // //             <Grid item xs={12} md={3}>
// // // // // //               <TextField
// // // // // //                 fullWidth
// // // // // //                 size="small"
// // // // // //                 placeholder="Search transactions..."
// // // // // //                 value={filters.search}
// // // // // //                 onChange={(e) => handleFilterChange('search', e.target.value)}
// // // // // //                 InputProps={{
// // // // // //                   startAdornment: (
// // // // // //                     <InputAdornment position="start">
// // // // // //                       <SearchIcon fontSize="small" />
// // // // // //                     </InputAdornment>
// // // // // //                   ),
// // // // // //                 }}
// // // // // //               />
// // // // // //             </Grid>
            
// // // // // //             <Grid item xs={6} md={2}>
// // // // // //               <FormControl fullWidth size="small">
// // // // // //                 <InputLabel>Event Type</InputLabel>
// // // // // //                 <Select
// // // // // //                   value={filters.eventType}
// // // // // //                   label="Event Type"
// // // // // //                   onChange={(e) => handleFilterChange('eventType', e.target.value)}
// // // // // //                 >
// // // // // //                   <MenuItem value="ALL">All Events</MenuItem>
// // // // // //                   {Object.entries(EVENT_TYPES).map(([key, config]) => (
// // // // // //                     <MenuItem key={key} value={key}>
// // // // // //                       <Stack direction="row" alignItems="center" spacing={1}>
// // // // // //                         <Box sx={{ color: config.color }}>
// // // // // //                           {config.icon}
// // // // // //                         </Box>
// // // // // //                         <Typography>{config.label}</Typography>
// // // // // //                       </Stack>
// // // // // //                     </MenuItem>
// // // // // //                   ))}
// // // // // //                 </Select>
// // // // // //               </FormControl>
// // // // // //             </Grid>
            
// // // // // //             <Grid item xs={6} md={2}>
// // // // // //               <FormControl fullWidth size="small">
// // // // // //                 <InputLabel>Status</InputLabel>
// // // // // //                 <Select
// // // // // //                   value={filters.status}
// // // // // //                   label="Status"
// // // // // //                   onChange={(e) => handleFilterChange('status', e.target.value)}
// // // // // //                 >
// // // // // //                   <MenuItem value="ALL">All Status</MenuItem>
// // // // // //                   {Object.entries(STATUS_TYPES).map(([key, config]) => (
// // // // // //                     <MenuItem key={key} value={key}>
// // // // // //                       <Stack direction="row" alignItems="center" spacing={1}>
// // // // // //                         <Box sx={{ color: config.color }}>
// // // // // //                           {config.icon}
// // // // // //                         </Box>
// // // // // //                         <Typography>{config.label}</Typography>
// // // // // //                       </Stack>
// // // // // //                     </MenuItem>
// // // // // //                   ))}
// // // // // //                 </Select>
// // // // // //               </FormControl>
// // // // // //             </Grid>
            
// // // // // //             <Grid item xs={6} md={2}>
// // // // // //               <FormControl fullWidth size="small">
// // // // // //                 <InputLabel>Date Range</InputLabel>
// // // // // //                 <Select
// // // // // //                   value={filters.dateRange}
// // // // // //                   label="Date Range"
// // // // // //                   onChange={(e) => handleFilterChange('dateRange', e.target.value)}
// // // // // //                 >
// // // // // //                   <MenuItem value="ALL">All Time</MenuItem>
// // // // // //                   <MenuItem value="TODAY">Today</MenuItem>
// // // // // //                   <MenuItem value="7DAYS">Last 7 Days</MenuItem>
// // // // // //                   <MenuItem value="30DAYS">Last 30 Days</MenuItem>
// // // // // //                   <MenuItem value="90DAYS">Last 90 Days</MenuItem>
// // // // // //                 </Select>
// // // // // //               </FormControl>
// // // // // //             </Grid>
            
// // // // // //             <Grid item xs={6} md={2}>
// // // // // //               <FormControl fullWidth size="small">
// // // // // //                 <InputLabel>Rows per page</InputLabel>
// // // // // //                 <Select
// // // // // //                   value={pagination.limit}
// // // // // //                   label="Rows per page"
// // // // // //                   onChange={handleLimitChange}
// // // // // //                 >
// // // // // //                   <MenuItem value={5}>5</MenuItem>
// // // // // //                   <MenuItem value={10}>10</MenuItem>
// // // // // //                   <MenuItem value={25}>25</MenuItem>
// // // // // //                   <MenuItem value={50}>50</MenuItem>
// // // // // //                 </Select>
// // // // // //               </FormControl>
// // // // // //             </Grid>
// // // // // //           </Grid>
// // // // // //         </CardContent>
// // // // // //       </Card>

// // // // // //       {/* Error Alert */}
// // // // // //       {error && (
// // // // // //         <Alert 
// // // // // //           severity="error" 
// // // // // //           sx={{ mb: 3 }} 
// // // // // //           onClose={() => setError(null)}
// // // // // //         >
// // // // // //           {error}
// // // // // //         </Alert>
// // // // // //       )}

// // // // // //       {/* Transactions Table */}
// // // // // //       <Card>
// // // // // //         <CardContent sx={{ p: 0 }}>
// // // // // //           {loading && transactions.length === 0 ? (
// // // // // //             <Box sx={{ p: 6, textAlign: 'center' }}>
// // // // // //               <CircularProgress size={40} />
// // // // // //               <Typography variant="body2" sx={{ mt: 2 }} color="text.secondary">
// // // // // //                 Loading transactions...
// // // // // //               </Typography>
// // // // // //             </Box>
// // // // // //           ) : (
// // // // // //             <>
// // // // // //               <TableContainer>
// // // // // //                 <Table>
// // // // // //                   <TableHead>
// // // // // //                     <TableRow sx={{ bgcolor: 'grey.50' }}>
// // // // // //                       <TableCell>
// // // // // //                         <Typography variant="subtitle2" fontWeight={600}>
// // // // // //                           Event Type
// // // // // //                         </Typography>
// // // // // //                       </TableCell>
// // // // // //                       <TableCell>
// // // // // //                         <Typography variant="subtitle2" fontWeight={600}>
// // // // // //                           Transaction ID
// // // // // //                         </Typography>
// // // // // //                       </TableCell>
// // // // // //                       <TableCell>
// // // // // //                         <Typography variant="subtitle2" fontWeight={600}>
// // // // // //                           User
// // // // // //                         </Typography>
// // // // // //                       </TableCell>
// // // // // //                       <TableCell>
// // // // // //                         <Stack direction="row" alignItems="center" spacing={0.5}>
// // // // // //                           <Typography variant="subtitle2" fontWeight={600}>
// // // // // //                             Amount
// // // // // //                           </Typography>
// // // // // //                           <IconButton size="small" onClick={() => handleSort('amount')}>
// // // // // //                             {sortConfig.field === 'amount' && sortConfig.direction === 'asc' ? 
// // // // // //                               <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
// // // // // //                           </IconButton>
// // // // // //                         </Stack>
// // // // // //                       </TableCell>
// // // // // //                       <TableCell>
// // // // // //                         <Typography variant="subtitle2" fontWeight={600}>
// // // // // //                           Status
// // // // // //                         </Typography>
// // // // // //                       </TableCell>
// // // // // //                       <TableCell>
// // // // // //                         <Stack direction="row" alignItems="center" spacing={0.5}>
// // // // // //                           <Typography variant="subtitle2" fontWeight={600}>
// // // // // //                             Date & Time
// // // // // //                           </Typography>
// // // // // //                           <IconButton size="small" onClick={() => handleSort('createdAt')}>
// // // // // //                             {sortConfig.field === 'createdAt' && sortConfig.direction === 'asc' ? 
// // // // // //                               <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
// // // // // //                           </IconButton>
// // // // // //                         </Stack>
// // // // // //                       </TableCell>
// // // // // //                       <TableCell>
// // // // // //                         <Typography variant="subtitle2" fontWeight={600}>
// // // // // //                           Actions
// // // // // //                         </Typography>
// // // // // //                       </TableCell>
// // // // // //                     </TableRow>
// // // // // //                   </TableHead>
// // // // // //                   <TableBody>
// // // // // //                     {transactions.length === 0 ? (
// // // // // //                       <TableRow>
// // // // // //                         <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
// // // // // //                           <FilterIcon sx={{ fontSize: 48, color: 'grey.300', mb: 2 }} />
// // // // // //                           <Typography variant="h6" color="text.secondary" gutterBottom>
// // // // // //                             No transactions found
// // // // // //                           </Typography>
// // // // // //                           <Typography variant="body2" color="text.secondary">
// // // // // //                             Try adjusting your filters or search criteria
// // // // // //                           </Typography>
// // // // // //                         </TableCell>
// // // // // //                       </TableRow>
// // // // // //                     ) : (
// // // // // //                       transactions.map((transaction, index) => {
// // // // // //                         const eventConfig = getEventConfig(transaction.eventType);
// // // // // //                         const statusConfig = getStatusConfig(transaction.status);
                        
// // // // // //                         return (
// // // // // //                           <TableRow 
// // // // // //                             key={transaction._id || transaction.transactionId || index}
// // // // // //                             hover
// // // // // //                             sx={{ 
// // // // // //                               '&:last-child td, &:last-child th': { border: 0 },
// // // // // //                               '&:hover': { bgcolor: 'action.hover' }
// // // // // //                             }}
// // // // // //                           >
// // // // // //                             <TableCell>
// // // // // //                               <Stack direction="row" alignItems="center" spacing={1.5}>
// // // // // //                                 <Box sx={{ 
// // // // // //                                   p: 1,
// // // // // //                                   borderRadius: 1,
// // // // // //                                   bgcolor: eventConfig.bgColor,
// // // // // //                                   display: 'flex',
// // // // // //                                   alignItems: 'center',
// // // // // //                                   justifyContent: 'center'
// // // // // //                                 }}>
// // // // // //                                   <Box sx={{ color: eventConfig.color }}>
// // // // // //                                     {eventConfig.icon}
// // // // // //                                   </Box>
// // // // // //                                 </Box>
// // // // // //                                 <Box>
// // // // // //                                   <Typography variant="body2" fontWeight={500}>
// // // // // //                                     {eventConfig.label}
// // // // // //                                   </Typography>
// // // // // //                                   <Typography variant="caption" color="text.secondary">
// // // // // //                                     {transaction.eventType}
// // // // // //                                   </Typography>
// // // // // //                                 </Box>
// // // // // //                               </Stack>
// // // // // //                             </TableCell>
// // // // // //                             <TableCell>
// // // // // //                               <Typography 
// // // // // //                                 variant="body2" 
// // // // // //                                 sx={{ 
// // // // // //                                   fontFamily: 'monospace',
// // // // // //                                   fontSize: '0.75rem',
// // // // // //                                   color: 'text.secondary'
// // // // // //                                 }}
// // // // // //                               >
// // // // // //                                 {transaction.transactionId?.slice(0, 8)}...
// // // // // //                               </Typography>
// // // // // //                             </TableCell>
// // // // // //                             <TableCell>
// // // // // //                               <Stack>
// // // // // //                                 <Typography variant="body2" fontWeight={500}>
// // // // // //                                   {transaction.userName || 'User'}
// // // // // //                                 </Typography>
// // // // // //                                 <Typography variant="caption" color="text.secondary">
// // // // // //                                   ID: {transaction.userId?.slice(0, 8)}...
// // // // // //                                 </Typography>
// // // // // //                               </Stack>
// // // // // //                             </TableCell>
// // // // // //                             <TableCell>
// // // // // //                               <Typography 
// // // // // //                                 variant="body2" 
// // // // // //                                 fontWeight={600}
// // // // // //                                 color={transaction.amount > 0 ? 'success.main' : 'error.main'}
// // // // // //                               >
// // // // // //                                 {formatAmount(transaction.amount, transaction.currency)}
// // // // // //                               </Typography>
// // // // // //                             </TableCell>
// // // // // //                             <TableCell>
// // // // // //                               <Chip
// // // // // //                                 icon={statusConfig.icon}
// // // // // //                                 label={statusConfig.label}
// // // // // //                                 size="small"
// // // // // //                                 sx={{ 
// // // // // //                                   fontWeight: 500,
// // // // // //                                   bgcolor: alpha(statusConfig.color, 0.1),
// // // // // //                                   color: statusConfig.color,
// // // // // //                                   border: `1px solid ${alpha(statusConfig.color, 0.3)}`
// // // // // //                                 }}
// // // // // //                               />
// // // // // //                             </TableCell>
// // // // // //                             <TableCell>
// // // // // //                               <Stack>
// // // // // //                                 <Typography variant="body2" fontWeight={500}>
// // // // // //                                   {formatDate(transaction.createdAt, 'MMM D, YYYY')}
// // // // // //                                 </Typography>
// // // // // //                                 <Typography variant="caption" color="text.secondary">
// // // // // //                                   {formatDate(transaction.createdAt, 'h:mm A')}
// // // // // //                                 </Typography>
// // // // // //                               </Stack>
// // // // // //                             </TableCell>
// // // // // //                             <TableCell>
// // // // // //                               <Tooltip title="View details">
// // // // // //                                 <IconButton size="small">
// // // // // //                                   <MoreIcon />
// // // // // //                                 </IconButton>
// // // // // //                               </Tooltip>
// // // // // //                             </TableCell>
// // // // // //                           </TableRow>
// // // // // //                         );
// // // // // //                       })
// // // // // //                     )}
// // // // // //                   </TableBody>
// // // // // //                 </Table>
// // // // // //               </TableContainer>
              
// // // // // //               {/* Pagination */}
// // // // // //               {transactions.length > 0 && (
// // // // // //                 <TablePagination
// // // // // //                   component="div"
// // // // // //                   count={pagination.total}
// // // // // //                   page={pagination.page}
// // // // // //                   onPageChange={handlePageChange}
// // // // // //                   rowsPerPage={pagination.limit}
// // // // // //                   onRowsPerPageChange={handleLimitChange}
// // // // // //                   rowsPerPageOptions={[5, 10, 25, 50]}
// // // // // //                   sx={{ 
// // // // // //                     borderTop: '1px solid',
// // // // // //                     borderColor: 'divider',
// // // // // //                     px: 3,
// // // // // //                     py: 2
// // // // // //                   }}
// // // // // //                 />
// // // // // //               )}
// // // // // //             </>
// // // // // //           )}
// // // // // //         </CardContent>
// // // // // //       </Card>

// // // // // //       {/* Footer */}
// // // // // //       <Box sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: 'divider' }}>
// // // // // //         <Stack direction="row" justifyContent="space-between" alignItems="center">
// // // // // //           <Typography variant="caption" color="text.secondary">
// // // // // //             Showing {transactions.length} of {pagination.total} transactions
// // // // // //           </Typography>
// // // // // //           <Typography variant="caption" color="text.secondary">
// // // // // //             Business ID: {businessId?.slice(0, 12)}...
// // // // // //           </Typography>
// // // // // //         </Stack>
// // // // // //       </Box>
// // // // // //     </Container>
// // // // // //   );
// // // // // // };

// // // // // // export default BusinessTransactions;

// // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // import {
// // // // //   Box,
// // // // //   Container,
// // // // //   Typography,
// // // // //   Table,
// // // // //   TableBody,
// // // // //   TableCell,
// // // // //   TableContainer,
// // // // //   TableHead,
// // // // //   TableRow,
// // // // //   TablePagination,
// // // // //   Chip,
// // // // //   Card,
// // // // //   CardContent,
// // // // //   CircularProgress,
// // // // //   Alert,
// // // // //   IconButton,
// // // // //   Stack,
// // // // //   Select,
// // // // //   MenuItem,
// // // // //   FormControl,
// // // // //   InputLabel,
// // // // //   TextField,
// // // // //   InputAdornment,
// // // // //   Grid,
// // // // //   Tooltip,
// // // // //   alpha,
// // // // //   Button,
// // // // //   Dialog,
// // // // //   DialogTitle,
// // // // //   DialogContent,
// // // // //   DialogActions,
// // // // //   Avatar,
// // // // //   Divider,
// // // // //   Paper
// // // // // } from '@mui/material';
// // // // // import {
// // // // //   Refresh as RefreshIcon,
// // // // //   Search as SearchIcon,
// // // // //   FilterList as FilterIcon,
// // // // //   Download as DownloadIcon,
// // // // //   Payment as PaymentIcon,
// // // // //   Login as LoginIcon,
// // // // //   AccountCircle as UserIcon,
// // // // //   Security as SecurityIcon,
// // // // //   Settings as SettingsIcon,
// // // // //   ShoppingCart as CartIcon,
// // // // //   ArrowUpward,
// // // // //   ArrowDownward,
// // // // //   MoreVert as MoreIcon,
// // // // //   CheckCircle,
// // // // //   Error as ErrorIcon,
// // // // //   Pending as PendingIcon,
// // // // //   Info as InfoIcon,
// // // // //   ContentCopy as CopyIcon,
// // // // //   Visibility as ViewIcon,
// // // // //   CalendarToday as CalendarIcon,
// // // // //   AccountBalanceWallet as WalletIcon,
// // // // //   Timeline as TimelineIcon,
// // // // //   BarChart as ChartIcon,
// // // // //   ArrowForward as ArrowForwardIcon
// // // // // } from '@mui/icons-material';

// // // // // import { businessAuthService } from '../services/businessAuth';
// // // // // import { formatDate } from '../utils/formatters';

// // // // // const BusinessTransactions = () => {
// // // // //   const [transactions, setTransactions] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState(null);
// // // // //   const [filters, setFilters] = useState({
// // // // //     eventType: 'ALL',
// // // // //     status: 'ALL',
// // // // //     search: '',
// // // // //     dateRange: 'ALL'
// // // // //   });
// // // // //   const [businessId, setBusinessId] = useState('');
// // // // //   const [pagination, setPagination] = useState({
// // // // //     page: 0,
// // // // //     limit: 10,
// // // // //     total: 0
// // // // //   });
// // // // //   const [sortConfig, setSortConfig] = useState({
// // // // //     field: 'createdAt',
// // // // //     direction: 'desc'
// // // // //   });
// // // // //   const [selectedTransaction, setSelectedTransaction] = useState(null);
// // // // //   const [viewDialogOpen, setViewDialogOpen] = useState(false);

// // // // //   // Event types configuration - EXTENDED for multiple event types
// // // // //   const EVENT_TYPES = {
// // // // //     ALL: {
// // // // //       label: 'All Events',
// // // // //       icon: <FilterIcon fontSize="small" />,
// // // // //       color: '#6366F1',
// // // // //       bgColor: '#E0E7FF'
// // // // //     },
// // // // //     PAYMENT: {
// // // // //       label: 'Payment',
// // // // //       icon: <PaymentIcon fontSize="small" />,
// // // // //       color: '#10B981',
// // // // //       bgColor: '#D1FAE5'
// // // // //     },
// // // // //     LOGIN: {
// // // // //       label: 'Login',
// // // // //       icon: <LoginIcon fontSize="small" />,
// // // // //       color: '#3B82F6',
// // // // //       bgColor: '#DBEAFE'
// // // // //     },
// // // // //     USER_CREATED: {
// // // // //       label: 'User Created',
// // // // //       icon: <UserIcon fontSize="small" />,
// // // // //       color: '#8B5CF6',
// // // // //       bgColor: '#EDE9FE'
// // // // //     },
// // // // //     SECURITY_ALERT: {
// // // // //       label: 'Security Alert',
// // // // //       icon: <SecurityIcon fontSize="small" />,
// // // // //       color: '#EF4444',
// // // // //       bgColor: '#FEE2E2'
// // // // //     },
// // // // //     SETTINGS_CHANGE: {
// // // // //       label: 'Settings Change',
// // // // //       icon: <SettingsIcon fontSize="small" />,
// // // // //       color: '#F59E0B',
// // // // //       bgColor: '#FEF3C7'
// // // // //     },
// // // // //     SUBSCRIPTION: {
// // // // //       label: 'Subscription',
// // // // //       icon: <CartIcon fontSize="small" />,
// // // // //       color: '#EC4899',
// // // // //       bgColor: '#FCE7F3'
// // // // //     },
// // // // //     API_CALL: {
// // // // //       label: 'API Call',
// // // // //       icon: <SettingsIcon fontSize="small" />,
// // // // //       color: '#6366F1',
// // // // //       bgColor: '#E0E7FF'
// // // // //     },
// // // // //     DATA_EXPORT: {
// // // // //       label: 'Data Export',
// // // // //       icon: <DownloadIcon fontSize="small" />,
// // // // //       color: '#14B8A6',
// // // // //       bgColor: '#CCFBF1'
// // // // //     }
// // // // //   };

// // // // //   const STATUS_TYPES = {
// // // // //     ALL: {
// // // // //       label: 'All Status',
// // // // //       icon: <FilterIcon fontSize="small" />,
// // // // //       color: '#6B7280',
// // // // //       bgColor: '#F3F4F6'
// // // // //     },
// // // // //     SUCCESS: {
// // // // //       label: 'Success',
// // // // //       icon: <CheckCircle fontSize="small" />,
// // // // //       color: '#10B981'
// // // // //     },
// // // // //     PENDING: {
// // // // //       label: 'Pending',
// // // // //       icon: <PendingIcon fontSize="small" />,
// // // // //       color: '#F59E0B'
// // // // //     },
// // // // //     FAILED: {
// // // // //       label: 'Failed',
// // // // //       icon: <ErrorIcon fontSize="small" />,
// // // // //       color: '#EF4444'
// // // // //     },
// // // // //     APPROVED: {
// // // // //       label: 'Approved',
// // // // //       icon: <CheckCircle fontSize="small" />,
// // // // //       color: '#10B981'
// // // // //     },
// // // // //     REJECTED: {
// // // // //       label: 'Rejected',
// // // // //       icon: <ErrorIcon fontSize="small" />,
// // // // //       color: '#EF4444'
// // // // //     },
// // // // //     PROCESSING: {
// // // // //       label: 'Processing',
// // // // //       icon: <PendingIcon fontSize="small" />,
// // // // //       color: '#6366F1'
// // // // //     }
// // // // //   };

// // // // //   const DATE_RANGES = {
// // // // //     ALL: {
// // // // //       label: 'All Time',
// // // // //       icon: <CalendarIcon fontSize="small" />
// // // // //     },
// // // // //     TODAY: {
// // // // //       label: 'Today',
// // // // //       icon: <CalendarIcon fontSize="small" />
// // // // //     },
// // // // //     '7DAYS': {
// // // // //       label: 'Last 7 Days',
// // // // //       icon: <CalendarIcon fontSize="small" />
// // // // //     },
// // // // //     '30DAYS': {
// // // // //       label: 'Last 30 Days',
// // // // //       icon: <CalendarIcon fontSize="small" />
// // // // //     },
// // // // //     '90DAYS': {
// // // // //       label: 'Last 90 Days',
// // // // //       icon: <CalendarIcon fontSize="small" />
// // // // //     }
// // // // //   };

// // // // //   // Get businessId from localStorage on component mount
// // // // //   useEffect(() => {
// // // // //     const userStr = localStorage.getItem('user');
// // // // //     if (userStr) {
// // // // //       try {
// // // // //         const user = JSON.parse(userStr);
// // // // //         const bid = user.businessId || user.businessID || user.id;
// // // // //         if (bid) {
// // // // //           setBusinessId(bid);
// // // // //         } else {
// // // // //           setError('Business ID not found in user profile');
// // // // //           setLoading(false);
// // // // //         }
// // // // //       } catch (error) {
// // // // //         setError('Failed to load user data');
// // // // //         setLoading(false);
// // // // //       }
// // // // //     } else {
// // // // //       setError('User not found. Please login again.');
// // // // //       setLoading(false);
// // // // //     }
// // // // //   }, []);

// // // // //   const fetchTransactions = useCallback(async () => {
// // // // //     if (!businessId) {
// // // // //       setError('Business ID is required');
// // // // //       return;
// // // // //     }
    
// // // // //     setLoading(true);
// // // // //     setError(null);
    
// // // // //     try {
// // // // //       // Apply date filter
// // // // //       let startDate;
// // // // //       const now = new Date();
// // // // //       switch(filters.dateRange) {
// // // // //         case 'TODAY':
// // // // //           startDate = new Date(now.setHours(0, 0, 0, 0));
// // // // //           break;
// // // // //         case '7DAYS':
// // // // //           startDate = new Date(now.setDate(now.getDate() - 7));
// // // // //           break;
// // // // //         case '30DAYS':
// // // // //           startDate = new Date(now.setDate(now.getDate() - 30));
// // // // //           break;
// // // // //         case '90DAYS':
// // // // //           startDate = new Date(now.setDate(now.getDate() - 90));
// // // // //           break;
// // // // //         default:
// // // // //           startDate = undefined;
// // // // //       }

// // // // //       const result = await businessAuthService.getBusinessTransactions(
// // // // //         businessId,
// // // // //         filters.eventType === 'ALL' ? undefined : filters.eventType,
// // // // //         pagination.page + 1, 
// // // // //         pagination.limit,
// // // // //         filters.status === 'ALL' ? undefined : filters.status,
// // // // //         filters.search || undefined,
// // // // //         startDate
// // // // //       );
      
// // // // //       if (result.success) {
// // // // //         // Sort transactions based on sortConfig
// // // // //         let sortedTransactions = result.data || [];
// // // // //         if (sortConfig.field) {
// // // // //           sortedTransactions.sort((a, b) => {
// // // // //             let aVal = a[sortConfig.field] || '';
// // // // //             let bVal = b[sortConfig.field] || '';
            
// // // // //             if (sortConfig.field === 'createdAt') {
// // // // //               aVal = new Date(aVal);
// // // // //               bVal = new Date(bVal);
// // // // //             }
            
// // // // //             if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
// // // // //             if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
// // // // //             return 0;
// // // // //           });
// // // // //         }
        
// // // // //         setTransactions(sortedTransactions);
// // // // //         setPagination(prev => ({
// // // // //           ...prev,
// // // // //           total: result.pagination?.total || 0
// // // // //         }));
// // // // //       } else {
// // // // //         setError(result.error || 'Failed to fetch transactions');
// // // // //       }
// // // // //     } catch (err) {
// // // // //       setError(err.message || 'An error occurred while fetching transactions');
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   }, [businessId, filters, pagination.page, pagination.limit, sortConfig]);

// // // // //   useEffect(() => {
// // // // //     if (businessId) {
// // // // //       fetchTransactions();
// // // // //     }
// // // // //   }, [businessId, filters, pagination.page, pagination.limit, sortConfig, fetchTransactions]);

// // // // //   const handlePageChange = (event, newPage) => {
// // // // //     setPagination(prev => ({ ...prev, page: newPage }));
// // // // //   };

// // // // //   const handleLimitChange = (event) => {
// // // // //     setPagination(prev => ({ 
// // // // //       ...prev, 
// // // // //       limit: parseInt(event.target.value, 10),
// // // // //       page: 0
// // // // //     }));
// // // // //   };

// // // // //   const handleFilterChange = (filterName, value) => {
// // // // //     setFilters(prev => ({ ...prev, [filterName]: value }));
// // // // //     setPagination(prev => ({ ...prev, page: 0 }));
// // // // //   };

// // // // //   const handleSort = (field) => {
// // // // //     setSortConfig(prev => ({
// // // // //       field,
// // // // //       direction: prev.field === field && prev.direction === 'desc' ? 'asc' : 'desc'
// // // // //     }));
// // // // //   };

// // // // //   const handleRefresh = () => {
// // // // //     fetchTransactions();
// // // // //   };

// // // // //   const handleViewTransaction = (transaction) => {
// // // // //     setSelectedTransaction(transaction);
// // // // //     setViewDialogOpen(true);
// // // // //   };

// // // // //   const handleCloseDialog = () => {
// // // // //     setViewDialogOpen(false);
// // // // //     setSelectedTransaction(null);
// // // // //   };

// // // // //   const copyToClipboard = (text) => {
// // // // //     navigator.clipboard.writeText(text);
// // // // //   };

// // // // //   const getEventConfig = (eventType) => {
// // // // //     return EVENT_TYPES[eventType] || {
// // // // //       label: eventType || 'Unknown',
// // // // //       icon: <InfoIcon fontSize="small" />,
// // // // //       color: '#6B7280',
// // // // //       bgColor: '#F3F4F6'
// // // // //     };
// // // // //   };

// // // // //   const getStatusConfig = (status) => {
// // // // //     const statusUpper = status?.toUpperCase();
// // // // //     return STATUS_TYPES[statusUpper] || {
// // // // //       label: status || 'Unknown',
// // // // //       icon: <InfoIcon fontSize="small" />,
// // // // //       color: '#6B7280'
// // // // //     };
// // // // //   };

// // // // //   const formatAmount = (amount, currency) => {
// // // // //     if (amount === null || amount === undefined) return 'N/A';
// // // // //     try {
// // // // //       return new Intl.NumberFormat('en-US', {
// // // // //         style: 'currency',
// // // // //         currency: currency || 'USD'
// // // // //       }).format(amount);
// // // // //     } catch (error) {
// // // // //       return `$${parseFloat(amount).toFixed(2)}`;
// // // // //     }
// // // // //   };

// // // // //   // Calculate statistics
// // // // //   const getStatistics = () => {
// // // // //     const totalTransactions = pagination.total;
// // // // //     const successfulTransactions = transactions.filter(t => 
// // // // //       ['SUCCESS', 'APPROVED'].includes(t.status?.toUpperCase())
// // // // //     ).length;
// // // // //     const failedTransactions = transactions.filter(t => 
// // // // //       ['FAILED', 'REJECTED'].includes(t.status?.toUpperCase())
// // // // //     ).length;
    
// // // // //     const paymentAmount = transactions
// // // // //       .filter(t => t.eventType === 'PAYMENT' && ['SUCCESS', 'APPROVED'].includes(t.status?.toUpperCase()))
// // // // //       .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
    
// // // // //     const eventTypeCounts = transactions.reduce((acc, t) => {
// // // // //       acc[t.eventType] = (acc[t.eventType] || 0) + 1;
// // // // //       return acc;
// // // // //     }, {});

// // // // //     return {
// // // // //       totalTransactions,
// // // // //       successRate: totalTransactions > 0 ? (successfulTransactions / totalTransactions * 100).toFixed(1) : 0,
// // // // //       failedTransactions,
// // // // //       paymentAmount,
// // // // //       eventTypeCounts
// // // // //     };
// // // // //   };

// // // // //   const stats = getStatistics();

// // // // //   return (
// // // // //     <Container maxWidth="xl" sx={{ 
// // // // //       py: 4,
// // // // //       minHeight: '100vh',
// // // // //       background: 'linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)'
// // // // //     }}>
// // // // //       {/* Header */}
// // // // //       <Box sx={{ mb: 4 }}>
// // // // //         <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
// // // // //           <Box>
// // // // //             <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
// // // // //               Transaction History
// // // // //             </Typography>
// // // // //             <Stack direction="row" alignItems="center" spacing={1}>
// // // // //               <TimelineIcon sx={{ color: 'primary.main', fontSize: 20 }} />
// // // // //               <Typography variant="body2" color="text.secondary">
// // // // //                 Monitor and analyze all business activities and transactions
// // // // //               </Typography>
// // // // //             </Stack>
// // // // //           </Box>
// // // // //           <Stack direction="row" spacing={1}>
// // // // //             <Button
// // // // //               variant="outlined"
// // // // //               startIcon={<RefreshIcon />}
// // // // //               onClick={handleRefresh}
// // // // //               disabled={loading}
// // // // //               size="small"
// // // // //             >
// // // // //               Refresh
// // // // //             </Button>
// // // // //             <Button
// // // // //               variant="contained"
// // // // //               startIcon={<DownloadIcon />}
// // // // //               size="small"
// // // // //               sx={{ 
// // // // //                 background: 'linear-gradient(45deg, #6366F1, #8B5CF6)',
// // // // //                 '&:hover': {
// // // // //                   background: 'linear-gradient(45deg, #4F46E5, #7C3AED)'
// // // // //                 }
// // // // //               }}
// // // // //             >
// // // // //               Export
// // // // //             </Button>
// // // // //           </Stack>
// // // // //         </Stack>
// // // // //       </Box>

    
// // // // //       {/* Filters Card */}
// // // // //       <Card sx={{ 
// // // // //         mb: 4,
// // // // //         borderRadius: 2,
// // // // //         boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
// // // // //         border: '1px solid rgba(0,0,0,0.05)',
// // // // //         background: 'rgba(255, 255, 255, 0.9)',
// // // // //         backdropFilter: 'blur(10px)'
// // // // //       }}>
// // // // //         <CardContent>
// // // // //           <Grid container spacing={2} alignItems="center">
// // // // //             <Grid item xs={12} md={4}>
// // // // //               <TextField
// // // // //                 fullWidth
// // // // //                 size="medium"
// // // // //                 placeholder="Search transactions..."
// // // // //                 value={filters.search}
// // // // //                 onChange={(e) => handleFilterChange('search', e.target.value)}
// // // // //                 InputProps={{
// // // // //                   startAdornment: (
// // // // //                     <InputAdornment position="start">
// // // // //                       <SearchIcon fontSize="small" color="primary" />
// // // // //                     </InputAdornment>
// // // // //                   ),
// // // // //                   sx: { 
// // // // //                     borderRadius: 2,
// // // // //                     background: 'rgba(255, 255, 255, 0.8)'
// // // // //                   }
// // // // //                 }}
// // // // //               />
// // // // //             </Grid>
            
// // // // //             <Grid item xs={12} sm={6} md={2}>
// // // // //               <FormControl fullWidth size="medium">
// // // // //                 <InputLabel>Event Type</InputLabel>
// // // // //                 <Select
// // // // //                   value={filters.eventType}
// // // // //                   label="Event Type"
// // // // //                   onChange={(e) => handleFilterChange('eventType', e.target.value)}
// // // // //                   sx={{ borderRadius: 2 }}
// // // // //                 >
// // // // //                   {Object.entries(EVENT_TYPES).map(([key, config]) => (
// // // // //                     <MenuItem key={key} value={key}>
// // // // //                       <Stack direction="row" alignItems="center" spacing={1}>
// // // // //                         <Box sx={{ color: config.color }}>
// // // // //                           {config.icon}
// // // // //                         </Box>
// // // // //                         <Typography>{config.label}</Typography>
// // // // //                       </Stack>
// // // // //                     </MenuItem>
// // // // //                   ))}
// // // // //                 </Select>
// // // // //               </FormControl>
// // // // //             </Grid>
            
// // // // //             <Grid item xs={12} sm={6} md={2}>
// // // // //               <FormControl fullWidth size="medium">
// // // // //                 <InputLabel>Status</InputLabel>
// // // // //                 <Select
// // // // //                   value={filters.status}
// // // // //                   label="Status"
// // // // //                   onChange={(e) => handleFilterChange('status', e.target.value)}
// // // // //                   sx={{ borderRadius: 2 }}
// // // // //                 >
// // // // //                   {Object.entries(STATUS_TYPES).map(([key, config]) => (
// // // // //                     <MenuItem key={key} value={key}>
// // // // //                       <Stack direction="row" alignItems="center" spacing={1}>
// // // // //                         <Box sx={{ color: config.color }}>
// // // // //                           {config.icon}
// // // // //                         </Box>
// // // // //                         <Typography>{config.label}</Typography>
// // // // //                       </Stack>
// // // // //                     </MenuItem>
// // // // //                   ))}
// // // // //                 </Select>
// // // // //               </FormControl>
// // // // //             </Grid>
            
// // // // //             <Grid item xs={12} sm={6} md={2}>
// // // // //               <FormControl fullWidth size="medium">
// // // // //                 <InputLabel>Date Range</InputLabel>
// // // // //                 <Select
// // // // //                   value={filters.dateRange}
// // // // //                   label="Date Range"
// // // // //                   onChange={(e) => handleFilterChange('dateRange', e.target.value)}
// // // // //                   sx={{ borderRadius: 2 }}
// // // // //                 >
// // // // //                   {Object.entries(DATE_RANGES).map(([key, config]) => (
// // // // //                     <MenuItem key={key} value={key}>
// // // // //                       <Stack direction="row" alignItems="center" spacing={1}>
// // // // //                         {config.icon && (
// // // // //                           <Box sx={{ color: 'primary.main' }}>
// // // // //                             {config.icon}
// // // // //                           </Box>
// // // // //                         )}
// // // // //                         <Typography>{config.label}</Typography>
// // // // //                       </Stack>
// // // // //                     </MenuItem>
// // // // //                   ))}
// // // // //                 </Select>
// // // // //               </FormControl>
// // // // //             </Grid>
            
// // // // //             <Grid item xs={12} sm={6} md={2}>
// // // // //               <FormControl fullWidth size="medium">
// // // // //                 <InputLabel>Rows per page</InputLabel>
// // // // //                 <Select
// // // // //                   value={pagination.limit}
// // // // //                   label="Rows per page"
// // // // //                   onChange={handleLimitChange}
// // // // //                   sx={{ borderRadius: 2 }}
// // // // //                 >
// // // // //                   <MenuItem value={5}>5</MenuItem>
// // // // //                   <MenuItem value={10}>10</MenuItem>
// // // // //                   <MenuItem value={25}>25</MenuItem>
// // // // //                   <MenuItem value={50}>50</MenuItem>
// // // // //                 </Select>
// // // // //               </FormControl>
// // // // //             </Grid>
// // // // //           </Grid>
// // // // //         </CardContent>
// // // // //       </Card>

// // // // //       {/* Error Alert */}
// // // // //       {error && (
// // // // //         <Alert 
// // // // //           severity="error" 
// // // // //           sx={{ 
// // // // //             mb: 3,
// // // // //             borderRadius: 2,
// // // // //             boxShadow: '0 2px 12px rgba(239,68,68,0.1)'
// // // // //           }} 
// // // // //           onClose={() => setError(null)}
// // // // //         >
// // // // //           {error}
// // // // //         </Alert>
// // // // //       )}

// // // // //       {/* Transactions Table */}
// // // // //       <Card sx={{ 
// // // // //         borderRadius: 2,
// // // // //         boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
// // // // //         border: '1px solid rgba(0,0,0,0.05)',
// // // // //         overflow: 'hidden',
// // // // //         background: 'rgba(255, 255, 255, 0.95)'
// // // // //       }}>
// // // // //         <CardContent sx={{ p: 0 }}>
// // // // //           {loading && transactions.length === 0 ? (
// // // // //             <Box sx={{ p: 6, textAlign: 'center' }}>
// // // // //               <CircularProgress size={40} />
// // // // //               <Typography variant="body2" sx={{ mt: 2 }} color="text.secondary">
// // // // //                 Loading transactions...
// // // // //               </Typography>
// // // // //             </Box>
// // // // //           ) : (
// // // // //             <>
// // // // //               <TableContainer>
// // // // //                 <Table>
// // // // //                   <TableHead>
// // // // //                     <TableRow sx={{ 
// // // // //                       bgcolor: 'rgba(99, 102, 241, 0.04)',
// // // // //                       '& th': { 
// // // // //                         borderBottom: '2px solid rgba(99, 102, 241, 0.1)',
// // // // //                         fontWeight: 600 
// // // // //                       }
// // // // //                     }}>
// // // // //                       <TableCell>
// // // // //                         <Typography variant="subtitle2" fontWeight={600} color="primary.main">
// // // // //                           Event Type
// // // // //                         </Typography>
// // // // //                       </TableCell>
// // // // //                       <TableCell>
// // // // //                         <Typography variant="subtitle2" fontWeight={600} color="primary.main">
// // // // //                           Transaction ID
// // // // //                         </Typography>
// // // // //                       </TableCell>
// // // // //                       <TableCell>
// // // // //                         <Typography variant="subtitle2" fontWeight={600} color="primary.main">
// // // // //                           User
// // // // //                         </Typography>
// // // // //                       </TableCell>
// // // // //                       <TableCell>
// // // // //                         <Stack direction="row" alignItems="center" spacing={0.5}>
// // // // //                           <Typography variant="subtitle2" fontWeight={600} color="primary.main">
// // // // //                             Amount
// // // // //                           </Typography>
// // // // //                           <IconButton 
// // // // //                             size="small" 
// // // // //                             onClick={() => handleSort('amount')}
// // // // //                             sx={{ 
// // // // //                               color: sortConfig.field === 'amount' ? 'primary.main' : 'inherit'
// // // // //                             }}
// // // // //                           >
// // // // //                             {sortConfig.field === 'amount' && sortConfig.direction === 'asc' ? 
// // // // //                               <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
// // // // //                           </IconButton>
// // // // //                         </Stack>
// // // // //                       </TableCell>
// // // // //                       <TableCell>
// // // // //                         <Typography variant="subtitle2" fontWeight={600} color="primary.main">
// // // // //                           Status
// // // // //                         </Typography>
// // // // //                       </TableCell>
// // // // //                       <TableCell>
// // // // //                         <Stack direction="row" alignItems="center" spacing={0.5}>
// // // // //                           <Typography variant="subtitle2" fontWeight={600} color="primary.main">
// // // // //                             Date & Time
// // // // //                           </Typography>
// // // // //                           <IconButton 
// // // // //                             size="small" 
// // // // //                             onClick={() => handleSort('createdAt')}
// // // // //                             sx={{ 
// // // // //                               color: sortConfig.field === 'createdAt' ? 'primary.main' : 'inherit'
// // // // //                             }}
// // // // //                           >
// // // // //                             {sortConfig.field === 'createdAt' && sortConfig.direction === 'asc' ? 
// // // // //                               <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
// // // // //                           </IconButton>
// // // // //                         </Stack>
// // // // //                       </TableCell>
// // // // //                       <TableCell>
// // // // //                         <Typography variant="subtitle2" fontWeight={600} color="primary.main">
// // // // //                           Actions
// // // // //                         </Typography>
// // // // //                       </TableCell>
// // // // //                     </TableRow>
// // // // //                   </TableHead>
// // // // //                   <TableBody>
// // // // //                     {transactions.length === 0 ? (
// // // // //                       <TableRow>
// // // // //                         <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
// // // // //                           <FilterIcon sx={{ fontSize: 64, color: 'rgba(99, 102, 241, 0.3)', mb: 2 }} />
// // // // //                           <Typography variant="h6" color="text.secondary" gutterBottom>
// // // // //                             No transactions found
// // // // //                           </Typography>
// // // // //                           <Typography variant="body2" color="text.secondary">
// // // // //                             Try adjusting your filters or search criteria
// // // // //                           </Typography>
// // // // //                         </TableCell>
// // // // //                       </TableRow>
// // // // //                     ) : (
// // // // //                       transactions.map((transaction, index) => {
// // // // //                         const eventConfig = getEventConfig(transaction.eventType);
// // // // //                         const statusConfig = getStatusConfig(transaction.status);
                        
// // // // //                         return (
// // // // //                           <TableRow 
// // // // //                             key={transaction._id || transaction.transactionId || index}
// // // // //                             hover
// // // // //                             sx={{ 
// // // // //                               '&:last-child td, &:last-child th': { border: 0 },
// // // // //                               '&:hover': { 
// // // // //                                 bgcolor: 'rgba(99, 102, 241, 0.02)',
// // // // //                                 boxShadow: 'inset 0 0 0 1px rgba(99, 102, 241, 0.1)'
// // // // //                               }
// // // // //                             }}
// // // // //                           >
// // // // //                             <TableCell>
// // // // //                               <Stack direction="row" alignItems="center" spacing={1.5}>
// // // // //                                 <Box sx={{ 
// // // // //                                   p: 1.5,
// // // // //                                   borderRadius: 1.5,
// // // // //                                   bgcolor: eventConfig.bgColor,
// // // // //                                   display: 'flex',
// // // // //                                   alignItems: 'center',
// // // // //                                   justifyContent: 'center',
// // // // //                                   boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
// // // // //                                 }}>
// // // // //                                   <Box sx={{ color: eventConfig.color }}>
// // // // //                                     {eventConfig.icon}
// // // // //                                   </Box>
// // // // //                                 </Box>
// // // // //                                 <Box>
// // // // //                                   <Typography variant="body2" fontWeight={600}>
// // // // //                                     {eventConfig.label}
// // // // //                                   </Typography>
// // // // //                                   <Typography variant="caption" color="text.secondary">
// // // // //                                     {transaction.eventType || 'N/A'}
// // // // //                                   </Typography>
// // // // //                                 </Box>
// // // // //                               </Stack>
// // // // //                             </TableCell>
// // // // //                             <TableCell>
// // // // //                               <Stack direction="row" alignItems="center" spacing={1}>
// // // // //                                 <Typography 
// // // // //                                   variant="body2" 
// // // // //                                   sx={{ 
// // // // //                                     fontFamily: 'monospace',
// // // // //                                     fontSize: '0.75rem',
// // // // //                                     color: 'text.secondary',
// // // // //                                     fontWeight: 500
// // // // //                                   }}
// // // // //                                 >
// // // // //                                   {transaction.transactionId?.slice(0, 12)}...
// // // // //                                 </Typography>
// // // // //                                 <Tooltip title="Copy ID">
// // // // //                                   <IconButton 
// // // // //                                     size="small" 
// // // // //                                     onClick={() => copyToClipboard(transaction.transactionId)}
// // // // //                                     sx={{ 
// // // // //                                       color: 'primary.light',
// // // // //                                       '&:hover': { color: 'primary.main' }
// // // // //                                     }}
// // // // //                                   >
// // // // //                                     <CopyIcon fontSize="small" />
// // // // //                                   </IconButton>
// // // // //                                 </Tooltip>
// // // // //                               </Stack>
// // // // //                             </TableCell>
// // // // //                             <TableCell>
// // // // //                               <Stack>
// // // // //                                 <Typography variant="body2" fontWeight={600}>
// // // // //                                   {transaction.userName || 'N/A'}
// // // // //                                 </Typography>
// // // // //                                 <Typography variant="caption" color="text.secondary">
// // // // //                                   ID: {transaction.userId?.slice(0, 8) || 'N/A'}...
// // // // //                                 </Typography>
// // // // //                               </Stack>
// // // // //                             </TableCell>
// // // // //                             <TableCell>
// // // // //                               <Typography 
// // // // //                                 variant="body2" 
// // // // //                                 fontWeight={700}
// // // // //                                 color={transaction.amount > 0 ? 'success.main' : 'error.main'}
// // // // //                               >
// // // // //                                 {formatAmount(transaction.amount, transaction.currency)}
// // // // //                               </Typography>
// // // // //                             </TableCell>
// // // // //                             <TableCell>
// // // // //                               <Chip
// // // // //                                 icon={statusConfig.icon}
// // // // //                                 label={statusConfig.label}
// // // // //                                 size="small"
// // // // //                                 sx={{ 
// // // // //                                   fontWeight: 600,
// // // // //                                   bgcolor: alpha(statusConfig.color, 0.1),
// // // // //                                   color: statusConfig.color,
// // // // //                                   border: `1px solid ${alpha(statusConfig.color, 0.2)}`,
// // // // //                                   '& .MuiChip-icon': {
// // // // //                                     color: statusConfig.color
// // // // //                                   }
// // // // //                                 }}
// // // // //                               />
// // // // //                             </TableCell>
// // // // //                             <TableCell>
// // // // //                               <Stack>
// // // // //                                 <Typography variant="body2" fontWeight={600}>
// // // // //                                   {formatDate(transaction.createdAt, 'MMM D, YYYY') || 'N/A'}
// // // // //                                 </Typography>
// // // // //                                 <Typography variant="caption" color="text.secondary">
// // // // //                                   {formatDate(transaction.createdAt, 'h:mm A') || 'N/A'}
// // // // //                                 </Typography>
// // // // //                               </Stack>
// // // // //                             </TableCell>
// // // // //                             <TableCell>
// // // // //                               <Stack direction="row" spacing={0.5}>
// // // // //                                 <Tooltip title="View details">
// // // // //                                   <IconButton 
// // // // //                                     size="small" 
// // // // //                                     onClick={() => handleViewTransaction(transaction)}
// // // // //                                     sx={{ 
// // // // //                                       color: 'primary.light',
// // // // //                                       '&:hover': { 
// // // // //                                         color: 'primary.main',
// // // // //                                         bgcolor: 'rgba(99, 102, 241, 0.1)'
// // // // //                                       }
// // // // //                                     }}
// // // // //                                   >
// // // // //                                     <ViewIcon fontSize="small" />
// // // // //                                   </IconButton>
// // // // //                                 </Tooltip>
// // // // //                                 <Tooltip title="More options">
// // // // //                                   <IconButton size="small">
// // // // //                                     <MoreIcon />
// // // // //                                   </IconButton>
// // // // //                                 </Tooltip>
// // // // //                               </Stack>
// // // // //                             </TableCell>
// // // // //                           </TableRow>
// // // // //                         );
// // // // //                       })
// // // // //                     )}
// // // // //                   </TableBody>
// // // // //                 </Table>
// // // // //               </TableContainer>
              
// // // // //               {/* Pagination */}
// // // // //               {transactions.length > 0 && (
// // // // //                 <TablePagination
// // // // //                   component="div"
// // // // //                   count={pagination.total}
// // // // //                   page={pagination.page}
// // // // //                   onPageChange={handlePageChange}
// // // // //                   rowsPerPage={pagination.limit}
// // // // //                   onRowsPerPageChange={handleLimitChange}
// // // // //                   rowsPerPageOptions={[5, 10, 25, 50]}
// // // // //                   sx={{ 
// // // // //                     borderTop: '1px solid rgba(0,0,0,0.08)',
// // // // //                     px: 3,
// // // // //                     py: 2,
// // // // //                     '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
// // // // //                       fontWeight: 500
// // // // //                     }
// // // // //                   }}
// // // // //                 />
// // // // //               )}
// // // // //             </>
// // // // //           )}
// // // // //         </CardContent>
// // // // //       </Card>

// // // // //       {/* Footer */}
// // // // //       <Box sx={{ 
// // // // //         mt: 4, 
// // // // //         pt: 3, 
// // // // //         borderTop: '1px solid rgba(0,0,0,0.08)' 
// // // // //       }}>
// // // // //         <Stack direction="row" justifyContent="space-between" alignItems="center">
// // // // //           <Typography variant="caption" color="text.secondary">
// // // // //             Showing {transactions.length} of {pagination.total} transactions
// // // // //           </Typography>
// // // // //           <Stack direction="row" alignItems="center" spacing={1}>
// // // // //             <Typography variant="caption" color="text.secondary">
// // // // //               Business ID:
// // // // //             </Typography>
// // // // //             <Chip
// // // // //               label={businessId?.slice(0, 16) + '...'}
// // // // //               size="small"
// // // // //               sx={{ 
// // // // //                 fontFamily: 'monospace',
// // // // //                 fontWeight: 500,
// // // // //                 bgcolor: 'rgba(99, 102, 241, 0.1)',
// // // // //                 color: 'primary.main'
// // // // //               }}
// // // // //             />
// // // // //           </Stack>
// // // // //         </Stack>
// // // // //       </Box>

// // // // //       {/* Transaction Detail Dialog */}
// // // // //       <Dialog 
// // // // //         open={viewDialogOpen} 
// // // // //         onClose={handleCloseDialog}
// // // // //         maxWidth="md"
// // // // //         fullWidth
// // // // //       >
// // // // //         <DialogTitle>
// // // // //           <Stack direction="row" alignItems="center" spacing={2}>
// // // // //             {selectedTransaction && (
// // // // //               <>
// // // // //                 <Box sx={{ 
// // // // //                   p: 1.5,
// // // // //                   borderRadius: 1.5,
// // // // //                   bgcolor: getEventConfig(selectedTransaction.eventType).bgColor,
// // // // //                   display: 'flex',
// // // // //                   alignItems: 'center',
// // // // //                   justifyContent: 'center'
// // // // //                 }}>
// // // // //                   <Box sx={{ color: getEventConfig(selectedTransaction.eventType).color }}>
// // // // //                     {getEventConfig(selectedTransaction.eventType).icon}
// // // // //                   </Box>
// // // // //                 </Box>
// // // // //                 <Box>
// // // // //                   <Typography variant="h6" fontWeight={600}>
// // // // //                     Transaction Details
// // // // //                   </Typography>
// // // // //                   <Typography variant="body2" color="text.secondary">
// // // // //                     {selectedTransaction.transactionId}
// // // // //                   </Typography>
// // // // //                 </Box>
// // // // //               </>
// // // // //             )}
// // // // //           </Stack>
// // // // //         </DialogTitle>
// // // // //         <DialogContent dividers>
// // // // //           {selectedTransaction && (
// // // // //             <Grid container spacing={3}>
// // // // //               <Grid item xs={12} md={6}>
// // // // //                 <Typography variant="subtitle2" color="text.secondary" gutterBottom>
// // // // //                   Basic Information
// // // // //                 </Typography>
// // // // //                 <Stack spacing={2}>
// // // // //                   <Box>
// // // // //                     <Typography variant="caption" color="text.secondary">
// // // // //                       Transaction ID
// // // // //                     </Typography>
// // // // //                     <Stack direction="row" alignItems="center" spacing={1}>
// // // // //                       <Typography variant="body2" fontWeight={500}>
// // // // //                         {selectedTransaction.transactionId || 'N/A'}
// // // // //                       </Typography>
// // // // //                       <IconButton 
// // // // //                         size="small" 
// // // // //                         onClick={() => copyToClipboard(selectedTransaction.transactionId)}
// // // // //                       >
// // // // //                         <CopyIcon fontSize="small" />
// // // // //                       </IconButton>
// // // // //                     </Stack>
// // // // //                   </Box>
// // // // //                   <Box>
// // // // //                     <Typography variant="caption" color="text.secondary">
// // // // //                       Event Type
// // // // //                     </Typography>
// // // // //                     <Typography variant="body2" fontWeight={500}>
// // // // //                       {selectedTransaction.eventType || 'N/A'}
// // // // //                     </Typography>
// // // // //                   </Box>
// // // // //                   <Box>
// // // // //                     <Typography variant="caption" color="text.secondary">
// // // // //                       Status
// // // // //                     </Typography>
// // // // //                     <Chip
// // // // //                       icon={getStatusConfig(selectedTransaction.status).icon}
// // // // //                       label={getStatusConfig(selectedTransaction.status).label}
// // // // //                       size="small"
// // // // //                       sx={{ 
// // // // //                         mt: 0.5,
// // // // //                         fontWeight: 500,
// // // // //                         bgcolor: alpha(getStatusConfig(selectedTransaction.status).color, 0.1),
// // // // //                         color: getStatusConfig(selectedTransaction.status).color
// // // // //                       }}
// // // // //                     />
// // // // //                   </Box>
// // // // //                 </Stack>
// // // // //               </Grid>
              
// // // // //               <Grid item xs={12} md={6}>
// // // // //                 <Typography variant="subtitle2" color="text.secondary" gutterBottom>
// // // // //                   Financial Details
// // // // //                 </Typography>
// // // // //                 <Stack spacing={2}>
// // // // //                   <Box>
// // // // //                     <Typography variant="caption" color="text.secondary">
// // // // //                       Amount
// // // // //                     </Typography>
// // // // //                     <Typography 
// // // // //                       variant="h6" 
// // // // //                       fontWeight={600}
// // // // //                       color={selectedTransaction.amount > 0 ? 'success.main' : 'error.main'}
// // // // //                     >
// // // // //                       {formatAmount(selectedTransaction.amount, selectedTransaction.currency)}
// // // // //                     </Typography>
// // // // //                   </Box>
// // // // //                   <Box>
// // // // //                     <Typography variant="caption" color="text.secondary">
// // // // //                       Currency
// // // // //                     </Typography>
// // // // //                     <Typography variant="body2" fontWeight={500}>
// // // // //                       {selectedTransaction.currency || 'N/A'}
// // // // //                     </Typography>
// // // // //                   </Box>
// // // // //                   <Box>
// // // // //                     <Typography variant="caption" color="text.secondary">
// // // // //                       Created At
// // // // //                     </Typography>
// // // // //                     <Typography variant="body2" fontWeight={500}>
// // // // //                       {formatDate(selectedTransaction.createdAt, 'MMM D, YYYY h:mm A') || 'N/A'}
// // // // //                     </Typography>
// // // // //                   </Box>
// // // // //                 </Stack>
// // // // //               </Grid>
              
// // // // //               <Grid item xs={12}>
// // // // //                 <Typography variant="subtitle2" color="text.secondary" gutterBottom>
// // // // //                   User Information
// // // // //                 </Typography>
// // // // //                 <Stack spacing={2}>
// // // // //                   <Box>
// // // // //                     <Typography variant="caption" color="text.secondary">
// // // // //                       User Name
// // // // //                     </Typography>
// // // // //                     <Typography variant="body2" fontWeight={500}>
// // // // //                       {selectedTransaction.userName || 'N/A'}
// // // // //                     </Typography>
// // // // //                   </Box>
// // // // //                   <Box>
// // // // //                     <Typography variant="caption" color="text.secondary">
// // // // //                       User ID
// // // // //                     </Typography>
// // // // //                     <Stack direction="row" alignItems="center" spacing={1}>
// // // // //                       <Typography variant="body2" fontWeight={500}>
// // // // //                         {selectedTransaction.userId || 'N/A'}
// // // // //                       </Typography>
// // // // //                       {selectedTransaction.userId && (
// // // // //                         <IconButton 
// // // // //                           size="small" 
// // // // //                           onClick={() => copyToClipboard(selectedTransaction.userId)}
// // // // //                         >
// // // // //                           <CopyIcon fontSize="small" />
// // // // //                         </IconButton>
// // // // //                       )}
// // // // //                     </Stack>
// // // // //                   </Box>
// // // // //                 </Stack>
// // // // //               </Grid>
              
// // // // //               {selectedTransaction.description && (
// // // // //                 <Grid item xs={12}>
// // // // //                   <Typography variant="subtitle2" color="text.secondary" gutterBottom>
// // // // //                     Description
// // // // //                   </Typography>
// // // // //                   <Paper 
// // // // //                     variant="outlined" 
// // // // //                     sx={{ 
// // // // //                       p: 2,
// // // // //                       bgcolor: 'rgba(0,0,0,0.02)',
// // // // //                       borderRadius: 1.5
// // // // //                     }}
// // // // //                   >
// // // // //                     <Typography variant="body2">
// // // // //                       {selectedTransaction.description}
// // // // //                     </Typography>
// // // // //                   </Paper>
// // // // //                 </Grid>
// // // // //               )}
// // // // //             </Grid>
// // // // //           )}
// // // // //         </DialogContent>
// // // // //         <DialogActions sx={{ px: 3, py: 2 }}>
// // // // //           <Button onClick={handleCloseDialog}>
// // // // //             Close
// // // // //           </Button>
// // // // //           <Button 
// // // // //             variant="contained" 
// // // // //             endIcon={<ArrowForwardIcon />}
// // // // //             sx={{ 
// // // // //               background: 'linear-gradient(45deg, #6366F1, #8B5CF6)',
// // // // //               '&:hover': {
// // // // //                 background: 'linear-gradient(45deg, #4F46E5, #7C3AED)'
// // // // //               }
// // // // //             }}
// // // // //           >
// // // // //             View Full Report
// // // // //           </Button>
// // // // //         </DialogActions>
// // // // //       </Dialog>
// // // // //     </Container>
// // // // //   );
// // // // // };

// // // // // export default BusinessTransactions;

// // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // import {
// // // //   Box,
// // // //   Container,
// // // //   Typography,
// // // //   Table,
// // // //   TableBody,
// // // //   TableCell,
// // // //   TableContainer,
// // // //   TableHead,
// // // //   TableRow,
// // // //   TablePagination,
// // // //   Chip,
// // // //   Card,
// // // //   CardContent,
// // // //   CircularProgress,
// // // //   Alert,
// // // //   IconButton,
// // // //   Stack,
// // // //   Select,
// // // //   MenuItem,
// // // //   FormControl,
// // // //   InputLabel,
// // // //   TextField,
// // // //   InputAdornment,
// // // //   Grid,
// // // //   Tooltip,
// // // //   alpha,
// // // //   Button,
// // // //   Dialog,
// // // //   DialogTitle,
// // // //   DialogContent,
// // // //   DialogActions,
// // // //   Paper
// // // // } from '@mui/material';
// // // // import {
// // // //   Refresh as RefreshIcon,
// // // //   Search as SearchIcon,
// // // //   FilterList as FilterIcon,
// // // //   Download as DownloadIcon,
// // // //   Payment as PaymentIcon,
// // // //   Login as LoginIcon,
// // // //   AccountCircle as UserIcon,
// // // //   Security as SecurityIcon,
// // // //   Settings as SettingsIcon,
// // // //   ShoppingCart as CartIcon,
// // // //   ArrowUpward,
// // // //   ArrowDownward,
// // // //   MoreVert as MoreIcon,
// // // //   CheckCircle,
// // // //   Error as ErrorIcon,
// // // //   Pending as PendingIcon,
// // // //   Info as InfoIcon,
// // // //   ContentCopy as CopyIcon,
// // // //   Visibility as ViewIcon,
// // // //   CalendarToday as CalendarIcon,
// // // //   Timeline as TimelineIcon,
// // // //   ArrowForward as ArrowForwardIcon
// // // // } from '@mui/icons-material';

// // // // import { businessAuthService } from '../services/businessAuth';
// // // // import { formatDate } from '../utils/formatters';

// // // // const BusinessTransactions = () => {
// // // //   const [allTransactions, setAllTransactions] = useState([]); // Store all transactions
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);
// // // //   const [filters, setFilters] = useState({
// // // //     eventType: 'ALL',
// // // //     status: 'ALL',
// // // //     search: '',
// // // //     dateRange: 'ALL'
// // // //   });
// // // //   const [businessId, setBusinessId] = useState('');
// // // //   const [pagination, setPagination] = useState({
// // // //     page: 0,
// // // //     limit: 10,
// // // //     total: 0
// // // //   });
// // // //   const [sortConfig, setSortConfig] = useState({
// // // //     field: 'createdAt',
// // // //     direction: 'desc'
// // // //   });
// // // //   const [selectedTransaction, setSelectedTransaction] = useState(null);
// // // //   const [viewDialogOpen, setViewDialogOpen] = useState(false);

// // // //   // Event types configuration
// // // //   const EVENT_TYPES = {
// // // //     ALL: { label: 'All Events', icon: <FilterIcon fontSize="small" />, color: '#6366F1', bgColor: '#E0E7FF' },
// // // //     PAYMENT: { label: 'Payment', icon: <PaymentIcon fontSize="small" />, color: '#10B981', bgColor: '#D1FAE5' },
// // // //     LOGIN: { label: 'Login', icon: <LoginIcon fontSize="small" />, color: '#3B82F6', bgColor: '#DBEAFE' },
// // // //     USER_CREATED: { label: 'User Created', icon: <UserIcon fontSize="small" />, color: '#8B5CF6', bgColor: '#EDE9FE' },
// // // //     SECURITY_ALERT: { label: 'Security Alert', icon: <SecurityIcon fontSize="small" />, color: '#EF4444', bgColor: '#FEE2E2' },
// // // //     SETTINGS_CHANGE: { label: 'Settings Change', icon: <SettingsIcon fontSize="small" />, color: '#F59E0B', bgColor: '#FEF3C7' },
// // // //     SUBSCRIPTION: { label: 'Subscription', icon: <CartIcon fontSize="small" />, color: '#EC4899', bgColor: '#FCE7F3' },
// // // //     API_CALL: { label: 'API Call', icon: <SettingsIcon fontSize="small" />, color: '#6366F1', bgColor: '#E0E7FF' },
// // // //     DATA_EXPORT: { label: 'Data Export', icon: <DownloadIcon fontSize="small" />, color: '#14B8A6', bgColor: '#CCFBF1' }
// // // //   };

// // // //   const STATUS_TYPES = {
// // // //     ALL: { label: 'All Status', icon: <FilterIcon fontSize="small" />, color: '#6B7280', bgColor: '#F3F4F6' },
// // // //     SUCCESS: { label: 'Success', icon: <CheckCircle fontSize="small" />, color: '#10B981' },
// // // //     PENDING: { label: 'Pending', icon: <PendingIcon fontSize="small" />, color: '#F59E0B' },
// // // //     FAILED: { label: 'Failed', icon: <ErrorIcon fontSize="small" />, color: '#EF4444' },
// // // //     APPROVED: { label: 'Approved', icon: <CheckCircle fontSize="small" />, color: '#10B981' },
// // // //     REJECTED: { label: 'Rejected', icon: <ErrorIcon fontSize="small" />, color: '#EF4444' },
// // // //     PROCESSING: { label: 'Processing', icon: <PendingIcon fontSize="small" />, color: '#6366F1' }
// // // //   };

// // // //   const DATE_RANGES = {
// // // //     ALL: { label: 'All Time', icon: <CalendarIcon fontSize="small" /> },
// // // //     TODAY: { label: 'Today', icon: <CalendarIcon fontSize="small" /> },
// // // //     '7DAYS': { label: 'Last 7 Days', icon: <CalendarIcon fontSize="small" /> },
// // // //     '30DAYS': { label: 'Last 30 Days', icon: <CalendarIcon fontSize="small" /> },
// // // //     '90DAYS': { label: 'Last 90 Days', icon: <CalendarIcon fontSize="small" /> }
// // // //   };

// // // //   // Get businessId from localStorage
// // // //   useEffect(() => {
// // // //     const userStr = localStorage.getItem('user');
// // // //     if (userStr) {
// // // //       try {
// // // //         const user = JSON.parse(userStr);
// // // //         const bid = user.businessId || user.businessID || user.id;
// // // //         if (bid) {
// // // //           setBusinessId(bid);
// // // //         } else {
// // // //           setError('Business ID not found in user profile');
// // // //           setLoading(false);
// // // //         }
// // // //       } catch (error) {
// // // //         setError('Failed to load user data');
// // // //         setLoading(false);
// // // //       }
// // // //     } else {
// // // //       setError('User not found. Please login again.');
// // // //       setLoading(false);
// // // //     }
// // // //   }, []);

// // // //   const fetchTransactions = useCallback(async () => {
// // // //     if (!businessId) {
// // // //       setError('Business ID is required');
// // // //       return;
// // // //     }
    
// // // //     setLoading(true);
// // // //     setError(null);
    
// // // //     try {
// // // //       // Apply date filter
// // // //       let startDate;
// // // //       const now = new Date();
// // // //       switch(filters.dateRange) {
// // // //         case 'TODAY':
// // // //           startDate = new Date(now.setHours(0, 0, 0, 0));
// // // //           break;
// // // //         case '7DAYS':
// // // //           startDate = new Date(now.setDate(now.getDate() - 7));
// // // //           break;
// // // //         case '30DAYS':
// // // //           startDate = new Date(now.setDate(now.getDate() - 30));
// // // //           break;
// // // //         case '90DAYS':
// // // //           startDate = new Date(now.setDate(now.getDate() - 90));
// // // //           break;
// // // //         default:
// // // //           startDate = undefined;
// // // //       }

// // // //       const result = await businessAuthService.getBusinessTransactions(
// // // //         businessId,
// // // //         filters.eventType === 'ALL' ? undefined : filters.eventType,
// // // //         pagination.page + 1, 
// // // //         pagination.limit,
// // // //         filters.status === 'ALL' ? undefined : filters.status,
// // // //         filters.search || undefined,
// // // //         startDate
// // // //       );
      
// // // //       if (result.success) {
// // // //         // Store all transactions
// // // //         setAllTransactions(result.data || []);
        
// // // //         // Apply client-side search filter if needed
// // // //         let filteredData = result.data || [];
        
// // // //         // Apply search filter client-side for better UX
// // // //         if (filters.search) {
// // // //           const searchLower = filters.search.toLowerCase();
// // // //           filteredData = filteredData.filter(transaction => 
// // // //             // Search across multiple fields
// // // //             (transaction.transactionId?.toLowerCase() || '').includes(searchLower) ||
// // // //             (getUserName(transaction)?.toLowerCase() || '').includes(searchLower) ||
// // // //             (transaction.eventType?.toLowerCase() || '').includes(searchLower) ||
// // // //             (transaction.status?.toLowerCase() || '').includes(searchLower) ||
// // // //             (transaction.description?.toLowerCase() || '').includes(searchLower) ||
// // // //             (formatAmount(transaction.amount, transaction.currency)?.toLowerCase() || '').includes(searchLower)
// // // //           );
// // // //         }
        
// // // //         // Sort transactions
// // // //         if (sortConfig.field) {
// // // //           filteredData.sort((a, b) => {
// // // //             let aVal = a[sortConfig.field] || '';
// // // //             let bVal = b[sortConfig.field] || '';
            
// // // //             if (sortConfig.field === 'createdAt') {
// // // //               aVal = new Date(aVal);
// // // //               bVal = new Date(bVal);
// // // //             }
            
// // // //             if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
// // // //             if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
// // // //             return 0;
// // // //           });
// // // //         }
        
// // // //         setPagination(prev => ({
// // // //           ...prev,
// // // //           total: result.pagination?.total || filteredData.length
// // // //         }));
// // // //       } else {
// // // //         setError(result.error || 'Failed to fetch transactions');
// // // //       }
// // // //     } catch (err) {
// // // //       setError(err.message || 'An error occurred while fetching transactions');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   }, [businessId, filters, pagination.page, pagination.limit, sortConfig]);

// // // //   useEffect(() => {
// // // //     if (businessId) {
// // // //       fetchTransactions();
// // // //     }
// // // //   }, [businessId, filters, pagination.page, pagination.limit, sortConfig, fetchTransactions]);

// // // //   // Helper function to get user name from transaction (handles different field names)
// // // //   const getUserName = (transaction) => {
// // // //     return transaction.userName || transaction.name || transaction.user?.name || 
// // // //            transaction.customerName || transaction.clientName || 'Unknown User';
// // // //   };

// // // //   // Helper function to get user ID from transaction
// // // //   const getUserId = (transaction) => {
// // // //     return transaction.userId || transaction.user?.id || transaction.customerId || 
// // // //            transaction.clientId || 'N/A';
// // // //   };

// // // //   const handlePageChange = (event, newPage) => {
// // // //     setPagination(prev => ({ ...prev, page: newPage }));
// // // //   };

// // // //   const handleLimitChange = (event) => {
// // // //     setPagination(prev => ({ 
// // // //       ...prev, 
// // // //       limit: parseInt(event.target.value, 10),
// // // //       page: 0
// // // //     }));
// // // //   };

// // // //   const handleFilterChange = (filterName, value) => {
// // // //     setFilters(prev => ({ ...prev, [filterName]: value }));
// // // //     setPagination(prev => ({ ...prev, page: 0 }));
// // // //   };

// // // //   const handleSort = (field) => {
// // // //     setSortConfig(prev => ({
// // // //       field,
// // // //       direction: prev.field === field && prev.direction === 'desc' ? 'asc' : 'desc'
// // // //     }));
// // // //   };

// // // //   const handleRefresh = () => {
// // // //     fetchTransactions();
// // // //   };

// // // //   const handleViewTransaction = (transaction) => {
// // // //     setSelectedTransaction(transaction);
// // // //     setViewDialogOpen(true);
// // // //   };

// // // //   const handleCloseDialog = () => {
// // // //     setViewDialogOpen(false);
// // // //     setSelectedTransaction(null);
// // // //   };

// // // //   const copyToClipboard = (text) => {
// // // //     if (text && text !== 'N/A') {
// // // //       navigator.clipboard.writeText(text);
// // // //     }
// // // //   };

// // // //   const getEventConfig = (eventType) => {
// // // //     return EVENT_TYPES[eventType] || {
// // // //       label: eventType || 'Unknown',
// // // //       icon: <InfoIcon fontSize="small" />,
// // // //       color: '#6B7280',
// // // //       bgColor: '#F3F4F6'
// // // //     };
// // // //   };

// // // //   const getStatusConfig = (status) => {
// // // //     const statusUpper = status?.toUpperCase();
// // // //     return STATUS_TYPES[statusUpper] || {
// // // //       label: status || 'Unknown',
// // // //       icon: <InfoIcon fontSize="small" />,
// // // //       color: '#6B7280'
// // // //     };
// // // //   };

// // // //   const formatAmount = (amount, currency) => {
// // // //     if (amount === null || amount === undefined) return 'N/A';
// // // //     try {
// // // //       const numAmount = parseFloat(amount);
// // // //       if (isNaN(numAmount)) return 'N/A';
      
// // // //       return new Intl.NumberFormat('en-US', {
// // // //         style: 'currency',
// // // //         currency: currency || 'USD'
// // // //       }).format(numAmount);
// // // //     } catch (error) {
// // // //       return `$${parseFloat(amount).toFixed(2)}`;
// // // //     }
// // // //   };

// // // //   // Filter transactions based on current filters (client-side)
// // // //   const getFilteredTransactions = () => {
// // // //     let filtered = allTransactions;
    
// // // //     // Apply event type filter
// // // //     if (filters.eventType !== 'ALL') {
// // // //       filtered = filtered.filter(t => t.eventType === filters.eventType);
// // // //     }
    
// // // //     // Apply status filter
// // // //     if (filters.status !== 'ALL') {
// // // //       filtered = filtered.filter(t => t.status?.toUpperCase() === filters.status);
// // // //     }
    
// // // //     // Apply search filter
// // // //     if (filters.search) {
// // // //       const searchLower = filters.search.toLowerCase();
// // // //       filtered = filtered.filter(transaction => {
// // // //         // Search across all visible fields
// // // //         const searchFields = [
// // // //           transaction.transactionId,
// // // //           getUserName(transaction),
// // // //           transaction.eventType,
// // // //           transaction.status,
// // // //           transaction.description,
// // // //           formatAmount(transaction.amount, transaction.currency),
// // // //           getUserId(transaction),
// // // //           formatDate(transaction.createdAt, 'MMM D, YYYY'),
// // // //           formatDate(transaction.createdAt, 'h:mm A')
// // // //         ];
        
// // // //         return searchFields.some(field => 
// // // //           field && field.toString().toLowerCase().includes(searchLower)
// // // //         );
// // // //       });
// // // //     }
    
// // // //     // Apply sorting
// // // //     if (sortConfig.field) {
// // // //       filtered.sort((a, b) => {
// // // //         let aVal = a[sortConfig.field] || '';
// // // //         let bVal = b[sortConfig.field] || '';
        
// // // //         if (sortConfig.field === 'createdAt') {
// // // //           aVal = new Date(aVal);
// // // //           bVal = new Date(bVal);
// // // //         }
        
// // // //         if (sortConfig.field === 'amount') {
// // // //           aVal = parseFloat(aVal) || 0;
// // // //           bVal = parseFloat(bVal) || 0;
// // // //         }
        
// // // //         if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
// // // //         if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
// // // //         return 0;
// // // //       });
// // // //     }
    
// // // //     // Apply pagination
// // // //     const startIndex = pagination.page * pagination.limit;
// // // //     const endIndex = startIndex + pagination.limit;
    
// // // //     return {
// // // //       total: filtered.length,
// // // //       displayed: filtered.slice(startIndex, endIndex)
// // // //     };
// // // //   };

// // // //   const filteredData = getFilteredTransactions();
// // // //   const displayedTransactions = filteredData.displayed;
// // // //   const totalTransactions = filteredData.total;

// // // //   return (
// // // //     <Container maxWidth="xl" sx={{ 
// // // //       py: 4,
// // // //       minHeight: '100vh',
// // // //       background: 'linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)'
// // // //     }}>
// // // //       {/* Header */}
// // // //       <Box sx={{ mb: 4 }}>
// // // //         <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
// // // //           <Box>
// // // //             <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
// // // //               Transaction History
// // // //             </Typography>
// // // //             <Stack direction="row" alignItems="center" spacing={1}>
// // // //               <TimelineIcon sx={{ color: 'primary.main', fontSize: 20 }} />
// // // //               <Typography variant="body2" color="text.secondary">
// // // //                 Monitor and analyze all business activities and transactions
// // // //               </Typography>
// // // //             </Stack>
// // // //           </Box>
// // // //           <Stack direction="row" spacing={1}>
// // // //             <Button
// // // //               variant="outlined"
// // // //               startIcon={<RefreshIcon />}
// // // //               onClick={handleRefresh}
// // // //               disabled={loading}
// // // //               size="small"
// // // //             >
// // // //               Refresh
// // // //             </Button>
// // // //             <Button
// // // //               variant="contained"
// // // //               startIcon={<DownloadIcon />}
// // // //               size="small"
// // // //               sx={{ 
// // // //                 background: 'linear-gradient(45deg, #6366F1, #8B5CF6)',
// // // //                 '&:hover': {
// // // //                   background: 'linear-gradient(45deg, #4F46E5, #7C3AED)'
// // // //                 }
// // // //               }}
// // // //             >
// // // //               Export
// // // //             </Button>
// // // //           </Stack>
// // // //         </Stack>
// // // //       </Box>

// // // //       {/* Filters Card */}
// // // //       <Card sx={{ 
// // // //         mb: 4,
// // // //         borderRadius: 2,
// // // //         boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
// // // //         border: '1px solid rgba(0,0,0,0.05)',
// // // //         background: 'rgba(255, 255, 255, 0.9)'
// // // //       }}>
// // // //         <CardContent>
// // // //           <Grid container spacing={2} alignItems="center">
// // // //             <Grid item xs={12} md={4}>
// // // //               <TextField
// // // //                 fullWidth
// // // //                 size="medium"
// // // //                 placeholder="Search transactions by ID, user, type, amount, status..."
// // // //                 value={filters.search}
// // // //                 onChange={(e) => handleFilterChange('search', e.target.value)}
// // // //                 InputProps={{
// // // //                   startAdornment: (
// // // //                     <InputAdornment position="start">
// // // //                       <SearchIcon fontSize="small" color="primary" />
// // // //                     </InputAdornment>
// // // //                   ),
// // // //                   sx: { 
// // // //                     borderRadius: 2,
// // // //                     background: 'rgba(255, 255, 255, 0.8)'
// // // //                   }
// // // //                 }}
// // // //               />
// // // //             </Grid>
            
// // // //             <Grid item xs={12} sm={6} md={2}>
// // // //               <FormControl fullWidth size="medium">
// // // //                 <InputLabel>Event Type</InputLabel>
// // // //                 <Select
// // // //                   value={filters.eventType}
// // // //                   label="Event Type"
// // // //                   onChange={(e) => handleFilterChange('eventType', e.target.value)}
// // // //                   sx={{ borderRadius: 2 }}
// // // //                 >
// // // //                   {Object.entries(EVENT_TYPES).map(([key, config]) => (
// // // //                     <MenuItem key={key} value={key}>
// // // //                       <Stack direction="row" alignItems="center" spacing={1}>
// // // //                         <Box sx={{ color: config.color }}>
// // // //                           {config.icon}
// // // //                         </Box>
// // // //                         <Typography>{config.label}</Typography>
// // // //                       </Stack>
// // // //                     </MenuItem>
// // // //                   ))}
// // // //                 </Select>
// // // //               </FormControl>
// // // //             </Grid>
            
// // // //             <Grid item xs={12} sm={6} md={2}>
// // // //               <FormControl fullWidth size="medium">
// // // //                 <InputLabel>Status</InputLabel>
// // // //                 <Select
// // // //                   value={filters.status}
// // // //                   label="Status"
// // // //                   onChange={(e) => handleFilterChange('status', e.target.value)}
// // // //                   sx={{ borderRadius: 2 }}
// // // //                 >
// // // //                   {Object.entries(STATUS_TYPES).map(([key, config]) => (
// // // //                     <MenuItem key={key} value={key}>
// // // //                       <Stack direction="row" alignItems="center" spacing={1}>
// // // //                         <Box sx={{ color: config.color }}>
// // // //                           {config.icon}
// // // //                         </Box>
// // // //                         <Typography>{config.label}</Typography>
// // // //                       </Stack>
// // // //                     </MenuItem>
// // // //                   ))}
// // // //                 </Select>
// // // //               </FormControl>
// // // //             </Grid>
            
// // // //             <Grid item xs={12} sm={6} md={2}>
// // // //               <FormControl fullWidth size="medium">
// // // //                 <InputLabel>Date Range</InputLabel>
// // // //                 <Select
// // // //                   value={filters.dateRange}
// // // //                   label="Date Range"
// // // //                   onChange={(e) => handleFilterChange('dateRange', e.target.value)}
// // // //                   sx={{ borderRadius: 2 }}
// // // //                 >
// // // //                   {Object.entries(DATE_RANGES).map(([key, config]) => (
// // // //                     <MenuItem key={key} value={key}>
// // // //                       <Stack direction="row" alignItems="center" spacing={1}>
// // // //                         {config.icon && (
// // // //                           <Box sx={{ color: 'primary.main' }}>
// // // //                             {config.icon}
// // // //                           </Box>
// // // //                         )}
// // // //                         <Typography>{config.label}</Typography>
// // // //                       </Stack>
// // // //                     </MenuItem>
// // // //                   ))}
// // // //                 </Select>
// // // //               </FormControl>
// // // //             </Grid>
            
// // // //             <Grid item xs={12} sm={6} md={2}>
// // // //               <FormControl fullWidth size="medium">
// // // //                 <InputLabel>Rows per page</InputLabel>
// // // //                 <Select
// // // //                   value={pagination.limit}
// // // //                   label="Rows per page"
// // // //                   onChange={handleLimitChange}
// // // //                   sx={{ borderRadius: 2 }}
// // // //                 >
// // // //                   <MenuItem value={5}>5</MenuItem>
// // // //                   <MenuItem value={10}>10</MenuItem>
// // // //                   <MenuItem value={25}>25</MenuItem>
// // // //                   <MenuItem value={50}>50</MenuItem>
// // // //                 </Select>
// // // //               </FormControl>
// // // //             </Grid>
// // // //           </Grid>
// // // //         </CardContent>
// // // //       </Card>

// // // //       {/* Error Alert */}
// // // //       {error && (
// // // //         <Alert 
// // // //           severity="error" 
// // // //           sx={{ 
// // // //             mb: 3,
// // // //             borderRadius: 2,
// // // //             boxShadow: '0 2px 12px rgba(239,68,68,0.1)'
// // // //           }} 
// // // //           onClose={() => setError(null)}
// // // //         >
// // // //           {error}
// // // //         </Alert>
// // // //       )}

// // // //       {/* Transactions Table */}
// // // //       <Card sx={{ 
// // // //         borderRadius: 2,
// // // //         boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
// // // //         border: '1px solid rgba(0,0,0,0.05)',
// // // //         overflow: 'hidden',
// // // //         background: 'rgba(255, 255, 255, 0.95)'
// // // //       }}>
// // // //         <CardContent sx={{ p: 0 }}>
// // // //           {loading && allTransactions.length === 0 ? (
// // // //             <Box sx={{ p: 6, textAlign: 'center' }}>
// // // //               <CircularProgress size={40} />
// // // //               <Typography variant="body2" sx={{ mt: 2 }} color="text.secondary">
// // // //                 Loading transactions...
// // // //               </Typography>
// // // //             </Box>
// // // //           ) : (
// // // //             <>
// // // //               <TableContainer>
// // // //                 <Table>
// // // //                   <TableHead>
// // // //                     <TableRow sx={{ 
// // // //                       bgcolor: 'rgba(99, 102, 241, 0.04)',
// // // //                       '& th': { 
// // // //                         borderBottom: '2px solid rgba(99, 102, 241, 0.1)',
// // // //                         fontWeight: 600 
// // // //                       }
// // // //                     }}>
// // // //                       <TableCell>
// // // //                         <Typography variant="subtitle2" fontWeight={600} color="primary.main">
// // // //                           Event Type
// // // //                         </Typography>
// // // //                       </TableCell>
// // // //                       <TableCell>
// // // //                         <Typography variant="subtitle2" fontWeight={600} color="primary.main">
// // // //                           Transaction ID
// // // //                         </Typography>
// // // //                       </TableCell>
// // // //                       <TableCell>
// // // //                         <Typography variant="subtitle2" fontWeight={600} color="primary.main">
// // // //                           User
// // // //                         </Typography>
// // // //                       </TableCell>
// // // //                       <TableCell>
// // // //                         <Stack direction="row" alignItems="center" spacing={0.5}>
// // // //                           <Typography variant="subtitle2" fontWeight={600} color="primary.main">
// // // //                             Amount
// // // //                           </Typography>
// // // //                           <IconButton 
// // // //                             size="small" 
// // // //                             onClick={() => handleSort('amount')}
// // // //                             sx={{ 
// // // //                               color: sortConfig.field === 'amount' ? 'primary.main' : 'inherit'
// // // //                             }}
// // // //                           >
// // // //                             {sortConfig.field === 'amount' && sortConfig.direction === 'asc' ? 
// // // //                               <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
// // // //                           </IconButton>
// // // //                         </Stack>
// // // //                       </TableCell>
// // // //                       <TableCell>
// // // //                         <Typography variant="subtitle2" fontWeight={600} color="primary.main">
// // // //                           Status
// // // //                         </Typography>
// // // //                       </TableCell>
// // // //                       <TableCell>
// // // //                         <Stack direction="row" alignItems="center" spacing={0.5}>
// // // //                           <Typography variant="subtitle2" fontWeight={600} color="primary.main">
// // // //                             Date & Time
// // // //                           </Typography>
// // // //                           <IconButton 
// // // //                             size="small" 
// // // //                             onClick={() => handleSort('createdAt')}
// // // //                             sx={{ 
// // // //                               color: sortConfig.field === 'createdAt' ? 'primary.main' : 'inherit'
// // // //                             }}
// // // //                           >
// // // //                             {sortConfig.field === 'createdAt' && sortConfig.direction === 'asc' ? 
// // // //                               <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
// // // //                           </IconButton>
// // // //                         </Stack>
// // // //                       </TableCell>
// // // //                       <TableCell>
// // // //                         <Typography variant="subtitle2" fontWeight={600} color="primary.main">
// // // //                           Actions
// // // //                         </Typography>
// // // //                       </TableCell>
// // // //                     </TableRow>
// // // //                   </TableHead>
// // // //                   <TableBody>
// // // //                     {displayedTransactions.length === 0 ? (
// // // //                       <TableRow>
// // // //                         <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
// // // //                           <FilterIcon sx={{ fontSize: 64, color: 'rgba(99, 102, 241, 0.3)', mb: 2 }} />
// // // //                           <Typography variant="h6" color="text.secondary" gutterBottom>
// // // //                             {filters.search || filters.eventType !== 'ALL' || filters.status !== 'ALL' 
// // // //                               ? 'No transactions match your filters' 
// // // //                               : 'No transactions found'}
// // // //                           </Typography>
// // // //                           <Typography variant="body2" color="text.secondary">
// // // //                             {filters.search ? 'Try a different search term' : 'Try adjusting your filters'}
// // // //                           </Typography>
// // // //                         </TableCell>
// // // //                       </TableRow>
// // // //                     ) : (
// // // //                       displayedTransactions.map((transaction, index) => {
// // // //                         const eventConfig = getEventConfig(transaction.eventType);
// // // //                         const statusConfig = getStatusConfig(transaction.status);
// // // //                         const userName = getUserName(transaction);
// // // //                         const userId = getUserId(transaction);
                        
// // // //                         return (
// // // //                           <TableRow 
// // // //                             key={transaction._id || transaction.transactionId || `trans-${index}`}
// // // //                             hover
// // // //                             sx={{ 
// // // //                               '&:last-child td, &:last-child th': { border: 0 },
// // // //                               '&:hover': { 
// // // //                                 bgcolor: 'rgba(99, 102, 241, 0.02)'
// // // //                               }
// // // //                             }}
// // // //                           >
// // // //                             <TableCell>
// // // //                               <Stack direction="row" alignItems="center" spacing={1.5}>
// // // //                                 <Box sx={{ 
// // // //                                   p: 1.5,
// // // //                                   borderRadius: 1.5,
// // // //                                   bgcolor: eventConfig.bgColor,
// // // //                                   display: 'flex',
// // // //                                   alignItems: 'center',
// // // //                                   justifyContent: 'center'
// // // //                                 }}>
// // // //                                   <Box sx={{ color: eventConfig.color }}>
// // // //                                     {eventConfig.icon}
// // // //                                   </Box>
// // // //                                 </Box>
// // // //                                 <Box>
// // // //                                   <Typography variant="body2" fontWeight={600}>
// // // //                                     {eventConfig.label}
// // // //                                   </Typography>
// // // //                                   <Typography variant="caption" color="text.secondary">
// // // //                                     {transaction.eventType || 'N/A'}
// // // //                                   </Typography>
// // // //                                 </Box>
// // // //                               </Stack>
// // // //                             </TableCell>
// // // //                             <TableCell>
// // // //                               <Stack direction="row" alignItems="center" spacing={1}>
// // // //                                 <Typography 
// // // //                                   variant="body2" 
// // // //                                   sx={{ 
// // // //                                     fontFamily: 'monospace',
// // // //                                     fontSize: '0.75rem',
// // // //                                     color: 'text.secondary',
// // // //                                     fontWeight: 500
// // // //                                   }}
// // // //                                 >
// // // //                                   {transaction.transactionId ? 
// // // //                                     `${transaction.transactionId.slice(0, 12)}...` : 'N/A'}
// // // //                                 </Typography>
// // // //                                 {transaction.transactionId && (
// // // //                                   <Tooltip title="Copy ID">
// // // //                                     <IconButton 
// // // //                                       size="small" 
// // // //                                       onClick={() => copyToClipboard(transaction.transactionId)}
// // // //                                       sx={{ 
// // // //                                         color: 'primary.light',
// // // //                                         '&:hover': { color: 'primary.main' }
// // // //                                       }}
// // // //                                     >
// // // //                                       <CopyIcon fontSize="small" />
// // // //                                     </IconButton>
// // // //                                   </Tooltip>
// // // //                                 )}
// // // //                               </Stack>
// // // //                             </TableCell>
// // // //                             <TableCell>
// // // //                               <Stack>
// // // //                                 <Typography variant="body2" fontWeight={600}>
// // // //                                   {userName}
// // // //                                 </Typography>
// // // //                                 <Typography variant="caption" color="text.secondary">
// // // //                                   ID: {userId ? `${userId.slice(0, 8)}...` : 'N/A'}
// // // //                                 </Typography>
// // // //                               </Stack>
// // // //                             </TableCell>
// // // //                             <TableCell>
// // // //                               <Typography 
// // // //                                 variant="body2" 
// // // //                                 fontWeight={700}
// // // //                                 color={parseFloat(transaction.amount || 0) > 0 ? 'success.main' : 'error.main'}
// // // //                               >
// // // //                                 {formatAmount(transaction.amount, transaction.currency)}
// // // //                               </Typography>
// // // //                             </TableCell>
// // // //                             <TableCell>
// // // //                               <Chip
// // // //                                 icon={statusConfig.icon}
// // // //                                 label={statusConfig.label}
// // // //                                 size="small"
// // // //                                 sx={{ 
// // // //                                   fontWeight: 600,
// // // //                                   bgcolor: alpha(statusConfig.color, 0.1),
// // // //                                   color: statusConfig.color,
// // // //                                   border: `1px solid ${alpha(statusConfig.color, 0.2)}`,
// // // //                                   '& .MuiChip-icon': {
// // // //                                     color: statusConfig.color
// // // //                                   }
// // // //                                 }}
// // // //                               />
// // // //                             </TableCell>
// // // //                             <TableCell>
// // // //                               <Stack>
// // // //                                 <Typography variant="body2" fontWeight={600}>
// // // //                                   {formatDate(transaction.createdAt, 'MMM D, YYYY') || 'N/A'}
// // // //                                 </Typography>
// // // //                                 <Typography variant="caption" color="text.secondary">
// // // //                                   {formatDate(transaction.createdAt, 'h:mm A') || 'N/A'}
// // // //                                 </Typography>
// // // //                               </Stack>
// // // //                             </TableCell>
// // // //                             <TableCell>
// // // //                               <Stack direction="row" spacing={0.5}>
// // // //                                 <Tooltip title="View details">
// // // //                                   <IconButton 
// // // //                                     size="small" 
// // // //                                     onClick={() => handleViewTransaction(transaction)}
// // // //                                     sx={{ 
// // // //                                       color: 'primary.light',
// // // //                                       '&:hover': { 
// // // //                                         color: 'primary.main',
// // // //                                         bgcolor: 'rgba(99, 102, 241, 0.1)'
// // // //                                       }
// // // //                                     }}
// // // //                                   >
// // // //                                     <ViewIcon fontSize="small" />
// // // //                                   </IconButton>
// // // //                                 </Tooltip>
// // // //                               </Stack>
// // // //                             </TableCell>
// // // //                           </TableRow>
// // // //                         );
// // // //                       })
// // // //                     )}
// // // //                   </TableBody>
// // // //                 </Table>
// // // //               </TableContainer>
              
// // // //               {/* Pagination */}
// // // //               {displayedTransactions.length > 0 && (
// // // //                 <TablePagination
// // // //                   component="div"
// // // //                   count={totalTransactions}
// // // //                   page={pagination.page}
// // // //                   onPageChange={handlePageChange}
// // // //                   rowsPerPage={pagination.limit}
// // // //                   onRowsPerPageChange={handleLimitChange}
// // // //                   rowsPerPageOptions={[5, 10, 25, 50]}
// // // //                   sx={{ 
// // // //                     borderTop: '1px solid rgba(0,0,0,0.08)',
// // // //                     px: 3,
// // // //                     py: 2,
// // // //                     '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
// // // //                       fontWeight: 500
// // // //                     }
// // // //                   }}
// // // //                 />
// // // //               )}
// // // //             </>
// // // //           )}
// // // //         </CardContent>
// // // //       </Card>

// // // //       {/* Footer */}
// // // //       <Box sx={{ 
// // // //         mt: 4, 
// // // //         pt: 3, 
// // // //         borderTop: '1px solid rgba(0,0,0,0.08)' 
// // // //       }}>
// // // //         <Stack direction="row" justifyContent="space-between" alignItems="center">
// // // //           <Typography variant="caption" color="text.secondary">
// // // //             Showing {displayedTransactions.length} of {totalTransactions} transactions
// // // //             {filters.search && ` for "${filters.search}"`}
// // // //           </Typography>
// // // //           <Stack direction="row" alignItems="center" spacing={1}>
// // // //             <Typography variant="caption" color="text.secondary">
// // // //               Business ID:
// // // //             </Typography>
// // // //             <Chip
// // // //               label={businessId ? `${businessId.slice(0, 16)}...` : 'N/A'}
// // // //               size="small"
// // // //               sx={{ 
// // // //                 fontFamily: 'monospace',
// // // //                 fontWeight: 500,
// // // //                 bgcolor: 'rgba(99, 102, 241, 0.1)',
// // // //                 color: 'primary.main'
// // // //               }}
// // // //             />
// // // //           </Stack>
// // // //         </Stack>
// // // //       </Box>

// // // //       {/* Transaction Detail Dialog */}
// // // //       <Dialog 
// // // //         open={viewDialogOpen} 
// // // //         onClose={handleCloseDialog}
// // // //         maxWidth="md"
// // // //         fullWidth
// // // //       >
// // // //         <DialogTitle>
// // // //           <Stack direction="row" alignItems="center" spacing={2}>
// // // //             {selectedTransaction && (
// // // //               <>
// // // //                 <Box sx={{ 
// // // //                   p: 1.5,
// // // //                   borderRadius: 1.5,
// // // //                   bgcolor: getEventConfig(selectedTransaction.eventType).bgColor,
// // // //                   display: 'flex',
// // // //                   alignItems: 'center',
// // // //                   justifyContent: 'center'
// // // //                 }}>
// // // //                   <Box sx={{ color: getEventConfig(selectedTransaction.eventType).color }}>
// // // //                     {getEventConfig(selectedTransaction.eventType).icon}
// // // //                   </Box>
// // // //                 </Box>
// // // //                 <Box>
// // // //                   <Typography variant="h6" fontWeight={600}>
// // // //                     Transaction Details
// // // //                   </Typography>
// // // //                   <Typography variant="body2" color="text.secondary">
// // // //                     {selectedTransaction.transactionId || 'N/A'}
// // // //                   </Typography>
// // // //                 </Box>
// // // //               </>
// // // //             )}
// // // //           </Stack>
// // // //         </DialogTitle>
// // // //         <DialogContent dividers>
// // // //           {selectedTransaction && (
// // // //             <Grid container spacing={3}>
// // // //               <Grid item xs={12} md={6}>
// // // //                 <Typography variant="subtitle2" color="text.secondary" gutterBottom>
// // // //                   Basic Information
// // // //                 </Typography>
// // // //                 <Stack spacing={2}>
// // // //                   <Box>
// // // //                     <Typography variant="caption" color="text.secondary">
// // // //                       Transaction ID
// // // //                     </Typography>
// // // //                     <Stack direction="row" alignItems="center" spacing={1}>
// // // //                       <Typography variant="body2" fontWeight={500}>
// // // //                         {selectedTransaction.transactionId || 'N/A'}
// // // //                       </Typography>
// // // //                       {selectedTransaction.transactionId && (
// // // //                         <IconButton 
// // // //                           size="small" 
// // // //                           onClick={() => copyToClipboard(selectedTransaction.transactionId)}
// // // //                         >
// // // //                           <CopyIcon fontSize="small" />
// // // //                         </IconButton>
// // // //                       )}
// // // //                     </Stack>
// // // //                   </Box>
// // // //                   <Box>
// // // //                     <Typography variant="caption" color="text.secondary">
// // // //                       Event Type
// // // //                     </Typography>
// // // //                     <Typography variant="body2" fontWeight={500}>
// // // //                       {selectedTransaction.eventType || 'N/A'}
// // // //                     </Typography>
// // // //                   </Box>
// // // //                   <Box>
// // // //                     <Typography variant="caption" color="text.secondary">
// // // //                       Status
// // // //                     </Typography>
// // // //                     <Chip
// // // //                       icon={getStatusConfig(selectedTransaction.status).icon}
// // // //                       label={getStatusConfig(selectedTransaction.status).label}
// // // //                       size="small"
// // // //                       sx={{ 
// // // //                         mt: 0.5,
// // // //                         fontWeight: 500,
// // // //                         bgcolor: alpha(getStatusConfig(selectedTransaction.status).color, 0.1),
// // // //                         color: getStatusConfig(selectedTransaction.status).color
// // // //                       }}
// // // //                     />
// // // //                   </Box>
// // // //                 </Stack>
// // // //               </Grid>
              
// // // //               <Grid item xs={12} md={6}>
// // // //                 <Typography variant="subtitle2" color="text.secondary" gutterBottom>
// // // //                   Financial Details
// // // //                 </Typography>
// // // //                 <Stack spacing={2}>
// // // //                   <Box>
// // // //                     <Typography variant="caption" color="text.secondary">
// // // //                       Amount
// // // //                     </Typography>
// // // //                     <Typography 
// // // //                       variant="h6" 
// // // //                       fontWeight={600}
// // // //                       color={parseFloat(selectedTransaction.amount || 0) > 0 ? 'success.main' : 'error.main'}
// // // //                     >
// // // //                       {formatAmount(selectedTransaction.amount, selectedTransaction.currency)}
// // // //                     </Typography>
// // // //                   </Box>
// // // //                   <Box>
// // // //                     <Typography variant="caption" color="text.secondary">
// // // //                       Currency
// // // //                     </Typography>
// // // //                     <Typography variant="body2" fontWeight={500}>
// // // //                       {selectedTransaction.currency || 'USD'}
// // // //                     </Typography>
// // // //                   </Box>
// // // //                   <Box>
// // // //                     <Typography variant="caption" color="text.secondary">
// // // //                       Created At
// // // //                     </Typography>
// // // //                     <Typography variant="body2" fontWeight={500}>
// // // //                       {formatDate(selectedTransaction.createdAt, 'MMM D, YYYY h:mm A') || 'N/A'}
// // // //                     </Typography>
// // // //                   </Box>
// // // //                 </Stack>
// // // //               </Grid>
              
// // // //               <Grid item xs={12}>
// // // //                 <Typography variant="subtitle2" color="text.secondary" gutterBottom>
// // // //                   User Information
// // // //                 </Typography>
// // // //                 <Stack spacing={2}>
// // // //                   <Box>
// // // //                     <Typography variant="caption" color="text.secondary">
// // // //                       User Name
// // // //                     </Typography>
// // // //                     <Typography variant="body2" fontWeight={500}>
// // // //                       {getUserName(selectedTransaction)}
// // // //                     </Typography>
// // // //                   </Box>
// // // //                   <Box>
// // // //                     <Typography variant="caption" color="text.secondary">
// // // //                       User ID
// // // //                     </Typography>
// // // //                     <Stack direction="row" alignItems="center" spacing={1}>
// // // //                       <Typography variant="body2" fontWeight={500}>
// // // //                         {getUserId(selectedTransaction)}
// // // //                       </Typography>
// // // //                       {getUserId(selectedTransaction) && getUserId(selectedTransaction) !== 'N/A' && (
// // // //                         <IconButton 
// // // //                           size="small" 
// // // //                           onClick={() => copyToClipboard(getUserId(selectedTransaction))}
// // // //                         >
// // // //                           <CopyIcon fontSize="small" />
// // // //                         </IconButton>
// // // //                       )}
// // // //                     </Stack>
// // // //                   </Box>
// // // //                 </Stack>
// // // //               </Grid>
              
// // // //               {selectedTransaction.description && (
// // // //                 <Grid item xs={12}>
// // // //                   <Typography variant="subtitle2" color="text.secondary" gutterBottom>
// // // //                     Description
// // // //                   </Typography>
// // // //                   <Paper 
// // // //                     variant="outlined" 
// // // //                     sx={{ 
// // // //                       p: 2,
// // // //                       bgcolor: 'rgba(0,0,0,0.02)',
// // // //                       borderRadius: 1.5
// // // //                     }}
// // // //                   >
// // // //                     <Typography variant="body2">
// // // //                       {selectedTransaction.description}
// // // //                     </Typography>
// // // //                   </Paper>
// // // //                 </Grid>
// // // //               )}
// // // //             </Grid>
// // // //           )}
// // // //         </DialogContent>
// // // //         <DialogActions sx={{ px: 3, py: 2 }}>
// // // //           <Button onClick={handleCloseDialog}>
// // // //             Close
// // // //           </Button>
// // // //           <Button 
// // // //             variant="contained" 
// // // //             endIcon={<ArrowForwardIcon />}
// // // //             sx={{ 
// // // //               background: 'linear-gradient(45deg, #6366F1, #8B5CF6)',
// // // //               '&:hover': {
// // // //                 background: 'linear-gradient(45deg, #4F46E5, #7C3AED)'
// // // //               }
// // // //             }}
// // // //           >
// // // //             View Full Report
// // // //           </Button>
// // // //         </DialogActions>
// // // //       </Dialog>
// // // //     </Container>
// // // //   );
// // // // };

// // // // export default BusinessTransactions;

// // // import React, { useState, useEffect, useCallback } from 'react';
// // // import {
// // //   Box,
// // //   Container,
// // //   Typography,
// // //   Table,
// // //   TableBody,
// // //   TableCell,
// // //   TableContainer,
// // //   TableHead,
// // //   TableRow,
// // //   TablePagination,
// // //   Chip,
// // //   Card,
// // //   CardContent,
// // //   CircularProgress,
// // //   Alert,
// // //   IconButton,
// // //   Stack,
// // //   Select,
// // //   MenuItem,
// // //   FormControl,
// // //   InputLabel,
// // //   TextField,
// // //   InputAdornment,
// // //   Grid,
// // //   Tooltip,
// // //   alpha,
// // //   Button,
// // //   Dialog,
// // //   DialogTitle,
// // //   DialogContent,
// // //   DialogActions,
// // //   Paper
// // // } from '@mui/material';
// // // import {
// // //   Refresh as RefreshIcon,
// // //   Search as SearchIcon,
// // //   FilterList as FilterIcon,
// // //   Download as DownloadIcon,
// // //   Payment as PaymentIcon,
// // //   Login as LoginIcon,
// // //   AccountCircle as UserIcon,
// // //   Security as SecurityIcon,
// // //   Settings as SettingsIcon,
// // //   ShoppingCart as CartIcon,
// // //   ArrowUpward,
// // //   ArrowDownward,
// // //   MoreVert as MoreIcon,
// // //   CheckCircle,
// // //   Error as ErrorIcon,
// // //   Pending as PendingIcon,
// // //   Info as InfoIcon,
// // //   ContentCopy as CopyIcon,
// // //   Visibility as ViewIcon,
// // //   CalendarToday as CalendarIcon,
// // //   Timeline as TimelineIcon,
// // //   ArrowForward as ArrowForwardIcon
// // // } from '@mui/icons-material';

// // // import { businessAuthService } from '../services/businessAuth';
// // // import { formatDate } from '../utils/formatters';

// // // const BusinessTransactions = () => {
// // //   const [allTransactions, setAllTransactions] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [filters, setFilters] = useState({
// // //     eventType: 'ALL',
// // //     status: 'ALL',
// // //     search: '',
// // //     dateRange: 'ALL'
// // //   });
// // //   const [businessId, setBusinessId] = useState('');
// // //   const [pagination, setPagination] = useState({
// // //     page: 0,
// // //     limit: 10,
// // //     total: 0
// // //   });
// // //   const [sortConfig, setSortConfig] = useState({
// // //     field: 'createdAt',
// // //     direction: 'desc'
// // //   });
// // //   const [selectedTransaction, setSelectedTransaction] = useState(null);
// // //   const [viewDialogOpen, setViewDialogOpen] = useState(false);

// // //   const EVENT_TYPES = {
// // //     ALL: { label: 'All Events', icon: <FilterIcon fontSize="small" />, color: '#6366F1', bgColor: '#E0E7FF' },
// // //     PAYMENT: { label: 'Payment', icon: <PaymentIcon fontSize="small" />, color: '#10B981', bgColor: '#D1FAE5' },
// // //     LOGIN: { label: 'Login', icon: <LoginIcon fontSize="small" />, color: '#3B82F6', bgColor: '#DBEAFE' },
// // //     USER_CREATED: { label: 'User Created', icon: <UserIcon fontSize="small" />, color: '#8B5CF6', bgColor: '#EDE9FE' },
// // //     SECURITY_ALERT: { label: 'Security Alert', icon: <SecurityIcon fontSize="small" />, color: '#EF4444', bgColor: '#FEE2E2' },
// // //     SETTINGS_CHANGE: { label: 'Settings Change', icon: <SettingsIcon fontSize="small" />, color: '#F59E0B', bgColor: '#FEF3C7' },
// // //     SUBSCRIPTION: { label: 'Subscription', icon: <CartIcon fontSize="small" />, color: '#EC4899', bgColor: '#FCE7F3' },
// // //     API_CALL: { label: 'API Call', icon: <SettingsIcon fontSize="small" />, color: '#6366F1', bgColor: '#E0E7FF' },
// // //     DATA_EXPORT: { label: 'Data Export', icon: <DownloadIcon fontSize="small" />, color: '#14B8A6', bgColor: '#CCFBF1' }
// // //   };

// // //   const STATUS_TYPES = {
// // //     ALL: { label: 'All Status', icon: <FilterIcon fontSize="small" />, color: '#6B7280', bgColor: '#F3F4F6' },
// // //     SUCCESS: { label: 'Success', icon: <CheckCircle fontSize="small" />, color: '#10B981' },
// // //     PENDING: { label: 'Pending', icon: <PendingIcon fontSize="small" />, color: '#F59E0B' },
// // //     FAILED: { label: 'Failed', icon: <ErrorIcon fontSize="small" />, color: '#EF4444' },
// // //     APPROVED: { label: 'Approved', icon: <CheckCircle fontSize="small" />, color: '#10B981' },
// // //     REJECTED: { label: 'Rejected', icon: <ErrorIcon fontSize="small" />, color: '#EF4444' },
// // //     PROCESSING: { label: 'Processing', icon: <PendingIcon fontSize="small" />, color: '#6366F1' }
// // //   };

// // //   const DATE_RANGES = {
// // //     ALL: { label: 'All Time', icon: <CalendarIcon fontSize="small" /> },
// // //     TODAY: { label: 'Today', icon: <CalendarIcon fontSize="small" /> },
// // //     '7DAYS': { label: 'Last 7 Days', icon: <CalendarIcon fontSize="small" /> },
// // //     '30DAYS': { label: 'Last 30 Days', icon: <CalendarIcon fontSize="small" /> },
// // //     '90DAYS': { label: 'Last 90 Days', icon: <CalendarIcon fontSize="small" /> }
// // //   };

// // //   useEffect(() => {
// // //     const userStr = localStorage.getItem('user');
// // //     if (userStr) {
// // //       try {
// // //         const user = JSON.parse(userStr);
// // //         const bid = user.businessId || user.businessID || user.id;
// // //         if (bid) {
// // //           setBusinessId(bid);
// // //         } else {
// // //           setError('Business ID not found in user profile');
// // //           setLoading(false);
// // //         }
// // //       } catch (error) {
// // //         setError('Failed to load user data');
// // //         setLoading(false);
// // //       }
// // //     } else {
// // //       setError('User not found. Please login again.');
// // //       setLoading(false);
// // //     }
// // //   }, []);

// // //   const fetchTransactions = useCallback(async () => {
// // //     if (!businessId) {
// // //       setError('Business ID is required');
// // //       return;
// // //     }
    
// // //     setLoading(true);
// // //     setError(null);
    
// // //     try {
// // //       // Apply date filter
// // //       let startDate;
// // //       const now = new Date();
// // //       switch(filters.dateRange) {
// // //         case 'TODAY':
// // //           startDate = new Date(now.setHours(0, 0, 0, 0));
// // //           break;
// // //         case '7DAYS':
// // //           startDate = new Date(now.setDate(now.getDate() - 7));
// // //           break;
// // //         case '30DAYS':
// // //           startDate = new Date(now.setDate(now.getDate() - 30));
// // //           break;
// // //         case '90DAYS':
// // //           startDate = new Date(now.setDate(now.getDate() - 90));
// // //           break;
// // //         default:
// // //           startDate = undefined;
// // //       }

// // //       // Fetch all transactions without filtering
// // //       const result = await businessAuthService.getBusinessTransactions(
// // //         businessId,
// // //         undefined, // Don't filter eventType on server
// // //         pagination.page + 1, 
// // //         pagination.limit,
// // //         undefined, // Don't filter status on server
// // //         undefined, // Don't search on server
// // //         startDate
// // //       );
      
// // //       if (result.success) {
// // //         setAllTransactions(result.data || []);
// // //         setPagination(prev => ({
// // //           ...prev,
// // //           total: result.pagination?.total || result.data?.length || 0
// // //         }));
// // //       } else {
// // //         setError(result.error || 'Failed to fetch transactions');
// // //       }
// // //     } catch (err) {
// // //       setError(err.message || 'An error occurred while fetching transactions');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, [businessId, filters.dateRange, pagination.page, pagination.limit]);

// // //   useEffect(() => {
// // //     if (businessId) {
// // //       fetchTransactions();
// // //     }
// // //   }, [businessId, filters.dateRange, pagination.page, pagination.limit, fetchTransactions]);

// // //   // Improved getUserName function that checks multiple possible fields
// // //   const getUserName = (transaction) => {
// // //     // Check in order of preference
// // //     const possibleFields = [
// // //       transaction.userName,
// // //       transaction.name,
// // //       transaction.user?.name,
// // //       transaction.user?.fullName,
// // //       transaction.customerName,
// // //       transaction.clientName,
// // //       transaction.initiatedBy,
// // //       transaction.performedBy,
// // //       // Check for email as fallback
// // //       transaction.user?.email,
// // //       transaction.email,
// // //       transaction.userEmail
// // //     ];
    
// // //     for (const field of possibleFields) {
// // //       if (field && typeof field === 'string' && field.trim() !== '') {
// // //         // If it's an email, extract the name part
// // //         if (field.includes('@')) {
// // //           return field.split('@')[0];
// // //         }
// // //         return field;
// // //       }
// // //     }
    
// // //     return 'Unknown User';
// // //   };

// // //   // Get user ID with better fallback logic
// // //   const getUserId = (transaction) => {
// // //     const possibleFields = [
// // //       transaction.userId,
// // //       transaction.user?.id,
// // //       transaction.customerId,
// // //       transaction.clientId,
// // //       transaction.initiatedById,
// // //       transaction.performedById
// // //     ];
    
// // //     for (const field of possibleFields) {
// // //       if (field) {
// // //         return field;
// // //       }
// // //     }
    
// // //     return transaction._id || transaction.id || 'N/A';
// // //   };

// // //   // Get user email if available
// // //   const getUserEmail = (transaction) => {
// // //     const possibleFields = [
// // //       transaction.user?.email,
// // //       transaction.email,
// // //       transaction.userEmail,
// // //       transaction.customerEmail,
// // //       transaction.clientEmail
// // //     ];
    
// // //     for (const field of possibleFields) {
// // //       if (field && field.includes('@')) {
// // //         return field;
// // //       }
// // //     }
    
// // //     return null;
// // //   };

// // //   const handlePageChange = (event, newPage) => {
// // //     setPagination(prev => ({ ...prev, page: newPage }));
// // //   };

// // //   const handleLimitChange = (event) => {
// // //     setPagination(prev => ({ 
// // //       ...prev, 
// // //       limit: parseInt(event.target.value, 10),
// // //       page: 0
// // //     }));
// // //   };

// // //   const handleFilterChange = (filterName, value) => {
// // //     setFilters(prev => ({ ...prev, [filterName]: value }));
// // //     setPagination(prev => ({ ...prev, page: 0 }));
// // //   };

// // //   const handleSort = (field) => {
// // //     setSortConfig(prev => ({
// // //       field,
// // //       direction: prev.field === field && prev.direction === 'desc' ? 'asc' : 'desc'
// // //     }));
// // //   };

// // //   const handleRefresh = () => {
// // //     fetchTransactions();
// // //   };

// // //   const handleViewTransaction = (transaction) => {
// // //     setSelectedTransaction(transaction);
// // //     setViewDialogOpen(true);
// // //   };

// // //   const handleCloseDialog = () => {
// // //     setViewDialogOpen(false);
// // //     setSelectedTransaction(null);
// // //   };

// // //   const copyToClipboard = (text) => {
// // //     if (text && text !== 'N/A') {
// // //       navigator.clipboard.writeText(text);
// // //     }
// // //   };

// // //   const getEventConfig = (eventType) => {
// // //     if (!eventType) {
// // //       return {
// // //         label: 'Unknown',
// // //         icon: <InfoIcon fontSize="small" />,
// // //         color: '#6B7280',
// // //         bgColor: '#F3F4F6'
// // //       };
// // //     }
    
// // //     const eventUpper = eventType.toUpperCase();
// // //     return EVENT_TYPES[eventUpper] || {
// // //       label: eventType,
// // //       icon: <InfoIcon fontSize="small" />,
// // //       color: '#6B7280',
// // //       bgColor: '#F3F4F6'
// // //     };
// // //   };

// // //   const getStatusConfig = (status) => {
// // //     if (!status) {
// // //       return {
// // //         label: 'Unknown',
// // //         icon: <InfoIcon fontSize="small" />,
// // //         color: '#6B7280'
// // //       };
// // //     }
    
// // //     const statusUpper = status.toUpperCase();
// // //     return STATUS_TYPES[statusUpper] || {
// // //       label: status,
// // //       icon: <InfoIcon fontSize="small" />,
// // //       color: '#6B7280'
// // //     };
// // //   };

// // //   const formatAmount = (amount, currency) => {
// // //     if (amount === null || amount === undefined) return 'N/A';
    
// // //     try {
// // //       const numAmount = parseFloat(amount);
// // //       if (isNaN(numAmount)) return 'N/A';
      
// // //       // Handle zero amount
// // //       if (numAmount === 0) return '$0.00';
      
// // //       return new Intl.NumberFormat('en-US', {
// // //         style: 'currency',
// // //         currency: currency || 'USD',
// // //         minimumFractionDigits: 2,
// // //         maximumFractionDigits: 2
// // //       }).format(numAmount);
// // //     } catch (error) {
// // //       // Fallback formatting
// // //       return `$${parseFloat(amount).toFixed(2)}`;
// // //     }
// // //   };

// // //   // Filter and sort transactions client-side
// // //   const getFilteredTransactions = () => {
// // //     let filtered = [...allTransactions];
    
// // //     // Apply event type filter
// // //     if (filters.eventType !== 'ALL') {
// // //       filtered = filtered.filter(t => 
// // //         t.eventType && t.eventType.toUpperCase() === filters.eventType
// // //       );
// // //     }
    
// // //     // Apply status filter
// // //     if (filters.status !== 'ALL') {
// // //       filtered = filtered.filter(t => 
// // //         t.status && t.status.toUpperCase() === filters.status
// // //       );
// // //     }
    
// // //     // Apply search filter
// // //     if (filters.search) {
// // //       const searchLower = filters.search.toLowerCase();
// // //       filtered = filtered.filter(transaction => {
// // //         const searchFields = [
// // //           transaction.transactionId,
// // //           getUserName(transaction),
// // //           transaction.eventType,
// // //           transaction.status,
// // //           transaction.description,
// // //           formatAmount(transaction.amount, transaction.currency),
// // //           getUserId(transaction),
// // //           getUserEmail(transaction),
// // //           formatDate(transaction.createdAt, 'MMM D, YYYY h:mm A'),
// // //           transaction.currency
// // //         ];
        
// // //         return searchFields.some(field => 
// // //           field && field.toString().toLowerCase().includes(searchLower)
// // //         );
// // //       });
// // //     }
    
// // //     // Apply sorting
// // //     if (sortConfig.field) {
// // //       filtered.sort((a, b) => {
// // //         let aVal = a[sortConfig.field] || '';
// // //         let bVal = b[sortConfig.field] || '';
        
// // //         if (sortConfig.field === 'createdAt') {
// // //           aVal = new Date(aVal);
// // //           bVal = new Date(bVal);
// // //         }
        
// // //         if (sortConfig.field === 'amount') {
// // //           aVal = parseFloat(aVal) || 0;
// // //           bVal = parseFloat(bVal) || 0;
// // //         }
        
// // //         if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
// // //         if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
// // //         return 0;
// // //       });
// // //     }
    
// // //     // Apply pagination
// // //     const startIndex = pagination.page * pagination.limit;
// // //     const endIndex = startIndex + pagination.limit;
    
// // //     return {
// // //       total: filtered.length,
// // //       displayed: filtered.slice(startIndex, endIndex)
// // //     };
// // //   };

// // //   const filteredData = getFilteredTransactions();
// // //   const displayedTransactions = filteredData.displayed;
// // //   const totalTransactions = filteredData.total;

// // //   return (
// // //     <Container maxWidth="xl" sx={{ 
// // //       py: 4,
// // //       minHeight: '100vh',
// // //       background: 'linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)'
// // //     }}>
// // //       {/* Header */}
// // //       <Box sx={{ mb: 4 }}>
// // //         <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
// // //           <Box>
// // //             <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
// // //               Transaction History
// // //             </Typography>
// // //             <Stack direction="row" alignItems="center" spacing={1}>
// // //               <TimelineIcon sx={{ color: 'primary.main', fontSize: 20 }} />
// // //               <Typography variant="body2" color="text.secondary">
// // //                 Monitor and analyze all business activities and transactions
// // //               </Typography>
// // //             </Stack>
// // //           </Box>
// // //           <Stack direction="row" spacing={1}>
// // //             <Button
// // //               variant="outlined"
// // //               startIcon={<RefreshIcon />}
// // //               onClick={handleRefresh}
// // //               disabled={loading}
// // //               size="small"
// // //             >
// // //               Refresh
// // //             </Button>
// // //             <Button
// // //               variant="contained"
// // //               startIcon={<DownloadIcon />}
// // //               size="small"
// // //               sx={{ 
// // //                 background: 'linear-gradient(45deg, #6366F1, #8B5CF6)',
// // //                 '&:hover': {
// // //                   background: 'linear-gradient(45deg, #4F46E5, #7C3AED)'
// // //                 }
// // //               }}
// // //             >
// // //               Export
// // //             </Button>
// // //           </Stack>
// // //         </Stack>
// // //       </Box>

// // //       {/* Filters Card */}
// // //       <Card sx={{ 
// // //         mb: 4,
// // //         borderRadius: 2,
// // //         boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
// // //         border: '1px solid rgba(0,0,0,0.05)',
// // //         background: 'rgba(255, 255, 255, 0.9)'
// // //       }}>
// // //         <CardContent>
// // //           <Grid container spacing={2} alignItems="center">
// // //             <Grid item xs={12} md={4}>
// // //               <TextField
// // //                 fullWidth
// // //                 size="medium"
// // //                 placeholder="Search transactions by ID, user, type, amount, status..."
// // //                 value={filters.search}
// // //                 onChange={(e) => handleFilterChange('search', e.target.value)}
// // //                 InputProps={{
// // //                   startAdornment: (
// // //                     <InputAdornment position="start">
// // //                       <SearchIcon fontSize="small" color="primary" />
// // //                     </InputAdornment>
// // //                   ),
// // //                   sx: { 
// // //                     borderRadius: 2,
// // //                     background: 'rgba(255, 255, 255, 0.8)'
// // //                   }
// // //                 }}
// // //               />
// // //             </Grid>
            
// // //             <Grid item xs={12} sm={6} md={2}>
// // //               <FormControl fullWidth size="medium">
// // //                 <InputLabel>Event Type</InputLabel>
// // //                 <Select
// // //                   value={filters.eventType}
// // //                   label="Event Type"
// // //                   onChange={(e) => handleFilterChange('eventType', e.target.value)}
// // //                   sx={{ borderRadius: 2 }}
// // //                 >
// // //                   {Object.entries(EVENT_TYPES).map(([key, config]) => (
// // //                     <MenuItem key={key} value={key}>
// // //                       <Stack direction="row" alignItems="center" spacing={1}>
// // //                         <Box sx={{ color: config.color }}>
// // //                           {config.icon}
// // //                         </Box>
// // //                         <Typography>{config.label}</Typography>
// // //                       </Stack>
// // //                     </MenuItem>
// // //                   ))}
// // //                 </Select>
// // //               </FormControl>
// // //             </Grid>
            
// // //             <Grid item xs={12} sm={6} md={2}>
// // //               <FormControl fullWidth size="medium">
// // //                 <InputLabel>Status</InputLabel>
// // //                 <Select
// // //                   value={filters.status}
// // //                   label="Status"
// // //                   onChange={(e) => handleFilterChange('status', e.target.value)}
// // //                   sx={{ borderRadius: 2 }}
// // //                 >
// // //                   {Object.entries(STATUS_TYPES).map(([key, config]) => (
// // //                     <MenuItem key={key} value={key}>
// // //                       <Stack direction="row" alignItems="center" spacing={1}>
// // //                         <Box sx={{ color: config.color }}>
// // //                           {config.icon}
// // //                         </Box>
// // //                         <Typography>{config.label}</Typography>
// // //                       </Stack>
// // //                     </MenuItem>
// // //                   ))}
// // //                 </Select>
// // //               </FormControl>
// // //             </Grid>
            
// // //             <Grid item xs={12} sm={6} md={2}>
// // //               <FormControl fullWidth size="medium">
// // //                 <InputLabel>Date Range</InputLabel>
// // //                 <Select
// // //                   value={filters.dateRange}
// // //                   label="Date Range"
// // //                   onChange={(e) => handleFilterChange('dateRange', e.target.value)}
// // //                   sx={{ borderRadius: 2 }}
// // //                 >
// // //                   {Object.entries(DATE_RANGES).map(([key, config]) => (
// // //                     <MenuItem key={key} value={key}>
// // //                       <Stack direction="row" alignItems="center" spacing={1}>
// // //                         {config.icon && (
// // //                           <Box sx={{ color: 'primary.main' }}>
// // //                             {config.icon}
// // //                           </Box>
// // //                         )}
// // //                         <Typography>{config.label}</Typography>
// // //                       </Stack>
// // //                     </MenuItem>
// // //                   ))}
// // //                 </Select>
// // //               </FormControl>
// // //             </Grid>
            
// // //             <Grid item xs={12} sm={6} md={2}>
// // //               <FormControl fullWidth size="medium">
// // //                 <InputLabel>Rows per page</InputLabel>
// // //                 <Select
// // //                   value={pagination.limit}
// // //                   label="Rows per page"
// // //                   onChange={handleLimitChange}
// // //                   sx={{ borderRadius: 2 }}
// // //                 >
// // //                   <MenuItem value={5}>5</MenuItem>
// // //                   <MenuItem value={10}>10</MenuItem>
// // //                   <MenuItem value={25}>25</MenuItem>
// // //                   <MenuItem value={50}>50</MenuItem>
// // //                 </Select>
// // //               </FormControl>
// // //             </Grid>
// // //           </Grid>
// // //         </CardContent>
// // //       </Card>

// // //       {/* Error Alert */}
// // //       {error && (
// // //         <Alert 
// // //           severity="error" 
// // //           sx={{ 
// // //             mb: 3,
// // //             borderRadius: 2,
// // //             boxShadow: '0 2px 12px rgba(239,68,68,0.1)'
// // //           }} 
// // //           onClose={() => setError(null)}
// // //         >
// // //           {error}
// // //         </Alert>
// // //       )}

// // //       {/* Transactions Table */}
// // //       <Card sx={{ 
// // //         borderRadius: 2,
// // //         boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
// // //         border: '1px solid rgba(0,0,0,0.05)',
// // //         overflow: 'hidden',
// // //         background: 'rgba(255, 255, 255, 0.95)'
// // //       }}>
// // //         <CardContent sx={{ p: 0 }}>
// // //           {loading && allTransactions.length === 0 ? (
// // //             <Box sx={{ p: 6, textAlign: 'center' }}>
// // //               <CircularProgress size={40} />
// // //               <Typography variant="body2" sx={{ mt: 2 }} color="text.secondary">
// // //                 Loading transactions...
// // //               </Typography>
// // //             </Box>
// // //           ) : (
// // //             <>
// // //               <TableContainer>
// // //                 <Table>
// // //                   <TableHead>
// // //                     <TableRow sx={{ 
// // //                       bgcolor: 'rgba(99, 102, 241, 0.04)',
// // //                       '& th': { 
// // //                         borderBottom: '2px solid rgba(99, 102, 241, 0.1)',
// // //                         fontWeight: 600 
// // //                       }
// // //                     }}>
// // //                       <TableCell>
// // //                         <Typography variant="subtitle2" fontWeight={600} color="primary.main">
// // //                           Event Type
// // //                         </Typography>
// // //                       </TableCell>
// // //                       <TableCell>
// // //                         <Typography variant="subtitle2" fontWeight={600} color="primary.main">
// // //                           Transaction ID
// // //                         </Typography>
// // //                       </TableCell>
// // //                       <TableCell>
// // //                         <Typography variant="subtitle2" fontWeight={600} color="primary.main">
// // //                           User
// // //                         </Typography>
// // //                       </TableCell>
// // //                       <TableCell>
// // //                         <Stack direction="row" alignItems="center" spacing={0.5}>
// // //                           <Typography variant="subtitle2" fontWeight={600} color="primary.main">
// // //                             Amount
// // //                           </Typography>
// // //                           <IconButton 
// // //                             size="small" 
// // //                             onClick={() => handleSort('amount')}
// // //                             sx={{ 
// // //                               color: sortConfig.field === 'amount' ? 'primary.main' : 'inherit'
// // //                             }}
// // //                           >
// // //                             {sortConfig.field === 'amount' && sortConfig.direction === 'asc' ? 
// // //                               <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
// // //                           </IconButton>
// // //                         </Stack>
// // //                       </TableCell>
// // //                       <TableCell>
// // //                         <Typography variant="subtitle2" fontWeight={600} color="primary.main">
// // //                           Status
// // //                         </Typography>
// // //                       </TableCell>
// // //                       <TableCell>
// // //                         <Stack direction="row" alignItems="center" spacing={0.5}>
// // //                           <Typography variant="subtitle2" fontWeight={600} color="primary.main">
// // //                             Date & Time
// // //                           </Typography>
// // //                           <IconButton 
// // //                             size="small" 
// // //                             onClick={() => handleSort('createdAt')}
// // //                             sx={{ 
// // //                               color: sortConfig.field === 'createdAt' ? 'primary.main' : 'inherit'
// // //                             }}
// // //                           >
// // //                             {sortConfig.field === 'createdAt' && sortConfig.direction === 'asc' ? 
// // //                               <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
// // //                           </IconButton>
// // //                         </Stack>
// // //                       </TableCell>
// // //                       <TableCell>
// // //                         <Typography variant="subtitle2" fontWeight={600} color="primary.main">
// // //                           Actions
// // //                         </Typography>
// // //                       </TableCell>
// // //                     </TableRow>
// // //                   </TableHead>
// // //                   <TableBody>
// // //                     {displayedTransactions.length === 0 ? (
// // //                       <TableRow>
// // //                         <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
// // //                           <FilterIcon sx={{ fontSize: 64, color: 'rgba(99, 102, 241, 0.3)', mb: 2 }} />
// // //                           <Typography variant="h6" color="text.secondary" gutterBottom>
// // //                             {filters.search || filters.eventType !== 'ALL' || filters.status !== 'ALL' 
// // //                               ? 'No transactions match your filters' 
// // //                               : 'No transactions found'}
// // //                           </Typography>
// // //                           <Typography variant="body2" color="text.secondary">
// // //                             {filters.search ? 'Try a different search term' : 'Try adjusting your filters'}
// // //                           </Typography>
// // //                         </TableCell>
// // //                       </TableRow>
// // //                     ) : (
// // //                       displayedTransactions.map((transaction, index) => {
// // //                         const eventConfig = getEventConfig(transaction.eventType);
// // //                         const statusConfig = getStatusConfig(transaction.status);
// // //                         const userName = getUserName(transaction);
// // //                         const userId = getUserId(transaction);
// // //                         const userEmail = getUserEmail(transaction);
                        
// // //                         return (
// // //                           <TableRow 
// // //                             key={transaction._id || transaction.transactionId || `trans-${index}`}
// // //                             hover
// // //                             sx={{ 
// // //                               '&:last-child td, &:last-child th': { border: 0 },
// // //                               '&:hover': { 
// // //                                 bgcolor: 'rgba(99, 102, 241, 0.02)'
// // //                               }
// // //                             }}
// // //                           >
// // //                             <TableCell>
// // //                               <Stack direction="row" alignItems="center" spacing={1.5}>
// // //                                 <Box sx={{ 
// // //                                   p: 1.5,
// // //                                   borderRadius: 1.5,
// // //                                   bgcolor: eventConfig.bgColor,
// // //                                   display: 'flex',
// // //                                   alignItems: 'center',
// // //                                   justifyContent: 'center'
// // //                                 }}>
// // //                                   <Box sx={{ color: eventConfig.color }}>
// // //                                     {eventConfig.icon}
// // //                                   </Box>
// // //                                 </Box>
// // //                                 <Box>
// // //                                   <Typography variant="body2" fontWeight={600}>
// // //                                     {eventConfig.label}
// // //                                   </Typography>
// // //                                   {transaction.eventType && transaction.eventType !== eventConfig.label && (
// // //                                     <Typography variant="caption" color="text.secondary">
// // //                                       {transaction.eventType}
// // //                                     </Typography>
// // //                                   )}
// // //                                 </Box>
// // //                               </Stack>
// // //                             </TableCell>
// // //                             <TableCell>
// // //                               <Stack direction="row" alignItems="center" spacing={1}>
// // //                                 <Typography 
// // //                                   variant="body2" 
// // //                                   sx={{ 
// // //                                     fontFamily: 'monospace',
// // //                                     fontSize: '0.75rem',
// // //                                     color: 'text.secondary',
// // //                                     fontWeight: 500
// // //                                   }}
// // //                                 >
// // //                                   {transaction.transactionId ? 
// // //                                     `${transaction.transactionId.slice(0, 12)}...` : 'N/A'}
// // //                                 </Typography>
// // //                                 {transaction.transactionId && (
// // //                                   <Tooltip title="Copy ID">
// // //                                     <IconButton 
// // //                                       size="small" 
// // //                                       onClick={() => copyToClipboard(transaction.transactionId)}
// // //                                       sx={{ 
// // //                                         color: 'primary.light',
// // //                                         '&:hover': { color: 'primary.main' }
// // //                                       }}
// // //                                     >
// // //                                       <CopyIcon fontSize="small" />
// // //                                     </IconButton>
// // //                                   </Tooltip>
// // //                                 )}
// // //                               </Stack>
// // //                             </TableCell>
// // //                             <TableCell>
// // //                               <Stack>
// // //                                 <Typography variant="body2" fontWeight={600}>
// // //                                   {userName}
// // //                                 </Typography>
// // //                                 <Typography variant="caption" color="text.secondary">
// // //                                   ID: {userId ? `${userId.slice(0, 8)}...` : 'N/A'}
// // //                                 </Typography>
// // //                                 {userEmail && (
// // //                                   <Typography variant="caption" color="text.secondary">
// // //                                     {userEmail.includes('@') ? userEmail.split('@')[0] : userEmail}
// // //                                   </Typography>
// // //                                 )}
// // //                               </Stack>
// // //                             </TableCell>
// // //                             <TableCell>
// // //                               <Typography 
// // //                                 variant="body2" 
// // //                                 fontWeight={700}
// // //                                 color={parseFloat(transaction.amount || 0) > 0 ? 'success.main' : 
// // //                                       parseFloat(transaction.amount || 0) < 0 ? 'error.main' : 'text.primary'}
// // //                               >
// // //                                 {formatAmount(transaction.amount, transaction.currency)}
// // //                               </Typography>
// // //                               {transaction.currency && transaction.currency !== 'USD' && (
// // //                                 <Typography variant="caption" color="text.secondary">
// // //                                   {transaction.currency}
// // //                                 </Typography>
// // //                               )}
// // //                             </TableCell>
// // //                             <TableCell>
// // //                               <Chip
// // //                                 icon={statusConfig.icon}
// // //                                 label={statusConfig.label}
// // //                                 size="small"
// // //                                 sx={{ 
// // //                                   fontWeight: 600,
// // //                                   bgcolor: alpha(statusConfig.color, 0.1),
// // //                                   color: statusConfig.color,
// // //                                   border: `1px solid ${alpha(statusConfig.color, 0.2)}`,
// // //                                   '& .MuiChip-icon': {
// // //                                     color: statusConfig.color
// // //                                   }
// // //                                 }}
// // //                               />
// // //                             </TableCell>
// // //                             <TableCell>
// // //                               <Stack>
// // //                                 <Typography variant="body2" fontWeight={600}>
// // //                                   {formatDate(transaction.createdAt, 'MMM D, YYYY') || 'N/A'}
// // //                                 </Typography>
// // //                                 <Typography variant="caption" color="text.secondary">
// // //                                   {formatDate(transaction.createdAt, 'h:mm A') || 'N/A'}
// // //                                 </Typography>
// // //                               </Stack>
// // //                             </TableCell>
// // //                             <TableCell>
// // //                               <Stack direction="row" spacing={0.5}>
// // //                                 <Tooltip title="View details">
// // //                                   <IconButton 
// // //                                     size="small" 
// // //                                     onClick={() => handleViewTransaction(transaction)}
// // //                                     sx={{ 
// // //                                       color: 'primary.light',
// // //                                       '&:hover': { 
// // //                                         color: 'primary.main',
// // //                                         bgcolor: 'rgba(99, 102, 241, 0.1)'
// // //                                       }
// // //                                     }}
// // //                                   >
// // //                                     <ViewIcon fontSize="small" />
// // //                                   </IconButton>
// // //                                 </Tooltip>
// // //                               </Stack>
// // //                             </TableCell>
// // //                           </TableRow>
// // //                         );
// // //                       })
// // //                     )}
// // //                   </TableBody>
// // //                 </Table>
// // //               </TableContainer>
              
// // //               {/* Pagination */}
// // //               {displayedTransactions.length > 0 && (
// // //                 <TablePagination
// // //                   component="div"
// // //                   count={totalTransactions}
// // //                   page={pagination.page}
// // //                   onPageChange={handlePageChange}
// // //                   rowsPerPage={pagination.limit}
// // //                   onRowsPerPageChange={handleLimitChange}
// // //                   rowsPerPageOptions={[5, 10, 25, 50]}
// // //                   sx={{ 
// // //                     borderTop: '1px solid rgba(0,0,0,0.08)',
// // //                     px: 3,
// // //                     py: 2,
// // //                     '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
// // //                       fontWeight: 500
// // //                     }
// // //                   }}
// // //                 />
// // //               )}
// // //             </>
// // //           )}
// // //         </CardContent>
// // //       </Card>

// // //       {/* Footer */}
// // //       <Box sx={{ 
// // //         mt: 4, 
// // //         pt: 3, 
// // //         borderTop: '1px solid rgba(0,0,0,0.08)' 
// // //       }}>
// // //         <Stack direction="row" justifyContent="space-between" alignItems="center">
// // //           <Typography variant="caption" color="text.secondary">
// // //             Showing {displayedTransactions.length} of {totalTransactions} transactions
// // //             {filters.search && ` for "${filters.search}"`}
// // //           </Typography>
// // //           <Stack direction="row" alignItems="center" spacing={1}>
// // //             <Typography variant="caption" color="text.secondary">
// // //               Business ID:
// // //             </Typography>
// // //             <Chip
// // //               label={businessId ? `${businessId.slice(0, 16)}...` : 'N/A'}
// // //               size="small"
// // //               sx={{ 
// // //                 fontFamily: 'monospace',
// // //                 fontWeight: 500,
// // //                 bgcolor: 'rgba(99, 102, 241, 0.1)',
// // //                 color: 'primary.main'
// // //               }}
// // //             />
// // //           </Stack>
// // //         </Stack>
// // //       </Box>

// // //       {/* Transaction Detail Dialog */}
// // //       <Dialog 
// // //         open={viewDialogOpen} 
// // //         onClose={handleCloseDialog}
// // //         maxWidth="md"
// // //         fullWidth
// // //       >
// // //         <DialogTitle>
// // //           <Stack direction="row" alignItems="center" spacing={2}>
// // //             {selectedTransaction && (
// // //               <>
// // //                 <Box sx={{ 
// // //                   p: 1.5,
// // //                   borderRadius: 1.5,
// // //                   bgcolor: getEventConfig(selectedTransaction.eventType).bgColor,
// // //                   display: 'flex',
// // //                   alignItems: 'center',
// // //                   justifyContent: 'center'
// // //                 }}>
// // //                   <Box sx={{ color: getEventConfig(selectedTransaction.eventType).color }}>
// // //                     {getEventConfig(selectedTransaction.eventType).icon}
// // //                   </Box>
// // //                 </Box>
// // //                 <Box>
// // //                   <Typography variant="h6" fontWeight={600}>
// // //                     Transaction Details
// // //                   </Typography>
// // //                   <Typography variant="body2" color="text.secondary">
// // //                     {selectedTransaction.transactionId || 'N/A'}
// // //                   </Typography>
// // //                 </Box>
// // //               </>
// // //             )}
// // //           </Stack>
// // //         </DialogTitle>
// // //         <DialogContent dividers>
// // //           {selectedTransaction && (
// // //             <Grid container spacing={3}>
// // //               <Grid item xs={12} md={6}>
// // //                 <Typography variant="subtitle2" color="text.secondary" gutterBottom>
// // //                   Basic Information
// // //                 </Typography>
// // //                 <Stack spacing={2}>
// // //                   <Box>
// // //                     <Typography variant="caption" color="text.secondary">
// // //                       Transaction ID
// // //                     </Typography>
// // //                     <Stack direction="row" alignItems="center" spacing={1}>
// // //                       <Typography variant="body2" fontWeight={500} sx={{ fontFamily: 'monospace' }}>
// // //                         {selectedTransaction.transactionId || 'N/A'}
// // //                       </Typography>
// // //                       {selectedTransaction.transactionId && (
// // //                         <IconButton 
// // //                           size="small" 
// // //                           onClick={() => copyToClipboard(selectedTransaction.transactionId)}
// // //                         >
// // //                           <CopyIcon fontSize="small" />
// // //                         </IconButton>
// // //                       )}
// // //                     </Stack>
// // //                   </Box>
// // //                   <Box>
// // //                     <Typography variant="caption" color="text.secondary">
// // //                       Event Type
// // //                     </Typography>
// // //                     <Stack direction="row" alignItems="center" spacing={1}>
// // //                       <Chip
// // //                         icon={getEventConfig(selectedTransaction.eventType).icon}
// // //                         label={getEventConfig(selectedTransaction.eventType).label}
// // //                         size="small"
// // //                         sx={{ 
// // //                           fontWeight: 500,
// // //                           bgcolor: getEventConfig(selectedTransaction.eventType).bgColor,
// // //                           color: getEventConfig(selectedTransaction.eventType).color
// // //                         }}
// // //                       />
// // //                       {selectedTransaction.eventType && 
// // //                        selectedTransaction.eventType !== getEventConfig(selectedTransaction.eventType).label && (
// // //                         <Typography variant="body2" color="text.secondary">
// // //                           ({selectedTransaction.eventType})
// // //                         </Typography>
// // //                       )}
// // //                     </Stack>
// // //                   </Box>
// // //                   <Box>
// // //                     <Typography variant="caption" color="text.secondary">
// // //                       Status
// // //                     </Typography>
// // //                     <Chip
// // //                       icon={getStatusConfig(selectedTransaction.status).icon}
// // //                       label={getStatusConfig(selectedTransaction.status).label}
// // //                       size="small"
// // //                       sx={{ 
// // //                         mt: 0.5,
// // //                         fontWeight: 500,
// // //                         bgcolor: alpha(getStatusConfig(selectedTransaction.status).color, 0.1),
// // //                         color: getStatusConfig(selectedTransaction.status).color
// // //                       }}
// // //                     />
// // //                   </Box>
// // //                 </Stack>
// // //               </Grid>
              
// // //               <Grid item xs={12} md={6}>
// // //                 <Typography variant="subtitle2" color="text.secondary" gutterBottom>
// // //                   Financial Details
// // //                 </Typography>
// // //                 <Stack spacing={2}>
// // //                   <Box>
// // //                     <Typography variant="caption" color="text.secondary">
// // //                       Amount
// // //                     </Typography>
// // //                     <Typography 
// // //                       variant="h6" 
// // //                       fontWeight={600}
// // //                       color={parseFloat(selectedTransaction.amount || 0) > 0 ? 'success.main' : 
// // //                             parseFloat(selectedTransaction.amount || 0) < 0 ? 'error.main' : 'text.primary'}
// // //                     >
// // //                       {formatAmount(selectedTransaction.amount, selectedTransaction.currency)}
// // //                     </Typography>
// // //                   </Box>
// // //                   <Box>
// // //                     <Typography variant="caption" color="text.secondary">
// // //                       Currency
// // //                     </Typography>
// // //                     <Typography variant="body2" fontWeight={500}>
// // //                       {selectedTransaction.currency || 'USD'}
// // //                     </Typography>
// // //                   </Box>
// // //                   <Box>
// // //                     <Typography variant="caption" color="text.secondary">
// // //                       Created At
// // //                     </Typography>
// // //                     <Typography variant="body2" fontWeight={500}>
// // //                       {formatDate(selectedTransaction.createdAt, 'MMM D, YYYY h:mm A') || 'N/A'}
// // //                     </Typography>
// // //                   </Box>
// // //                 </Stack>
// // //               </Grid>
              
// // //               <Grid item xs={12}>
// // //                 <Typography variant="subtitle2" color="text.secondary" gutterBottom>
// // //                   User Information
// // //                 </Typography>
// // //                 <Stack spacing={2}>
// // //                   <Box>
// // //                     <Typography variant="caption" color="text.secondary">
// // //                       User Name
// // //                     </Typography>
// // //                     <Typography variant="body2" fontWeight={500}>
// // //                       {getUserName(selectedTransaction)}
// // //                     </Typography>
// // //                   </Box>
// // //                   <Box>
// // //                     <Typography variant="caption" color="text.secondary">
// // //                       User ID
// // //                     </Typography>
// // //                     <Stack direction="row" alignItems="center" spacing={1}>
// // //                       <Typography variant="body2" fontWeight={500} sx={{ fontFamily: 'monospace' }}>
// // //                         {getUserId(selectedTransaction)}
// // //                       </Typography>
// // //                       {getUserId(selectedTransaction) && getUserId(selectedTransaction) !== 'N/A' && (
// // //                         <IconButton 
// // //                           size="small" 
// // //                           onClick={() => copyToClipboard(getUserId(selectedTransaction))}
// // //                         >
// // //                           <CopyIcon fontSize="small" />
// // //                         </IconButton>
// // //                       )}
// // //                     </Stack>
// // //                   </Box>
// // //                   {getUserEmail(selectedTransaction) && (
// // //                     <Box>
// // //                       <Typography variant="caption" color="text.secondary">
// // //                         Email
// // //                       </Typography>
// // //                       <Typography variant="body2" fontWeight={500}>
// // //                         {getUserEmail(selectedTransaction)}
// // //                       </Typography>
// // //                     </Box>
// // //                   )}
// // //                 </Stack>
// // //               </Grid>
              
// // //               {selectedTransaction.description && (
// // //                 <Grid item xs={12}>
// // //                   <Typography variant="subtitle2" color="text.secondary" gutterBottom>
// // //                     Description
// // //                   </Typography>
// // //                   <Paper 
// // //                     variant="outlined" 
// // //                     sx={{ 
// // //                       p: 2,
// // //                       bgcolor: 'rgba(0,0,0,0.02)',
// // //                       borderRadius: 1.5
// // //                     }}
// // //                   >
// // //                     <Typography variant="body2">
// // //                       {selectedTransaction.description}
// // //                     </Typography>
// // //                   </Paper>
// // //                 </Grid>
// // //               )}
// // //             </Grid>
// // //           )}
// // //         </DialogContent>
// // //         <DialogActions sx={{ px: 3, py: 2 }}>
// // //           <Button onClick={handleCloseDialog}>
// // //             Close
// // //           </Button>
// // //           <Button 
// // //             variant="contained" 
// // //             endIcon={<ArrowForwardIcon />}
// // //             sx={{ 
// // //               background: 'linear-gradient(45deg, #6366F1, #8B5CF6)',
// // //               '&:hover': {
// // //                 background: 'linear-gradient(45deg, #4F46E5, #7C3AED)'
// // //               }
// // //             }}
// // //           >
// // //             View Full Report
// // //           </Button>
// // //         </DialogActions>
// // //       </Dialog>
// // //     </Container>
// // //   );
// // // };

// // // export default BusinessTransactions;



// // import React, { useState, useEffect, useCallback } from 'react';
// // import {
// //   Box,
// //   Container,
// //   Typography,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   TablePagination,
// //   Chip,
// //   Card,
// //   CardContent,
// //   CircularProgress,
// //   Alert,
// //   IconButton,
// //   Stack,
// //   Select,
// //   MenuItem,
// //   FormControl,
// //   InputLabel,
// //   TextField,
// //   InputAdornment,
// //   Grid,
// //   Tooltip,
// //   alpha,
// //   Button,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   Paper
// // } from '@mui/material';
// // import {
// //   Refresh as RefreshIcon,
// //   Search as SearchIcon,
// //   FilterList as FilterIcon,
// //   Download as DownloadIcon,
// //   Payment as PaymentIcon,
// //   Login as LoginIcon,
// //   AccountCircle as UserIcon,
// //   Security as SecurityIcon,
// //   Settings as SettingsIcon,
// //   ShoppingCart as CartIcon,
// //   ArrowUpward,
// //   ArrowDownward,
// //   MoreVert as MoreIcon,
// //   CheckCircle,
// //   Error as ErrorIcon,
// //   Pending as PendingIcon,
// //   Info as InfoIcon,
// //   ContentCopy as CopyIcon,
// //   Visibility as ViewIcon,
// //   CalendarToday as CalendarIcon,
// //   Timeline as TimelineIcon,
// //   ArrowForward as ArrowForwardIcon
// // } from '@mui/icons-material';

// // import { businessAuthService } from '../services/businessAuth';
// // import { formatDate } from '../utils/formatters';

// // const BusinessTransactions = () => {
// //   const [allTransactions, setAllTransactions] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [filters, setFilters] = useState({
// //     eventType: 'ALL',
// //     status: 'ALL',
// //     search: '',
// //     dateRange: 'ALL'
// //   });
// //   const [businessId, setBusinessId] = useState('');
// //   const [pagination, setPagination] = useState({
// //     page: 0,
// //     limit: 10,
// //     total: 0
// //   });
// //   const [sortConfig, setSortConfig] = useState({
// //     field: 'createdAt',
// //     direction: 'desc'
// //   });
// //   const [selectedTransaction, setSelectedTransaction] = useState(null);
// //   const [viewDialogOpen, setViewDialogOpen] = useState(false);

// //   const EVENT_TYPES = {
// //     ALL: { label: 'All Events', icon: <FilterIcon fontSize="small" />, color: '#6366F1', bgColor: '#E0E7FF' },
// //     PAYMENT: { label: 'Payment', icon: <PaymentIcon fontSize="small" />, color: '#10B981', bgColor: '#D1FAE5' },
// //     LOGIN: { label: 'Login', icon: <LoginIcon fontSize="small" />, color: '#3B82F6', bgColor: '#DBEAFE' },
// //     USER_CREATED: { label: 'User Created', icon: <UserIcon fontSize="small" />, color: '#8B5CF6', bgColor: '#EDE9FE' },
// //     SECURITY_ALERT: { label: 'Security Alert', icon: <SecurityIcon fontSize="small" />, color: '#EF4444', bgColor: '#FEE2E2' },
// //     SETTINGS_CHANGE: { label: 'Settings Change', icon: <SettingsIcon fontSize="small" />, color: '#F59E0B', bgColor: '#FEF3C7' },
// //     SUBSCRIPTION: { label: 'Subscription', icon: <CartIcon fontSize="small" />, color: '#EC4899', bgColor: '#FCE7F3' },
// //     API_CALL: { label: 'API Call', icon: <SettingsIcon fontSize="small" />, color: '#6366F1', bgColor: '#E0E7FF' },
// //     DATA_EXPORT: { label: 'Data Export', icon: <DownloadIcon fontSize="small" />, color: '#14B8A6', bgColor: '#CCFBF1' }
// //   };

// //   const STATUS_TYPES = {
// //     ALL: { label: 'All Status', icon: <FilterIcon fontSize="small" />, color: '#6B7280', bgColor: '#F3F4F6' },
// //     SUCCESS: { label: 'Success', icon: <CheckCircle fontSize="small" />, color: '#10B981' },
// //     PENDING: { label: 'Pending', icon: <PendingIcon fontSize="small" />, color: '#F59E0B' },
// //     FAILED: { label: 'Failed', icon: <ErrorIcon fontSize="small" />, color: '#EF4444' },
// //     APPROVED: { label: 'Approved', icon: <CheckCircle fontSize="small" />, color: '#10B981' },
// //     REJECTED: { label: 'Rejected', icon: <ErrorIcon fontSize="small" />, color: '#EF4444' },
// //     PROCESSING: { label: 'Processing', icon: <PendingIcon fontSize="small" />, color: '#6366F1' }
// //   };

// //   const DATE_RANGES = {
// //     ALL: { label: 'All Time', icon: <CalendarIcon fontSize="small" /> },
// //     TODAY: { label: 'Today', icon: <CalendarIcon fontSize="small" /> },
// //     '7DAYS': { label: 'Last 7 Days', icon: <CalendarIcon fontSize="small" /> },
// //     '30DAYS': { label: 'Last 30 Days', icon: <CalendarIcon fontSize="small" /> },
// //     '90DAYS': { label: 'Last 90 Days', icon: <CalendarIcon fontSize="small" /> }
// //   };

// //   useEffect(() => {
// //     const userStr = localStorage.getItem('user');
// //     if (userStr) {
// //       try {
// //         const user = JSON.parse(userStr);
// //         const bid = user.businessId || user.businessID || user.id;
// //         if (bid) {
// //           setBusinessId(bid);
// //         } else {
// //           setError('Business ID not found in user profile');
// //           setLoading(false);
// //         }
// //       } catch (error) {
// //         setError('Failed to load user data');
// //         setLoading(false);
// //       }
// //     } else {
// //       setError('User not found. Please login again.');
// //       setLoading(false);
// //     }
// //   }, []);

// //   const fetchTransactions = useCallback(async () => {
// //     if (!businessId) {
// //       setError('Business ID is required');
// //       return;
// //     }
    
// //     setLoading(true);
// //     setError(null);
    
// //     try {
// //       // Fetch ALL transactions without any filtering
// //       const result = await businessAuthService.getBusinessTransactions(
// //         businessId,
// //         undefined, // No event type filter
// //         1, // Always get first page
// //         1000, // Get large number to handle client-side filtering
// //         undefined, // No status filter
// //         undefined, // No search filter
// //         undefined // No date filter (we'll do this client-side)
// //       );
      
// //       if (result.success) {
// //         setAllTransactions(result.data || []);
// //         setPagination(prev => ({
// //           ...prev,
// //           total: result.data?.length || 0
// //         }));
// //       } else {
// //         setError(result.error || 'Failed to fetch transactions');
// //       }
// //     } catch (err) {
// //       setError(err.message || 'An error occurred while fetching transactions');
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [businessId]);

// //   useEffect(() => {
// //     if (businessId) {
// //       fetchTransactions();
// //     }
// //   }, [businessId, fetchTransactions]);

// //   // Improved getUserName function - checks multiple possible field names
// //   const getUserName = (transaction) => {
// //     // Priority order for user name fields
// //     const nameFields = [
// //       transaction.userName,
// //       transaction.name,
// //       transaction.user?.name,
// //       transaction.user?.fullName,
// //       transaction.customerName,
// //       transaction.clientName,
// //       transaction.initiatedBy,
// //       transaction.performedBy,
// //       transaction.initiatorName,
// //       transaction.createdBy
// //     ];
    
// //     for (const field of nameFields) {
// //       if (field && typeof field === 'string' && field.trim() !== '') {
// //         return field;
// //       }
// //     }
    
// //     // Check email fields as last resort
// //     const emailFields = [
// //       transaction.user?.email,
// //       transaction.email,
// //       transaction.userEmail,
// //       transaction.customerEmail
// //     ];
    
// //     for (const field of emailFields) {
// //       if (field && field.includes('@')) {
// //         return field.split('@')[0]; // Return username part of email
// //       }
// //     }
    
// //     return 'Unknown User';
// //   };

// //   // Get user ID from transaction
// //   const getUserId = (transaction) => {
// //     const idFields = [
// //       transaction.userId,
// //       transaction.user?.id,
// //       transaction.customerId,
// //       transaction.clientId,
// //       transaction.initiatedById,
// //       transaction.performedById
// //     ];
    
// //     for (const field of idFields) {
// //       if (field) {
// //         return field;
// //       }
// //     }
    
// //     return transaction._id || transaction.id || 'N/A';
// //   };

// //   const handlePageChange = (event, newPage) => {
// //     setPagination(prev => ({ ...prev, page: newPage }));
// //   };

// //   const handleLimitChange = (event) => {
// //     setPagination(prev => ({ 
// //       ...prev, 
// //       limit: parseInt(event.target.value, 10),
// //       page: 0
// //     }));
// //   };

// //   const handleFilterChange = (filterName, value) => {
// //     setFilters(prev => ({ ...prev, [filterName]: value }));
// //     setPagination(prev => ({ ...prev, page: 0 }));
// //   };

// //   const handleSort = (field) => {
// //     setSortConfig(prev => ({
// //       field,
// //       direction: prev.field === field && prev.direction === 'desc' ? 'asc' : 'desc'
// //     }));
// //   };

// //   const handleRefresh = () => {
// //     fetchTransactions();
// //   };

// //   const handleViewTransaction = (transaction) => {
// //     setSelectedTransaction(transaction);
// //     setViewDialogOpen(true);
// //   };

// //   const handleCloseDialog = () => {
// //     setViewDialogOpen(false);
// //     setSelectedTransaction(null);
// //   };

// //   const copyToClipboard = (text) => {
// //     if (text && text !== 'N/A') {
// //       navigator.clipboard.writeText(text);
// //     }
// //   };

// //   const getEventConfig = (eventType) => {
// //     if (!eventType) return {
// //       label: 'Unknown',
// //       icon: <InfoIcon fontSize="small" />,
// //       color: '#6B7280',
// //       bgColor: '#F3F4F6'
// //     };
    
// //     return EVENT_TYPES[eventType.toUpperCase()] || {
// //       label: eventType,
// //       icon: <InfoIcon fontSize="small" />,
// //       color: '#6B7280',
// //       bgColor: '#F3F4F6'
// //     };
// //   };

// //   const getStatusConfig = (status) => {
// //     if (!status) return {
// //       label: 'Unknown',
// //       icon: <InfoIcon fontSize="small" />,
// //       color: '#6B7280'
// //     };
    
// //     return STATUS_TYPES[status.toUpperCase()] || {
// //       label: status,
// //       icon: <InfoIcon fontSize="small" />,
// //       color: '#6B7280'
// //     };
// //   };

// //   const formatAmount = (amount, currency) => {
// //     if (amount === null || amount === undefined) return 'N/A';
    
// //     try {
// //       const numAmount = parseFloat(amount);
// //       if (isNaN(numAmount)) return 'N/A';
      
// //       if (numAmount === 0) return '$0.00';
      
// //       return new Intl.NumberFormat('en-US', {
// //         style: 'currency',
// //         currency: currency || 'USD',
// //         minimumFractionDigits: 2,
// //         maximumFractionDigits: 2
// //       }).format(numAmount);
// //     } catch (error) {
// //       return `$${parseFloat(amount).toFixed(2)}`;
// //     }
// //   };

// //   // Apply date filter to a transaction
// //   const isWithinDateRange = (transactionDate) => {
// //     if (filters.dateRange === 'ALL') return true;
    
// //     const transactionTime = new Date(transactionDate).getTime();
// //     const now = new Date();
// //     let startTime;
    
// //     switch(filters.dateRange) {
// //       case 'TODAY':
// //         startTime = new Date(now.setHours(0, 0, 0, 0)).getTime();
// //         break;
// //       case '7DAYS':
// //         startTime = new Date(now.setDate(now.getDate() - 7)).getTime();
// //         break;
// //       case '30DAYS':
// //         startTime = new Date(now.setDate(now.getDate() - 30)).getTime();
// //         break;
// //       case '90DAYS':
// //         startTime = new Date(now.setDate(now.getDate() - 90)).getTime();
// //         break;
// //       default:
// //         return true;
// //     }
    
// //     return transactionTime >= startTime;
// //   };

// //   // Filter and sort transactions
// //   const getFilteredTransactions = () => {
// //     let filtered = allTransactions.filter(transaction => 
// //       isWithinDateRange(transaction.createdAt)
// //     );
    
// //     // Apply event type filter
// //     if (filters.eventType !== 'ALL') {
// //       filtered = filtered.filter(t => 
// //         t.eventType && t.eventType.toUpperCase() === filters.eventType
// //       );
// //     }
    
// //     // Apply status filter
// //     if (filters.status !== 'ALL') {
// //       filtered = filtered.filter(t => 
// //         t.status && t.status.toUpperCase() === filters.status
// //       );
// //     }
    
// //     // Apply search filter
// //     if (filters.search) {
// //       const searchLower = filters.search.toLowerCase();
// //       filtered = filtered.filter(transaction => {
// //         const searchFields = [
// //           transaction.transactionId,
// //           getUserName(transaction),
// //           transaction.eventType,
// //           transaction.status,
// //           transaction.description,
// //           formatAmount(transaction.amount, transaction.currency),
// //           getUserId(transaction)
// //         ];
        
// //         return searchFields.some(field => 
// //           field && field.toString().toLowerCase().includes(searchLower)
// //         );
// //       });
// //     }
    
// //     // Apply sorting
// //     if (sortConfig.field) {
// //       filtered.sort((a, b) => {
// //         let aVal = a[sortConfig.field];
// //         let bVal = b[sortConfig.field];
        
// //         // Handle undefined/null values
// //         if (aVal === undefined || aVal === null) aVal = '';
// //         if (bVal === undefined || bVal === null) bVal = '';
        
// //         if (sortConfig.field === 'createdAt') {
// //           aVal = new Date(aVal).getTime();
// //           bVal = new Date(bVal).getTime();
// //         }
        
// //         if (sortConfig.field === 'amount') {
// //           aVal = parseFloat(aVal) || 0;
// //           bVal = parseFloat(bVal) || 0;
// //         }
        
// //         if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
// //         if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
// //         return 0;
// //       });
// //     }
    
// //     return filtered;
// //   };

// //   // Get paginated transactions
// //   const getPaginatedTransactions = () => {
// //     const filtered = getFilteredTransactions();
// //     const total = filtered.length;
// //     const startIndex = pagination.page * pagination.limit;
// //     const endIndex = startIndex + pagination.limit;
    
// //     return {
// //       total,
// //       displayed: filtered.slice(startIndex, endIndex)
// //     };
// //   };

// //   const { total: totalTransactions, displayed: displayedTransactions } = getPaginatedTransactions();

// //   return (
// //     <Container maxWidth="xl" sx={{ 
// //       py: 4,
// //       minHeight: '100vh',
// //       background: 'linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)'
// //     }}>
// //       {/* Header */}
// //       <Box sx={{ mb: 4 }}>
// //         <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
// //           <Box>
// //             <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
// //               Transaction History
// //             </Typography>
// //             <Stack direction="row" alignItems="center" spacing={1}>
// //               <TimelineIcon sx={{ color: 'primary.main', fontSize: 20 }} />
// //               <Typography variant="body2" color="text.secondary">
// //                 Monitor and analyze all business activities and transactions
// //               </Typography>
// //             </Stack>
// //           </Box>
// //           <Stack direction="row" spacing={1}>
// //             <Button
// //               variant="outlined"
// //               startIcon={<RefreshIcon />}
// //               onClick={handleRefresh}
// //               disabled={loading}
// //               size="small"
// //             >
// //               Refresh
// //             </Button>
// //             <Button
// //               variant="contained"
// //               startIcon={<DownloadIcon />}
// //               size="small"
// //               sx={{ 
// //                 background: 'linear-gradient(45deg, #6366F1, #8B5CF6)',
// //                 '&:hover': {
// //                   background: 'linear-gradient(45deg, #4F46E5, #7C3AED)'
// //                 }
// //               }}
// //             >
// //               Export
// //             </Button>
// //           </Stack>
// //         </Stack>
// //       </Box>

// //       {/* Filters Card */}
// //       <Card sx={{ 
// //         mb: 4,
// //         borderRadius: 2,
// //         boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
// //         border: '1px solid rgba(0,0,0,0.05)',
// //         background: 'rgba(255, 255, 255, 0.9)'
// //       }}>
// //         <CardContent>
// //           <Grid container spacing={2} alignItems="center">
// //             <Grid item xs={12} md={4}>
// //               <TextField
// //                 fullWidth
// //                 size="medium"
// //                 placeholder="Search transactions by ID, user, type, amount, status..."
// //                 value={filters.search}
// //                 onChange={(e) => handleFilterChange('search', e.target.value)}
// //                 InputProps={{
// //                   startAdornment: (
// //                     <InputAdornment position="start">
// //                       <SearchIcon fontSize="small" color="primary" />
// //                     </InputAdornment>
// //                   ),
// //                   sx: { 
// //                     borderRadius: 2,
// //                     background: 'rgba(255, 255, 255, 0.8)'
// //                   }
// //                 }}
// //               />
// //             </Grid>
            
// //             <Grid item xs={12} sm={6} md={2}>
// //               <FormControl fullWidth size="medium">
// //                 <InputLabel>Event Type</InputLabel>
// //                 <Select
// //                   value={filters.eventType}
// //                   label="Event Type"
// //                   onChange={(e) => handleFilterChange('eventType', e.target.value)}
// //                   sx={{ borderRadius: 2 }}
// //                 >
// //                   {Object.entries(EVENT_TYPES).map(([key, config]) => (
// //                     <MenuItem key={key} value={key}>
// //                       <Stack direction="row" alignItems="center" spacing={1}>
// //                         <Box sx={{ color: config.color }}>
// //                           {config.icon}
// //                         </Box>
// //                         <Typography>{config.label}</Typography>
// //                       </Stack>
// //                     </MenuItem>
// //                   ))}
// //                 </Select>
// //               </FormControl>
// //             </Grid>
            
// //             <Grid item xs={12} sm={6} md={2}>
// //               <FormControl fullWidth size="medium">
// //                 <InputLabel>Status</InputLabel>
// //                 <Select
// //                   value={filters.status}
// //                   label="Status"
// //                   onChange={(e) => handleFilterChange('status', e.target.value)}
// //                   sx={{ borderRadius: 2 }}
// //                 >
// //                   {Object.entries(STATUS_TYPES).map(([key, config]) => (
// //                     <MenuItem key={key} value={key}>
// //                       <Stack direction="row" alignItems="center" spacing={1}>
// //                         <Box sx={{ color: config.color }}>
// //                           {config.icon}
// //                         </Box>
// //                         <Typography>{config.label}</Typography>
// //                       </Stack>
// //                     </MenuItem>
// //                   ))}
// //                 </Select>
// //               </FormControl>
// //             </Grid>
            
// //             <Grid item xs={12} sm={6} md={2}>
// //               <FormControl fullWidth size="medium">
// //                 <InputLabel>Date Range</InputLabel>
// //                 <Select
// //                   value={filters.dateRange}
// //                   label="Date Range"
// //                   onChange={(e) => handleFilterChange('dateRange', e.target.value)}
// //                   sx={{ borderRadius: 2 }}
// //                 >
// //                   {Object.entries(DATE_RANGES).map(([key, config]) => (
// //                     <MenuItem key={key} value={key}>
// //                       <Stack direction="row" alignItems="center" spacing={1}>
// //                         {config.icon && (
// //                           <Box sx={{ color: 'primary.main' }}>
// //                             {config.icon}
// //                           </Box>
// //                         )}
// //                         <Typography>{config.label}</Typography>
// //                       </Stack>
// //                     </MenuItem>
// //                   ))}
// //                 </Select>
// //               </FormControl>
// //             </Grid>
            
// //             <Grid item xs={12} sm={6} md={2}>
// //               <FormControl fullWidth size="medium">
// //                 <InputLabel>Rows per page</InputLabel>
// //                 <Select
// //                   value={pagination.limit}
// //                   label="Rows per page"
// //                   onChange={handleLimitChange}
// //                   sx={{ borderRadius: 2 }}
// //                 >
// //                   <MenuItem value={5}>5</MenuItem>
// //                   <MenuItem value={10}>10</MenuItem>
// //                   <MenuItem value={25}>25</MenuItem>
// //                   <MenuItem value={50}>50</MenuItem>
// //                 </Select>
// //               </FormControl>
// //             </Grid>
// //           </Grid>
// //         </CardContent>
// //       </Card>

// //       {/* Error Alert */}
// //       {error && (
// //         <Alert 
// //           severity="error" 
// //           sx={{ 
// //             mb: 3,
// //             borderRadius: 2,
// //             boxShadow: '0 2px 12px rgba(239,68,68,0.1)'
// //           }} 
// //           onClose={() => setError(null)}
// //         >
// //           {error}
// //         </Alert>
// //       )}

// //       {/* Transactions Table */}
// //       <Card sx={{ 
// //         borderRadius: 2,
// //         boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
// //         border: '1px solid rgba(0,0,0,0.05)',
// //         overflow: 'hidden',
// //         background: 'rgba(255, 255, 255, 0.95)'
// //       }}>
// //         <CardContent sx={{ p: 0 }}>
// //           {loading && allTransactions.length === 0 ? (
// //             <Box sx={{ p: 6, textAlign: 'center' }}>
// //               <CircularProgress size={40} />
// //               <Typography variant="body2" sx={{ mt: 2 }} color="text.secondary">
// //                 Loading transactions...
// //               </Typography>
// //             </Box>
// //           ) : (
// //             <>
// //               <TableContainer>
// //                 <Table>
// //                   <TableHead>
// //                     <TableRow sx={{ 
// //                       bgcolor: 'rgba(99, 102, 241, 0.04)',
// //                       '& th': { 
// //                         borderBottom: '2px solid rgba(99, 102, 241, 0.1)',
// //                         fontWeight: 600 
// //                       }
// //                     }}>
// //                       <TableCell>
// //                         <Typography variant="subtitle2" fontWeight={600} color="primary.main">
// //                           Event Type
// //                         </Typography>
// //                       </TableCell>
// //                       <TableCell>
// //                         <Typography variant="subtitle2" fontWeight={600} color="primary.main">
// //                           Transaction ID
// //                         </Typography>
// //                       </TableCell>
// //                       <TableCell>
// //                         <Typography variant="subtitle2" fontWeight={600} color="primary.main">
// //                           User
// //                         </Typography>
// //                       </TableCell>
// //                       <TableCell>
// //                         <Stack direction="row" alignItems="center" spacing={0.5}>
// //                           <Typography variant="subtitle2" fontWeight={600} color="primary.main">
// //                             Amount
// //                           </Typography>
// //                           <IconButton 
// //                             size="small" 
// //                             onClick={() => handleSort('amount')}
// //                             sx={{ 
// //                               color: sortConfig.field === 'amount' ? 'primary.main' : 'inherit'
// //                             }}
// //                           >
// //                             {sortConfig.field === 'amount' && sortConfig.direction === 'asc' ? 
// //                               <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
// //                           </IconButton>
// //                         </Stack>
// //                       </TableCell>
// //                       <TableCell>
// //                         <Typography variant="subtitle2" fontWeight={600} color="primary.main">
// //                           Status
// //                         </Typography>
// //                       </TableCell>
// //                       <TableCell>
// //                         <Stack direction="row" alignItems="center" spacing={0.5}>
// //                           <Typography variant="subtitle2" fontWeight={600} color="primary.main">
// //                             Date & Time
// //                           </Typography>
// //                           <IconButton 
// //                             size="small" 
// //                             onClick={() => handleSort('createdAt')}
// //                             sx={{ 
// //                               color: sortConfig.field === 'createdAt' ? 'primary.main' : 'inherit'
// //                             }}
// //                           >
// //                             {sortConfig.field === 'createdAt' && sortConfig.direction === 'asc' ? 
// //                               <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
// //                           </IconButton>
// //                         </Stack>
// //                       </TableCell>
// //                       <TableCell>
// //                         <Typography variant="subtitle2" fontWeight={600} color="primary.main">
// //                           Actions
// //                         </Typography>
// //                       </TableCell>
// //                     </TableRow>
// //                   </TableHead>
// //                   <TableBody>
// //                     {displayedTransactions.length === 0 ? (
// //                       <TableRow>
// //                         <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
// //                           <FilterIcon sx={{ fontSize: 64, color: 'rgba(99, 102, 241, 0.3)', mb: 2 }} />
// //                           <Typography variant="h6" color="text.secondary" gutterBottom>
// //                             {filters.search || filters.eventType !== 'ALL' || filters.status !== 'ALL' 
// //                               ? 'No transactions match your filters' 
// //                               : 'No transactions found'}
// //                           </Typography>
// //                           <Typography variant="body2" color="text.secondary">
// //                             {filters.search ? 'Try a different search term' : 'Try adjusting your filters'}
// //                           </Typography>
// //                         </TableCell>
// //                       </TableRow>
// //                     ) : (
// //                       displayedTransactions.map((transaction, index) => {
// //                         const eventConfig = getEventConfig(transaction.eventType);
// //                         const statusConfig = getStatusConfig(transaction.status);
// //                         const userName = getUserName(transaction);
// //                         const userId = getUserId(transaction);
                        
// //                         return (
// //                           <TableRow 
// //                             key={transaction._id || transaction.transactionId || `trans-${index}`}
// //                             hover
// //                             sx={{ 
// //                               '&:last-child td, &:last-child th': { border: 0 },
// //                               '&:hover': { 
// //                                 bgcolor: 'rgba(99, 102, 241, 0.02)'
// //                               }
// //                             }}
// //                           >
// //                             <TableCell>
// //                               <Stack direction="row" alignItems="center" spacing={1.5}>
// //                                 <Box sx={{ 
// //                                   p: 1.5,
// //                                   borderRadius: 1.5,
// //                                   bgcolor: eventConfig.bgColor,
// //                                   display: 'flex',
// //                                   alignItems: 'center',
// //                                   justifyContent: 'center'
// //                                 }}>
// //                                   <Box sx={{ color: eventConfig.color }}>
// //                                     {eventConfig.icon}
// //                                   </Box>
// //                                 </Box>
// //                                 <Box>
// //                                   <Typography variant="body2" fontWeight={600}>
// //                                     {eventConfig.label}
// //                                   </Typography>
// //                                 </Box>
// //                               </Stack>
// //                             </TableCell>
// //                             <TableCell>
// //                               <Stack direction="row" alignItems="center" spacing={1}>
// //                                 <Typography 
// //                                   variant="body2" 
// //                                   sx={{ 
// //                                     fontFamily: 'monospace',
// //                                     fontSize: '0.75rem',
// //                                     color: 'text.secondary',
// //                                     fontWeight: 500
// //                                   }}
// //                                 >
// //                                   {transaction.transactionId ? 
// //                                     `${transaction.transactionId.slice(0, 12)}...` : 'N/A'}
// //                                 </Typography>
// //                                 {transaction.transactionId && (
// //                                   <Tooltip title="Copy ID">
// //                                     <IconButton 
// //                                       size="small" 
// //                                       onClick={() => copyToClipboard(transaction.transactionId)}
// //                                       sx={{ 
// //                                         color: 'primary.light',
// //                                         '&:hover': { color: 'primary.main' }
// //                                       }}
// //                                     >
// //                                       <CopyIcon fontSize="small" />
// //                                     </IconButton>
// //                                   </Tooltip>
// //                                 )}
// //                               </Stack>
// //                             </TableCell>
// //                             <TableCell>
// //                               <Stack>
// //                                 <Typography variant="body2" fontWeight={600}>
// //                                   {userName}
// //                                 </Typography>
// //                                 <Typography variant="caption" color="text.secondary">
// //                                   ID: {userId ? `${userId.slice(0, 8)}...` : 'N/A'}
// //                                 </Typography>
// //                               </Stack>
// //                             </TableCell>
// //                             <TableCell>
// //                               <Typography 
// //                                 variant="body2" 
// //                                 fontWeight={700}
// //                                 color={parseFloat(transaction.amount || 0) > 0 ? 'success.main' : 
// //                                       parseFloat(transaction.amount || 0) < 0 ? 'error.main' : 'text.primary'}
// //                               >
// //                                 {formatAmount(transaction.amount, transaction.currency)}
// //                               </Typography>
// //                             </TableCell>
// //                             <TableCell>
// //                               <Chip
// //                                 icon={statusConfig.icon}
// //                                 label={statusConfig.label}
// //                                 size="small"
// //                                 sx={{ 
// //                                   fontWeight: 600,
// //                                   bgcolor: alpha(statusConfig.color, 0.1),
// //                                   color: statusConfig.color,
// //                                   border: `1px solid ${alpha(statusConfig.color, 0.2)}`,
// //                                   '& .MuiChip-icon': {
// //                                     color: statusConfig.color
// //                                   }
// //                                 }}
// //                               />
// //                             </TableCell>
// //                             <TableCell>
// //                               <Stack>
// //                                 <Typography variant="body2" fontWeight={600}>
// //                                   {formatDate(transaction.createdAt, 'MMM D, YYYY')}
// //                                 </Typography>
// //                                 <Typography variant="caption" color="text.secondary">
// //                                   {formatDate(transaction.createdAt, 'h:mm A')}
// //                                 </Typography>
// //                               </Stack>
// //                             </TableCell>
// //                             <TableCell>
// //                               <Stack direction="row" spacing={0.5}>
// //                                 <Tooltip title="View details">
// //                                   <IconButton 
// //                                     size="small" 
// //                                     onClick={() => handleViewTransaction(transaction)}
// //                                     sx={{ 
// //                                       color: 'primary.light',
// //                                       '&:hover': { 
// //                                         color: 'primary.main',
// //                                         bgcolor: 'rgba(99, 102, 241, 0.1)'
// //                                       }
// //                                     }}
// //                                   >
// //                                     <ViewIcon fontSize="small" />
// //                                   </IconButton>
// //                                 </Tooltip>
// //                               </Stack>
// //                             </TableCell>
// //                           </TableRow>
// //                         );
// //                       })
// //                     )}
// //                   </TableBody>
// //                 </Table>
// //               </TableContainer>
              
// //               {/* Pagination */}
// //               {displayedTransactions.length > 0 && (
// //                 <TablePagination
// //                   component="div"
// //                   count={totalTransactions}
// //                   page={pagination.page}
// //                   onPageChange={handlePageChange}
// //                   rowsPerPage={pagination.limit}
// //                   onRowsPerPageChange={handleLimitChange}
// //                   rowsPerPageOptions={[5, 10, 25, 50]}
// //                   sx={{ 
// //                     borderTop: '1px solid rgba(0,0,0,0.08)',
// //                     px: 3,
// //                     py: 2,
// //                     '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
// //                       fontWeight: 500
// //                     }
// //                   }}
// //                 />
// //               )}
// //             </>
// //           )}
// //         </CardContent>
// //       </Card>

// //       {/* Footer */}
// //       <Box sx={{ 
// //         mt: 4, 
// //         pt: 3, 
// //         borderTop: '1px solid rgba(0,0,0,0.08)' 
// //       }}>
// //         <Stack direction="row" justifyContent="space-between" alignItems="center">
// //           <Typography variant="caption" color="text.secondary">
// //             Showing {Math.min(displayedTransactions.length, pagination.limit)} of {totalTransactions} transactions
// //             {filters.search && ` for "${filters.search}"`}
// //           </Typography>
// //           <Stack direction="row" alignItems="center" spacing={1}>
// //             <Typography variant="caption" color="text.secondary">
// //               Business ID:
// //             </Typography>
// //             <Chip
// //               label={businessId ? `${businessId.slice(0, 16)}...` : 'N/A'}
// //               size="small"
// //               sx={{ 
// //                 fontFamily: 'monospace',
// //                 fontWeight: 500,
// //                 bgcolor: 'rgba(99, 102, 241, 0.1)',
// //                 color: 'primary.main'
// //               }}
// //             />
// //           </Stack>
// //         </Stack>
// //       </Box>

// //       {/* Transaction Detail Dialog */}
// //       <Dialog 
// //         open={viewDialogOpen} 
// //         onClose={handleCloseDialog}
// //         maxWidth="md"
// //         fullWidth
// //       >
// //         <DialogTitle>
// //           <Stack direction="row" alignItems="center" spacing={2}>
// //             {selectedTransaction && (
// //               <>
// //                 <Box sx={{ 
// //                   p: 1.5,
// //                   borderRadius: 1.5,
// //                   bgcolor: getEventConfig(selectedTransaction.eventType).bgColor,
// //                   display: 'flex',
// //                   alignItems: 'center',
// //                   justifyContent: 'center'
// //                 }}>
// //                   <Box sx={{ color: getEventConfig(selectedTransaction.eventType).color }}>
// //                     {getEventConfig(selectedTransaction.eventType).icon}
// //                   </Box>
// //                 </Box>
// //                 <Box>
// //                   <Typography variant="h6" fontWeight={600}>
// //                     Transaction Details
// //                   </Typography>
// //                   <Typography variant="body2" color="text.secondary">
// //                     {selectedTransaction.transactionId || 'N/A'}
// //                   </Typography>
// //                 </Box>
// //               </>
// //             )}
// //           </Stack>
// //         </DialogTitle>
// //         <DialogContent dividers>
// //           {selectedTransaction && (
// //             <Grid container spacing={3}>
// //               <Grid item xs={12} md={6}>
// //                 <Typography variant="subtitle2" color="text.secondary" gutterBottom>
// //                   Basic Information
// //                 </Typography>
// //                 <Stack spacing={2}>
// //                   <Box>
// //                     <Typography variant="caption" color="text.secondary">
// //                       Transaction ID
// //                     </Typography>
// //                     <Stack direction="row" alignItems="center" spacing={1}>
// //                       <Typography variant="body2" fontWeight={500} sx={{ fontFamily: 'monospace' }}>
// //                         {selectedTransaction.transactionId || 'N/A'}
// //                       </Typography>
// //                       {selectedTransaction.transactionId && (
// //                         <IconButton 
// //                           size="small" 
// //                           onClick={() => copyToClipboard(selectedTransaction.transactionId)}
// //                         >
// //                           <CopyIcon fontSize="small" />
// //                         </IconButton>
// //                       )}
// //                     </Stack>
// //                   </Box>
// //                   <Box>
// //                     <Typography variant="caption" color="text.secondary">
// //                       Event Type
// //                     </Typography>
// //                     <Stack direction="row" alignItems="center" spacing={1}>
// //                       <Chip
// //                         icon={getEventConfig(selectedTransaction.eventType).icon}
// //                         label={getEventConfig(selectedTransaction.eventType).label}
// //                         size="small"
// //                         sx={{ 
// //                           fontWeight: 500,
// //                           bgcolor: getEventConfig(selectedTransaction.eventType).bgColor,
// //                           color: getEventConfig(selectedTransaction.eventType).color
// //                         }}
// //                       />
// //                     </Stack>
// //                   </Box>
// //                   <Box>
// //                     <Typography variant="caption" color="text.secondary">
// //                       Status
// //                     </Typography>
// //                     <Chip
// //                       icon={getStatusConfig(selectedTransaction.status).icon}
// //                       label={getStatusConfig(selectedTransaction.status).label}
// //                       size="small"
// //                       sx={{ 
// //                         mt: 0.5,
// //                         fontWeight: 500,
// //                         bgcolor: alpha(getStatusConfig(selectedTransaction.status).color, 0.1),
// //                         color: getStatusConfig(selectedTransaction.status).color
// //                       }}
// //                     />
// //                   </Box>
// //                 </Stack>
// //               </Grid>
              
// //               <Grid item xs={12} md={6}>
// //                 <Typography variant="subtitle2" color="text.secondary" gutterBottom>
// //                   Financial Details
// //                 </Typography>
// //                 <Stack spacing={2}>
// //                   <Box>
// //                     <Typography variant="caption" color="text.secondary">
// //                       Amount
// //                     </Typography>
// //                     <Typography 
// //                       variant="h6" 
// //                       fontWeight={600}
// //                       color={parseFloat(selectedTransaction.amount || 0) > 0 ? 'success.main' : 
// //                             parseFloat(selectedTransaction.amount || 0) < 0 ? 'error.main' : 'text.primary'}
// //                     >
// //                       {formatAmount(selectedTransaction.amount, selectedTransaction.currency)}
// //                     </Typography>
// //                   </Box>
// //                   <Box>
// //                     <Typography variant="caption" color="text.secondary">
// //                       Currency
// //                     </Typography>
// //                     <Typography variant="body2" fontWeight={500}>
// //                       {selectedTransaction.currency || 'USD'}
// //                     </Typography>
// //                   </Box>
// //                   <Box>
// //                     <Typography variant="caption" color="text.secondary">
// //                       Created At
// //                     </Typography>
// //                     <Typography variant="body2" fontWeight={500}>
// //                       {formatDate(selectedTransaction.createdAt, 'MMM D, YYYY h:mm A') || 'N/A'}
// //                     </Typography>
// //                   </Box>
// //                 </Stack>
// //               </Grid>
              
// //               <Grid item xs={12}>
// //                 <Typography variant="subtitle2" color="text.secondary" gutterBottom>
// //                   User Information
// //                 </Typography>
// //                 <Stack spacing={2}>
// //                   <Box>
// //                     <Typography variant="caption" color="text.secondary">
// //                       User Name
// //                     </Typography>
// //                     <Typography variant="body2" fontWeight={500}>
// //                       {getUserName(selectedTransaction)}
// //                     </Typography>
// //                   </Box>
// //                   <Box>
// //                     <Typography variant="caption" color="text.secondary">
// //                       User ID
// //                     </Typography>
// //                     <Stack direction="row" alignItems="center" spacing={1}>
// //                       <Typography variant="body2" fontWeight={500} sx={{ fontFamily: 'monospace' }}>
// //                         {getUserId(selectedTransaction)}
// //                       </Typography>
// //                       {getUserId(selectedTransaction) && getUserId(selectedTransaction) !== 'N/A' && (
// //                         <IconButton 
// //                           size="small" 
// //                           onClick={() => copyToClipboard(getUserId(selectedTransaction))}
// //                         >
// //                           <CopyIcon fontSize="small" />
// //                         </IconButton>
// //                       )}
// //                     </Stack>
// //                   </Box>
// //                 </Stack>
// //               </Grid>
              
// //               {selectedTransaction.description && (
// //                 <Grid item xs={12}>
// //                   <Typography variant="subtitle2" color="text.secondary" gutterBottom>
// //                     Description
// //                   </Typography>
// //                   <Paper 
// //                     variant="outlined" 
// //                     sx={{ 
// //                       p: 2,
// //                       bgcolor: 'rgba(0,0,0,0.02)',
// //                       borderRadius: 1.5
// //                     }}
// //                   >
// //                     <Typography variant="body2">
// //                       {selectedTransaction.description}
// //                     </Typography>
// //                   </Paper>
// //                 </Grid>
// //               )}
// //             </Grid>
// //           )}
// //         </DialogContent>
// //         <DialogActions sx={{ px: 3, py: 2 }}>
// //           <Button onClick={handleCloseDialog}>
// //             Close
// //           </Button>
// //           <Button 
// //             variant="contained" 
// //             endIcon={<ArrowForwardIcon />}
// //             sx={{ 
// //               background: 'linear-gradient(45deg, #6366F1, #8B5CF6)',
// //               '&:hover': {
// //                 background: 'linear-gradient(45deg, #4F46E5, #7C3AED)'
// //               }
// //             }}
// //           >
// //             View Full Report
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </Container>
// //   );
// // };

// // export default BusinessTransactions;

// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   Box,
//   Container,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Chip,
//   Card,
//   CardContent,
//   CircularProgress,
//   Alert,
//   IconButton,
//   Stack,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   TextField,
//   InputAdornment,
//   Grid,
//   Tooltip,
//   alpha,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Paper
// } from '@mui/material';
// import {
//   Refresh as RefreshIcon,
//   Search as SearchIcon,
//   FilterList as FilterIcon,
//   Download as DownloadIcon,
//   Payment as PaymentIcon,
//   Login as LoginIcon,
//   AccountCircle as UserIcon,
//   Security as SecurityIcon,
//   Settings as SettingsIcon,
//   ShoppingCart as CartIcon,
//   ArrowUpward,
//   ArrowDownward,
//   CheckCircle,
//   Error as ErrorIcon,
//   Pending as PendingIcon,
//   Info as InfoIcon,
//   ContentCopy as CopyIcon,
//   Visibility as ViewIcon,
//   CalendarToday as CalendarIcon,
//   Timeline as TimelineIcon,
//   ArrowForward as ArrowForwardIcon
// } from '@mui/icons-material';

// import { businessAuthService } from '../services/businessAuth';
// import { formatDate } from '../utils/formatters';

// const BusinessTransactions = () => {
//   const [allTransactions, setAllTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filters, setFilters] = useState({
//     eventType: 'ALL',
//     status: 'ALL',
//     search: '',
//     dateRange: 'ALL'
//   });
//   const [businessId, setBusinessId] = useState('');
//   const [pagination, setPagination] = useState({
//     page: 0,
//     limit: 10,
//     total: 0
//   });
//   const [sortConfig, setSortConfig] = useState({
//     field: 'createdAt',
//     direction: 'desc'
//   });
//   const [selectedTransaction, setSelectedTransaction] = useState(null);
//   const [viewDialogOpen, setViewDialogOpen] = useState(false);

//   const EVENT_TYPES = {
//     ALL: { label: 'All Events', icon: <FilterIcon fontSize="small" />, color: '#6366F1', bgColor: '#E0E7FF' },
//     PAYMENT: { label: 'Payment', icon: <PaymentIcon fontSize="small" />, color: '#10B981', bgColor: '#D1FAE5' },
//     LOGIN: { label: 'Login', icon: <LoginIcon fontSize="small" />, color: '#3B82F6', bgColor: '#DBEAFE' },
//     USER_CREATED: { label: 'User Created', icon: <UserIcon fontSize="small" />, color: '#8B5CF6', bgColor: '#EDE9FE' },
//     SECURITY_ALERT: { label: 'Security Alert', icon: <SecurityIcon fontSize="small" />, color: '#EF4444', bgColor: '#FEE2E2' },
//     SETTINGS_CHANGE: { label: 'Settings Change', icon: <SettingsIcon fontSize="small" />, color: '#F59E0B', bgColor: '#FEF3C7' },
//     SUBSCRIPTION: { label: 'Subscription', icon: <CartIcon fontSize="small" />, color: '#EC4899', bgColor: '#FCE7F3' },
//     API_CALL: { label: 'API Call', icon: <SettingsIcon fontSize="small" />, color: '#6366F1', bgColor: '#E0E7FF' },
//     DATA_EXPORT: { label: 'Data Export', icon: <DownloadIcon fontSize="small" />, color: '#14B8A6', bgColor: '#CCFBF1' }
//   };

//   const STATUS_TYPES = {
//     ALL: { label: 'All Status', icon: <FilterIcon fontSize="small" />, color: '#6B7280', bgColor: '#F3F4F6' },
//     SUCCESS: { label: 'Success', icon: <CheckCircle fontSize="small" />, color: '#10B981' },
//     PENDING: { label: 'Pending', icon: <PendingIcon fontSize="small" />, color: '#F59E0B' },
//     FAILED: { label: 'Failed', icon: <ErrorIcon fontSize="small" />, color: '#EF4444' },
//     APPROVED: { label: 'Approved', icon: <CheckCircle fontSize="small" />, color: '#10B981' },
//     REJECTED: { label: 'Rejected', icon: <ErrorIcon fontSize="small" />, color: '#EF4444' },
//     PROCESSING: { label: 'Processing', icon: <PendingIcon fontSize="small" />, color: '#6366F1' }
//   };

//   const DATE_RANGES = {
//     ALL: { label: 'All Time', icon: <CalendarIcon fontSize="small" /> },
//     TODAY: { label: 'Today', icon: <CalendarIcon fontSize="small" /> },
//     '7DAYS': { label: 'Last 7 Days', icon: <CalendarIcon fontSize="small" /> },
//     '30DAYS': { label: 'Last 30 Days', icon: <CalendarIcon fontSize="small" /> },
//     '90DAYS': { label: 'Last 90 Days', icon: <CalendarIcon fontSize="small" /> }
//   };

//   useEffect(() => {
//     const userStr = localStorage.getItem('user');
//     if (userStr) {
//       try {
//         const user = JSON.parse(userStr);
//         const bid = user.businessId || user.businessID || user.id;
//         if (bid) {
//           setBusinessId(bid);
//         } else {
//           setError('Business ID not found in user profile');
//           setLoading(false);
//         }
//       } catch (error) {
//         setError('Failed to load user data');
//         setLoading(false);
//       }
//     } else {
//       setError('User not found. Please login again.');
//       setLoading(false);
//     }
//   }, []);

//   const fetchTransactions = useCallback(async () => {
//     if (!businessId) {
//       setError('Business ID is required');
//       return;
//     }
    
//     setLoading(true);
//     setError(null);
    
//     try {
//       // Fetch ALL transactions without any filtering
//       const result = await businessAuthService.getBusinessTransactions(
//         businessId,
//         undefined,
//         1,
//         1000,
//         undefined,
//         undefined,
//         undefined
//       );
      
//       if (result.success) {
//         setAllTransactions(result.data || []);
//         setPagination(prev => ({
//           ...prev,
//           total: result.data?.length || 0
//         }));
//       } else {
//         setError(result.error || 'Failed to fetch transactions');
//       }
//     } catch (err) {
//       setError(err.message || 'An error occurred while fetching transactions');
//     } finally {
//       setLoading(false);
//     }
//   }, [businessId]);

//   useEffect(() => {
//     if (businessId) {
//       fetchTransactions();
//     }
//   }, [businessId, fetchTransactions]);

//   // Improved getUserName function - checks multiple possible field names
//   const getUserName = (transaction) => {
//     // First, check all possible fields for a proper name
//     const nameFields = [
//       transaction.userName,
//       transaction.name,
//       transaction.user?.name,
//       transaction.user?.fullName,
//       transaction.customerName,
//       transaction.clientName,
//       transaction.initiatedBy,
//       transaction.performedBy,
//       transaction.initiatorName,
//       transaction.createdBy
//     ];
    
//     for (const field of nameFields) {
//       if (field && typeof field === 'string' && field.trim() !== '') {
//         return field;
//       }
//     }
    
//     // If no name found, check for user ID as fallback
//     const idFields = [
//       transaction.userId,
//       transaction.user?.id,
//       transaction.customerId,
//       transaction.clientId
//     ];
    
//     for (const field of idFields) {
//       if (field) {
//         return `User ${field.slice(0, 8)}...`;
//       }
//     }
    
//     return 'Unknown User';
//   };

//   // Get user ID from transaction
//   const getUserId = (transaction) => {
//     const idFields = [
//       transaction.userId,
//       transaction.user?.id,
//       transaction.customerId,
//       transaction.clientId,
//       transaction.initiatedById,
//       transaction.performedById
//     ];
    
//     for (const field of idFields) {
//       if (field) {
//         return field;
//       }
//     }
    
//     return transaction._id || transaction.id || 'N/A';
//   };

//   const handlePageChange = (event, newPage) => {
//     setPagination(prev => ({ ...prev, page: newPage }));
//   };

//   const handleLimitChange = (event) => {
//     setPagination(prev => ({ 
//       ...prev, 
//       limit: parseInt(event.target.value, 10),
//       page: 0
//     }));
//   };

//   const handleFilterChange = (filterName, value) => {
//     setFilters(prev => ({ ...prev, [filterName]: value }));
//     setPagination(prev => ({ ...prev, page: 0 }));
//   };

//   const handleSort = (field) => {
//     setSortConfig(prev => ({
//       field,
//       direction: prev.field === field && prev.direction === 'desc' ? 'asc' : 'desc'
//     }));
//   };

//   const handleRefresh = () => {
//     fetchTransactions();
//   };

//   const handleViewTransaction = (transaction) => {
//     setSelectedTransaction(transaction);
//     setViewDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setViewDialogOpen(false);
//     setSelectedTransaction(null);
//   };

//   const copyToClipboard = (text) => {
//     if (text && text !== 'N/A') {
//       navigator.clipboard.writeText(text);
//     }
//   };

//   const getEventConfig = (eventType) => {
//     if (!eventType) return {
//       label: 'Unknown',
//       icon: <InfoIcon fontSize="small" />,
//       color: '#6B7280',
//       bgColor: '#F3F4F6'
//     };
    
//     return EVENT_TYPES[eventType.toUpperCase()] || {
//       label: eventType,
//       icon: <InfoIcon fontSize="small" />,
//       color: '#6B7280',
//       bgColor: '#F3F4F6'
//     };
//   };

//   const getStatusConfig = (status) => {
//     if (!status) return {
//       label: 'Unknown',
//       icon: <InfoIcon fontSize="small" />,
//       color: '#6B7280'
//     };
    
//     return STATUS_TYPES[status.toUpperCase()] || {
//       label: status,
//       icon: <InfoIcon fontSize="small" />,
//       color: '#6B7280'
//     };
//   };

//   const formatAmount = (amount, currency) => {
//     if (amount === null || amount === undefined) return 'N/A';
    
//     try {
//       const numAmount = parseFloat(amount);
//       if (isNaN(numAmount)) return 'N/A';
      
//       if (numAmount === 0) return '$0.00';
      
//       return new Intl.NumberFormat('en-US', {
//         style: 'currency',
//         currency: currency || 'USD',
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2
//       }).format(numAmount);
//     } catch (error) {
//       return `$${parseFloat(amount).toFixed(2)}`;
//     }
//   };

//   // Apply date filter to a transaction
//   const isWithinDateRange = (transactionDate) => {
//     if (filters.dateRange === 'ALL') return true;
    
//     const transactionTime = new Date(transactionDate).getTime();
//     const now = new Date();
//     let startTime;
    
//     switch(filters.dateRange) {
//       case 'TODAY':
//         startTime = new Date(now.setHours(0, 0, 0, 0)).getTime();
//         break;
//       case '7DAYS':
//         startTime = new Date(now.setDate(now.getDate() - 7)).getTime();
//         break;
//       case '30DAYS':
//         startTime = new Date(now.setDate(now.getDate() - 30)).getTime();
//         break;
//       case '90DAYS':
//         startTime = new Date(now.setDate(now.getDate() - 90)).getTime();
//         break;
//       default:
//         return true;
//     }
    
//     return transactionTime >= startTime;
//   };

//   // Filter and sort transactions
//   const getFilteredTransactions = () => {
//     let filtered = allTransactions.filter(transaction => 
//       isWithinDateRange(transaction.createdAt)
//     );
    
//     // Apply event type filter
//     if (filters.eventType !== 'ALL') {
//       filtered = filtered.filter(t => 
//         t.eventType && t.eventType.toUpperCase() === filters.eventType
//       );
//     }
    
//     // Apply status filter
//     if (filters.status !== 'ALL') {
//       filtered = filtered.filter(t => 
//         t.status && t.status.toUpperCase() === filters.status
//       );
//     }
    
//     // Apply search filter
//     if (filters.search) {
//       const searchLower = filters.search.toLowerCase();
//       filtered = filtered.filter(transaction => {
//         const searchFields = [
//           transaction.transactionId,
//           getUserName(transaction),
//           transaction.eventType,
//           transaction.status,
//           transaction.description,
//           formatAmount(transaction.amount, transaction.currency),
//           getUserId(transaction)
//         ];
        
//         return searchFields.some(field => 
//           field && field.toString().toLowerCase().includes(searchLower)
//         );
//       });
//     }
    
//     // Apply sorting
//     if (sortConfig.field) {
//       filtered.sort((a, b) => {
//         let aVal = a[sortConfig.field];
//         let bVal = b[sortConfig.field];
        
//         if (aVal === undefined || aVal === null) aVal = '';
//         if (bVal === undefined || bVal === null) bVal = '';
        
//         if (sortConfig.field === 'createdAt') {
//           aVal = new Date(aVal).getTime();
//           bVal = new Date(bVal).getTime();
//         }
        
//         if (sortConfig.field === 'amount') {
//           aVal = parseFloat(aVal) || 0;
//           bVal = parseFloat(bVal) || 0;
//         }
        
//         if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
//         if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
//         return 0;
//       });
//     }
    
//     return filtered;
//   };

//   // Get paginated transactions
//   const getPaginatedTransactions = () => {
//     const filtered = getFilteredTransactions();
//     const total = filtered.length;
//     const startIndex = pagination.page * pagination.limit;
//     const endIndex = startIndex + pagination.limit;
    
//     return {
//       total,
//       displayed: filtered.slice(startIndex, endIndex)
//     };
//   };

//   const { total: totalTransactions, displayed: displayedTransactions } = getPaginatedTransactions();

//   return (
//     <Container maxWidth="xl" sx={{ 
//       py: 4,
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)'
//     }}>
//       {/* Header */}
//       <Box sx={{ mb: 4 }}>
//         <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
//           <Box>
//             <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
//               Transaction History
//             </Typography>
//             <Stack direction="row" alignItems="center" spacing={1}>
//               <TimelineIcon sx={{ color: 'primary.main', fontSize: 20 }} />
//               <Typography variant="body2" color="text.secondary">
//                 Monitor and analyze all business activities and transactions
//               </Typography>
//             </Stack>
//           </Box>
//           <Stack direction="row" spacing={1}>
//             <Button
//               variant="outlined"
//               startIcon={<RefreshIcon />}
//               onClick={handleRefresh}
//               disabled={loading}
//               size="small"
//             >
//               Refresh
//             </Button>
//             <Button
//               variant="contained"
//               startIcon={<DownloadIcon />}
//               size="small"
//               sx={{ 
//                 background: 'linear-gradient(45deg, #6366F1, #8B5CF6)',
//                 '&:hover': {
//                   background: 'linear-gradient(45deg, #4F46E5, #7C3AED)'
//                 }
//               }}
//             >
//               Export
//             </Button>
//           </Stack>
//         </Stack>
//       </Box>

//       {/* Filters Card */}
//       <Card sx={{ 
//         mb: 4,
//         borderRadius: 2,
//         boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
//         border: '1px solid rgba(0,0,0,0.05)',
//         background: 'rgba(255, 255, 255, 0.9)'
//       }}>
//         <CardContent>
//           <Grid container spacing={2} alignItems="center">
//             <Grid item xs={12} md={4}>
//               <TextField
//                 fullWidth
//                 size="medium"
//                 placeholder="Search transactions by ID, user, type, amount, status..."
//                 value={filters.search}
//                 onChange={(e) => handleFilterChange('search', e.target.value)}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SearchIcon fontSize="small" color="primary" />
//                     </InputAdornment>
//                   ),
//                   sx: { 
//                     borderRadius: 2,
//                     background: 'rgba(255, 255, 255, 0.8)'
//                   }
//                 }}
//               />
//             </Grid>
            
//             <Grid item xs={12} sm={6} md={2}>
//               <FormControl fullWidth size="medium">
//                 <InputLabel>Event Type</InputLabel>
//                 <Select
//                   value={filters.eventType}
//                   label="Event Type"
//                   onChange={(e) => handleFilterChange('eventType', e.target.value)}
//                   sx={{ borderRadius: 2 }}
//                 >
//                   {Object.entries(EVENT_TYPES).map(([key, config]) => (
//                     <MenuItem key={key} value={key}>
//                       <Stack direction="row" alignItems="center" spacing={1}>
//                         <Box sx={{ color: config.color }}>
//                           {config.icon}
//                         </Box>
//                         <Typography>{config.label}</Typography>
//                       </Stack>
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
            
//             <Grid item xs={12} sm={6} md={2}>
//               <FormControl fullWidth size="medium">
//                 <InputLabel>Status</InputLabel>
//                 <Select
//                   value={filters.status}
//                   label="Status"
//                   onChange={(e) => handleFilterChange('status', e.target.value)}
//                   sx={{ borderRadius: 2 }}
//                 >
//                   {Object.entries(STATUS_TYPES).map(([key, config]) => (
//                     <MenuItem key={key} value={key}>
//                       <Stack direction="row" alignItems="center" spacing={1}>
//                         <Box sx={{ color: config.color }}>
//                           {config.icon}
//                         </Box>
//                         <Typography>{config.label}</Typography>
//                       </Stack>
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
            
//             <Grid item xs={12} sm={6} md={2}>
//               <FormControl fullWidth size="medium">
//                 <InputLabel>Date Range</InputLabel>
//                 <Select
//                   value={filters.dateRange}
//                   label="Date Range"
//                   onChange={(e) => handleFilterChange('dateRange', e.target.value)}
//                   sx={{ borderRadius: 2 }}
//                 >
//                   {Object.entries(DATE_RANGES).map(([key, config]) => (
//                     <MenuItem key={key} value={key}>
//                       <Stack direction="row" alignItems="center" spacing={1}>
//                         {config.icon && (
//                           <Box sx={{ color: 'primary.main' }}>
//                             {config.icon}
//                           </Box>
//                         )}
//                         <Typography>{config.label}</Typography>
//                       </Stack>
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
            
//             <Grid item xs={12} sm={6} md={2}>
//               <FormControl fullWidth size="medium">
//                 <InputLabel>Rows per page</InputLabel>
//                 <Select
//                   value={pagination.limit}
//                   label="Rows per page"
//                   onChange={handleLimitChange}
//                   sx={{ borderRadius: 2 }}
//                 >
//                   <MenuItem value={5}>5</MenuItem>
//                   <MenuItem value={10}>10</MenuItem>
//                   <MenuItem value={25}>25</MenuItem>
//                   <MenuItem value={50}>50</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       {/* Error Alert */}
//       {error && (
//         <Alert 
//           severity="error" 
//           sx={{ 
//             mb: 3,
//             borderRadius: 2,
//             boxShadow: '0 2px 12px rgba(239,68,68,0.1)'
//           }} 
//           onClose={() => setError(null)}
//         >
//           {error}
//         </Alert>
//       )}

//       {/* Transactions Table */}
//       <Card sx={{ 
//         borderRadius: 2,
//         boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
//         border: '1px solid rgba(0,0,0,0.05)',
//         overflow: 'hidden',
//         background: 'rgba(255, 255, 255, 0.95)'
//       }}>
//         <CardContent sx={{ p: 0 }}>
//           {loading && allTransactions.length === 0 ? (
//             <Box sx={{ p: 6, textAlign: 'center' }}>
//               <CircularProgress size={40} />
//               <Typography variant="body2" sx={{ mt: 2 }} color="text.secondary">
//                 Loading transactions...
//               </Typography>
//             </Box>
//           ) : (
//             <>
//               <TableContainer>
//                 <Table>
//                   <TableHead>
//                     <TableRow sx={{ 
//                       bgcolor: 'rgba(99, 102, 241, 0.04)',
//                       '& th': { 
//                         borderBottom: '2px solid rgba(99, 102, 241, 0.1)',
//                         fontWeight: 600 
//                       }
//                     }}>
//                       <TableCell>
//                         <Typography variant="subtitle2" fontWeight={600} color="primary.main">
//                           Event Type
//                         </Typography>
//                       </TableCell>
//                       <TableCell>
//                         <Typography variant="subtitle2" fontWeight={600} color="primary.main">
//                           Transaction ID
//                         </Typography>
//                       </TableCell>
//                       <TableCell>
//                         <Typography variant="subtitle2" fontWeight={600} color="primary.main">
//                           User
//                         </Typography>
//                       </TableCell>
//                       <TableCell>
//                         <Stack direction="row" alignItems="center" spacing={0.5}>
//                           <Typography variant="subtitle2" fontWeight={600} color="primary.main">
//                             Amount
//                           </Typography>
//                           <IconButton 
//                             size="small" 
//                             onClick={() => handleSort('amount')}
//                             sx={{ 
//                               color: sortConfig.field === 'amount' ? 'primary.main' : 'inherit'
//                             }}
//                           >
//                             {sortConfig.field === 'amount' && sortConfig.direction === 'asc' ? 
//                               <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
//                           </IconButton>
//                         </Stack>
//                       </TableCell>
//                       <TableCell>
//                         <Typography variant="subtitle2" fontWeight={600} color="primary.main">
//                           Status
//                         </Typography>
//                       </TableCell>
//                       <TableCell>
//                         <Stack direction="row" alignItems="center" spacing={0.5}>
//                           <Typography variant="subtitle2" fontWeight={600} color="primary.main">
//                             Date & Time
//                           </Typography>
//                           <IconButton 
//                             size="small" 
//                             onClick={() => handleSort('createdAt')}
//                             sx={{ 
//                               color: sortConfig.field === 'createdAt' ? 'primary.main' : 'inherit'
//                             }}
//                           >
//                             {sortConfig.field === 'createdAt' && sortConfig.direction === 'asc' ? 
//                               <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
//                           </IconButton>
//                         </Stack>
//                       </TableCell>
//                       <TableCell>
//                         <Typography variant="subtitle2" fontWeight={600} color="primary.main">
//                           Actions
//                         </Typography>
//                       </TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {displayedTransactions.length === 0 ? (
//                       <TableRow>
//                         <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
//                           <FilterIcon sx={{ fontSize: 64, color: 'rgba(99, 102, 241, 0.3)', mb: 2 }} />
//                           <Typography variant="h6" color="text.secondary" gutterBottom>
//                             {filters.search || filters.eventType !== 'ALL' || filters.status !== 'ALL' 
//                               ? 'No transactions match your filters' 
//                               : 'No transactions found'}
//                           </Typography>
//                           <Typography variant="body2" color="text.secondary">
//                             {filters.search ? 'Try a different search term' : 'Try adjusting your filters'}
//                           </Typography>
//                         </TableCell>
//                       </TableRow>
//                     ) : (
//                       displayedTransactions.map((transaction, index) => {
//                         const eventConfig = getEventConfig(transaction.eventType);
//                         const statusConfig = getStatusConfig(transaction.status);
//                         const userName = getUserName(transaction);
//                         const userId = getUserId(transaction);
                        
//                         return (
//                           <TableRow 
//                             key={transaction._id || transaction.transactionId || `trans-${index}`}
//                             hover
//                             sx={{ 
//                               '&:last-child td, &:last-child th': { border: 0 },
//                               '&:hover': { 
//                                 bgcolor: 'rgba(99, 102, 241, 0.02)'
//                               }
//                             }}
//                           >
//                             <TableCell>
//                               <Stack direction="row" alignItems="center" spacing={1.5}>
//                                 <Box sx={{ 
//                                   p: 1.5,
//                                   borderRadius: 1.5,
//                                   bgcolor: eventConfig.bgColor,
//                                   display: 'flex',
//                                   alignItems: 'center',
//                                   justifyContent: 'center'
//                                 }}>
//                                   <Box sx={{ color: eventConfig.color }}>
//                                     {eventConfig.icon}
//                                   </Box>
//                                 </Box>
//                                 <Box>
//                                   <Typography variant="body2" fontWeight={600}>
//                                     {eventConfig.label}
//                                   </Typography>
//                                 </Box>
//                               </Stack>
//                             </TableCell>
//                             <TableCell>
//                               <Stack direction="row" alignItems="center" spacing={1}>
//                                 <Typography 
//                                   variant="body2" 
//                                   sx={{ 
//                                     fontFamily: 'monospace',
//                                     fontSize: '0.75rem',
//                                     color: 'text.secondary',
//                                     fontWeight: 500
//                                   }}
//                                 >
//                                   {transaction.transactionId ? 
//                                     `${transaction.transactionId.slice(0, 12)}...` : 'N/A'}
//                                 </Typography>
//                                 {transaction.transactionId && (
//                                   <Tooltip title="Copy ID">
//                                     <IconButton 
//                                       size="small" 
//                                       onClick={() => copyToClipboard(transaction.transactionId)}
//                                       sx={{ 
//                                         color: 'primary.light',
//                                         '&:hover': { color: 'primary.main' }
//                                       }}
//                                     >
//                                       <CopyIcon fontSize="small" />
//                                     </IconButton>
//                                   </Tooltip>
//                                 )}
//                               </Stack>
//                             </TableCell>
//                             <TableCell>
//                               <Stack>
//                                 <Typography variant="body2" fontWeight={600}>
//                                   {userName}
//                                 </Typography>
//                                 <Typography variant="caption" color="text.secondary">
//                                   ID: {userId ? `${userId.slice(0, 8)}...` : 'N/A'}
//                                 </Typography>
//                               </Stack>
//                             </TableCell>
//                             <TableCell>
//                               <Typography 
//                                 variant="body2" 
//                                 fontWeight={700}
//                                 color={parseFloat(transaction.amount || 0) > 0 ? 'success.main' : 
//                                       parseFloat(transaction.amount || 0) < 0 ? 'error.main' : 'text.primary'}
//                               >
//                                 {formatAmount(transaction.amount, transaction.currency)}
//                               </Typography>
//                             </TableCell>
//                             <TableCell>
//                               <Chip
//                                 icon={statusConfig.icon}
//                                 label={statusConfig.label}
//                                 size="small"
//                                 sx={{ 
//                                   fontWeight: 600,
//                                   bgcolor: alpha(statusConfig.color, 0.1),
//                                   color: statusConfig.color,
//                                   border: `1px solid ${alpha(statusConfig.color, 0.2)}`,
//                                   '& .MuiChip-icon': {
//                                     color: statusConfig.color
//                                   }
//                                 }}
//                               />
//                             </TableCell>
//                             <TableCell>
//                               <Typography variant="body2" fontWeight={600}>
//                                 {formatDate(transaction.createdAt, 'MMM D, YYYY, h:mm A') || 'N/A'}
//                               </Typography>
//                             </TableCell>
//                             <TableCell>
//                               <Stack direction="row" spacing={0.5}>
//                                 <Tooltip title="View details">
//                                   <IconButton 
//                                     size="small" 
//                                     onClick={() => handleViewTransaction(transaction)}
//                                     sx={{ 
//                                       color: 'primary.light',
//                                       '&:hover': { 
//                                         color: 'primary.main',
//                                         bgcolor: 'rgba(99, 102, 241, 0.1)'
//                                       }
//                                     }}
//                                   >
//                                     <ViewIcon fontSize="small" />
//                                   </IconButton>
//                                 </Tooltip>
//                               </Stack>
//                             </TableCell>
//                           </TableRow>
//                         );
//                       })
//                     )}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
              
//               {/* Pagination */}
//               {displayedTransactions.length > 0 && (
//                 <TablePagination
//                   component="div"
//                   count={totalTransactions}
//                   page={pagination.page}
//                   onPageChange={handlePageChange}
//                   rowsPerPage={pagination.limit}
//                   onRowsPerPageChange={handleLimitChange}
//                   rowsPerPageOptions={[5, 10, 25, 50]}
//                   sx={{ 
//                     borderTop: '1px solid rgba(0,0,0,0.08)',
//                     px: 3,
//                     py: 2,
//                     '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
//                       fontWeight: 500
//                     }
//                   }}
//                 />
//               )}
//             </>
//           )}
//         </CardContent>
//       </Card>

//       {/* Footer */}
//       <Box sx={{ 
//         mt: 4, 
//         pt: 3, 
//         borderTop: '1px solid rgba(0,0,0,0.08)' 
//       }}>
//         <Stack direction="row" justifyContent="space-between" alignItems="center">
//           <Typography variant="caption" color="text.secondary">
//             Showing {Math.min(displayedTransactions.length, pagination.limit)} of {totalTransactions} transactions
//             {filters.search && ` for "${filters.search}"`}
//           </Typography>
//           <Stack direction="row" alignItems="center" spacing={1}>
//             <Typography variant="caption" color="text.secondary">
//               Business ID:
//             </Typography>
//             <Chip
//               label={businessId ? `${businessId.slice(0, 16)}...` : 'N/A'}
//               size="small"
//               sx={{ 
//                 fontFamily: 'monospace',
//                 fontWeight: 500,
//                 bgcolor: 'rgba(99, 102, 241, 0.1)',
//                 color: 'primary.main'
//               }}
//             />
//           </Stack>
//         </Stack>
//       </Box>

//       {/* Transaction Detail Dialog */}
//       <Dialog 
//         open={viewDialogOpen} 
//         onClose={handleCloseDialog}
//         maxWidth="md"
//         fullWidth
//       >
//         <DialogTitle>
//           <Stack direction="row" alignItems="center" spacing={2}>
//             {selectedTransaction && (
//               <>
//                 <Box sx={{ 
//                   p: 1.5,
//                   borderRadius: 1.5,
//                   bgcolor: getEventConfig(selectedTransaction.eventType).bgColor,
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center'
//                 }}>
//                   <Box sx={{ color: getEventConfig(selectedTransaction.eventType).color }}>
//                     {getEventConfig(selectedTransaction.eventType).icon}
//                   </Box>
//                 </Box>
//                 <Box>
//                   <Typography variant="h6" fontWeight={600}>
//                     Transaction Details
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {selectedTransaction.transactionId || 'N/A'}
//                   </Typography>
//                 </Box>
//               </>
//             )}
//           </Stack>
//         </DialogTitle>
//         <DialogContent dividers>
//           {selectedTransaction && (
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={6}>
//                 <Typography variant="subtitle2" color="text.secondary" gutterBottom>
//                   Basic Information
//                 </Typography>
//                 <Stack spacing={2}>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       Transaction ID
//                     </Typography>
//                     <Stack direction="row" alignItems="center" spacing={1}>
//                       <Typography variant="body2" fontWeight={500} sx={{ fontFamily: 'monospace' }}>
//                         {selectedTransaction.transactionId || 'N/A'}
//                       </Typography>
//                       {selectedTransaction.transactionId && (
//                         <IconButton 
//                           size="small" 
//                           onClick={() => copyToClipboard(selectedTransaction.transactionId)}
//                         >
//                           <CopyIcon fontSize="small" />
//                         </IconButton>
//                       )}
//                     </Stack>
//                   </Box>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       Event Type
//                     </Typography>
//                     <Stack direction="row" alignItems="center" spacing={1}>
//                       <Chip
//                         icon={getEventConfig(selectedTransaction.eventType).icon}
//                         label={getEventConfig(selectedTransaction.eventType).label}
//                         size="small"
//                         sx={{ 
//                           fontWeight: 500,
//                           bgcolor: getEventConfig(selectedTransaction.eventType).bgColor,
//                           color: getEventConfig(selectedTransaction.eventType).color
//                         }}
//                       />
//                     </Stack>
//                   </Box>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       Status
//                     </Typography>
//                     <Chip
//                       icon={getStatusConfig(selectedTransaction.status).icon}
//                       label={getStatusConfig(selectedTransaction.status).label}
//                       size="small"
//                       sx={{ 
//                         mt: 0.5,
//                         fontWeight: 500,
//                         bgcolor: alpha(getStatusConfig(selectedTransaction.status).color, 0.1),
//                         color: getStatusConfig(selectedTransaction.status).color
//                       }}
//                     />
//                   </Box>
//                 </Stack>
//               </Grid>
              
//               <Grid item xs={12} md={6}>
//                 <Typography variant="subtitle2" color="text.secondary" gutterBottom>
//                   Financial Details
//                 </Typography>
//                 <Stack spacing={2}>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       Amount
//                     </Typography>
//                     <Typography 
//                       variant="h6" 
//                       fontWeight={600}
//                       color={parseFloat(selectedTransaction.amount || 0) > 0 ? 'success.main' : 
//                             parseFloat(selectedTransaction.amount || 0) < 0 ? 'error.main' : 'text.primary'}
//                     >
//                       {formatAmount(selectedTransaction.amount, selectedTransaction.currency)}
//                     </Typography>
//                   </Box>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       Currency
//                     </Typography>
//                     <Typography variant="body2" fontWeight={500}>
//                       {selectedTransaction.currency || 'USD'}
//                     </Typography>
//                   </Box>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       Created At
//                     </Typography>
//                     <Typography variant="body2" fontWeight={500}>
//                       {formatDate(selectedTransaction.createdAt, 'MMM D, YYYY h:mm A') || 'N/A'}
//                     </Typography>
//                   </Box>
//                 </Stack>
//               </Grid>
              
//               <Grid item xs={12}>
//                 <Typography variant="subtitle2" color="text.secondary" gutterBottom>
//                   User Information
//                 </Typography>
//                 <Stack spacing={2}>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       User Name
//                     </Typography>
//                     <Typography variant="body2" fontWeight={500}>
//                       {getUserName(selectedTransaction)}
//                     </Typography>
//                   </Box>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       User ID
//                     </Typography>
//                     <Stack direction="row" alignItems="center" spacing={1}>
//                       <Typography variant="body2" fontWeight={500} sx={{ fontFamily: 'monospace' }}>
//                         {getUserId(selectedTransaction)}
//                       </Typography>
//                       {getUserId(selectedTransaction) && getUserId(selectedTransaction) !== 'N/A' && (
//                         <IconButton 
//                           size="small" 
//                           onClick={() => copyToClipboard(getUserId(selectedTransaction))}
//                         >
//                           <CopyIcon fontSize="small" />
//                         </IconButton>
//                       )}
//                     </Stack>
//                   </Box>
//                 </Stack>
//               </Grid>
              
//               {selectedTransaction.description && (
//                 <Grid item xs={12}>
//                   <Typography variant="subtitle2" color="text.secondary" gutterBottom>
//                     Description
//                   </Typography>
//                   <Paper 
//                     variant="outlined" 
//                     sx={{ 
//                       p: 2,
//                       bgcolor: 'rgba(0,0,0,0.02)',
//                       borderRadius: 1.5
//                     }}
//                   >
//                     <Typography variant="body2">
//                       {selectedTransaction.description}
//                     </Typography>
//                   </Paper>
//                 </Grid>
//               )}
//             </Grid>
//           )}
//         </DialogContent>
//         <DialogActions sx={{ px: 3, py: 2 }}>
//           <Button onClick={handleCloseDialog}>
//             Close
//           </Button>
//           <Button 
//             variant="contained" 
//             endIcon={<ArrowForwardIcon />}
//             sx={{ 
//               background: 'linear-gradient(45deg, #6366F1, #8B5CF6)',
//               '&:hover': {
//                 background: 'linear-gradient(45deg, #4F46E5, #7C3AED)'
//               }
//             }}
//           >
//             View Full Report
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default BusinessTransactions;

import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  IconButton,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  InputAdornment,
  Grid,
  Tooltip,
  alpha,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  Payment as PaymentIcon,
  Login as LoginIcon,
  AccountCircle as UserIcon,
  Security as SecurityIcon,
  Settings as SettingsIcon,
  ShoppingCart as CartIcon,
  ArrowUpward,
  ArrowDownward,
  CheckCircle,
  Error as ErrorIcon,
  Pending as PendingIcon,
  Info as InfoIcon,
  ContentCopy as CopyIcon,
  Visibility as ViewIcon,
  CalendarToday as CalendarIcon,
  Timeline as TimelineIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

import { businessAuthService } from '../services/businessAuth';
import { formatDate } from '../utils/formatters';

const BusinessTransactions = () => {
  const [allTransactions, setAllTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    eventType: 'ALL',
    status: 'ALL',
    search: '',
    dateRange: 'ALL'
  });
  const [businessId, setBusinessId] = useState('');
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 10,
    total: 0
  });
  const [sortConfig, setSortConfig] = useState({
    field: 'createdAt',
    direction: 'desc'
  });
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const EVENT_TYPES = {
    ALL: { label: 'All Events', icon: <FilterIcon fontSize="small" />, color: '#6366F1', bgColor: '#E0E7FF' },
    PAYMENT: { label: 'Payment', icon: <PaymentIcon fontSize="small" />, color: '#10B981', bgColor: '#D1FAE5' },
    LOGIN: { label: 'Login', icon: <LoginIcon fontSize="small" />, color: '#3B82F6', bgColor: '#DBEAFE' },
  
  };

  const STATUS_TYPES = {
    ALL: { label: 'All Status', icon: <FilterIcon fontSize="small" />, color: '#6B7280', bgColor: '#F3F4F6' },
    SUCCESS: { label: 'Success', icon: <CheckCircle fontSize="small" />, color: '#10B981' },
    PENDING: { label: 'Pending', icon: <PendingIcon fontSize="small" />, color: '#F59E0B' },
    FAILED: { label: 'Failed', icon: <ErrorIcon fontSize="small" />, color: '#EF4444' },
    APPROVED: { label: 'Approved', icon: <CheckCircle fontSize="small" />, color: '#10B981' },
    REJECTED: { label: 'Rejected', icon: <ErrorIcon fontSize="small" />, color: '#EF4444' },
    PROCESSING: { label: 'Processing', icon: <PendingIcon fontSize="small" />, color: '#6366F1' }
  };

  const DATE_RANGES = {
    ALL: { label: 'All Time', icon: <CalendarIcon fontSize="small" /> },
    TODAY: { label: 'Today', icon: <CalendarIcon fontSize="small" /> },
    '7DAYS': { label: 'Last 7 Days', icon: <CalendarIcon fontSize="small" /> },
    '30DAYS': { label: 'Last 30 Days', icon: <CalendarIcon fontSize="small" /> },
    '90DAYS': { label: 'Last 90 Days', icon: <CalendarIcon fontSize="small" /> }
  };

  useEffect(() => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        const bid = user.businessId || user.businessID || user.id;
        if (bid) {
          setBusinessId(bid);
        } else {
          setError('Business ID not found in user profile');
          setLoading(false);
        }
      } catch (error) {
        setError('Failed to load user data');
        setLoading(false);
      }
    } else {
      setError('User not found. Please login again.');
      setLoading(false);
    }
  }, []);

  const fetchTransactions = useCallback(async () => {
    if (!businessId) {
      setError('Business ID is required');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Fetch ALL transactions without any filtering
      const result = await businessAuthService.getBusinessTransactions(
        businessId,
        undefined,
        1,
        1000,
        undefined,
        undefined,
        undefined
      );
      
      if (result.success) {
        setAllTransactions(result.data || []);
        setPagination(prev => ({
          ...prev,
          total: result.data?.length || 0
        }));
      } else {
        setError(result.error || 'Failed to fetch transactions');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching transactions');
    } finally {
      setLoading(false);
    }
  }, [businessId]);

  useEffect(() => {
    if (businessId) {
      fetchTransactions();
    }
  }, [businessId, fetchTransactions]);

  // Get user display name (checks multiple fields)
  const getUserDisplayName = (transaction) => {
    // First, check all possible fields for a proper name
    const nameFields = [
      transaction.userName,
      transaction.name,
      transaction.user?.name,
      transaction.user?.fullName,
      transaction.customerName,
      transaction.clientName,
      transaction.initiatedBy,
      transaction.performedBy,
      transaction.initiatorName,
      transaction.createdBy
    ];
    
    for (const field of nameFields) {
      if (field && typeof field === 'string' && field.trim() !== '') {
        return field;
      }
    }
    
    // If no name found, check for email
    const emailFields = [
      transaction.user?.email,
      transaction.email,
      transaction.userEmail,
      transaction.customerEmail
    ];
    
    for (const field of emailFields) {
      if (field && field.includes('@')) {
        return field.split('@')[0]; // Return username part of email
      }
    }
    
    // If still no name, return a generic user name
    return 'User';
  };

  // Get user ID from transaction
  const getUserId = (transaction) => {
    const idFields = [
      transaction.userId,
      transaction.user?.id,
      transaction.customerId,
      transaction.clientId,
      transaction.initiatedById,
      transaction.performedById
    ];
    
    for (const field of idFields) {
      if (field) {
        return field;
      }
    }
    
    return transaction._id || transaction.id || 'N/A';
  };

  // Get complete user info for display
  const getUserInfo = (transaction) => {
    const displayName = getUserDisplayName(transaction);
    const userId = getUserId(transaction);
    
    // If the display name is just "User" and we have an ID, show the ID in the name
    if (displayName === 'User' && userId !== 'N/A') {
      return {
        displayName: `User ${userId.slice(0, 8)}...`,
        userId: userId
      };
    }
    
    return {
      displayName,
      userId
    };
  };

  const handlePageChange = (event, newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handleLimitChange = (event) => {
    setPagination(prev => ({ 
      ...prev, 
      limit: parseInt(event.target.value, 10),
      page: 0
    }));
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
    setPagination(prev => ({ ...prev, page: 0 }));
  };

  const handleSort = (field) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const handleRefresh = () => {
    fetchTransactions();
  };

  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setViewDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setViewDialogOpen(false);
    setSelectedTransaction(null);
  };

  const copyToClipboard = (text) => {
    if (text && text !== 'N/A') {
      navigator.clipboard.writeText(text);
    }
  };

  const getEventConfig = (eventType) => {
    if (!eventType) return {
      label: 'Unknown',
      icon: <InfoIcon fontSize="small" />,
      color: '#6B7280',
      bgColor: '#F3F4F6'
    };
    
    return EVENT_TYPES[eventType.toUpperCase()] || {
      label: eventType,
      icon: <InfoIcon fontSize="small" />,
      color: '#6B7280',
      bgColor: '#F3F4F6'
    };
  };

  const getStatusConfig = (status) => {
    if (!status) return {
      label: 'Unknown',
      icon: <InfoIcon fontSize="small" />,
      color: '#6B7280'
    };
    
    return STATUS_TYPES[status.toUpperCase()] || {
      label: status,
      icon: <InfoIcon fontSize="small" />,
      color: '#6B7280'
    };
  };

  const formatAmount = (amount, currency) => {
    if (amount === null || amount === undefined) return 'N/A';
    
    try {
      const numAmount = parseFloat(amount);
      if (isNaN(numAmount)) return 'N/A';
      
      if (numAmount === 0) return '$0.00';
      
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency || 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(numAmount);
    } catch (error) {
      return `$${parseFloat(amount).toFixed(2)}`;
    }
  };

  // Apply date filter to a transaction
  const isWithinDateRange = (transactionDate) => {
    if (filters.dateRange === 'ALL') return true;
    
    const transactionTime = new Date(transactionDate).getTime();
    const now = new Date();
    let startTime;
    
    switch(filters.dateRange) {
      case 'TODAY':
        startTime = new Date(now.setHours(0, 0, 0, 0)).getTime();
        break;
      case '7DAYS':
        startTime = new Date(now.setDate(now.getDate() - 7)).getTime();
        break;
      case '30DAYS':
        startTime = new Date(now.setDate(now.getDate() - 30)).getTime();
        break;
      case '90DAYS':
        startTime = new Date(now.setDate(now.getDate() - 90)).getTime();
        break;
      default:
        return true;
    }
    
    return transactionTime >= startTime;
  };

  // Filter and sort transactions
  const getFilteredTransactions = () => {
    let filtered = allTransactions.filter(transaction => 
      isWithinDateRange(transaction.createdAt)
    );
    
    // Apply event type filter
    if (filters.eventType !== 'ALL') {
      filtered = filtered.filter(t => 
        t.eventType && t.eventType.toUpperCase() === filters.eventType
      );
    }
    
    // Apply status filter
    if (filters.status !== 'ALL') {
      filtered = filtered.filter(t => 
        t.status && t.status.toUpperCase() === filters.status
      );
    }
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(transaction => {
        const userInfo = getUserInfo(transaction);
        const searchFields = [
          transaction.transactionId,
          userInfo.displayName,
          transaction.eventType,
          transaction.status,
          transaction.description,
          formatAmount(transaction.amount, transaction.currency),
          userInfo.userId
        ];
        
        return searchFields.some(field => 
          field && field.toString().toLowerCase().includes(searchLower)
        );
      });
    }
    
    // Apply sorting
    if (sortConfig.field) {
      filtered.sort((a, b) => {
        let aVal = a[sortConfig.field];
        let bVal = b[sortConfig.field];
        
        if (aVal === undefined || aVal === null) aVal = '';
        if (bVal === undefined || bVal === null) bVal = '';
        
        if (sortConfig.field === 'createdAt') {
          aVal = new Date(aVal).getTime();
          bVal = new Date(bVal).getTime();
        }
        
        if (sortConfig.field === 'amount') {
          aVal = parseFloat(aVal) || 0;
          bVal = parseFloat(bVal) || 0;
        }
        
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    return filtered;
  };

  // Get paginated transactions
  const getPaginatedTransactions = () => {
    const filtered = getFilteredTransactions();
    const total = filtered.length;
    const startIndex = pagination.page * pagination.limit;
    const endIndex = startIndex + pagination.limit;
    
    return {
      total,
      displayed: filtered.slice(startIndex, endIndex)
    };
  };

  const { total: totalTransactions, displayed: displayedTransactions } = getPaginatedTransactions();

  return (
    <Container maxWidth="xl" sx={{ 
      py: 4,
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)'
    }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Box>
            <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
              Transaction History
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <TimelineIcon sx={{ color: 'primary.main', fontSize: 20 }} />
              <Typography variant="body2" color="text.secondary">
                Monitor and analyze all business activities and transactions
              </Typography>
            </Stack>
          </Box>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              disabled={loading}
              size="small"
            >
              Refresh
            </Button>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              size="small"
              sx={{ 
                background: 'linear-gradient(45deg, #6366F1, #8B5CF6)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #4F46E5, #7C3AED)'
                }
              }}
            >
              Export
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Filters Card */}
      <Card sx={{ 
        mb: 4,
        borderRadius: 2,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid rgba(0,0,0,0.05)',
        background: 'rgba(255, 255, 255, 0.9)'
      }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="medium"
                placeholder="Search transactions by ID, user, type, amount, status..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" color="primary" />
                    </InputAdornment>
                  ),
                  sx: { 
                    borderRadius: 2,
                    background: 'rgba(255, 255, 255, 0.8)'
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="medium">
                <InputLabel>Event Type</InputLabel>
                <Select
                  value={filters.eventType}
                  label="Event Type"
                  onChange={(e) => handleFilterChange('eventType', e.target.value)}
                  sx={{ borderRadius: 2 }}
                >
                  {Object.entries(EVENT_TYPES).map(([key, config]) => (
                    <MenuItem key={key} value={key}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Box sx={{ color: config.color }}>
                          {config.icon}
                        </Box>
                        <Typography>{config.label}</Typography>
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="medium">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status}
                  label="Status"
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  sx={{ borderRadius: 2 }}
                >
                  {Object.entries(STATUS_TYPES).map(([key, config]) => (
                    <MenuItem key={key} value={key}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Box sx={{ color: config.color }}>
                          {config.icon}
                        </Box>
                        <Typography>{config.label}</Typography>
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="medium">
                <InputLabel>Date Range</InputLabel>
                <Select
                  value={filters.dateRange}
                  label="Date Range"
                  onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                  sx={{ borderRadius: 2 }}
                >
                  {Object.entries(DATE_RANGES).map(([key, config]) => (
                    <MenuItem key={key} value={key}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        {config.icon && (
                          <Box sx={{ color: 'primary.main' }}>
                            {config.icon}
                          </Box>
                        )}
                        <Typography>{config.label}</Typography>
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="medium">
                <InputLabel>Rows per page</InputLabel>
                <Select
                  value={pagination.limit}
                  label="Rows per page"
                  onChange={handleLimitChange}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 3,
            borderRadius: 2,
            boxShadow: '0 2px 12px rgba(239,68,68,0.1)'
          }} 
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}

      {/* Transactions Table */}
      <Card sx={{ 
        borderRadius: 2,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid rgba(0,0,0,0.05)',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.95)'
      }}>
        <CardContent sx={{ p: 0 }}>
          {loading && allTransactions.length === 0 ? (
            <Box sx={{ p: 6, textAlign: 'center' }}>
              <CircularProgress size={40} />
              <Typography variant="body2" sx={{ mt: 2 }} color="text.secondary">
                Loading transactions...
              </Typography>
            </Box>
          ) : (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ 
                      bgcolor: 'rgba(99, 102, 241, 0.04)',
                      '& th': { 
                        borderBottom: '2px solid rgba(99, 102, 241, 0.1)',
                        fontWeight: 600 
                      }
                    }}>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600} color="primary.main">
                          Event Type
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600} color="primary.main">
                          Transaction ID
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600} color="primary.main">
                          User
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <Typography variant="subtitle2" fontWeight={600} color="primary.main">
                            Amount
                          </Typography>
                          <IconButton 
                            size="small" 
                            onClick={() => handleSort('amount')}
                            sx={{ 
                              color: sortConfig.field === 'amount' ? 'primary.main' : 'inherit'
                            }}
                          >
                            {sortConfig.field === 'amount' && sortConfig.direction === 'asc' ? 
                              <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
                          </IconButton>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600} color="primary.main">
                          Status
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <Typography variant="subtitle2" fontWeight={600} color="primary.main">
                            Date & Time
                          </Typography>
                          <IconButton 
                            size="small" 
                            onClick={() => handleSort('createdAt')}
                            sx={{ 
                              color: sortConfig.field === 'createdAt' ? 'primary.main' : 'inherit'
                            }}
                          >
                            {sortConfig.field === 'createdAt' && sortConfig.direction === 'asc' ? 
                              <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
                          </IconButton>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600} color="primary.main">
                          Actions
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displayedTransactions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                          <FilterIcon sx={{ fontSize: 64, color: 'rgba(99, 102, 241, 0.3)', mb: 2 }} />
                          <Typography variant="h6" color="text.secondary" gutterBottom>
                            {filters.search || filters.eventType !== 'ALL' || filters.status !== 'ALL' 
                              ? 'No transactions match your filters' 
                              : 'No transactions found'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {filters.search ? 'Try a different search term' : 'Try adjusting your filters'}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      displayedTransactions.map((transaction, index) => {
                        const eventConfig = getEventConfig(transaction.eventType);
                        const statusConfig = getStatusConfig(transaction.status);
                        const userInfo = getUserInfo(transaction);
                        
                        return (
                          <TableRow 
                            key={transaction._id || transaction.transactionId || `trans-${index}`}
                            hover
                            sx={{ 
                              '&:last-child td, &:last-child th': { border: 0 },
                              '&:hover': { 
                                bgcolor: 'rgba(99, 102, 241, 0.02)'
                              }
                            }}
                          >
                            <TableCell>
                              <Stack direction="row" alignItems="center" spacing={1.5}>
                                <Box sx={{ 
                                  p: 1.5,
                                  borderRadius: 1.5,
                                  bgcolor: eventConfig.bgColor,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}>
                                  <Box sx={{ color: eventConfig.color }}>
                                    {eventConfig.icon}
                                  </Box>
                                </Box>
                                <Box>
                                  <Typography variant="body2" fontWeight={600}>
                                    {eventConfig.label}
                                  </Typography>
                                </Box>
                              </Stack>
                            </TableCell>
                            <TableCell>
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography 
                                  variant="body2" 
                                  sx={{ 
                                    fontFamily: 'monospace',
                                    fontSize: '0.75rem',
                                    color: 'text.secondary',
                                    fontWeight: 500
                                  }}
                                >
                                  {transaction.transactionId ? 
                                    `${transaction.transactionId.slice(0, 12)}...` : 'N/A'}
                                </Typography>
                                {transaction.transactionId && (
                                  <Tooltip title="Copy ID">
                                    <IconButton 
                                      size="small" 
                                      onClick={() => copyToClipboard(transaction.transactionId)}
                                      sx={{ 
                                        color: 'primary.light',
                                        '&:hover': { color: 'primary.main' }
                                      }}
                                    >
                                      <CopyIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                )}
                              </Stack>
                            </TableCell>
                            <TableCell>
                              <Stack>
                                <Typography variant="body2" fontWeight={600}>
                                  {userInfo.displayName}
                                </Typography>
                                {/* Only show ID if it's different from what's already in displayName */}
                                {userInfo.userId !== 'N/A' && 
                                 !userInfo.displayName.includes(userInfo.userId.slice(0, 8)) && (
                                  <Typography variant="caption" color="text.secondary">
                                    ID: {userInfo.userId.slice(0, 8)}...
                                  </Typography>
                                )}
                              </Stack>
                            </TableCell>
                            <TableCell>
                              <Typography 
                                variant="body2" 
                                fontWeight={700}
                                color={parseFloat(transaction.amount || 0) > 0 ? 'success.main' : 
                                      parseFloat(transaction.amount || 0) < 0 ? 'error.main' : 'text.primary'}
                              >
                                {formatAmount(transaction.amount, transaction.currency)}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                icon={statusConfig.icon}
                                label={statusConfig.label}
                                size="small"
                                sx={{ 
                                  fontWeight: 600,
                                  bgcolor: alpha(statusConfig.color, 0.1),
                                  color: statusConfig.color,
                                  border: `1px solid ${alpha(statusConfig.color, 0.2)}`,
                                  '& .MuiChip-icon': {
                                    color: statusConfig.color
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" fontWeight={600}>
                                {formatDate(transaction.createdAt, 'MMM D, YYYY, h:mm A') || 'N/A'}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Stack direction="row" spacing={0.5}>
                                <Tooltip title="View details">
                                  <IconButton 
                                    size="small" 
                                    onClick={() => handleViewTransaction(transaction)}
                                    sx={{ 
                                      color: 'primary.light',
                                      '&:hover': { 
                                        color: 'primary.main',
                                        bgcolor: 'rgba(99, 102, 241, 0.1)'
                                      }
                                    }}
                                  >
                                    <ViewIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              
              {/* Pagination */}
              {displayedTransactions.length > 0 && (
                <TablePagination
                  component="div"
                  count={totalTransactions}
                  page={pagination.page}
                  onPageChange={handlePageChange}
                  rowsPerPage={pagination.limit}
                  onRowsPerPageChange={handleLimitChange}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  sx={{ 
                    borderTop: '1px solid rgba(0,0,0,0.08)',
                    px: 3,
                    py: 2,
                    '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                      fontWeight: 500
                    }
                  }}
                />
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Footer */}
      <Box sx={{ 
        mt: 4, 
        pt: 3, 
        borderTop: '1px solid rgba(0,0,0,0.08)' 
      }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="caption" color="text.secondary">
            Showing {Math.min(displayedTransactions.length, pagination.limit)} of {totalTransactions} transactions
            {filters.search && ` for "${filters.search}"`}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="caption" color="text.secondary">
              Business ID:
            </Typography>
            <Chip
              label={businessId ? `${businessId.slice(0, 16)}...` : 'N/A'}
              size="small"
              sx={{ 
                fontFamily: 'monospace',
                fontWeight: 500,
                bgcolor: 'rgba(99, 102, 241, 0.1)',
                color: 'primary.main'
              }}
            />
          </Stack>
        </Stack>
      </Box>

      {/* Transaction Detail Dialog */}
      <Dialog 
        open={viewDialogOpen} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={2}>
            {selectedTransaction && (
              <>
                <Box sx={{ 
                  p: 1.5,
                  borderRadius: 1.5,
                  bgcolor: getEventConfig(selectedTransaction.eventType).bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Box sx={{ color: getEventConfig(selectedTransaction.eventType).color }}>
                    {getEventConfig(selectedTransaction.eventType).icon}
                  </Box>
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    Transaction Details
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedTransaction.transactionId || 'N/A'}
                  </Typography>
                </Box>
              </>
            )}
          </Stack>
        </DialogTitle>
        <DialogContent dividers>
          {selectedTransaction && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Basic Information
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Transaction ID
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="body2" fontWeight={500} sx={{ fontFamily: 'monospace' }}>
                        {selectedTransaction.transactionId || 'N/A'}
                      </Typography>
                      {selectedTransaction.transactionId && (
                        <IconButton 
                          size="small" 
                          onClick={() => copyToClipboard(selectedTransaction.transactionId)}
                        >
                          <CopyIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Stack>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Event Type
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Chip
                        icon={getEventConfig(selectedTransaction.eventType).icon}
                        label={getEventConfig(selectedTransaction.eventType).label}
                        size="small"
                        sx={{ 
                          fontWeight: 500,
                          bgcolor: getEventConfig(selectedTransaction.eventType).bgColor,
                          color: getEventConfig(selectedTransaction.eventType).color
                        }}
                      />
                    </Stack>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Status
                    </Typography>
                    <Chip
                      icon={getStatusConfig(selectedTransaction.status).icon}
                      label={getStatusConfig(selectedTransaction.status).label}
                      size="small"
                      sx={{ 
                        mt: 0.5,
                        fontWeight: 500,
                        bgcolor: alpha(getStatusConfig(selectedTransaction.status).color, 0.1),
                        color: getStatusConfig(selectedTransaction.status).color
                      }}
                    />
                  </Box>
                </Stack>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Financial Details
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Amount
                    </Typography>
                    <Typography 
                      variant="h6" 
                      fontWeight={600}
                      color={parseFloat(selectedTransaction.amount || 0) > 0 ? 'success.main' : 
                            parseFloat(selectedTransaction.amount || 0) < 0 ? 'error.main' : 'text.primary'}
                    >
                      {formatAmount(selectedTransaction.amount, selectedTransaction.currency)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Currency
                    </Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {selectedTransaction.currency || 'USD'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Created At
                    </Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {formatDate(selectedTransaction.createdAt, 'MMM D, YYYY h:mm A') || 'N/A'}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  User Information
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      User Name
                    </Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {getUserInfo(selectedTransaction).displayName}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      User ID
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="body2" fontWeight={500} sx={{ fontFamily: 'monospace' }}>
                        {getUserInfo(selectedTransaction).userId}
                      </Typography>
                      {getUserInfo(selectedTransaction).userId !== 'N/A' && (
                        <IconButton 
                          size="small" 
                          onClick={() => copyToClipboard(getUserInfo(selectedTransaction).userId)}
                        >
                          <CopyIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Stack>
                  </Box>
                </Stack>
              </Grid>
              
              {selectedTransaction.description && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Description
                  </Typography>
                  <Paper 
                    variant="outlined" 
                    sx={{ 
                      p: 2,
                      bgcolor: 'rgba(0,0,0,0.02)',
                      borderRadius: 1.5
                    }}
                  >
                    <Typography variant="body2">
                      {selectedTransaction.description}
                    </Typography>
                  </Paper>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleCloseDialog}>
            Close
          </Button>
          <Button 
            variant="contained" 
            endIcon={<ArrowForwardIcon />}
            sx={{ 
              background: 'linear-gradient(45deg, #6366F1, #8B5CF6)',
              '&:hover': {
                background: 'linear-gradient(45deg, #4F46E5, #7C3AED)'
              }
            }}
          >
            View Full Report
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BusinessTransactions;