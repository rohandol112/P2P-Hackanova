import React from 'react';
import {
  Box,
  Card,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  styled,
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const MetricCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
}));

interface PortfolioTrackingProps {
  portfolioData: {
    totalInvested: number;
    totalReturns: number;
    activeInvestments: number;
    averageROI: number;
    recentTransactions: Array<{
      id: string;
      date: string;
      type: string;
      amount: number;
      status: string;
    }>;
    performanceHistory: {
      labels: string[];
      values: number[];
    };
  };
}

const PortfolioTracking: React.FC<PortfolioTrackingProps> = ({ portfolioData }) => {
  const chartData = {
    labels: portfolioData.performanceHistory.labels,
    datasets: [
      {
        label: 'Portfolio Value',
        data: portfolioData.performanceHistory.values,
        borderColor: '#6C5DD3',
        tension: 0.4,
      },
    ],
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <MetricCard>
            <Typography variant="subtitle2" color="text.secondary">
              Total Invested
            </Typography>
            <Typography variant="h4">
              ${portfolioData.totalInvested.toLocaleString()}
            </Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard>
            <Typography variant="subtitle2" color="text.secondary">
              Total Returns
            </Typography>
            <Typography variant="h4">
              ${portfolioData.totalReturns.toLocaleString()}
            </Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard>
            <Typography variant="subtitle2" color="text.secondary">
              Active Investments
            </Typography>
            <Typography variant="h4">
              {portfolioData.activeInvestments}
            </Typography>
          </MetricCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard>
            <Typography variant="subtitle2" color="text.secondary">
              Average ROI
            </Typography>
            <Typography variant="h4">
              {portfolioData.averageROI}%
            </Typography>
          </MetricCard>
        </Grid>

        <Grid item xs={12}>
          <StyledCard>
            <Typography variant="h6" gutterBottom>
              Portfolio Performance
            </Typography>
            <Box sx={{ height: 300 }}>
              <Line 
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </Box>
          </StyledCard>
        </Grid>

        <Grid item xs={12}>
          <StyledCard>
            <Typography variant="h6" gutterBottom>
              Recent Transactions
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {portfolioData.recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>${transaction.amount.toLocaleString()}</TableCell>
                    <TableCell>{transaction.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PortfolioTracking; 