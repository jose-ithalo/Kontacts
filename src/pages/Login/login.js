import './login.css';
import '../../css/mobile.css';

import api from '../../services/api';
import BasicTextFields from '../../components/forms/form';
import BasicButtons from '../../components/buttons/button';

import UserContext from '../../context/userContext';
import { useContext, useEffect } from 'react';

function Login() {

    const { navigate, errorAlert, setErrorAlert, successAlert, forms, setForms, setValue } = useContext(UserContext);

    async function enterMain(evt) {

        evt.preventDefault();

        try {
            if (!forms.email || !forms.password) {
                alert('Preencha todos os campos.');
                return
            }

            const response = await api.post('/login', {
                email: forms.email,
                senha: forms.password
            })

            const { token, usuario } = response.data;

            localStorage.setItem('token', token);
            setValue(usuario);

            setForms({
                email: '',
                password: ''
            });

            navigate('/Main');

        } catch (error) {

            setErrorAlert(true);

            setTimeout(() => {
                setErrorAlert(false);

            }, 3500)

        }

    }

    useEffect(function () {
        const token = localStorage.getItem('token');

        if (token) {
            navigate('/Main');
        }
    });

    return (
        <div className="container-form">
            <div className='img-area-left'></div>
            <div className='login-form'>

                <form onSubmit={enterMain}>
                    <h3>Bem vindo</h3>
                    <h1>Faça o login com sua conta</h1>

                    <BasicTextFields inputName={false} inputPassword={true} inputPhone={false} />

                    {errorAlert && <p className='error-alert'>Senha ou Email incorreto</p>}
                    {successAlert && <p className='success-alert'>Novo usuario Cadastrado com sucesso!</p>}

                    <BasicButtons variant='contained' action='LOGIN' btnState={true} length={470} stature={50} />

                </form>

                <div className='question' onClick={() => navigate('/Sign-in')} >
                    <span className='alert-error'>Não tem cadastro?</span>
                    <BasicButtons variant='text' action='Clique aqui!' btnState={true} />
                </div>

            </div>
        </div>
    );
}

export default Login;
