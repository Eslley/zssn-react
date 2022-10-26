import { Container } from "@mui/system";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Sobreviventes from "./pages/sobreviventes/Sobreviventes";
import Inventarios from "./pages/inventarios/Inventarios"
import Itens from "./pages/itens/Itens"
import Comercio from "./pages/comercio/Comercio"
import Relatorios from "./pages/relatorios/Relatorios"
import LoadingProvider from './providers/loading/LoadingProvider'
import Home from "./pages/home/Home";

function App() {
  return (
    <Router>
      <Navbar />

      <Container sx={{ minHeight: '80%', mt: '3em' }}>
        <LoadingProvider>
        <Routes>
          <Route path='/zssn-react' element={<Home />} />
          <Route path='/sobreviventes' element={<Sobreviventes />} />
          <Route path='/inventarios' element={<Inventarios />} />
          <Route path='/itens' element={<Itens />} />
          <Route path='/comercio' element={<Comercio />} />
          <Route path='/relatorios' element={<Relatorios />} />
        </Routes>
        </LoadingProvider>
      </Container>

      <Footer />
    </Router>
  );
}

export default App;
