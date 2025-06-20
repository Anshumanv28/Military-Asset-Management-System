import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Purchases: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Purchases Management
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">
          Purchases management page - Record and track asset purchases.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Purchases; 