import './main.css'

import ButtonAppBar from "../../components/headerMain/header";
import BasicButtons from '../../components/buttons/button';
import DataApi from '../../components/datas/data';
import ModalCardAdd from '../../components/modals/add';
import DeleteModal from '../../components/modals/delete';
import UpdateModal from '../../components/modals/update';
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Loading from '../../components/loading/loading';
import LoadLogout from '../../components/loading/loadLogout';
import { useEffect, useState } from 'react';
import api from '../../services/api';

import UserContext from '../../context/userContext';
import { useContext } from 'react';

function MainPage() {

    const { contactList, setContactList, logout } = useContext(UserContext);

    const [showLoading, setShowLoading] = useState(false);
    const [stateModalAdd, setStateModalAdd] = useState(false);
    const [stateModalDel, setStateModalDel] = useState(false);
    const [stateModalUp, setStateModalUp] = useState(false);

    const [infoContact, setInfoContact] = useState({
        id: '',
        nome: '',
        email: '',
        telefone: 0
    });

    const [search, setSearch] = useState('');

    const filteredContacts = search.length > 0 ?
        contactList.filter(function (data) {
            return data.nome.toLowerCase().includes(search.toLowerCase());
        }) : [];

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

    async function callModalAdd() {
        setStateModalAdd(true);

        setShowLoading(false);
    }

    useEffect(() => {
        setShowLoading(true);
        showContacts();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="container-main ">
            <ButtonAppBar />
            <div className='sub-container'>
                <div className='action-list'>

                    <div onClick={() => callModalAdd()}>
                        <BasicButtons variant='contained' action='Adicionar' btnState={true} length={235} stature={50} />
                    </div>

                    <InputBase
                        className='input-search'
                        placeholder='Pesquisar'
                        endAdornment={<SearchIcon />}
                        onChange={(evt) => setSearch(evt.target.value)}
                    />

                </div>

                <div className='title-contact'>
                    <span>Nome</span>
                    <span>Email</span>
                    <span>Telefone</span>
                </div>

                {search.length > 0 ?

                    filteredContacts.map((data) => (
                        <div key={data.id}>
                            <DataApi setStateModalDel={setStateModalDel} setStateModalUp={setStateModalUp} name={data.nome}
                                email={data.email} phone={data.telefone} key={data.id} id={data.id}
                                setInfoContact={setInfoContact} setShowLoading={setShowLoading} />
                        </div>
                    )) :

                    contactList.map((data) => (
                        <div key={data.id}>
                            <DataApi setStateModalDel={setStateModalDel} setStateModalUp={setStateModalUp} name={data.nome}
                                email={data.email} phone={data.telefone} key={data.id} id={data.id}
                                setInfoContact={setInfoContact} setShowLoading={setShowLoading} />
                        </div>
                    ))}

            </div>

            {stateModalAdd && <ModalCardAdd setStateModalAdd={setStateModalAdd} setShowLoading={setShowLoading}
                showContacts={showContacts} />}

            {stateModalDel && <DeleteModal setStateModalDel={setStateModalDel} Deleted={infoContact}
                setShowLoading={setShowLoading} showContacts={showContacts} />}

            {stateModalUp && <UpdateModal setStateModalUp={setStateModalUp} Updated={infoContact}
                setShowLoading={setShowLoading} showContacts={showContacts} />}

            {showLoading && <Loading time={2000} />}

            {logout && <LoadLogout />}
        </div>
    )
}

export default MainPage;