import './main.css';
import '../../css/mobile3.css';

import ButtonAppBar from "../../components/headerMain/header";
import BasicButtons from '../../components/buttons/button';
import ModalCardAdd from '../../components/modals/add';
import DeleteModal from '../../components/modals/delete';
import UpdateModal from '../../components/modals/update';
import ContactsTable from '../../components/tableMain/table';

import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Loading from '../../components/loading/loading';
import LoadLogout from '../../components/loading/loadLogout';
import { useEffect, useState } from 'react';
import api from '../../services/api';

import UserContext from '../../context/userContext';
import { useContext } from 'react';

function MainPage() {

    const { setContactList, infoContact,
        stateModalDel, setStateModalDel, stateModalUp,
        setStateModalUp, showLoading, setShowLoading, logout } = useContext(UserContext);

    const [stateModalAdd, setStateModalAdd] = useState(false);

    const [search, setSearch] = useState('');

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

                    <div className='btn-add' onClick={() => callModalAdd()}>
                        <BasicButtons variant='contained' action='Adicionar' btnState={true} length={235} stature={50} />
                    </div>

                    <InputBase
                        className='input-search'
                        placeholder='Pesquisar'
                        endAdornment={<SearchIcon />}
                        onChange={(evt) => setSearch(evt.target.value)}
                    />

                </div>

                <ContactsTable search={search} />

            </div>

            {stateModalAdd && <ModalCardAdd setStateModalAdd={setStateModalAdd} setShowLoading={setShowLoading}
                showContacts={showContacts} />}

            {stateModalDel && <DeleteModal setStateModalDel={setStateModalDel} Deleted={infoContact}
                setShowLoading={setShowLoading} showContacts={showContacts} />}

            {stateModalUp && <UpdateModal setStateModalUp={setStateModalUp} UpdatedId={infoContact}
                setShowLoading={setShowLoading} showContacts={showContacts} />}

            {showLoading && <Loading time={2000} />}

            {logout && <LoadLogout />}
        </div>
    )
}

export default MainPage;