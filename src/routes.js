import Login from './pages/Login/login';
import SignIn from './pages/Sign-in/signIn';
import MainPage from './pages/Main/main';
import UserContext from './context/userContext.js';

import { Route, Routes, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLocalStorage } from 'react-use';

function ProtectedRoutes({ redirectTo }) {
    const isAuthenticated = localStorage.getItem('token');

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

function MainRoutes() {

    const navigate = useNavigate();

    const [errorAlert, setErrorAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);


    const [forms, setForms] = useState({
        name: '',
        email: '',
        password: '',
        phone: ''
    });

    const [logout, setLogout] = useState(false);

    const [contactList, setContactList] = useState([]);

    const [value, setValue] = useLocalStorage('user');


    return (
        <UserContext.Provider value={{
            navigate, errorAlert, setErrorAlert, successAlert, setSuccessAlert,
            forms, setForms, contactList, setContactList, value, setValue,
            logout, setLogout
        }}>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/Sign-in' element={<SignIn />} />

                <Route element={<ProtectedRoutes redirectTo={'/'} />}>
                    <Route path='/Main' element={<MainPage />} />
                </Route>

            </Routes>
        </UserContext.Provider>
    )
}

export default MainRoutes;