import { FaPowerOff } from 'react-icons/fa';
import { useAuth } from '../context/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function Navbar() {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const logout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ''
        });
        localStorage.removeItem('auth');
        toast.success('Logout completed');
        navigate('/');
    };
    return (
        <nav className="flex items-center justify-center h-12 bg-[#6B5B95] fixed w-full px-6 shadow-md">
            {auth?.token ? (
                <FaPowerOff onClick={logout} className="text-white text-3xl hover:text-red-500 transition-all duration-500 ease-in-out transform hover:scale-125 m-2" />
            ) : (
                <h1 className='text-white font-bold text-2xl'>Livio Dimola - portfolio</h1>
            )}
            {auth?.user?.role === 'admin' && (
                <div className='flex flex-row justify-evenly m-2'>
                    <NavLink className='m-2 text-base text-white hover:text-red-500 transition-all duration-500 ease-in-out' to={'/'}>Home</NavLink>
                    <NavLink className='m-2 text-base text-white hover:text-red-500 transition-all duration-500 ease-in-out' to={'/dashboard'}>Dashboard</NavLink>
                </div>
            )}
        </nav>
    );
}