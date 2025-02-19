import React from 'react';
import { Box, Card, Typography } from '@mui/material';

const Profile: React.FC = () => {
  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Profile
      </Typography>
      <Box>
        {/* Add profile content here */}
      </Box>
    </Card>
  );
};

export default Profile; 