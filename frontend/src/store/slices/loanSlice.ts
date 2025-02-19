import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface LoanState {
  loans: any[];
  loading: boolean;
  error: string | null;
}

const initialState: LoanState = {
  loans: [],
  loading: false,
  error: null,
};

export const fetchLoans = createAsyncThunk(
  'loans/fetchLoans',
  async () => {
    const response = await fetch('/api/loans');
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  }
);

export const createLoan = createAsyncThunk(
  'loans/createLoan',
  async (loanData: any) => {
    const response = await fetch('/api/loans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loanData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  }
);

export const investInLoan = createAsyncThunk(
  'loans/investInLoan',
  async ({ loanId, amount }: { loanId: string; amount: number }) => {
    const response = await fetch(`/api/loans/${loanId}/invest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  }
);

const loanSlice = createSlice({
  name: 'loans',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoans.fulfilled, (state, action) => {
        state.loading = false;
        state.loans = action.payload;
      })
      .addCase(fetchLoans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch loans';
      });
  },
});

export const { reducer: loanReducer } = loanSlice; 