import React from 'react';
import { Box, Typography, Card, Grid } from '@mui/material';

const Profile: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            {/* Add profile content here */}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile; 