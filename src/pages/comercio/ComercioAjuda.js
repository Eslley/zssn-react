import { ArrowBack, ArrowForward } from "@mui/icons-material"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"

function ComercioAjuda({ ajudaOpen, closeAjuda }) {
    return (
        <Dialog open={ajudaOpen} onClose={closeAjuda}>
            <DialogTitle>Regras do Comércio</DialogTitle>
            <DialogContent>
                <ul>
                    <li>
                        <span>
                            A quantidade total de pontos ofertados por ambos sobreviventes deve ser igual
                        </span>
                    </li>
                    <li>
                        <span>
                            Use <ArrowForward color="primary" /> para <strong>ofertar uma quantidade</strong> do item
                        </span>
                    </li>
                    <li>
                        <span>
                            Use <ArrowBack color="primary" /> para <strong>retirar uma quantidade</strong> do item
                        </span>
                    </li>
                    <li>
                        <span>
                            Sobreviventes infectados não podem trocar itens
                        </span>
                    </li>
                </ul>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeAjuda}>Entendi</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ComercioAjuda