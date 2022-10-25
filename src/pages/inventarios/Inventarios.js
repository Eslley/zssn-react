import { Inventory2 } from "@mui/icons-material"
import PageTitle from "../../components/layout/PageTitle";
import { useLoader } from "../../providers/loading/LoadingProvider";
import inventariosService from "../../providers/http-service/inventariosService"
import { useEffect, useState } from "react";
import InventarioCard from "./InventarioCard";
import { Grid } from "@mui/material";

function Inventarios() {

  const { startLoader, stopLoader } = useLoader()
  const [inventarios, setInventarios] = useState([])

  useEffect(() => {

    startLoader()

    inventariosService.listar()
      .then(res => {
        let data = {}

        if (res.status === 200) {
          setInventarios(res.data.inventarios)
          data = res.data

          let totalRecursos = 0
          data.inventarios.forEach(sobrevivente => {
            sobrevivente.itens.forEach(item => {
              totalRecursos += item.quantidade
            })
            sobrevivente.total = totalRecursos
            totalRecursos = 0
          })
        }

        stopLoader()

      })
      .catch(err => {
        console.log(err)
      })

  }, [])

  return (
    <>
      <PageTitle title="Inventários" icon={(<Inventory2 />)} />

      {inventarios.length > 0 ? (
        <Grid container spacing={2}>
          {inventarios.map((inventario, index) => (
            <Grid key={index} item container justifyContent="center" xs={12} sm={6} md={4} lg={3}>
              <InventarioCard sobrevivente={inventario.sobrevivente} totalRecursos={inventario.total} itens={inventario.itens} />
            </Grid>
          ))}

        </Grid>)
        : <p>Não há inventários</p>}

    </>
  )
}

export default Inventarios