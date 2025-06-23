import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { useAuth } from '../contexts/AuthContext.tsx';
import { useData } from '../contexts/DataContext.tsx';

interface FilterBarProps {
  onFiltersChange: (filters: {
    base_id: string;
    asset_type_id: string;
    start_date: Date | null;
    end_date: Date | null;
  }) => void;
  showAssetTypeFilter?: boolean;
  showDateFilters?: boolean;
  title?: string;
}

const FilterBar: React.FC<FilterBarProps> = ({
  onFiltersChange,
  showAssetTypeFilter = true,
  showDateFilters = true,
  title = 'Filters'
}) => {
  const [selectedBase, setSelectedBase] = useState('');
  const [selectedAssetType, setSelectedAssetType] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { user } = useAuth();
  const { bases, assetTypes } = useData();

  useEffect(() => {
    // For admin, set first base as default if no base is selected
    if (user?.role === 'admin' && bases.length > 0 && !selectedBase) {
      setSelectedBase(bases[0].id);
    }
  }, [user?.role, bases, selectedBase]);

  const handleFilterSubmit = () => {
    onFiltersChange({
      base_id: selectedBase,
      asset_type_id: selectedAssetType,
      start_date: startDate,
      end_date: endDate,
    });
  };

  const handleClearFilters = () => {
    setSelectedBase('');
    setStartDate(null);
    setEndDate(null);
    setSelectedAssetType('');
    
    onFiltersChange({
      base_id: '',
      asset_type_id: '',
      start_date: null,
      end_date: null,
    });
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Grid container spacing={2} alignItems="center">
          {user?.role === 'admin' && (
            <Grid item xs={12} sm={3}>
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
          
          {showAssetTypeFilter && (
            <Grid item xs={12} sm={user?.role === 'admin' ? 3 : 4}>
              <FormControl fullWidth>
                <InputLabel id="asset-type-select-label">Equipment Type</InputLabel>
                <Select
                  labelId="asset-type-select-label"
                  value={selectedAssetType}
                  label="Equipment Type"
                  onChange={(e) => setSelectedAssetType(e.target.value)}
                >
                  <MenuItem value="">
                    <em>All Equipment Types</em>
                  </MenuItem>
                  {assetTypes.map((assetType) => (
                    <MenuItem key={assetType.id} value={assetType.id}>{assetType.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
          
          {showDateFilters && (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid item xs={12} sm={user?.role === 'admin' ? 2 : 3}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                />
              </Grid>
              <Grid item xs={12} sm={user?.role === 'admin' ? 2 : 3}>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                />
              </Grid>
            </LocalizationProvider>
          )}
          
          <Grid item xs={12} sm={1}>
            <Button variant="contained" onClick={handleFilterSubmit} fullWidth>
              Apply
            </Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="outlined" onClick={handleClearFilters} fullWidth>
              Clear
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FilterBar; 