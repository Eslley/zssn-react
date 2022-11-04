import { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import sobreviventesService from '../../providers/http-service/sobreviventesService';
import { useLoader } from '../../components/loading/LoadingProvider';
import SobreviventeDetails from './SobreviventeDetails';
import PageTitle from '../../components/layout/PageTitle';
import SobreviventeForm from './SobreviventeForm';
import { useAlertMessage } from '../../components/alert/AlertMessageProvider';
import ModalInfeccao from './ModalInfeccao';
import SobreviventesTable from './SobreviventesTable';
import { Add, People } from '@mui/icons-material';
import { Fab } from '@mui/material';

function Sobreviventes() {

  const [sobreviventes, setSobreviventes] = useState([])
  const [idInformante, setIdInformante] = useState('')
  const [idContaminado, setIdContaminado] = useState('')

  const [selectSobreviventes, setSelectSobreviventes] = useState([])

  const [openForm, setOpenForm] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [infeccaoOpen, setInfeccaoOpen] = useState(false)

  const { startLoader, stopLoader } = useLoader()

  const [sobrevivente, setSobrevivente] = useState({})

  const { showAlert } = useAlertMessage()

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

  function openAlertaInfeccao(idContaminado) {
    const select = sobreviventes.filter((s) => !s.estaInfectado && s.id != idContaminado)
    console.log(select)
    setSelectSobreviventes(select)
    setInfeccaoOpen(true)
    setIdContaminado(idContaminado)
  }

  function closeAlertaInfeccao() {
    setInfeccaoOpen(false)
    setIdInformante('')
  }

  function submitAlerta(e) {
    startLoader()
    e.preventDefault()

    sobreviventesService.alertInfected(idInformante, idContaminado)
      .then(res => {

        if (res.status === 200) {

          showAlert('', res.data.message, 'success', 4000)

          listarSobreviventes()
          setIdInformante('')
          setInfeccaoOpen(false)
        }

        stopLoader()

      })
      .catch(err => {
        if (!!err.message) {
          showAlert('', err.message, 'info', 5000)
        }

        console.log(err)
        stopLoader()
      })

  }

  function handleInformanteChange(e) {
    setIdInformante(e.target.value)
  }

  return (
    <>
      <PageTitle title="Sobreviventes" icon={(<People />)} />

      {sobreviventes.length > 0 && !openForm ? (
        <SobreviventesTable 
        sobreviventes={sobreviventes}
        openDetails={openDetails}
        openAlertaInfeccao={openAlertaInfeccao} />
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


      {/* Modal para informar infecção */}
      <ModalInfeccao infeccaoOpen={infeccaoOpen}
        closeAlertaInfeccao={closeAlertaInfeccao}
        submitAlerta={submitAlerta}
        handleInformanteChange={handleInformanteChange}
        selectSobreviventes={selectSobreviventes}
        idInformante={idInformante} />

    </>
  );
}

export default Sobreviventes