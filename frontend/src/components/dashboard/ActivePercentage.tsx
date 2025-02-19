import React from 'react';
import { Card, Typography, Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const ProgressCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const ActivePercentage: React.FC = () => {
  const percentage = 85;

  return (
    <ProgressCard>
      <Typography variant="h6" gutterBottom>
        Portfolio Health
      </Typography>
      <Box sx={{ position: 'relative', display: 'inline-flex', my: 2 }}>
        <CircularProgress
          variant="determinate"
          value={percentage}
          size={120}
          thickness={4}
          color="success"
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h4" component="div" color="text.secondary">
            {percentage}%
          </Typography>
        </Box>
      </Box>
      <Typography color="textSecondary" align="center">
        Healthy Portfolio Performance
      </Typography>
    </ProgressCard>
  );
};

export default ActivePercentage; 