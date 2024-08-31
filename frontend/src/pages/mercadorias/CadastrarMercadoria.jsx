import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Swal from "sweetalert2";
import {postMercadoriasApi} from '../../services/api';
import FormControl from '@mui/material/FormControl';
import { useAppStore } from '../../appStore';

export default function CadastrarMercadoria({closeEvent, buscar}) {

  const [nome, setNome] = useState(null)
  const [descricao, setDescricao] = useState(null)
  const [tipo, setTipo] = useState(null)
  const [fabricante, setFabricante] = useState(null)
  const [numero_registro, setNumeroRegistro] = useState(null)
  const setMercadorias = useAppStore((state) => state.setRows)


  const cadastrar = async () => {
    
    
    if (!nome || !descricao || !tipo || !fabricante || !numero_registro) {
      closeEvent();
      Swal.fire("Erro!", "Preencha todos os campos!", "warning");
      return
    };

    const nova_mercadoria = {
      nome: nome,
      descricao: descricao,
      tipo: tipo,
      fabricante: fabricante,
      numero_registro: numero_registro
    }
    try {
      const response = await postMercadoriasApi(nova_mercadoria);
      closeEvent();
      Swal.fire("Sucesso", "A mercadoria foi cadastrada com sucesso!", "success");
      buscar();
    } catch (error) {
        console.log(error)
        closeEvent();
        Swal.fire("Erro!", "Erro ao tentar cadastrar a mercadoria, tente novamente.", "error");
    } finally {
    
    }
  };

  return (
   <>
    <Box sx={{m: 2}}/>
     <Typography variant='h5' align="center">
      Nova Mercadoria
     </Typography>
    <IconButton
      style={{position: "absolute", top: "0", right: "0"}}
      onClick={closeEvent}
    >
      <CloseIcon />
    </IconButton>
    <Box height={20}/>
    <Grid container spacing={2}>
    <FormControl margin="dense" fullWidth variant="outlined">
      <TextField
        size="small"
        fullWidth
        label="Nome"
        variant="outlined"
        onChange={(event) => setNome(event.target.value)}
        value={nome || ""}
      />
    </FormControl>
    <FormControl margin="dense" fullWidth variant="outlined">
      <TextField
        size="small"
        fullWidth
        label="Descrição"
        variant="outlined"
        onChange={(event) => setDescricao(event.target.value)}
        value={descricao || ""}
      />
    </FormControl>
    <FormControl margin="dense" fullWidth variant="outlined">
      <TextField
        size="small"
        fullWidth
        label="Tipo"
        variant="outlined"
        onChange={(event) => setTipo(event.target.value)}
        value={tipo || ""}
      />
    </FormControl>
    <FormControl margin="dense" fullWidth variant="outlined">
      <TextField
        size="small"
        fullWidth
        label="Fabricante"
        variant="outlined"
        onChange={(event) => setFabricante(event.target.value)}
        value={fabricante || ""}
      />
    </FormControl>
    <FormControl margin="dense" fullWidth variant="outlined">
      <TextField
        size="small"
        fullWidth
        label="Número de registro"
        variant="outlined"
        onChange={(event) => setNumeroRegistro(event.target.value)}
        value={numero_registro || ""}
      />
    </FormControl>
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