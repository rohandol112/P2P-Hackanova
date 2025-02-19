import React from 'react';
import { Card, Box, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const VisitStats: React.FC = () => {
  const data = {
    labels: Array.from({ length: 30 }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Total Visits',
        data: Array.from({ length: 30 }, () => 
          Math.floor(Math.random() * 100000) + 150000
        ),
        borderColor: '#6C5DD3',
        tension: 0.4,
        fill: false,
      },
      {
        label: 'Previous Month',
        data: Array.from({ length: 30 }, () => 
          Math.floor(Math.random() * 100000) + 140000
        ),
        borderColor: '#404348',
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        grid: {
          color: '#2A2D31',
        },
        ticks: {
          color: '#A0A3BD',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#A0A3BD',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Card sx={{ p: 3, height: '400px' }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Total Visits</Typography>
        <Typography variant="h6" color="primary">
          220,342,123
        </Typography>
      </Box>
      <Box sx={{ height: 'calc(100% - 60px)' }}>
        <Line data={data} options={options} />
      </Box>
    </Card>
  );
};

export default VisitStats; 