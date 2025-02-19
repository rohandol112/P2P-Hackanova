import React from 'react';
import {
  Box,
  Grid,
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
}));

const StatCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  backgroundColor: theme.palette.background.default,
}));

const LoanManagement: React.FC = () => {
  const { loans } = useSelector((state: RootState) => state.loans);
  
  const totalInvested = loans.reduce((acc, loan) => acc + loan.investedAmount, 0);
  const activeLoans = loans.filter(loan => loan.status === 'active').length;
  const totalEarnings = loans.reduce((acc, loan) => acc + loan.earnedInterest, 0);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StatCard>
            <Typography variant="subtitle2" color="text.secondary">
              Total Invested
            </Typography>
            <Typography variant="h4" sx={{ mt: 1 }}>
              ${totalInvested.toLocaleString()}
            </Typography>
          </StatCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard>
            <Typography variant="subtitle2" color="text.secondary">
              Active Loans
            </Typography>
            <Typography variant="h4" sx={{ mt: 1 }}>
              {activeLoans}
            </Typography>
          </StatCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard>
            <Typography variant="subtitle2" color="text.secondary">
              Total Earnings
            </Typography>
            <Typography variant="h4" sx={{ mt: 1 }}>
              ${totalEarnings.toLocaleString()}
            </Typography>
          </StatCard>
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
                {loans.slice(0, 5).map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell>{new Date(loan.date).toLocaleDateString()}</TableCell>
                    <TableCell>{loan.type}</TableCell>
                    <TableCell>${loan.amount.toLocaleString()}</TableCell>
                    <TableCell>{loan.status}</TableCell>
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

export default LoanManagement; 