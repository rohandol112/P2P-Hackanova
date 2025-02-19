import React from 'react';
import {
  Box,
  Card,
  Typography,
  Grid,
  LinearProgress,
  styled,
} from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const RiskIndicator = styled(Box)<{ risk: 'low' | 'medium' | 'high' }>(
  ({ theme, risk }) => ({
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 
      risk === 'low' ? theme.palette.success.dark :
      risk === 'medium' ? theme.palette.warning.dark :
      theme.palette.error.dark,
    color: theme.palette.common.white,
  })
);

interface RiskAssessmentProps {
  riskScore: number;
  creditScore: number;
  debtToIncome: number;
  paymentHistory: number;
}

const RiskAssessment: React.FC<RiskAssessmentProps> = ({
  riskScore,
  creditScore,
  debtToIncome,
  paymentHistory,
}) => {
  const getRiskLevel = (score: number) => {
    if (score >= 80) return 'low';
    if (score >= 50) return 'medium';
    return 'high';
  };

  const chartData = {
    labels: ['Credit Score', 'Payment History', 'Debt-to-Income'],
    datasets: [{
      data: [creditScore, paymentHistory, 100 - debtToIncome],
      backgroundColor: [
        '#4CAF50',
        '#2196F3',
        '#FFC107',
      ],
    }],
  };

  return (
    <StyledCard>
      <Typography variant="h6" gutterBottom>
        Risk Assessment
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <RiskIndicator risk={getRiskLevel(riskScore)}>
            <Typography variant="subtitle2">
              Overall Risk Score
            </Typography>
            <Typography variant="h4">
              {riskScore}%
            </Typography>
          </RiskIndicator>

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Credit Score
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={creditScore / 8.5}
              sx={{ height: 8, mb: 2 }}
            />

            <Typography variant="subtitle2" gutterBottom>
              Debt-to-Income Ratio
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={debtToIncome}
              sx={{ height: 8, mb: 2 }}
            />

            <Typography variant="subtitle2" gutterBottom>
              Payment History
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={paymentHistory}
              sx={{ height: 8 }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ height: 300 }}>
            <Doughnut 
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </StyledCard>
  );
};

export default RiskAssessment; 