import React, { useState } from 'react';
import api from '../../api';
import { toast } from 'react-hot-toast';

export default function DashAdmin() {
    const [name, setName] = useState('');
    const [sourceLink, setSourceLink] = useState('');
    const [siteLink, setSiteLink] = useState('');
    const [description, setDescription] = useState('');
    const [forSite, setForSite] = useState('');

    const createProject = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post(`${import.meta.env.VITE_CREATE_PROJECT}`,
                {
                    name,
                    sourceLink,
                    siteLink,
                    description,
                    forSite
                }
            );
            if (data.status === 422) {
                return toast.error(data.message);
            };
            if (data.status === 201) {
                return toast.success(data.message);
            }
        } catch (error) {
            toast.error(error);
            console.error(error);
        }
    };
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <form className='w-full max-w-xl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                        Name
                    </label>
                    <input required className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='sourceLink'>
                        Source Link
                    </label>
                    <input required className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='sourceLink' type='text' value={sourceLink} onChange={(e) => setSourceLink(e.target.value)} />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='siteLink'>
                        Site Link
                    </label>
                    <input required className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='siteLink' type='text' value={siteLink} onChange={(e) => setSiteLink(e.target.value)} />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='description'>
                        Description
                    </label>
                    <textarea required className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none' id='description' value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className='mb-6'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='forSite'>
                        For Site
                    </label>
                    <input required className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='forSite' type='text' value={forSite} onChange={(e) => setForSite(e.target.value)} />
                </div>
                <div className="flex items-center justify-between">
                    <button onClick={createProject} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Create Project
                    </button>
                </div>
            </form>
        </div>
    )
}