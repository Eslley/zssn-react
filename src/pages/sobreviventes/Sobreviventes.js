import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import Paper from '@mui/material/Paper';
import { ReportProblem, EditLocation, People } from '@mui/icons-material/';
import zombie from '../../img/zombie.png'
import { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import sobreviventesService from '../../providers/http-service/sobreviventesService';
import { useLoader } from '../../providers/loading/LoadingProvider';
import SobreviventeDetails from './SobreviventeDetails';
import PageTitle from '../../components/layout/PageTitle';

const nameButtonStyles = {
  textTransform: 'none'
}

function Sobreviventes() {

  const [sobreviventes, setSobreviventes] = useState([])

  const [detailsOpen, setDetailsOpen] = useState(false)

  const { startLoader, stopLoader } = useLoader()

  const [sobrevivente, setSobrevivente] = useState({})

  useEffect(() => {

    startLoader()

    sobreviventesService.listar()
      .then(res => {
        if (res.status === 200)
          setSobreviventes(res.data)


        stopLoader()

      })
      .catch(err => {
        console.log(err)
      })

  }, [])

  function openDetails(moreInfo) {
    setSobrevivente(moreInfo)
    setDetailsOpen(true)
  }

  return (
    <>
      <PageTitle title="Sobreviventes" icon={(<People />)} />

      {sobreviventes.length > 0 ? (
        <TableContainer sx={{ overflowX: 'hidden' }} component={Paper}>
          <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
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
                  <TableCell component="th" scope="row">
                    {sobrevivente.id}
                  </TableCell>
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
                      <IconButton aria-label="delete" color="primary">
                        <EditLocation />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Alertar infecção" arrow>
                      <IconButton aria-label="report" color="error">
                        <ReportProblem />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) :
        <Box>
          <p>Não há sobreviventes!</p>
        </Box>
      }

      {/* Component que exibe detalhes do sobrevivente */}
      <SobreviventeDetails sobrevivente={sobrevivente} detailsOpen={detailsOpen} setDetailsOpen={setDetailsOpen} />

    </>
  );
}

export default Sobreviventes