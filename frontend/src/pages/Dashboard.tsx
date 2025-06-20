import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Inventory,
  ShoppingCart,
  SwapHoriz,
  Assignment,
  RemoveCircle,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext.tsx';

interface DashboardMetrics {
  opening_balance: number;
  closing_balance: number;
  net_movement: number;
  purchases: number;
  transfers_in: number;
  transfers_out: number;
  assigned: number;
  expended: number;
}

interface Base {
  id: string;
  name: string;
}

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bases, setBases] = useState<Base[]>([]);
  const [selectedBase, setSelectedBase] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { user } = useAuth();

  const fetchMetrics = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedBase) params.append('base_id', selectedBase);
      if (startDate) params.append('start_date', startDate.toISOString().split('T')[0]);
      if (endDate) params.append('end_date', endDate.toISOString().split('T')[0]);

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/dashboard/summary`, { params });
      setMetrics(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch dashboard metrics');
    } finally {
      setLoading(false);
    }
  }, [selectedBase, startDate, endDate]);

  useEffect(() => {
    const fetchBases = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/bases`);
        setBases(response.data.data);
      } catch (err) {
        console.error("Failed to fetch bases");
      }
    };

    fetchMetrics();
    if(user?.role === 'admin') {
      fetchBases();
    }
  }, [fetchMetrics, user?.role]);

  const handleFilterSubmit = () => {
    fetchMetrics();
  }

  const handleClearFilters = () => {
    setSelectedBase('');
    setStartDate(null);
    setEndDate(null);
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!metrics) {
    return null;
  }

  const chartData = [
    { name: 'Purchases', value: metrics.purchases, color: '#3b82f6' },
    { name: 'Transfers In', value: metrics.transfers_in, color: '#10b981' },
    { name: 'Transfers Out', value: metrics.transfers_out, color: '#f59e0b' },
    { name: 'Expended', value: metrics.expended, color: '#ef4444' },
  ];

  const MetricCard: React.FC<{
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
    trend?: 'up' | 'down' | 'neutral';
  }> = ({ title, value, icon, color, trend }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
              {value.toLocaleString()}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: color,
              borderRadius: '50%',
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        </Box>
        {trend && (
          <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
            {trend === 'up' ? (
              <TrendingUp sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
            ) : trend === 'down' ? (
              <TrendingDown sx={{ color: 'error.main', fontSize: 16, mr: 0.5 }} />
            ) : null}
            <Typography variant="caption" color="textSecondary">
              {trend === 'up' ? 'Increasing' : trend === 'down' ? 'Decreasing' : 'Stable'}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Dashboard
      </Typography>

      {/* Filter Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Filters</Typography>
          <Grid container spacing={2} alignItems="center">
            {user?.role === 'admin' && (
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="base-select-label">Base</InputLabel>
                  <Select
                    labelId="base-select-label"
                    value={selectedBase}
                    label="Base"
                    onChange={(e) => setSelectedBase(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>All Bases</em>
                    </MenuItem>
                    {bases.map((base) => (
                      <MenuItem key={base.id} value={base.id}>{base.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid item xs={12} sm={user?.role === 'admin' ? 3 : 4}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                />
              </Grid>
              <Grid item xs={12} sm={user?.role === 'admin' ? 3 : 4}>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                />
              </Grid>
            </LocalizationProvider>
            <Grid item xs={12} sm={2}>
              <Button variant="contained" onClick={handleFilterSubmit} fullWidth>Apply</Button>
            </Grid>
            <Grid item xs={12} sm={2}>
               <Button variant="outlined" onClick={handleClearFilters} fullWidth>Clear</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Opening Balance"
            value={metrics.opening_balance}
            icon={<Inventory sx={{ color: 'white' }} />}
            color="#1e3a8a"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Closing Balance"
            value={metrics.closing_balance}
            icon={<Inventory sx={{ color: 'white' }} />}
            color="#1e40af"
            trend={metrics.closing_balance > metrics.opening_balance ? 'up' : 'down'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Net Movement"
            value={metrics.net_movement}
            icon={<SwapHoriz sx={{ color: 'white' }} />}
            color="#3b82f6"
            trend={metrics.net_movement > 0 ? 'up' : 'down'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Assigned Assets"
            value={metrics.assigned}
            icon={<Assignment sx={{ color: 'white' }} />}
            color="#dc2626"
          />
        </Grid>
      </Grid>

      {/* Detailed Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Purchases"
            value={metrics.purchases}
            icon={<ShoppingCart sx={{ color: 'white' }} />}
            color="#3b82f6"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Transfers In"
            value={metrics.transfers_in}
            icon={<TrendingUp sx={{ color: 'white' }} />}
            color="#10b981"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Transfers Out"
            value={metrics.transfers_out}
            icon={<TrendingDown sx={{ color: 'white' }} />}
            color="#f59e0b"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Expended"
            value={metrics.expended}
            icon={<RemoveCircle sx={{ color: 'white' }} />}
            color="#ef4444"
          />
        </Grid>
      </Grid>

      {/* Chart */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          Asset Movement Overview
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* Summary */}
      <Box sx={{ mt: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Summary
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                <Chip
                  label={`Net Movement: ${metrics.net_movement > 0 ? '+' : ''}${metrics.net_movement}`}
                  color={metrics.net_movement > 0 ? 'success' : 'error'}
                  size="small"
                  sx={{ mr: 1 }}
                />
              </Box>
              <Typography variant="body2" color="textSecondary">
                Total assets added: {metrics.purchases + metrics.transfers_in}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total assets removed: {metrics.transfers_out + metrics.expended}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="textSecondary">
                Balance change: {metrics.closing_balance - metrics.opening_balance > 0 ? '+' : ''}
                {metrics.closing_balance - metrics.opening_balance}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Currently assigned: {metrics.assigned} assets
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard; 