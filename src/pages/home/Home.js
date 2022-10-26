import { Button } from "@mui/material"
import { Box } from "@mui/system"
import { Link } from "react-router-dom"
import logo from "../../img/logo.png"
import styles from './Home.module.css'

function Home() {
    return (
        <div className={styles.home_container}>
            <h1>Bem-vindo ao <span>ZSSN System</span></h1>
            <p>Plataforma da Rede Social de Sobrevivência Zumbi</p>
            <img style={{ width: '70%',  mt: '3em' }} src={logo} alt='zssn logo' />
            <Link style={{ textDecoration: 'none', mt: '3em'  }} to='/relatorios'>
                <Button variant="contained">Ver Relatórios</Button>
            </Link>
        </div>
    )
}

export default Home