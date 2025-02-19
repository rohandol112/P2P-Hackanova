import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Button,
  TextField,
  Grid,
  CircularProgress,
  Alert,
  styled,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { processPayment } from '../../store/slices/loanSlice.ts';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const PaymentProcessing: React.FC<{ loanId: string; dueAmount: number }> = ({ 
  loanId, 
  dueAmount 
}) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(dueAmount.toString());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    setError('');
    try {
      await dispatch(processPayment({
        loanId,
        amount: Number(amount)
      }));
      setSuccess(true);
    } catch (err) {
      setError('Payment processing failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <StyledCard>
      <Typography variant="h6" gutterBottom>
        Process Payment
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Payment processed successfully!
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Payment Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            fullWidth
            onClick={handlePayment}
            disabled={loading}
            sx={{ height: '56px' }}
          >
            {loading ? <CircularProgress size={24} /> : 'Process Payment'}
          </Button>
        </Grid>
      </Grid>
    </StyledCard>
  );
};

export default PaymentProcessing; 