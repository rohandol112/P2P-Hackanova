import React, { useEffect } from 'react';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  Chip,
  styled,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/index.ts';
import { fetchLoans } from '../../store/slices/loanSlice.ts';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const StatusChip = styled(Chip)<{ status: string }>(({ theme, status }) => ({
  backgroundColor: 
    status === 'active' ? theme.palette.success.main :
    status === 'pending' ? theme.palette.warning.main :
    theme.palette.error.main,
  color: '#fff',
}));

const LoanListing: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loans, loading } = useSelector((state: RootState) => state.loans);

  useEffect(() => {
    dispatch(fetchLoans());
  }, [dispatch]);

  return (
    <StyledCard>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Available Loans</Typography>
        <Button variant="contained" color="primary" href="/loans/new">
          Create Loan Request
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Amount</TableCell>
            <TableCell>Term</TableCell>
            <TableCell>Interest Rate</TableCell>
            <TableCell>Purpose</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loans.map((loan: any) => (
            <TableRow key={loan.id}>
              <TableCell>${loan.amount.toLocaleString()}</TableCell>
              <TableCell>{loan.term} months</TableCell>
              <TableCell>{loan.interestRate}%</TableCell>
              <TableCell>{loan.purpose}</TableCell>
              <TableCell>
                <StatusChip
                  label={loan.status}
                  status={loan.status}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  href={`/loans/${loan.id}`}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledCard>
  );
};

export default LoanListing; 