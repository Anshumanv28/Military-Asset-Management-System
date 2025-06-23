import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Alert,
  Card,
  CardContent,
  Chip,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext.tsx';
import FilterBar from '../components/FilterBar.tsx';

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
  quantity: number;
  available_quantity: number;
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
  quantity: number;
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
    quantity: 1,
  });

  // Client-side filters
  const [filters, setFilters] = useState({
    asset_type_id: '',
    current_base_id: '',
    status: '',
    serial_number: '',
  });

  // Debounced search for serial number
  const [debouncedSerialNumber, setDebouncedSerialNumber] = useState('');

  // Debounce serial number search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSerialNumber(filters.serial_number);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [filters.serial_number]);

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
      if (debouncedSerialNumber && !asset.serial_number.toLowerCase().includes(debouncedSerialNumber.toLowerCase())) return false;
      return true;
    });
  }, [allAssets, filters.asset_type_id, filters.current_base_id, filters.status, debouncedSerialNumber]);

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
        quantity: asset.quantity,
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
        quantity: 1,
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

  const handleFiltersChange = (filters: {
    base_id: string;
    asset_type_id: string;
    start_date: Date | null;
    end_date: Date | null;
  }) => {
    setFilters({
      asset_type_id: filters.asset_type_id || '',
      current_base_id: filters.base_id || '',
      status: '',
      serial_number: ''
    });
    setPage(0); // Reset to first page when filters change
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
          <FilterBar
            onFiltersChange={handleFiltersChange}
            showDateFilters={false}
            title="Asset Filters"
          />
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Typography variant="body2" sx={{ alignSelf: 'center', ml: 2 }}>
              Showing {filteredAssets.length} of {allAssets.length} assets
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
            disabled={user?.role !== 'admin'}
          >
            New Asset
          </Button>
        )}
      </Box>

      {/* Assets Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Base</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Available</TableCell>
              <TableCell>Purchase Cost</TableCell>
              <TableCell>Current Value</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedAssets.map((asset) => (
              <TableRow key={asset.id}>
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
                <TableCell>{asset.quantity}</TableCell>
                <TableCell>{asset.available_quantity}</TableCell>
                <TableCell>
                  {asset.purchase_cost !== null && asset.purchase_cost !== undefined 
                    ? `$${Number(asset.purchase_cost).toLocaleString()}`
                    : 'N/A'}
                </TableCell>
                <TableCell>
                  {asset.current_value !== null && asset.current_value !== undefined 
                    ? `$${Number(asset.current_value).toLocaleString()}`
                    : 'N/A'}
                </TableCell>
                <TableCell>
                  {user?.role !== 'logistics_officer' && (
                    <>
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenDialog(asset)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(asset.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={filteredAssets.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />

      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingAsset ? 'Edit Asset' : 'New Asset'}</DialogTitle>
        <DialogContent>
          {/* Form content */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Assets;