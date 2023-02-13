import './header.css';
import logoutIcon from '../../assets/logout.svg';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import UserContext from '../../context/userContext';
import { useContext } from 'react';

export default function ButtonAppBar() {

    const { navigate, setLogout } = useContext(UserContext);

    function handleLogout() {

        setLogout(true);

        setTimeout(() => {
            setLogout(false);
            localStorage.clear();
            navigate('/');
        }, 3500);

    }

    return (
        <Box sx={{ flexGrow: 0 }}>
            <AppBar position="fixed">

                <Toolbar>
                    <Typography className='head-info' variant="h6" component="div" sx={{ flexGrow: 5 }}>
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
