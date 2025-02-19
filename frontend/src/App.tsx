import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
import { theme } from './theme.ts';

// Layouts
import MainLayout from './layouts/MainLayout.tsx';

// Pages
import Login from './pages/Auth/Login.tsx';
import Register from './pages/Auth/Register.tsx';
import Dashboard from './components/dashboard/Dashboard.tsx';
import LoanListing from './components/p2p/LoanListing.tsx';
import LoanDetails from './components/p2p/LoanDetails.tsx';
import LoanApplication from './components/p2p/LoanApplication.tsx';
import Profile from './pages/Profile.tsx';

// Components
import ProtectedRoute from './components/common/ProtectedRoute.tsx';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="loans" element={<LoanListing />} />
              <Route path="loans/:id" element={<LoanDetails />} />
              <Route path="loans/apply" element={<LoanApplication />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App; 