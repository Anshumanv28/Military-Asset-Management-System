import React, { useState, useEffect, useMemo } from 'react';
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
import { useData } from '../contexts/DataContext.tsx';

interface Purchase {
  id: string;
  asset_id: string;
  asset_name?: string;
  base_id: string;
  base_name: string;
  quantity: number;
  supplier: string;
  purchase_date: string;
  status: 'pending' | 'approved' | 'cancelled';
  approved_by?: string;
  approved_at?: string;
  notes?: string;
  created_by: string;
  created_at: string;
}

interface Base {
  id: string;
  name: string;
}

interface CreatePurchaseForm {
  asset_id: string;
  base_id: string;
  quantity: number;
  supplier: string;
  purchase_date: string;
  notes?: string;
}

const Purchases: React.FC = () => {
  const [allPurchases, setAllPurchases] = useState<Purchase[]>([]);
  const [bases, setBases] = useState<Base[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPurchase, setEditingPurchase] = useState<Purchase | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { assets = [] } = useData();

  const [formData, setFormData] = useState<CreatePurchaseForm>({
    asset_id: '',
    base_id: '',
    quantity: 0,
    supplier: '',
    purchase_date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  // Client-side filters
  const [filters, setFilters] = useState({
    base_id: '',
    start_date: '',
    end_date: '',
    status: '',
  });

  const { user } = useAuth();

  // Fetch all purchases once
  const fetchAllPurchases = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/purchases?limit=1000`);
      setAllPurchases(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch purchases');
    } finally {
      setLoading(false);
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
    fetchAllPurchases();
    fetchBases();
  }, []);

  // Client-side filtering
  const filteredPurchases = useMemo(() => {
    return allPurchases.filter(purchase => {
      if (filters.base_id && purchase.base_id !== filters.base_id) return false;
      if (filters.start_date && purchase.purchase_date < filters.start_date) return false;
      if (filters.end_date && purchase.purchase_date > filters.end_date) return false;
      if (filters.status && purchase.status !== filters.status) return false;
      return true;
    });
  }, [allPurchases, filters]);

  // Pagination
  const paginatedPurchases = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredPurchases.slice(start, start + rowsPerPage);
  }, [filteredPurchases, page, rowsPerPage]);

  const handleOpenDialog = (purchase?: Purchase) => {
    if (purchase) {
      setEditingPurchase(purchase);
      setFormData({
        asset_id: purchase.asset_id,
        base_id: purchase.base_id,
        quantity: purchase.quantity,
        supplier: purchase.supplier,
        purchase_date: purchase.purchase_date,
        notes: purchase.notes || '',
      });
    } else {
      setEditingPurchase(null);
      setFormData({
        asset_id: '',
        base_id: '',
        quantity: 0,
        supplier: '',
        purchase_date: new Date().toISOString().split('T')[0],
        notes: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingPurchase(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingPurchase) {
        await axios.put(`${process.env.REACT_APP_API_URL}/purchases/${editingPurchase.id}`, formData);
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/purchases`, formData);
      }
      fetchAllPurchases();
      handleCloseDialog();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save purchase');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this purchase?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/purchases/${id}`);
        fetchAllPurchases();
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to delete purchase');
      }
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/purchases/${id}/approve`);
      await fetchAllPurchases();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to approve purchase');
    }
  };

  const handleReject = async (id: string) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/purchases/${id}/cancel`);
      await fetchAllPurchases();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to reject purchase');
    }
  };

  const handleClearFilters = () => {
    setFilters({
      base_id: '',
      start_date: '',
      end_date: '',
      status: '',
    });
    setPage(0);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // RBAC functions similar to transfers
  const canApprove = (purchase: Purchase) => {
    return purchase.status === 'pending';
  };

  const canDelete = (purchase: Purchase) => {
    if (user?.role === 'admin') {
      return true; // Admin can delete any purchase
    }
    if (user?.role === 'base_commander') {
      // Base commanders can delete pending and cancelled purchases for their base, but not approved ones
      return (purchase.status === 'pending' || purchase.status === 'cancelled') && 
             purchase.base_id === user?.base_id;
    }
    return false;
  };

  const canEdit = (purchase: Purchase) => {
    if (user?.role === 'admin') {
      return true; // Admin can edit any purchase
    }
    if (user?.role === 'base_commander') {
      // Base commanders can only edit pending purchases for their base
      return purchase.status === 'pending' && purchase.base_id === user?.base_id;
    }
    return false;
  };

  const handleFiltersChange = (filters: {
    base_id: string;
  }) => {
    setFilters({
      base_id: filters.base_id,
      start_date: '',
      end_date: '',
      status: ''
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Asset Purchases
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
            title="Purchase Filters"
          />
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Typography variant="body2" sx={{ alignSelf: 'center', ml: 2 }}>
              Showing {filteredPurchases.length} of {allPurchases.length} purchases
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Actions */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {user?.role !== 'logistics_officer' && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            New Purchase
          </Button>
        )}
      </Box>

      {/* Purchases Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Asset Name</TableCell>
              <TableCell>Base</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Purchase Date</TableCell>
              <TableCell>Status</TableCell>
              {user?.role !== 'logistics_officer' && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPurchases.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell>
                  {assets.find((a) => a.id === purchase.asset_id)?.name || '-'}
                </TableCell>
                <TableCell>{purchase.base_name}</TableCell>
                <TableCell>{purchase.quantity}</TableCell>
                <TableCell>{purchase.supplier}</TableCell>
                <TableCell>{formatDate(purchase.purchase_date)}</TableCell>
                <TableCell>
                  {purchase.status === 'pending' && <Chip label="Pending" color="warning" size="small" />}
                  {purchase.status === 'approved' && <Chip label="Approved" color="success" size="small" />}
                  {purchase.status === 'cancelled' && <Chip label="Cancelled" color="error" size="small" />}
                </TableCell>
                {user?.role !== 'logistics_officer' && (
                  <TableCell>
                    {user?.role === 'admin' && canApprove(purchase) && (
                      <>
                        <Tooltip title="Approve Purchase">
                          <IconButton
                            size="small"
                            onClick={() => handleApprove(purchase.id)}
                            color="success"
                          >
                            <ApproveIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Reject Purchase">
                          <IconButton
                            size="small"
                            onClick={() => handleReject(purchase.id)}
                            color="error"
                          >
                            <RejectIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                    {canEdit(purchase) && (
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(purchase)}
                        color="primary"
                        title="Edit"
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                    {canDelete(purchase) && (
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(purchase.id)}
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredPurchases.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingPurchase ? 'Edit Purchase' : 'New Purchase'} 
          {user?.role === 'base_commander' && ' (Requires Admin Approval)'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="asset-select-label">Asset</InputLabel>
                <Select
                  labelId="asset-select-label"
                  value={formData.asset_id}
                  label="Asset"
                  onChange={(e) => setFormData({ ...formData, asset_id: e.target.value })}
                >
                  {assets.map((asset) => (
                    <MenuItem key={asset.id} value={asset.id}>
                      {asset.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Base</InputLabel>
                <Select
                  value={formData.base_id}
                  label="Base"
                  onChange={(e) => setFormData({ ...formData, base_id: e.target.value })}
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
                label="Quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Supplier"
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Purchase Date"
                  value={formData.purchase_date ? new Date(formData.purchase_date) : null}
                  onChange={(date) => setFormData({ 
                    ...formData, 
                    purchase_date: date ? date.toISOString().split('T')[0] : '' 
                  })}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
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
          <Button onClick={handleSubmit} variant="contained">
            {editingPurchase ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Purchases; 