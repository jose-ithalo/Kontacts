import './modal.css';
import btnClose from '../../assets/btn-close.svg';

import BasicTextFields from '../forms/form';
import BasicButtons from '../buttons/button';

import UserContext from '../../context/userContext';
import { useContext } from 'react';
import api from '../../services/api';

function UpdateModal({ setStateModalUp, showContacts, Updated }) {

    const { forms, setForms } = useContext(UserContext);

    console.log(forms);

    async function handleUpdate(evt) {
        evt.preventDefault();

        try {
            if (!forms.name && !forms.email && !forms.phone) {
                alert('Preencha pelo menos um campo.');
                return
            }

            console.log('teste');

            const token = localStorage.getItem('token');
            await api.put(`/contatos/${Updated.id}`, {
                nome: forms.name,
                email: forms.email,
                telefone: forms.phone
            },
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            )

            showContacts();

            setForms({
                name: '',
                email: '',
                phone: '',
            });

            setStateModalUp(false);

        } catch (error) {
            console.log(error.message);
        }
    }

    function handleClearInputs() {

        setForms({
            name: '',
            email: '',
            password: '',
            phone: ''
        });

        setStateModalUp(false)

    }

    return (
        <div className='cardModal-container'>
            <div className='cardModal cardUpdate'>
                <img src={btnClose} alt='Botão X' onClick={() => handleClearInputs()} />
                <h2>Editar contato</h2>

                <form onSubmit={handleUpdate}>
                    <BasicTextFields inputName={true} inputPassword={false} inputPhone={true} length={364} />
                    <BasicButtons variant='contained' action='Salvar' btnState={true} length={364} stature={50} />
                </form>

                <div className='btn-clean' onClick={() => handleClearInputs()}>
                    <BasicButtons variant='contained' action='Limpar' btnState={false} length={364} stature={50} />
                </div>

            </div>
        </div>
    )
}

export default UpdateModal;