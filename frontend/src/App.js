import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CreateUser from './components/createUser';
import UpdateUser from './components/updateUser';
// import GetUser from './components/getUser';
import DeleteUser from './components/deleteUser';
import './App.css';

function App() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" align="center" gutterBottom>
          User Management
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CreateUser />
          </Grid>
          <Grid item xs={12} md={6}>
            <UpdateUser />
          </Grid>
          <Grid item xs={12} md={6}>
            <DeleteUser />
          </Grid>
          {/* <Grid item xs={12}>
            <GetUser />
          </Grid> */}
        </Grid>
      </Box>
    </Container>
  );
}

export default App;