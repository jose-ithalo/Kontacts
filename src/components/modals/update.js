import './modal.css';
import btnClose from '../../assets/btn-close.svg';

import BasicTextFields from '../forms/form';
import BasicButtons from '../buttons/button';

import UserContext from '../../context/userContext';
import { useContext } from 'react';
import api from '../../services/api';

function UpdateModal({ setStateModalUp, setShowLoading, showContacts, UpdatedId }) {

    const { forms, setForms } = useContext(UserContext);

    async function handleUpdate(evt) {
        evt.preventDefault();

        try {
            if (!forms.name && !forms.email && !forms.phone) {
                alert('Preencha pelo menos um campo.');
                return
            }

            const token = localStorage.getItem('token');
            await api.put(`/contatos/${UpdatedId}`, {
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

            setShowLoading(true);

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

        finally {
            setTimeout(() => {
                setShowLoading(false);
            }, 800)
        }
    }

    function handleClearInputs() {

        setForms({
            name: '',
            email: '',
            password: '',
            phone: ''
        });

    }

    return (
        <div className='cardModal-container'>
            <div className='cardModal'>
                <div className='content-card'>

                    <img src={btnClose} alt='Botão X' onClick={() => {
                        handleClearInputs();
                        setStateModalUp(false);
                    }} />

                    <h2>Editar contato</h2>

                    <div>
                        <form onSubmit={handleUpdate}>
                            <BasicTextFields inputName={true} inputPassword={false} inputPhone={true} length={364} />
                            <BasicButtons variant='contained' action='Editar' btnState={true} length={364} stature={50} />
                        </form>

                        <div className='btn-clean' onClick={() => handleClearInputs()}>
                            <BasicButtons variant='contained' action='Limpar' btnState={false} length={364} stature={50} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default UpdateModal;