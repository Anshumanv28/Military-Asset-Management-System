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
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext.tsx';
import { useData } from '../contexts/DataContext.tsx';
import FilterBar from '../components/FilterBar.tsx';

declare const process: {
  env: {
    REACT_APP_API_URL: string;
  };
};

interface Asset {
  id: string;
  name: string;
  base_id: string;
  current_base_name: string;
  status: string;
  quantity: number;
  available_quantity: number;
  created_at: string;
  updated_at: string;
}

interface CreateAssetForm {
  name: string;
  base_id: string;
  quantity: number;
}

const Assets: React.FC = () => {
  const { user } = useAuth();
  const { bases } = useData();
  const [allAssets, setAllAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [formData, setFormData] = useState<CreateAssetForm>({
    name: '',
    base_id: '',
    quantity: 1,
  });

  // Client-side filters
  const [filters, setFilters] = useState({
    name: '',
    base_id: '',
    status: '',
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

  useEffect(() => {
    fetchAllAssets();
  }, []);

  // Client-side filtering
  const filteredAssets = useMemo(() => {
    return allAssets.filter(asset => {
      if (filters.name && !asset.name.toLowerCase().includes(filters.name.toLowerCase())) return false;
      if (filters.base_id && asset.base_id !== filters.base_id) return false;
      if (filters.status && asset.status !== filters.status) return false;
      return true;
    });
  }, [allAssets, filters.name, filters.base_id, filters.status]);

  // Pagination
  const paginatedAssets = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredAssets.slice(start, start + rowsPerPage);
  }, [filteredAssets, page, rowsPerPage]);

  const handleOpenDialog = (asset?: Asset) => {
    if (asset) {
      setEditingAsset(asset);
      setFormData({
        name: asset.name,
        base_id: asset.base_id,
        quantity: asset.quantity,
      });
    } else {
      setEditingAsset(null);
      setFormData({
        name: '',
        base_id: '',
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
  }) => {
    setFilters({
      base_id: filters.base_id || '',
      name: '',
      status: '',
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
        {user?.role === 'admin' && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenDialog()}
            startIcon={<EditIcon />}
          >
            Create Asset
          </Button>
        )}
      </Box>

      {/* Assets Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Base</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Available</TableCell>
              {user?.role === 'admin' && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedAssets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell>{asset.name}</TableCell>
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
                {user?.role === 'admin' && (
                  <TableCell>
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
                  </TableCell>
                )}
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
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingAsset ? 'Edit Asset' : 'New Asset'}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Asset Name *
              </Typography>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
                placeholder="Enter asset name"
              />
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Base *
              </Typography>
              <select
                value={formData.base_id}
                onChange={(e) => setFormData({ ...formData, base_id: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              >
                <option value="">Select a base</option>
                {bases.map((base) => (
                  <option key={base.id} value={base.id}>
                    {base.name} ({base.code})
                  </option>
                ))}
              </select>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Quantity *
              </Typography>
              <input
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
                placeholder="Enter quantity"
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.name || !formData.base_id || formData.quantity < 1}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Assets;