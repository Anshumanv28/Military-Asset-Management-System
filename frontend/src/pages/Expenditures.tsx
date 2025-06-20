import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Expenditures: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Expenditures Management
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">
          Expenditures management page - Track asset consumption and expenditures.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Expenditures; 