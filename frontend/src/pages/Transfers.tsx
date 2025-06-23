import React, { useState, useEffect, useCallback } from 'react';
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
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext.tsx';
import FilterBar from '../components/FilterBar.tsx';

declare const process: {
  env: {
    REACT_APP_API_URL: string;
  };
};

interface Transfer {
  id: string;
  transfer_number: string;
  asset_name: string;
  from_base_id: string;
  from_base_name: string;
  to_base_id: string;
  to_base_name: string;
  quantity: number;
  status: 'pending' | 'approved' | 'rejected';
  transfer_date: string;
  approved_at?: string;
  notes?: string;
  created_by: string;
  created_at: string;
}

interface Base {
  id: string;
  name: string;
}

interface Asset {
  id: string;
  name: string;
  base_id: string;
  quantity: number;
  available_quantity: number;
}

interface CreateTransferForm {
  asset_name: string;
  from_base_id: string;
  to_base_id: string;
  quantity: number;
  transfer_date: string;
  notes?: string;
}

const Transfers: React.FC = () => {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [bases, setBases] = useState<Base[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTransfer, setEditingTransfer] = useState<Transfer | null>(null);
  const [formData, setFormData] = useState<CreateTransferForm>({
    asset_name: '',
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
    asset_name: '',
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
      if (filters.asset_name) params.append('asset_name', filters.asset_name);
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

  const fetchBases = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/bases`);
      setBases(response.data.data);
    } catch (err) {
      console.error('Failed to fetch bases');
    }
  };

  const fetchAssets = async (baseId?: string) => {
    try {
      const params = new URLSearchParams();
      params.append('status', 'available');
      params.append('limit', '1000');
      if (baseId) {
        params.append('base_id', baseId);
      }
      
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/assets?${params}`);
      setAssets(response.data.data);
    } catch (err) {
      console.error('Failed to fetch assets');
    }
  };

  useEffect(() => {
    fetchTransfers();
    fetchBases();
    fetchAssets();
  }, [fetchTransfers]);

  const handleCreateTransfer = async () => {
    try {
      // Validate form data
      if (!formData.from_base_id || !formData.to_base_id || !formData.asset_name || !formData.quantity || !formData.transfer_date) {
        setError('Please fill in all required fields');
        return;
      }

      if (formData.quantity <= 0) {
        setError('Quantity must be greater than 0');
        return;
      }

      await axios.post(`${process.env.REACT_APP_API_URL}/transfers`, formData);
      setOpenDialog(false);
      resetForm();
      fetchTransfers();
      setError('');
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
      asset_name: '',
      from_base_id: '',
      to_base_id: '',
      quantity: 0,
      transfer_date: '',
      notes: '',
    });
  };

  const handleOpenDialog = (transfer?: Transfer) => {
    if (transfer) {
      setEditingTransfer(transfer);
      setFormData({
        asset_name: transfer.asset_name,
        from_base_id: transfer.from_base_id,
        to_base_id: transfer.to_base_id,
        quantity: transfer.quantity,
        transfer_date: transfer.transfer_date,
        notes: transfer.notes || '',
      });
    } else {
      setEditingTransfer(null);
      resetForm();
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingTransfer(null);
    resetForm();
    setError('');
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
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const canApprove = (transfer: Transfer) => {
    return transfer.status === 'pending';
  };

  const canDelete = (transfer: Transfer) => {
    if (user?.role === 'admin') {
      return true; // Admin can delete any transfer
    }
    if (user?.role === 'base_commander') {
      // Base commanders can delete pending and rejected transfers involving their base, but not approved ones
      return (transfer.status === 'pending' || transfer.status === 'rejected') && 
             (transfer.from_base_id === user?.base_id || transfer.to_base_id === user?.base_id);
    }
    return false;
  };

  const canEdit = (transfer: Transfer) => {
    if (user?.role === 'admin') {
      return true; // Admin can edit any transfer
    }
    if (user?.role === 'base_commander') {
      // Base commanders can only edit pending transfers involving their base
      return transfer.status === 'pending' && 
             (transfer.from_base_id === user?.base_id || transfer.to_base_id === user?.base_id);
    }
    return false;
  };

  const handleFiltersChange = (filters: {
    base_id: string;
  }) => {
    setFilters(prev => ({
      ...prev,
      from_base_id: filters.base_id,
    }));
  };

  // Filter assets based on selected from_base_id
  const filteredAssets = assets.filter(asset => 
    !formData.from_base_id || asset.base_id === formData.from_base_id
  );

  // Get available quantity for selected asset
  const selectedAsset = assets.find(asset => asset.name === formData.asset_name && asset.base_id === formData.from_base_id);
  const maxQuantity = selectedAsset ? selectedAsset.available_quantity : 0;

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
        {(user?.role === 'base_commander' || user?.role === 'admin') && (
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
                <TableCell>Asset Name</TableCell>
                <TableCell>From Base</TableCell>
                <TableCell>To Base</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Request Date</TableCell>
                {user?.role !== 'logistics_officer' && <TableCell>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {transfers.map((transfer) => (
                <TableRow key={transfer.id} hover>
                  <TableCell>{transfer.asset_name}</TableCell>
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
                  {user?.role !== 'logistics_officer' && (
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
                      {canEdit(transfer) && (
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(transfer)}
                          color="primary"
                          title="Edit"
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                      {canDelete(transfer) && (
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
                  )}
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
          {editingTransfer ? 'Edit Transfer' : 'Create New Transfer'} 
          {user?.role === 'base_commander' && ' (Requires Admin Approval)'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>From Base *</InputLabel>
                <Select
                  value={formData.from_base_id}
                  label="From Base *"
                  onChange={(e) => {
                    setFormData({ 
                      ...formData, 
                      from_base_id: e.target.value,
                      asset_name: '' // Reset asset selection when base changes
                    });
                    // Fetch assets for the selected base
                    if (e.target.value) {
                      fetchAssets(e.target.value);
                    }
                  }}
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
                <InputLabel>Asset Name *</InputLabel>
                <Select
                  value={formData.asset_name}
                  label="Asset Name *"
                  onChange={(e) => setFormData({ ...formData, asset_name: e.target.value })}
                  disabled={!formData.from_base_id}
                >
                  {filteredAssets.length > 0 ? (
                    filteredAssets.map((asset) => (
                      <MenuItem key={asset.id} value={asset.name}>
                        {asset.name} (Available: {asset.available_quantity.toLocaleString()})
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>
                      {formData.from_base_id ? 'No available assets found' : 'Please select a base first'}
                    </MenuItem>
                  )}
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
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 0;
                  setFormData({ ...formData, quantity: value });
                }}
                inputProps={{ 
                  min: 1, 
                  max: maxQuantity 
                }}
                helperText={selectedAsset ? `Max available: ${maxQuantity.toLocaleString()}` : ''}
                error={formData.quantity > maxQuantity}
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
          <Button 
            onClick={handleCreateTransfer} 
            variant="contained"
            disabled={!formData.from_base_id || !formData.to_base_id || !formData.asset_name || !formData.quantity || !formData.transfer_date || formData.quantity > maxQuantity}
          >
            {editingTransfer ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Transfers;