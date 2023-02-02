import './modal.css';
import btnClose from '../../assets/btn-close.svg';

import BasicTextFields from '../forms/form';
import BasicButtons from '../buttons/button';

import UserContext from '../../context/userContext';
import { useContext } from 'react';
import api from '../../services/api';

function ModalCardAdd({ setStateModalAdd, setShowLoading, showContacts }) {

    const { forms, setForms } = useContext(UserContext);

    async function handleAddContact(evt) {
        evt.preventDefault();

        try {
            if (!forms.name || !forms.email || !forms.phone) {
                alert('Preencha todos os campos.');
                return
            }

            const token = localStorage.getItem('token');
            await api.post('/contatos', {
                nome: forms.name,
                telefone: forms.phone,
                email: forms.email
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
            })

            setStateModalAdd(false);

        } catch (error) {
            console.log(error.message.response);
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

        setStateModalAdd(false)

    }

    return (
        <div className='cardModal-container'>
            <div className='cardModal'>
                <img src={btnClose} alt='Botão X' onClick={() => handleClearInputs()} />
                <h2>Novo Contato</h2>

                <form onSubmit={handleAddContact}>
                    <BasicTextFields inputName={true} inputPassword={false} inputPhone={true} length={364} />
                    <BasicButtons variant='contained' action='Adicionar' btnState={true} length={364} stature={50} />
                </form>

                <div className='btn-clean' onClick={() => handleClearInputs()}>
                    <BasicButtons variant='contained' action='Limpar' btnState={false} length={364} stature={50} />
                </div>

            </div>
        </div>
    )
}

export default ModalCardAdd;