import React, { useState } from 'react';
import {
  Box,
  Card,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Button,
  Typography,
  styled,
  MenuItem,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/index.ts';
import { createLoan } from '../../store/slices/loanSlice.ts';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const steps = ['Loan Details', 'Personal Information', 'Documents'];

interface LoanFormData {
  amount: string;
  term: string;
  purpose: string;
  employmentStatus: string;
  monthlyIncome: string;
  documents: FileList | null;
}

const LoanApplication: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [activeStep, setActiveStep] = useState(0);
  const [loanData, setLoanData] = useState<LoanFormData>({
    amount: '',
    term: '',
    purpose: '',
    employmentStatus: '',
    monthlyIncome: '',
    documents: null,
  });

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      await dispatch(createLoan(loanData));
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Loan Amount"
              type="number"
              value={loanData.amount}
              onChange={(e) => setLoanData({ ...loanData, amount: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              select
              label="Loan Term"
              value={loanData.term}
              onChange={(e) => setLoanData({ ...loanData, term: e.target.value })}
              sx={{ mb: 2 }}
            >
              <MenuItem value="12">12 months</MenuItem>
              <MenuItem value="24">24 months</MenuItem>
              <MenuItem value="36">36 months</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Purpose of Loan"
              value={loanData.purpose}
              onChange={(e) => setLoanData({ ...loanData, purpose: e.target.value })}
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 3 }}>
            <TextField
              fullWidth
              select
              label="Employment Status"
              value={loanData.employmentStatus}
              onChange={(e) => setLoanData({ ...loanData, employmentStatus: e.target.value })}
              sx={{ mb: 2 }}
            >
              <MenuItem value="employed">Employed</MenuItem>
              <MenuItem value="self-employed">Self Employed</MenuItem>
              <MenuItem value="business-owner">Business Owner</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Monthly Income"
              type="number"
              value={loanData.monthlyIncome}
              onChange={(e) => setLoanData({ ...loanData, monthlyIncome: e.target.value })}
            />
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 3 }}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ height: 100 }}
            >
              Upload Documents
              <input
                type="file"
                hidden
                multiple
                onChange={(e) => setLoanData({ ...loanData, documents: e.target.files })}
              />
            </Button>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Apply for Loan
      </Typography>
      <Box>
        {/* Add loan application form here */}
      </Box>
    </Card>
  );
};

export default LoanApplication; 