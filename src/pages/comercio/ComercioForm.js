import { PersonSearch } from "@mui/icons-material"
import { Box, Fab, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { useAlertMessage } from "../../components/alert/AlertMessageProvider"

function ComercioForm({ search, selectSobreviventes }) {

    const { register, formState: { errors, isValid }, getValues, handleSubmit, reset, control } = useForm({
        mode: 'onChange',
        defaultValues: {
            select1: '',
            select2: ''
        }
    })

    const { showAlert } = useAlertMessage()

    function submitSearch(data) {
        if (data.select1 === data.select2) {
            showAlert('Aviso', 'Selecione dois sobreviventes diferentes para realizar a troca!', 'warning', 5000)
            return
        }

        search(data.select1, data.select2)
    }

    return (
        <form onSubmit={handleSubmit(submitSearch)}>
            <Grid container textAlign="center" rowSpacing={1}>
                <Grid item xs={12} sm={6}>
                    <Controller
                        control={control}
                        name="select1"
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                            <FormControl sx={{ width: '50%' }}>
                                <InputLabel id="select-label1">1° Sobrevivente</InputLabel>
                                <Select onChange={onChange} value={value} label="1° sobrevivente" labelId="select-label1">
                                    {selectSobreviventes.map((sobrevivente, index) =>
                                        <MenuItem key={index} value={sobrevivente.id}>{sobrevivente.nome}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        )}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Controller
                        control={control}
                        name="select2"
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                            <FormControl sx={{ width: '50%' }}>
                                <InputLabel id="select-label2">2° Sobrevivente</InputLabel>
                                <Select onChange={onChange} value={value} label="2° sobrevivente" labelId="select-label2">
                                    {selectSobreviventes.map((sobrevivente, index) =>
                                        <MenuItem key={index} value={sobrevivente.id}>{sobrevivente.nome}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        )}
                    />
                </Grid>
            </Grid>


            <Box sx={{ mt: '2em', textAlign: 'center' }}>
                <Fab disabled={!isValid} type="submit" variant="extended" color="primary" aria-label="add">
                    <PersonSearch />
                    Buscar Inventários
                </Fab>
            </Box>
        </form>
    )
}

export default ComercioForm