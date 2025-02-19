import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
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
import { StyledCard } from './StyledComponents.tsx';
import StatsOverview from './StatsOverview.tsx';
import PortfolioStats from './PortfolioStats.tsx';
import RecentTransactions from './RecentTransactions.tsx';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const chartData = {
    labels: ['1', '5', '10', '15', '20', '25', '30'],
    datasets: [
      {
        label: 'Total Visits',
        data: [140, 180, 150, 220, 180, 250, 190],
        borderColor: '#6C5DD3',
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Chart Section */}
        <Grid item xs={12}>
          <StyledCard>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Portfolio Overview</Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Previous Month
                </Typography>
                <Typography variant="body2">March 2024</Typography>
              </Box>
            </Box>
            <Box sx={{ height: 300 }}>
              <Line data={chartData} options={chartOptions} />
            </Box>
          </StyledCard>
        </Grid>

        {/* Stats Overview */}
        <Grid item xs={12}>
          <StatsOverview />
        </Grid>

        {/* Portfolio Stats */}
        <Grid item xs={12} md={8}>
          <PortfolioStats />
        </Grid>

        {/* Recent Transactions */}
        <Grid item xs={12} md={4}>
          <RecentTransactions />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 