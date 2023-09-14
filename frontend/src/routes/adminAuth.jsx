import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth'
import api from '../../api';
import { Outlet } from 'react-router-dom';
import NotAuthorized from '../pages/notAuthorized';

export default function AdminAuth() {
    const [auth] = useAuth();
    const [checkAuth, setCheckAuth] = useState(false);
    useEffect(() => {
        (async () => {
            const { data } = await api.get(`${import.meta.env.VITE_CHECK_ADMIN}`);
            if (data.status === 200) setCheckAuth(true);
        })();
    }, [auth?.token])
    return checkAuth ? <Outlet /> : <NotAuthorized />
}