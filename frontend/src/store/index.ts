import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice.ts';
import { loanReducer } from './slices/loanSlice.ts';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    loans: loanReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 