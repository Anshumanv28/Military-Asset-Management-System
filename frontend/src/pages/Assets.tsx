import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TablePagination,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext.tsx';

interface Asset {
  id: string;
  asset_type_id: string;
  asset_type_name: string;
  serial_number: string;
  name: string;
  description: string;
  current_base_id: string;
  current_base_name: string;
  status: string;
  purchase_date: string;
  purchase_cost?: number | null;
  current_value?: number | null;
  created_at: string;
  updated_at: string;
}

interface AssetType {
  id: string;
  name: string;
  description: string;
}

interface Base {
  id: string;
  name: string;
  code: string;
  location: string;
}

interface CreateAssetForm {
  asset_type_id: string;
  serial_number: string;
  name: string;
  description: string;
  current_base_id: string;
  purchase_date: string;
  purchase_cost: number;
  current_value: number;
}

const Assets: React.FC = () => {
  const { user } = useAuth();
  const [allAssets, setAllAssets] = useState<Asset[]>([]);
  const [assetTypes, setAssetTypes] = useState<AssetType[]>([]);
  const [bases, setBases] = useState<Base[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [formData, setFormData] = useState<CreateAssetForm>({
    asset_type_id: '',
    serial_number: '',
    name: '',
    description: '',
    current_base_id: '',
    purchase_date: '',
    purchase_cost: 0,
    current_value: 0,
  });

  // Client-side filters
  const [filters, setFilters] = useState({
    asset_type_id: '',
    current_base_id: '',
    status: '',
    serial_number: '',
  });

  // Fetch all assets once
  const fetchAllAssets = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/assets?limit=1000`);
      setAllAssets(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch assets');
    } finally {
      setLoading(false);
    }
  };

  const fetchAssetTypes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/asset-types?limit=1000`);
      setAssetTypes(response.data.data);
    } catch (err: any) {
      console.error('Failed to fetch asset types:', err);
    }
  };

  const fetchBases = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/bases`);
      setBases(response.data.data);
    } catch (err: any) {
      console.error('Failed to fetch bases:', err);
    }
  };

  useEffect(() => {
    fetchAllAssets();
    fetchAssetTypes();
    fetchBases();
  }, []);

  // Client-side filtering
  const filteredAssets = useMemo(() => {
    return allAssets.filter(asset => {
      if (filters.asset_type_id && asset.asset_type_id !== filters.asset_type_id) return false;
      if (filters.current_base_id && asset.current_base_id !== filters.current_base_id) return false;
      if (filters.status && asset.status !== filters.status) return false;
      if (filters.serial_number && !asset.serial_number.toLowerCase().includes(filters.serial_number.toLowerCase())) return false;
      return true;
    });
  }, [allAssets, filters]);

  // Pagination
  const paginatedAssets = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredAssets.slice(start, start + rowsPerPage);
  }, [filteredAssets, page, rowsPerPage]);

  const handleOpenDialog = (asset?: Asset) => {
    if (asset) {
      setEditingAsset(asset);
      setFormData({
        asset_type_id: asset.asset_type_id,
        serial_number: asset.serial_number,
        name: asset.name,
        description: asset.description,
        current_base_id: asset.current_base_id,
        purchase_date: asset.purchase_date,
        purchase_cost: asset.purchase_cost || 0,
        current_value: asset.current_value || 0,
      });
    } else {
      setEditingAsset(null);
      setFormData({
        asset_type_id: '',
        serial_number: '',
        name: '',
        description: '',
        current_base_id: '',
        purchase_date: '',
        purchase_cost: 0,
        current_value: 0,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingAsset(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingAsset) {
        await axios.put(`${process.env.REACT_APP_API_URL}/assets/${editingAsset.id}`, formData);
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/assets`, formData);
      }
      fetchAllAssets();
      handleCloseDialog();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save asset');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/assets/${id}`);
        fetchAllAssets();
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to delete asset');
      }
    }
  };

  const handleClearFilters = () => {
    setFilters({
      asset_type_id: '',
      current_base_id: '',
      status: '',
      serial_number: '',
    });
    setPage(0);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'success';
      case 'assigned':
        return 'warning';
      case 'maintenance':
        return 'info';
      case 'retired':
        return 'error';
      default:
        return 'default';
    }
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
        Assets Management
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
              <FormControl fullWidth>
                <InputLabel>Base</InputLabel>
                <Select
                  value={filters.current_base_id}
                  label="Base"
                  onChange={(e) => setFilters({ ...filters, current_base_id: e.target.value })}
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
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status}
                  label="Status"
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                >
                  <MenuItem value="">All Status</MenuItem>
                  <MenuItem value="available">Available</MenuItem>
                  <MenuItem value="assigned">Assigned</MenuItem>
                  <MenuItem value="maintenance">Maintenance</MenuItem>
                  <MenuItem value="retired">Retired</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Serial Number"
                value={filters.serial_number}
                onChange={(e) => setFilters({ ...filters, serial_number: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Button variant="outlined" onClick={handleClearFilters}>
              Clear Filters
            </Button>
            <Typography variant="body2" sx={{ alignSelf: 'center', ml: 2 }}>
              Showing {filteredAssets.length} of {allAssets.length} assets
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
          disabled={user?.role !== 'admin'}
        >
          New Asset
        </Button>
      </Box>

      {/* Assets Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Serial Number</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Base</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Purchase Cost</TableCell>
              <TableCell>Current Value</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedAssets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell>{asset.serial_number}</TableCell>
                <TableCell>{asset.name}</TableCell>
                <TableCell>{asset.asset_type_name}</TableCell>
                <TableCell>{asset.current_base_name}</TableCell>
                <TableCell>
                  <Chip
                    label={asset.status}
                    color={getStatusColor(asset.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {asset.purchase_cost !== null && asset.purchase_cost !== undefined 
                    ? `$${Number(asset.purchase_cost).toLocaleString()}` 
                    : '$0'}
                </TableCell>
                <TableCell>
                  {asset.current_value !== null && asset.current_value !== undefined 
                    ? `$${Number(asset.current_value).toLocaleString()}` 
                    : '$0'}
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(asset)}
                    disabled={user?.role !== 'admin'}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(asset.id)}
                    disabled={user?.role !== 'admin'}
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
          count={filteredAssets.length}
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
          {editingAsset ? 'Edit Asset' : 'New Asset'}
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
              <TextField
                fullWidth
                label="Serial Number"
                value={formData.serial_number}
                onChange={(e) => setFormData({ ...formData, serial_number: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Base</InputLabel>
                <Select
                  value={formData.current_base_id}
                  label="Base"
                  onChange={(e) => setFormData({ ...formData, current_base_id: e.target.value })}
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
                label="Purchase Date"
                type="date"
                value={formData.purchase_date}
                onChange={(e) => setFormData({ ...formData, purchase_date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Purchase Cost"
                type="number"
                value={formData.purchase_cost}
                onChange={(e) => setFormData({ ...formData, purchase_cost: parseFloat(e.target.value) || 0 })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Current Value"
                type="number"
                value={formData.current_value}
                onChange={(e) => setFormData({ ...formData, current_value: parseFloat(e.target.value) || 0 })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingAsset ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Assets; 