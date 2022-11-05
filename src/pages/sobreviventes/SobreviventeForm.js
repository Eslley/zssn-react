import { Close, Save } from "@mui/icons-material"
import { Fab, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import util from "../../providers/utils/util"
import itensSercice from "../../providers/http-service/itensService"
import sobreviventesService from "../../providers/http-service/sobreviventesService"
import { useAlertMessage } from "../../components/alert/AlertMessageProvider"
import { useLoader } from "../../components/loading/LoadingProvider"

const defaulValues = {
    nome: '',
    idade: '',
    sexo: '',
    latitude: '',
    longitude: '',
    inventario: []
}

function SobreviventeForm({ open, setOpen, atualizarSobreviventes }) {

    const { register, formState: { errors }, handleSubmit, reset, control } = useForm(
        { mode: 'onChange',
        defaultValues: { ...defaulValues} })

    const [itens, setItens] = useState()

    const { startLoader, stopLoader } = useLoader()
    const { showAlert }  = useAlertMessage()

    function submit(data) {
        
        startLoader()

        let inventario = []
        data.inventario.forEach((item, index)=> {
            if(item.quantidade !== '')
                inventario.push({
                    id: index,
                    quantidade: item.quantidade
                })
        });

        data.inventario = inventario

        if(data.inventario.length === 0){
            stopLoader()
            showAlert('', 'Não é possível cadastrar sobreviventes com inventário vazio!', 'warning', 4000)
            return
        }
        
        sobreviventesService.salvar(data)
            .then(res => {

                if(res.status === 201) {

                    atualizarSobreviventes()
                    showAlert('', 'Sobrevivente cadastrado com sucesso!', 'success', 4000)
                    resetForm()
                }

                stopLoader()

            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        console.log(errors)
    }, [errors])

    useEffect(() => {
        itensSercice.listar()
            .then(res => {
                setItens(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const maskNumber = (e) => {
        e.target.value = util.maskNumber(e.target.value)
    }

    function resetForm() {
        reset(defaulValues)
        setOpen(false)
    }

    return (
        <>
            {open &&
                <form onSubmit={handleSubmit(submit)}>
                    <Grid container direction="column">
                        <Grid item container columnSpacing={2}>
                            <Grid item xs={12} sm={10}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Nome"
                                    type="text"
                                    {...register("nome", {
                                        required: true,
                                        pattern: {
                                            value: /^[a-zA-Zà-úÀ-Ú\s]*$/,
                                            message: "O nome é inválido"
                                        }
                                    })}
                                    helperText={errors.nome?.type === 'required' ? "O nome é obrigatório" : errors.nome && errors.nome.message}
                                    error={!!errors.nome}
                                />
                            </Grid>

                            <Grid item xs={12} sm={2}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Idade"
                                    type="number"
                                    {...register("idade", {
                                        required: true, pattern: {
                                            value: /^\d{1,3}$/,
                                            message: "Idade inválida"
                                        }
                                    })}
                                    onInput={maskNumber}
                                    helperText={errors.idade?.type === 'required' ? "A idade é obrigatória" : errors.idade && errors.idade.message}
                                    error={!!errors.idade}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel id="radio-sexo">Sexo</FormLabel>
                                <Controller
                                    rules={{ required: true }}
                                    name="sexo"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <RadioGroup row value={value} onChange={onChange}>
                                            <FormControlLabel value="f" control={<Radio />} label="Feminino" />
                                            <FormControlLabel value="m" control={<Radio />} label="Masculino" />
                                        </RadioGroup>
                                    )}
                                />
                                <FormHelperText error={!!errors.sexo} >{errors.sexo && "Selecione o sexo"}</FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid container columnSpacing={2}>
                            <Grid item xs={12} sm={6}>
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

                            <Grid item xs={12} sm={6}>
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

                        <Grid container mt="2em" mb="2em">
                            <FormLabel>Informe a quantidade dos itens no intentário do sobrevivente</FormLabel>
                            <TableContainer>
                                <Table sx={{ minWidth: 300 }} aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontSize: '16px' }} align="center">Item</TableCell>
                                            <TableCell sx={{ fontSize: '16px' }} align="center">Pontos</TableCell>
                                            <TableCell sx={{ fontSize: '16px' }} align="center">Quantidade</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {itens.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell sx={{ fontSize: '16px' }} align="center">
                                                    {item.nome}
                                                </TableCell>
                                                <TableCell sx={{ fontSize: '16px' }} align="center">
                                                    {item.pontos}
                                                </TableCell>
                                                <TableCell sx={{ fontSize: '16px' }} align="center">
                                                    <TextField
                                                        sx={{ width: '40%' }}
                                                        margin="normal"
                                                        label="Qtd"
                                                        type="number"
                                                        name={`inventario.${item.id}.quantidade`}
                                                        {...register(`inventario.${item.id}.quantidade`, {
                                                            pattern: {
                                                                value: /^\d{0,5}$/,
                                                                message: "Quantidade inválida"
                                                            }
                                                        })}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>

                        <Grid container textAlign="center" mt="2em" mb="2em">
                            <Grid item xs={6}>
                                <Box>
                                    <Fab onClick={resetForm} variant="extended" color="error" aria-label="close">
                                        <Close />
                                        Fechar
                                    </Fab>
                                </Box>
                            </Grid>

                            <Grid item xs={6}>
                                <Box>
                                    <Fab type="submit" variant="extended" color="primary" aria-label="add">
                                        <Save />
                                        Salvar
                                    </Fab>
                                </Box>
                            </Grid>
                        </Grid>

                    </Grid>
                </form>
            }
        </>
    )
}

export default SobreviventeForm