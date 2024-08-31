import React from 'react';
import Box from '@mui/material/Box';
import Sidenav from '../components/Sidenav';
import Navbar from "../components/Navbar"
import Grid from '@mui/material/Grid2';
import ListarMercadorias from './mercadorias/ListarMercadorias';

export default function Mercadorias() {
  return (
   <>
    <Navbar/>
    <Box height={70}/>
    <Box sx={{ display: 'flex' }}>
      <Sidenav />
      <Grid container spacing={2}></Grid>
      <Box component="main" sx={{flexGrow: 1, p: 3}}>
        <ListarMercadorias></ListarMercadorias>
        </Box>
        <Grid/>
    </Box>
   </>
  );
}