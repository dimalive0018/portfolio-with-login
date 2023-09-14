import React from 'react'

export default function Footer() {
    return (
        <footer className='bg-[#6B5B95] w-full h-6 flex items-center justify-around text-center text-lg bottom-0 fixed z-0'>
            <h3 className='text-white'>© Livio Dimola</h3>
            <a href='https://codesandbox.io/p/github/liviodimola/portfolio-with-login/main?workspaceId=bb702a07-4889-46e1-b6f7-b4bb8104efbe' target='_blank' className='text-white'>Source code portfolio</a>
        </footer>
    )
}