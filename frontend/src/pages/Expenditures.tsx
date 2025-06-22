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
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext.tsx';

interface Expenditure {
  id: string;
  asset_type_id: string;
  asset_type_name: string;
  base_id: string;
  base_name: string;
  quantity: number;
  unit_cost: number;
  total_cost: number;
  expenditure_date: string;
  reason: string;
  authorized_by: string;
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

interface CreateExpenditureForm {
  asset_type_id: string;
  base_id: string;
  quantity: number;
  unit_cost: number;
  expenditure_date: string;
  reason: string;
  notes?: string;
}

const Expenditures: React.FC = () => {
  const [expenditures, setExpenditures] = useState<Expenditure[]>([]);
  const [assetTypes, setAssetTypes] = useState<AssetType[]>([]);
  const [bases, setBases] = useState<Base[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingExpenditure, setEditingExpenditure] = useState<Expenditure | null>(null);
  const [formData, setFormData] = useState<CreateExpenditureForm>({
    asset_type_id: '',
    base_id: '',
    quantity: 0,
    unit_cost: 0,
    expenditure_date: new Date().toISOString().split('T')[0],
    reason: '',
    notes: '',
  });

  // Filters
  const [filters, setFilters] = useState({
    base_id: '',
    asset_type_id: '',
    start_date: '',
    end_date: '',
  });

  const { user } = useAuth();

  const fetchExpenditures = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', (page + 1).toString());
      params.append('limit', rowsPerPage.toString());
      
      if (filters.base_id) params.append('base_id', filters.base_id);
      if (filters.asset_type_id) params.append('asset_type_id', filters.asset_type_id);
      if (filters.start_date) params.append('start_date', filters.start_date);
      if (filters.end_date) params.append('end_date', filters.end_date);

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/expenditures?${params}`);
      setExpenditures(response.data.data);
      setTotal(response.data.pagination.total);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch expenditures');
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
    fetchExpenditures();
    fetchAssetTypes();
    fetchBases();
  }, [fetchExpenditures]);

  const handleCreateExpenditure = async () => {
    try {
      const expenditureData = {
        ...formData,
        total_cost: formData.quantity * formData.unit_cost,
      };

      await axios.post(`${process.env.REACT_APP_API_URL}/expenditures`, expenditureData);
      setOpenDialog(false);
      resetForm();
      fetchExpenditures();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create expenditure');
    }
  };

  const handleDeleteExpenditure = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this expenditure?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/expenditures/${id}`);
        fetchExpenditures();
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to delete expenditure');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      asset_type_id: '',
      base_id: '',
      quantity: 0,
      unit_cost: 0,
      expenditure_date: new Date().toISOString().split('T')[0],
      reason: '',
      notes: '',
    });
    setEditingExpenditure(null);
  };

  const handleOpenDialog = (expenditure?: Expenditure) => {
    if (expenditure) {
      setEditingExpenditure(expenditure);
      setFormData({
        asset_type_id: expenditure.asset_type_id,
        base_id: expenditure.base_id,
        quantity: expenditure.quantity,
        unit_cost: expenditure.unit_cost,
        expenditure_date: expenditure.expenditure_date,
        reason: expenditure.reason,
        notes: expenditure.notes || '',
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading && expenditures.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Asset Expenditures
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
          </Grid>
        </CardContent>
      </Card>

      {/* Actions */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Create Expenditure
        </Button>
      </Box>

      {/* Expenditures Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Asset Type</TableCell>
                <TableCell>Base</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Unit Cost</TableCell>
                <TableCell align="right">Total Cost</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Expenditure Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenditures.map((expenditure) => (
                <TableRow key={expenditure.id} hover>
                  <TableCell>{expenditure.asset_type_name}</TableCell>
                  <TableCell>{expenditure.base_name}</TableCell>
                  <TableCell align="right">{(expenditure.quantity || 0).toLocaleString()}</TableCell>
                  <TableCell align="right">{formatCurrency(expenditure.unit_cost)}</TableCell>
                  <TableCell align="right">{formatCurrency(expenditure.total_cost)}</TableCell>
                  <TableCell>{expenditure.reason}</TableCell>
                  <TableCell>{formatDate(expenditure.expenditure_date)}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(expenditure)}
                      color="primary"
                      title="Edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteExpenditure(expenditure.id)}
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

      {/* Create/Edit Expenditure Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingExpenditure ? 'Edit Expenditure' : 'Create New Expenditure'}
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
                <InputLabel>Base *</InputLabel>
                <Select
                  value={formData.base_id}
                  label="Base *"
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
                label="Quantity *"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Unit Cost *"
                type="number"
                value={formData.unit_cost}
                onChange={(e) => setFormData({ ...formData, unit_cost: parseFloat(e.target.value) || 0 })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Expenditure Date *"
                type="date"
                value={formData.expenditure_date}
                onChange={(e) => setFormData({ ...formData, expenditure_date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Reason *"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
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
            <Grid item xs={12}>
              <Typography variant="h6" color="primary">
                Total Cost: {formatCurrency(formData.quantity * formData.unit_cost)}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCreateExpenditure} variant="contained">
            {editingExpenditure ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Expenditures; 