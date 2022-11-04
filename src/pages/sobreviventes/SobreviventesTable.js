import { EditLocation, ReportProblem } from "@mui/icons-material"
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material"
import zombie from '../../img/zombie.png'

function SobreviventesTable({
    sobreviventes,
    openDetails,
    openAlertaInfeccao
}) {
  return (
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
                    <Button sx={{ textTransform: 'none' }} onClick={() => openDetails(sobrevivente)}>
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
                        <IconButton onClick={() => openAlertaInfeccao(sobrevivente.id)} disabled={sobrevivente.estaInfectado} aria-label="report" color="error">
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
  )
}

export default SobreviventesTable