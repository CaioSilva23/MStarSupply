import * as React from 'react';
import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import { getMercadoriasApi, deleteMercadoriaApi } from '../../services/api';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Modal from '@mui/material/Modal';
import CadastrarMercadoria from "./CadastrarMercadoria"
import EditarMercadoria from "./EditarMercadoria"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const columns = [
  { id: 'nome', label: 'Nome', minWidth: 170 },
  {
    id: 'descricao',
    label: 'Descricao',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('pt-br'),
  },
  {
    id: 'tipo',
    label: 'Tipo',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('pt-br'),
  },  
  {
    id: 'fabricante',
    label: 'Fabricante',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('pt-br'),
  },
  {
    id: 'numero_registro',
    label: 'Numero do Registro',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('pt-br'),
  },
  {
    label: 'Ações',
    minWidth: 170,
    align: 'left',
  },
];


export default function ListarMercadorias() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [mercadorias, setMercadorias] = useState([]);
  const [formEdit, setFormEdit] = useState("")


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [openEdit, setOpenEdit] = useState(false)
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const AlertDeletarMercadoria = (id) => {
    Swal.fire({
      title: "Tem certeza ?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar!",
    }).then((result) => {
      if (result.value) {
        deletar(id);
      }
    });
  };

  const deletar = async (id) => {
    try {
        const response = await deleteMercadoriaApi(id);
        Swal.fire("Deletado!", "A mercadoria foi excluída..", "success");
    } catch (error) {
        Swal.fire("Erro!", error.response.data.message, "error");
    } finally {
    
    }
    fetchMercadorias();
  };

  const filterData = (v) => {
    if (v) {
      setMercadorias([v]);
    } else {
        setMercadorias([]);
        fetchMercadorias();
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


  const editData = (data) => {
    console.log(data)

    setFormEdit(data);
    handleOpenEdit();
  }


  useEffect(() => {
    fetchMercadorias();
  }, []);

  return (
    <>
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CadastrarMercadoria closeEvent={handleClose} buscar={fetchMercadorias} />
        </Box>
      </Modal>
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditarMercadoria closeEvent={handleCloseEdit} mercadoria={formEdit} buscar={fetchMercadorias}/>
        </Box>
      </Modal>
    </div>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "20px" }}
          >
            Mercadorias cadastradas
        </Typography>
        <Divider />
          <Box height={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={mercadorias}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
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
            <Button variant="contained" onClick={handleOpen} endIcon={<AddCircleIcon />}>
              Novo
            </Button>
          </Stack>
          <Box height={10} />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
          <TableRow>
            <TableCell align="left">Nome</TableCell>
            <TableCell align="left">Descrição</TableCell>
            <TableCell align="left">Estoque</TableCell>
            <TableCell align="left">Tipo</TableCell>
            <TableCell align="left">Fabricante</TableCell>
            <TableCell align="left">Número de registro</TableCell>
            <TableCell align="left">Acões</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
            {mercadorias.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.nome}
                  </TableCell>
                  <TableCell align="left">{row.descricao}</TableCell>
                  <TableCell align="left">{row.quantidade}</TableCell>
                  <TableCell align="left">{row.tipo}</TableCell>
                  <TableCell align="left">{row.fabricante}</TableCell>
                  <TableCell align="left">{row.numero_registro}</TableCell>
                  <TableCell align="left">
                    <Stack spacing={2} direction="row">
                      <EditIcon
                        style={{
                          fontSize: "20px",
                          color: "blue",
                          cursor: "pointer",
                        }}
                        className="cursor-pointer"
                        onClick={() => {
                            editData(row)
                        }}
                      />
                      <DeleteIcon
                        style={{
                          fontSize: "20px",
                          color: "darkred",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          AlertDeletarMercadoria(row.id);
                        }}
                      />
                          </Stack>
                  </TableCell>
                </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={mercadorias.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>

  );
}
