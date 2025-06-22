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
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  KeyboardReturn as KeyboardReturnIcon,
} from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext.tsx';

interface Assignment {
  id: string;
  asset_id: string;
  asset_name: string;
  asset_serial_number: string;
  personnel_id: string;
  personnel_name: string;
  personnel_rank: string;
  assigned_by: string;
  base_id: string;
  base_name: string;
  assignment_date: string;
  return_date?: string;
  status: 'active' | 'returned' | 'lost' | 'damaged' | 'partially_returned';
  quantity: number;
  returned_quantity: number;
  notes?: string;
  created_at: string;
}

interface Asset {
  id: string;
  name: string;
  serial_number: string;
  status: string;
  available_quantity: number;
  current_base_id: string;
}

interface Personnel {
  id: string;
  first_name: string;
  last_name: string;
  rank: string;
  base_id: string;
}

interface Base {
  id: string;
  name: string;
}

interface CreateAssignmentForm {
  asset_id: string;
  personnel_id: string;
  base_id: string;
  assignment_date: string;
  quantity: number;
  notes: string;
}

const Assignments: React.FC = () => {
  const { user } = useAuth();
  const [allAssignments, setAllAssignments] = useState<Assignment[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [personnel, setPersonnel] = useState<Personnel[]>([]);
  const [bases, setBases] = useState<Base[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [returnDialog, setReturnDialog] = useState(false);
  const [returningAssignment, setReturningAssignment] = useState<Assignment | null>(null);
  const [returnQuantity, setReturnQuantity] = useState(1);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [formData, setFormData] = useState<CreateAssignmentForm>({
    asset_id: '',
    personnel_id: '',
    base_id: '',
    assignment_date: '',
    quantity: 1,
    notes: '',
  });

  // Client-side filters
  const [filters, setFilters] = useState({
    base_id: '',
    status: '',
    asset_id: '',
    personnel_id: '',
  });

  // Fetch all assignments once
  const fetchAllAssignments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/assignments?limit=1000`);
      setAllAssignments(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch assignments');
    } finally {
      setLoading(false);
    }
  };

  const fetchAssets = async () => {
    try {
      let url = `${process.env.REACT_APP_API_URL}/assets?status=available&limit=1000`;
      
      // For non-admin users, filter by their base
      if (user?.role !== 'admin' && user?.base_id) {
        url += `&base_id=${user.base_id}`;
      }
      
      const response = await axios.get(url);
      setAssets(response.data.data);
    } catch (err: any) {
      console.error('Failed to fetch assets:', err);
    }
  };

  const fetchPersonnel = async () => {
    try {
      let url = `${process.env.REACT_APP_API_URL}/personnel?limit=1000`;
      
      // For non-admin users, filter by their base
      if (user?.role !== 'admin' && user?.base_id) {
        url += `&base_id=${user.base_id}`;
      }
      
      const response = await axios.get(url);
      setPersonnel(response.data.data);
    } catch (err: any) {
      console.error('Failed to fetch personnel:', err);
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
    fetchAllAssignments();
    fetchAssets();
    fetchPersonnel();
    fetchBases();
  }, []);

  // Filter personnel by selected base
  const filteredPersonnel = useMemo(() => {
    if (user?.role === 'admin') {
      // For admins, filter by selected base
      if (formData.base_id) {
        return personnel.filter(person => person.base_id === formData.base_id);
      }
      return personnel;
    } else {
      // For non-admin users, filter by their base
      return personnel.filter(person => person.base_id === user?.base_id);
    }
  }, [personnel, formData.base_id, user?.role, user?.base_id]);

  // Filter assets by selected base
  const filteredAssets = useMemo(() => {
    if (user?.role === 'admin') {
      // For admins, filter by selected base
      if (formData.base_id) {
        return assets.filter(asset => asset.current_base_id === formData.base_id);
      }
      return assets;
    } else {
      // For non-admin users, filter by their base
      return assets.filter(asset => asset.current_base_id === user?.base_id);
    }
  }, [assets, formData.base_id, user?.role, user?.base_id]);

  // Client-side filtering
  const filteredAssignments = useMemo(() => {
    return allAssignments.filter(assignment => {
      if (filters.base_id && assignment.base_id !== filters.base_id) return false;
      if (filters.status && assignment.status !== filters.status) return false;
      if (filters.asset_id && assignment.asset_id !== filters.asset_id) return false;
      if (filters.personnel_id && assignment.personnel_id !== filters.personnel_id) return false;
      return true;
    });
  }, [allAssignments, filters]);

  // Pagination
  const paginatedAssignments = useMemo(() => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredAssignments.slice(start, end);
  }, [filteredAssignments, page, rowsPerPage]);

  const handleOpenDialog = (assignment?: Assignment) => {
    if (assignment) {
      setEditingAssignment(assignment);
      setFormData({
        asset_id: assignment.asset_id,
        personnel_id: assignment.personnel_id,
        base_id: assignment.base_id,
        assignment_date: assignment.assignment_date,
        quantity: assignment.quantity,
        notes: assignment.notes || '',
      });
    } else {
      setEditingAssignment(null);
      // Set default base for non-admin users
      const defaultBaseId = user?.role !== 'admin' ? user?.base_id || '' : '';
      setFormData({
        asset_id: '',
        personnel_id: '',
        base_id: defaultBaseId,
        assignment_date: new Date().toISOString().split('T')[0],
        quantity: 1,
        notes: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingAssignment(null);
    setFormData({
      asset_id: '',
      personnel_id: '',
      base_id: '',
      assignment_date: '',
      quantity: 1,
      notes: '',
    });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        asset_id: formData.asset_id,
        assigned_to: formData.personnel_id,
        base_id: user?.role !== 'admin' ? user?.base_id : formData.base_id,
        assignment_date: formData.assignment_date,
        quantity: formData.quantity,
        notes: formData.notes,
      };

      console.log('Form data:', formData);
      console.log('Payload being sent:', payload);
      console.log('User role:', user?.role);
      console.log('User base_id:', user?.base_id);

      if (editingAssignment) {
        await axios.put(`${process.env.REACT_APP_API_URL}/assignments/${editingAssignment.id}`, payload);
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/assignments`, payload);
      }

      handleCloseDialog();
      fetchAllAssignments();
    } catch (err: any) {
      console.error('Assignment creation error:', err.response?.data);
      setError(err.response?.data?.error || 'Failed to save assignment');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/assignments/${id}`);
        fetchAllAssignments();
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to delete assignment');
      }
    }
  };

  const handleReturn = async (assignment: Assignment) => {
    setReturningAssignment(assignment);
    setReturnQuantity(1);
    setReturnDialog(true);
  };

  const handleReturnSubmit = async () => {
    if (!returningAssignment) return;

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/assignments/${returningAssignment.id}/return`, {
        quantity: returnQuantity,
      });
      setReturnDialog(false);
      setReturningAssignment(null);
      fetchAllAssignments();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to return assignment');
    }
  };

  const handleReturnCancel = () => {
    setReturnDialog(false);
    setReturningAssignment(null);
  };

  const handleClearFilters = () => {
    setFilters({
      base_id: '',
      status: '',
      asset_id: '',
      personnel_id: '',
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'primary';
      case 'returned':
        return 'success';
      case 'lost':
        return 'error';
      case 'damaged':
        return 'warning';
      case 'partially_returned':
        return 'info';
      default:
        return 'default';
    }
  };

  const canReturn = (assignment: Assignment) => {
    return assignment.status === 'active' && assignment.quantity > assignment.returned_quantity;
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
      <Typography variant="h4" gutterBottom>
        Assignments
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Filters */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={user?.role === 'admin' ? 3 : 4}>
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
            <Grid item xs={12} sm={user?.role === 'admin' ? 3 : 4}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status}
                  label="Status"
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                >
                  <MenuItem value="">All Statuses</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="returned">Returned</MenuItem>
                  <MenuItem value="lost">Lost</MenuItem>
                  <MenuItem value="damaged">Damaged</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={user?.role === 'admin' ? 3 : 4}>
              <FormControl fullWidth>
                <InputLabel>Asset</InputLabel>
                <Select
                  value={filters.asset_id}
                  label="Asset"
                  onChange={(e) => setFilters({ ...filters, asset_id: e.target.value })}
                >
                  <MenuItem value="">All Assets</MenuItem>
                  {assets.map((asset) => (
                    <MenuItem key={asset.id} value={asset.id}>
                      {asset.name} ({asset.serial_number})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={user?.role === 'admin' ? 3 : 4}>
              <FormControl fullWidth>
                <InputLabel>Personnel</InputLabel>
                <Select
                  value={filters.personnel_id}
                  label="Personnel"
                  onChange={(e) => setFilters({ ...filters, personnel_id: e.target.value })}
                >
                  <MenuItem value="">All Personnel</MenuItem>
                  {personnel.map((person) => (
                    <MenuItem key={person.id} value={person.id}>
                      {person.first_name} {person.last_name} ({person.rank})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Button variant="outlined" onClick={handleClearFilters}>
              Clear Filters
            </Button>
            <Typography variant="body2" sx={{ alignSelf: 'center', ml: 2 }}>
              Showing {filteredAssignments.length} of {allAssignments.length} assignments
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
          New Assignment
        </Button>
      </Box>

      {/* Assignments Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Asset</TableCell>
              <TableCell>Personnel</TableCell>
              <TableCell>Base</TableCell>
              <TableCell>Assignment Date</TableCell>
              <TableCell>Return Date</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Returned</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedAssignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell>
                  <Box>
                    <Typography variant="body2" fontWeight="bold">
                      {assignment.asset_name}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {assignment.asset_serial_number}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" fontWeight="bold">
                      {assignment.personnel_name}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {assignment.personnel_rank}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{assignment.base_name}</TableCell>
                <TableCell>{formatDate(assignment.assignment_date)}</TableCell>
                <TableCell>
                  {assignment.return_date ? formatDate(assignment.return_date) : '-'}
                </TableCell>
                <TableCell>{assignment.quantity}</TableCell>
                <TableCell>{assignment.returned_quantity}</TableCell>
                <TableCell>
                  <Chip
                    label={assignment.status}
                    color={getStatusColor(assignment.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(assignment)}
                    color="primary"
                    title="Edit"
                  >
                    <EditIcon />
                  </IconButton>
                  {canReturn(assignment) && (
                    <IconButton
                      size="small"
                      onClick={() => handleReturn(assignment)}
                      color="success"
                      title="Return"
                    >
                      <KeyboardReturnIcon />
                    </IconButton>
                  )}
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(assignment.id)}
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
          count={filteredAssignments.length}
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
          {editingAssignment ? 'Edit Assignment' : 'New Assignment'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {user?.role === 'admin' && (
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Base</InputLabel>
                  <Select
                    value={formData.base_id}
                    label="Base"
                    onChange={(e) => {
                      const newBaseId = e.target.value;
                      setFormData({ 
                        ...formData, 
                        base_id: newBaseId,
                        personnel_id: '', // Clear personnel when base changes
                        asset_id: '' // Clear asset when base changes
                      });
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
            )}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Asset</InputLabel>
                <Select
                  value={formData.asset_id}
                  label="Asset"
                  onChange={(e) => setFormData({ ...formData, asset_id: e.target.value })}
                  disabled={user?.role === 'admin' && !formData.base_id}
                >
                  {filteredAssets.map((asset) => (
                    <MenuItem key={asset.id} value={asset.id}>
                      {asset.name} ({asset.serial_number})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Personnel</InputLabel>
                <Select
                  value={formData.personnel_id}
                  label="Personnel"
                  onChange={(e) => setFormData({ ...formData, personnel_id: e.target.value })}
                  disabled={user?.role === 'admin' && !formData.base_id}
                >
                  {filteredPersonnel.map((person) => (
                    <MenuItem key={person.id} value={person.id}>
                      {person.first_name} {person.last_name} ({person.rank})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Assignment Date"
                  value={formData.assignment_date ? new Date(formData.assignment_date) : null}
                  onChange={(date) => setFormData({ 
                    ...formData, 
                    assignment_date: date ? date.toISOString().split('T')[0] : '' 
                  })}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                inputProps={{ min: 1 }}
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
          <Button onClick={handleSubmit} variant="contained">
            {editingAssignment ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Return Dialog */}
      <Dialog open={returnDialog} onClose={handleReturnCancel} maxWidth="md" fullWidth>
        <DialogTitle>Return Assignment</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Typography variant="body1">
                Are you sure you want to return this assignment?
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Return Quantity"
                type="number"
                value={returnQuantity}
                onChange={(e) => setReturnQuantity(parseInt(e.target.value) || 1)}
                inputProps={{ min: 1 }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReturnCancel}>Cancel</Button>
          <Button onClick={handleReturnSubmit} variant="contained">
            Return
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Assignments; 