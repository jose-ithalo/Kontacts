
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import UserContext from '../../context/userContext';
import { useContext } from 'react';

export default function BasicTextFields({ inputName, inputPassword, inputPhone }) {

    const { forms, setForms } = useContext(UserContext);

    function changeInputValue(evt) {

        const inputName = evt.target.name;
        const newValue = evt.target.value;

        setForms({ ...forms, [inputName]: newValue });

    }

    return (
        <Box
            component="div"
            sx={{
                '& > :not(style)': { m: 1, width: 'auto' },
            }}
            noValidate
            autoComplete="off"
        >
            <div className='inputs-fields'>

                {inputName && <TextField id="outlined-basic" label="Nome" variant="outlined"
                    type='text' className='input-form' name='name' value={forms.name}
                    onChange={(event) => changeInputValue(event)} />}

                <TextField id="outlined-basic" label="E-mail" variant="outlined"
                    type='email' className='input-form' name='email' value={forms.email}
                    onChange={(event) => changeInputValue(event)} />

                {inputPassword && <TextField id="outlined-basic" label="Senha" variant="outlined"
                    type='password' className='input-form' name='password' value={forms.password}
                    onChange={(event) => changeInputValue(event)} />}

                {inputPhone && <TextField id="outlined-basic" label="Telefone" variant="outlined"
                    type='tel' className='input-form' name='phone' value={forms.phone}
                    onChange={(event) => changeInputValue(event)} />}


            </div>

        </Box>
    );
}
