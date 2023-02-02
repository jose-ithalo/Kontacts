import './data.css';
import editIcon from '../../assets/Icon-Pencil.svg';
import trashIcon from '../../assets/trash.svg';

import UserContext from '../../context/userContext';
import { useContext } from 'react';

function DataApi({ setStateModalDel, setStateModalUp, name, email,
    phone, id, setInfoContact, setShowLoading }) {

    const { setForms } = useContext(UserContext);


    return (
        <div className='contact-info'>
            <span>{name}</span>
            <span>{email}</span>
            <span>{phone}</span>
            <div className='icons-area'>
                <img src={editIcon} alt='Ícone editar' onClick={() => {
                    setForms({
                        name,
                        email,
                        phone
                    });
                    setInfoContact({
                        id
                    });

                    setStateModalUp(true)

                    setShowLoading(false)
                }} />

                <img src={trashIcon} alt='lixeira' onClick={() => {
                    setInfoContact({
                        id,
                        nome: name,
                        email,
                        telefone: phone
                    });
                    setStateModalDel(true)
                }} />
            </div>
        </div>
    )
}

export default DataApi;