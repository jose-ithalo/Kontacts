import './header.css';
import logoutIcon from '../../assets/logout.svg';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import UserContext from '../../context/userContext';
import { useContext } from 'react';

export default function ButtonAppBar() {

    const { navigate } = useContext(UserContext);

    function handleLogout() {

        navigate('/');

        localStorage.clear();

    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar className='header-area'>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    </IconButton>
                    <Typography className='head-info' variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        KONTACTS
                    </Typography>
                    <Button color="inherit">
                        <img src={logoutIcon} alt='Ícone sair' onClick={handleLogout} />
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
