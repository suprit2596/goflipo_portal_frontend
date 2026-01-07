import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Button,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { adminService } from '../../services/admin';

const ApplicationDetail = () => {
  const { appId } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplicationDetails();
  }, [appId]);

  const fetchApplicationDetails = async () => {
    try {
      setLoading(true);
      const data = await adminService.getApplication(appId);
      setApplication(data);
    } catch (error) {
      console.error('Failed to fetch application details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await adminService.deleteApplication(appId);
        navigate('/admin/applications');
      } catch (error) {
        console.error('Failed to delete application:', error);
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Loading application details...</Typography>
      </Box>
    );
  }

  if (!application) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Application not found</Typography>
        <Button onClick={() => navigate('/admin/applications')}>
          Back to Applications
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/admin/applications')} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">{application.name}</Typography>
        <Chip 
          label={application.type} 
          color="primary" 
          sx={{ ml: 2 }}
        />
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={() => navigate(`/admin/applications/${appId}/edit`)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDelete} color="error">
          <DeleteIcon />
        </IconButton>
      </Box>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Application Info */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
              <Tab label="Overview" />
              <Tab label="Settings" />
              <Tab label="Logs" />
              <Tab label="Users" />
            </Tabs>

            {tabValue === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Application Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">
                      Application ID
                    </Typography>
                    <Typography variant="body1">{application.id}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">
                      Business
                    </Typography>
                    <Typography variant="body1">
                      {application.businessName}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">
                      Status
                    </Typography>
                    <Chip 
                      label={application.active ? 'Active' : 'Inactive'} 
                      color={application.active ? 'success' : 'default'}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">
                      Created Date
                    </Typography>
                    <Typography variant="body1">
                      {new Date(application.createdAt).toLocaleDateString()}
                    </Typography>
                  </Grid>
                </Grid>

                {application.description && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Description
                    </Typography>
                    <Typography variant="body1">
                      {application.description}
                    </Typography>
                  </Box>
                )}
              </Box>
            )}

            {tabValue === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Application Settings
                </Typography>
                <Typography>
                  Settings configuration will appear here...
                </Typography>
              </Box>
            )}

            {tabValue === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Application Logs
                </Typography>
                <Typography>
                  Recent activity logs will appear here...
                </Typography>
              </Box>
            )}

            {tabValue === 3 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Application Users
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Last Active</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          No users found
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Sidebar Stats */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Quick Stats
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    API Calls Today
                  </Typography>
                  <Typography variant="h5">0</Typography>
                  
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                    Storage Used
                  </Typography>
                  <Typography variant="h5">0 MB</Typography>
                  
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                    Monthly Active Users
                  </Typography>
                  <Typography variant="h5">0</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button variant="outlined" size="small">
                    Generate API Key
                  </Button>
                  <Button variant="outlined" size="small">
                    View Documentation
                  </Button>
                  <Button variant="outlined" size="small">
                    Test Endpoints
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ApplicationDetail;