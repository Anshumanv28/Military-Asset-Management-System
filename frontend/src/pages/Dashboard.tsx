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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Inventory,
  ShoppingCart,
  SwapHoriz,
  Assignment,
  RemoveCircle,
  CheckCircle,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext.tsx';
import FilterBar from '../components/FilterBar.tsx';

interface DashboardMetrics {
  opening_balance: number;
  closing_balance: number;
  net_movement: number;
  total_assets: number;
  available_assets: number;
  assigned_assets: number;
  maintenance_assets: number;
  purchased_assets: number;
  transfers_in: number;
  transfers_out: number;
  expended_assets: number;
}

interface MovementDetail {
  id: string;
  name: string;
  serial_number?: string;
  asset_type_name: string;
  base_name?: string;
  from_base_name?: string;
  to_base_name?: string;
  date: string;
}

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showMovementDetails, setShowMovementDetails] = useState(false);
  const [movementDetails, setMovementDetails] = useState<{
    purchased_assets: MovementDetail[];
    transfers_in: MovementDetail[];
    transfers_out: MovementDetail[];
  }>({ purchased_assets: [], transfers_in: [], transfers_out: [] });
  const { user } = useAuth();

  // Applied filter states (used for actual API calls)
  const [appliedBase, setAppliedBase] = useState('');
  const [appliedStartDate, setAppliedStartDate] = useState<Date | null>(null);
  const [appliedEndDate, setAppliedEndDate] = useState<Date | null>(null);
  const [appliedAssetType, setAppliedAssetType] = useState('');

  const fetchMetrics = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (appliedBase) params.append('base_id', appliedBase);
      if (appliedStartDate) params.append('start_date', appliedStartDate.toISOString().split('T')[0]);
      if (appliedEndDate) params.append('end_date', appliedEndDate.toISOString().split('T')[0]);
      if (appliedAssetType) params.append('asset_type_id', appliedAssetType);

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/dashboard/summary`, { params });
      setMetrics(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch dashboard metrics');
    } finally {
      setLoading(false);
    }
  }, [appliedBase, appliedStartDate, appliedEndDate, appliedAssetType]);

  const fetchMovementDetails = async () => {
    try {
      const params = new URLSearchParams();
      if (appliedBase) params.append('base_id', appliedBase);
      if (appliedStartDate) params.append('start_date', appliedStartDate.toISOString().split('T')[0]);
      if (appliedEndDate) params.append('end_date', appliedEndDate.toISOString().split('T')[0]);
      if (appliedAssetType) params.append('asset_type_id', appliedAssetType);

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/dashboard/movements`, { params });
      setMovementDetails(response.data.data);
    } catch (err: any) {
      console.error('Failed to fetch movement details:', err);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  const handleFiltersChange = (filters: {
    base_id: string;
    asset_type_id: string;
    start_date: Date | null;
    end_date: Date | null;
  }) => {
    setAppliedBase(filters.base_id);
    setAppliedStartDate(filters.start_date);
    setAppliedEndDate(filters.end_date);
    setAppliedAssetType(filters.asset_type_id);
  };

  const handleNetMovementClick = async () => {
    await fetchMovementDetails();
    setShowMovementDetails(true);
  };

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
    { name: 'Available', value: metrics.available_assets, color: '#10b981' },
    { name: 'Assigned', value: metrics.assigned_assets, color: '#3b82f6' },
    { name: 'Expended', value: metrics.expended_assets, color: '#ef4444' },
    { name: 'Total', value: metrics.total_assets, color: '#1e40af' },
  ];

  const MetricCard: React.FC<{
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
    trend?: 'up' | 'down' | 'neutral';
    onClick?: () => void;
  }> = ({ title, value, icon, color, trend, onClick }) => (
    <Card sx={{ height: '100%', cursor: onClick ? 'pointer' : 'default' }} onClick={onClick}>
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Assets Dashboard
        </Typography>
        <Button
          variant="outlined"
          onClick={fetchMetrics}
          disabled={loading}
        >
          Refresh
        </Button>
      </Box>

      {/* Filter Section */}
      <FilterBar
        onFiltersChange={handleFiltersChange}
        title="Dashboard Filters"
      />

      {/* Main Metrics Grid */}
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
            icon={<CheckCircle sx={{ color: 'white' }} />}
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
            onClick={handleNetMovementClick}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Assets"
            value={metrics.total_assets}
            icon={<Inventory sx={{ color: 'white' }} />}
            color="#dc2626"
          />
        </Grid>
      </Grid>

      {/* Asset Status Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Available Assets"
            value={metrics.available_assets}
            icon={<CheckCircle sx={{ color: 'white' }} />}
            color="#10b981"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Assigned Assets"
            value={metrics.assigned_assets}
            icon={<Assignment sx={{ color: 'white' }} />}
            color="#3b82f6"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="In Maintenance"
            value={metrics.maintenance_assets}
            icon={<RemoveCircle sx={{ color: 'white' }} />}
            color="#f59e0b"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Purchased (Period)"
            value={metrics.purchased_assets}
            icon={<ShoppingCart sx={{ color: 'white' }} />}
            color="#8b5cf6"
          />
        </Grid>
      </Grid>

      {/* Movement Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
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
            title="Expended (Period)"
            value={metrics.expended_assets}
            icon={<RemoveCircle sx={{ color: 'white' }} />}
            color="#ef4444"
          />
        </Grid>
      </Grid>

      {/* Chart */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Asset Status Distribution</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Movement Details Dialog */}
      <Dialog
        open={showMovementDetails}
        onClose={() => setShowMovementDetails(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Movement Details</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>Purchased Assets</Typography>
            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Asset Name</TableCell>
                    <TableCell>Serial Number</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Base</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {movementDetails.purchased_assets.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.serial_number || 'N/A'}</TableCell>
                      <TableCell>{item.asset_type_name}</TableCell>
                      <TableCell>{item.base_name}</TableCell>
                      <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Typography variant="h6" gutterBottom>Transfers In</Typography>
            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Asset Name</TableCell>
                    <TableCell>Serial Number</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>From Base</TableCell>
                    <TableCell>To Base</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {movementDetails.transfers_in.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.serial_number || 'N/A'}</TableCell>
                      <TableCell>{item.asset_type_name}</TableCell>
                      <TableCell>{item.from_base_name}</TableCell>
                      <TableCell>{item.to_base_name}</TableCell>
                      <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Typography variant="h6" gutterBottom>Transfers Out</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Asset Name</TableCell>
                    <TableCell>Serial Number</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>From Base</TableCell>
                    <TableCell>To Base</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {movementDetails.transfers_out.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.serial_number || 'N/A'}</TableCell>
                      <TableCell>{item.asset_type_name}</TableCell>
                      <TableCell>{item.from_base_name}</TableCell>
                      <TableCell>{item.to_base_name}</TableCell>
                      <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowMovementDetails(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard; 