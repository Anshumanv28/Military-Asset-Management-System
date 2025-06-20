import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Assignments: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Assignments Management
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">
          Assignments management page - Track asset assignments to personnel.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Assignments; 