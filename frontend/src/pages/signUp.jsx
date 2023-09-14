import { Button, Checkbox, Label, Spinner, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import api from '../../api';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [signIn, setSignIn] = useState(false);
    const [remember, setRemember] = useState(false);
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const [spinner, setSpinner] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== repeatPassword) {
            setPasswordsMatch(false);
        } else {
            setPasswordsMatch(true);
            try {
                const { data } = await api.post(`${import.meta.env.VITE_SIGN_UP}`,
                    {
                        email,
                        password
                    }
                );
                console.log(data)
                if (data.status === 409) {
                    return toast.error(data.message);
                };
                if (data.status === 422) {
                    return toast.error(data.message);
                };
                if (data.status === 201) {
                    toast.success(data.message);
                    if (signIn) {
                        const { data } = await api.post(`${import.meta.env.VITE_SIGN_IN}`,
                            {
                                email,
                                password
                            }
                        );
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
                            return navigate('/portfolio');
                        }, 2000);
                    };
                    setSpinner(true);
                    setTimeout(() => {
                        setSpinner(false);
                        navigate('/');
                    }, 2000);
                }
            } catch (error) {
                toast.error(error);
                console.error(error);
            }
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
                <form className="flex flex-col gap-4 w-full md:w-[50%] p-8 bg-white rounded shadow-lg my-16" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label htmlFor="email1" value="Your email" />
                        <TextInput id="email1" placeholder="name@email.com" required type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="mt-2 p-2 border rounded w-full" />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="password1" value='Your password' />
                        <TextInput id="password1" required type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="mt-2 p-2 border rounded w-full" />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="repeatPassword1" value='Repeat your password' />
                        <TextInput id="repeatPassword1" required type="password" onChange={(e) => setRepeatPassword(e.target.value)} value={repeatPassword} className="mt-2 p-2 border rounded w-full" />
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                        <Checkbox onChange={(e) => setSignIn(e.target.checked)} id="signin" />
                        <Label htmlFor="signin">Sign In</Label>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                        <Checkbox disabled={!signIn} onChange={(e) => setRemember(e.target.checked)} id="remember" />
                        <Label disabled={!signIn} htmlFor="remember">Remember me</Label>
                    </div>
                    {!passwordsMatch && (
                        <p className="text-red-500">Passwords do not match</p>
                    )}
                    <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Sign Up
                    </Button>
                    <NavLink to='/' className='text-blue-500 hover:text-blue-800 mt-4'>
                        Click here if you are registered
                    </NavLink>
                </form>
            )}
        </div>
    )
}