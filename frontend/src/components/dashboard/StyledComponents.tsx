import { styled } from '@mui/material/styles';
import { Card, Box } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  background: theme.palette.background.paper,
  boxShadow: 'none',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 16,
}));

export const StatCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
})); 