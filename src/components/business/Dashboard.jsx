import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Container,
  Avatar,
  CircularProgress,
  Typography,
  Chip,
  Button,
  Grid,
} from '@mui/material';
import {
  Business as BusinessIcon,
  Email as EmailIcon,
  Category as CategoryIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Settings as SettingsIcon,
  Receipt as ReceiptIcon,
  Phone as PhoneIcon,
  Language as LanguageIcon,
  Security as SecurityIcon,
  Tag as TagIcon,
  Apps as AppsIcon,
  Block as BlockIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { businessService } from '../../services/business';
import { formatDate } from '../../utils/formatters';

// ─── Status helpers ──────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  ACTIVE: {
    label: 'ACTIVE',
    bg: 'rgba(16, 185, 129, 0.1)',
    color: '#10b981',
    border: 'rgba(16, 185, 129, 0.2)',
  },
  INACTIVE: {
    label: 'INACTIVE',
    bg: 'rgba(245, 158, 11, 0.1)',
    color: '#f59e0b',
    border: 'rgba(245, 158, 11, 0.2)',
  },
  BLOCKED: {
    label: 'BLOCKED',
    bg: 'rgba(239, 68, 68, 0.1)',
    color: '#ef4444',
    border: 'rgba(239, 68, 68, 0.2)',
  },
};

const getStatusConfig = (accountStatus, blockDetails) => {
  if (blockDetails?.isBlocked) return STATUS_CONFIG.BLOCKED;
  return STATUS_CONFIG[accountStatus] ?? STATUS_CONFIG.INACTIVE;
};

// ─── Reusable info card ───────────────────────────────────────────────────────

const InfoCard = ({ icon, label, value, accentColor, borderColor }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      p: { xs: 3, md: 4 },
      height: '100%',
      borderRadius: 3,
      bgcolor: '#f8fafc',
      border: '2px solid',
      borderColor: borderColor ?? `rgba(${accentColor}, 0.1)`,
      transition: 'all 0.3s ease',
      '&:hover': {
        borderColor: `rgba(${accentColor}, 0.3)`,
        transform: 'translateY(-4px)',
        boxShadow: `0 12px 24px rgba(${accentColor}, 0.1)`,
      },
    }}
  >
    <Box
      sx={{
        width: { xs: 56, md: 64 },
        height: { xs: 56, md: 64 },
        borderRadius: 3,
        bgcolor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mr: 3,
        flexShrink: 0,
        boxShadow: `0 4px 12px rgba(${accentColor}, 0.15)`,
      }}
    >
      {React.cloneElement(icon, {
        sx: { fontSize: { xs: 28, md: 32 }, color: `rgb(${accentColor})` },
      })}
    </Box>
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Typography
        variant="caption"
        sx={{
          color: '#64748b',
          display: 'block',
          fontWeight: 600,
          textTransform: 'uppercase',
          fontSize: { xs: '0.7rem', md: '0.75rem' },
          letterSpacing: '1px',
          mb: 1,
        }}
      >
        {label}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          color: '#0f172a',
          fontSize: { xs: '1rem', md: '1.15rem' },
          wordBreak: 'break-all',
        }}
      >
        {value || <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>Not provided</span>}
      </Typography>
    </Box>
  </Box>
);

// ─── Component ────────────────────────────────────────────────────────────────

const BusinessDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const data = await businessService.getDashboard();
      console.log('📊 Dashboard data from service:', data);
      setDashboardData(data);
    } catch (err) {
      console.error('❌ Error fetching dashboard:', err);

      const userStr = sessionStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setDashboardData(user);
        } catch {
          setDashboardData(null);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#f8fafc' }}>
        <CircularProgress />
      </Box>
    );
  }

  // ── Destructure all fields from the Business document ──────────────────────
  const {
    businessName   = 'Your Business',
    username,
    email,
    industry       = 'Not specified',
    emergencyContactNo,
    websiteUrl,
    authType,
    businessId,
    appId,
    accountStatus  = 'INACTIVE',
    blockDetails,
    createdAt,
    updatedAt,
  } = dashboardData ?? {};

  const statusCfg = getStatusConfig(accountStatus, blockDetails);
  const isBlocked = blockDetails?.isBlocked;

  const displayName    = businessName;
  const displayEmail   = email || username || 'Not available';
  const memberSince    = createdAt
    ? formatDate(
        typeof createdAt === 'string' ? createdAt : new Date(createdAt).toISOString(),
        'MMM D, YYYY, h:mm A'
      )
    : 'N/A';
  const lastUpdated    = updatedAt
    ? formatDate(
        typeof updatedAt === 'string' ? updatedAt : new Date(updatedAt).toISOString(),
        'MMM D, YYYY, h:mm A'
      )
    : null;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f7fa', py: 4, px: { xs: 2, sm: 3, md: 4 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Page heading */}
        <Box sx={{ mb: 5, textAlign: 'center', position: 'relative' }}>
          <Box sx={{
            position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
            width: 200, height: 200, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(102,126,234,0.1) 0%, transparent 100%)', zIndex: 0,
          }} />
          <Typography variant="h4" sx={{
            fontWeight: 800, mb: 1.5, fontSize: { xs: '2rem', md: '2.5rem' },
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            position: 'relative', zIndex: 1,
          }}>
            Business Dashboard
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', fontSize: '1.1rem', maxWidth: 600, mx: 'auto', position: 'relative', zIndex: 1 }}>
            Manage your business profile and settings
          </Typography>
        </Box>

        <Grid container justifyContent="center">
          <Grid item xs={12} md={10} lg={9}>
            <Card sx={{
              width: '100%', borderRadius: 4, bgcolor: 'white',
              boxShadow: '0 20px 60px rgba(0,0,0,0.08)', overflow: 'hidden', position: 'relative',
              '&::before': {
                content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '6px',
                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
              },
            }}>
              {/* ── Profile header ─────────────────────────────────────────── */}
              <Box sx={{
                p: { xs: 4, md: 5 }, textAlign: 'center', position: 'relative',
                background: 'linear-gradient(135deg, rgba(102,126,234,0.05) 0%, rgba(118,75,162,0.05) 100%)',
                borderBottom: '1px solid #e2e8f0',
              }}>
                <Avatar sx={{
                  width: { xs: 100, md: 120 }, height: { xs: 100, md: 120 },
                  mx: 'auto', mb: 3, border: '4px solid white', bgcolor: 'white',
                  color: '#667eea', boxShadow: '0 10px 30px rgba(102,126,234,0.2)', position: 'relative', zIndex: 2,
                }}>
                  <BusinessIcon fontSize="large" sx={{ fontSize: { xs: 48, md: 56 } }} />
                </Avatar>

                <Typography variant="h3" sx={{
                  fontWeight: 800, mb: 2.5, fontSize: { xs: '1.75rem', md: '2.25rem' }, position: 'relative', zIndex: 2,
                }}>
                  {displayName}
                </Typography>

                {/* Only status chip — no tier chip */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
                  <Chip
                    label={statusCfg.label}
                    icon={isBlocked ? <BlockIcon sx={{ fontSize: 16 }} /> : undefined}
                    size="medium"
                    sx={{
                      bgcolor: statusCfg.bg, color: statusCfg.color,
                      fontWeight: 700, fontSize: { xs: '0.75rem', md: '0.875rem' },
                      letterSpacing: '0.5px', px: 1, py: 0.5,
                      border: `1px solid ${statusCfg.border}`,
                    }}
                  />
                </Box>

            
                
              </Box>

              {/* ── Info grid ──────────────────────────────────────────────── */}
              <CardContent sx={{ p: { xs: 4, md: 5 } }}>
                <Grid container spacing={3}>

                  {/* Business Name / Account Owner */}
                  <Grid item xs={12} md={6}>
                    <InfoCard
                      icon={<PersonIcon />}
                      label="Account Owner"
                      value={displayName}
                      accentColor="102, 126, 234"
                    />
                  </Grid>

                  

                  {/* Business Email */}
                  <Grid item xs={12} md={6}>
                    <InfoCard
                      icon={<EmailIcon />}
                      label="Business Email"
                      value={displayEmail}
                      accentColor="6, 182, 212"
                    />
                  </Grid>

                  {/* Industry */}
                  <Grid item xs={12} md={6}>
                    <InfoCard
                      icon={<CategoryIcon />}
                      label="Industry"
                      value={industry}
                      accentColor="139, 92, 246"
                    />
                  </Grid>

                  {/* Emergency Contact */}
                  <Grid item xs={12} md={6}>
                    <InfoCard
                      icon={<PhoneIcon />}
                      label="Emergency Contact No."
                      value={emergencyContactNo}
                      accentColor="249, 115, 22"
                    />
                  </Grid>

                  {/* Website */}
                  <Grid item xs={12} md={6}>
                    <InfoCard
                      icon={<LanguageIcon />}
                      label="Website URL"
                      value={websiteUrl}
                      accentColor="20, 184, 166"
                    />
                  </Grid>


                  {/* Business ID */}
                  <Grid item xs={12} md={6}>
                    <InfoCard
                      icon={<TagIcon />}
                      label="Business ID"
                      value={businessId}
                      accentColor="99, 102, 241"
                    />
                  </Grid>

                 

                  {/* Member Since */}
                  <Grid item xs={12} md={lastUpdated ? 6 : 12}>
                    <InfoCard
                      icon={<CalendarIcon />}
                      label="Member Since"
                      value={memberSince}
                      accentColor="16, 185, 129"
                    />
                  </Grid>

                  {/* Last Updated */}
                  {lastUpdated && (
                    <Grid item xs={12} md={6}>
                      <InfoCard
                        icon={<CalendarIcon />}
                        label="Last Updated"
                        value={lastUpdated}
                        accentColor="59, 130, 246"
                      />
                    </Grid>
                  )}
                </Grid>

                {/* ── Action buttons ────────────────────────────────────────── */}
                <Box sx={{
                  mt: 5, pt: 4, borderTop: '2px solid #e2e8f0',
                  display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' },
                }}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<SettingsIcon />}
                    sx={{
                      borderRadius: 3, fontWeight: 700,
                      py: { xs: 1.75, md: 2.25 }, fontSize: { xs: '1rem', md: '1.125rem' },
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 8px 24px rgba(102,126,234,0.3)',
                      '&:hover': { boxShadow: '0 16px 32px rgba(102,126,234,0.4)', transform: 'translateY(-2px)' },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Manage Business Profile
                  </Button>

                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<ReceiptIcon />}
                    onClick={() => navigate('/business/transactions')}
                    sx={{
                      borderRadius: 3, fontWeight: 700,
                      py: { xs: 1.75, md: 2.25 }, fontSize: { xs: '1rem', md: '1.125rem' },
                      borderWidth: 2, borderColor: '#667eea', color: '#667eea',
                      '&:hover': {
                        borderWidth: 2, borderColor: '#764ba2',
                        backgroundColor: 'rgba(102,126,234,0.04)', transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    View Transactions
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* Footer */}
            <Box sx={{
              mt: 4, textAlign: 'center', p: 3, borderRadius: 3,
              bgcolor: 'rgba(102,126,234,0.05)', border: '1px solid rgba(102,126,234,0.1)',
            }}>
              <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.875rem' }}>
                Last refreshed: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} •
                <Typography component="span" variant="caption" sx={{ fontWeight: 600, ml: 1, color: '#667eea' }}>
                  Dashboard v2.1
                </Typography>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BusinessDashboard;
