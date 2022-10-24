import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import Paper from '@mui/material/Paper';
import { ReportProblem, EditLocation, People } from '@mui/icons-material/';
import zombie from '../../img/zombie.png'

const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '26px'
}

const styledZombie = {
  
}

function Sobreviventes() {

  const rows = [
    {
      id: 1,
      nome: 'Rubem',
      infectado: true,
      alertas: 3
    },
    {
      id: 1,
      nome: 'Rubem',
      infectado: true,
      alertas: 3
    }
  ];

  return (
    <>
      <h4 style={styles}>
        <People />
        Sobreviventes
      </h4>

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
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.nome}</TableCell>
                <TableCell align="center">
                  {row.infectado ? 
                  <img style={{ width: '2em' }} src={zombie} /> :
                  'Não'}
                </TableCell>
                <TableCell align="center">{row.alertas}</TableCell>
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
    </>
  );
}

export default Sobreviventes