import React, { useEffect, useState } from 'react';
import Sidenav from '../../components/Sidenav';
import Navbar from "../../components/Navbar"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ChartBar from "../../components/ChartBar"
import PieChart from "../../components/PieChart"
import { getMercadoriasApi, getOperacoesMesApi, getOperacoesTotaisApi, getMercadoriasByIdApi } from '../../services/api';
import Loading from "../../components/Loading";


export default function Home() {
  const [mercadorias, setMercadorias] = useState([]) 
  const [mercadoriaAtual, setMercadoriaAtual] = useState([])
  const [operacoesMes, setOperacoesMEs] = useState([])
  const [operacoesTotais, setOperacoesTotais] = useState([])
  const [id, setId] = useState("")
  const [loading, setLoading] = useState(true);
    


  // const handreMercadoria ((event)=> {
  //     mudarID(event.target.value);
  // })

  const fetchMercadorias = async () => {
    try {
      const response = await getMercadoriasApi();
      setMercadorias(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar mercadorias:', error);
    } finally {
    }
  };

  const fetchOperacoesMes = async (id) => {
    try {
        const response = await getOperacoesMesApi(id);
        const formattedData = [
            ["Mes", "Entrada", "Saida"],
            ...response.data.map(item => [item.mes, item.entrada, item.saida])
        ];

        setOperacoesMEs(formattedData);
        setLoading(false);
    } catch (error) {
        console.error('Erro ao buscar mercadorias:', error);
    }
  };

  const fetchOperacoesTotais = async () => {
    try {
        const response = await getOperacoesTotaisApi();

        const formattedData = [
            ["Mercadoria", "Entrada", "Saida"],
            ...response.data.map(item => [item.mercadoria, item.entrada, item.saida])
        ];

        setOperacoesTotais(formattedData);
        setLoading(false);
    } catch (error) {
        console.error('Erro ao buscar mercadorias:', error);
    }
  };
  const mudarID = (newValue) => {
    setId(newValue.id);
    setMercadoriaAtual(newValue.nome)
  };
  
  useEffect(()=> {
    fetchOperacoesTotais();
    fetchMercadorias();
    fetchOperacoesMes(id);
  }, [id])


  return (
   <>
   <>
    <Navbar/>
    <Box height={70}/>
    <Box sx={{ display: 'flex' }}>
      <Sidenav />
      <Grid container spacing={2}></Grid>
      <Box component="main" sx={{flexGrow: 1, p: 3}}>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Box height={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={mercadorias}
                sx={{ width: 300 }}
                value={id ? mercadorias.find(item => item.id === id) : null}
                onChange={(event, newValue) => {
                  mudarID(newValue ? newValue : "");
                }} 
                getOptionLabel={(rows) => rows.nome || ""}
                renderInput={(params) => (
                  <TextField {...params} size="small" label="Procurar mercadoria" />
                )}
              />
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              ></Typography>
    
            </Stack>
          <Box height={10} />
        </Paper>
        <Box height={30}/>
        <Grid container spacing={2}>
            <Grid size={8}>
              <Card sx={{ height: 60 + "vh" }}>
                <CardContent>
                  <ChartBar data={operacoesMes} mes={true} nome={mercadoriaAtual}></ChartBar>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={4}>
            <Card sx={{ height: 60 + "vh" }}>
                <CardContent>
                  <PieChart></PieChart>
                </CardContent>
              </Card>
            </Grid>
        </Grid>
        <Divider />
        <br></br>
        <Grid container spacing={2}>
            <Grid size={12}>
              <Card sx={{ height: 60 + "vh" }}>
                <CardContent>
                  <ChartBar data={operacoesTotais} mes={false}></ChartBar>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
      </Box>
      <Grid/>
    </Box>
   </>
   </>
  );
}

