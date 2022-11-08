import { HelpOutline, SwapHoriz } from "@mui/icons-material"
import { Fab, Grid, IconButton } from "@mui/material"
import { useEffect, useState } from "react"
import { useAlertMessage } from "../../components/alert/AlertMessageProvider"
import PageTitle from "../../components/layout/PageTitle"
import { useLoader } from "../../components/loading/LoadingProvider"
import inventariosService from "../../providers/http-service/inventariosService"
import sobreviventesService from "../../providers/http-service/sobreviventesService"
import ComercioAjuda from "./ComercioAjuda"
import ComercioCard from "./ComercioCard"
import ComercioForm from "./ComercioForm"
import comercioService from "../../providers/http-service/comercioService"

function Comercio() {

  const { startLoader, stopLoader } = useLoader()
  const { showAlert } = useAlertMessage()
  const [sobrevivente1, setSobrevivente1] = useState()
  const [sobrevivente2, setSobrevivente2] = useState()

  const [selectSobreviventes, setSelectSobreviventes] = useState([])

  const [ajudaOpen, setAjudaOpen] = useState(false)

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
        setAjudaOpen(true)

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

    if (sobrevivente1.totalPontos !== sobrevivente2.totalPontos) {
      showAlert('', 'O total de pontos ofertados tem que ser igual!', 'error', 4000)
      return
    }

    startLoader()

    let data = {
      sobrevivente1: {
        sobrevivente: sobrevivente1.sobreviventeId,
        itens: []
      },
      sobrevivente2: {
        sobrevivente: sobrevivente2.sobreviventeId,
        itens: []
      }
    }

    sobrevivente1.itens.forEach(item => {
      if(item.oferecido !== 0) {
        data.sobrevivente1.itens.push({
          id: item.item.id,
          quantidade: item.oferecido,
          pontos: item.item.pontos
        })
      }
    })

    sobrevivente2.itens.forEach(item => {
      if(item.oferecido !== 0) {
        data.sobrevivente2.itens.push({
          id: item.item.id,
          quantidade: item.oferecido,
          pontos: item.item.pontos
        })
      }
    })

    comercioService.trocar(data)
      .then(res => {
        if(res.status === 200) {
          stopLoader()
          showAlert('', 'Trocas realizadas com sucesso!', 'success', 4000)
          setSobrevivente1("")
          setSobrevivente2("")
        }

      })
      .catch(err => {
        console.log(err)
        stopLoader()
      })
  }

  return (
    <>
      <PageTitle title="Comércio" icon={(<SwapHoriz />)} helper={
        <IconButton onClick={() => setAjudaOpen(true)} aria-label="help">
          <HelpOutline />
        </IconButton>} />

      {sobrevivente1 && sobrevivente2 ?
        <Grid container justifyContent="center" columnSpacing={2} rowSpacing={2}>
          <Grid container item justifyContent='center' xs={12} md={6}>
            <ComercioCard sobrevivente={sobrevivente1} setSobrevivente={setSobrevivente1} showAlert={showAlert} />
          </Grid>

          <Grid container item justifyContent='center' xs={12} md={6}>
            <ComercioCard sobrevivente={sobrevivente2} setSobrevivente={setSobrevivente2} showAlert={showAlert} />
          </Grid>

          <Grid container item justifyContent="center" xs={12}>
            <Fab disabled={sobrevivente1.totalPontos === 0 || !(sobrevivente1.totalPontos === sobrevivente2.totalPontos)} onClick={requestTroca} variant="extended" color="primary" aria-label="add">
              <SwapHoriz />
              Trocar
            </Fab>
          </Grid>
        </Grid>
        :
        <ComercioForm search={search} selectSobreviventes={selectSobreviventes} />
      }

      <ComercioAjuda ajudaOpen={ajudaOpen} closeAjuda={() => setAjudaOpen(false)} />
    </>
  )
}

export default Comercio