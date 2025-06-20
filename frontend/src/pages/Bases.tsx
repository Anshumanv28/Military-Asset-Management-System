import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Bases: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Bases Management
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">
          Bases management page - Manage military base information.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Bases; 