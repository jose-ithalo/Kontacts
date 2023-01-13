import './button.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons({ variant, action, btnState, length, stature }) {

    let btnType = null;

    if (variant === 'contained') {
        btnType = btnState ? 'btn-green btn-form' : 'btn-red btn-form'
    }

    return (
        <Stack spacing={2} direction="row">

            <Button type='submit' variant={variant} className={btnType} sx={{ width: length, height: stature }}
            >{action}
            </Button>
        </Stack>
    );
}
