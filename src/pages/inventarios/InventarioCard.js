import { Box, Button, Card, CardActions, CardContent, Divider, List, ListItem, ListItemText, Typography } from "@mui/material"

function InventarioCard({ sobrevivente, totalRecursos, itens }) {
    return (
        <Box sx={{ minWidth: 250 }}>
            <Card style={{ height: '100%' }} variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="div">
                        {sobrevivente}
                    </Typography>
                    <Divider />
                    <Typography sx={{ mb: 1.5, mt: 1.5 }} color="text.secondary">
                        {totalRecursos} itens no inventário
                    </Typography>
                    {itens.length > 0 ? (
                        <List>
                            {itens.map((item,index) => (
                                <div key={index}>
                                <Divider />
                                <ListItem >
                                    <ListItemText
                                        primary={`${item.item.nome}: ${item.quantidade}`}
                                        secondary={`Total: ${item.item.pontos*item.quantidade} pontos`}
                                        
                                    />
                                </ListItem>
                                </div>
                            ))}
                        </List>
                    ) : <p>Não há itens no inventário</p>}
                </CardContent>
            </Card>
        </Box>
    )
}

export default InventarioCard