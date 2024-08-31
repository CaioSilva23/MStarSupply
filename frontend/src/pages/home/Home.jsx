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
import { getMercadoriasApi, getOperacoesMesApi } from '../../services/api';
import Loading from "../../components/Loading";


export default function Home() {
  const [mercadorias, setMercadorias] = useState([]) 
  const [operacoesMes, setOperacoesMEs] = useState([])
  const [id, setId] = useState("")
  const [loading, setLoading] = useState(true);

  const data = [
    ["Mes", "Entrada", "Saida"],
    ["2014", 1000, 400],
    ["2015", 1170, 460],
    ["2016", 660, 1120],
    ["2017", 1030, 540],
  ];


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

        // Transformar os dados recebidos no formato desejado
        const formattedData = [
            ["Mes", "Entrada", "Saida"],
            ...response.data.map(item => [item.mes, item.entrada, item.saida])
        ];

        // Definir o estado com os dados formatados
        setOperacoesMEs(formattedData);
        setLoading(false);
    } catch (error) {
        console.error('Erro ao buscar mercadorias:', error);
    } finally {
        // Código opcional a ser executado independentemente do resultado
    }
};
  const mudarID = (newValue) => {
    setId(newValue);
  };
  // 
  console.log(operacoesMes)

  useEffect(()=> {
    fetchMercadorias();
    fetchOperacoesMes(id);
  }, [id])


  if (loading) {
    return <Loading />;
  }

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
                  mudarID(newValue ? newValue.id : "");
                }} 
                // onChange={(e, v) => setId(v.id)}
                // value={mercadorias[0]}
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
                  <ChartBar data={operacoesMes}></ChartBar>
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
        <Grid/>
    </Box>
   </>
   {/* <div className='bgColor'>
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
      </div> */}
   </>
  );
}

