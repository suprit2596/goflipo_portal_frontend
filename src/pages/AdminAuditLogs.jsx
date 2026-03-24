import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box, Typography, Button, TextField, Grid, Chip, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, Paper,
  Tooltip, Avatar, Stack, MenuItem, FormControl, InputLabel,
  Select, Alert, Snackbar, InputAdornment, Collapse, Badge,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  FilterList as FilterIcon,
  Event as EventIcon,
  Code as CodeIcon,
  Visibility as ViewIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
  KeyboardArrowDown as ArrowDownIcon,
  KeyboardArrowUp as ArrowUpIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import DataTable from '../components/common/DataTable';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { auditLogService } from '../services/auditLog';
import { useLocation } from 'react-router-dom';

// ─── Debounce hook ────────────────────────────────────────────────────────────
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
// Shorten any id to its last 8 chars for compact display
const shortId = (id) => (id ? `…${String(id).slice(-8)}` : null);

// Sentinel set in auditLogService — tells the UI this is an auth event row
const AUTH_EVENT_MARKER = 'auth-event@acs';

// ─── Action colour map ────────────────────────────────────────────────────────
const ACTION_COLORS = {
  CREATE:   { bg: '#dcfce7', color: '#166534', border: '#bbf7d0' },
  UPDATE:   { bg: '#dbeafe', color: '#1e40af', border: '#bfdbfe' },
  DELETE:   { bg: '#fee2e2', color: '#991b1b', border: '#fecaca' },
  LOGIN:    { bg: '#fef9c3', color: '#854d0e', border: '#fde68a' },
  LOGOUT:   { bg: '#f3f4f6', color: '#374151', border: '#d1d5db' },
  PAYMENT:  { bg: '#ede9fe', color: '#5b21b6', border: '#ddd6fe' },
  BLOCK:    { bg: '#fee2e2', color: '#991b1b', border: '#fecaca' },
  UNBLOCK:  { bg: '#dcfce7', color: '#166534', border: '#bbf7d0' },
  DEFAULT:  { bg: '#f3f4f6', color: '#374151', border: '#d1d5db' },
};
const actionStyle = (action = '') => {
  const key = Object.keys(ACTION_COLORS).find(k => action.toUpperCase().includes(k));
  return ACTION_COLORS[key] || ACTION_COLORS.DEFAULT;
};

// ─── Auth method chip styles ──────────────────────────────────────────────────
const METHOD_STYLES = {
  IN_APP: { bg: '#ede9fe', color: '#5b21b6', border: '#ddd6fe' },
  TOTP:   { bg: '#fff7ed', color: '#9a3412', border: '#fed7aa' },
};

// ─── Component ────────────────────────────────────────────────────────────────
const AdminAuditLogs = () => {
  const location = useLocation();
  const isBusinessView = location.pathname.includes('/business');

  const [logs, setLogs]                   = useState([]);
  const [loading, setLoading]             = useState(true);
  const [filterOptions, setFilterOptions] = useState({ actions: [], targetTypes: [] });

  const [page, setPage]               = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [totalRows, setTotalRows]     = useState(0);

  const [filters, setFilters] = useState({
    action:       '',
    targetType:   '',
    adminId:      '',
    businessId:   '',
    subscriberId: '',
    startDate:    null,
    endDate:      null,
  });

  const [showFilters,   setShowFilters]   = useState(false);
  const [changeDialog,  setChangeDialog]  = useState({ open: false, title: '', data: null });
  const [snackbar,      setSnackbar]      = useState({ open: false, message: '', severity: 'success' });

  const debouncedAdminId      = useDebounce(filters.adminId,      500);
  const debouncedBusinessId   = useDebounce(filters.businessId,   500);
  const debouncedSubscriberId = useDebounce(filters.subscriberId, 500);

  useEffect(() => { fetchFilterOptions(); }, []);

  useEffect(() => {
    fetchLogs();
  }, [
    page, rowsPerPage,
    filters.action, filters.targetType, filters.startDate, filters.endDate,
    debouncedAdminId, debouncedBusinessId, debouncedSubscriberId,
  ]);

  const fetchFilterOptions = async () => {
    try {
      const res = await auditLogService.getFilters();
      setFilterOptions(res);
    } catch {
      showSnackbar('Failed to load filter options', 'error');
    }
  };

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = {
        page:  page + 1,
        limit: rowsPerPage,
        ...(filters.action        && { action:       filters.action }),
        ...(filters.targetType    && { targetType:   filters.targetType }),
        ...(debouncedAdminId      && { adminId:      debouncedAdminId }),
        ...(debouncedBusinessId   && { contextId:    debouncedBusinessId }),
        ...(debouncedSubscriberId && { subscriberId: debouncedSubscriberId }),
      };
      if (filters.startDate instanceof Date && !isNaN(filters.startDate))
        params.startDate = filters.startDate.toISOString();
      if (filters.endDate instanceof Date && !isNaN(filters.endDate))
        params.endDate = filters.endDate.toISOString();

      const res     = await auditLogService.getLogs(params);
      const payload = res?.success !== undefined ? res : res?.data;
      setLogs(payload?.data ?? []);
      setTotalRows(payload?.total ?? 0);
    } catch {
      showSnackbar('Failed to fetch audit logs', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (msg, severity = 'success') =>
    setSnackbar({ open: true, message: msg, severity });

  const setFilter = (key, val) => {
    setFilters(prev => ({ ...prev, [key]: val }));
    setPage(0);
  };

  const clearAll = () => {
    setFilters({ action: '', targetType: '', adminId: '', businessId: '', subscriberId: '', startDate: null, endDate: null });
    setPage(0);
  };

  const formatDate = (date) => {
    if (!date) return '—';
    try { return format(new Date(date), 'dd/MM/yy HH:mm'); } catch { return '—'; }
  };

  const activeChips = [
    filters.action        && { key: 'action',       label: `Action: ${filters.action}` },
    filters.targetType    && { key: 'targetType',    label: `Type: ${filters.targetType}` },
    filters.adminId       && { key: 'adminId',       label: `Admin: ${filters.adminId}` },
    filters.businessId    && { key: 'businessId',    label: `Business: ${filters.businessId}` },
    filters.subscriberId  && { key: 'subscriberId',  label: `Subscriber: ${filters.subscriberId}` },
    filters.startDate     && { key: 'startDate',     label: `From: ${format(filters.startDate, 'dd/MM/yy')}` },
    filters.endDate       && { key: 'endDate',       label: `To: ${format(filters.endDate, 'dd/MM/yy')}` },
  ].filter(Boolean);

  // ─── Columns ───────────────────────────────────────────────────────────────
  const columns = [
    // ── Timestamp ────────────────────────────────────────────────────────────
    {
      field: 'timestamp',
      headerName: 'Time',
      width: 130,
      render: (v) => (
        <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#374151', whiteSpace: 'nowrap' }}>
          {formatDate(v)}
        </Typography>
      ),
    },

    // ── Actor ─────────────────────────────────────────────────────────────────
    // Auth event rows  → show metadata.userId (external JWT id) in full
    // Admin portal rows → show real admin email + shortened admin_id
  // Actor column — add source chip below email/id
{
  field: 'actor',
  headerName: 'Actor',
  width: 120,
  render: (v, row) => {
    if (!row.source) return <Typography variant="caption" color="text.disabled">—</Typography>;

    const SOURCE_COLORS = {
      ADMIN_PORTAL: '#1e40af',
      BUSINESS:     '#166534',
      USER:         '#5b21b6',
      SYSTEM:       '#374151',
    };

    return (
      <Typography variant="caption" sx={{
        fontWeight: 700,
        fontSize: '0.72rem',
        color: SOURCE_COLORS[row.source] || '#374151',
      }}>
        {row.source}
      </Typography>
    );
  },
},
{
  field: 'actor_id',        // dummy field to avoid conflicts
  headerName: 'Actor ID',
  width: 130,
  render: (_, row) => {
    let id = null;

    if (row.source === 'USER') {
      id = row.metadata?.userId;
    } else if (row.source === 'BUSINESS') {
      id = row.target?.context_id || row.actor?.admin_id;
    } else if (row.source === 'ADMIN_PORTAL') {
      id = row.actor?.admin_id ? String(row.actor.admin_id) : null;
    }

    if (!id) return <Typography variant="caption" color="text.disabled">—</Typography>;

    return (
      <Tooltip title={String(id)} arrow>
        <Box
          onClick={() => navigator.clipboard.writeText(String(id))}
          sx={{
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            px: 0.75, py: 0.25,
            borderRadius: '5px',
            bgcolor: '#f8fafc',
            border: '1px solid #e2e8f0',
            '&:hover': { bgcolor: '#e2e8f0' },
          }}
        >
          <Typography variant="caption" sx={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#475569' }}>
            {String(id)}
          </Typography>
        </Box>
      </Tooltip>
    );
  },
},
    // ── Action ───────────────────────────────────────────────────────────────
    {
      field: 'action',
      headerName: 'Action',
      width: 155,
      render: (v) => {
        const s = actionStyle(v);
        return (
          <Chip label={v} size="small" sx={{
            backgroundColor: s.bg, color: s.color, border: `1px solid ${s.border}`,
            fontWeight: 700, fontSize: '0.65rem', height: 20, borderRadius: '6px',
          }} />
        );
      },
    },

    // ── Auth Method + Event Type ──────────────────────────────────────────────
    // Only meaningful for auth rows; shows "—" for admin-portal rows.
  {
  field: 'method',
  headerName: 'Method',
  width: 140,
  render: (_, row) => {          // ← use `row` instead of `v`
    const method = row.metadata?.authMethod;   // ← read from metadata

    if (!method) {
      return <Typography variant="caption" color="text.disabled">—</Typography>;
    }

    const ms = METHOD_STYLES[method] || METHOD_STYLES.TOTP;

    return (
      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', alignItems: 'center' }}>
        <Chip label={method} size="small" sx={{
          height: 18, fontSize: '0.6rem', fontWeight: 700,
          bgcolor: ms.bg, color: ms.color, border: `1px solid ${ms.border}`, borderRadius: '5px',
        }} />
      </Box>
    );
  },
},

    // ── Target ───────────────────────────────────────────────────────────────
    {
      field: 'target',
      headerName: 'Target',
      width: 160,
      render: (v) => (
        <Box>
          <Typography variant="caption" sx={{ fontWeight: 600, color: '#374151', display: 'block' }}>
            {v?.type || '—'}
          </Typography>
          {v?.id && (
            <Tooltip title={v.id}>
              <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#9ca3af', fontSize: '0.65rem' }}>
                {v.id}
              </Typography>
            </Tooltip>
          )}
          {v?.context_id && (
            <Tooltip title={`Business: ${v.context_id}`}>
              <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#c4b5fd', fontSize: '0.6rem', display: 'block' }}>
                biz {v.context_id}
              </Typography>
            </Tooltip>
          )}
        </Box>
      ),
    },

    // ── Reason ───────────────────────────────────────────────────────────────
    {
      field: 'reason',
      headerName: 'Reason',
      width: 180,
      render: (v) => (
        <Typography variant="caption" sx={{ color: '#6b7280' }}>
          {v || '—'}
        </Typography>
      ),
    },

    // ── Changes ──────────────────────────────────────────────────────────────
    {
      field: 'changes',
      headerName: 'Changes',
      width: 130,
      render: (v) => {
        if (!v || Object.keys(v).length === 0)
          return <Typography variant="caption" color="text.disabled">—</Typography>;

        // Auth events store flat data (no before/after shape)
        if (!v.before && !v.after) {
          return (
            <Chip
              label="Details"
              size="small"
              onClick={() => setChangeDialog({ open: true, title: 'Event Data', data: v })}
              icon={<ViewIcon sx={{ fontSize: '12px !important' }} />}
              sx={{
                height: 20, fontSize: '0.65rem',
                bgcolor: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db',
                cursor: 'pointer', '&:hover': { bgcolor: '#e5e7eb' },
              }}
            />
          );
        }

        return (
          <Stack direction="row" spacing={0.5}>
            {v.before && (
              <Chip label="Before" size="small"
                onClick={() => setChangeDialog({ open: true, title: 'Before State', data: v.before })}
                icon={<ViewIcon sx={{ fontSize: '12px !important' }} />}
                sx={{ height: 20, fontSize: '0.65rem', bgcolor: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db', cursor: 'pointer', '&:hover': { bgcolor: '#e5e7eb' } }} />
            )}
            {v.after && (
              <Chip label="After" size="small"
                onClick={() => setChangeDialog({ open: true, title: 'After State', data: v.after })}
                icon={<CodeIcon sx={{ fontSize: '12px !important' }} />}
                sx={{ height: 20, fontSize: '0.65rem', bgcolor: '#dbeafe', color: '#1e40af', border: '1px solid #bfdbfe', cursor: 'pointer', '&:hover': { bgcolor: '#bfdbfe' } }} />
            )}
          </Stack>
        );
      },
    },

    // ── Metadata tooltip ──────────────────────────────────────────────────────
    {
      field: 'metadata',
      headerName: 'Meta',
      width: 70,
      render: (v) => {
        if (!v || Object.keys(v).length === 0)
          return <Typography variant="caption" color="text.disabled">—</Typography>;
        return (
          <Tooltip title={<pre style={{ margin: 0, fontSize: 11 }}>{JSON.stringify(v, null, 2)}</pre>} arrow>
            <Chip label="···" size="small" sx={{
              height: 20, fontSize: '0.7rem',
              bgcolor: '#f3f4f6', color: '#6b7280', cursor: 'default', border: '1px solid #e5e7eb',
            }} />
          </Tooltip>
        );
      },
    },
  ];

  if (loading && page === 0 && logs.length === 0) return <LoadingSpinner />;

  return (
    <Box sx={{
      height: 'calc(100vh - 64px)',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: '#f9fafb',
      pt: 2, px: 2, pb: 2,
      gap: 1.5,
      overflow: 'hidden',
      boxSizing: 'border-box',
    }}>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{
          width: 34, height: 34, borderRadius: '10px',
          background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          {isBusinessView
            ? <BusinessIcon sx={{ color: '#fff', fontSize: 18 }} />
            : <AdminIcon    sx={{ color: '#fff', fontSize: 18 }} />
          }
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827', lineHeight: 1.2 }}>
            {isBusinessView ? 'Business Audit Logs' : 'Admin Audit Logs'}
          </Typography>
          <Typography variant="caption" sx={{ color: '#9ca3af' }}>
            {totalRows.toLocaleString()} records
            {activeChips.length > 0 ? ` · ${activeChips.length} filter${activeChips.length > 1 ? 's' : ''} active` : ''}
          </Typography>
        </Box>
        <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
          <Badge badgeContent={activeChips.length} color="primary" invisible={activeChips.length === 0}>
            <Button
              size="small"
              variant={showFilters ? 'contained' : 'outlined'}
              startIcon={<FilterIcon />}
              endIcon={showFilters ? <ArrowUpIcon /> : <ArrowDownIcon />}
              onClick={() => setShowFilters(v => !v)}
              sx={{
                textTransform: 'none', fontWeight: 600, borderRadius: '8px', fontSize: '0.8rem',
                ...(showFilters
                  ? { background: '#1e40af', color: '#fff', '&:hover': { background: '#1d4ed8' } }
                  : { borderColor: '#d1d5db', color: '#374151', '&:hover': { borderColor: '#9ca3af', bgcolor: '#f3f4f6' } }
                ),
              }}
            >
              Filters
            </Button>
          </Badge>
          {activeChips.length > 0 && (
            <Button size="small" onClick={clearAll} startIcon={<ClearIcon />}
              sx={{ textTransform: 'none', color: '#ef4444', fontWeight: 600, fontSize: '0.8rem', borderRadius: '8px', '&:hover': { bgcolor: '#fef2f2' } }}>
              Clear all
            </Button>
          )}
        </Box>
      </Box>

      {/* ── Filter Panel ───────────────────────────────────────────────────── */}
      <Collapse in={showFilters}>
        <Paper elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: '12px', p: 2, bgcolor: '#fff' }}>
          <Grid container spacing={1.5} alignItems="flex-end">

            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel shrink sx={{ fontSize: '0.8rem', overflow: 'visible', whiteSpace: 'nowrap' }}>Action</InputLabel>
                <Select notched value={filters.action} label="Action"
                  onChange={e => setFilter('action', e.target.value)}
                  sx={{ borderRadius: '8px', fontSize: '0.8rem', '& .MuiOutlinedInput-notchedOutline legend span': { fontSize: '0.6rem' } }}>
                  <MenuItem value=""><em>All</em></MenuItem>
                  {filterOptions.actions.map(a => <MenuItem key={a} value={a} sx={{ fontSize: '0.8rem' }}>{a}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel shrink sx={{ fontSize: '0.8rem', overflow: 'visible', whiteSpace: 'nowrap' }}>Target Type</InputLabel>
                <Select notched value={filters.targetType} label="Target Type"
                  onChange={e => setFilter('targetType', e.target.value)}
                  sx={{ borderRadius: '8px', fontSize: '0.8rem', '& .MuiOutlinedInput-notchedOutline legend span': { fontSize: '0.6rem' } }}>
                  <MenuItem value=""><em>All</em></MenuItem>
                  {filterOptions.targetTypes.map(t => <MenuItem key={t} value={t} sx={{ fontSize: '0.8rem' }}>{t}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>

            {!isBusinessView && (
              <Grid item xs={6} sm={4} md={2}>
                <TextField fullWidth size="small" label="Admin ID" value={filters.adminId}
                  onChange={e => setFilter('adminId', e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><AdminIcon sx={{ fontSize: 15, color: '#9ca3af' }} /></InputAdornment>,
                    endAdornment: filters.adminId && (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setFilter('adminId', '')}><ClearIcon sx={{ fontSize: 14 }} /></IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', fontSize: '0.8rem' }, '& label': { fontSize: '0.8rem' } }}
                />
              </Grid>
            )}

            {!isBusinessView && (
              <Grid item xs={6} sm={4} md={2}>
                <TextField fullWidth size="small" label="Business ID" value={filters.businessId}
                  onChange={e => setFilter('businessId', e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><BusinessIcon sx={{ fontSize: 15, color: '#9ca3af' }} /></InputAdornment>,
                    endAdornment: filters.businessId && (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setFilter('businessId', '')}><ClearIcon sx={{ fontSize: 14 }} /></IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', fontSize: '0.8rem' }, '& label': { fontSize: '0.8rem' } }}
                />
              </Grid>
            )}

            {!isBusinessView && (
              <Grid item xs={6} sm={4} md={2}>
                <TextField fullWidth size="small" label="Subscriber ID" value={filters.subscriberId}
                  onChange={e => setFilter('subscriberId', e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><PersonIcon sx={{ fontSize: 15, color: '#9ca3af' }} /></InputAdornment>,
                    endAdornment: filters.subscriberId && (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setFilter('subscriberId', '')}><ClearIcon sx={{ fontSize: 14 }} /></IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', fontSize: '0.8rem' }, '& label': { fontSize: '0.8rem' } }}
                />
              </Grid>
            )}

            <Grid item xs={6} sm={4} md={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker label="From" value={filters.startDate}
                  onChange={d => setFilter('startDate', d)}
                  slotProps={{ textField: { size: 'small', fullWidth: true, sx: { '& .MuiOutlinedInput-root': { borderRadius: '8px', fontSize: '0.8rem' }, '& label': { fontSize: '0.8rem' } } } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker label="To" value={filters.endDate}
                  onChange={d => setFilter('endDate', d)}
                  slotProps={{ textField: { size: 'small', fullWidth: true, sx: { '& .MuiOutlinedInput-root': { borderRadius: '8px', fontSize: '0.8rem' }, '& label': { fontSize: '0.8rem' } } } }}
                />
              </LocalizationProvider>
            </Grid>

          </Grid>

          {activeChips.length > 0 && (
            <Box sx={{ mt: 1.5, display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
              {activeChips.map(chip => (
                <Chip key={chip.key} label={chip.label} size="small"
                  onDelete={() => setFilter(chip.key, chip.key.includes('Date') ? null : '')}
                  sx={{
                    height: 22, fontSize: '0.7rem', fontWeight: 600,
                    bgcolor: '#eff6ff', color: '#1e40af', border: '1px solid #bfdbfe',
                    '& .MuiChip-deleteIcon': { fontSize: 14, color: '#3b82f6', '&:hover': { color: '#1e40af' } },
                  }}
                />
              ))}
            </Box>
          )}
        </Paper>
      </Collapse>

      {/* ── Table ─────────────────────────────────────────────────────────── */}
      <Paper elevation={0} sx={{
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        '& .MuiTableContainer-root': { flex: 1, minHeight: 0, overflow: 'auto' },
        '& .MuiTablePagination-root': { flexShrink: 0, borderTop: '1px solid #f3f4f6' },
      }}>
        <DataTable
          columns={columns}
          data={logs}
          page={page}
          rowsPerPage={rowsPerPage}
          totalRows={totalRows}
          onPageChange={setPage}
          onRowsPerPageChange={(n) => { setRowsPerPage(n); setPage(0); }}
          loading={loading}
          sx={{
            flex: 1,
            '& .MuiTableHead-root .MuiTableCell-head': {
              bgcolor: '#f9fafb', fontWeight: 700, color: '#374151',
              fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em',
              borderBottom: '2px solid #e5e7eb', py: 1, whiteSpace: 'nowrap',
            },
            '& .MuiTableBody-root .MuiTableRow-root': {
              '&:hover': { bgcolor: '#f0f9ff' },
              transition: 'background 0.15s',
            },
            '& .MuiTableBody-root .MuiTableCell-root': {
              py: 0.75, borderBottom: '1px solid #f3f4f6', fontSize: '0.8rem',
            },
          }}
        />
      </Paper>

      {/* ── Change / Detail Dialog ─────────────────────────────────────────── */}
      <Dialog open={changeDialog.open} onClose={() => setChangeDialog({ open: false, title: '', data: null })}
        maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: '12px' } }}>
        <DialogTitle sx={{ bgcolor: '#f9fafb', fontWeight: 700, color: '#111827', borderBottom: '1px solid #e5e7eb', py: 1.5, fontSize: '0.95rem' }}>
          {changeDialog.title}
        </DialogTitle>
        <DialogContent sx={{ p: 2, bgcolor: '#f1f5f9' }}>
          <Box sx={{ bgcolor: '#0f172a', color: '#e2e8f0', p: 2, borderRadius: '8px', fontFamily: '"Fira Code","Consolas",monospace', fontSize: '0.8rem', overflow: 'auto', maxHeight: 420 }}>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {JSON.stringify(changeDialog.data, null, 2)}
            </pre>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 1.5, bgcolor: '#f9fafb' }}>
          <Button size="small" variant="contained" onClick={() => setChangeDialog({ open: false, title: '', data: null })}
            sx={{ background: '#1e40af', borderRadius: '8px', textTransform: 'none', '&:hover': { background: '#1d4ed8' } }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Snackbar ──────────────────────────────────────────────────────── */}
      <Snackbar open={snackbar.open} autoHideDuration={4000}
        onClose={() => setSnackbar(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert severity={snackbar.severity} variant="filled" sx={{ borderRadius: '8px', fontWeight: 500 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminAuditLogs;
