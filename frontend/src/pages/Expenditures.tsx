import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  IconButton,
  Alert,
  Card,
  CardContent,
  CircularProgress
} from '@mui/material';
import {
  Delete as DeleteIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext.tsx';
import FilterBar from '../components/FilterBar.tsx';

declare const process: {
  env: {
    REACT_APP_API_URL: string;
  };
};

interface Expenditure {
  id: string;
  asset_name: string;
  base_id: string;
  base_name: string;
  personnel_id?: string;
  personnel_first_name?: string;
  personnel_last_name?: string;
  personnel_rank?: string;
  quantity: number;
  expenditure_date: string;
  reason: string;
  authorized_by: string;
  notes?: string;
  created_by: string;
  created_at: string;
}

const Expenditures: React.FC = () => {
  const [expenditures, setExpenditures] = useState<Expenditure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  // Filters
  const [filters, setFilters] = useState({
    base_id: '',
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

  useEffect(() => {
    fetchExpenditures();
  }, [fetchExpenditures]);

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

  const handleFiltersChange = (filters: {
    base_id: string;
  }) => {
    setFilters({
      base_id: filters.base_id || '',
      start_date: '',
      end_date: ''
    });
    setPage(0); // Reset to first page when filters change
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
          <FilterBar
            onFiltersChange={handleFiltersChange}
            title="Expenditure Filters"
          />
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Typography variant="body2" sx={{ alignSelf: 'center', ml: 2 }}>
              Showing {expenditures.length} expenditures
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Expenditures Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Asset Name</TableCell>
                <TableCell>Base</TableCell>
                <TableCell>Personnel</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Expenditure Date</TableCell>
                {user?.role === 'admin' && <TableCell>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {expenditures.map((expenditure) => (
                <TableRow key={expenditure.id} hover>
                  <TableCell>{expenditure.asset_name}</TableCell>
                  <TableCell>{expenditure.base_name}</TableCell>
                  <TableCell>
                    {expenditure.personnel_first_name && expenditure.personnel_last_name ? (
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          {expenditure.personnel_first_name} {expenditure.personnel_last_name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {expenditure.personnel_rank}
                        </Typography>
                      </Box>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        Direct expenditure
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="right">{(expenditure.quantity || 0).toLocaleString()}</TableCell>
                  <TableCell>{expenditure.reason}</TableCell>
                  <TableCell>{formatDate(expenditure.expenditure_date)}</TableCell>
                  {user?.role === 'admin' && (
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteExpenditure(expenditure.id)}
                        color="error"
                        title="Delete"
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
    </Box>
  );
};

export default Expenditures; 