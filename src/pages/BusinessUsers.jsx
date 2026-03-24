import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Paper, TextField, Chip, IconButton, Tooltip
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Search as SearchIcon } from '@mui/icons-material';
import DataTable from '../components/common/DataTable';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { adminService } from '../services/admin';

const BusinessUsersPage = () => {
  const { tenantId } = useParams(); // tenantId = businessId e.g. "SHOPHUB_6322..."
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage, search]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await adminService.getBusinessUsers(tenantId, page, rowsPerPage, search);
      setUsers(res.data || []);
      setTotal(res.pagination?.total || 0);
      setStats(res.stats || {});
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: 'srNo', headerName: '#' },
    { field: 'name', headerName: 'Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'mobile', headerName: 'Mobile' },
    { field: 'uniqueUserId', headerName: 'User ID' },
    {
      field: 'qrVerified',
      headerName: 'QR Verified',
      render: (value) => (
        <Chip
          label={value}
          size="small"
          color={value?.includes('Yes') ? 'success' : 'default'}
          variant="outlined"
        />
      ),
    },
    { field: 'createdAt', headerName: 'Created At' },
  ];

  return (
    <Box sx={{ minHeight: '100%', background: 'linear-gradient(135deg,#f8fbff,#eef5ff)', p: 3 }}>
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Tooltip title="Back to Businesses">
          <IconButton onClick={() => navigate('/admin/businesses')}>
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
        <Box>
          <Typography variant="h5" sx={{
            fontWeight: 700,
            background: 'linear-gradient(90deg,#1a365d,#3182ce)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Business Users
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            Merchant ID: {tenantId}
          </Typography>
        </Box>
      </Box>

      {/* Stats */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Paper elevation={0} sx={{
          px: 3, py: 1.5, borderRadius: 2,
          border: '1px solid #3182ce30', background: '#3182ce10'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#3182ce' }}>
            {stats.total ?? '—'}
          </Typography>
          <Typography variant="caption" sx={{ color: '#64748b' }}>Total Users</Typography>
        </Paper>
      </Box>

      <Paper elevation={0} sx={{
        borderRadius: 3, border: '1px solid rgba(49,130,206,0.2)',
        background: 'linear-gradient(180deg,#ffffff,#f9fbff)', p: 3
      }}>
        <TextField
          fullWidth
          placeholder="Search by name, email, or mobile..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0); }}
          InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1 }} /> }}
          sx={{ mb: 2 }}
        />

        <Box sx={{ position: 'relative' }}>
          {loading && (
            <Box sx={{
              position: 'absolute', inset: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255,0.7)', zIndex: 1, borderRadius: 1
            }}>
              <LoadingSpinner size={40} />
            </Box>
          )}
          <DataTable
            columns={columns}
            data={users}
            page={page}
            rowsPerPage={rowsPerPage}
            totalRows={total}
            onPageChange={setPage}
            onRowsPerPageChange={setRowsPerPage}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default BusinessUsersPage;