import './delete.css';
import btnClose from '../../assets/btn-close.svg';

import BasicButtons from '../buttons/button';
import api from '../../services/api';

function DeleteModal({ setStateModalDel, setShowLoading, Deleted, showContacts }) {

    async function deleteContact() {

        try {

            const token = localStorage.getItem('token');
            await api.delete(`/contatos/${Deleted.id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            setShowLoading(true);

            showContacts()

            setStateModalDel(false);

        } catch (error) {
            console.log(error);
        }

        finally {
            setTimeout(() => {
                setShowLoading(false);
            }, 800)
        }

    }

    return (
        <div className='cardModal-container'>
            <div className='card-delete'>
                <img src={btnClose} alt='Botão X' onClick={() => setStateModalDel(false)} />
                <h2>Confirma a exclusão?</h2>
                <span>Deseja excluir o contato, {Deleted.nome}</span>

                <div className='delete-btn' onClick={deleteContact}>
                    <BasicButtons variant='contained' action='Excluir' btnState={true} length={364} stature={50} />
                </div>

                <div className='cancel-delete' onClick={() => setStateModalDel(false)}>
                    <BasicButtons variant='contained' action='Cancelar' btnState={false} length={364} stature={50} />
                </div>

            </div>
        </div>
    )
}

export default DeleteModal;