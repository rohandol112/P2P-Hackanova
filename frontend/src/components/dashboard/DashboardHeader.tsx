import React from 'react';
import { Box, Typography, Button, styled } from '@mui/material';

const HeaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

const DashboardHeader: React.FC = () => {
  return (
    <HeaderWrapper>
      <Box>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome back! Here's your lending overview
        </Typography>
      </Box>
      <Button variant="contained" color="primary" href="/loans/apply">
        Apply for Loan
      </Button>
    </HeaderWrapper>
  );
};

export default DashboardHeader; 