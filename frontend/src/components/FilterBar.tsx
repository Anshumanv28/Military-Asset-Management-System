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
import { useAuth } from '../contexts/AuthContext.tsx';
import { useData } from '../contexts/DataContext.tsx';

interface FilterBarProps {
  onFiltersChange: (filters: {
    base_id: string;
  }) => void;
  title?: string;
  initialFilterValues?: {
    base_id: string;
  };
}

const FilterBar: React.FC<FilterBarProps> = ({
  onFiltersChange,
  title = 'Filters',
  initialFilterValues
}) => {
  const [selectedBase, setSelectedBase] = useState(initialFilterValues?.base_id || '');
  const { user } = useAuth();
  const { bases } = useData();

  // Update internal state when initialFilterValues change
  useEffect(() => {
    if (initialFilterValues) {
      setSelectedBase(initialFilterValues.base_id || '');
    }
  }, [initialFilterValues]);

  // Set initial base for base commanders and logistics officers (but don't auto-apply)
  useEffect(() => {
    if ((user?.role === 'base_commander' || user?.role === 'logistics_officer') && user?.base_id && !selectedBase) {
      setSelectedBase(user.base_id);
    }
  }, [user?.role, user?.base_id, selectedBase]);

  const handleFilterSubmit = () => {
    onFiltersChange({
      base_id: selectedBase,
    });
  };

  const handleClearFilters = () => {
    setSelectedBase('');
    
    onFiltersChange({
      base_id: '',
    });
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Grid container spacing={2} alignItems="center">
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
          
          <Grid item xs={12} sm={2}>
            <Button variant="contained" onClick={handleFilterSubmit} fullWidth>
              Apply
            </Button>
          </Grid>
          <Grid item xs={12} sm={2}>
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