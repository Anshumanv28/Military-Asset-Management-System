import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext.tsx';
import FilterBar from '../components/FilterBar.tsx';

interface Transfer {
  id: string;
  transfer_number: string;
  asset_type_id: string;
  asset_type_name: string;
  from_base_id: string;
  from_base_name: string;
  to_base_id: string;
  to_base_name: string;
  quantity: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  transfer_date: string;
  approved_at?: string;
  notes?: string;
  created_by: string;
  created_at: string;
}

interface AssetType {
  id: string;
  name: string;
  category: string;
  unit_of_measure: string;
}

interface Base {
  id: string;
  name: string;
}

interface CreateTransferForm {
  asset_type_id: string;
  from_base_id: string;
  to_base_id: string;
  quantity: number;
  transfer_date: string;
  notes?: string;
}

const Transfers: React.FC = () => {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [assetTypes, setAssetTypes] = useState<AssetType[]>([]);
  const [bases, setBases] = useState<Base[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTransfer, setEditingTransfer] = useState<Transfer | null>(null);
  const [formData, setFormData] = useState<CreateTransferForm>({
    asset_type_id: '',
    from_base_id: '',
    to_base_id: '',
    quantity: 0,
    transfer_date: '',
    notes: '',
  });

  // Filters
  const [filters, setFilters] = useState({
    from_base_id: '',
    to_base_id: '',
    asset_type_id: '',
    status: '',
    start_date: '',
    end_date: '',
  });

  const { user } = useAuth();

  const fetchTransfers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', (page + 1).toString());
      params.append('limit', rowsPerPage.toString());
      
      if (filters.from_base_id) params.append('from_base_id', filters.from_base_id);
      if (filters.to_base_id) params.append('to_base_id', filters.to_base_id);
      if (filters.asset_type_id) params.append('asset_type_id', filters.asset_type_id);
      if (filters.status) params.append('status', filters.status);
      if (filters.start_date) params.append('start_date', filters.start_date);
      if (filters.end_date) params.append('end_date', filters.end_date);

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/transfers?${params}`);
      setTransfers(response.data.data);
      setTotal(response.data.pagination.total);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch transfers');
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, filters]);

  const fetchAssetTypes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/asset-types`);
      setAssetTypes(response.data.data);
    } catch (err) {
      console.error('Failed to fetch asset types');
    }
  };

  const fetchBases = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/bases`);
      setBases(response.data.data);
    } catch (err) {
      console.error('Failed to fetch bases');
    }
  };

  useEffect(() => {
    fetchTransfers();
    fetchAssetTypes();
    fetchBases();
  }, [fetchTransfers]);

  const handleCreateTransfer = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/transfers`, formData);
      setOpenDialog(false);
      resetForm();
      fetchTransfers();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create transfer');
    }
  };

  const handleApproveTransfer = async (id: string) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/transfers/${id}/approve`);
      fetchTransfers();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to approve transfer');
    }
  };

  const handleRejectTransfer = async (id: string) => {
    const notes = prompt('Enter rejection reason (optional):');
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/transfers/${id}/reject`, { notes });
      fetchTransfers();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to reject transfer');
    }
  };

  const handleCompleteTransfer = async (id: string) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/transfers/${id}/complete`);
      fetchTransfers();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to complete transfer');
    }
  };

  const handleDeleteTransfer = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this transfer?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/transfers/${id}`);
        fetchTransfers();
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to delete transfer');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      asset_type_id: '',
      from_base_id: '',
      to_base_id: '',
      quantity: 0,
      transfer_date: '',
      notes: '',
    });
    setEditingTransfer(null);
  };

  const handleOpenDialog = (transfer?: Transfer) => {
    if (transfer) {
      setEditingTransfer(transfer);
      setFormData({
        asset_type_id: transfer.asset_type_id,
        from_base_id: transfer.from_base_id,
        to_base_id: transfer.to_base_id,
        quantity: transfer.quantity,
        transfer_date: transfer.transfer_date,
        notes: transfer.notes || '',
      });
    } else {
      resetForm();
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetForm();
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'info';
      case 'completed':
        return 'success';
      case 'rejected':
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const canApprove = (transfer: Transfer) => {
    return (
      transfer.status === 'pending' &&
      (user?.role === 'admin' || 
       (user?.role === 'base_commander' && transfer.to_base_id === user?.base_id))
    );
  };

  const canComplete = (transfer: Transfer) => {
    return (
      transfer.status === 'approved' &&
      (user?.role === 'admin' || 
       (user?.role === 'base_commander' && transfer.from_base_id === user?.base_id))
    );
  };

  const handleFiltersChange = (filters: {
    base_id: string;
    asset_type_id: string;
    start_date: Date | null;
    end_date: Date | null;
  }) => {
    setFilters({
      ...filters,
      from_base_id: filters.base_id,
      to_base_id: '',
      asset_type_id: filters.asset_type_id,
      status: '',
      start_date: filters.start_date ? filters.start_date.toISOString().split('T')[0] : '',
      end_date: filters.end_date ? filters.end_date.toISOString().split('T')[0] : ''
    });
  };

  if (loading && transfers.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Asset Transfers {user?.role === 'logistics_officer' && '(View Only)'}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            <FilterIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Filters
          </Typography>
          <FilterBar
            onFiltersChange={handleFiltersChange}
            title="Transfer Filters"
          />
        </CardContent>
      </Card>

      {/* Actions */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {(user?.role === 'admin' || user?.role === 'base_commander') && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Create Transfer
          </Button>
        )}
      </Box>

      {/* Transfers Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Asset Type</TableCell>
                <TableCell>From Base</TableCell>
                <TableCell>To Base</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Request Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transfers.map((transfer) => (
                <TableRow key={transfer.id} hover>
                  <TableCell>{transfer.asset_type_name}</TableCell>
                  <TableCell>{transfer.from_base_name}</TableCell>
                  <TableCell>{transfer.to_base_name}</TableCell>
                  <TableCell align="right">{(transfer.quantity || 0).toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip
                      label={transfer.status.charAt(0).toUpperCase() + transfer.status.slice(1)}
                      color={getStatusColor(transfer.status) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{formatDate(transfer.transfer_date)}</TableCell>
                  <TableCell>
                    {user?.role === 'admin' && canApprove(transfer) && (
                      <IconButton
                        size="small"
                        onClick={() => handleApproveTransfer(transfer.id)}
                        color="success"
                        title="Approve"
                      >
                        <ApproveIcon />
                      </IconButton>
                    )}
                    {user?.role === 'admin' && canApprove(transfer) && (
                      <IconButton
                        size="small"
                        onClick={() => handleRejectTransfer(transfer.id)}
                        color="error"
                        title="Reject"
                      >
                        <RejectIcon />
                      </IconButton>
                    )}
                    {user?.role === 'admin' && canComplete(transfer) && (
                      <IconButton
                        size="small"
                        onClick={() => handleCompleteTransfer(transfer.id)}
                        color="primary"
                        title="Complete"
                      >
                        <ApproveIcon />
                      </IconButton>
                    )}
                    {(user?.role === 'admin' || user?.role === 'base_commander') && (
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(transfer)}
                        color="primary"
                        title="Edit"
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                    {(user?.role === 'admin' || user?.role === 'base_commander') && (
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteTransfer(transfer.id)}
                        color="error"
                        title="Delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Create/Edit Transfer Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingTransfer ? 'Edit Transfer' : 'Create New Transfer'} {user?.role === 'base_commander' && '(Requires Admin Approval)'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Asset Type *</InputLabel>
                <Select
                  value={formData.asset_type_id}
                  label="Asset Type *"
                  onChange={(e) => setFormData({ ...formData, asset_type_id: e.target.value })}
                >
                  {assetTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>From Base *</InputLabel>
                <Select
                  value={formData.from_base_id}
                  label="From Base *"
                  onChange={(e) => setFormData({ ...formData, from_base_id: e.target.value })}
                >
                  {bases.map((base) => (
                    <MenuItem key={base.id} value={base.id}>
                      {base.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>To Base *</InputLabel>
                <Select
                  value={formData.to_base_id}
                  label="To Base *"
                  onChange={(e) => setFormData({ ...formData, to_base_id: e.target.value })}
                >
                  {bases.map((base) => (
                    <MenuItem key={base.id} value={base.id}>
                      {base.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Quantity *"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Transfer Date *"
                type="date"
                value={formData.transfer_date}
                onChange={(e) => setFormData({ ...formData, transfer_date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCreateTransfer} variant="contained">
            {editingTransfer ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Transfers; 