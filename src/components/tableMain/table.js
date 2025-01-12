import './table.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import editIcon from '../../assets/Icon-Pencil.svg';
import trashIcon from '../../assets/trash.svg';

import UserContext from '../../context/userContext';
import { useContext } from 'react';

export default function ContactsTable({ search }) {

    const { contactList, setForms, setInfoContact, setStateModalDel,
        setStateModalUp, setShowLoading } = useContext(UserContext);

    const filteredContacts = search.length > 0 ?
        contactList.filter(function (data) {
            return data.nome.toLowerCase().includes(search.toLowerCase());
        }) : [];

    return (
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className='title-contact'>Nome</TableCell>
                        <TableCell className='title-contact' align="left">Email</TableCell>
                        <TableCell className='title-contact' align="left">Telefone</TableCell>
                        <TableCell align="left"></TableCell>
                        <TableCell align="left"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {search.length === 0 ?

                        contactList.map((data) => (
                            <>
                                <div style={{ marginBottom: '15px' }}></div>
                                <TableRow className='table-row'
                                    key={data.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" className="table-data">
                                        {data.nome}
                                    </TableCell>
                                    <TableCell align="left" className="table-data">{data.email}</TableCell>
                                    <TableCell align="left" className="table-data">{data.telefone}</TableCell>

                                    <TableCell align="left">
                                        <img src={editIcon} alt='Ícone editar' className='icon-table'
                                            onClick={() => {

                                                setForms({
                                                    name: data.nome,
                                                    email: data.email,
                                                    phone: data.telefone
                                                });

                                                setInfoContact(data.id);

                                                setStateModalUp(true);

                                                setShowLoading(false);
                                            }} />
                                    </TableCell>

                                    <TableCell align="left">
                                        <img src={trashIcon} alt='lixeira' className='icon-table'
                                            onClick={() => {
                                                setInfoContact({
                                                    id: data.id,
                                                    nome: data.nome,
                                                    email: data.email,
                                                    telefone: data.telefone
                                                });

                                                setStateModalDel(true);

                                                setShowLoading(false);
                                            }} />
                                    </TableCell>

                                </TableRow>
                            </>

                        )) :

                        filteredContacts.map((data) => (
                            <>
                                <div style={{ marginBottom: '15px' }}></div>
                                <TableRow className='table-row'
                                    key={data.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" className="table-data">
                                        {data.nome}
                                    </TableCell>
                                    <TableCell align="left" className="table-data">{data.email}</TableCell>
                                    <TableCell align="left" className="table-data">{data.telefone}</TableCell>

                                    <TableCell align="left">
                                        <img src={editIcon} alt='Ícone editar' className='icon-table'
                                            onClick={() => {

                                                setForms({
                                                    name: data.nome,
                                                    email: data.email,
                                                    phone: data.telefone
                                                });

                                                setInfoContact(data.id);

                                                setStateModalUp(true);

                                                setShowLoading(false);
                                            }} />
                                    </TableCell>

                                    <TableCell align="left">
                                        <img src={trashIcon} alt='lixeira' className='icon-table'
                                            onClick={() => {
                                                setInfoContact({
                                                    id: data.id,
                                                    nome: data.nome,
                                                    email: data.email,
                                                    telefone: data.telefone
                                                });

                                                setStateModalDel(true);

                                                setShowLoading(false);
                                            }} />
                                    </TableCell>

                                </TableRow>
                            </>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}