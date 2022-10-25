import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import Paper from '@mui/material/Paper';
import { ReportProblem, EditLocation, People } from '@mui/icons-material/';
import zombie from '../../img/zombie.png'
import { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import sobreviventesService from '../../providers/http-service/sobreviventesService';
import { useLoader } from '../../providers/loading/LoadingProvider';


const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '26px'
}

function Sobreviventes() {

  const [sobreviventes, setSobreviventes] = useState([])

  const {startLoader, stopLoader} = useLoader()

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

  return (
    <>
      <h4 style={styles}>
        <People />
        Sobreviventes
      </h4>

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
              {sobreviventes.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.nome}</TableCell>
                  <TableCell align="center">
                    {row.estaInfectado ?
                      <img style={{ width: '2em' }} src={zombie} /> :
                      'Não'}
                  </TableCell>
                  <TableCell align="center">{row.countAlertInfected}</TableCell>
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
    </>
  );
}

export default Sobreviventes