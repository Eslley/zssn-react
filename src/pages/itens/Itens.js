import { useEffect, useState } from "react"
import { useLoader } from "../../components/loading/LoadingProvider"
import { Add, Delete, ViewList } from "@mui/icons-material";

import itensService from '../../providers/http-service/itensService';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from "@mui/material";
import PageTitle from "../../components/layout/PageTitle";
import { Box } from "@mui/system";
import { useAlertMessage } from "../../components/alert/AlertMessageProvider"


function Itens() {

  const { startLoader, stopLoader } = useLoader()
  const [itens, setItens] = useState([])
  const [item, setItem] = useState({})
  const [open, setOpen] = useState(false)
  const [openDialogForm, setOpenDialogForm] = useState(false)
  const { showAlert }  = useAlertMessage()

  useEffect(() => {
    startLoader()

    itensService.listar()
      .then(res => {
        if (res.status === 200) {

          setItens(res.data)

          stopLoader()
        }
      })
      .catch(err => console.log(err))

  }, [])

  const handleClickOpen = (item) => {
    setItem(item)
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setItem({})
  }

  function deleteItem(item) {
    handleClose()
    startLoader()

    itensService.deletar(item)
      .then(res => {
        
        const auxItens = itens.filter(e => {
          return e !== item
        })

        showAlert('','Item deletado com sucesso!','success', 4000)

        setItens(auxItens)
        stopLoader()
      })
      .catch(err => console.log(err))
  }

  function handleOpenDialogForm() {
    setOpenDialogForm(true)
  }

  function handleCloseDialogForm() {
    setOpenDialogForm(false)
    setItem({})
  }

  function addItem(item) {
    startLoader()
    handleCloseDialogForm()

    itensService.salvar(item)
      .then(res => {
        if (res.status === 201)
          console.log(res.data)
          itens.push(res.data)
          showAlert('','Item adicionado com sucesso!','success', 4000)

        stopLoader()
        setItem({})
      })
      .catch(err => console.log(err))
  }

  function handleChange(e) {
    setItem({ ...item, [e.target.name]: e.target.value })
}

  return (
    <>
      <PageTitle title="Itens" icon={(<ViewList />)} />

      {itens.length > 0 ? (
        <>
          <TableContainer sx={{ overflowX: 'hidden' }} component={Paper}>
            <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Itens</TableCell>
                  <TableCell align="center">Pontos</TableCell>
                  <TableCell align="center">Opções</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {itens.map((item, index) => (
                  <TableRow
                    key={index}>
                    <TableCell width='33%' component="th" align="center">
                      {item.nome}
                    </TableCell>
                    <TableCell width='33%' align="center">
                      {item.pontos}
                    </TableCell>
                    <TableCell width='33%' align="center">
                      <Tooltip title="Excluir item" arrow>
                        <IconButton aria-label="delete" color="error" onClick={() => handleClickOpen(item)}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ mt: '2em', textAlign: 'center' }}>
            <Fab onClick={handleOpenDialogForm} variant="extended" color="primary" aria-label="add">
              <Add />
              Adicionar Item
            </Fab>
          </Box>
        </>
      ) :
        <Box>
          <p>Não há itens!</p>
        </Box>
      }

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Excluir Item
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deseja realmente excluir esse item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Não</Button>
          <Button onClick={() => deleteItem(item)} autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialogForm} onClose={handleCloseDialogForm}>
        <DialogTitle>Adicionar Item</DialogTitle>
        <form>
        <DialogContent>
          
            <TextField
              autoFocus
              name="nome"
              label="Item"
              type="text"
              sx={{ width: '65%', mr: '.5em' }}
              onChange={handleChange}
              variant="standard"
            />
            <TextField
              autoFocus
              name="pontos"
              label="Pontos"
              type="number"
              sx={{ width: '30% ' }}
              onChange={handleChange}
              variant="standard"
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogForm}>Cancelar</Button>
          <Button disabled={item.nome === undefined || item.pontos === undefined} onClick={() => addItem(item)}>Salvar</Button>
        </DialogActions>
        </form>
      </Dialog>

    </>
  )
}

export default Itens