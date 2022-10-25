import styled from "@emotion/styled";
import { Report, ExpandMore} from "@mui/icons-material";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import PageTitle from "../../components/layout/PageTitle";
import sobreviventesService from '../../providers/http-service/sobreviventesService';
import PieChart from "../../components/charts/PieChart";
import ColumnChart from "../../components/charts/ColumnChart";
import { useLoader } from "../../providers/loading/LoadingProvider";

function Relatorios() {

  const [reports, setReports] = useState({})
  const [dataSituacao, setDataSituacao] = useState([])
  const [dataMedia, setDataMedia] = useState([])
  const [dataPontosPerdidos, setDataPontosPerdidos] = useState([])
  const { startLoader, stopLoader } = useLoader()

  useEffect(() => {
    startLoader()

    sobreviventesService.getRelatorios()
      .then(res => {
        const data = res.data
        setReports(res.data)
        console.log(data)

        setDataSituacao([
          ["Situacao", "Porcentagem"],
          ["Infectados", data.total_infectados],
          ["Não Infectados", data.total_nao_infectados]
        ])

        const auxDataMedia = [["Recurso", "Média"]]
        data.media_itens.forEach(element => {
          auxDataMedia.push([element.item, parseFloat(element.media)])
        })

        setDataMedia(auxDataMedia)

        const auxDataPontos = [["Sobrevivente", "Pontos Perdidos"]]
        data.pontos_perdidos.forEach(element => {
          auxDataPontos.push([element.nome, element.pontos_perdidos])
        })

        setDataPontosPerdidos(auxDataPontos)

        stopLoader()

      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <PageTitle title="Relatórios" icon={(<Report />)} />

      <Divider />

      <PieChart title={`Total de Sobreviventes: ${reports.total_sobreviventes}`} data={dataSituacao} />
      
      <Divider />

      <ColumnChart title='Média de Recursos por Sobrevivente' data={dataMedia} />

      <Divider />

      <ColumnChart title='Pontos Perdidos por Sobrevivente Infectado' data={dataPontosPerdidos} />
    </>
  )
}

export default Relatorios