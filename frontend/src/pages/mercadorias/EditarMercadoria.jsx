import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Swal from "sweetalert2";
import {updateMercadoriaApi} from '../../services/api';
import FormControl from '@mui/material/FormControl';

export default function EditarMercadoria({closeEvent, mercadoria, buscar}) {

  const [id, setId] = useState(null)
  const [nome, setNome] = useState(null)
  const [descricao, setDescricao] = useState(null)
  const [tipo, setTipo] = useState(null)
  const [fabricante, setFabricante] = useState(null)
  const [numero_registro, setNumeroRegistro] = useState(null)



  useEffect(() => {
    setId(mercadoria.id)
    setNome(mercadoria.nome)
    setDescricao(mercadoria.descricao)
    setTipo(mercadoria.tipo)
    setFabricante(mercadoria.fabricante)
    setNumeroRegistro(mercadoria.numero_registro)
  }, []);

  const editar = async () => {
        
    console.log(id)
    if (!nome || !descricao || !tipo || !fabricante || !numero_registro) {
      alert("Preencha todos os campos!")
      return
    };

    const data = {
      nome: nome,
      descricao: descricao,
      tipo: tipo,
      fabricante: fabricante,
      numero_registro: numero_registro
    }
    try {
      const response = await updateMercadoriaApi(id, data);
      closeEvent();
      Swal.fire("Sucesso", "A mercadoria foi editada com sucesso!", "success");
      buscar();
    } catch (error) {
        console.log(error)
        closeEvent();
        Swal.fire("Erro!", "Erro ao tentar editar a mercadoria, tente novamente.", "error");
    } finally {
    
    }
  };

  return (
   <>
    <Box sx={{m: 2}}/>
     <Typography variant='h5' align="center">
      Editar Mercadoria
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
        value={nome}
      />
    </FormControl>
    <FormControl margin="dense" fullWidth variant="outlined">
      <TextField
        size="small"
        fullWidth
        label="Descrição"
        variant="outlined"
        onChange={(event) => setDescricao(event.target.value)}
        value={descricao}
      />
    </FormControl>
    <FormControl margin="dense" fullWidth variant="outlined">
      <TextField
        size="small"
        fullWidth
        label="Tipo"
        variant="outlined"
        onChange={(event) => setTipo(event.target.value)}
        value={tipo}
      />
    </FormControl>
    <FormControl margin="dense" fullWidth variant="outlined">
      <TextField
        size="small"
        fullWidth
        label="Fabricante"
        variant="outlined"
        onChange={(event) => setFabricante(event.target.value)}
        value={fabricante}
      />
    </FormControl>
    <FormControl margin="dense" fullWidth variant="outlined">
      <TextField
        size="small"
        fullWidth
        label="Número de registro"
        variant="outlined"
        onChange={(event) => setNumeroRegistro(event.target.value)}
        value={numero_registro}
      />
    </FormControl>
    <Grid item xs={12}>
      <Typography variant='h5' align="center">
        <Button variant='contained' onClick={editar}>
          Editar
        </Button>
      </Typography>
      </Grid>
    </Grid>
    <Box sx={{m: 4}}/>
   </>
  );
}