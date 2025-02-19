import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { StyledCard } from './StyledComponents.tsx';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const PortfolioStats: React.FC = () => {
  const stats = [
    {
      title: 'Total Investment',
      value: '$5,824,213',
      change: '+25%',
      isPositive: true,
    },
    {
      title: 'Active Loans',
      value: '394',
      change: '+12%',
      isPositive: true,
    },
    {
      title: 'Average ROI',
      value: '11.5%',
      change: '-2%',
      isPositive: false,
    },
  ];

  return (
    <StyledCard>
      <Typography variant="h6" gutterBottom>
        Portfolio Statistics
      </Typography>
      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} md={4} key={stat.title}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                {stat.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <Typography variant="h5">{stat.value}</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: stat.isPositive ? 'success.main' : 'error.main',
                    bgcolor: stat.isPositive ? 'success.lighter' : 'error.lighter',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                  }}
                >
                  <TrendingUpIcon fontSize="small" />
                  <Typography variant="body2">{stat.change}</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </StyledCard>
  );
};

export default PortfolioStats; 