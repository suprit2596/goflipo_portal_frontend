// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Button,
//   Chip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   IconButton,
//   Tooltip,
// } from '@mui/material';
// import {
//   Visibility as ViewIcon,
//   VpnKey as KeyIcon,
//   Edit as EditIcon,
//   ContentCopy as CopyIcon,
// } from '@mui/icons-material';
// import MaskedText from '../common/MaskedText';
// import LoadingSpinner from '../common/LoadingSpinner';
// import { businessService } from '../../services/business';
// import { formatDate } from '../../utils/formatters';
// import { APPLICATION_STATUS_COLORS } from '../../utils/constants';

// const ApplicationList = () => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedApp, setSelectedApp] = useState(null);
//   const [tokenDialog, setTokenDialog] = useState(null);
//   const [generatedToken, setGeneratedToken] = useState('');

//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   const fetchApplications = async () => {
//     try {
//       setLoading(true);
//       const data = await businessService.getApplications();
//       setApplications(data);
//     } catch (err) {
//       setError(err.message || 'Failed to load applications');
//       console.error('Error fetching applications:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleView = (app) => {
//     setSelectedApp(app);
//   };

//   const handleGenerateToken = async (app) => {
//     try {
//       const response = await businessService.getAppToken(app.appId);
//       setGeneratedToken(response.token);
//       setTokenDialog(app);
//     } catch (err) {
//       console.error('Error generating token:', err);
//     }
//   };

//   const handleCopyToken = () => {
//     if (generatedToken) {
//       navigator.clipboard.writeText(generatedToken);
//       // Add toast notification here
//     }
//   };

//   const handleCloseDialog = () => {
//     setSelectedApp(null);
//   };

//   const handleCloseTokenDialog = () => {
//     setTokenDialog(null);
//     setGeneratedToken('');
//   };

//   const getCredentialFields = (app) => {
//     if (!app.credentials) return [];
    
//     return Object.entries(app.credentials || {}).map(([key, value]) => ({
//       key,
//       value,
//       type: key.toLowerCase().includes('secret') || 
//             key.toLowerCase().includes('password') || 
//             key.toLowerCase().includes('token') ? 'secret' : 'apiKey',
//     }));
//   };

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   if (error) {
//     return (
//       <Box sx={{ p: 3 }}>
//         <Typography color="error">{error}</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Applications
//       </Typography>
      
//       <Typography variant="body1" color="textSecondary" paragraph>
//         View and manage your business applications. Click on an application to view details.
//       </Typography>

//       {applications.length === 0 ? (
//         <Card>
//           <CardContent>
//             <Typography align="center" color="textSecondary">
//               No applications found. Contact your administrator to add applications.
//             </Typography>
//           </CardContent>
//         </Card>
//       ) : (
//         <Grid container spacing={3}>
//           {applications.map((app) => (
//             <Grid item xs={12} sm={6} md={4} key={app.appId}>
//               <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//                 <CardContent sx={{ flexGrow: 1 }}>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
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
                
//                 <CardActions>
//                   <Button
//                     size="small"
//                     startIcon={<ViewIcon />}
//                     onClick={() => handleView(app)}
//                   >
//                     View
//                   </Button>
//                   <Button
//                     size="small"
//                     startIcon={<KeyIcon />}
//                     onClick={() => handleGenerateToken(app)}
//                   >
//                     Get Token
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}

//       {/* Application Details Dialog */}
//       <Dialog 
//         open={!!selectedApp} 
//         onClose={handleCloseDialog}
//         maxWidth="md"
//         fullWidth
//       >
//         {selectedApp && (
//           <>
//             <DialogTitle>
//               {selectedApp.name}
//               <Chip
//                 label={selectedApp.status}
//                 color={APPLICATION_STATUS_COLORS[selectedApp.status] || 'default'}
//                 size="small"
//                 sx={{ ml: 2 }}
//               />
//             </DialogTitle>
//             <DialogContent dividers>
//               <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                   <Typography variant="subtitle1" gutterBottom>
//                     Basic Information
//                   </Typography>
//                   <Typography variant="body2">
//                     <strong>Type:</strong> {selectedApp.type}
//                   </Typography>
//                   <Typography variant="body2">
//                     <strong>Created:</strong> {formatDate(selectedApp.createdAt)}
//                   </Typography>
//                   {selectedApp.updatedAt && (
//                     <Typography variant="body2">
//                       <strong>Updated:</strong> {formatDate(selectedApp.updatedAt)}
//                     </Typography>
//                   )}
//                 </Grid>
                
//                 {selectedApp.configuration && Object.keys(selectedApp.configuration).length > 0 && (
//                   <Grid item xs={12}>
//                     <Typography variant="subtitle1" gutterBottom>
//                       Configuration
//                     </Typography>
//                     <Grid container spacing={2}>
//                       {Object.entries(selectedApp.configuration).map(([key, value]) => (
//                         <Grid item xs={12} sm={6} key={key}>
//                           <Typography variant="body2">
//                             <strong>{key}:</strong> {value}
//                           </Typography>
//                         </Grid>
//                       ))}
//                     </Grid>
//                   </Grid>
//                 )}
                
//                 {selectedApp.credentials && Object.keys(selectedApp.credentials).length > 0 && (
//                   <Grid item xs={12}>
//                     <Typography variant="subtitle1" gutterBottom>
//                       Credentials (Masked)
//                     </Typography>
//                     <Grid container spacing={2}>
//                       {getCredentialFields(selectedApp).map((field) => (
//                         <Grid item xs={12} sm={6} key={field.key}>
//                           <MaskedText
//                             label={field.key}
//                             value={field.value}
//                             type={field.type}
//                             showCopy={true}
//                             showToggle={true}
//                             fullWidth
//                           />
//                         </Grid>
//                       ))}
//                     </Grid>
//                   </Grid>
//                 )}
//               </Grid>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleCloseDialog}>Close</Button>
//               <Button 
//                 variant="contained" 
//                 onClick={() => handleGenerateToken(selectedApp)}
//                 startIcon={<KeyIcon />}
//               >
//                 Generate Token
//               </Button>
//             </DialogActions>
//           </>
//         )}
//       </Dialog>

//       {/* Token Dialog */}
//       <Dialog open={!!tokenDialog} onClose={handleCloseTokenDialog}>
//         {tokenDialog && (
//           <>
//             <DialogTitle>
//               Application Token - {tokenDialog.name}
//             </DialogTitle>
//             <DialogContent>
//               <Typography variant="body2" color="textSecondary" paragraph>
//                 Use this token to authenticate with the {tokenDialog.name} application.
//                 Keep it secure and do not share it publicly.
//               </Typography>
              
//               {generatedToken ? (
//                 <Box sx={{ 
//                   p: 2, 
//                   backgroundColor: 'action.hover', 
//                   borderRadius: 1,
//                   fontFamily: 'monospace',
//                   wordBreak: 'break-all',
//                   position: 'relative'
//                 }}>
//                   {generatedToken}
//                   <Tooltip title="Copy token">
//                     <IconButton
//                       size="small"
//                       onClick={handleCopyToken}
//                       sx={{ position: 'absolute', top: 4, right: 4 }}
//                     >
//                       <CopyIcon fontSize="small" />
//                     </IconButton>
//                   </Tooltip>
//                 </Box>
//               ) : (
//                 <Typography variant="body2" color="textSecondary">
//                   Generating token...
//                 </Typography>
//               )}
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleCloseTokenDialog}>Close</Button>
//             </DialogActions>
//           </>
//         )}
//       </Dialog>
//     </Box>
//   );
// };

// export default ApplicationList;



import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Container,
  Fade,
  Paper,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Visibility as ViewIcon,
  VpnKey as KeyIcon,
  Edit as EditIcon,
  ContentCopy as CopyIcon,
  CheckCircle,
  Apps as AppsIcon,
  AccessTime,
  Settings,
  Lock,
} from '@mui/icons-material';
import MaskedText from '../common/MaskedText';
import LoadingSpinner from '../common/LoadingSpinner';
import { businessService } from '../../services/business';
import { formatDate } from '../../utils/formatters';
import { APPLICATION_STATUS_COLORS } from '../../utils/constants';

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const [tokenDialog, setTokenDialog] = useState(null);
  const [generatedToken, setGeneratedToken] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await businessService.getApplications();
      setApplications(data);
    } catch (err) {
      setError(err.message || 'Failed to load applications');
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (app) => {
    setSelectedApp(app);
  };

  const handleGenerateToken = async (app) => {
    try {
      const response = await businessService.getAppToken(app.appId);
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

  const handleCloseDialog = () => {
    setSelectedApp(null);
  };

  const handleCloseTokenDialog = () => {
    setTokenDialog(null);
    setGeneratedToken('');
    setCopied(false);
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

  if (loading) {
    return <LoadingSpinner />;
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

  return (
    <Box sx={{ minHeight: '100vh', background: '#f8fafc', py: 4 }}>
      <Container maxWidth="xl">
        <Fade in timeout={600}>
          <Box>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h3" fontWeight={700} sx={{ color: '#0f172a', mb: 1 }}>
                Applications
              </Typography>
              <Typography variant="body1" sx={{ color: '#64748b' }}>
                View and manage your business applications and integrations
              </Typography>
            </Box>

            {applications.length === 0 ? (
              <Fade in timeout={700}>
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
            ) : (
              <Grid container spacing={3}>
                {applications.map((app, index) => {
                  const statusColor = getStatusColor(app.status);
                  return (
                    <Grid item xs={12} sm={6} md={4} key={app.appId}>
                      <Fade in timeout={700 + index * 100}>
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
                          <CardContent sx={{ flexGrow: 1, p: 3 }}>
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

                          <Divider />

                          <CardActions sx={{ p: 2, gap: 1 }}>
                            <Button
                              size="small"
                              startIcon={<ViewIcon />}
                              onClick={() => handleView(app)}
                              sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                color: '#667eea',
                                '&:hover': {
                                  backgroundColor: '#ede9fe',
                                },
                              }}
                            >
                              View Details
                            </Button>
                            <Button
                              size="small"
                              startIcon={<KeyIcon />}
                              onClick={() => handleGenerateToken(app)}
                              sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                color: '#10b981',
                                '&:hover': {
                                  backgroundColor: '#ecfdf5',
                                },
                              }}
                            >
                              Get Token
                            </Button>
                          </CardActions>
                        </Paper>
                      </Fade>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Box>
        </Fade>

        {/* Application Details Dialog */}
        <Dialog 
          open={!!selectedApp} 
          onClose={handleCloseDialog}
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
                  onClick={handleCloseDialog}
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
      </Container>
    </Box>
  );
};

export default ApplicationList; 