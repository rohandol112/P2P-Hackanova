import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import LoanMetrics from '../../components/dashboard/LoanMetrics';
import ActivePercentage from '../../components/dashboard/ActivePercentage';
import PortfolioTracking from '../../components/p2p/PortfolioTracking';
import RiskAssessment from '../../components/p2p/RiskAssessment';

const Dashboard: React.FC = () => {
  const portfolioData = {
    totalInvested: 50000,
    totalReturns: 5500,
    activeInvestments: 12,
    averageROI: 11,
    recentTransactions: [],
    performanceHistory: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      values: [1000, 2000, 2500, 3000, 4000, 5500],
    },
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <LoanMetrics />
        </Grid>
        <Grid item xs={12} md={4}>
          <ActivePercentage />
        </Grid>
        <Grid item xs={12}>
          <PortfolioTracking portfolioData={portfolioData} />
        </Grid>
        <Grid item xs={12}>
          <RiskAssessment
            riskScore={75}
            creditScore={720}
            debtToIncome={30}
            paymentHistory={95}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 