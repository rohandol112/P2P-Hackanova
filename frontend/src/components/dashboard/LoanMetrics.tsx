import React from 'react';
import { Card, Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const MetricCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
}));

const LoanMetrics: React.FC = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <MetricCard>
          <Typography color="textSecondary" gutterBottom>
            Total Loans
          </Typography>
          <Typography variant="h4">
            $125,000
          </Typography>
          <Typography color="success.main" sx={{ mt: 1 }}>
            +15% from last month
          </Typography>
        </MetricCard>
      </Grid>
      <Grid item xs={12} md={4}>
        <MetricCard>
          <Typography color="textSecondary" gutterBottom>
            Active Loans
          </Typography>
          <Typography variant="h4">
            24
          </Typography>
          <Typography color="success.main" sx={{ mt: 1 }}>
            98% repayment rate
          </Typography>
        </MetricCard>
      </Grid>
      <Grid item xs={12} md={4}>
        <MetricCard>
          <Typography color="textSecondary" gutterBottom>
            Average Interest Rate
          </Typography>
          <Typography variant="h4">
            8.5%
          </Typography>
          <Typography color="textSecondary" sx={{ mt: 1 }}>
            Market average: 10.2%
          </Typography>
        </MetricCard>
      </Grid>
    </Grid>
  );
};

export default LoanMetrics; 