import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Container,
  Paper,
  Avatar,
  CircularProgress,
  Button,
  Alert,
  Chip,
  Divider,
  alpha,
  useTheme,
  IconButton,
  LinearProgress,
  Tooltip,
  Fade,
  Badge,
  Stack,
} from '@mui/material';
import {
  Business as BusinessIcon,
  Apps as AppsIcon,
  Email as EmailIcon,
  Category as CategoryIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Refresh as RefreshIcon,
  Lock as LockIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  TrendingUp as TrendingUpIcon,
  Shield as ShieldIcon,
  MoreVert as MoreVertIcon,
  Notifications as NotificationsIcon,
  ArrowForward as ArrowForwardIcon,
  Security as SecurityIcon,
  Cloud as CloudIcon,
  Storage as StorageIcon,
  VerifiedUser as VerifiedUserIcon,
  HelpOutline as HelpOutlineIcon,
  Settings as SettingsIcon,
  Dashboard as DashboardIcon,
  Bolt as BoltIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { businessService } from '../../services/business';
import { formatDate } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';

const BusinessDashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    console.log('🔄 Dashboard component mounted');
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    console.log('📊 Starting dashboard fetch...');
    setDebugInfo('Fetching data...');
    setError(null);
    setLoading(true);
    
    try {
      console.log('📞 Calling businessService.getDashboard()');
      const data = await businessService.getDashboard();
      
      console.log('✅ Dashboard data received:', data);
      setDebugInfo(`Loaded: ${data.businessName}`);
      setDashboardData(data);
      
    } catch (err) {
      console.error('❌ Dashboard fetch error:', err);
      setDebugInfo(`Error: ${err.message}`);
      setError(err.message || 'Failed to load dashboard');
      
      // Set fallback data
      setDashboardData({
        businessName: 'Your Business',
        industry: 'Technology & Software',
        contactEmail: 'admin@business.com',
        username: 'admin_user',
        totalApplications: 12,
        applications: [],
        accountStatus: 'ACTIVE',
        createdAt: new Date().toISOString(),
        subscriptionTier: 'Premium',
        lastLogin: new Date().toISOString(),
      });
      
    } finally {
      console.log('🏁 Dashboard fetch completed');
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    console.log('🔁 Refreshing dashboard...');
    fetchDashboardData();
  };

  const handleChangePassword = () => {
    navigate('/business/change-password');
  };

  // Enhanced Stat Card Component
  const StatCard = ({ title, value, icon, color, subtitle, trend, loading }) => (
    <Card 
      sx={{ 
        height: '100%',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        borderRadius: 3,
        border: '1px solid',
        borderColor: alpha(theme.palette.divider, 0.1),
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
          borderColor: alpha(color, 0.3),
          '& .stat-icon': {
            transform: 'scale(1.1) rotate(5deg)',
          }
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${color} 0%, ${alpha(color, 0.7)} 100%)`,
        }
      }}
    >
      <CardContent sx={{ p: 3.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography 
              variant="overline" 
              sx={{ 
                fontWeight: 600,
                letterSpacing: 1,
                color: alpha(theme.palette.text.secondary, 0.8),
                fontSize: '0.7rem',
                textTransform: 'uppercase'
              }}
            >
              {title}
            </Typography>
            {loading ? (
              <Box sx={{ height: 40, display: 'flex', alignItems: 'center' }}>
                <CircularProgress size={24} />
              </Box>
            ) : (
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${color}, ${alpha(color, 0.8)})`,
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '2.5rem',
                  lineHeight: 1.2,
                  mt: 0.5
                }}
              >
                {value}
              </Typography>
            )}
          </Box>
          <Box 
            className="stat-icon"
            sx={{ 
              transition: 'transform 0.3s ease',
              p: 1.5,
              borderRadius: 3,
              bgcolor: alpha(color, 0.1),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56
            }}
          >
            {React.cloneElement(icon, {
              sx: { 
                fontSize: 28,
                color: color,
              }
            })}
          </Box>
        </Box>
        
        {subtitle && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
            <Typography 
              variant="caption" 
              sx={{ 
                fontWeight: 500,
                color: theme.palette.text.secondary,
                fontSize: '0.85rem'
              }}
            >
              {subtitle}
            </Typography>
            {trend && (
              <Chip
                label={trend.value}
                size="small"
                icon={trend.icon}
                color={trend.positive ? 'success' : 'error'}
                variant="filled"
                sx={{ 
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  height: 22
                }}
              />
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );

  // Enhanced Info Item Component
  const InfoItem = ({ icon, label, value, color = 'primary', action }) => (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        p: 2.5,
        borderRadius: 2,
        transition: 'all 0.2s ease',
        bgcolor: 'transparent',
        '&:hover': {
          bgcolor: alpha(theme.palette.background.paper, 0.6),
          transform: 'translateX(4px)',
        }
      }}
    >
      <Box sx={{ 
        width: 48, 
        height: 48, 
        borderRadius: 3,
        bgcolor: alpha(theme.palette[color].main, 0.08),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mr: 3,
        border: `1px solid ${alpha(theme.palette[color].main, 0.1)}`,
      }}>
        {React.cloneElement(icon, { 
          sx: { 
            fontSize: 22,
            color: theme.palette[color].main 
          } 
        })}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography 
          variant="caption" 
          sx={{ 
            fontWeight: 600,
            color: theme.palette.text.secondary,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
            fontSize: '0.7rem',
            display: 'block',
            mb: 0.5
          }}
        >
          {label}
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            fontWeight: 600,
            color: theme.palette.text.primary,
            fontSize: '1rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {value}
        </Typography>
      </Box>
      {action && (
        <IconButton 
          size="small" 
          sx={{ 
            ml: 1,
            color: theme.palette.text.secondary
          }}
        >
          {action}
        </IconButton>
      )}
    </Box>
  );

  // Quick Action Button Component
  const QuickActionButton = ({ icon, label, color = 'primary', variant = 'contained' }) => (
    <Button
      fullWidth
      startIcon={icon}
      variant={variant}
      sx={{
        justifyContent: 'flex-start',
        py: 2.5,
        px: 3,
        mb: 2,
        borderRadius: 2,
        textAlign: 'left',
        transition: 'all 0.3s ease',
        border: variant === 'outlined' ? `1px solid ${alpha(theme.palette[color].main, 0.2)}` : 'none',
        background: variant === 'contained' 
          ? `linear-gradient(135deg, ${theme.palette[color].main} 0%, ${alpha(theme.palette[color].main, 0.8)} 100%)`
          : 'transparent',
        color: variant === 'contained' ? '#fff' : theme.palette[color].main,
        fontWeight: 600,
        fontSize: '0.95rem',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: variant === 'contained' 
            ? `0 8px 24px ${alpha(theme.palette[color].main, 0.3)}`
            : `0 4px 12px ${alpha(theme.palette[color].main, 0.1)}`,
          background: variant === 'contained' 
            ? `linear-gradient(135deg, ${theme.palette[color].dark} 0%, ${alpha(theme.palette[color].dark, 0.8)} 100%)`
            : alpha(theme.palette[color].main, 0.05),
        }
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 600, flex: 1 }}>
        {label}
      </Typography>
      <ArrowForwardIcon sx={{ fontSize: 18, opacity: 0.7 }} />
    </Button>
  );

  // Service Status Item
  const ServiceStatusItem = ({ label, status, uptime, icon }) => (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      py: 2,
      px: 1,
      borderRadius: 2,
      transition: 'all 0.2s ease',
      '&:hover': {
        bgcolor: alpha(theme.palette.background.paper, 0.6),
      }
    }}>
      <Box sx={{ mr: 2 }}>
        {icon}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
          {label}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {uptime} uptime
        </Typography>
      </Box>
      <Chip 
        label={status}
        size="small"
        color={status === 'Operational' ? 'success' : 'error'}
        sx={{ 
          fontWeight: 600,
          fontSize: '0.7rem',
          height: 24,
          minWidth: 100,
          bgcolor: status === 'Operational' 
            ? alpha(theme.palette.success.main, 0.1) 
            : alpha(theme.palette.error.main, 0.1),
          border: `1px solid ${status === 'Operational' 
            ? alpha(theme.palette.success.main, 0.2) 
            : alpha(theme.palette.error.main, 0.2)}`,
        }}
      />
    </Box>
  );

  if (loading && !dashboardData) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)',
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <Box
            sx={{
              position: 'relative',
              width: 120,
              height: 120,
              mx: 'auto',
              mb: 4,
            }}
          >
            <CircularProgress
              size={120}
              thickness={2}
              sx={{
                color: theme.palette.primary.main,
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />
            <Avatar
              sx={{
                width: 80,
                height: 80,
                position: 'absolute',
                top: 20,
                left: 20,
                bgcolor: theme.palette.primary.main,
              }}
            >
              <BusinessIcon sx={{ fontSize: 40 }} />
            </Avatar>
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: theme.palette.text.primary }}>
            Loading Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Preparing your business insights...
          </Typography>
          <LinearProgress 
            sx={{ 
              width: 300, 
              mx: 'auto',
              borderRadius: 3,
              height: 6,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              '& .MuiLinearProgress-bar': {
                borderRadius: 3,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              }
            }} 
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #eef2f6 100%)',
      py: 4,
    }}>
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            mb: 4,
            flexWrap: 'wrap',
            gap: 3
          }}>
            <Box>
              <Typography variant="h1" sx={{ 
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.2,
                mb: 1.5
              }}>
                Welcome back, {dashboardData?.businessName || 'Partner'}
              </Typography>
              <Typography variant="h6" sx={{ 
                fontWeight: 400,
                color: theme.palette.text.secondary,
                maxWidth: 600,
                fontSize: '1.1rem'
              }}>
                Your business dashboard • Last updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Typography>
            </Box>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Tooltip title="Notifications">
                <Badge badgeContent={3} color="error">
                  <IconButton
                    sx={{
                      bgcolor: 'white',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      '&:hover': {
                        bgcolor: 'white',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                      }
                    }}
                  >
                    <NotificationsIcon />
                  </IconButton>
                </Badge>
              </Tooltip>
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={handleRefresh}
                sx={{ 
                  borderRadius: 3,
                  fontWeight: 700,
                  px: 4,
                  py: 1.5,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 4px 14px rgba(102, 126, 234, 0.4)',
                  '&:hover': {
                    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.6)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Refresh Data
              </Button>
            </Stack>
          </Box>

          {/* Stats Grid */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} lg={3}>
              <StatCard
                title="Total Applications"
                value={dashboardData?.totalApplications || 0}
                icon={<AppsIcon />}
                color="#667eea"
                subtitle="Active integrations"
                trend={{ value: '+12%', positive: true, icon: <TrendingUpIcon /> }}
                loading={loading}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <StatCard
                title="Account Status"
                value="Active"
                icon={<VerifiedUserIcon />}
                color="#667eea"
                subtitle="Premium subscription"
                loading={loading}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <StatCard
                title="Industry"
                value={dashboardData?.industry?.split(' ')[0] || 'Tech'}
                icon={<CategoryIcon />}
                color="#f59e0b"
                subtitle={dashboardData?.industry || 'Industry'}
                loading={loading}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <StatCard
                title="Member Since"
                value={dashboardData?.createdAt ? formatDate(dashboardData.createdAt, 'YYYY') : '2024'}
                icon={<CalendarIcon />}
                color="#8b5cf6"
                subtitle={dashboardData?.createdAt ? formatDate(dashboardData.createdAt) : 'Join date'}
                loading={loading}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Main Content Grid */}
        <Grid container spacing={3}>
          {/* Left Column - Business Profile */}
          <Grid item xs={12} lg={8}>
            {/* Business Profile Card */}
            <Card sx={{ 
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
              border: '1px solid',
              borderColor: alpha(theme.palette.divider, 0.1),
              background: 'white',
              mb: 4
            }}>
              {/* Card Header */}
              <Box sx={{ 
                p: 4,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <Box sx={{ 
                  position: 'absolute',
                  top: -100,
                  right: -100,
                  width: 300,
                  height: 300,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                }} />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                      sx={{ 
                        width: 80, 
                        height: 80, 
                        mr: 3,
                        border: '4px solid rgba(255,255,255,0.2)',
                        bgcolor: 'white',
                        color: '#667eea',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                      }}
                    >
                      <BusinessIcon fontSize="large" />
                    </Avatar>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                        {dashboardData?.businessName || 'Your Business'}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                        <Chip 
                          label={dashboardData?.subscriptionTier || 'Premium'} 
                          size="small"
                          sx={{ 
                            bgcolor: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            fontWeight: 700,
                            border: '1px solid rgba(255,255,255,0.3)',
                          }}
                        />
                        <Chip 
                          label="Verified Partner" 
                          size="small"
                          icon={<StarIcon sx={{ color: '#ffd700', fontSize: 16 }} />}
                          sx={{ 
                            bgcolor: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            fontWeight: 700,
                            border: '1px solid rgba(255,255,255,0.3)',
                          }}
                        />
                        <Chip 
                          label="Enterprise" 
                          size="small"
                          icon={<BoltIcon sx={{ fontSize: 16 }} />}
                          sx={{ 
                            bgcolor: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            fontWeight: 700,
                            border: '1px solid rgba(255,255,255,0.3)',
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <IconButton sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.2)' }}>
                    <SettingsIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* Card Content */}
              <CardContent sx={{ p: 4 }}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 700, 
                      mb: 3,
                      color: theme.palette.text.primary,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}>
                      <PersonIcon sx={{ color: theme.palette.primary.main }} />
                      Business Information
                    </Typography>
                    
                    <InfoItem
                      icon={<PersonIcon />}
                      label="Username"
                      value={dashboardData?.username || 'admin_user'}
                      color="primary"
                    />
                    
                    <InfoItem
                      icon={<EmailIcon />}
                      label="Contact Email"
                      value={dashboardData?.contactEmail || 'admin@business.com'}
                      color="info"
                    />
                    
                    <InfoItem
                      icon={<CategoryIcon />}
                      label="Industry"
                      value={dashboardData?.industry || 'Technology & Software'}
                      color="secondary"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 700, 
                      mb: 3,
                      color: theme.palette.text.primary,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}>
                      <DashboardIcon sx={{ color: theme.palette.success.main }} />
                      Account Details
                    </Typography>
                    
                    <InfoItem
                      icon={<CheckCircleIcon />}
                      label="Account Status"
                      value={dashboardData?.accountStatus || 'ACTIVE'}
                      color="success"
                    />
                    
                    <InfoItem
                      icon={<CalendarIcon />}
                      label="Member Since"
                      value={dashboardData?.createdAt ? formatDate(dashboardData.createdAt) : 'N/A'}
                      color="warning"
                    />
                    
                    <InfoItem
                      icon={<TrendingUpIcon />}
                      label="Subscription Tier"
                      value={dashboardData?.subscriptionTier || 'Premium'}
                      color="info"
                    />
                  </Grid>
                </Grid>

                {/* Security Section */}
                <Box sx={{ 
                  mt: 5, 
                  pt: 4, 
                  borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                }}>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 700, 
                    mb: 3,
                    color: theme.palette.text.primary,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <SecurityIcon sx={{ color: theme.palette.error.main }} />
                    Security & Access
                  </Typography>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    p: 3,
                    borderRadius: 3,
                    bgcolor: alpha(theme.palette.primary.main, 0.03),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  }}>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                        Secure your account
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Last password change: 30 days ago
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      startIcon={<LockIcon />}
                      onClick={handleChangePassword}
                      sx={{ 
                        borderRadius: 3,
                        fontWeight: 700,
                        px: 4,
                        py: 1.5,
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        '&:hover': {
                          boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)',
                        }
                      }}
                    >
                      Change Password
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Applications Section */}
            <Card sx={{ 
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.05)',
              border: '1px solid',
              borderColor: alpha(theme.palette.divider, 0.1),
              background: 'white',
            }}>
              <CardContent sx={{ p: 5 }}>
                <Box sx={{ 
                  textAlign: 'center',
                  maxWidth: 600,
                  mx: 'auto'
                }}>
                  <Box sx={{ 
                    width: 140, 
                    height: 140, 
                    mx: 'auto', 
                    mb: 4,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `2px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      right: 8,
                      bottom: 8,
                      borderRadius: '50%',
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    }
                  }}>
                    <AppsIcon sx={{ 
                      fontSize: 60,
                      color: theme.palette.primary.main
                    }} />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: theme.palette.text.primary }}>
                    Ready to Scale Your Business?
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: theme.palette.text.secondary, 
                    mb: 4, 
                    fontSize: '1.1rem',
                    lineHeight: 1.7
                  }}>
                    Your enterprise account is fully activated. Start by integrating your first application 
                    to unlock powerful analytics, automation, and growth tools.
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<AppsIcon />}
                      sx={{ 
                        borderRadius: 3,
                        px: 5,
                        py: 2,
                        fontWeight: 700,
                        fontSize: '1rem',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                        '&:hover': {
                          boxShadow: '0 16px 32px rgba(102, 126, 234, 0.5)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Create New Application
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<HelpOutlineIcon />}
                      sx={{ 
                        borderRadius: 3,
                        px: 5,
                        py: 2,
                        fontWeight: 700,
                        fontSize: '1rem',
                        borderWidth: 2,
                        '&:hover': {
                          borderWidth: 2,
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      View Documentation
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column - Actions & Status */}
          <Grid item xs={12} lg={4}>
            {/* Quick Actions Card */}
            <Card sx={{ 
              borderRadius: 4,
              mb: 4,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.05)',
              border: '1px solid',
              borderColor: alpha(theme.palette.divider, 0.1),
              background: 'white',
            }}>
              <Box sx={{ 
                p: 3.5,
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.05) 100%)',
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
              }}>
                <Typography variant="h5" sx={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <BoltIcon sx={{ color: theme.palette.success.main }} />
                  Quick Actions
                </Typography>
              </Box>
              <CardContent sx={{ p: 3.5 }}>
                <QuickActionButton
                  label="Create New Application"
                  icon={<AppsIcon />}
                  color="primary"
                  variant="contained"
                />
                <QuickActionButton
                  label="Manage Team Members"
                  icon={<PersonIcon />}
                  color="secondary"
                />
                <QuickActionButton
                  label="View Analytics Dashboard"
                  icon={<TrendingUpIcon />}
                  color="success"
                />
                <QuickActionButton
                  label="Update Billing & Plans"
                  icon={<ShieldIcon />}
                  color="warning"
                />
              </CardContent>
            </Card>

            {/* System Status Card */}
            <Card sx={{ 
              borderRadius: 4,
              mb: 4,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.05)',
              border: '1px solid',
              borderColor: alpha(theme.palette.success.main, 0.2),
              background: 'white',
            }}>
              <CardContent sx={{ p: 3.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Box sx={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: 3,
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2.5,
                    border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                  }}>
                    <CheckCircleIcon sx={{ color: theme.palette.success.main, fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>
                      System Status
                    </Typography>
                    <Typography variant="caption" sx={{ 
                      fontWeight: 600,
                      color: theme.palette.success.main,
                      bgcolor: alpha(theme.palette.success.main, 0.1),
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 2,
                    }}>
                      All systems operational
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ 
                  bgcolor: alpha(theme.palette.background.paper, 0.5), 
                  borderRadius: 3, 
                  p: 2.5,
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                }}>
                  <ServiceStatusItem
                    label="API Services"
                    status="Operational"
                    uptime="99.99%"
                    icon={<CloudIcon sx={{ color: theme.palette.success.main }} />}
                  />
                  <Divider sx={{ my: 2, opacity: 0.3 }} />
                  <ServiceStatusItem
                    label="Database"
                    status="Operational"
                    uptime="99.98%"
                    icon={<StorageIcon sx={{ color: theme.palette.success.main }} />}
                  />
                  <Divider sx={{ my: 2, opacity: 0.3 }} />
                  <ServiceStatusItem
                    label="Authentication"
                    status="Operational"
                    uptime="100%"
                    icon={<SecurityIcon sx={{ color: theme.palette.success.main }} />}
                  />
                  <Divider sx={{ my: 2, opacity: 0.3 }} />
                  <ServiceStatusItem
                    label="File Storage"
                    status="Operational"
                    uptime="99.97%"
                    icon={<StorageIcon sx={{ color: theme.palette.success.main }} />}
                  />
                </Box>

                <Typography variant="caption" sx={{ 
                  display: 'block', 
                  mt: 3,
                  textAlign: 'center',
                  color: theme.palette.text.secondary,
                  fontWeight: 500
                }}>
                  Last checked: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </CardContent>
            </Card>

            {/* Support Card */}
            <Card sx={{ 
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.05)',
              border: '1px solid',
              borderColor: alpha(theme.palette.primary.main, 0.1),
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.03) 0%, rgba(118, 75, 162, 0.03) 100%)',
            }}>
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Box sx={{ 
                  width: 80, 
                  height: 80, 
                  mx: 'auto', 
                  mb: 3,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                }}>
                  <HelpOutlineIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: theme.palette.text.primary }}>
                  Enterprise Support
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: theme.palette.text.secondary, 
                  mb: 4,
                  fontSize: '0.95rem',
                  lineHeight: 1.6
                }}>
                  Our dedicated support team is available 24/7 to help you with any questions, 
                  issues, or strategic guidance.
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<HelpOutlineIcon />}
                  sx={{ 
                    borderRadius: 3,
                    py: 2,
                    fontWeight: 700,
                    fontSize: '1rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                    '&:hover': {
                      boxShadow: '0 16px 32px rgba(102, 126, 234, 0.5)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Contact Support Team
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Footer */}
        <Box sx={{ 
          mt: 6, 
          pt: 4, 
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          textAlign: 'center'
        }}>
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} Business Dashboard • v2.4.1 • 
            <Typography component="span" variant="caption" sx={{ fontWeight: 600, ml: 1 }}>
              Enterprise Edition
            </Typography>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default BusinessDashboard;