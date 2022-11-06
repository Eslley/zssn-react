import { ArrowBack, ArrowForward, Inventory, SwapVert } from "@mui/icons-material"
import { Avatar, Box, Card, CardContent, Chip, Divider, IconButton, List, ListItem, ListItemText, Tooltip, Typography } from "@mui/material"
import { Stack } from "@mui/system"

function ComercioCard({ sobrevivente }) {

    return (
        <Box textAlign="center" sx={{ minWidth: 250, width: { xs: '95%', sm: '70%', md: '75%' } }}>
            <Card variant="outlined" style={{ height: '100%', backgroundColor: '#3399ff1a' }}>
                <CardContent>
                    <Typography mb="0.4em" textAlign="center" variant="h5" component="div">
                        {sobrevivente.sobrevivente}
                    </Typography>
                    <Divider />

                    <Typography sx={{
                        mb: 1.5, mt: 1.5,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }} color="text.secondary">
                        <Inventory sx={{ padding: '0.2em' }} />
                        Inventário
                    </Typography>

                    <Divider />

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginY: '1em' }}>
                        {sobrevivente.itens.map((item, index) => (
                            <Chip
                                key={index}
                                label={item.item.nome}
                                avatar={<Avatar>{item.quantidade}x</Avatar>} />
                        ))}
                    </Box>

                    <Divider />

                    <Typography textAlign="center"
                        sx={{
                            mb: 1.5, mt: 1.5,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }} color="text.secondary">
                        <SwapVert fontSize="large" />
                        Itens Ofertados
                    </Typography>

                    <Divider />

                    <List>
                        {sobrevivente.itens.map((item, index) => (
                            <ListItem
                                key={index}
                                secondaryAction={
                                    <>
                                        <Tooltip title="Retirar 1">
                                            <IconButton aria-label="arrow forward">
                                                <ArrowBack color="primary" />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Ofertar 1">
                                            <IconButton aria-label="arrow forward">
                                                <ArrowForward color="primary" />
                                            </IconButton>
                                        </Tooltip>
                                    </>
                                }>
                                <ListItemText
                                    primary={`${item.item.nome}: ${item.oferecido}x`}
                                />
                            </ListItem>
                        ))}
                    </List>

                    <Divider />

                    <Typography sx={{ mb: 1.5, mt: 1.5, textAlign: 'center' }} color="text.secondary">
                        Total de Pontos Ofertados:
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

export default ComercioCard