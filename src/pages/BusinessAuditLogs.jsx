import React, { useState, useEffect, useRef } from 'react';
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
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  FilterList as FilterIcon,
  Event as EventIcon,
  Code as CodeIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import DataTable from '../components/common/DataTable';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { auditLogService } from '../services/auditLog';
import { useAuth } from '../context/AuthContext'; // adjust to your auth context

const BusinessAuditLogs = () => {
  const { user } = useAuth();
  const tenantId = user?.tenantId; // or user.businessId – depends on your auth object

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState({ actions: [], targetTypes: [] });

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [totalRows, setTotalRows] = useState(0);

  // Filters (no adminId)
  const [filters, setFilters] = useState({
    action: '',
    targetType: '',
    startDate: null,
    endDate: null,
  });
  const [activeFilters, setActiveFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  // Change dialog
  const [changeDialog, setChangeDialog] = useState({ open: false, title: '', data: null });

  // Snackbar
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    if (tenantId) {
      fetchLogs();
    }
  }, [page, rowsPerPage, activeFilters, tenantId]);

//   const fetchFilterOptions = async () => {
//     try {
//       // Optionally pass tenantId if the backend supports scoped filter options
//       const res = await auditLogService.getFilters();
//       setFilterOptions(res);
//     } catch (error) {
//       console.error('Error fetching filter options:', error);
//       showSnackbar('Failed to load filter options', 'error');
//     }
//   };

const fetchFilterOptions = async () => {
  try {
    const res = await auditLogService.getFilters({ contextId: tenantId });
    setFilterOptions(res);
  } catch (error) {
    console.error('Error fetching filter options:', error);
  }
};

  const fetchLogs = async () => {
    if (!tenantId) return;
    setLoading(true);
    try {
      const params = {
        page: page + 1,
        limit: rowsPerPage,
        contextId: tenantId, // filter by business ID
        ...activeFilters,
      };
      if (activeFilters.startDate && activeFilters.startDate instanceof Date && !isNaN(activeFilters.startDate)) {
        params.startDate = activeFilters.startDate.toISOString();
      }
      if (activeFilters.endDate && activeFilters.endDate instanceof Date && !isNaN(activeFilters.endDate)) {
        params.endDate = activeFilters.endDate.toISOString();
      }

      const res = await auditLogService.getLogs(params);
      setLogs(res.data);
      setTotalRows(res.total);
    } catch (error) {
      console.error('Error fetching logs:', error);
      showSnackbar('Failed to fetch audit logs', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleApplyFilters = () => {
    const applied = {};
    if (filters.action) applied.action = filters.action;
    if (filters.targetType) applied.targetType = filters.targetType;
    if (filters.startDate) applied.startDate = filters.startDate;
    if (filters.endDate) applied.endDate = filters.endDate;

    setActiveFilters(applied);
    setPage(0);
  };

  const handleClearFilters = () => {
    setFilters({
      action: '',
      targetType: '',
      startDate: null,
      endDate: null,
    });
    setActiveFilters({});
    setPage(0);
  };

  const handleRemoveFilter = (key) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
    setFilters((prev) => ({ ...prev, [key]: '' }));
    setPage(0);
  };

  const formatDate = (date) => {
    if (!date) return '—';
    try {
      return format(new Date(date), 'dd/MM/yyyy HH:mm:ss');
    } catch {
      return '—';
    }
  };

  const handleViewChanges = (title, data) => {
    setChangeDialog({ open: true, title, data });
  };

  // Table columns (same as admin, but we may keep actor as is)
  const columns = [
    {
      field: 'timestamp',
      headerName: 'Timestamp',
      width: 160,
      render: (value) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EventIcon sx={{ fontSize: 16, color: '#3b82f6' }} />
          <Typography variant="body2" sx={{ fontWeight: 500, color: '#1e293b' }}>
            {formatDate(value)}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'actor',
      headerName: 'Actor',
      width: 200,
      render: (value) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 28, height: 28, bgcolor: '#3b82f6', fontSize: '0.8rem' }}>
            {value?.email?.charAt(0).toUpperCase() || 'A'}
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>
              {value?.email || 'N/A'}
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b', fontFamily: 'monospace' }}>
              {value?.admin_id || ''}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 140,
      render: (value) => (
        <Chip
          label={value}
          size="small"
          sx={{
            backgroundColor: '#e0f2fe',
            color: '#0369a1',
            fontWeight: 600,
            fontSize: '0.7rem',
            borderRadius: '16px',
            border: '1px solid #bae6fd',
          }}
        />
      ),
    },
    {
      field: 'target.type',
      headerName: 'Target Type',
      width: 120,
      render: (val, row) => row.target?.type || '—',
    },
    {
      field: 'target.id',
      headerName: 'Target ID',
      width: 200,
      render: (val, row) => (
        <Tooltip title={row.target?.id}>
          <Typography
            sx={{
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              backgroundColor: '#f1f5f9',
              padding: '2px 6px',
              borderRadius: '4px',
              display: 'inline-block',
            }}
          >
            {row.target?.id?.substring(0, 16)}...
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'reason',
      headerName: 'Reason',
      width: 200,
      render: (value) => value || '—',
    },
    {
      field: 'changes',
      headerName: 'Changes',
      width: 160,
      render: (value, row) => {
        if (!value || (!value.before && !value.after)) return '—';
        return (
          <Stack direction="row" spacing={0.5}>
            {value.before && (
              <Tooltip title="View before state">
                <Chip
                  label="Before"
                  size="small"
                  onClick={() => handleViewChanges('Before State', value.before)}
                  icon={<ViewIcon fontSize="small" />}
                  sx={{
                    backgroundColor: '#f1f5f9',
                    color: '#334155',
                    fontWeight: 500,
                    border: '1px solid #cbd5e1',
                    '&:hover': {
                      backgroundColor: '#e2e8f0',
                      borderColor: '#94a3b8',
                    },
                  }}
                />
              </Tooltip>
            )}
            {value.after && (
              <Tooltip title="View after state">
                <Chip
                  label="After"
                  size="small"
                  onClick={() => handleViewChanges('After State', value.after)}
                  icon={<CodeIcon fontSize="small" />}
                  sx={{
                    backgroundColor: '#dbeafe',
                    color: '#1e40af',
                    fontWeight: 500,
                    border: '1px solid #bfdbfe',
                    '&:hover': {
                      backgroundColor: '#bfdbfe',
                      borderColor: '#3b82f6',
                    },
                  }}
                />
              </Tooltip>
            )}
          </Stack>
        );
      },
    },
    {
      field: 'metadata',
      headerName: 'Metadata',
      width: 120,
      render: (value) => {
        if (!value || Object.keys(value).length === 0) return '—';
        return (
          <Tooltip title={JSON.stringify(value, null, 2)}>
            <Chip
              label="Meta"
              size="small"
              sx={{
                backgroundColor: '#f1f5f9',
                color: '#475569',
                border: '1px solid #cbd5e1',
                cursor: 'pointer',
                '&:hover': { backgroundColor: '#e2e8f0' },
              }}
            />
          </Tooltip>
        );
      },
    },
  ];

  // Build filter chips from activeFilters (no adminId chip)
  const filterChips = [];
  if (activeFilters.action) filterChips.push({ key: 'action', label: `Action: ${activeFilters.action}` });
  if (activeFilters.targetType) filterChips.push({ key: 'targetType', label: `Target: ${activeFilters.targetType}` });
  if (activeFilters.startDate) {
    try {
      filterChips.push({ key: 'startDate', label: `From: ${format(activeFilters.startDate, 'dd/MM/yyyy')}` });
    } catch {
      // ignore
    }
  }
  if (activeFilters.endDate) {
    try {
      filterChips.push({ key: 'endDate', label: `To: ${format(activeFilters.endDate, 'dd/MM/yyyy')}` });
    } catch {
      // ignore
    }
  }

  if (loading && page === 0 && logs.length === 0) return <LoadingSpinner />;

  return (
    <Box
      sx={{
        minHeight: '100%',
        background: 'linear-gradient(135deg, #f8fbff 0%, #eef5ff 45%, #e6f0ff 100%)',
        p: 3,
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(90deg, #1e3a8a, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
            letterSpacing: '-0.02em',
          }}
        >
          Business Audit Logs
        </Typography>
        <Typography variant="body1" sx={{ color: '#475569', fontWeight: 400 }}>
          View all actions and changes related to your business
        </Typography>
      </Box>

      {/* Main Paper */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          border: '1px solid rgba(59,130,246,0.15)',
          background: 'linear-gradient(180deg, #ffffff, #fafdff)',
          boxShadow: '0 20px 35px -10px rgba(59,130,246,0.15)',
          overflow: 'hidden',
        }}
      >
        {/* Filter Row */}
        <Box sx={{ p: 3, pb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={7}>
              {/* No search bar – only filters */}
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                  Filters:
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => setShowFilters(!showFilters)}
                  startIcon={<FilterIcon />}
                  size="small"
                  sx={{
                    borderColor: '#cbd5e1',
                    color: '#334155',
                    borderRadius: 2,
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: '#3b82f6',
                      backgroundColor: '#eff6ff',
                    },
                  }}
                >
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* Advanced Filters (no adminId) */}
          {showFilters && (
            <Box sx={{ mt: 3, p: 2.5, bgcolor: '#f8fafc', borderRadius: 3, border: '1px solid #e2e8f0' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Action</InputLabel>
                    <Select
                      value={filters.action}
                      label="Action"
                      onChange={(e) => setFilters({ ...filters, action: e.target.value })}
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="">All</MenuItem>
                      {filterOptions.actions.map((a) => (
                        <MenuItem key={a} value={a}>
                          {a}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Target Type</InputLabel>
                    <Select
                      value={filters.targetType}
                      label="Target Type"
                      onChange={(e) => setFilters({ ...filters, targetType: e.target.value })}
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="">All</MenuItem>
                      {filterOptions.targetTypes.map((t) => (
                        <MenuItem key={t} value={t}>
                          {t}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Start Date"
                      value={filters.startDate}
                      onChange={(date) => setFilters({ ...filters, startDate: date })}
                      renderInput={(params) => (
                        <TextField {...params} size="small" fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="End Date"
                      value={filters.endDate}
                      onChange={(date) => setFilters({ ...filters, endDate: date })}
                      renderInput={(params) => (
                        <TextField {...params} size="small" fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={3} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Button
                    variant="contained"
                    onClick={handleApplyFilters}
                    size="small"
                    sx={{
                      background: '#3b82f6',
                      borderRadius: 2,
                      textTransform: 'none',
                      boxShadow: 'none',
                      '&:hover': { background: '#2563eb' },
                    }}
                  >
                    Apply
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleClearFilters}
                    size="small"
                    sx={{
                      borderColor: '#cbd5e1',
                      color: '#475569',
                      borderRadius: 2,
                      textTransform: 'none',
                      '&:hover': { borderColor: '#94a3b8', backgroundColor: '#f1f5f9' },
                    }}
                  >
                    Clear
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Active Filter Chips */}
          {filterChips.length > 0 && (
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {filterChips.map((chip) => (
                <Chip
                  key={chip.key}
                  label={chip.label}
                  size="small"
                  onDelete={() => handleRemoveFilter(chip.key)}
                  deleteIcon={<ClearIcon sx={{ color: '#3b82f6 !important' }} />}
                  sx={{
                    backgroundColor: '#dbeafe',
                    color: '#1e40af',
                    fontWeight: 600,
                    borderRadius: '16px',
                    border: '1px solid #bfdbfe',
                    '& .MuiChip-deleteIcon': {
                      color: '#3b82f6',
                      '&:hover': { color: '#1e3a8a' },
                    },
                  }}
                />
              ))}
            </Box>
          )}
        </Box>

        {/* Data Table */}
        <Box sx={{ px: 3, pb: 3 }}>
          <DataTable
            columns={columns}
            data={logs}
            page={page}
            rowsPerPage={rowsPerPage}
            totalRows={totalRows}
            onPageChange={setPage}
            onRowsPerPageChange={(newRowsPerPage) => {
              setRowsPerPage(newRowsPerPage);
              setPage(0);
            }}
            loading={loading}
            sx={{
              '& .MuiTableHead-root .MuiTableCell-head': {
                background: 'linear-gradient(90deg, #414546ff)',
                fontWeight: 700,
                color: '#ffffff',
                borderBottom: '2px solid #000',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                letterSpacing: '0.05em',
                display: 'flex-column',
                alignItems: 'center',
                justifyContent: 'center',
              },
            }}
          />
        </Box>
      </Paper>

      {/* Change Dialog */}
      <Dialog
        open={changeDialog.open}
        onClose={() => setChangeDialog({ open: false, title: '', data: null })}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          },
        }}
      >
        <DialogTitle sx={{ 
          bgcolor: '#f8fafc', 
          fontWeight: 700, 
          color: '#0f172a',
          borderBottom: '1px solid #e2e8f0',
        }}>
          {changeDialog.title}
        </DialogTitle>
        <DialogContent dividers sx={{ bgcolor: '#f1f5f9', p: 3 }}>
          <Box
            sx={{
              backgroundColor: '#0f172a',
              color: '#e2e8f0',
              p: 2,
              borderRadius: 2,
              fontFamily: '"Fira Code", "Consolas", monospace',
              fontSize: '0.85rem',
              overflow: 'auto',
              maxHeight: '500px',
            }}
          >
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {JSON.stringify(changeDialog.data, null, 2)}
            </pre>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, bgcolor: '#f8fafc' }}>
          <Button
            onClick={() => setChangeDialog({ open: false, title: '', data: null })}
            variant="contained"
            sx={{
              background: '#3b82f6',
              borderRadius: 2,
              textTransform: 'none',
              '&:hover': { background: '#2563eb' },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          sx={{
            width: '100%',
            borderRadius: 2,
            fontWeight: 500,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BusinessAuditLogs;