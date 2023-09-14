import React, { useEffect, useState } from 'react';
import api from '../../api';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { toast } from 'react-hot-toast';

export default function Portfolio() {
    const [projects, setProjects] = useState([]);
    const getProjects = async () => {
        try {
            const { data } = await api.get(`${import.meta.env.VITE_GET_PROJECTS}`);
            setProjects(data);
        } catch (error) {
            toast.error(error);
            console.error(error);
        }
    };
    useEffect(() => {
        getProjects();
    }, []);
    return (
        <div className='w-full h-screen flex flex-wrap justify-center'>
            <h1 className='text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-20'>Livio Dimola portfolio</h1>
            <Splide className='w-screen' options={{
                perPage: 1,
                gap: '1rem',
                arrows: false,
                pagination: false,
                drag: "free",
                type: "loop",
                autoScroll: {
                    pauseOnHover: false,
                    pauseOnFocus: false,
                    rewind: false,
                    speed: 1
                }
            }} extensions={{ AutoScroll }}>
                {projects.map((p, i) => {
                    return (
                        <SplideSlide>
                            <div key={i} className='bg-white p-2 sm:p-4 md:p-6 lg:p-8 rounded shadow-md w-screen'>
                                <h3 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2'>{p.name}</h3>
                                <h4 className='mb-2'><a href={p.siteLink} target='_blank' className='text-blue-500 hover:text-blue-700'>Site link</a></h4>
                                <h4 className='mb-2'>{p.forSite}</h4>
                                <h4 className='mb-2'>{p.description}</h4>
                                <h4>if you want to view the code, click <a href={p.sourceLink} target='_blank' className='text-blue-500 hover:text-blue-700'>here</a></h4>
                            </div>
                        </SplideSlide>
                    )
                })}
            </Splide>
        </div>
    )
}
