// src/pages/EditBusinessPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Alert,
  CircularProgress,
  Button,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import CreateBusiness from '../components/admin/CreateBusiness';
import { adminService } from '../services/admin';

const EditBusinessPage = () => {
  const { tenantId } = useParams();
  const navigate = useNavigate();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (tenantId) {
      fetchBusiness();
    }
  }, [tenantId]);

  const fetchBusiness = async () => {
    try {
      setLoading(true);
      const data = await adminService.getBusiness(tenantId);
      setBusiness(data);
    } catch (err) {
      setError('Failed to load business details');
      console.error('Error fetching business:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    navigate('/admin/businesses');
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
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/admin/businesses')}
          sx={{ mb: 3 }}
        >
          Back to Businesses
        </Button>

        <Typography variant="h4" sx={{ mb: 3 }}>
          Edit Business
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {business && (
          <CreateBusiness 
            business={business}
            isEditMode={true}
            onSuccess={handleSuccess}
          />
        )}
      </Box>
    </Container>
  );
};

export default EditBusinessPage;