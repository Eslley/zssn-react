import { Button, Fab, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import Paper from '@mui/material/Paper';
import { ReportProblem, EditLocation, People, Add } from '@mui/icons-material/';
import zombie from '../../img/zombie.png'
import { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import sobreviventesService from '../../providers/http-service/sobreviventesService';
import { useLoader } from '../../components/loading/LoadingProvider';
import SobreviventeDetails from './SobreviventeDetails';
import PageTitle from '../../components/layout/PageTitle';
import SobreviventeForm from './SobreviventeForm';
import { useAlertMessage } from '../../components/alert/AlertMessageProvider';

const nameButtonStyles = {
  textTransform: 'none'
}

function Sobreviventes() {

  const [sobreviventes, setSobreviventes] = useState([])

  const [openForm, setOpenForm] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const { startLoader, stopLoader } = useLoader()

  const [sobrevivente, setSobrevivente] = useState({})

  const { showAlert }  = useAlertMessage()

  useEffect(() => {

    listarSobreviventes()

  }, [])

  function listarSobreviventes() {
    startLoader()

    sobreviventesService.listar()
      .then(res => {
        if (res.status === 200)
          setSobreviventes(res.data)


        stopLoader()

      })
      .catch(err => {
        console.log(err)
        showAlert('Erro', 'Erro ao acessar servidor!', 'error', 5000)
        stopLoader()
      })
  }

  function openDetails(moreInfo) {
    setSobrevivente(moreInfo)
    setDetailsOpen(true)
  }

  function handleOpenForm() {
    setOpenForm(true)
  }

  return (
    <>
      <PageTitle title="Sobreviventes" icon={(<People />)} />

      {sobreviventes.length > 0 && !openForm ? (
        <TableContainer sx={{ overflowX: 'hidden' }} component={Paper}>
          <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Nome</TableCell>
                <TableCell align="center">Infectado</TableCell>
                <TableCell align="center">Alertas</TableCell>
                <TableCell align="center">Opções</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sobreviventes.map((sobrevivente, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">
                    <Button style={nameButtonStyles} onClick={() => openDetails(sobrevivente)}>
                      {sobrevivente.nome}
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    {sobrevivente.estaInfectado ?
                      <img style={{ width: '2em' }} src={zombie} /> :
                      'Não'}
                  </TableCell>
                  <TableCell align="center">{sobrevivente.countAlertInfected}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Editar localização" arrow>
                      <span>
                      <IconButton disabled={sobrevivente.estaInfectado} aria-label="delete" color="primary">
                        <EditLocation />
                      </IconButton>
                      </span>
                    </Tooltip>

                    <Tooltip title="Alertar infecção" arrow>
                      <span>
                      <IconButton disabled={sobrevivente.estaInfectado} aria-label="report" color="error">
                        <ReportProblem />
                      </IconButton>
                      </span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) :
        <>
          {!openForm &&
            <Box>
              <p>Não há sobreviventes!</p>
            </Box>
          }
        </>
      }

      {!openForm &&
        <Box sx={{ mt: '2em', textAlign: 'center' }}>
          <Fab onClick={handleOpenForm} variant="extended" color="primary" aria-label="add">
            <Add />
            Adicionar Sobrevivente
          </Fab>
        </Box>
      }

      <SobreviventeForm open={openForm} setOpen={setOpenForm} atualizarSobreviventes={listarSobreviventes} />

      {/* Component que exibe detalhes do sobrevivente */}
      <SobreviventeDetails sobrevivente={sobrevivente} detailsOpen={detailsOpen} setDetailsOpen={setDetailsOpen} />

    </>
  );
}

export default Sobreviventes