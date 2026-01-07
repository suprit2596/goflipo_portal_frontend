// src/pages/BusinessDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Button,
  Alert,
  CircularProgress,
  Divider,
  Avatar,
  
} from '@mui/material';
import { ArrowBack, Business, Email, Category, CalendarToday  , PersonAdd as PersonAddIcon,Groups as GroupsIcon} from '@mui/icons-material';
import { adminService } from '../services/admin';
import { BUSINESS_STATUS_COLORS } from '../utils/constants';
import { formatDate } from '../utils/formatters';

const BusinessDetailPage = () => {
  const { tenantId } = useParams();
  const navigate = useNavigate();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBusiness();
  }, [tenantId]);

  const fetchBusiness = async () => {
    try {
      setLoading(true);
      const data = await adminService.getBusiness(tenantId);
      setBusiness(data);
    } catch (err) {
      setError('Failed to load business details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
        
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/admin/businesses')}
          >
            Back to Businesses
          </Button>
 <Button
    variant="outlined"
    startIcon={<GroupsIcon />}
    onClick={() => navigate(`/admin/businesses/${tenantId}/users`)}
    sx={{ mr: 1 }}
  >
    {/* View Users ({business?.userCount || 0}) */}
    View Users
  </Button>

          <Typography variant="h4" sx={{ flex: 1 }}>
            Business Details
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate(`/admin/businesses/${tenantId}/edit`)}
          >
            Edit Business
          </Button>
            {/* ADD THIS BUTTON */}
  <Button
    variant="outlined"
    startIcon={<PersonAddIcon />}
    onClick={() => navigate(`/admin/businesses/${tenantId}/create-user`)}
  >
    Create User
  </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {business && (
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <Grid container spacing={4}>
              {/* Header */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: BUSINESS_STATUS_COLORS[business.status] || 'primary.main',
                    }}
                  >
                    <Business sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight={700}>
                      {business.businessName}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                      <Chip
                        label={business.status}
                        color={BUSINESS_STATUS_COLORS[business.status] || 'default'}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {business.industry}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              {/* Details */}
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                  Contact Information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Email color="action" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="body1">{business.contactEmail}</Typography>
                    </Box>
                  </Box>
                  {business.contactPhone && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Email color="action" />
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Phone
                        </Typography>
                        <Typography variant="body1">{business.contactPhone}</Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                  Business Information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Category color="action" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Industry
                      </Typography>
                      <Typography variant="body1">{business.industry}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CalendarToday color="action" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Created
                      </Typography>
                      <Typography variant="body1">{formatDate(business.createdAt)}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              {/* Description */}
              {business.description && (
                <Grid item xs={12}>
                  <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                    Description
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="body1">{business.description}</Typography>
                  </Paper>
                </Grid>
              )}
            </Grid>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default BusinessDetailPage;