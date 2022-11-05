import { Search, SwapHoriz } from "@mui/icons-material"
import { Box, Card, CardContent, Divider, Fab, FormControl, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"

import { useAlertMessage } from "../../components/alert/AlertMessageProvider"
import PageTitle from "../../components/layout/PageTitle"
import { useLoader } from "../../components/loading/LoadingProvider"
import inventariosService from "../../providers/http-service/inventariosService"
import sobreviventesService from "../../providers/http-service/sobreviventesService"
import ComercioForm from "./ComercioForm"

function Comercio() {

  const { startLoader, stopLoader } = useLoader()
  const { showAlert } = useAlertMessage()
  const [sobrevivente1, setSobrevivente1] = useState()
  const [sobrevivente2, setSobrevivente2] = useState()

  const [selectSobreviventes, setSelectSobreviventes] = useState([])

  useEffect(() => {
    listarSobreviventes()
  }, [])

  function search(id1, id2) {
    startLoader()

    inventariosService.getInventario(id1).then(s1 => {
      inventariosService.getInventario(id2).then(s2 => {

        if (s1.status === 200 && s2.status === 200) {
          setSobrevivente1(s1.data)
          setSobrevivente2(s2.data)
        }

        stopLoader()

      })
        .catch(err => {
          console.log(err)
          stopLoader()
          if (err.response.data.message)
            showAlert('', err.response.data.message, 'error', 4000)
          else
            showAlert('', 'Erro ao buscar sobrevivente', 'error', 4000)
        })
    })
      .catch(err => {
        console.log(err)
        stopLoader()
        if (err.response.data.message)
          showAlert('', err.response.data.message, 'error', 4000)
        else
          showAlert('', 'Erro ao buscar sobrevivente', 'error', 4000)
      })
  }

  function listarSobreviventes() {
    startLoader()

    sobreviventesService.listar()
      .then(res => {
        if (res.status === 200) {
          const select = res.data.filter((s) => !s.estaInfectado)

          setSelectSobreviventes(select)
        }

        stopLoader()

      })
      .catch(err => {
        console.log(err)
        showAlert('Erro', 'Erro ao acessar servidor!', 'error', 5000)
        stopLoader()
      })
  }

  return (
    <>
      <PageTitle title="Comércio" icon={(<SwapHoriz />)} />

      {sobrevivente1 && sobrevivente2 ?
        <Box sx={{ minWidth: 250 }}>
          <Card style={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {sobrevivente1.sobrevivente}
              </Typography>
              <Divider />

              <Typography sx={{ mb: 1.5, mt: 1.5 }} color="text.secondary">
                Inventário:
              </Typography>
              <List>
                <Divider />
                <ListItem >
                  <ListItemText primary="pri" />
                </ListItem>
              </List>

              <Typography sx={{ mb: 1.5, mt: 1.5 }} color="text.secondary">
                Itens Ofertados:
              </Typography>
              <List>
                <Divider />
                <ListItem >
                  <ListItemText
                    primary="Teste"
                    secondary="Sub"
                  />
                </ListItem>
              </List>

              <Typography sx={{ mb: 1.5, mt: 1.5 }} color="text.secondary">
                Total de Pontos Ofertados:
              </Typography>
            </CardContent>
          </Card>
        </Box> :
        <ComercioForm search={search} selectSobreviventes={selectSobreviventes} />
      }
    </>
  )
}

export default Comercio