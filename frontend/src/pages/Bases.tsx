import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext.tsx';

interface Base {
  id: string;
  name: string;
  code: string;
  location: string;
  commander_id?: string;
  commander_name?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface User {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  role: string;
}

interface CreateBaseForm {
  name: string;
  code: string;
  location: string;
  commander_id: string;
}

const Bases: React.FC = () => {
  const { user } = useAuth();
  const [bases, setBases] = useState<Base[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingBase, setEditingBase] = useState<Base | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const [formData, setFormData] = useState<CreateBaseForm>({
    name: '',
    code: '',
    location: '',
    commander_id: '',
  });

  const [filters, setFilters] = useState({
    is_active: '',
    commander_id: '',
  });

  useEffect(() => {
    fetchBases();
    fetchUsers();
  }, [page, rowsPerPage, filters]);

  const fetchBases = async () => {
    try {
      const params = new URLSearchParams({
        page: (page + 1).toString(),
        limit: rowsPerPage.toString(),
        ...filters,
      });

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/bases?${params}`);
      setBases(response.data.data);
      setTotal(response.data.pagination.total);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch bases');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users?role=base_commander&limit=1000`);
      setUsers(response.data.data);
    } catch (err: any) {
      console.error('Failed to fetch users:', err);
    }
  };

  const handleCreateBase = async () => {
    try {
      if (editingBase) {
        await axios.put(`${process.env.REACT_APP_API_URL}/bases/${editingBase.id}`, formData);
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/bases`, formData);
      }
      setOpenDialog(false);
      resetForm();
      fetchBases();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save base');
    }
  };

  const handleDeleteBase = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this base?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/bases/${id}`);
        fetchBases();
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to delete base');
      }
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/bases/${id}`, {
        is_active: !currentStatus
      });
      fetchBases();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update base status');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      location: '',
      commander_id: '',
    });
    setEditingBase(null);
  };

  const handleOpenDialog = (base?: Base) => {
    if (base) {
      setEditingBase(base);
      setFormData({
        name: base.name,
        code: base.code,
        location: base.location,
        commander_id: base.commander_id || '',
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

  const canEdit = (base: Base) => {
    return user?.role === 'admin' || 
           (user?.role === 'base_commander' && base.id === user?.base_id);
  };

  if (loading && bases.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Bases Management
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
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.is_active}
                  label="Status"
                  onChange={(e) => setFilters({ ...filters, is_active: e.target.value })}
                >
                  <MenuItem value="">All Status</MenuItem>
                  <MenuItem value="true">Active</MenuItem>
                  <MenuItem value="false">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Commander</InputLabel>
                <Select
                  value={filters.commander_id}
                  label="Commander"
                  onChange={(e) => setFilters({ ...filters, commander_id: e.target.value })}
                >
                  <MenuItem value="">All Commanders</MenuItem>
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.first_name} {user.last_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
          disabled={user?.role !== 'admin'}
        >
          New Base
        </Button>
      </Box>

      {/* Bases Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Base Name</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Commander</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bases.map((base) => (
              <TableRow key={base.id}>
                <TableCell>
                  <Typography variant="body2" fontWeight="bold">
                    {base.name}
                  </Typography>
                </TableCell>
                <TableCell>{base.code}</TableCell>
                <TableCell>{base.location}</TableCell>
                <TableCell>
                  {base.commander_name || 'No Commander Assigned'}
                </TableCell>
                <TableCell>
                  <Chip
                    label={base.is_active ? 'Active' : 'Inactive'}
                    color={base.is_active ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{formatDate(base.created_at)}</TableCell>
                <TableCell>
                  {canEdit(base) && (
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(base)}
                      title="Edit Base"
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                  {user?.role === 'admin' && (
                    <>
                      <IconButton
                        color={base.is_active ? 'warning' : 'success'}
                        onClick={() => handleToggleActive(base.id, base.is_active)}
                        title={base.is_active ? 'Deactivate' : 'Activate'}
                      >
                        <Chip
                          label={base.is_active ? 'Deactivate' : 'Activate'}
                          color={base.is_active ? 'warning' : 'success'}
                          size="small"
                        />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteBase(base.id)}
                        title="Delete Base"
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingBase ? 'Edit Base' : 'New Base'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Base Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Base Code *"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                helperText="Unique identifier for the base"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location *"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                helperText="Physical location or address"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Base Commander</InputLabel>
                <Select
                  value={formData.commander_id}
                  label="Base Commander"
                  onChange={(e) => setFormData({ ...formData, commander_id: e.target.value })}
                >
                  <MenuItem value="">No Commander</MenuItem>
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.first_name} {user.last_name} ({user.username})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCreateBase} variant="contained">
            {editingBase ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Bases; 