import './signIn.css';
import '../../css/mobile2.css';

import api from '../../services/api';
import BasicTextFields from '../../components/forms/form';
import BasicButtons from '../../components/buttons/button';

import UserContext from '../../context/userContext';
import { useContext } from 'react';

function SignIn() {

    const { navigate, errorAlert, setErrorAlert, setSuccessAlert, forms, setForms } = useContext(UserContext);

    async function handleAddUser(evt) {
        evt.preventDefault();

        try {

            if (!forms.name || !forms.email || !forms.password) {
                alert('Preencha todos os campos.');
                return
            }

            await api.post('/usuarios', {
                nome: forms.name,
                email: forms.email,
                senha: forms.password
            });

            setSuccessAlert(true);

            setTimeout(() => {
                setSuccessAlert(false);

            }, 4000);

            navigate('/');

        } catch (error) {

            setErrorAlert(true);

            setTimeout(() => {
                setErrorAlert(false);

            }, 3500);

        } finally {

            setForms({
                nome: '',
                email: '',
                password: ''
            });

        }

    }

    return (
        <div className="container-form">

            <div className='signIn-form'>

                <form onSubmit={handleAddUser}>
                    <h2>Cadastre-se</h2>
                    <BasicTextFields inputName={true} inputPassword={true} inputPhone={false} length={470} />

                    {errorAlert && <p className='error-alert'>Email ou senha já cadastrados.</p>}

                    <div className='btn-signIn'>
                        <BasicButtons variant='contained' action='CADASTRAR' btnState={true} length={470} stature={50} />

                        <div onClick={() => navigate('/')}>
                            <BasicButtons variant='contained' action='CANCELAR' btnState={false} length={470} stature={50} />
                        </div>

                    </div>
                </form>

                <div className='question' onClick={() => navigate('/')} >
                    <span className='headline-page'>Já tem cadastro?</span>
                    <BasicButtons variant='text' action='Clique aqui!' btnState={true} />
                </div>
            </div>
            <div className='img-area-rigth'></div>
        </div>
    )
}

export default SignIn;