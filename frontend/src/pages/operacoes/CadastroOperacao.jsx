import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Swal from "sweetalert2";
import {getMercadoriasApi, postOperacoesApi} from '../../services/api';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';


export default function CadastrarOperacao({closeEvent, buscar}) {

  const [tipoOperacao, setTipoOperacao] = useState(null)
  const [quantidade, setQuantidade] = useState(null)
  const [local, setLocal] = useState(null)
  const [dataHora, setDataHora] = useState(null)
  const [mercadoriaId, setMercadoriaId] = useState(null)
  const [mercadorias, setMercadorias] = useState([])
  const [loading, setLoading] = useState(true);


  const cadastrar = async () => {

    if (!tipoOperacao || !quantidade || !local || !dataHora || !mercadoriaId) {
      alert("Preencha todos os campos!")
      return
    };

    const nova_operacao = {
        tipo_operacao: tipoOperacao,
        quantidade: quantidade,
        local: local,
        data_hora: dataHora,
        mercadoria_id: mercadoriaId
      };
    
    try {
      const response = await postOperacoesApi(nova_operacao);
      closeEvent();
      Swal.fire("Sucesso", "Operacao realizada com sucesso!", "success");
      buscar();
    } catch (error) {
        closeEvent();
        Swal.fire("Erro!", "Erro ao tentar cadastrar a mercadoria, tente novamente.", "error");
    } finally {
    
    }
  };

  const fetchMercadorias = async () => {
    try {
      const response = await getMercadoriasApi();
      setMercadorias(response.data);
    } catch (error) {
      console.error('Erro ao buscar mercadorias:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchMercadorias();
  }, []);

  console.log(mercadorias)
  return (
   <>
    <Box sx={{m: 2}}/>
     <Typography variant='h5' align="center">
      Nova Operacao
     </Typography>
    <IconButton
      style={{position: "absolute", top: "0", right: "0"}}
      onClick={closeEvent}
    >
      <CloseIcon />
    </IconButton>
    <Box height={20}/>
    <Grid container spacing={2}>
    <FormControl fullWidth variant="outlined">
        <InputLabel id="demo-simple-select-label">Mercadoria</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={mercadoriaId}
            label="Mercadoria"
            onChange={(event) => setMercadoriaId(event.target.value)}
            >
            {mercadorias.map((row) => (
                <MenuItem key={row.id} value={row.id}>
                {row.nome}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
    <FormControl fullWidth variant="outlined">
        <InputLabel id="demo-simple-select-label">Mercadoria</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tipoOperacao}
            label="Tipo de operacao"
            onChange={(event) => setTipoOperacao(event.target.value)}
            >
            <MenuItem value="entrada">ENTRADA</MenuItem>
            <MenuItem value="saida">SAIDA</MenuItem>
        </Select>
    </FormControl>
    <FormControl margin="dense" fullWidth variant="outlined">
      <TextField
        size="small"
        fullWidth
        defaultValue={0}
        type="number"
        label="Quantidade"
        variant="outlined"
        onChange={(event) => setQuantidade(event.target.value)}
        value={quantidade}
      />
    </FormControl>
    <FormControl margin="dense" fullWidth variant="outlined">
      <TextField
        size="small"
        fullWidth
        label="Local"
        variant="outlined"
        onChange={(event) => setLocal(event.target.value)}
        value={local}
      />
    </FormControl>
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      <TextField
        fullWidth
        id="data_hora"
        label="Data e hora"
        type="datetime-local"
        defaultValue="2024-01-01T00:00"
        onChange={(event) => setDataHora(event.target.value)}
        value={dataHora}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ // Apply additional styling if needed
          // Add styles specific to TextField here if necessary
        }}
      />
    </div>
    <Grid item xs={12}>
      <Typography variant='h5' align="center">
        <Button variant='contained' onClick={cadastrar}>
          Cadastrar
        </Button>
      </Typography>
      </Grid>
    </Grid>
    <Box sx={{m: 4}}/>
   </>
  );
}