import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function NotAuthorized() {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((value) => value - 1);
        }, 1000)
        count === 0 && navigate('/');
        return () => clearInterval(interval);
    }, [count, navigate])
    return (
        <>
            <div className='h-screen w-full flex flex-col justify-center items-center'>
                <div className='max-w-md w-full p-6 bg-white rounded-lg shadow-md'>
                    <h1 className='text-3xl md:text-4xl xl:text-5xl font-bold text-center text-red-600 mb-4'>Not authorized</h1>
                    <h2 className='text-xl md:text-2xl xl:text-3xl font-medium text-center text-gray-600 mb-4'>Redirecting in {count}</h2>
                    <div className='flex justify-center items-center'>
                        <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-red-500'></div>
                    </div>
                </div>
            </div>
        </>
    )
}