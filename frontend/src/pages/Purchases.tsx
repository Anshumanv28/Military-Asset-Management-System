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

interface Purchase {
  id: string;
  asset_type_id: string;
  asset_type_name: string;
  base_id: string;
  base_name: string;
  quantity: number;
  unit_cost: number;
  total_cost: number;
  supplier: string;
  purchase_date: string;
  delivery_date?: string;
  purchase_order_number?: string;
  status: 'pending' | 'approved' | 'cancelled';
  approved_by?: string;
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

interface CreatePurchaseForm {
  asset_type_id: string;
  base_id: string;
  quantity: number;
  unit_cost: number;
  supplier: string;
  purchase_date: string;
  delivery_date?: string;
  purchase_order_number?: string;
  notes?: string;
}

const Purchases: React.FC = () => {
  const [allPurchases, setAllPurchases] = useState<Purchase[]>([]);
  const [assetTypes, setAssetTypes] = useState<AssetType[]>([]);
  const [bases, setBases] = useState<Base[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPurchase, setEditingPurchase] = useState<Purchase | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [formData, setFormData] = useState<CreatePurchaseForm>({
    asset_type_id: '',
    base_id: '',
    quantity: 0,
    unit_cost: 0,
    supplier: '',
    purchase_date: new Date().toISOString().split('T')[0],
    delivery_date: '',
    purchase_order_number: '',
    notes: '',
  });

  // Client-side filters
  const [filters, setFilters] = useState({
    base_id: '',
    asset_type_id: '',
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
    fetchAllPurchases();
    fetchAssetTypes();
    fetchBases();
  }, []);

  // Client-side filtering
  const filteredPurchases = useMemo(() => {
    return allPurchases.filter(purchase => {
      if (filters.base_id && purchase.base_id !== filters.base_id) return false;
      if (filters.asset_type_id && purchase.asset_type_id !== filters.asset_type_id) return false;
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
        asset_type_id: purchase.asset_type_id,
        base_id: purchase.base_id,
        quantity: purchase.quantity,
        unit_cost: purchase.unit_cost,
        supplier: purchase.supplier,
        purchase_date: purchase.purchase_date,
        delivery_date: purchase.delivery_date || '',
        purchase_order_number: purchase.purchase_order_number || '',
        notes: purchase.notes || '',
      });
    } else {
      setEditingPurchase(null);
      setFormData({
        asset_type_id: '',
        base_id: '',
        quantity: 0,
        unit_cost: 0,
        supplier: '',
        purchase_date: new Date().toISOString().split('T')[0],
        delivery_date: '',
        purchase_order_number: '',
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
      asset_type_id: '',
      start_date: '',
      end_date: '',
      status: '',
    });
    setPage(0);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
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
          <Grid container spacing={2}>
            {user?.role === 'admin' && (
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <InputLabel>Base</InputLabel>
                  <Select
                    value={filters.base_id}
                    label="Base"
                    onChange={(e) => setFilters({ ...filters, base_id: e.target.value })}
                  >
                    <MenuItem value="">All Bases</MenuItem>
                    {bases.map((base) => (
                      <MenuItem key={base.id} value={base.id}>
                        {base.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel>Asset Type</InputLabel>
                <Select
                  value={filters.asset_type_id}
                  label="Asset Type"
                  onChange={(e) => setFilters({ ...filters, asset_type_id: e.target.value })}
                >
                  <MenuItem value="">All Types</MenuItem>
                  {assetTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                value={filters.start_date}
                onChange={(e) => setFilters({ ...filters, start_date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                value={filters.end_date}
                onChange={(e) => setFilters({ ...filters, end_date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status}
                  label="Status"
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                >
                  <MenuItem value="">All Statuses</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Button variant="outlined" onClick={handleClearFilters}>
              Clear Filters
            </Button>
            <Typography variant="body2" sx={{ alignSelf: 'center', ml: 2 }}>
              Showing {filteredPurchases.length} of {allPurchases.length} purchases
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Actions */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          New Purchase
        </Button>
      </Box>

      {/* Purchases Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Asset Type</TableCell>
              <TableCell>Base</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit Cost</TableCell>
              <TableCell>Total Cost</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Purchase Date</TableCell>
              <TableCell>Delivery Date</TableCell>
              <TableCell>PO Number</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPurchases.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell>{purchase.asset_type_name}</TableCell>
                <TableCell>{purchase.base_name}</TableCell>
                <TableCell>{purchase.quantity}</TableCell>
                <TableCell>{formatCurrency(purchase.unit_cost)}</TableCell>
                <TableCell>{formatCurrency(purchase.total_cost)}</TableCell>
                <TableCell>{purchase.supplier}</TableCell>
                <TableCell>{formatDate(purchase.purchase_date)}</TableCell>
                <TableCell>
                  {purchase.delivery_date ? formatDate(purchase.delivery_date) : '-'}
                </TableCell>
                <TableCell>{purchase.purchase_order_number}</TableCell>
                <TableCell>
                  {purchase.status === 'pending' && <Chip label="Pending" color="warning" size="small" />}
                  {purchase.status === 'approved' && <Chip label="Approved" color="success" size="small" />}
                  {purchase.status === 'cancelled' && <Chip label="Cancelled" color="error" size="small" />}
                </TableCell>
                <TableCell>
                  {(user?.role === 'admin' || (user?.role === 'base_commander' && purchase.base_id === user.base_id)) && 
                   purchase.status === 'pending' && (
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
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(purchase)}
                    color="primary"
                    title="Edit"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(purchase.id)}
                    color="error"
                    title="Delete"
                    disabled={user?.role === 'logistics_officer'}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
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
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Asset Type</InputLabel>
                <Select
                  value={formData.asset_type_id}
                  label="Asset Type"
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
                label="Unit Cost"
                type="number"
                value={formData.unit_cost}
                onChange={(e) => setFormData({ ...formData, unit_cost: parseFloat(e.target.value) || 0 })}
                InputProps={{
                  startAdornment: <span>$</span>,
                }}
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
              <TextField
                fullWidth
                label="Purchase Order Number"
                value={formData.purchase_order_number}
                onChange={(e) => setFormData({ ...formData, purchase_order_number: e.target.value })}
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
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Delivery Date"
                  value={formData.delivery_date ? new Date(formData.delivery_date) : null}
                  onChange={(date) => setFormData({ 
                    ...formData, 
                    delivery_date: date ? date.toISOString().split('T')[0] : '' 
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