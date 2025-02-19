import React from 'react';
import { Grid, Box, Typography, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { StyledCard } from './StyledComponents.tsx';

const StatBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const ProgressLabel = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 4,
});

const StatsOverview: React.FC = () => {
  const stats = [
    {
      label: 'Online',
      value: 179,
      total: 573,
      color: '#6C5DD3',
    },
    {
      label: 'Offline',
      value: 394,
      total: 573,
      color: '#FFB1B1',
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <StyledCard>
          <Typography variant="h6" gutterBottom>
            Active Percentage
          </Typography>
          <StatBox>
            <Box>
              <Typography variant="h3" gutterBottom>
                594
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Users
              </Typography>
            </Box>
            {stats.map((stat) => (
              <Box key={stat.label}>
                <ProgressLabel>
                  <Typography variant="body2">{stat.label}</Typography>
                  <Typography variant="body2">
                    {stat.value} users
                  </Typography>
                </ProgressLabel>
                <LinearProgress
                  variant="determinate"
                  value={(stat.value / stat.total) * 100}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'rgba(108, 93, 211, 0.2)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: stat.color,
                    },
                  }}
                />
              </Box>
            ))}
          </StatBox>
        </StyledCard>
      </Grid>
    </Grid>
  );
};

export default StatsOverview; 