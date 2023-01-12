import './main.css'

import ButtonAppBar from "../../components/headerMain/header";
import BasicButtons from '../../components/buttons/button';
import DataApi from '../../components/datas/data';
import ModalCardAdd from '../../components/modals/add';
import DeleteModal from '../../components/modals/delete';
import UpdateModal from '../../components/modals/update';
import { useEffect, useState } from 'react';
import api from '../../services/api';

import UserContext from '../../context/userContext';
import { useContext } from 'react';

function MainPage() {

    const { contactList, setContactList } = useContext(UserContext);

    const [stateModalAdd, setStateModalAdd] = useState(false);
    const [stateModalDel, setStateModalDel] = useState(false);
    const [stateModalUp, setStateModalUp] = useState(false);

    const [infoContact, setInfoContact] = useState({
        id: '',
        nome: '',
        email: '',
        telefone: 0
    });

    async function showContacts() {

        try {
            const token = localStorage.getItem('token');
            const response = await api.get('/contatos', {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            setContactList(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        showContacts();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="container-main ">
            <ButtonAppBar />
            <div className='sub-container'>
                <div onClick={() => setStateModalAdd(true)}>
                    <BasicButtons variant='contained' action='Adicionar' btnState={true} length={235} stature={50} />
                </div>
                <div className='title-contact'>
                    <span>Nome</span>
                    <span>Email</span>
                    <span>Telefone</span>
                </div>

                {contactList.map((data) => (
                    <div key={data.id}>
                        <DataApi setStateModalDel={setStateModalDel} setStateModalUp={setStateModalUp} name={data.nome}
                            email={data.email} phone={data.telefone} key={data.id} id={data.id}
                            setInfoContact={setInfoContact} />
                    </div>
                ))}

            </div>

            {stateModalAdd && <ModalCardAdd setStateModalAdd={setStateModalAdd}
                showContacts={showContacts} />}

            {stateModalDel && <DeleteModal setStateModalDel={setStateModalDel} Deleted={infoContact}
                showContacts={showContacts} />}

            {stateModalUp && <UpdateModal setStateModalUp={setStateModalUp} Updated={infoContact}
                showContacts={showContacts} />}
        </div>
    )
}

export default MainPage;