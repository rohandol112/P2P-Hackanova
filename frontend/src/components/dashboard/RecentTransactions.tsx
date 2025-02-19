import React from 'react';
import { Box, Typography, Avatar, Chip } from '@mui/material';
import { StyledCard } from './StyledComponents.tsx';

const RecentTransactions: React.FC = () => {
  const transactions = [
    {
      id: 1,
      user: 'John Doe',
      amount: '$1,200',
      type: 'Investment',
      status: 'completed',
      date: '2024-03-15',
    },
    // Add more transactions
  ];

  return (
    <StyledCard>
      <Typography variant="h6" gutterBottom>
        Recent Transactions
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {transactions.map((transaction) => (
          <Box
            key={transaction.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 1,
              borderRadius: 1,
              '&:hover': {
                bgcolor: 'background.default',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar>{transaction.user[0]}</Avatar>
              <Box>
                <Typography variant="body2">{transaction.user}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {transaction.type}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body2">{transaction.amount}</Typography>
              <Chip
                label={transaction.status}
                size="small"
                color={transaction.status === 'completed' ? 'success' : 'warning'}
                sx={{ mt: 0.5 }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </StyledCard>
  );
};

export default RecentTransactions; 