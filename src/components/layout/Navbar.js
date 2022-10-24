import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
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
];

function Navbar(props) {

    const { window } = props;

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

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
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { sm: 'block' }, textAlign: { xs: 'center', sm: 'start' } }}
                    >
                        ZSSN
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Link style={{textDecoration: 'none'}} key={item.key} to={`/${item.key}`}>
                            <Button sx={{ color: '#fff' }}>
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
                        display: { xs: 'block', sm: 'none' },
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