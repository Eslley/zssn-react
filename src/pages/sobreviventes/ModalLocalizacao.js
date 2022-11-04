import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import { useAlertMessage } from "../../components/alert/AlertMessageProvider"
import { useLoader } from "../../components/loading/LoadingProvider"
import sobreviventesService from "../../providers/http-service/sobreviventesService"

const defaulValues = {
    latitude: '',
    longitude: ''
}

function ModalLocalizacao({
    localizacao,
    localizacaoOpen,
    closeEditaLocalizao,
    atualizarSobreviventes
}) {

    const { startLoader, stopLoader } = useLoader()
    const { showAlert } = useAlertMessage()

    const { register, formState: { errors, isValid }, handleSubmit, reset} = useForm({mode: 'onChange', defaultValues: defaulValues})

    function close() {
        reset(defaulValues)
        closeEditaLocalizao()
    }

    function submitLocalizacao(data) {
        startLoader()

        data.id = localizacao.idSobrevivente
        sobreviventesService.atualizarLocalizacao(data)
            .then(res => {
                if(res.status === 200) {
                    showAlert('', 'Localização atualizada com sucesso!', 'success', 4000)

                    atualizarSobreviventes()
                    close()
                }

                stopLoader()

            })
            .catch(err => {
                console.log(err)
                showAlert('', 'Erro ao atualizar localização!', 'error', 4000)
                stopLoader()
            })
    }

    return (
        <Dialog open={localizacaoOpen} onClose={closeEditaLocalizao}>
            <DialogTitle sx={{ paddingBottom: '0px' }}>Atualizar Localização</DialogTitle>
            <form onSubmit={handleSubmit(submitLocalizacao)}>
                <DialogContent>
                    <DialogContentText>
                        Digite as novas coordenas de {localizacao.nome}
                    </DialogContentText>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Latitude"
                                type="tel"
                            {...register("latitude", {
                                required: true,
                                pattern: {
                                    value: /^-?\d{1,3}\.\d{1,7}$/,
                                    message: "Coordenada inválida"
                                }
                            })}
                            helperText={errors.latitude?.type === 'required' ? "A latitude é obrigatória" : errors.latitude && errors.latitude.message}
                            error={!!errors.latitude}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Longitude"
                                type="tel"
                            {...register("longitude", {
                                required: true,
                                pattern: {
                                    value: /^-?\d{1,3}\.\d{1,7}$/,
                                    message: "Coordenada inválida"
                                }
                            })}
                            helperText={errors.longitude?.type === 'required' ? "A longitude é obrigatória" : errors.longitude && errors.longitude.message}
                            error={!!errors.longitude}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={close}>Cancelar</Button>
                    <Button disabled={!isValid} type="submit">Salvar</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default ModalLocalizacao