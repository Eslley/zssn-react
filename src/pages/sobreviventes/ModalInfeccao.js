import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select } from "@mui/material"

function ModalInfeccao({ infeccaoOpen,
    closeAlertaInfeccao,
    submitAlerta,
    handleInformanteChange,
    selectSobreviventes,
    idInformante }) {
    return (
        <Dialog open={infeccaoOpen} onClose={closeAlertaInfeccao}>
            <DialogTitle>Alerta de Contaminação</DialogTitle>
            <form onSubmit={submitAlerta}>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel id="select-label">Informante</InputLabel>
                        <Select
                            labelId="select-label"
                            id="select"
                            value={idInformante}
                            label="Informante"
                            onChange={handleInformanteChange}
                        >
                            {selectSobreviventes.map((sobrevivente, index) =>
                                <MenuItem key={index} value={sobrevivente.id}>{sobrevivente.nome}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeAlertaInfeccao}>Cancelar</Button>
                    <Button disabled={idInformante === ''} type="submit">Confirmar</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default ModalInfeccao