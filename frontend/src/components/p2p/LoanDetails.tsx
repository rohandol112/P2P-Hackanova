import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Card,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  LinearProgress,
  styled,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/index.ts';
import { investInLoan } from '../../store/slices/loanSlice.ts';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const InfoItem = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const LoanDetails: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [loan, setLoan] = useState<any>(null);
  const [investDialogOpen, setInvestDialogOpen] = useState(false);
  const [investAmount, setInvestAmount] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // For testing, set dummy loan data
    setLoan({
      id: id,
      amount: 10000,
      term: 12,
      interestRate: 5,
      purpose: 'Business',
      status: 'active',
      fundedAmount: 5000
    });
  }, [id]);

  if (!loan) {
    return <div>Loading...</div>;
  }

  const handleInvest = async () => {
    setLoading(true);
    try {
      await dispatch(investInLoan({
        loanId: loan.id,
        amount: Number(investAmount)
      }));
      setInvestDialogOpen(false);
    } catch (error) {
      console.error('Investment failed:', error);
    }
    setLoading(false);
  };

  return (
    <>
      <StyledCard>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom>
              Loan Details
            </Typography>
            
            <InfoItem>
              <Typography variant="subtitle2" color="text.secondary">
                Amount Requested
              </Typography>
              <Typography variant="h6">
                ${loan.amount.toLocaleString()}
              </Typography>
            </InfoItem>

            <InfoItem>
              <Typography variant="subtitle2" color="text.secondary">
                Term Length
              </Typography>
              <Typography variant="h6">
                {loan.term} months
              </Typography>
            </InfoItem>

            <InfoItem>
              <Typography variant="subtitle2" color="text.secondary">
                Interest Rate
              </Typography>
              <Typography variant="h6">
                {loan.interestRate}%
              </Typography>
            </InfoItem>

            <InfoItem>
              <Typography variant="subtitle2" color="text.secondary">
                Purpose
              </Typography>
              <Typography variant="body1">
                {loan.purpose}
              </Typography>
            </InfoItem>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="h6" gutterBottom>
                Investment Summary
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Amount Funded
                </Typography>
                <Typography variant="h6">
                  ${loan.fundedAmount.toLocaleString()} / ${loan.amount.toLocaleString()}
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={(loan.fundedAmount / loan.amount) * 100}
                  sx={{ mt: 1 }}
                />
              </Box>
              <Button
                variant="contained"
                fullWidth
                onClick={() => setInvestDialogOpen(true)}
                disabled={loan.status !== 'active'}
              >
                Invest Now
              </Button>
            </Card>
          </Grid>
        </Grid>
      </StyledCard>

      <Dialog open={investDialogOpen} onClose={() => setInvestDialogOpen(false)}>
        <DialogTitle>Invest in Loan</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Investment Amount"
            type="number"
            fullWidth
            value={investAmount}
            onChange={(e) => setInvestAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInvestDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleInvest} 
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Confirm Investment'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoanDetails; 