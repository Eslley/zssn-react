import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

function SobreviventeDetails({ sobrevivente, detailsOpen, setDetailsOpen }) {
    return (
            <Dialog
                open={detailsOpen}
                onClose={() => setDetailsOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {sobrevivente.nome}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-idade">
                        Idade: {sobrevivente.idade} anos
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-sexo">
                        Sexo: {sobrevivente.sexo === 'm' ? 'Masculino' : 'Feminino'}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-lat">
                        Latitude: {sobrevivente.latitude} °
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-long">
                        Longitude: {sobrevivente.longitude} °
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDetailsOpen(false)} autoFocus>
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>
        
  )
}

export default SobreviventeDetails