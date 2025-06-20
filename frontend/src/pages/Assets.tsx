import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Assets: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Assets Management
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">
          Assets management page - View, create, and manage military assets.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Assets; 