import React from 'react';
import Sidenav from '../components/Sidenav';
import Navbar from "../components/Navbar"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import StorefrontIcon from '@mui/icons-material/Storefront';

export default function Home() {
  return (
   <>
   <div className='bgColor'>
    <Navbar/>
    <Box height={70}/>
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box component="main" sx={{flexGrow: 1, p: 3}}>
          <Box height={30}/>

          <Grid container spacing={2}>
            <Grid size={8}>
              <Card sx={{ height: 60 + "vh" }}>
                <CardContent>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={4}>
            <Card sx={{ height: 60 + "vh" }}>
                <CardContent>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
        </Box>
      </Box>
      </div>
   </>
  );
}

