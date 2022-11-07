import { SwapHoriz } from "@mui/icons-material"
import { Fab, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { useAlertMessage } from "../../components/alert/AlertMessageProvider"
import PageTitle from "../../components/layout/PageTitle"
import { useLoader } from "../../components/loading/LoadingProvider"
import inventariosService from "../../providers/http-service/inventariosService"
import sobreviventesService from "../../providers/http-service/sobreviventesService"
import ComercioCard from "./ComercioCard"
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

          s1.data.itens.forEach(element => {
            element.oferecido = 0
          })

          s2.data.itens.forEach(element => {
            element.oferecido = 0
          })

          s1.data.totalPontos = 0
          s2.data.totalPontos = 0

          setSobrevivente1(s1.data)
          setSobrevivente2(s2.data)
        }

        stopLoader()

      })
        .catch(err => {
          console.log(err)
          stopLoader()
          if (!!err.response.data.message)
            showAlert('', err.response.data.message, 'error', 4000)
          else
            showAlert('', 'Erro ao buscar sobrevivente', 'error', 4000)
        })
    })
      .catch(err => {
        console.log(err)
        stopLoader()
        if (!!err.response.data.message)
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

  function requestTroca() {
    console.log(sobrevivente1)
    console.log(sobrevivente2)
  }

  return (
    <>
      <PageTitle title="Comércio" icon={(<SwapHoriz />)} />

      {sobrevivente1 && sobrevivente2 ?
        <Grid container justifyContent="center" columnSpacing={2} rowSpacing={2}>
          <Grid container item justifyContent='center' xs={12} md={6}>
            <ComercioCard sobrevivente={sobrevivente1} setSobrevivente={setSobrevivente1} showAlert={showAlert} />
          </Grid>

          <Grid container item justifyContent='center' xs={12} md={6}>
            <ComercioCard sobrevivente={sobrevivente2} setSobrevivente={setSobrevivente2} showAlert={showAlert} />
          </Grid>

          <Grid container item justifyContent="center" xs={12}>
            <Fab disabled={ sobrevivente1.totalPontos === 0 || !(sobrevivente1.totalPontos === sobrevivente2.totalPontos)} onClick={requestTroca} variant="extended" color="primary" aria-label="add">
              <SwapHoriz />
              Trocar
            </Fab>
          </Grid>
        </Grid>
        :
        <ComercioForm search={search} selectSobreviventes={selectSobreviventes} />
      }
    </>
  )
}

export default Comercio