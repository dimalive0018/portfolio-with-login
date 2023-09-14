import { Button, Checkbox, Label, Spinner, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import api from '../../api';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [auth, setAuth] = useAuth();
    const [spinner, setSpinner] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post(`${import.meta.env.VITE_SIGN_IN}`, {
                email,
                password
            });
            if (data.status === 404) {
                return toast.error(data.message);
            };
            if (data.status === 200) {
                toast.success(data.message);
                setAuth({
                    ...auth,
                    user: data.user,
                    token: data.token
                });
                if (remember) {
                    localStorage.setItem('auth', JSON.stringify(data));
                };
                setSpinner(true);
                setTimeout(() => {
                    setSpinner(false);
                    navigate('/portfolio')
                }, 2000);
            }
        } catch (error) {
            toast.error(error);
            console.error(error);
        }
    };
    useEffect(() => {
        if (auth?.token) navigate('/portfolio');
    }, [auth?.token]);
    return (
        <div className='w-full h-screen flex flex-wrap justify-center items-center'>
            {spinner ? (
                <Spinner size='xl' />
            ) : (
                <form className="flex flex-col gap-4 w-full md:w-[50%] p-8 bg-white rounded shadow-lg" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label htmlFor="email1" value="Your email" />
                        <TextInput id="email1" placeholder="name@email.com" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 p-2 border rounded w-full" />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="password1" value="Your password" />
                        <TextInput id="password1" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 p-2 border rounded w-full" />
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                        <Checkbox onChange={(e) => setRemember(e.target.checked)} id="remember" />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>
                    <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Sign In
                    </Button>
                    <NavLink to='/signup' className='text-blue-500 hover:text-blue-800 mt-4'>
                        Click here if you are not registered
                    </NavLink>
                </form>
            )}
        </div>
    )
}