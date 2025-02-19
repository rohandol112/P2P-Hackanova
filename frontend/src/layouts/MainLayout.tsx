import React from 'react';
import { Box, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header.tsx';
import Sidebar from '../components/common/Sidebar.tsx';

const MainContainer = styled(Box)(({ theme }) => ({
  paddingLeft: 240,
  paddingTop: 64,
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const MainLayout: React.FC = () => {
  return (
    <Box>
      <Header />
      <Sidebar />
      <MainContainer>
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </MainContainer>
    </Box>
  );
};

export default MainLayout; 