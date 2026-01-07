import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  Avatar,
  Card,
  CardContent,
  CardActions,
  Divider,
  Tooltip,
} from '@mui/material';
import {
  ArrowBack,
  PersonAdd as AddUserIcon,
  Email,
  Person,
  Delete as DeleteIcon,
  Edit as EditIcon,
  LockReset as ResetPasswordIcon,
} from '@mui/icons-material';
import DataTable from '../components/common/DataTable';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { adminService } from '../services/admin';
import { formatDate } from '../utils/formatters';

const BusinessUsersPage = () => {
  const { tenantId } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingBusiness, setLoadingBusiness] = useState(true);
  const [error, setError] = useState('');
  const [deleteDialog, setDeleteDialog] = useState(null);
  const [resetPasswordDialog, setResetPasswordDialog] = useState(null);

  useEffect(() => {
    if (tenantId) {
      fetchBusiness();
      fetchUsers();
    }
  }, [tenantId]);

  const fetchBusiness = async () => {
    try {
      setLoadingBusiness(true);
      const data = await adminService.getBusiness(tenantId);
      setBusiness(data);
    } catch (err) {
      console.error('Error fetching business:', err);
    } finally {
      setLoadingBusiness(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await adminService.getBusinessUsers(tenantId);
      setUsers(data || []);
    } catch (err) {
      setError('Failed to load users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = (user) => {
    setDeleteDialog(user);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog) return;
    
    try {
      // You'll need to add deleteUser method to adminService
      await adminService.deleteUser(deleteDialog.id);
      fetchUsers(); // Refresh the list
      setDeleteDialog(null);
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const handleResetPassword = (user) => {
    setResetPasswordDialog(user);
  };

  const handleResetPasswordConfirm = async () => {
    if (!resetPasswordDialog) return;
    
    try {
      // You'll need to add resetPassword method to adminService
       await adminService.resetUserPassword(resetPasswordDialog.id);
      setResetPasswordDialog(null);
      alert('Password reset link has been sent to user email');
    } catch (err) {
      console.error('Error resetting password:', err);
    }
  };

  const handleEditUser = (user) => {
    // Navigate to edit user page
 navigate(`/admin/users/${user.id}/edit`);
  };

  const columns = [
    {
      field: 'fullName',
      headerName: 'Name',
      sortable: true,
      render: (value, user) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
            {user.fullName?.charAt(0) || user.email?.charAt(0) || 'U'}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              {user.fullName || 'N/A'}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {user.email}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      sortable: true,
    },
    {
      field: 'role',
      headerName: 'Role',
      sortable: true,
      render: (value) => (
        <Chip 
          label={value || 'BUSINESS_USER'} 
          color={value === 'ADMIN' ? 'primary' : 'default'}
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
    {
      field: 'status',
      headerName: 'Status',
      sortable: true,
      render: (value) => (
        <Chip 
          label={value || 'ACTIVE'} 
          color={value === 'ACTIVE' ? 'success' : 'error'}
          size="small" 
          variant="outlined"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      align: 'right',
      render: (_, user) => (
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
          <Tooltip title="Edit User">
            <IconButton
              size="small"
              onClick={() => handleEditUser(user)}
              sx={{ color: '#f59e0b' }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reset Password">
            <IconButton
              size="small"
              onClick={() => handleResetPassword(user)}
              sx={{ color: '#667eea' }}
            >
              <ResetPasswordIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete User">
            <IconButton
              size="small"
              onClick={() => handleDeleteUser(user)}
              sx={{ color: '#ef4444' }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  if (loadingBusiness || (loading && users.length === 0)) {
    return <LoadingSpinner />;
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(`/admin/businesses/${tenantId}`)}
            sx={{ mr: 2 }}
          >
            Back to Business
          </Button>
          <Box>
            <Typography variant="h4">
              {business?.businessName} - Users
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {business?.industry} • {business?.contactEmail}
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddUserIcon />}
          onClick={
           // () => navigate(`/admin/business-users/create`, { state: { tenantId } })
        () => navigate(`/admin/businesses/${tenantId}/create-user`) 
        }
        >
          Add User
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" variant="body2" gutterBottom>
                Total Users
              </Typography>
              <Typography variant="h4">
                {users.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" variant="body2" gutterBottom>
                Active Users
              </Typography>
              <Typography variant="h4" color="success.main">
                {users.filter(u => u.status?.toUpperCase() === 'ACTIVE').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
     <Grid item xs={12} sm={6} md={3}>
  <Card>
    <CardContent>
      <Typography color="textSecondary" variant="body2" gutterBottom>
        Inactive Users
      </Typography>
      <Typography variant="h4" color="error.main">
        {users.filter(u => u.status?.toUpperCase() !== 'ACTIVE').length}
      </Typography>
    </CardContent>
  </Card>
</Grid>
        
      </Grid>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Users Table */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">
            User Accounts ({users.length})
          </Typography>
          <Button
            variant="outlined"
            startIcon={<AddUserIcon />}
            onClick={
                //() => navigate(`/admin/business-users/create`, { state: { tenantId } })
                 () => navigate(`/admin/businesses/${tenantId}/create-user`) 
            }
            
          >
            Add New User
          </Button>
        </Box>

        {users.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'action.hover',
                color: 'text.secondary',
                mx: 'auto',
                mb: 2,
              }}
            >
              <Person sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h6" gutterBottom>
              No Users Found
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              This business doesn't have any users yet.
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddUserIcon />}
            //   onClick={
            //     () => navigate(`/admin/business-users/create`, { state: { tenantId } })
             onClick={() =>
    navigate(`/admin/businesses/${tenantId}/create-user`)
            }
            >
              Create First User
            </Button>
          </Box>
        ) : (
          <DataTable
            columns={columns}
            data={users}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 25]}
          />
        )}
      </Paper>

      {/* Delete User Dialog */}
      <Dialog open={!!deleteDialog} onClose={() => setDeleteDialog(null)}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          Are you sure you want to delete user "{deleteDialog?.fullName || deleteDialog?.email}"?
          This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(null)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={!!resetPasswordDialog} onClose={() => setResetPasswordDialog(null)}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          Reset password for user "{resetPasswordDialog?.fullName || resetPasswordDialog?.email}"?
          A password reset link will be sent to their email.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResetPasswordDialog(null)}>Cancel</Button>
          <Button onClick={handleResetPasswordConfirm} color="primary">
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BusinessUsersPage;