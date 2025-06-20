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
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  FilterList as FilterIcon,
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
  status: 'active' | 'returned' | 'lost' | 'damaged';
  notes?: string;
  created_at: string;
}

interface Asset {
  id: string;
  name: string;
  serial_number: string;
  status: string;
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
  notes: string;
}

const steps = ['Request Submitted', 'Pending Approval', 'Approved', 'Completed'];

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [formData, setFormData] = useState<CreateAssignmentForm>({
    asset_id: '',
    personnel_id: '',
    base_id: '',
    assignment_date: '',
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
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/assets?status=available&limit=1000`);
      setAssets(response.data.data);
    } catch (err: any) {
      console.error('Failed to fetch assets:', err);
    }
  };

  const fetchPersonnel = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/personnel?limit=1000`);
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
    return filteredAssignments.slice(start, start + rowsPerPage);
  }, [filteredAssignments, page, rowsPerPage]);

  const handleOpenDialog = (assignment?: Assignment) => {
    if (assignment) {
      setEditingAssignment(assignment);
      setFormData({
        asset_id: assignment.asset_id,
        personnel_id: assignment.personnel_id,
        base_id: assignment.base_id,
        assignment_date: assignment.assignment_date,
        notes: assignment.notes || '',
      });
    } else {
      setEditingAssignment(null);
      setFormData({
        asset_id: '',
        personnel_id: '',
        base_id: '',
        assignment_date: '',
        notes: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingAssignment(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingAssignment) {
        await axios.put(`${process.env.REACT_APP_API_URL}/assignments/${editingAssignment.id}`, formData);
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/assignments`, formData);
      }
      fetchAllAssignments();
      handleCloseDialog();
    } catch (err: any) {
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

  const handleReturn = async (id: string) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/assignments/${id}/return`);
      fetchAllAssignments();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to return assignment');
    }
  };

  const handleClearFilters = () => {
    setFilters({
      base_id: '',
      status: '',
      asset_id: '',
      personnel_id: '',
    });
    setPage(0);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'returned':
        return 'info';
      case 'lost':
        return 'error';
      case 'damaged':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getActiveStep = (status: string) => {
    switch (status) {
      case 'active':
        return 1;
      case 'returned':
        return 2;
      case 'lost':
      case 'damaged':
        return 1; // Lost/Damaged stays at step 1
      default:
        return 0;
    }
  };

  const canReturn = (assignment: Assignment) => {
    return (
      assignment.status === 'active' &&
      (user?.role === 'admin' || 
       (user?.role === 'base_commander' && assignment.base_id === user?.base_id))
    );
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
        Asset Assignments
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
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status}
                  label="Status"
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                >
                  <MenuItem value="">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="returned">Returned</MenuItem>
                  <MenuItem value="lost">Lost</MenuItem>
                  <MenuItem value="damaged">Damaged</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
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
            <Grid item xs={12} sm={3}>
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
          disabled={user?.role === 'logistics_officer'}
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
                    disabled={user?.role === 'logistics_officer'}
                  >
                    <EditIcon />
                  </IconButton>
                  {canReturn(assignment) && (
                    <IconButton
                      size="small"
                      onClick={() => handleReturn(assignment.id)}
                      color="success"
                    >
                      <CheckCircleIcon />
                    </IconButton>
                  )}
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(assignment.id)}
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
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Asset</InputLabel>
                <Select
                  value={formData.asset_id}
                  label="Asset"
                  onChange={(e) => setFormData({ ...formData, asset_id: e.target.value })}
                >
                  {assets.map((asset) => (
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
                >
                  {personnel.map((person) => (
                    <MenuItem key={person.id} value={person.id}>
                      {person.first_name} {person.last_name} ({person.rank})
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
    </Box>
  );
};

export default Assignments; 