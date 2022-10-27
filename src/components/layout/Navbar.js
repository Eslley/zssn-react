import { AppBar, Box, colors, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const navItems = [
    {
        text: 'Sobreviventes',
        key: 'sobreviventes'
    },
    {
        text: 'Inventários',
        key: 'inventarios'
    },
    {
        text: 'Itens',
        key: 'itens'
    },
    {
        text: 'Comércio',
        key: 'comercio'
    },
    {
        text: 'Relatórios',
        key: 'relatorios'
    },
]



function Navbar(props) {

    const { window } = props;

    const [mobileOpen, setMobileOpen] = useState(false)

    const [atual, setAtual] = useState('')

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }

    function handleClick(key) {
        setAtual(key)
    }

    //Renderiza side modal para o menu no mobile
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                ZSSN
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <Link style={{textDecoration: 'none'}} key={item.key} to={`/${item.key}`}>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{ position: 'relative' }} component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { md: 'block' }, textAlign: { xs: 'center', md: 'start' } }}
                    >
                        <Link style={{textDecoration: 'none', color: '#fff'}} to="/zssn-react" onClick={() => handleClick('zssn-react')}>
                        ZSSN
                        </Link>
                    </Typography>
                    <Box sx={{ display: { sm: 'none', xs: 'none', md: 'block'} }}>
                        {navItems.map((item) => (
                            <Link style={{textDecoration: 'none'}} key={item.key} to={`/${item.key}`} onClick={() => handleClick(item.key)}>
                            <Button sx={{ ":hover": { backgroundColor: 'rgba(51, 153, 255, 0.4)' }, backgroundColor: item.key === atual ? 'rgba(51, 153, 255, 0.6)' : 'none', color: '#fff' }}>
                                {item.text}
                            </Button>
                        </Link>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>

            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    )
}

export default Navbar