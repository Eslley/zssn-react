import { ArrowBack, ArrowForward, Inventory, SwapVert } from "@mui/icons-material"
import { Box, Card, CardContent, Divider, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material"

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

                    <List>
                        {sobrevivente.itens.map((item, index) => (
                            <ListItem
                                key={index}
                                secondaryAction={
                                    <IconButton aria-label="arrow forward">
                                        <ArrowForward color="primary" />
                                        <Typography>Ofertar 1</Typography>
                                    </IconButton>
                                }>
                                <ListItemText primary={`${item.item.nome}: ${item.quantidade}x`} />
                            </ListItem>
                        ))}
                    </List>

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
                        <ListItem
                            secondaryAction={
                                <IconButton aria-label="arrow forward">
                                    <ArrowBack color="primary" />
                                    <Typography>Retirar 1</Typography>
                                </IconButton>
                            }>
                            <ListItemText
                                primary="Teste"
                            />
                        </ListItem>
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